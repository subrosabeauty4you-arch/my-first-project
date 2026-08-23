# Subrosa Beauty

A luxury, multi-page brand site for **Subrosa Beauty** — vegan, cruelty-free
lip gloss. Built as plain HTML/CSS/JS (no build step, no framework, no
external CDNs — every library is bundled locally) so it's easy to open, edit,
and host anywhere.

## Pages

| Page | URL | What's there |
|---|---|---|
| Our Story | `/` | Brand story ("sub rosa"), founder, values, 3D hero |
| Speciality | `/speciality/` | The vegan formula, ingredients, free-from claims, application ritual |
| Shades | `/shades/` | Interactive 3D shade picker (tap a swatch, the bottle's liquid recolors) + full shade grid |

## What's inside

- **Ultra-realistic 3D bottle** — [Three.js](https://threejs.org/) with a
  glass shell over a colored liquid core, real shadow-mapped lighting, a
  soft studio backdrop, and Unreal-bloom post-processing for glossy
  highlights. Drag to rotate.
- **Interactive shade picker** — clicking a swatch on `/shades/` smoothly
  tweens the 3D liquid's color to match (via [GSAP](https://gsap.com/)).
- **Scroll animations** — reveals, hero parallax, and 3D tilt-on-hover on
  card grids, powered by GSAP + ScrollTrigger.
- **Palette** — beige, gold, and cream, defined once and shared by all pages.

## Running it locally

Serve the folder so the module imports and page routes work correctly:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

(Opening `index.html` directly via `file://` will break the 3D scenes,
since ES module imports require an HTTP server.)

## Making it public ("everyone sees it")

This repo includes a GitHub Actions workflow
(`.github/workflows/deploy-pages.yml`) that deploys the site to GitHub Pages
automatically on every push to `main`. To turn it on (one-time step):

1. On GitHub, go to **Settings → Pages**.
2. Under **Source**, choose **GitHub Actions**.
3. Push to `main` (or merge this branch into it) — the workflow will build
   and publish automatically, and the Pages URL will show up in
   **Settings → Pages** once it's live.

Alternatively, any static host (Netlify, Vercel, Cloudflare Pages) works too
— just point it at the repo root with no build command.

## Editing the site

**Almost everything (text, prices, colors, links) lives in one file:**
[`assets/js/config.js`](assets/js/config.js). Open it, change the values
between the quotes, save, and refresh.

| Want to change... | Edit... |
|---|---|
| Hero headline / tagline / buttons | `config.js` → `hero` |
| Our Story narrative | `config.js` → `narrative` |
| Founder name, quote, bio | `config.js` → `founder` |
| Brand values cards | `config.js` → `values` |
| Ingredients list | `config.js` → `ingredients` |
| "Free from" claims | `config.js` → `freeFrom` |
| Application ritual steps | `config.js` → `ritual` |
| Shades (name, color, price, description) | `config.js` → `shades` |
| Nav links, footer, social/contact | `config.js` → `nav`, `footerNote`, `footerEmail`, `socialLinks` |
| Colors (beige / gold / cream) | `config.js` → `colors` |
| Page layout / structure | `index.html`, `speciality/index.html`, `shades/index.html` |
| Styling details | `assets/css/style.css` |
| The 3D bottle itself | `assets/js/three-common.js` |
| Hero vs. shade-picker 3D scenes | `assets/js/scene-hero.js`, `assets/js/scene-shades.js` |
| Scroll / hover animations | `assets/js/animations.js` |
| Nav / footer rendering | `assets/js/chrome.js` (shared by all pages) |

Each page's `<head>` sets two small constants — `SUBROSA_BASE` (`"./"` at
the root, `"../"` one level down) and `SUBROSA_PAGE` (for nav highlighting).
If you add a new page in a new folder, copy an existing page's markup and
update those two lines.

## Adding your real logo, founder photo & product label

The site currently uses a generated text logo, a placeholder "Founder
photo" card, and a text label drawn onto the 3D bottle, so it works before
any images exist. To swap in your real assets, just add these files (no
code changes needed):

- `assets/img/logo.png` — replaces the text logo in the nav.
- `assets/img/founder.jpg` — replaces the founder photo placeholder on
  the Our Story page.
- `assets/img/product-label.png` (square, e.g. 512×512px) — then in
  `assets/js/config.js` set `product.labelImage` to that path to replace
  the generated text label on the 3D bottle.

## Third-party libraries

Three.js and GSAP are vendored locally under `assets/vendor/` (not loaded
from a CDN), so the site works fully offline and isn't dependent on any
third-party service staying up. To upgrade them later, download a newer
build and replace the files in that folder.
