---
title: "Jira Custom Field Limits: What Changes in 2026"
description: "Atlassian is capping Jira to 700 fields per configuration starting March 2026. What the limit really means, who hits it first, and how to audit your fields now."
pubDate: 2026-07-22
cover: "fields"
---

Open your Jira instance's field configuration page right now and count. Not the fields you
remember creating — the ones actually listed. Most admins who try this for the first time land
somewhere between "huh, more than I expected" and genuinely alarmed. Fields get added one
sprint at a time, one integration at a time, one "can we just add a quick field for this"
Slack message at a time. Nobody sits down and plans 400 custom fields. They just... arrive.

That used to be a tidiness problem. Starting March 2026, it's a hard wall.

<div class="fact-grid">
  <div class="fact"><div class="n">700</div><div class="l">fields per field configuration scheme</div></div>
  <div class="fact"><div class="n">150</div><div class="l">work types per space, same deadline</div></div>
  <div class="fact"><div class="n">Mar 2026</div><div class="l">enforcement begins — Sept 2026 for the second wave</div></div>
</div>

## The actual number, and what it applies to

Atlassian is enforcing a **700-field limit per field configuration scheme**. Not per project —
per scheme. That distinction matters more than the number itself.

If your organization does what most mid-size and larger Jira sites do — shares one field
configuration scheme across dozens or hundreds of projects — then all of those projects are
drawing from the same 700-field budget. One team's abandoned experiment field, another team's
five near-duplicate "Priority" variants, a field nobody's touched since 2023: they're all
sitting in the same shared account, and everyone using that scheme is paying rent on all of
them.

There's a second limit riding alongside it: **150 work types per space**. Same enforcement
date, same mechanism, less commonly the thing that trips people up first, but worth checking.

A few details worth knowing before you panic-delete anything:

- **Trashed fields don't count.** If you've already been sending unused fields to the trash,
  that cleanup is doing real work against the limit.
- **There's no cap on total custom fields site-wide.** The 700 ceiling is per scheme. A site
  with multiple field configuration schemes has multiple separate budgets.
- **Team-managed projects are stricter** — 50 fields per project, not shared with anything
  else. If your org leans on team-managed projects, this one's worth checking independently.
- **Select-list fields have their own sub-limit**: 10,000 options per field, across all
  contexts. Rare to hit, but it exists.

And this isn't the only wave. A second round of limits — covering releases, components,
workflows, permission grants, and a handful of other data types — lands in **September 2026**.
Field configuration is just the one arriving first, and the one with the widest blast radius
for a typical Jira admin.

## What "limit" actually means here (it's not what you'd guess)

The word "limit" makes it sound like Atlassian is about to start deleting your fields. It
isn't. Atlassian draws a real distinction between two words that get used almost
interchangeably everywhere else:

**Guardrails** are recommendations. Cross one and nothing stops working — you're just past the
point where Atlassian has tested for good performance.

**Limits** are enforced. Cross one and you lose the ability to do a specific thing until you're
back under it.

For the 700-field limit specifically, what actually happens in March 2026 is this: once a
scheme is over the cap, you can no longer **associate additional fields or work types** to
projects using that scheme. Your existing 750 fields don't vanish. Nothing gets auto-deleted.
Every field your teams already rely on keeps working exactly as it does today. What stops is
forward motion — the next new field request, the next integration that wants to add its own
custom field, the next well-meaning "let's just track one more thing" — until someone brings
the count back down.

For a team that rarely touches its Jira configuration, that's a non-event. For a team in the
middle of a busy quarter, mid-migration, or onboarding a new tool that provisions its own
fields on install, that's a Tuesday afternoon turning into an unplanned cleanup sprint.

## Why the count gets this high without anyone noticing

Talk to enough Jira admins about this and the same three causes come up, in roughly this order:

**Saying yes is easier than saying no.** A team lead asks for a field to track something for
one project. Creating it takes thirty seconds. Pushing back means a conversation about whether
it's really necessary, whether an existing field could work instead, whether this sets a
precedent. Thirty seconds wins, every time, at scale.

**Nobody wants to be the one who deletes something.** A field with no clear owner and no
recent activity looks exactly like a field that's quietly critical to one report someone runs
once a quarter. Admins default to leaving it alone, because the downside of deleting something
load-bearing is a lot louder than the downside of one more unused field sitting in a list.

**Institutional memory doesn't survive admin turnover.** The person who created "Client Impact
Score v2" three years ago left the company eighteen months ago. Whoever's administering Jira
now has no way to know if it's safe to remove, so it stays — alongside "Client Impact Score,"
"Client Impact (old)," and whatever the next admin adds when they can't find either of the
first two.

None of that is negligence. It's just what happens to any shared, low-friction system over a
long enough timeline, in the total absence of an actual limit forcing the question. Now there's
a limit forcing the question.

## Checking where you actually stand

Before doing anything else, find out if this is a real problem for you or a non-issue.

**In the product:** go to **Settings → Issues → Field configuration schemes**. Every scheme
lists its associated fields, and you can see counts per scheme rather than guessing at a
site-wide total that (as covered above) doesn't actually exist as a single number. Do this for
every scheme in active use — if you've got several, the one closest to 700 is the one that
matters, not the average.

**If you're on Premium or Enterprise:** Atlassian's Site Optimizer will actively flag unused
fields for you. It's a genuinely useful tool for this specific problem, and worth running
before you do any manual audit work — no reason to hand-check what a built-in tool already
checked for you.

**If you're on Standard:** Site Optimizer isn't available on your plan, and that's a real gap —
this is exactly the kind of admin housekeeping that shouldn't require an Enterprise contract to
see clearly. Standard-plan admins are, for now, stuck doing this manually.

## Doing the audit manually

If you're working without Site Optimizer, three checks catch most of the real problems:

**Sort by name and read the list top to bottom.** This alone surfaces an uncomfortable amount.
Capitalization variants ("Start Date" next to "Start date"). Semantic duplicates that mean the
same thing to different teams ("Client," "Customer," "Account Name"). Versioned names that
tell their own story ("Priority," "Priority_v2," "Priority - NEW" — someone gave up naming
things properly around the third one).

**Check whether a field is actually holding data.** For any field you suspect is dead weight,
run a JQL search: `"Field Name" is not EMPTY`. Zero results is close to a confirmed kill. A
handful of results from a project nobody's touched in two years is close enough to the same
answer.

**Look at scope before you look at deletion.** A field applied globally, across every project
in a scheme, when only two projects ever use it, is often a bigger win to fix than deleting
fields outright — narrowing its context frees up the same shared budget without losing any
data or breaking anything for the two projects that need it.

## The part worth sitting with

None of this is really about the number 700. It's about the fact that Jira has run, until now,
on a kind of unspoken trust — that nobody's tracking how much configuration debt accumulates,
so nobody has to reckon with it until something breaks. That trust made sense when the ceiling
was theoretical. It stops making sense the moment the ceiling has a date on it.

March 2026 isn't far off. The sites that treat this as a five-minute check now — open the field
configuration schemes page, see where the numbers actually sit — are going to have a very
different quarter than the ones that find out the hard way, mid-sprint, when a routine field
request suddenly won't go through.
