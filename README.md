# Signature Car Lounge

React + TypeScript + Vite reconstruction of the captured public site (`../signature-site-export`). No WordPress/Elementor runtime; all images and fonts are local (`public/assets`).

```
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure
- `src/pages` – one component per route (`Home`, `About`, … `Terms`); each interior page is composed of small per-section components.
- `src/components/layout` – `Header` (mobile menu, services dropdown), `Footer`, `InnerLayout`, `RootLayout`.
- `src/components/sections|home|forms|common` – shared sections, `BookingForm`, SEO, icons, reveal.
- `src/styles` – `fonts.css`, `variables.css` (design tokens), `home.css` (shared chrome + home), `brand.css` (site-wide overrides), `pages/*.css` (ported per-page CSS, scoped by `.pg-<page>`).
- `src/router/AppRouter.tsx` – routes mirror `site-map.json`; `/signature-booking/?service=<key>` preselects the service.

## Notes / TODO
- Booking form submit is a placeholder (`BookingForm.tsx`) – no backend was provided.
- Manrope is referenced by the original CSS but was not captured; it falls back to Arial exactly as in the original.
- Page meta descriptions were not captured; only titles are set.
