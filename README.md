# Website offer landing page

A one-page Next.js landing page. All names, colors, prices, contact details, copy, and tracking IDs come from `config/partner.config.json` (loaded by `lib/partner.ts`). Values starting with `REPLACE` are treated as empty and hidden.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service used by the request form |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template used by the request form |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Set to `true` to allow search engines. Any other value sends `noindex`. |

If any EmailJS variable is missing, the form is disabled and shows a notice.

## Development

```bash
pnpm install
pnpm dev
```
