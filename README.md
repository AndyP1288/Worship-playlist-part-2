# Worship Song Library PWA (React + Vite + Supabase)

Production-ready Progressive Web App for worship teams to authenticate, upload PDF chord sheets, and manage a shared song catalog.

## Tech Stack

- **Frontend:** React + Vite + React Router
- **Backend:** Supabase Auth + Postgres + Storage
- **PWA:** `vite-plugin-pwa` + Workbox InjectManifest
- **Deploy:** Netlify or Vercel

---

## Project Structure

```text
.
├── .env.example
├── index.html
├── netlify.toml
├── package.json
├── public
│   ├── _redirects
│   ├── manifest.json
│   └── icon.svg
├── src
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── supabaseClient.js
│   ├── sw.js
│   ├── components
│   │   ├── AuthForm.jsx
│   │   ├── InstallPrompt.jsx
│   │   ├── SongForm.jsx
│   │   └── SongList.jsx
│   └── pages
│       ├── AuthPage.jsx
│       └── DashboardPage.jsx
├── supabase
│   └── schema.sql
├── vercel.json
└── vite.config.js
```

---

## Supabase Setup

### 1) Create project and copy API keys

From Supabase Project Settings → API, copy:
- Project URL
- anon/public key

### 2) Create table + policies

Run SQL in `supabase/schema.sql` from the SQL Editor.

### 3) Create storage bucket

In Supabase Storage:
- Create bucket named **`song-pdfs`**
- Set bucket to **Public**

The storage policies in `supabase/schema.sql` allow:
- authenticated users to upload
- public users to read files (for download URLs)

---

## Environment Variables

Copy sample env:

```bash
cp .env.example .env
```

Set values:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_SONG_BUCKET` (optional, default `song-pdfs`)
- `VITE_MAX_PDF_MB` (optional, default `15`)

---

## Local Development

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

---

## Features Checklist

✅ Supabase-only backend (no Firebase)

✅ Authentication
- sign up with email/password
- login/logout
- logged-in user info displayed

✅ Song management
- add song title + artist + PDF chord sheet
- save metadata in `songs` table (`title`, `artist`, `pdf_url`, `created_by`, `created_at`)
- list songs with PDF download links

✅ Storage
- upload PDFs to Supabase Storage
- generate public URL for each PDF

✅ PWA
- install prompt banner (`beforeinstallprompt`)
- service worker with precache and runtime caching
- standalone manifest + app icons

✅ Deployment compatibility
- React Router SPA redirect support via `public/_redirects`, `netlify.toml`, and `vercel.json`

---

## Deploy to Netlify

1. Push repo to GitHub.
2. Import project in Netlify.
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add site env vars:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - optional: `VITE_SUPABASE_SONG_BUCKET`, `VITE_MAX_PDF_MB`
5. Deploy.

`netlify.toml` and `public/_redirects` are included for SPA routing.

---

## Deploy to Vercel

1. Import project in Vercel.
2. Framework preset: **Vite**.
3. Add env vars:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - optional: `VITE_SUPABASE_SONG_BUCKET`, `VITE_MAX_PDF_MB`
4. Deploy.

`vercel.json` rewrite is included for SPA routing.
