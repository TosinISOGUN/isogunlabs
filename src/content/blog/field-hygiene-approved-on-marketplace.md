---
title: "Field Hygiene for Jira Is Live on the Atlassian Marketplace"
description: "Field Hygiene is approved and live on the Atlassian Marketplace. It opens to one page showing every duplicate, near-duplicate, and unused custom field on your Jira site, plus a live read on how close you are to Atlassian's field-count limits."
pubDate: 2026-08-12
cover: "fields"
---

Field Hygiene for Jira is approved and live on the [Atlassian Marketplace](https://marketplace.atlassian.com/apps/2905942594). It's our second app, and it exists because of a gap we kept running into ourselves: Jira will let you create the same custom field twice, forever, and never once tell you.

## The problem nobody built a tool for

Anyone who's administered a Jira site long enough has lived this exact sequence. Someone can't find "Story Points," assumes it doesn't exist, and creates "Story Point" instead. Six months later, half your reports pull from one field and half pull from the other, and nobody notices until a sprint velocity chart looks wrong for reasons no one can explain.

Atlassian's own Site Optimizer flags unused fields — but it's Premium/Enterprise-only, and it only looks at disuse. It doesn't catch duplicates, near-duplicate naming drift, or how close a site is to the field-count limits Atlassian is rolling out. If you're on a Standard plan, or if your problem is naming sprawl rather than staleness, there's been nothing built for you until now.

## What it actually does

Field Hygiene opens to one page that shows you everything at a glance — no configuration, no setup, install and scan:

- **Duplicate fields** — exact name matches, grouped so every field sharing a name shows up in one place, with a warning when duplicates don't even share the same field type — the case that actually breaks reports and automations silently.
- **Near-duplicates** — "Story Point" vs. "Story Points," caught by name similarity rather than requiring an exact match, so the far more common real-world version of this problem doesn't slip through.
- **Unused fields** — not attached to any screen, or untouched for two or more years. Candidates for cleanup, never deleted automatically. You decide; Field Hygiene just tells you what's safe to look at.
- **Missing descriptions** — fields with no description set, one of the most common reasons admins can't tell fields apart in the first place and end up creating a duplicate instead of reusing what already exists.
- **Field-count guardrails** — a live read on how close each of your field configuration schemes and team-managed projects is to Atlassian's field-count ceiling, before it becomes a hard stop you find out about the hard way.
- **Trends** — a daily snapshot of all four counts, so you can see whether field sprawl is getting better or worse over time, not just a one-time scan you run and forget.
- **Export** — copy the current scan as plain text, ready to paste into a ticket, a spreadsheet, or a message to whoever owns cleanup.

## Built the way we build everything

Field Hygiene is read-only. It never renames, merges, or deletes a field — it reports, you decide, you fix it in Jira. It runs entirely inside Atlassian's own infrastructure, on Forge, with no third-party servers anywhere in the path. The only thing it stores is a daily aggregate count for the Trends chart — never a field name, a field ID, or any other identifying content. Uninstall it, and even that goes away.

That's not a compliance afterthought bolted on for the Marketplace review. It's the same standard we held Recap to, and the same one every app we build afterward will be held to: minimal access, platform-native storage only, nothing that leaves the platform you already trust.

## Pricing

Free for sites of 10 users or fewer. Paid per seat above that — and every feature ships identical at every tier. There's no crippled free version and no feature you have to pay to unlock; the free tier is a genuinely complete tool, not a trial with a ceiling.

## Try it

Field Hygiene is live now: [get it on the Atlassian Marketplace](https://marketplace.atlassian.com/apps/2905942594), or read more at [field-hygiene.isogunlabs.com](https://field-hygiene.isogunlabs.com/). If you administer a Jira site with more than a handful of custom fields, it takes about ten seconds to find out exactly how much cleanup is waiting for you.
