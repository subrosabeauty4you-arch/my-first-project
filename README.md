# Nimbus — Ecommerce Storefront

A complete, self-contained ecommerce website built with plain HTML, CSS, and
JavaScript. No build step, no dependencies, no backend — just open it in a
browser.

## Features

- **Product catalog** — 16 demo products across Apparel, Accessories, Home, and Tech
- **Search** — live, debounced search across name, category, and description
- **Filter & sort** — filter by category; sort by price, name, or rating
- **Product detail modal** — full description, rating, and reviews
- **Shopping cart** — slide-out drawer with quantity controls, persisted in `localStorage`
- **Checkout** — shipping/payment form with validation, live order summary
  (subtotal, shipping, tax), and an order-confirmation screen
- **Responsive** — works from mobile to desktop
- **Accessible touches** — semantic markup, ARIA labels, keyboard (Esc) support

> This is a front-end demo. No real payments are processed and no data leaves
> the browser. Do not enter real card details.

## Run it

No tooling required. Either:

```bash
# Option A: just open the file
open index.html            # macOS  (use xdg-open on Linux)

# Option B: serve it (recommended, avoids any file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
.
├── index.html        # Storefront (hero, product grid, cart drawer, modal)
├── checkout.html     # Checkout form + order summary + confirmation
├── css/
│   └── styles.css    # All styles and design tokens
└── js/
    ├── products.js   # Product catalog data
    ├── cart.js       # Cart state (localStorage) + shared helpers
    ├── app.js        # Storefront UI logic
    └── checkout.js   # Checkout logic
```

## Customizing

- **Products** — edit the `PRODUCTS` array in `js/products.js`. Emojis stand in
  for product images so the demo needs no external assets; swap in `<img>` tags
  if you want real photography.
- **Branding & colors** — edit the CSS custom properties under `:root` in
  `css/styles.css` (`--accent`, fonts, radii, etc.).
- **Shipping / tax rules** — adjust the constants at the top of `js/checkout.js`.

## Possible next steps

- Wire the checkout to a real payment provider (e.g. Stripe)
- Add a backend/API for inventory and orders
- Real product images and additional product pages
