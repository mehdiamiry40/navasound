# NavaSound website

The launch website for [NavaSound](https://navasound.com), an Australian
Release Readiness beta and planned music distribution service for independent
artists.

## Local development

```bash
nvm use
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npx playwright install chromium
npm run check
```

The full quality gate runs linting, TypeScript, a production build and browser
regression tests, including JavaScript-disabled privacy-boundary coverage.

## Deployment

The production project is linked to Vercel as `emirgroup/navasound` and deploys
automatically from the private GitHub repository's `main` branch. The live custom
domains are `navasound.com` and `www.navasound.com`.

## Release Readiness founding beta

The `/apply` route prepares a structured application for human fit and readiness
review in the visitor's email app, clipboard or local download. NavaSound does
not collect payment, store artist data, or accept release files on the website
while provider integration and final service terms are pending.

The `/release` route creates a structured release brief entirely in the visitor's
browser and downloads it as a local text file. The `/legal` route publishes the
current privacy, website, beta-submission and pre-launch refund documents.

Internal launch controls and the provider-dependent distribution-agreement drafting
framework are stored under `docs/legal/` and `docs/providers/`.
