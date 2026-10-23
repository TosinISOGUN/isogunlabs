---
title: "How to Find and Clean Up Duplicate Custom Fields in Jira"
description: "Duplicate custom fields make reports unreliable and push you toward Atlassian's field limits. A step-by-step way to find them, choose which one to keep, move the data, and remove the rest without breaking anything."
pubDate: 2026-10-23
cover: "fields"
---

Every Jira site that has been around for more than a year has duplicate custom fields. Nobody plans it. One team needs a field called "Environment," another team does not look hard enough to find it, and a third copy appears the next time an integration is set up. A year later there are four fields that all mean roughly the same thing, and nobody is sure which one the dashboard reads.

We covered the hard numbers in [Jira Custom Field Limits: What Changes in 2026](/blog/jira-custom-field-limits-2026/). This post is about the other half of the problem: how to actually find the duplicates and remove them without breaking a report someone relies on.

## Why duplicates are worse than they look

Counting toward a limit is the obvious cost. The quieter cost is that duplicates split your data.

If half of your tickets store the customer in "Customer" and the other half store it in "Client," then any filter, dashboard, or export that uses one of them is quietly wrong. It does not error out. It just leaves out everything stored in the other field, and the person reading the report has no way to tell.

There are also costs for the people filling the form in. Two fields with nearly the same name means every person creating a ticket has to guess which one to use, and they will not all guess the same way.

## Three kinds of problem, in order of how much they matter

Before you touch anything, sort what you find into three groups. They need different handling.

**1. Exact-name duplicates.** Two fields with the same name. The most dangerous version is when they are different types, for example a text field called "Environment" next to a dropdown called "Environment." They look identical in a list, they behave differently in a search, and you cannot merge them by just picking one.

**2. Near-duplicates.** Fields that differ only by capitalization, spacing, a suffix, or a different word for the same idea: "Start Date" and "Start date," "Priority" and "Priority_v2," "Client" and "Customer." These are the ones that people created because they could not find the original.

**3. Unused fields.** Fields that are on no screen, or that have not held a value in a long time. These are the safest to remove, and they are a good place to start because the cleanup builds confidence before you tackle the harder groups.

## Step 1: Get the full list

In Jira, go to **Settings → Issues → Custom fields**. Sort by name and read it from top to bottom. It is tedious, and it is also the fastest way to spot near-duplicates, because your eye catches patterns that no search does.

Copy the list somewhere you can annotate it, such as a spreadsheet. For each suspicious group, write down the field names, their types, which screens each is on, and whether it has a description. You will need this later when you decide what to keep.

## Step 2: Choose the field you are keeping

For each group of duplicates, one field survives. Pick it on evidence, not on which name you like best.

- **Type.** Does it match how the data is actually entered? A free-text field that is full of the same five values should probably be a dropdown, and that may mean the "wrong" field is the right one to keep.
- **Spread.** Which one is on the most screens and used by the most projects? Moving a smaller team onto the larger field is less disruptive than the reverse.
- **Dependencies.** Which one do saved filters, dashboards, automation rules, and any connected apps already use? The one with the most things attached to it is the expensive one to move away from.
- **Description.** Does it have one? A field with a clear description is easier for the next person to understand. If neither has one, write one for the survivor now.

One practical tip: when two fields share a name, searching by name in JQL can be ambiguous. Use the field ID form, `cf[10042]` with your own field's number, so you know exactly which one you are counting. The ID is in the URL when you open the field in the admin screens.

## Step 3: Check what is actually in them

Do not decide on names alone. For each candidate, run a search that counts the issues holding a value, for example `cf[10042] is not EMPTY`, and compare the results with the field you plan to keep.

This tells you three useful things. A field with zero results can be removed with very little risk. A field with a small number of results from old projects is a candidate for a one-off data move. A field with a large number of results needs a plan before anyone touches it.

## Step 4: Move the data, if it matters

Jira does not have a one-click way to merge two custom fields into one. If the data in the field you are retiring is worth keeping, you have to move it across yourself. The usual options are a bulk edit for small sets, a CSV export and re-import for larger ones, or an automation rule that copies the value from one field to the other.

Whichever you pick, do it on a small batch first, check the result in the survivor field, and only then run the rest. If the two fields are different types, decide how the values map before you start. A dropdown has fixed options, and free text rarely lines up with them neatly.

If the old data is not worth the effort, say so in writing and move on. "We do not need the history from this field" is a legitimate decision as long as someone actually made it.

## Step 5: Trash first, delete later

When you remove a custom field in Jira Cloud, it goes to the trash first. Atlassian's documentation says a trashed field can be viewed and restored for 60 days, after which it is permanently deleted and the data stored in it is lost. That window is your safety net, so use it.

Trashing a field can also break anything that depends on it: automation rules, workflow functions, saved filters, or third-party apps. Before you trash anything, check each of those for references. After you trash it, give the site a few days to show you what you missed before the 60 days run out.

Take a backup before you permanently delete anything. A field that looked unused usually is, but the cost of being wrong is high and the cost of waiting is almost nothing.

## Step 6: Stop it coming back

Cleanup without a habit behind it just resets the clock. A few small rules prevent most of the regrowth:

- **One place to ask.** Any request for a new field goes through one person or one form, and the first question is "does an existing field already do this?"
- **A naming convention.** Pick one style, write it down, and apply it. Most near-duplicates come from people naming the same idea differently.
- **A required description.** If someone cannot explain what a field is for in one sentence, it is not ready to be created.
- **A regular look.** Put a short review in the calendar every quarter. An hour spent on a small list is far easier than a week spent on a large one.

## Where a tool helps

Everything above can be done by hand, and for a small site it should be. On a larger one, steps 1 to 3 are the slow part: reading hundreds of names, checking types, and working out which fields are on no screen.

That is the part we built [Field Hygiene for Jira](https://marketplace.atlassian.com/apps/2905942594) to do. It reads your custom fields and shows exact-name duplicates, near-duplicates, unused fields, and how close each field configuration is to Atlassian's limits, all on one page. It is read-only. It never renames, merges, or deletes anything, so the decisions in steps 2, 4, and 5 stay with you.

Whether you use a tool or a spreadsheet, the order stays the same: find the problem, choose the survivor on evidence, move the data that matters, trash before you delete, and put a habit in place so you do not have to do this again next year.
