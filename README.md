# Traveling

A responsive tourism SPA built with Vue 3, TypeScript, Vue Router, Pinia and
Vue I18n. The interface is available in English and Polish, with persistent
language and light/dark theme preferences.

## Demo

[Demo link](https://travel-murex-seven.vercel.app/)

## Requirements

- Node.js `^22.18.0` or `>=24.12.0`
- npm

## Getting started

```sh
npm install
npm run dev
```

Create and preview a production build:

```sh
npm run build
npm run preview
```

`npm run build` runs the Vue/TypeScript project check and creates the production
bundle in `dist/`.

The Vercel deployment uses `vercel.json` to serve the SPA entry point for
direct requests to client-side routes. Vue Router then redirects unknown paths
to the home page.

## Project structure

```text
src/
├── assets/
│   ├── images/
│   │   └── pages/
│   │       ├── contact/
│   │       ├── home/
│   │       ├── journeys/
│   │       └── team/
│   └── styles/
│       ├── base.css
│       ├── app.css
│       ├── components/
│       │   ├── PageHero.css
│       │   ├── SiteFooter.css
│       │   ├── SiteHeader.css
│       │   ├── TourCard.css
│       │   └── TypingTitle.css
│       └── pages/
│           ├── ContactsView.css
│           ├── HomeView.css
│           ├── TeamView.css
│           └── ToursView.css
├── components/
│   ├── SiteFooter.vue
│   ├── SiteHeader.vue
│   ├── TourCard.vue
│   └── TypingTitle.vue
├── i18n/
│   └── index.ts
├── router/
│   └── index.ts
├── stores/
│   └── preferences.ts
├── views/
│   ├── ContactsView.vue
│   ├── HomeView.vue
│   ├── TeamView.vue
│   └── ToursView.vue
├── App.vue
└── main.ts
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home and featured trips |
| `/tours` | Filterable journey catalog |
| `/team` | Team profiles |
| `/contacts` | Contact details and validated contact form |

Routes are defined in `src/router/index.ts`; page components are lazy-loaded
from `src/views/`.

## State and localization

`src/main.ts` installs Pinia, Vue Router and Vue I18n:

```ts
createApp(App).use(createPinia()).use(router).use(i18n).mount('#app')
```

Translation messages and the `AppLocale` type are defined in
`src/i18n/index.ts`. To add a locale, provide a complete message tree matching
the existing locale and add its locale code to the allowed values in
`src/stores/preferences.ts`.

The Pinia preferences store persists the selected locale and color theme in
`localStorage`. The root app synchronizes the selected locale with the document
language and the selected theme with `data-theme`.

## Styles and assets

All stylesheets live under `src/assets/styles/`:

- `base.css` defines the color palette, typography/layout tokens and global
  reset.
- `app.css` contains shared layout utilities, buttons, typography, route
  transitions and scroll-reveal behavior.
- `components/` contains styles for shared components.
- `pages/` contains page-specific styles.

Vue components and views include their stylesheets with `<style src="...">`.
Class names follow BEM. Put new global styles in `base.css` or `app.css` only
when they are genuinely shared; otherwise add them to the matching component or
page stylesheet.

The visual palette uses `#FFD11A` as the primary accent with charcoal and warm
neutral surfaces. Both light and dark themes are defined as CSS custom
properties in `base.css`; use these tokens rather than adding page-specific
brand colors.

Typography uses fluid `clamp()`-based CSS custom properties in `base.css`, so
body copy, labels and headings scale smoothly between viewport sizes. Reuse
the existing `--font-size-*` tokens for new text styles.

Local AVIF images are stored in `src/assets/images/pages/` and imported into
Vue/TypeScript modules so Vite can resolve and fingerprint them for production.
The home hero and quote section use `home/bg.avif` and `home/bg_bottom.avif`;
journey photos are under `journeys/`, and team portraits are under `team/`.

Elements with `.reveal` use CSS Scroll-driven Animations
(`animation-timeline: view()`) where supported. They remain visible when the
feature is unavailable. Reduced-motion preferences disable decorative
animations. `TypingTitle.vue` provides the animated hero heading on every page
and respects reduced-motion preferences.

## Contact form

The contact page validates required fields and email format in the browser.
Submission currently displays a demo confirmation; connect a backend or email
service to deliver messages.
