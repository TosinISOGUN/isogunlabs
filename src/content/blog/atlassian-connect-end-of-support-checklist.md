---
title: "Atlassian Connect End of Support: A Checklist for App Builders"
description: "Atlassian moved the Connect end-of-support date to 31 January 2027. What has already changed, what Atlassian says happens next, and a checklist for builders who still have a Connect app, based on Atlassian's own documentation."
pubDate: 2026-11-07
cover: "market"
draft: true
---

If you have an app on Atlassian Connect, the date that matters most to you has moved, and the answer to "how long do I have" now depends on which page you read.

Our own apps, Recap, Field Hygiene, and Passdown, were built on Forge from the start, so we have not migrated a Connect app ourselves. This post is a reading of Atlassian's published documentation, with the sources linked, for builders who are working out what to do. Where the pages disagree, we say so. Check the linked pages again before you plan around any date here, because Atlassian has already changed this one once.

## The date, and why you will see two

Atlassian's Forge changelog has an announcement dated 7 August 2026 titled "Connect End of Support (EOS) date extended to January 31, 2027." It says the date moved from December 2026, to give vendors additional runway to complete their migrations and to avoid overlapping with end-of-year activities and annual planning cycles. That is the current date: **31 January 2027**. A separate changelog entry, dated 4 August 2026, says Atlassian is contacting Connect and Forge app vendors directly ahead of the deadline.

You may still see "end of 2026" in older material. Atlassian's own explainer for custom apps, for example, says Connect "will reach end of support at the end of 2026." That page predates the extension. If a blog post, a vendor email, or a colleague quotes the earlier date, the changelog is the more recent source.

You can read the announcement in the [Adopting Forge from Connect changelog](https://developer.atlassian.com/platform/adopting-forge-from-connect/changelog/).

## What has already happened

Two earlier steps matter, because they already limit what you can do:

- **New Marketplace apps must be Forge.** The deprecation notice was announced on 18 March 2025 and took effect on 17 September 2025. From that date, new Marketplace apps must be built on Forge and cannot contain Connect modules. Existing Connect apps were not affected at that point. This is described in Atlassian's [announcement of the Connect end-of-support timeline](https://community.developer.atlassian.com/t/announcing-connect-end-of-support-timeline-and-next-steps/90381).
- **Updates to Connect apps stopped after Phase 2.** Atlassian's explainer says you can no longer push updates to Connect apps after Phase 2, which took effect on 31 March 2026. If you are reading this with a Connect app and you have not started moving, that is the constraint that is already in force.

## What Atlassian says happens at the end

According to Atlassian's published guidance, after end of support Connect receives no security or feature updates, and continued use is described as "at your own risk." The same guidance says some features may eventually stop working. It does not say that apps stop running on the end-of-support date, and we are not going to claim they do.

For customers, Atlassian says no action is needed for apps bought from the Marketplace, because the vendors are responsible for migrating them. For custom apps built and maintained by the customer, the customer has to handle the migration, which is why internal teams are paying attention too. The [Atlassian explainer on custom apps and migration](https://www.atlassian.com/blog/development/connect-end-of-support-what-it-means-for-custom-apps-and-how-to-migrate-to-forge) covers that side in more detail.

## A checklist for builders

**1. Confirm what you actually have.** List every app you maintain that still uses Connect modules, including internal or custom ones. People often forget the small one that a customer installed years ago.

**2. Check whether you have the source.** For a custom app, if you do not have the source code, you may have to rebuild it. Find out now, not in January.

**3. Audit what the app really uses.** Make a list of the Connect capabilities in use and compare each to its Forge equivalent in Atlassian's documentation. Some will map cleanly. Note the ones that do not, and raise missing capabilities with Atlassian rather than assuming they will appear.

**4. Build a small proof of concept.** Atlassian recommends starting with a Forge proof of concept. Pick the riskiest feature, not the easiest, and build that first. If it cannot be done on Forge, you want to know in week one.

**5. Understand the listing process for Marketplace apps.** Atlassian's page on [listing a Forge successor to a Connect app](https://developer.atlassian.com/platform/marketplace/listing-forge-successor-to-connect-apps/) describes the route. In outline, you integrate your Connect app with Forge, enable sharing, publish a new version to the Marketplace by selecting the Forge app, and customers then update through the Universal Plugin Manager (UPM). If the Forge app does not appear when you create the version, the page says to add `app.connect.key` to `manifest.yml`, which tells the Marketplace which Connect listing the Forge app replaces, then deploy to production and try again.

**6. Protect your testing.** The same page warns that production installs of paid apps are billed, including installs you only use for testing. Do your testing in development or staging.

**7. Plan for rollback and staging.** Per that page, rolling back to the previous Connect version and staged rollouts both need a Marketplace Support ticket, and the page does not describe a self-serve option. Build that lead time into the plan.

**8. Get the privacy and security details right.** A Forge listing needs accurate privacy and security information on the Privacy and Security tab, ways to report and erase personal data, and the right terms in place. This is the part we spend the most time on for our own submissions, and it tends to take longer than the code.

**9. Watch your ECOHELP tickets.** Atlassian says vendors still on Connect are being contacted directly through ECOHELP tickets. If one arrives, answer it. It is also a useful sign that your app has been flagged.

## What we would do first

If we had a Connect app today, we would do three things this week: list every app and module, decide for each one whether it is worth migrating or retiring, and build the proof of concept for the hardest feature. Everything else depends on those answers, and none of them take long.

The date moved once, and it may or may not move again. Treating 31 January 2027 as fixed costs you a little effort. Treating it as flexible could cost you your listing.

If you are earlier in the journey and thinking about building a first Forge app rather than migrating one, our [founder's guide to shipping your first Atlassian app](/blog/founders-guide-shipping-first-atlassian-app/) covers the path from choosing a problem to launch.
