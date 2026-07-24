---
title: "What the \"Runs on Atlassian\" Badge Actually Guarantees"
description: "It's not a quality stamp or a security audit. What the badge checks, what it explicitly doesn't cover, and what to look at before installing any Jira app."
pubDate: 2026-07-24
cover: "trust"
---

Open any app's listing on the Atlassian Marketplace and you'll see it: a small blue badge that
says "Runs on Atlassian," usually sitting right next to the install count. Most people glance at
it, register "oh good, safe one," and move on to the install button. That's a reasonable
instinct — and it's also skipping past the one part of the badge that actually matters most,
which is what it *doesn't* promise.

We build on Forge ourselves, and Recap qualifies for this badge. That's exactly why we think
it's worth being precise about what it means instead of letting the blue checkmark do all the
talking.

<div class="fact-grid">
  <div class="fact"><div class="n">3</div><div class="l">requirements an app must meet — compute and storage, data residency, and egress control</div></div>
  <div class="fact"><div class="n">0</div><div class="l">end-user data allowed to leave Atlassian's infrastructure, even for analytics</div></div>
  <div class="fact"><div class="n">Auto</div><div class="l">badge detection — no self-attestation, continuously monitored by Atlassian</div></div>
</div>

## What the badge is actually checking

Atlassian applies the badge automatically, without any vendor filling out a form or ticking a
box. It gets granted the moment an app's manifest meets three specific conditions, and pulled
the moment it stops meeting them:

**The app runs entirely on Atlassian-hosted compute and storage.** No servers of the vendor's
own sitting in the request path, no third-party cloud account processing your data on the way
through. If the app needs to do something, it does it inside Atlassian's infrastructure, not
outside it.

**Data residency matches whatever your Jira site already has configured.** If your organization
picked a specific region for data residency, an app carrying this badge can't quietly route your
data somewhere else to do its job.

**Any external data egress is under your control, and end-user data is never part of it.** A
vendor can send out anonymous analytics or error logs if you've allowed it. What it explicitly
cannot do — badge or no badge — is let actual customer data leave the platform, for analytics or
anything else.

That's a real, meaningful guarantee. It's the difference between "this app processes your Jira
data inside the walls you already trust" and "this app happens to be built on Forge but phones
home to someone's AWS account for the interesting parts." For a lot of security and procurement
teams, that distinction is the whole reason an app clears review quickly instead of sitting in a
queue for six weeks.

## What it doesn't check — in Atlassian's own words

Here's the part worth sitting with, straight from Atlassian's own documentation: these controls
**"do not prevent misuse of access granted to the app during installation or abuse of the app
runtime."**

Read that twice, because it's doing a lot of work. The badge verifies where your data can travel
architecturally. It says nothing about what an app *does* with the access it's given once it's
installed. An app can carry the badge, keep every byte of data on Atlassian's infrastructure,
and still be poorly scoped, request more permission than it needs, or simply do a mediocre job
of the thing it claims to do. None of that is what this particular badge is measuring — Atlassian
draws that exact line themselves, pointing to their shared responsibility model for where the
rest of the accountability sits.

So the badge answers one specific, important question — "can this app's data leak outside
Atlassian's walls?" — and leaves a different, equally important question untouched: "should this
app have the access it's asking for in the first place?"

## The second question is yours to ask

That second question doesn't have a badge. It has a screen you're probably used to clicking
past: the permissions consent screen that shows up during install, listing exactly what the app
is requesting access to.

A few things worth actually reading there, instead of scrolling to "Accept":

**Does the scope match the job.** A status-report app asking to read issues makes sense. The
same app asking for permission to manage users or modify project settings doesn't — and that gap
is visible right there on the consent screen if you look.

**Permission escalation needs your yes, every time.** An app can't quietly grant itself broader
access in a later version. Atlassian's platform requires an admin to explicitly reapprove any
version that asks for new scopes or new egress domains — until that approval happens, the app
keeps running on whatever it was already approved for. That's a real backstop, and it means the
install-time review is the moment that actually counts, not a one-time formality you never
revisit.

**Jira's own permissions still apply underneath.** An app's scope defines the ceiling of what
it's technically capable of asking for. It doesn't override the floor — if a user doesn't have
permission to browse a project in Jira, an installed app can't hand them that data anyway, scope
or no scope.

## The actual checklist

Put together, evaluating a Jira app before installing it comes down to two separate checks, not
one:

1. **Does it carry the "Runs on Atlassian" badge?** If yes, you know your data isn't leaving
   Atlassian's infrastructure — that's the architecture question, answered.
2. **Do the requested permissions match what the app claims to do?** That's a five-second read
   of the consent screen, and it's the question the badge was never designed to answer.

The badge is a genuinely useful signal, and we'd rather build something that qualifies for it
than not. But treating it as the entire security review skips the half of the picture that's
actually in front of you, in plain English, every time you click install.
