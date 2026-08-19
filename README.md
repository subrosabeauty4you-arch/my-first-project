# Lueur — Luxury Lip Gloss

A premium, single-product 3D website for Lueur, a luxury lip gloss brand. Four full-screen
vertical-scroll pages (Brand Story, About the Gloss, Shades Collection, Shop Now) with side
navigation dots, a page counter, and an interactive Three.js product bottle that rotates on
mouse movement.

## Running locally

This is a static site with no build step. Serve the folder with any static file server, e.g.:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Structure

- `index.html` — page markup for all four sections
- `css/style.css` — design system, layout, animations, responsive rules
- `js/main.js` — scroll navigation, page counter, particle field
- `js/bottle3d.js` — interactive 3D lip gloss bottle (Three.js)
- `js/vendor/three/` — vendored Three.js build (MIT licensed) used instead of a CDN

