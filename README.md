# Chan Yu Xuan — Portfolio

A bold, editorial portfolio site built with Next.js 15, Tailwind CSS, and Framer Motion.

## Stack

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS** with custom design tokens
- **Framer Motion** for animations
- **TypeScript** throughout
- Deploys to **Vercel**

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to https://vercel.com/new
3. Import the repo
4. Click Deploy — no config needed

## What you need to fill in

Search the codebase for these placeholders and replace them with your real info:

### `src/components/Contact.tsx`
- `[your-email]` (appears 3 times — the giant CTA, plus the email link in the footer row)
- `[github-url]` — your GitHub profile URL
- `[linkedin-url]` — your LinkedIn profile URL
- `[twitter-url]` — your X/Twitter URL (or remove this entirely if you don't use it)

### `src/app/layout.tsx`
- The `metadataBase` URL — change to your actual deployed Vercel URL once it exists.

### `src/components/Nav.tsx`
- The graduation year `BIT '28` — adjust if needed.

### `src/components/About.tsx`
- The "5+ Shipped projects" stat — feel free to adjust.
- Graduation year `2028`.

### `src/data/projects.ts`
- All five project descriptions are written based on what you've told me.
- Add `links` arrays to any project that has a public GitHub repo or live demo.
- Adjust years, status values, and tech lists as needed.

## Adding screenshots

When you're ready to add project screenshots:

1. Drop images in `public/projects/` (e.g. `public/projects/coinsage-1.png`)
2. In `src/data/projects.ts`, add an `images` array to each Project type and project entry
3. In `src/components/Projects.tsx`, render them inside each `<ProjectCard>`

I haven't built the image gallery yet because the site needs to look complete without them too — but it's straightforward to add once you have visuals.

## Design notes

- Colors: ink-black (`#0a0a0b`) base, lime-yellow (`#d8ff3d`) and hot magenta (`#ff2d8a`) accents
- Fonts: Fraunces (display), Inter Tight (body), JetBrains Mono (technical)
- Grain overlay on the entire body for texture
- Asymmetric staggered project cards
- Marquee strip below the hero

## What to update for SNS Network

Before sharing the link with SNS Network:

1. Fill all placeholders above
2. Verify the AI-related projects (CoinSage, Discord bot) read well — they're your strongest pitch for this role
3. If CoinSage has a model accuracy number, add it to the highlights
4. Deploy to Vercel and test the live URL on mobile
