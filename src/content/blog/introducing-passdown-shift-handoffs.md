---
title: "Introducing Passdown: The Shift Handoff You Didn't Have to Write"
description: "Passdown reads what actually happened during a support shift and writes the handoff itself — posted, mentioned, and reassigned the moment the on-call schedule changes. Here's what it does, how it works, and what it costs to trust it."
pubDate: 2026-08-04
cover: "market"
---

Every shift-based support team runs the same losing race at the start of every shift. The incoming agent opens their queue, sees a pile of tickets that were someone else's problem twelve hours ago, and starts reconstructing what happened from scratch — reading comment threads, guessing at what's actually blocking, pinging a person who's already asleep. None of that knowledge was ever lost. It just never made it into a form the next person could use.

Passdown is our answer to that specific gap, and it's the fourth app to come out of Isogun Labs. It's live at [passdown.isogunlabs.com](https://passdown.isogunlabs.com/) now, in its final stretch before Marketplace submission — this post is the introduction, not the launch announcement, and we're being upfront about that distinction throughout.

## The gap nobody else is filling

Jira Service Management already has good tools for *who's* on shift — rotations, escalations, on-call schedules, all handled well by existing apps and by JSM itself. What's missing is a tool for *what happened during it*. Passdown doesn't compete with your scheduling app. It reads the schedule you already maintain, watches for the moment one person's shift ends and the next one's begins, and writes the part that currently depends on someone remembering to type it up before they log off.

## What it actually does

Two features, one engine, no overlap with anything you already own:

**The flagship: automated shift-handoff briefs.** Passdown watches JSM's native on-call schedule. The moment it detects a shift boundary — the on-call person changing from A to B — it looks at what A's open tickets actually did during the shift, writes a plain-language account of what happened, what's still blocking, and what's next, and posts it as a native Jira comment on every relevant ticket. The incoming person is mentioned directly and the ticket is reassigned to them, so there are two independent, guaranteed signals that a handoff happened — not one fragile notification you have to hope fired correctly. Nobody has to remember to write anything. The brief exists whether or not the outgoing agent thought to leave one.

**On demand, for any single ticket: a plain-English summary.** Same engine, same writing style, scoped down to one ticket instead of a whole shift. Click it on any ticket and get caught up on the full comment history in a paragraph instead of a scroll — useful during a handoff, just as useful any other time someone needs to get up to speed fast without reading everything that happened before they arrived.

Both features share the same generation approach we already proved out in Recap, our first app: no invented details, no marketing language, no numbers dressed up to sound better than the ticket actually says. If nothing noteworthy happened, the brief says that. A handoff tool that quietly inflates what happened is worse than no handoff tool at all, because the first time someone checks a claim against the real ticket and finds it doesn't hold up, they stop trusting every brief after it.

## What it costs to trust it with your Jira data

We think this is the part that actually matters when you're deciding whether to let a new app onto a live support queue, so we're going to be specific rather than just asserting "secure."

- **Minimum scope, every time.** Passdown asks for exactly what it needs to read tickets, read the on-call schedule, and post comments and mentions — nothing broader, and every scope is justified individually before it goes in the manifest.
- **The generation engine runs entirely on Atlassian's own infrastructure.** Ticket summarization and brief-writing happen through Forge's hosted AI, inside Atlassian's platform boundary. No ticket content is sent to a server we operate for that part of the pipeline, because we don't operate one for it.
- **One honest exception, and we're not going to bury it.** Reading JSM's native on-call schedule from a scheduled background job runs into a real, confirmed platform limitation: Atlassian's own on-call API is scoped to logged-in users, not apps acting on their own, and a scheduled trigger has no user in session to act as. The only sanctioned path around that — confirmed directly with an Atlassian developer-relations engineer on our own filed report — is a small, purpose-built relay that exchanges Passdown's own system credentials for read access to the schedule your admin already granted at install time. That relay does one job, sees the schedule data and nothing else, and exists because Atlassian's platform requires it for this specific read, not because we chose to route data through our own servers by default. It's the one place Passdown's architecture differs from Recap's fully self-contained design, and it's documented in full on our [Security page](https://passdown.isogunlabs.com/security.html) rather than left for someone to discover later.
- **Storage stays bounded.** No growing history, no analytics you didn't ask for, no dashboard tracking every shift ever handed off. What's stored is what's needed to detect the next boundary, nothing more.

We'd rather a prospective customer read the honest version of how this is built than a cleaner-sounding one that leaves out the part that actually matters to their own security review.

## What it costs to use

Passdown follows the same shape we've used since Recap: free for teams of up to 10 users, no trial clock and no card required to start, with per-seat pricing above that threshold. The exact rate is being finalized alongside the Marketplace listing itself — we'd rather publish a number once it's real than estimate one now and have to walk it back.

## Where things stand right now

Passdown is built, deployed to a live test site, and working end-to-end against a real on-call schedule — a genuine shift boundary triggering a correctly attributed brief, posted, mentioned, and reassigned with no manual step. What's left before submission is the same short list every app on this site goes through before it's allowed in front of a reviewer: final licensing checks, listing screenshots, and the Marketplace security questionnaire. None of it changes what the app does. All of it is close.

If your team runs shift-based support in Jira Service Management and has ever lost the first twenty minutes of a shift to "wait, what actually happened here," [passdown.isogunlabs.com](https://passdown.isogunlabs.com/) has the full documentation, the security page linked above, and a way to get notified the moment it's actually installable. We'll write the real launch post the day that happens.
