---
title: "How Fast Should a Business Website Be? Speed Explained"
description: "What Google's Core Web Vitals mean for a small business site: the three speed targets, how to test your site for free, and the common things that slow it down."
pubDate: 2026-11-25
cover: "web"
---

Nobody leaves a review that says "this website loaded in 1.8 seconds, five stars." But almost everyone has closed a page that took too long, and gone to the next result instead.

For a business, that quiet exit is the cost of a slow website. The visitor never tells you. They simply do not call, book or buy. This guide explains what "fast enough" means in numbers you can check, how to test your own site in a few minutes, and what usually makes a business website slow.

## The short version

- Google measures three things: how quickly the main content appears, how quickly the page reacts when you tap, and how much the layout jumps around while loading.
- The targets are **2.5 seconds or less**, **200 milliseconds or less**, and a layout shift score of **0.1 or less**.
- You can check any site for free in under a minute, including competitors and the studio you are thinking of hiring.
- Most slow sites are slow for ordinary reasons: oversized images, too many scripts and a heavy build. These are fixable, and they are far easier to avoid than to repair.

## Why speed matters to a small business

Speed is part of how a website feels. A page that appears quickly and responds when tapped feels reliable. One that stalls, shifts and lags feels careless, and visitors often transfer that feeling to the business behind it.

It matters most on phones. Many visitors arrive on a phone, sometimes on a weak connection or an older device, and they are the ones who notice every extra second. A site that feels fine on your office laptop and fast wifi can feel very different in the real world.

Speed also connects to search. Google has said that its ranking systems use Core Web Vitals, which are the measures covered below. It is one signal among many, and good, relevant content still matters most. But if two sites answer a search equally well, the faster one has an edge, and a faster site keeps more of the visitors who do arrive.

## The three numbers Google uses

Google calls them Core Web Vitals. Its guidance on [Core Web Vitals](https://web.dev/articles/vitals) sets a target for each, measured for at least 75 percent of visits.

**1. Loading: Largest Contentful Paint (LCP).** How long until the biggest thing on the screen, usually a main photo or headline, has appeared. The target is **2.5 seconds or less**.

**2. Responsiveness: Interaction to Next Paint (INP).** When someone taps a button, opens a menu or types in a form, how long until the page visibly reacts. The target is **200 milliseconds or less**. INP replaced an older measure called First Input Delay as a Core Web Vital in 2024.

**3. Visual stability: Cumulative Layout Shift (CLS).** How much the page jumps around while it loads. You know the feeling: you go to tap a link and an image loads above it, pushing everything down so you tap the wrong thing. The target is a score of **0.1 or less**.

The "75 percent of visits" part matters. It means a site should be fast for most real visitors, not just on a good day on the developer's computer.

## How to test your own website, for free

You do not need any special skill.

1. Open [PageSpeed Insights](https://pagespeed.web.dev/) and paste in your web address.
2. Look at the **mobile** results first, not the desktop ones.
3. If the page shows real-world data from visitors, read that part first. It reflects what actual people experienced. Small or new sites often do not have enough visits for it, and PageSpeed Insights then shows only a test run in a lab setting, which is still a useful guide.
4. Read the three numbers above, then scroll to the suggestions. They are listed with an estimate of how much each would save.
5. Test your most important pages, not only the home page: your services page, your contact page and your busiest landing page.

Two more checks cost nothing. Open your site on a real phone, on mobile data rather than wifi, and notice how it feels. And if you have connected Google Search Console, its Core Web Vitals report shows which pages Google considers fast or slow.

A word of caution about scores. A single test can vary a little each time, and a perfect score is not the goal. The goal is a site that passes the three targets for real visitors and feels quick on a phone.

## What usually makes a business website slow

Slow sites are rarely slow for exotic reasons. These are the usual suspects.

**Oversized images.** A photo straight from a modern phone can be many times larger than the space it fills. Images should be sized to the space they appear in and compressed. Modern formats such as WebP and AVIF are smaller than older JPEG files at similar quality.

**Too many scripts.** Chat widgets, tracking tools, social feeds, booking plugins and pop-ups each add code that has to be downloaded and run. Individually they seem harmless. Together they can slow the page and make it unresponsive to taps.

**A heavy build.** Some page builders and plugin-heavy setups load far more code than a page needs. The result looks fine on the screen and costs seconds behind the scenes. This is part of what we mean in [the hidden cost of cheap websites](/blog/hidden-cost-of-cheap-websites/).

**Slow hosting.** A website served from a distant or overloaded server starts slowly however well it is built. Hosting that serves pages quickly from close to the visitor makes a real difference.

**Too many fonts and effects.** Several font families, each in several weights, mean more files to download. Autoplay video, sliders and heavy animation add to the load, and they often make the first screen worse, not better. We cover this in [what a local business website needs on its first screen](/blog/what-local-businesses-should-put-on-their-first-screen/).

**Layout that jumps.** Images and ads without set dimensions, and fonts that swap late, make the page shift as it loads. It is a quick fix when the site is built carefully, and a nuisance when it is not.

## What a fast build looks like

You do not need to understand the code to ask the right questions. A site built for speed usually has:

- **Images sized and compressed for their space,** with the right dimensions set so the layout does not jump.
- **The main image on the first screen loaded straight away,** and images further down loaded only when they are needed.
- **Few scripts,** each there for a reason, and none loaded on pages that do not need them.
- **A small number of fonts,** loaded in a way that does not leave the text invisible.
- **Quick, reliable hosting,** often with the pages prepared in advance so the server has little work to do on each visit.
- **Testing on a real phone,** not only a desktop window.

None of this is glamorous. It is the difference between a site that quietly works and one that quietly loses visitors.

## Questions to ask a web designer about speed

Speed is much easier to build in than to bolt on later. Before you hire anyone, ask:

- How do you measure speed, and can you show me the results for sites you have built?
- What speed targets will my site meet, and how will we check them before launch?
- How will you handle images, fonts and third-party scripts?
- What hosting do you recommend, and what does it cost?
- Will you test on real phones?

A good answer is specific and comes easily. If speed is "something we can look at later," or the studio's own website is slow, take note. Our guide to [12 questions to ask a web design company](/blog/how-to-choose-a-web-design-company/) covers speed alongside the other things worth asking.

## When a fix is not enough

Sometimes a site is slow because of small things, and a few changes will help: smaller images, fewer plugins, better hosting. Other times the foundation is the problem, and no amount of patching will make it quick. If your site is also dated, hard to use on a phone or hard to update, it may be time to rebuild. Our [website redesign checklist](/blog/website-redesign-checklist-signs-its-time/) will help you decide.

## How Isogun Labs approaches speed

We treat speed as part of the build, not an extra. We size and compress images, keep scripts to what each page needs, and test on real phones before a site goes live. We also work with clients in the USA, Canada, the UK, Europe and Nigeria, so a site has to feel quick well beyond the office it was designed in.

You can see what we build in our [selected work](/work/) and read about our [services](/services/). If you would like us to look at your site, send a short brief through the [contact page](/contact/#enquiry) or book a free call.

## Frequently asked questions

### What is a good loading time for a website?

Google's target is for the main content to appear within 2.5 seconds, for at least 75 percent of visits. Faster is better, and phones on slower connections are where it matters most.

### Does website speed affect my Google ranking?

Google has said its ranking systems use Core Web Vitals, but it is one signal among many, and relevant, helpful content matters more. A fast site also keeps more of the visitors who arrive, which matters whatever the ranking.

### How do I check my website speed for free?

Paste your address into PageSpeed Insights at pagespeed.web.dev and read the mobile results. It shows the three Core Web Vitals and a list of suggestions.

### Why is my website slow on a phone but fine on my computer?

Phones are usually less powerful, often on slower connections, and a page that loads a lot of images and scripts has much more work to do. A fast laptop on wifi hides these problems.

### Can I make my website faster without rebuilding it?

Often, yes. Resizing and compressing images, removing scripts and plugins you do not use, and improving hosting can all help. If the site is built on a heavy foundation, a rebuild may be the better investment.

### Is a perfect PageSpeed score necessary?

No. A score can change from one test to the next, and chasing 100 can waste effort. Aim to pass the three Core Web Vitals targets for real visitors and make sure the site feels quick on a phone.
