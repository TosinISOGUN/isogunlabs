---
title: "A Founder's Guide to Shipping Your First Atlassian App"
description: "A practical guide for founders building their first Atlassian Marketplace app: choosing a real problem, scoping a Forge build, handling permissions, preparing trust materials, pricing, review, launch, and support."
pubDate: 2026-09-28
cover: "market"
---

Building an Atlassian app looks simple from the outside. You find a Jira or Confluence problem, build a small tool, submit it to the Marketplace, and wait for customers to install it.

That version is not wrong, but it is incomplete.

The actual work sits in the details: choosing a problem that admins care about, keeping the first version small enough to finish, understanding Forge environments, requesting the right permissions, preparing a Marketplace listing, answering trust questions, thinking about support, and pricing the app in a way that matches how Atlassian customers buy software.

This guide is written for founders, small teams, and independent builders who want to ship their first Atlassian Marketplace app without treating the Marketplace as an afterthought. It is not legal advice, and it is not a substitute for Atlassian's documentation. Think of it as a practical field guide: the things worth thinking through before you are already deep in review, support, and release management.

## Start with an admin problem, not an app idea

The first mistake is starting with a feature instead of a pain.

Atlassian products are already flexible. Jira, Confluence, and Jira Service Management can be configured in many ways before an app is ever installed. That means your app has to earn its place. It should solve a problem that is painful enough for someone to install, approve, and possibly pay for another product inside their workspace.

A good first Atlassian app idea usually has at least one of these qualities:

- It saves administrators time.
- It reduces repeated manual work.
- It makes messy data easier to understand.
- It improves governance or cleanup.
- It helps teams report on work they already track.
- It fills a gap that native Jira or Confluence features do not handle cleanly.
- It gives managers or operators a clearer workflow without asking every user to change behavior.

That last point matters. Atlassian customers already have workflows. They have boards, projects, fields, issue types, request types, automations, permissions, and reporting habits. A first app should not require the whole company to change how it works before the value appears.

A better question than "What can I build?" is:

> What does a Jira or Confluence admin already do manually that should be easier, safer, or more visible?

If the problem is real, the first version can be small. If the problem is vague, even a large app will feel unnecessary.

## Pick the right platform shape early

For most new cloud apps, Forge is the natural place to start. Atlassian describes Forge as its cloud app development platform, with hosting, scaling, and infrastructure handled by Atlassian. That does not remove all engineering work, but it does change the shape of the work. You are building inside Atlassian's app model instead of standing up every piece of infrastructure yourself.

Forge apps are described through a `manifest.yml` file. The manifest declares important parts of the app, including modules and permissions. That file becomes one of the most important documents in the project because it explains where the app appears and what access it asks for.

Before writing too much code, decide what kind of app you are building:

- A small Jira admin utility.
- A project page or issue panel.
- A report or dashboard experience.
- A Confluence content or governance tool.
- A Jira Service Management operational workflow.
- A scheduled job or background process.
- A bridge between Atlassian data and an external service.

Those choices affect modules, permissions, UI choices, storage, pricing, support expectations, and review risk.

This is also the point where you should be honest about whether you really need external infrastructure. Forge can host many useful apps without a separate backend. If your first version can stay within Forge, that usually simplifies security, deployment, and operations. If the app needs external systems, analytics, AI providers, payment handling, or another hosted service, plan the trust story early. Customers and reviewers will care where data goes.

## Keep the first version narrow

A first Atlassian app should be smaller than your imagination wants it to be.

The Marketplace rewards clear utility. A narrow app with a strong use case is easier to explain, test, document, support, and sell. A broad app with five half-finished workflows gives you more surface area, more review risk, and more places for customers to get confused.

A good first version should answer:

- What is the one workflow this app improves?
- Who owns that workflow?
- What does success look like after installation?
- What can the user do in the first five minutes?
- What should the app not do yet?

The last question is underrated. Scope control is not just an engineering tactic. It is a trust tactic. If your app asks for less, does less, and explains itself clearly, it is easier for an admin to evaluate.

For example, an app that identifies unused Jira fields is easier to understand than a general "Jira workspace optimizer." A monthly reporting app is clearer than a broad "team intelligence platform." A shift handoff tool for support teams is clearer than a generic "collaboration assistant."

Clear beats impressive in a first release.

## Treat permissions as a product decision

Permissions are not just a technical requirement. They are part of the customer's first impression.

In Forge, permissions and scopes are declared in the manifest. If the app requests too much access, an admin may hesitate before installing it. If it requests too little, the app will not work. The goal is to ask for what the product actually needs and be able to explain why.

This means permissions should be reviewed the same way you review pricing, onboarding, or copy. Ask:

- Which Jira or Confluence APIs does the app actually call?
- Which scopes are required for those calls?
- Can any scope be removed?
- Does the app read user-generated content?
- Does any data leave Atlassian-hosted infrastructure?
- Is external egress required?
- Can the listing explain the app's data use plainly?

Do this early. Do not wait until the week of submission to think about scopes, privacy, and egress. They affect architecture.

A practical habit is to keep a short permissions note in the repository. It does not have to be fancy. It can simply list each requested scope, why it exists, and which feature needs it. That note becomes useful when writing documentation, answering security questions, and reviewing whether a new feature is worth the additional access it requires.

## Understand Forge environments before launch pressure begins

Forge gives apps separate environments such as development, staging, and production. Atlassian's documentation recommends using development for testing changes, staging for a stable version, and production for the version ready for use.

That sounds straightforward until you are debugging a real install.

An app can be deployed to one environment and installed from another. A tester may be using a development install while you are deploying a fix to production. Environment variables are also tied to deployments. If you do not know which environment is installed on a test site, it is easy to think a fix failed when it was simply deployed somewhere else.

Before launch, build simple habits:

- Know which environment each test site is running.
- Use staging for release candidates, not random experiments.
- Keep production boring.
- Confirm environment variables before testing integrations.
- Reinstall or upgrade deliberately when testing major changes.
- Write down the release steps instead of relying on memory.

This sounds operational, but it is part of product quality. Customers do not care that the bug is fixed in the wrong environment. They care whether the app works where they installed it.

## Build the listing while you build the app

A Marketplace listing is not a launch-day writing task. It is part of the product.

Atlassian's listing guidance covers approval, visuals, content, trust, support, branding, and testing. The important practical point is that the listing has to make the app understandable to someone who has never seen your internal roadmap, demo calls, or design notes.

A strong listing should answer:

- What problem does this app solve?
- Who is it for?
- Which Atlassian products does it work with?
- What does the app do after installation?
- What data does it access?
- What proof or screenshots show the app in context?
- What support can customers expect?
- Is pricing clear?

Screenshots matter more than founders sometimes expect. A screenshot is not just decoration. It tells an admin whether the app feels native, understandable, and safe. Do not upload random UI crops at the end. Plan the screenshots around the buying questions.

For a first app, you usually need screenshots that show:

- The main app surface.
- The app in context inside Jira, Confluence, or JSM.
- A realistic example state.
- A result or output that makes the value obvious.
- Empty, loading, or setup states if those are important to trust.

The listing should not promise a platform if you built a focused tool. Be specific. Buyers trust concrete claims more than big language.

## Prepare for trust review before submission

Trust is central in the Atlassian ecosystem. Atlassian has cloud app security requirements for Marketplace apps, and buyers can review vendor-provided privacy and security information on Marketplace listings.

This is not just a compliance box. For many companies, an Atlassian app touches operational work, customer support, internal projects, incidents, product planning, or documentation. Admins need to know what the app can access and how the vendor handles responsibility.

Before submitting, prepare plain answers to questions like:

- What data does the app access?
- Does the app store data?
- If it stores data, where?
- Does any data leave Atlassian infrastructure?
- Does the app use third-party services?
- How is support handled?
- How are incidents reported?
- What is the privacy policy?
- What is the terms of use page?
- Who can customers contact?

Do not write these answers like marketing copy. Write them like a buyer, reviewer, or security person might actually need to use them.

It is also worth creating simple public pages before submission:

- Privacy policy.
- Terms of use.
- Security or trust page.
- Support page.
- Documentation or getting started guide.

Even if the first versions are short, they show that the app is not just code. It is a product someone is prepared to support.

## Price with the Atlassian buying model in mind

Pricing an Atlassian app is different from pricing a standalone SaaS product.

Marketplace cloud apps are commonly billed in relation to the parent Atlassian app's user tier. Atlassian's billing documentation explains that Marketplace apps are priced based on the number of users in the Atlassian app, and that the billing cycle of the Marketplace app matches the billing cycle of the parent Atlassian app.

That has real product implications.

A small utility may feel affordable at one tier and too expensive at another if the value does not scale with the customer's site size. A tool used by one admin may still be evaluated against the full user tier. That does not mean admin tools cannot be paid products. It means the pricing story has to match the value story.

When thinking about price, ask:

- Is the app valuable to one admin, a whole team, or the whole site?
- Does value increase as the instance grows?
- Would a large customer understand why the price scales?
- Is the app saving time, reducing risk, improving reporting, or enabling a workflow?
- Is there enough ongoing value to justify renewal?

Do not price only by how long the app took to build. Price by the problem it solves and the kind of customer it serves.

It is also useful to look at nearby Marketplace categories. Not to copy prices blindly, but to understand buyer expectations. Apps that clean up administrative debt, automate reporting, or support compliance may be evaluated differently from decorative UI extensions.

## Test like a reviewer, not only like the builder

The builder knows how the app is supposed to work. A reviewer does not. A customer does not.

Before submission, test the app like someone encountering it cold:

- Install it on a clean site.
- Use realistic data, not only perfect sample data.
- Test empty states.
- Test large data sets if the app reads many issues, fields, pages, users, or projects.
- Test permission errors.
- Test slow API responses.
- Test what happens when a user lacks access.
- Test the first run after installation.
- Test uninstall and reinstall if the app stores data.
- Test production, not only development.

Many first-app bugs are not deep engineering problems. They are ordinary edge cases: a missing error handler, a spinner that never resolves, an empty state that assumes data exists, a permission issue that shows a raw error, or a UI that only works with the developer's test project.

A good review pass asks: what happens when the app cannot do what it wanted to do?

If the answer is "it fails clearly and helps the user recover," you are in a better place. If the answer is "it hangs," "it crashes," or "it shows a scary error string," keep working.

## Plan support before people need it

Support is part of the product. It does not begin when the first ticket arrives.

A small Marketplace vendor should have at least:

- A support email or portal.
- A public support page.
- Basic documentation.
- A way to track issues.
- A policy for response expectations.
- A release note habit.
- A process for security reports.

You do not need a large support team to be professional. You need a clear path for customers to get help and a disciplined way to respond.

This matters because Atlassian customers are often administrators acting on behalf of teams. If something breaks, they may be the person receiving complaints internally. Your support experience affects their confidence in your app.

A useful standard for a first app is simple: if a customer reports a bug, can you reproduce it, understand the environment, identify the affected version, and communicate the next step without guessing?

If not, improve your logging, docs, and release process before the Marketplace becomes your first real test environment.

## Do not treat approval as the finish line

Getting approved on the Marketplace is a milestone. It is not the end.

After approval, there is still launch work:

- Update the product website.
- Update docs from "coming soon" to live.
- Confirm pricing and listing pages.
- Check install flows.
- Announce carefully.
- Monitor errors.
- Watch support inboxes.
- Confirm analytics or basic traffic signals.
- Record what you learned during review.

The first week after launch is useful because it tells you what the listing did not explain well. If people ask the same question twice, the docs or listing should probably answer it. If users install but do not complete setup, onboarding needs work. If nobody installs, the problem may be positioning, category fit, pricing, screenshots, or simply distribution.

Marketplace approval makes the app available. It does not automatically create demand.

## A practical first-app checklist

Before writing code:

- Define the user and the admin problem.
- Confirm the problem exists in real Jira, Confluence, or JSM workflows.
- Choose the smallest useful version.
- Decide whether Forge alone is enough.
- List the scopes and data access the app may need.

During development:

- Keep the manifest clean.
- Track why each permission exists.
- Test in development and staging.
- Build empty, loading, success, and error states.
- Use realistic test data.
- Keep production boring.

Before submission:

- Prepare screenshots.
- Write the listing in plain language.
- Complete privacy and security materials.
- Publish privacy, terms, support, and documentation pages.
- Test installation on a clean site.
- Confirm pricing and billing assumptions.
- Review Atlassian approval guidelines.

After approval:

- Update every public page that mentions the app.
- Monitor installs and errors.
- Respond quickly to early support issues.
- Turn review surprises into checklist items.
- Keep release notes and docs current.

## What matters most

A first Atlassian app does not need to be huge. It needs to be useful, understandable, and trustworthy.

The best first app solves a real problem with a narrow workflow. It asks for sensible permissions. It behaves well when things go wrong. It explains itself clearly on the Marketplace. It has a support path. It treats trust as part of the product, not paperwork.

That is the difference between shipping code and shipping a product.

If you are a founder entering the Atlassian ecosystem, the opportunity is real. But the Marketplace is not just a distribution channel. It is a product environment with expectations around security, admin trust, billing, review, and long-term support.

Build for those expectations from the start, and your first app has a much better chance of becoming something customers can actually rely on.

## Sources and useful Atlassian links

These are the official Atlassian resources worth reading before and during your first Marketplace submission:

- [The Forge platform](https://developer.atlassian.com/platform/forge/introduction/the-forge-platform/)
- [Forge manifest reference](https://developer.atlassian.com/platform/forge/manifest-reference/)
- [Forge permissions reference](https://developer.atlassian.com/platform/forge/manifest-reference/permissions/)
- [Forge environments and versions](https://developer.atlassian.com/platform/forge/environments-and-versions/)
- [Forge deploy command](https://developer.atlassian.com/platform/forge/cli-reference/deploy/)
- [Create your Marketplace listing](https://developer.atlassian.com/platform/marketplace/creating-a-marketplace-listing/)
- [Marketplace app approval guidelines](https://developer.atlassian.com/platform/marketplace/app-approval-guidelines/)
- [Security requirements FAQ for cloud apps](https://developer.atlassian.com/platform/marketplace/security-requirements-faq/)
- [Atlassian Marketplace App Trust](https://www.atlassian.com/trust/marketplace)
- [Pricing, payment, and billing for Marketplace apps](https://developer.atlassian.com/platform/marketplace/pricing-payment-and-billing/)
- [Understand billing for Marketplace apps](https://support.atlassian.com/subscriptions-and-billing/docs/understand-billing-for-cloud-apps/)