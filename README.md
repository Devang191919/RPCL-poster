# RPCL-poster

RPCL Season 3 cricket invitation poster generator. Upload your photo, enter your name, preview live, and download a **1080×1920** PNG for Instagram Story / WhatsApp Status.

## Features

- Live preview with name and photo
- 1080×1920 story-format poster download
- Sponsor logos, team logos, tournament details
- No login required

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Configured for [Render](https://render.com) static hosting via `render.yaml`.

## Customize

- Tournament copy: `src/config/tournament.ts`
- Sponsors: `src/config/sponsors.ts`
- Teams: `src/config/teams.ts`
- Poster layout: `src/components/invitation/InvitationTemplate.tsx`
- Deity images (top corners): add PNGs to `public/deities/chamunda-maa.png` and `public/deities/koylaveer-dada.png`
- Deity labels: `src/config/deities.ts`
