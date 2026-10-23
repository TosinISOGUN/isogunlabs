---
title: "A Shift Handoff Checklist for Support Teams"
description: "Most handoff problems are not about effort, they are about what gets left out. A practical checklist of what a good shift handoff contains, how to keep it short, and how to make sure it actually gets read."
pubDate: 2026-10-28
cover: "market"
draft: true
---

Every support team that runs in shifts has the same quiet failure. The person finishing knows exactly what is going on, the person starting does not, and the gap between them is one rushed message at the end of a long day.

Most of the time that message is fine. The times it is not are the ones people remember: a customer promised a callback that nobody knew about, an incident that "seemed to be fixed" and was not, a ticket that sat untouched for a whole shift because it looked like someone else's.

None of this comes from carelessness. It comes from the handoff being written by a tired person, at the last minute, from memory. This post is a checklist for making that handoff better, whatever tool you use to write it.

## What a good handoff has to answer

The incoming person should be able to read the handoff and know, without asking anyone, what needs their attention first. That means answering a small set of questions for every open item.

**What is this, in one line?** Not the whole history. A reader should know what the ticket is about before they open it.

**What is its current state?** Waiting on the customer, waiting on another team, being worked on, or stuck. "In progress" is a status. "Waiting on the customer's logs since 14:00" is a state.

**What has already been tried?** This is the line that saves the most time. Without it, the next person repeats the same first three steps and the customer sees the same questions twice.

**What is blocking it?** A missing answer, a missing permission, a dependency on another team. Name the thing and the person, not just "blocked."

**What happens next, and by when?** One concrete next action. If there is a deadline, a promise to the customer, or an agreed callback time, put it here, because this is the detail most likely to be lost.

**Who else knows about it?** If someone outside the team has context, such as an engineer who is investigating or a manager who has been looped in, say who. The incoming person should not have to hunt for them.

## What to leave out

A handoff that tries to say everything gets skimmed, and a skimmed handoff is not much better than none. Leave out:

- The full back-and-forth of the conversation. The ticket already has it.
- Items that are fully resolved. If it is closed, it does not need a line.
- Opinions about the customer. State what happened, not how it felt.
- Anything the reader can see in one click on the ticket itself.

A useful test: if you cut a line, would the incoming person make a worse decision in their first hour? If not, it was probably noise.

## Put the urgent things first

Order matters more than people expect. Read in the order you write it, a handoff starts with whatever the author thought of first, which is usually the most recent thing, not the most important.

Instead, sort the items by what needs action soonest. A simple structure works well:

1. **Needs action now.** Time-limited items, promised callbacks, anything breaching a service target soon.
2. **Active and in motion.** Things being worked on where the next step is clear.
3. **Waiting.** Items blocked on someone else, with the name of who.
4. **Worth watching.** Things that look quiet but could turn into a problem.

If the incoming person only reads the first block, they should still do the right thing.

## Make it hard to skip

The best handoff is useless if it sits somewhere the next person never looks. A few habits help:

- **Put it where the work is.** A comment on the ticket itself will be seen by anyone who opens it. A message in a channel may be buried by the time the next shift starts.
- **Name the person.** Mention the incoming owner directly, and assign the ticket to them. Ownership that changes hands in the system as well as in the message is much harder to miss.
- **Do it at the boundary, not after it.** A handoff written an hour after the shift ended is a summary of what someone remembers, not a record of what was true.
- **Let the receiver ask.** Five minutes of overlap, or a way to reply to the handoff, catches the questions the message could not predict.

## A short version you can paste

If you want a starting template, this covers most teams:

```
Ticket: [link and one-line description]
State: [waiting on customer / another team / in progress / stuck]
Tried: [what has been done so far]
Blocked by: [the thing and the person]
Next: [one action, and by when]
Also knows about it: [name]
```

Fill it in for each open item, sorted by urgency. If it takes more than a couple of minutes per ticket, the ticket probably needs a better summary before it needs a handoff.

## The part people skip: writing it takes effort

Everything above works, and almost every team agrees with it. The reason it does not happen consistently is not disagreement, it is time. At the end of a long shift, writing a clear handoff for a dozen tickets is real work, and it is the work that gets cut first.

That is the problem we built [Passdown](https://marketplace.atlassian.com/apps/3571155481) to take on for teams using Jira Service Management. When the on-call person changes, it reads each open ticket still assigned to the person who is leaving, writes a short brief covering what happened, what is blocking, and what is next, posts it as a comment, mentions the person coming on, and reassigns the ticket to them. It only works from what is already in the ticket's history, so it does not add details that were never there.

You do not need a tool to get most of the benefit. A consistent structure, an honest "tried" line, and the urgent items at the top will fix most handoffs. If writing it is the part that keeps slipping, it is reasonable to let something else do the first draft.
