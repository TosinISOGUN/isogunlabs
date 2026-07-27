---
title: "Recap Demo: From a Jira Board to a Written Status Report in One Click"
description: "A full video walkthrough of Recap generating a real monthly status report from completed Jira work — every screen, every state, and why it's built this way."
pubDate: 2026-07-27
cover: "report"
---

Every manager runs the same monthly ritual: ping the team for what they got done, wait, re-ping, then stitch half-answers into something presentable before a deadline. Every employee runs the other half of it — staring at a blank doc trying to remember what they actually shipped three weeks ago. Neither problem is a data problem. The work is already sitting in Jira, fully described, timestamped, and grouped under the epic it belongs to. What's missing is the ten minutes nobody wants to spend translating a board into sentences.

Recap is built to remove exactly that step. Watch it happen below, or read the full walkthrough underneath.

<div class="video-embed">
  <iframe src="https://www.youtube.com/embed/xNkR6TwXgtU" title="Recap Demo: Turn Jira Work Into a Status Report in One Click" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

## Opening Recap

Recap lives under **Apps** in Jira's top navigation, exactly where any other Marketplace app shows up once it's installed. There's no setup wizard, no date-range picker, no admin screen to configure before you can use it. Open it, and you're already looking at the one screen the entire app has — that's not a stripped-down demo, that's the whole product. Every screen it will ever show you is one of the handful covered below.

## Generating a report

One button: **Generate my report**. Behind it, Recap queries the Jira issues assigned to you that moved into a Done status in the last 30 days, groups them by epic — falling back to project for anything that isn't linked to one, so nothing gets silently dropped — and writes a short paragraph per group. The whole thing takes a few seconds, about the same wait as loading a Jira dashboard.

There's no menu of options here, and that's a deliberate choice, not a missing feature. The 30-day window is fixed. The grouping logic is fixed. You are not meant to spend time configuring a report tool instead of just getting the report — that tradeoff is the entire design philosophy behind Recap.

## Reading the result

What comes back is plain, past-tense prose — the kind of thing a person would actually paste into a status update, not a list of ticket IDs with their statuses relabeled. Each paragraph covers one epic or project, written from the issue titles your team already gave the work when it was closed out.

Nothing is invented. If an issue's title doesn't mention a metric or an outcome, the report doesn't either — Recap describes what the titles say happened, not what would sound more impressive in front of a manager. That's a hard constraint on the writing, not a limitation of the tool: a status report full of numbers nobody can verify is worse than one that's honestly plain, and it's the fastest way to lose a manager's trust in the tool the first time someone checks a claim against the actual ticket.

The text sits in an editable box the whole time, so if a sentence needs a tweak, a group needs reordering, or a line needs deleting before it goes into your actual update — that's a normal edit, not a workaround you weren't supposed to need.

## The other screens: what happens when it isn't a clean win

A demo video naturally shows the happy path — completed work, a clean report, done. Real usage has a few other states, and how a tool behaves outside the happy path tells you more about it than the happy path does.

- **Nothing completed in the last 30 days.** If no assigned issues reached Done in the window, Recap says exactly that instead of stretching thin work into a paragraph that reads like more than it was. A quiet month is a legitimate, honestly-reported outcome — not an error, and not something the tool papers over.
- **"Basic report" notice.** If the AI writer is momentarily unavailable, Recap falls back to a plain, deterministic summary of your completed work instead of leaving you empty-handed or stalling on a retry loop. You can hit Regenerate a moment later for the fully written version, but you're never blocked from getting *something* useful.
- **A subscription is required.** Shown plainly if the installation doesn't have an active license, with a direct pointer to start a trial. No dead ends, no vague error.

None of these are edge cases we're proud of hiding — they're printed straight into the app's own documentation, because a tool that only works when everything goes right isn't one you can actually rely on for a recurring monthly task.

## Copying it out

Click into the box, select all (`Ctrl`/`Cmd` + `A`), copy (`Ctrl`/`Cmd` + `C`) — same as any text field, no extra clipboard permission Jira has to grant. From there it goes wherever your status updates already live: a message to your manager, a 1:1 doc, a performance review draft.

## Why it's worth trusting with your Jira data

This is the part that matters most for anyone evaluating a new app against a live Jira site, and it's worth being specific rather than just claiming "secure":

- **One read-only permission.** Recap asks for exactly one Jira scope and nothing else — no write access, no admin access, no ability to touch anything you didn't already have access to yourself.
- **Runs entirely on Atlassian Forge.** No third-party servers sit in the request path. Report generation happens through Atlassian's own hosted AI, inside Atlassian's own platform boundary — nothing about your Jira data leaves Atlassian's infrastructure to reach a company server we operate, because we don't operate one.
- **Stores nothing.** No database, no history, no cache of past reports. Every report is generated fresh from your current Jira data and handed back to your browser. Uninstall the app and there is, by construction, nothing left behind to delete.

That combination is what qualifies Recap for Atlassian's **Runs on Atlassian** program — not a badge we applied for, but a direct description of how the app is built.

## What it costs to try

Teams of up to 10 users install and use Recap for free — no trial clock, no credit card to start. Past that, per-user pricing scales down the more of your organization uses it, the same volume-discount shape Atlassian itself uses for its own products. There's no separate sales conversation to have first; the same page you're reading this on links straight to installing it.

If the video above looked like something your team could actually use on the next status-update deadline, [Recap is on the Atlassian Marketplace](https://marketplace.atlassian.com/2146687861) right now, ready to generate its first real report the moment it's installed.
