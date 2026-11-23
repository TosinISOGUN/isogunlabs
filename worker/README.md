# Enquiry backup Worker

A second route for the contact form. The page still sends to Formspree. It also sends here, and this Worker emails
you through Resend and pushes the enquiry to Telegram. The visitor sees "sent" if either route works.

## One-time setup

1. **Resend** (resend.com, free tier): add the domain `send.isogunlabs.com` (a subdomain, so it never touches your normal email), add the DNS records it shows (SPF, DKIM),
   wait for "Verified", then create an API key.
2. **Telegram**: message `@BotFather`, send `/newbot`, keep the bot token. Open a chat with your new bot and send
   it any message, then visit `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id`.
3. **Deploy** (needs a free Cloudflare account):
   ```
   cd worker
   npx wrangler login
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_CHAT_ID
   npx wrangler deploy
   ```
   Wrangler prints the Worker address, like `https://isogunlabs-enquiry.<you>.workers.dev`.
4. Paste that address into `backupEndpoint` in `src/data/nav.ts`, then push to `main`.

Either channel can be skipped: with no Telegram secrets it only emails, and the other way round.

## Test

```
curl -X POST <worker address> -H "Origin: https://isogunlabs.com" -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"a@b.co","message":"Hello"}'
```
A reply of `{"ok":true,"mail":true,"telegram":true}` means both routes work.
