# Mediworks website

Static, single-page website for Mediworks Rejuvenation Centre (South Surrey, BC).
Pages are hash routes (`#home`, `#about`, `#baseline`, `#protocols`, …) rendered by
`assets/js/app.js`. There is no build step.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000/#home
```

## Layout

```
index.html                 page shell: <head>, static HTML for every route, script tags
assets/
  css/                     loaded in this order; later files override earlier ones
    00-reset.css
    01-early-overrides.css
    02-base.css            design tokens, layout and components (the main stylesheet)
    03-layers-v6-v31.css   dated layers (Nov 2026 updates)
    04-page-additions.css  shop, protocol links and lab dropdown
    05-nov-updates.css     Nov 16–19 updates (pillars, marker explorer, ARRC, …)
    06-design-layers.css   v4/v5/v6 design layers
  js/
    data/                  content: treatment pages, prices, tile colours
    boot/                  small redirects and the intro splash that run before the header
    app.js                 router, page rendering and homepage content control panel
    features/              independent widgets (tickers, calculators, menus, …)
    layers/                dated enhancement passes that run after the app renders
  images/
    pages/                 page hero and section images
    clinic/                photos of the clinic
    content/               treatment, team and journal images
    embedded/              images that were inlined as base64 in the original file
tools/split-artifact.py    script that produced this layout from the original single HTML file
```

Script order matters: the `<script>` tags in `index.html` keep the exact order and
position of the original file, and the CSS files keep its cascade order.

## Known gaps

- `assets/video/hero-clinic.mp4` (hero background video) is referenced but was never
  supplied, so the hero shows its poster image.
- Text highlighted in yellow (`<mark class="ph">`) marks content the clinic still needs to supply.
