# Alif Farhan — Portfolio

Personal portfolio site: projects, experience, certificates, a downloadable CV,
and a realtime public guestbook.

Live: https://alffar.vercel.app

## Stack

- React 18 + Vite
- CSS Modules
- Supabase (guestbook storage + realtime), loaded lazily so it stays out of the main bundle

## Run locally

```bash
npm install
cp .env.example .env   # fill in your Supabase URL and anon key
npm run dev
```

Without the Supabase env vars the site still works; only the guestbook shows as unavailable.

## Editing content

Almost everything lives in `src/data/portfolioData.jsx`:

| Export        | Shown in            |
| ------------- | ------------------- |
| `projects`    | Featured Projects   |
| `experience`  | About → Experience  |
| `skills`      | About → Tech Stack  |
| `certificates`| Certificate & Award |
| `socials`, `contact` | Contact      |

Leave a project's `liveLink` empty if it is not deployed; the card then shows only the source link.
Give a certificate a `credentialUrl` to turn its card into a "Verify credential" link.

## Updating the CV

Edit `public/alif-farhan-cv.html`, then regenerate the PDF with Chrome:

```bash
chrome --headless=new --no-pdf-header-footer \
  --print-to-pdf=public/alif-farhan-cv.pdf \
  file:///ABSOLUTE/PATH/TO/public/alif-farhan-cv.html
```

`--no-pdf-header-footer` matters: without it Chrome prints the local file path
on every page of the CV.

## Database

`supabase/schema.sql` creates the guestbook table with row level security and
rate limiting. Run it once in the Supabase SQL editor (change `RATE_SALT` first).
