# OGSnap - Dynamic OG Image API

Generate beautiful Open Graph images via API. Perfect for blogs, SaaS, and social sharing.

**Live demo:** [ogsnap.dev](https://ogsnap.dev) *(coming soon)*

## Why OGSnap?

- **Simple API** — One endpoint, instant images
- **Fast** — Edge-rendered, globally cached
- **Cheap** — Pay per image, no minimums
- **Flexible** — 6 templates or custom HTML/CSS

## Quick Start

```bash
# Generate a basic OG image
curl "https://ogsnap.dev/api/v1/image?title=Hello%20World"

# Blog post style
curl "https://ogsnap.dev/api/v1/image?template=blog&title=My%20Post&author=Jane"

# Gradient style
curl "https://ogsnap.dev/api/v1/image?template=gradient&title=Launch%20Day&primaryColor=%236366f1"
```

Returns a PNG image (1200×630 by default).

## Templates

| Template | Best For |
|----------|----------|
| `basic` | General purpose |
| `blog` | Articles & posts |
| `product` | Product announcements |
| `social` | Quotes & tweets |
| `minimal` | Typography-focused |
| `gradient` | Bold announcements |

## Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | string | "Hello World" | Main title |
| `subtitle` | string | — | Secondary text |
| `template` | string | "basic" | Template name |
| `theme` | string | "dark" | "dark" or "light" |
| `primaryColor` | string | "#6366f1" | Accent color (hex) |
| `secondaryColor` | string | "#ec4899" | Second color (gradient) |
| `image` | string | — | Image URL |
| `logo` | string | — | Logo URL |
| `author` | string | — | Author name |
| `date` | string | — | Date string |
| `width` | number | 1200 | Image width |
| `height` | number | 630 | Image height |

## Pricing

| Plan | Price | Images/mo | Overage |
|------|-------|-----------|---------|
| Free | $0 | 100 | — |
| Starter | $9/mo | 5,000 | $0.002/img |
| Pro | $29/mo | 25,000 | $0.001/img |
| Scale | $99/mo | 100,000 | $0.0008/img |

## Tech Stack

- Next.js 14 (App Router)
- Vercel Edge Functions + @vercel/og
- Stripe for billing
- Upstash Redis for rate limiting & caching
- Neon PostgreSQL for users/usage

## Local Development

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Open http://localhost:3000
```

## Deployment

```bash
# Deploy to Vercel
vercel deploy --prod
```

Required environment variables (see `.env.example`):
- `DATABASE_URL` — Neon PostgreSQL connection string
- `STRIPE_SECRET_KEY` — Stripe API key
- `UPSTASH_REDIS_REST_URL` — Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN` — Upstash Redis token

## Competitors

| Product | Price | Complexity |
|---------|-------|------------|
| Bannerbear | $49+/mo | High (templates, editor) |
| Cloudinary | Pay-per-use | Medium (transforms) |
| imgix | Enterprise | High (query params) |
| **OGSnap** | $9+/mo | **Low** (one endpoint) |

## Roadmap

- [x] Core image generation API
- [x] 6 pre-built templates
- [x] Landing page with live playground
- [ ] User authentication
- [ ] Stripe integration
- [ ] Usage dashboard
- [ ] Custom HTML/CSS templates
- [ ] SDK libraries (JS, Python, Ruby)
- [ ] Analytics dashboard

---

Built with ✨ by Sophia
