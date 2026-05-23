# noteitup-website

Landing page for **[NoteItUP](https://github.com/romreviewer/NoteItUP)** — an open-source, privacy-first AI diary powered by on-device Gemma 4.

Live at **[noteitup.romreviewer.com](https://noteitup.romreviewer.com)**.

## About

A static marketing site built to mirror the look-and-feel of [romreviewer.com](https://romreviewer.com): Material 3 dark theme, purple → teal gradient, glassmorphic navbar, aurora hero. No frameworks, no build step — just HTML, CSS, and a single vanilla JS file.

## Local preview

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080
```

Anything that serves the directory will do — there is no build pipeline.

## Project structure

```
.
├── index.html          # Landing page (hero, features, screenshots, AI tools, privacy, download, FAQ)
├── privacy.html        # Privacy policy (ported from the app's PRIVACY.md)
├── css/style.css       # Material 3 design tokens + components
├── js/main.js          # Top-bar scroll, mobile menu, reveal-on-scroll, scroll-to-top FAB
├── img/
│   ├── icon.png        # App icon (favicon + hero + footer)
│   └── screenshots/    # Phone screenshots used in the showcase section
├── netlify.toml        # Cache headers + security headers
└── robots.txt
```

## Deployment

The repo is set up to deploy as-is on **Netlify**:

1. Connect this repo as a new Netlify site (publish directory: `.`, no build command).
2. In Netlify domain settings, add `noteitup.romreviewer.com`.
3. In your DNS, add a `CNAME` for `noteitup` pointing to the Netlify site.

Any static host (Vercel, GitHub Pages, Cloudflare Pages) works equally well — only `netlify.toml` is Netlify-specific.

## Updating screenshots

Drop new PNGs into `img/screenshots/` using the existing filenames (`home.png`, `editor.png`, `calendar.png`, `settings.png`) — no other changes needed. Aim for portrait phone aspect ratios; they are framed by CSS into a phone mockup.

## Updating the privacy policy

The source of truth is [PRIVACY.md](https://github.com/romreviewer/NoteItUP/blob/main/PRIVACY.md) in the NoteItUP app repo. When that changes, port the diff into `privacy.html` and bump the "Last updated" date in the hero.

## License

MIT.
