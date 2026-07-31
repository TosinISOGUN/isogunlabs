---
title: "What the Review Queue Actually Feels Like the First Time"
description: "Field Hygiene has been sitting in Atlassian's review queue for its first submission. Notes on what that wait actually involves, what we did with the time, and the one thing we almost got wrong."
pubDate: 2026-07-31
cover: "market"
---

Field Hygiene is our second app, but it's the first time we've sat through a Marketplace review
with no prior submission to compare it against. Recap had already cleared review once, so going
in we thought we more or less knew the shape of it. We didn't, not really — Recap's review ran
quietly enough that we barely thought about it while it was happening. This one we've been
watching a lot more closely, mostly because there's more riding on it: it's the app that's still
waiting for its first customer, not the one that already has some.

## The listing looks identical on day one and day twelve

Here's the part that catches you off guard the first time: nothing about the public listing page
changes while a submission sits in review. The description is live. The screenshots are live. The
pricing page renders exactly the way it will once the app is approved. The only tell is one small
line near the top — **awaiting approval** — and that line means exactly the same thing on the
morning you submit as it does two weeks later. There's no percentage bar, no "in security review"
versus "in function testing," no email that says "your app has moved to stage 2 of 4." You get
silence, and then, eventually, you get an answer.

I checked the listing more times than I'd like to admit in the first few days, half-expecting the
status line to have quietly flipped overnight. It never does that. Atlassian doesn't approve apps
at 2am and it doesn't trickle out progress updates — you get a binary answer when the review is
actually done, and until then the page just sits there looking finished, which is its own strange
kind of limbo. It's not a complaint about the process. A partial status would probably tell a
prospective buyer less than nothing, and might tell them something misleading. But it does mean
that for most of this window, the only honest answer to "how's it going" is "we genuinely don't
know yet, ask me again next week."

## What we actually did with the wait

The tempting move, the first time you're in this position, is to keep touching the listing.
Reword a sentence in the description. Swap a screenshot for a slightly better one. Tighten the
pricing copy one more time. We felt that pull too, and mostly resisted it, because editing a
submission mid-review is one of the few things that can actually reset your place in line rather
than help it. So instead of polishing something that was already submitted, we spent the two-plus
weeks on things that didn't touch the pending review at all:

- Kept building the next small feature, on the theory that a review clock doesn't pause for
  anything and there was no reason ours should either
- Went back through our own privacy policy and permission scopes as if we were a stranger seeing
  them for the first time, looking for the kind of thing a reviewer would flag — an over-broad
  scope, a vague data-retention line, anything we'd normally read past because we already know
  what it means
- Finally wrote the README and setup docs we'd been putting off, so that if review notes came
  back asking for clarification, we'd be fixing a real issue instead of scrambling to write
  documentation and fix a bug in the same afternoon
- Left the support inbox open, and otherwise left the submission alone — no scope changes, no
  copy edits, no version bumps, nothing that risks restarting a clock we didn't control

That last point turned out to be the one that actually mattered. Somewhere around day nine, with
still no word back, the instinct to "just fix one small thing" got strong enough that we almost
pushed a minor version update — nothing risky, just a clearer error message in one screen. We
caught it before submitting and left it queued for after approval instead. Small decision, but
it's the kind of thing that's easy to get wrong the first time through, because doing nothing
feels like doing nothing useful, even when it's exactly the right move.

## Why the quiet is a fair trade, even when it's frustrating

We wrote a few weeks ago about the broader case for a review queue existing at all on the
Marketplace — a store where anything can go live the moment a developer clicks submit is a store
nobody should trust with access to their Jira data. Watching that same process from the applicant
side for the first time didn't change that conclusion. If anything it made the cost concrete in a
way an outside opinion never could: somewhere in Atlassian's process, an actual person is looking
at the exact scopes Field Hygiene requests and checking that they line up with what the app
claims to do on the listing page. That's the entire point of making us wait. It's a genuinely fair
trade for what a green compatibility badge is supposed to mean to a customer who's never heard of
us and has no reason to take our word for anything.

It still doesn't make the waiting comfortable. There's a specific kind of low-grade tension that
comes from having shipped something you're proud of and then having no lever left to pull — you
can't speed it up, you can't check on it beyond refreshing a page that won't tell you anything new,
you just have to trust a process you can't see into. That's probably the most honest thing to say
about this stage of building anything for the Marketplace: the hard part isn't the code anymore by
the time you get here. It's sitting with the not-knowing.

The honest update, for anyone actually tracking Field Hygiene: still awaiting approval as of this
post. We'll write the real launch post the day that status line finally changes.
