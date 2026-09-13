# Subrosa Beauty

The homepage for **Subrosa Beauty** — a French-inspired, quietly luxurious
beauty house. *Sub rosa* means "under the rose": something kept quietly,
something beautiful shared in confidence. That philosophy runs through the
whole design.

> **Beauty, whispered in confidence.**

A single, self-contained homepage built with plain HTML, CSS, and JavaScript.
No build step, no dependencies, no backend — just open it in a browser.

## The homepage, section by section

1. **Hero** — brand introduction, tagline, and dual CTAs over a soft
   champagne/blush editorial backdrop with a hand-drawn rose motif.
2. **The Subrosa Collection** — the ultimate glosses, as clean luxury product
   cards with Add to Bag + Quick View.
3. **Our Story** — the brand narrative beside an editorial monogram panel.
4. **Explore Subrosa** — Story, Collection, Shades, Journal, Philosophy, each a
   minimal card with a subtle hover lift.
5. **The Signature Gloss** — a shade lineup (Café Confessions, Rose Whisper,
   Cerise Éclat, Pure Secret, Jardin Secret).
6. **The Subrosa Principles** — four brand values on a deep ink backdrop.
7. **Follow the Subrosa World** — an Instagram-style visual grid.
8. **Newsletter** — an understated, premium signup.
9. **Footer** — full navigation, customer care, social, and the brand signature.

## Design language

- **Palette** — warm ivory, soft beige, champagne gold, blush/nude, and near-black ink.
- **Type** — Cormorant Garamond (editorial serif) paired with Jost (clean sans),
  loaded from Google Fonts.
- **Motion** — gentle reveal-on-scroll, refined hover states, and a sticky header
  that settles on scroll. Respects `prefers-reduced-motion`.
- **Responsive** — fluid from mobile to desktop, with a slide-in mobile menu.

## Notes

- Product imagery is rendered as **bespoke inline-SVG gloss bottles** so the page
  needs no external assets and stays distinctly on-brand. Swap in real photography
  by replacing the `glossSVG()` output / product media in `js/subrosa.js` and
  `.product-media` / `.shade-tube` in `css/subrosa.css`.
- This is a front-end homepage. Add to Bag and the newsletter are demonstrated
  client-side only — no data leaves the browser.

## Run it

No tooling required.

```bash
# open directly
xdg-open index.html        # Linux (use `open` on macOS)

# or serve it (recommended)
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Project structure

```
.
├── index.html          # The homepage
├── css/
│   └── subrosa.css     # All styles and design tokens
├── js/
│   └── subrosa.js      # Product/shade data, SVG glosses, interactions
└── CNAME               # Custom domain (undertherose.in)
```
