# Subrosa Beauty

A luxury, single-product brand site for **Subrosa Beauty** — vegan, cruelty-free
lip gloss. Built as plain HTML/CSS/JS (no build step, no framework, no
external CDNs — all libraries are bundled locally) so it's easy to open, edit,
and host anywhere.

- **3D hero** — a gloss bottle rendered with [Three.js](https://threejs.org/),
  drag to spin it, with a drifting field of gold particles behind it.
- **Scroll animations** — hero entrance, parallax, and section reveals powered
  by [GSAP](https://gsap.com/) + ScrollTrigger.
- **Sections** — Nav, Hero, Featured Products (the gloss's shades), Product
  detail, About, Services, Contact/booking, Footer.
- **Palette** — beige, gold, and cream, defined in one place for easy
  re-theming.

## Running it locally

Just open `index.html` in a browser, or serve the folder so the module
imports work reliably:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing the site

**Almost everything (text, prices, descriptions, colors, links) lives in one
file:** [`assets/js/config.js`](assets/js/config.js). Open it, change the
values between the quotes, save, and refresh the page.

| Want to change... | Edit... |
|---|---|
| Hero headline / tagline / buttons | `assets/js/config.js` → `hero` |
| Shades shown in "Featured Products" | `assets/js/config.js` → `shades` |
| Product description / ingredients / features | `assets/js/config.js` → `product` |
| About section story & stats | `assets/js/config.js` → `about` |
| Services / perks cards | `assets/js/config.js` → `services` |
| Contact email & form copy | `assets/js/config.js` → `contact` |
| Nav links, footer, social links | `assets/js/config.js` → `nav`, `footerNote`, `socialLinks` |
| Colors (beige / gold / cream) | `assets/js/config.js` → `colors` |
| Page layout / structure | `index.html` |
| Styling details | `assets/css/style.css` |
| The 3D bottle | `assets/js/scene.js` |
| Scroll / hover animations | `assets/js/animations.js` |

Subrosa currently sells one formula (the Vegan Gloss) in a few shades, so the
"Featured Products" grid is generated from the `shades` array rather than
separate products. If you launch more products later, it's easiest to extend
that array (or ask Claude to help split it into a real multi-product grid).

## Adding your real logo & product photo

The site currently uses a generated text logo and a text label drawn onto
the 3D bottle, so it works before any images exist. To swap in your real
assets:

1. **Logo** — save your logo as `assets/img/logo.png` (transparent
   background works best). The site automatically detects it and replaces
   the text logo in the nav bar.
2. **Product label on the 3D bottle** — save an image (square works best,
   e.g. 512×512px) to `assets/img/product-label.png`, then in
   `assets/js/config.js` set:
   ```js
   product: {
     ...
     labelImage: "assets/img/product-label.png",
   }
   ```
   This replaces the generated text label on the bottle with your image.

No other code changes are needed — just add the files and/or send them to
Claude to drop in for you.

## Contact form

The contact form currently opens the visitor's email client with their
message pre-filled (no backend required). If you'd rather receive
submissions directly, swap the form's behavior in `assets/js/content.js`
(search for `contact-form`) for a service like Formspree or Netlify Forms.

## Third-party libraries

Three.js and GSAP are vendored locally under `assets/vendor/` (not loaded
from a CDN), so the site works fully offline and isn't dependent on any
third-party service staying up. To upgrade them later, download a newer
build and replace the files in that folder.

## Deploying

This is a static site — it can be hosted for free on GitHub Pages, Netlify,
Vercel, or any static host. Just point the host at the repository root.
