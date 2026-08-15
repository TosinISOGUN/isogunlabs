---
title: "Two Apps Live: What Actually Surprised Us"
description: "Recap and Field Hygiene are both live on the Atlassian Marketplace now. Notes on the parts that didn't go the way we expected — a bug a real reviewer found for us, an environment mix-up, a listing form with more surface area than the app itself, and the update that doesn't tell anyone but Atlassian."
pubDate: 2026-08-12
cover: "trust"
---

Recap and Field Hygiene are both live on the Atlassian Marketplace now. That's a good milestone to sit with for a second, but it's also a good moment to write down what actually surprised us getting here, while it's still fresh enough to be honest instead of tidy. None of this is a warning to other builders — plenty of it we'd have found in documentation if we'd known to look. It's more a record of the gap between what we assumed shipping to a platform Marketplace would involve and what it actually involved.

## The bug a real reviewer found for us

Field Hygiene's spinner would sometimes just hang. Not always — on a small site with a handful of custom fields it was fine, which is exactly why we didn't catch it. A Marketplace reviewer testing on a larger, data-heavier site hit it directly: the scan would start, "Scanning fields…" would sit there, and it would never resolve. They reported it plainly, with a screenshot, during their own evaluation of the app.

The root cause was almost embarrassingly small once we found it — a missing `.catch()` on the Forge invoke call. If the platform-level request timed out or rejected for any reason, there was nothing downstream to catch that rejection, so the UI just stayed in its loading state forever. We'd tested the happy path a lot. We had not tested what happens when the happy path doesn't happen.

Fixing it surfaced a second, quieter bug in the same code: a component that only mounted a routing context after data had already loaded, which meant a specific first-load timing pattern would flash a raw error string — "History is not defined" — for a fraction of a second before settling. The user who caught this one actually screen-recorded their own screen at normal speed, then stepped through it frame by frame to catch text that was only on screen for a blink. That's the kind of testing we hadn't done ourselves, because once you've written a component, you stop seeing what a first-time viewer sees.

Both are fixed now, deployed, and reconfirmed clean. But the honest version of this story isn't "we shipped a clean app" — it's "an outside reviewer's normal use of the product found something our own testing didn't, and that's a big part of what review is actually for."

## Environments look like a detail until they very much aren't

Forge draws a hard line between development, staging, and production — genuinely separate deployments, separate installs, separate everything. We knew that in the abstract. What we hadn't internalized is how easy it is to fix a bug, deploy it, and then have someone tell you it's still broken — because they're testing on a site that runs the development install, and the fix only went to production.

That happened exactly once, and it was a useful kind of once. The fix for the Router flash was real and correct, and it was also invisible to the person testing it, because their test site and the deploy target didn't match. The actual lesson wasn't "deploy more carefully" — it was "before saying a fix is live, check `forge install list` and confirm which environment the person testing it is actually running." Small habit, easy to skip, the kind of thing that only becomes obvious after skipping it once.

## The listing form has more surface area than the app does

Building the app turned out to be, in a real sense, the easy part. The Marketplace listing itself has its own failure modes that have nothing to do with code quality:

- Our first submission was auto-rejected — not for anything in the app, but because the Privacy & Security questionnaire lives in a genuinely separate tab of the Partner Portal from the main listing wizard. We'd filled in a complete draft of every answer beforehand and then never actually transcribed it into the portal, because the wizard we'd just finished felt like the whole form. It wasn't.
- Pricing tiers don't start blank. The portal pre-populates a full table derived from "50% of the parent Atlassian product's price," which looks like a real number until you notice it's a formula, not a decision. Getting to our actual approved rate meant scaling every tier proportionally rather than typing over one field and assuming the rest would follow.
- Support hours and SLA commitments live at the vendor level, shared across every app under one Marketplace partner account — not per listing. We built a per-app version first, on the reasonable-sounding assumption that support policy is an app detail. It isn't, here. Caught and fixed the same day, but it's the kind of structural assumption that's invisible until something in the actual form contradicts it.

None of these are hard problems. They're just the kind of thing you only learn by hitting them, because the form doesn't warn you in advance that a field means something different than it looks like it means.

## Approval doesn't tell anyone but Atlassian

The most recent one, and maybe the most obvious in hindsight: the moment Field Hygiene's listing turned public, nothing else on the internet noticed. Not the app's own marketing site, which was still telling visitors it was "coming soon." Not the company homepage, still showing a "coming soon" card two steps down from the apps that were actually live. Atlassian's own systems knew instantly. Every other place that made a claim about the app's status had to be found and fixed by hand, one page at a time, days after the actual approval.

That's obvious the moment you say it out loud — of course a Marketplace approval doesn't reach out and update your own website for you — but it's exactly the kind of thing that's easy to miss in the moment, because the milestone itself (approved!) feels like the finish line, and updating five different "not yet available" sentences across two repositories doesn't feel like part of the same task. It is, though. An approved app that still looks unreleased everywhere else isn't really launched yet.

## What changes for the next one

Passdown is next in line for submission, and every one of these becomes a checklist item instead of a surprise: test the unhappy path, not just the happy one, before calling something done. Confirm which environment a tester is actually running before promising a fix is live. Fill in the Privacy & Security tab as its own explicit step, not an assumed side effect of the main wizard. Treat vendor-level settings as vendor-level from the start. And the moment approval lands, the very next task is a sweep of every site that currently claims the app isn't available yet — not a follow-up, the same day.

None of this required getting anything catastrophically wrong. It required shipping for real, twice, and paying attention to exactly where the actual friction was instead of where we assumed it would be.
