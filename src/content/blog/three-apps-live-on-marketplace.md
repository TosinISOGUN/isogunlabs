---
title: "Three Apps Live on the Atlassian Marketplace"
description: "Passdown is approved — Isogun Labs now has three apps live on the Atlassian Marketplace. Notes on what changed between the second and third review, what got easier, and what still caught us off guard."
pubDate: 2026-09-08
cover: "trust"
---

Passdown is approved and live on the [Atlassian Marketplace](https://marketplace.atlassian.com/apps/2948459916). That makes three — Recap, Field Hygiene, and now Passdown — all shipped by a team of one, all running on Atlassian Forge, all live and installable by anyone.

The [previous post](/blog/two-apps-live-lessons-learned/) covered what surprised us getting the first two through review. This one is shorter, because the third time through the process was genuinely easier — but not for the reasons you might expect, and not without one last thing that caught us off guard.

## What got easier

The security questionnaire was familiar. The same five sections, the same eighteen questions, the same structure we'd answered twice before. The answers were honest and short, and the Privacy & Security tab responses were approved on August 11 — about the same timeline as the previous two.

The listing itself was less work. By the third app, we had a template for the listing copy, the screenshots, the privacy policy, and the security page. Not a literal template — each app's listing is written from scratch — but a shape we knew how to fill. The Marketplace listing form has more surface area than the app itself, and that's a learning curve, not a complexity. The third time, the curve was behind us.

The Forge resolver architecture was the same pattern Recap uses: `asUser()` for the on-demand button, `asApp()` for the scheduled trigger, Forge KVS for the one small record we keep per on-call schedule. The LLM module is the same Forge-hosted Haiku model. The prompt fencing is the same `sanitizeText()` approach. Building the third app was faster because the second one taught us the hard parts.

## What still surprised us

The review itself took longer than the first two, and the reason was specific: Passdown's flagship feature — the automated shift handoff — fires when Jira Service Management's on-call schedule changes. The reviewer, Nisha, couldn't fully verify automatic comment posting and ticket re-assignment because her test environment didn't include a JSM on-call schedule shift change. The on-demand per-ticket summary was verified successfully, but the automated trigger needed a real schedule boundary to fire.

We provided detailed reproduction steps in the ticket reply — how to set up a JSM on-call schedule with a short rotation interval, how to trigger a shift change, and what to look for in the logs. Nisha reviewed the steps, confirmed they gave her what she needed, and approved the app. The lesson: when your app's core feature depends on a specific platform configuration that a reviewer's test environment might not have, the clearest possible reproduction instructions aren't optional. They're the difference between approval and another round trip.

The other thing that surprised us was something we didn't have to do. The "Submit Support Request" link on the listing was locked during review — the Partner Portal doesn't let you edit listing details while a review is in progress. We'd planned to update it after approval, but Nisha updated it on our behalf during the review, so by the time the app was approved, the support URL was already correct. That's not something we expected, and it saved us a post-approval task.

## What's the same across all three

All three apps share the same architecture and the same principles:

- **Runs on Atlassian Forge** — no external servers, no data leaving Atlassian's infrastructure by default.
- **Minimal permissions** — each app requests only what it needs to do its one job.
- **Bounded storage** — each app stores the smallest possible amount of data, and it's all inside Atlassian's own KVS.
- **The same LLM module** — Forge's built-in Claude Haiku, chosen for cost and capability, with the same prompt fencing pattern across all three apps.

The difference is what each one does with that architecture. Recap turns completed Jira work into a status report. Field Hygiene surfaces custom-field problems before they break anything. Passdown writes the handoff brief when a shift ends. Three apps, one job each, all live on the Marketplace.

## What's next

Three apps live is a milestone, not a finish line. The next work is maintenance — watching for Forge platform changes, keeping the listings current, and making sure the apps stay clean as Atlassian evolves. We'll write about that as it happens.

If you want to try any of the apps, they're all on the Marketplace now:

- [Recap](https://marketplace.atlassian.com/2146687861) — one-click monthly status reports for Jira
- [Field Hygiene](https://marketplace.atlassian.com/apps/2905942594) — custom-field hygiene scanner for Jira admins
- [Passdown](https://marketplace.atlassian.com/apps/2948459916) — automated shift handoffs for Jira Service Management
