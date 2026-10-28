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

## Backend (forms → Resend)

`server/` is a small Express + TypeScript API (`GET /api/health`, `POST /api/contact`, `POST /api/booking`).
The frontend only calls relative `/api/*` URLs: Vite proxies them to `127.0.0.1:3001` in dev, Caddy does in production.

- Setup: `npm run setup`, then copy `server/.env.example` to `server/.env` and set `RESEND_API_KEY`.
- Dev (client + API): `npm run dev` → http://localhost:5173 and http://127.0.0.1:3001
- Build: `npm run build` (client → `dist/`, server → `server/dist/`); checks: `npm run typecheck`, `npm run lint`
- VPS: `pm2 start ecosystem.config.cjs`; Caddy config in `deploy/Caddyfile.example`.

## Localization (English / Saudi Arabic)

- English is the default; the header's `AR` / `EN` button switches to `ar-SA` and the choice is remembered in `localStorage` (`scl-locale`). Routes are the same in both languages.
- `src/i18n/`: `ar-SA.ts` is the Arabic catalogue, keyed by the English source string; components call `t('English text')` from `useI18n()`. `en.ts` can override English copy without touching markup. `locales.ts` holds `lang`/`dir`/Intl tags (Gregorian calendar, Latin digits).
- `<html lang dir>` flips to `ar-SA` / `rtl` (applied before first paint by an inline script in `index.html`). RTL fixes live in `src/styles/rtl.css`; photography is not mirrored.
- Arabic font: IBM Plex Sans Arabic (SIL OFL), self-hosted in `public/assets/fonts/` (`src/styles/fonts-ar.css`).
- `npm run i18n:check` lists `t()` strings that have no Arabic entry. The service `<option>` values sent to the API stay English.

## Booking date picker

`src/components/forms/DatePicker.tsx` is a small calendar popup (read-only field, past dates disabled, keyboard + click-outside, RTL aware). The form still submits `preferred_date` as `YYYY-MM-DD`.
