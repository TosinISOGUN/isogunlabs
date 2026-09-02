---
title: "JSM On-Call Schedules: A Developer's Guide to the API That Almost Works"
description: "Reading Jira Service Management's on-call schedule from a Forge app should be straightforward. It isn't, because the JSM Ops API doesn't accept app-system tokens for schedule reads. Here's what we hit, what the actual limitation is, and the workaround that got Passdown through Marketplace review."
pubDate: 2026-09-02
cover: "market"
---

We built Passdown to read Jira Service Management's native on-call schedule and fire a shift
handoff automatically when the on-call person changes. That sentence makes it sound like a
straightforward integration: call the schedule API, compare the current on-call participant to
the last one you saw, act if it changed. In practice, the first call fails, and the reason is
a platform-level limitation that isn't called out anywhere in the JSM API documentation. This
post is the guide we wish had existed when we started.

## The API exists and the endpoints are clean

Jira Service Management exposes its on-call schedule data through the JSM Ops API, which lives
under a different base path than the standard Jira platform REST API. The three endpoints that
matter for reading schedule state are:

- `GET /jsm/ops/api/{cloudId}/v1/schedules` — lists every on-call schedule visible to the
  requesting identity.
- `GET /jsm/ops/api/{cloudId}/v1/schedules/{scheduleId}/on-calls` — returns the current on-call
  participants for one schedule.
- `GET /jsm/ops/api/{cloudId}/v1/schedules/{scheduleId}/next-on-calls` — returns the next
  on-call participants, which is how you detect an upcoming shift boundary.

The response shape is consistent across the two on-call endpoints: an object with an
`onCallParticipants` array (or `nextOnCallParticipants` for the next-on-calls variant), where
each participant has an `id`, a `type` of `user`, `team`, or `escalation`, and an optional
`forwardedFrom` field. Pass `flat=true` as a query parameter if you just want a plain array of
user IDs instead of the full objects.

The required scope is `read:ops-config:jira-service-management`. So far, this all reads like a
normal REST API integration. The problem starts when you try to call it from a scheduled
trigger.

## Where it breaks: `asApp()` gets a 403

Forge apps have two execution contexts. When a user clicks something in the UI, the request
runs with that user's identity via `asUser()`. When a scheduled trigger fires, there is no
user in session — the event payload shows `principal: undefined` — so the only option is
`asApp()`, which runs as the app's own system identity.

For standard Jira platform APIs, `asApp()` works fine. It gets admin-equivalent access in most
cases, and the Jira REST API accepts the system token without complaint. The JSM Ops API does
not. Calling any of the schedule endpoints with `asApp()` returns a 403, regardless of what
scopes the app has declared. The scope `read:ops-config:jira-service-management` is present and
correct — the rejection happens at the permission layer, not the scope layer.

Here's what's actually going on: JSM Ops API permissions are strictly user-oriented. The
permission model checks whether a specific user account has access to a given schedule, based
on team membership, rotation inclusion, escalation membership, or admin rights. The app's
system identity is not a user. It has no team memberships, no rotation entries, no escalation
membership. It is invisible to the permission model that gates these endpoints, and there is
no supported way to grant a system identity access to JSM Ops resources directly.

This is not a bug in Passdown's code. It is a confirmed platform limitation. The JSM Ops API
does not accept app-system tokens for schedule reads, and Forge has no supported workaround
within the `asApp()` execution path.

## The workaround: impersonate one designated user

The only working path is to make the schedule read look like it's coming from a real person.
Forge provides a mechanism for this: offline user authorization, sometimes called user
impersonation. The app exchanges its system token for a token that acts on behalf of a
specific, designated user account — one that has visibility into the on-call schedules the app
needs to read.

In the manifest, this shows up as an `allowImpersonation: true` flag on the scope:

```yaml
permissions:
  scopes:
    read:ops-config:jira-service-management:
      allowImpersonation: true
```

The actual token exchange and API call can't happen inside Forge's compute directly, because
Forge's `asApp()` context doesn't expose the impersonation flow as a callable method. The
documented path is to make the call through a remote — an external endpoint registered in the
manifest under `remotes`, with `auth.appSystemToken` enabled. Forge issues a system token,
sends it to your remote endpoint, and your remote code performs the impersonation exchange and
calls the JSM Ops API with the resulting user-scoped token.

In Passdown's case, that remote is a Cloudflare Worker. It receives the system token, exchanges
it for a user-impersonated token using Forge's offline-user-authorization mechanism, and calls
the schedule endpoints with that token. The Worker only ever sees on-call participant
identifiers — it never sees ticket content or generated summary text, because those operations
stay inside Forge's own compute and AI model calls.

## What this costs you

The workaround works, but it has real consequences that are worth understanding before you
choose this architecture:

**You lose the "Runs on Atlassian" badge.** The badge requires zero external egress. The
Cloudflare Worker is real, disclosed external egress — a Forge-issued token leaves
Atlassian's infrastructure, travels to a Cloudflare endpoint, and the API response comes back.
That's enough to disqualify the app from the badge, even though the Worker only relays schedule
metadata and never touches customer data. This is separate from Forge's 0% revenue-share
qualification, which is unaffected.

**You have a subprocessor.** Cloudflare is now in your data flow. That means your privacy
policy, security policy, and Marketplace security questionnaire all need to disclose it
accurately — what data the Worker sees, how the token is scoped, how requests are validated,
and what Cloudflare's role actually is. For Passdown, the Worker receives a short-lived,
audience-scoped token and validates every request against Atlassian's own JWKS before acting
on it. It does not persist anything.

**You have a dependency on a specific user's permissions.** The impersonated user needs
visibility into every schedule the app should watch. If that user's permissions change — they
leave a team, lose admin rights, get deactivated — the schedule reads silently start returning
empty or 403. This is an operational risk that doesn't exist for standard `asApp()` calls,
where the system identity's access is stable. Monitor for it.

**You have infrastructure to maintain.** The Worker is code you write, deploy, and keep
running. Forge handles scaling, deployment, and runtime for everything else. The Worker is the
one piece that doesn't scale or heal itself automatically. Keep it small, keep it stateless,
and keep its dependency surface minimal.

## What we tried first

Before landing on the Worker, we tried three things that didn't work:

1. **`asApp()` with broader scopes.** Added `read:jira-work` and `write:jira-work` on the
   assumption that maybe the schedule endpoint fell under general Jira platform permissions. It
   doesn't. The 403 persists regardless of scope breadth, because the rejection is at the
   permission layer, not the scope layer.

2. **`asUser()` from the scheduled trigger.** The scheduled trigger payload has
   `principal: undefined`. There is no user to impersonate from within the trigger itself.
   `asUser()` requires a user in session, and a scheduled trigger has none. This isn't a
   Forge limitation you can work around — it's the fundamental difference between interactive
   and scheduled execution.

3. **Storing a user token at install time and replaying it.** Forge doesn't expose long-lived
   user tokens to apps. The OAuth flow gives you scoped, short-lived tokens, and there's no
   supported way to persist a user's credentials for use in a scheduled context. Even if there
   were, storing user tokens for later replay would be a significant security liability and
   would almost certainly not pass Marketplace review.

## The checklist if you're building something similar

If your Forge app needs to read JSM on-call schedules from a scheduled trigger:

1. Declare `read:ops-config:jira-service-management` with `allowImpersonation: true` in your
   manifest.
2. Register a remote endpoint in `remotes` with `auth.appSystemToken` enabled.
3. Build a small, stateless proxy at that endpoint that accepts the system token, performs the
   impersonation exchange, and calls the JSM Ops API with the resulting user-scoped token.
4. Validate every incoming request against Atlassian's JWKS. Do not skip this.
5. Make sure the impersonated user has visibility into every schedule the app needs to watch,
   and document that this is a requirement.
6. Disclose the external endpoint in your privacy policy, security policy, and Marketplace
   security questionnaire. Be specific about what data the endpoint sees and what it doesn't.
7. Accept that your app will not carry the "Runs on Atlassian" badge, and say so plainly on
   your security page rather than leaving it unstated.

The API itself is well-designed. The endpoints are clean, the response shapes are consistent,
and the scope model is straightforward. The gap is specifically in the permission model for
app-system identities, which is a platform-level decision, not an API design flaw. If
Atlassian adds app-system identity support to the JSM Ops permission model in the future, the
entire Worker and impersonation layer becomes unnecessary, and the schedule read collapses back
to a single `asApp()` call. Until then, this is the path that works.
