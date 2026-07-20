---
title: "Writing a Monthly Status Report From Jira"
description: "A practical approach to turning completed Jira issues into a status report a manager actually wants to read — without an hour of copy-pasting from the board."
pubDate: 2026-07-20
---

Most monthly status reports get written the same way: the deadline shows up, you open Jira,
scroll through everything you touched in the last few weeks, and start reconstructing what
actually happened. It's not hard, exactly — it's just tedious in a way that makes people put
it off until the last possible hour.

## Why the blank page happens

The information is never actually missing. Every issue you closed is sitting right there in
Jira with a summary, a resolution date, and usually an epic it belongs to. The blank page
isn't a data problem, it's a **translation** problem — turning a list of ticket titles into
sentences a manager or a reviewer would actually want to read.

That translation step is where most of the time goes: deciding what's worth mentioning,
grouping related work together, and rewriting terse issue titles ("Fix pagination bug on
search") into something that reads like an update rather than a changelog.

## A structure that works

Whether you're writing this by hand or automating it, the same shape holds up well:

1. **Group by initiative, not by ticket.** A list of 14 issue titles is noise. The same 14
   issues grouped under 3 epics — "Checkout redesign," "Search performance," "Onboarding
   flow" — reads like actual progress.
2. **Use plain past tense.** "Fixed the search pagination bug that was dropping the last
   page of results" beats "Search pagination — DONE." Say what happened, not what the ticket
   status says.
3. **Only report what shipped.** Skip anything still in progress unless it's genuinely worth
   flagging. A status report that lists half-finished work reads as padding, not progress.
4. **Say plainly when there's nothing to report.** If a quiet month happens, don't manufacture
   busywork out of small tickets. A short, honest "no major work completed this period" is
   more useful than a report stretched to look fuller than it is.

## Doing this by hand vs. automating it

For an occasional report, the manual version above works fine — export or scroll your
"Done" issues for the period, sort by epic, and write a few sentences per group. It takes
20–40 minutes depending on how much you closed.

For a recurring monthly cadence, that adds up. That's the specific problem
[Recap](/get-started/) is built around: it queries the Jira issues you completed in the last
30 days, groups them by epic the same way described above, and writes the plain-past-tense
draft for you — so you're editing a report instead of starting one from nothing. It runs
entirely inside Jira, reads only your own completed work, and stores nothing.

Either way, the underlying method is the same — group by what the work was *for*, not by
ticket ID, and write it like you're telling someone what happened, not exporting a table.
