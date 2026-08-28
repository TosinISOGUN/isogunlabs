---
title: "Passdown Has Been Submitted to the Atlassian Marketplace"
description: "Passdown — automated shift handoffs for Jira Service Management — is now in Marketplace review. Here's what happens next, what the security questionnaire actually asked, and what we learned from the third time through the process."
pubDate: 2026-08-24
cover: "market"
---

Passdown is built, deployed, working end-to-end against a real on-call schedule, and as of today, submitted to the Atlassian Marketplace for review. This is the third time we've been through this process — Recap and Field Hygiene both went through it before — and the shape of it is familiar, but Passdown brought one thing the first two didn't: a Cloudflare Worker in the request path, and a security questionnaire that asked about it directly.

## What happens now

Atlassian's own guidance puts a standard app review at 10 to 15 business days, with an initial response typically inside the first 5 to 10. That's function testing, a security pass, and the additional security workflow that now applies to both new apps and new versions of existing ones. We've been through this twice before, so the wait isn't a surprise — but it does mean Passdown won't be installable from the Marketplace for at least a couple of weeks. The Privacy & Security tab responses were submitted on August 11 and approved shortly after, and as of late August the review ticket has moved to "In Progress." The [Passdown site](https://passdown.isogunlabs.com/) has full documentation, the security page, and a way to get notified the moment it's live.

## The security questionnaire — what it actually asks

The Marketplace security questionnaire covers five sections: Authentication & Authorization, Data Security, Application Security, Secrets Management, and Vulnerability Management. Eighteen questions total, plus a free-text field for anything else you want to share. It's not a penetration test or a code audit — it's a structured self-assessment designed to surface whether you've thought about the things that matter before a reviewer spends time on your app.

Most of it was straightforward. Does the app use `asUser()` for user actions? Yes — the on-demand summary panel runs as the person clicking the button. Does the app use `asApp()`? Yes — the scheduled trigger has no user in session, so it runs as the app. Do you validate user inputs? Yes — `@forge/api`'s tagged templates for URL construction, `sanitizeText()` for LLM prompt fencing. Do you log sensitive information? No. Do you collect credentials? No. Have you read the bug fix policy? Yes. The pattern is the same one Recap and Field Hygiene went through, and the answers are honest and short.

## The one section that was different this time

Passdown is the first app we've shipped that is not zero-egress. Recap and Field Hygiene both run entirely inside Atlassian's platform — no external calls, no servers we operate, nothing leaves the platform boundary. Passdown can't be built that way, and the reason is specific: reading JSM's native on-call schedule from a Forge app's own system identity fails with a 403 on the relevant JSM Ops API. This is a confirmed Atlassian platform limitation, not a bug in our code — JSM Ops API permissions are strictly user-oriented, and Forge's scheduled triggers have no user in session. The only sanctioned workaround, confirmed with Atlassian's own developer-relations team on a filed platform report, is a small Cloudflare Worker that exchanges the app's Forge-issued system token for a short-lived impersonated user token and reads the schedule directly.

That Worker is real, disclosed external egress, and it means the questionnaire answers for Passdown diverge from the ones we gave for Recap and Field Hygiene in a few specific places:

- **"Does your app egress data to external hosts?"** — Yes. For Recap and Field Hygiene, this was a clean No. For Passdown, it's a Yes with a paragraph explaining exactly what transits the Worker (on-call participant identifiers only — never ticket content, comment text, or generated briefs) and why it exists.
- **"Does your app store data outside Atlassian?"** — Partially. The Worker stores nothing. It's a stateless per-request proxy. But the questionnaire doesn't have a "transiently, in memory, never persisted" option, so the answer is "partially yes, in a narrow, disclosed way" with the full explanation.
- **"Did you implement controls to safeguard customer data at rest on the remote host?"** — The Worker stores nothing, so there's no data at rest to safeguard. The absence of storage is itself the control. The questionnaire doesn't have a "not applicable" option here, so the answer is Yes — the control is that no data is retained.

None of these are evasions. They're honest answers to questions that weren't designed for an app with a stateless relay in its architecture. The free-text field at the end gave us space to lay out the full picture — what the Worker does, what it doesn't do, what it sees, what it never sees, and where the complete security and privacy details are published.

## What we'd already done before submitting

The [introduction post](/blog/introducing-passdown-shift-handoffs/) covered what Passdown does and why it exists. Between that post and this one, the remaining work was the same short list every app goes through before submission: final licensing checks, listing screenshots, and the security questionnaire. We also ran `npm audit` against both the app and the Cloudflare Worker, traced every advisory to its source, and confirmed that all findings are transitive — sitting in Atlassian's and Cloudflare's own SDK chains, not in our direct dependencies. No direct-dependency vulnerabilities in either.

We also caught and fixed one thing on the security page itself. The page claimed we pin to "released, non-prerelease versions" of Forge SDK dependencies, but two packages are on `-next` prerelease versions where the stable release doesn't yet support required UI Kit features. That's been corrected — the page now says so plainly, because a reviewer checking the manifest against the security page would have caught the discrepancy, and we'd rather fix it before they have to ask.

## What's next

The review is in Atlassian's hands now. We'll write the real launch post the day Passdown is installable from the Marketplace — not before. In the meantime, [passdown.isogunlabs.com](https://passdown.isogunlabs.com/) has everything: what the app does, how it works, the full security page, the privacy policy, and the documentation. If your team runs shift-based support in Jira Service Management and has ever lost the first twenty minutes of a shift to "wait, what actually happened here," it's worth a look.
