---
title: "How to Test a Scheduled Forge Trigger Without Waiting for the Real Thing"
description: "Forge's scheduled triggers fire on fixed intervals, not on demand. When your feature depends on a condition that only appears at a specific time — a shift boundary, a daily cutoff — you can't just click a button to test it. Here's how we test Passdown's shift-boundary logic locally without waiting for a schedule change."
pubDate: 2026-09-02
cover: "market"
---

Passdown's flagship feature fires when the on-call person on a Jira Service Management schedule
changes. The scheduled trigger runs every five minutes, checks the current on-call participant
for each schedule, compares it to the last one it saw, and if they differ, generates a handoff
brief for every open ticket the outgoing person had. That's the whole feature in one sentence.

Testing it is harder than it sounds. You can't trigger a scheduled Forge function by clicking a
button. You can't pass it custom arguments. You can't make it run once and stop. And the
condition that matters — a schedule change — happens on JSM's side, not yours, which means you
need to actually change the on-call schedule on a real Jira site to see the feature fire end to
end. This post covers what we do to test it without losing time to the platform's constraints.

## Start with `forge tunnel`, not `forge deploy`

`forge tunnel` runs your app's functions locally on your machine instead of on Atlassian's
infrastructure. It hot-reloads on save, shows console output in your terminal, and lets you
iterate without deploying. For the on-demand per-ticket summary, which is triggered by a user
clicking a button in the issue panel, tunneling is all you need — click the button, watch the
resolver fire, read the output.

For the scheduled trigger, tunneling has a specific limitation worth knowing about: **the
scheduled trigger does not fire on its own schedule during a tunnel.** Forge's local runtime
doesn't simulate the timer. You get the function loaded and available, but nothing calls it
unless you call it yourself.

This is the first thing that trips people up. You start a tunnel, you see your scheduled
function registered in the output, and then... nothing. Five minutes pass, ten minutes pass, the
function never runs. That's expected. The tunnel environment doesn't include a scheduler.

## Invoke the function manually through the tunnel

The workaround is to call the scheduled function's handler directly from a separate entry point
during development. In practice, this means adding a temporary resolver or a debug invoke that
calls the same handler the scheduled trigger uses:

```js
import { checkShiftBoundaries } from './index';

// Temporary debug resolver — remove before deploy
const handler: Resolver = async (req) => {
  await checkShiftBoundaries();
  return { ok: true };
};
```

Wire that resolver to a button in your frontend, click it during a tunnel, and the shift
boundary check runs immediately with full console output. You get the same function, the same
`asApp()` context, the same storage reads and writes — just without the five-minute wait.

This is not a substitute for testing the actual scheduled execution, because there are
differences between the tunnel's `asApp()` context and the production one (more on that below).
But for iterating on the core logic — the schedule comparison, the ticket query, the summary
generation, the comment posting — it's the fastest loop you'll get.

## Set up a real JSM on-call schedule on a development site

You need a Jira Service Management project with an on-call schedule configured to test against.
This is non-negotiable if you want to verify the full flow, because the schedule read is what
triggers everything downstream.

On your development site:

1. Create a JSM project (or use an existing one).
2. Go to **Ops** > **On-call schedules** and create a schedule with a rotation.
3. Assign at least one open ticket to the current on-call person.
4. Make sure the user you'll impersonate (for the schedule read) has visibility into this
   schedule.

The schedule doesn't need to be complex. A simple two-person rotation with short shifts is
enough. The goal is to have a schedule you can manipulate to trigger a change.

## Force a shift boundary by editing the schedule

To test the actual shift-boundary detection, you need the on-call participant to change. The
fastest way to do this on a development schedule:

1. Note who is currently on-call (the schedule UI shows this).
2. Edit the rotation to make a different person the current on-call. You can do this by
   adjusting the rotation start times, adding an override, or manually swapping the current
   participant.
3. Run your debug invoke (or wait for the next scheduled trigger if you're testing against a
   deployed version).
4. Check that Passdown detected the change, found the outgoing person's open tickets, posted
   comments, and reassigned them.

The override approach is the most reliable for testing because it takes effect immediately
rather than waiting for a rotation window to roll over. JSM supports schedule overrides
directly in the UI — create one, assign a different person, and the on-call participant changes
on the next schedule read.

## Test the edge cases explicitly

The happy path — one person leaves, one person arrives, tickets get handed off — is the easy
part. The cases that actually break in production are the ones where the schedule doesn't look
the way you assumed:

**The on-call participant is a team, not a user.** JSM schedules can have teams or escalations
as the current on-call, not just individual users. Passdown skips these schedules for automatic
handoffs because there's no single incoming person to assign to. Test this by setting a team as
the current on-call on your development schedule and confirming the app logs a skip rather than
attempting to assign to a team entity.

**The outgoing person has no open tickets.** A shift boundary with zero open tickets assigned to
the outgoing person should produce no comments and no reassignments. Test it by reassigning all
tickets away from the outgoing person before triggering the boundary.

**The on-call participant hasn't actually changed.** Run the check twice in a row without
changing the schedule. The second run should detect no change and do nothing. This catches a
common bug: storing the previous on-call participant incorrectly so every run looks like a
change.

**The schedule read fails.** If the impersonated user's permissions have changed or the remote
endpoint is down, the schedule read returns an error. The app should log the failure and skip
that cycle, not crash or silently continue as if the schedule is empty. Test this by temporarily
pointing the remote URL at an invalid endpoint and confirming the error handling path works.

## What's different between tunnel and production

The tunnel gets you most of the way, but a few things only behave correctly in a deployed
environment:

- **`asApp()` in tunnel runs with your developer token's context**, not the app's production
  system identity. For most Jira platform APIs this doesn't matter. For the JSM Ops API, it
  does — the permission model behaves differently for developer tokens versus production app
  tokens. If your schedule reads work in tunnel but fail in production (or vice versa), this is
  likely the cause.
- **Storage is local during tunnel.** Forge KVS reads and writes hit a local store, not the
  production storage backend. Data doesn't persist between tunnel sessions. If your stored
  on-call participant record matters for testing state across runs, you'll need to seed it
  manually at the start of each session.
- **The remote endpoint receives a different token shape.** In tunnel, the system token sent to
  your remote is a development token. In production, it's a production token with a different
  audience and issuer. Validate your JWKS checking logic against both, not just one.

Because of these differences, the final round of testing should always run against a deployed
development environment, not just a tunnel. Deploy with `forge deploy --environment development`,
install on your development Jira site, and let the scheduled trigger run on its real five-minute
interval. Then force schedule changes and watch the logs.

## The testing loop that actually works

Put together, here's the loop we use:

1. **Tunnel for logic iteration.** Click the debug button, read console output, fix, repeat.
   Fast, local, no deploy needed.
2. **Deploy to development for integration testing.** Real `asApp()` context, real storage, real
   scheduled trigger timing. Force schedule changes manually and verify the full flow.
3. **Production after Marketplace approval.** The same test, on a real customer site, with a
   real schedule. This is the one you can't do until the app is live.

The temptation is to skip step 2 and go straight from tunnel to production. Don't. The
differences between tunnel and production `asApp()` behavior are small but real, and the one
time they bite you will be the one time you didn't test the deployed development path. Five
minutes of schedule watching on a development site is cheap. A broken shift handoff on a
customer's production site is not.
