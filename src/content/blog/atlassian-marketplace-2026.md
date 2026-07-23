---
title: "Building on the Atlassian Marketplace in 2026: What We're Actually Seeing"
description: "Revenue share moved twice this year, Connect is on a real deadline now, and reviews still take two weeks. Notes from the seller side of the Marketplace."
pubDate: 2026-07-23
cover: "market"
---

Every listing on the Atlassian Marketplace shows the same things to a shopper: a green
compatibility badge, a star rating, an install count nobody outside Atlassian can verify down
to the last digit. What it doesn't show is everything sitting behind that badge — a revenue
split that's moved twice in the last seven months, a platform being quietly retired out from
under half the apps in the catalog, and a review queue every single update has to clear before
it reaches a customer. We're on the other side of that badge. Here's what the last few months
have actually looked like from there.

<div class="fact-grid">
  <div class="fact"><div class="n">10–15</div><div class="l">business days for a standard app review, per Atlassian's own guidance</div></div>
  <div class="fact"><div class="n">100%</div><div class="l">revenue kept on qualifying Forge apps, up to $1M lifetime — no share paid at all</div></div>
  <div class="fact"><div class="n">Q4 2026</div><div class="l">Atlassian Connect enters full end-of-support</div></div>
</div>

## The rate card moved twice, and it's not done

Atlassian has changed how much of a sale it keeps twice in the last year, and both changes push
in different directions depending on what your app is built on.

The standard Forge revenue share went from 15% to 16% on April 1, and it steps up again to 17%
on October 1. Connect's standard share moved further, faster — 15% to 20% in April, then 20% to
25% in October. Same two dates, same pattern, but Connect apps are absorbing a much steeper
climb than Forge apps are.

Sitting alongside that increase is a genuinely large carve-out: qualifying **"Runs on
Atlassian"** apps now keep 100% of Marketplace revenue, with no share paid at all, up to $1
million in lifetime Forge earnings. Not a discount — zero. To qualify, an app has to contain no
Connect modules, authenticate with OAuth, run on Forge UI, and — the part that actually
separates "Runs on Atlassian" from ordinary Forge apps — make no calls to infrastructure outside
Atlassian's own platform. No third-party servers in the request path at all.

That last requirement is the interesting one for us specifically, because it isn't a hoop we
had to jump through. It's just a description of how Recap already works. We built it to store
nothing and call nothing outside Jira because that was the right way to build a status-report
tool that touches real work data — the revenue incentive showing up later almost feels like
Atlassian catching up to a decision we'd already made for other reasons.

If your app already lives entirely inside Atlassian's infrastructure, this is close to a
non-event — mildly better economics on a thing you were doing anyway. If it doesn't, the gap
between "doesn't qualify" and "qualifies" just became one of the more consequential
architecture decisions a Marketplace partner can make this year.

## Connect's sunset finally has teeth

Every developer who's shipped on Connect has heard some version of "it's going away eventually"
for a couple of years now. That framing stopped being useful in 2026, because the dates are no
longer vague.

Descriptor updates for Connect apps already stopped in March. Anyone maintaining a Connect app
right now is maintaining it in a frozen state — whatever version was live before March is what
customers get, full stop, no incremental fixes going out through the old pipeline. Then in the
fourth quarter of this year, Connect crosses into full end-of-support: only critical or
security-adjacent bugs get attention, support tickets tied to Connect get pushed to the back of
the queue behind Forge, and — Atlassian has said this plainly — apps still running on it move
into what they're calling an "undesired state," with messaging to that effect surfacing
directly on the Marketplace listing itself.

None of that switches a working Connect app off overnight. It keeps running. What it does is
start a clock that customers can now see. A prospective buyer scanning a listing this quarter
who notices the "Connect" tag instead of "Forge" is looking at an app whose vendor has, at most,
a few months left before official support effectively stops. We'd think twice before recommending
a customer commit budget to that, and we'd expect careful buyers to think the same.

For a studio our size, this was decided the day we opened the Forge docs instead of the Connect
ones. But for the partners with a real Connect install base — years of customers, real revenue,
a genuine migration project ahead of them — 2026 is the year the runway stopped being
theoretical.

## Getting a listing live still takes real time

The part of this that doesn't show up in any announcement post: shipping anything to the
Marketplace, first submission or routine update, runs through a queue. Atlassian's own guidance
puts a standard review at 10 to 15 business days, with an initial response typically inside the
first 5 to 10. That's function testing, a security pass, and — new this year — an additional
security workflow layered on top of both new apps and new versions of existing ones, meant to
raise the baseline across the whole catalog.

We're not going to argue the review shouldn't exist. A marketplace where anyone can push
straight to production with no check in between is a marketplace nobody should trust with
access to their Jira data, and the tightening is a reasonable response to a platform that's only
gotten more central to how teams actually work. But it does mean release planning has to build
in two to three weeks of slack that a lot of other software doesn't require. A fix that would
ship the same afternoon on most platforms sits in a queue here. Plan around it, or the timeline
plans around you.

## What this adds up to

Line all three of these up and a pattern shows through that no single announcement states
outright: Atlassian is steering the entire Marketplace toward a narrower, more contained,
Forge-only shape, and rewarding the apps that were already headed there. The economics reward
it, the platform-support clock punishes not doing it, and the review process is tightening
around everyone regardless of which side of that line they're on.

For a small studio building one focused thing at a time, that direction happens to line up with
how we'd have built anyway. For the bigger, older players carrying a decade of Connect install
base, it's a genuinely hard year. Either way, if you're the one browsing the Marketplace instead
of building on it — this is worth two extra clicks before you buy. Check whether the listing
says Forge or Connect, and check when it was last updated. In 2026, that tells you more about an
app's future than the star rating does.
