# NavaSound website

The launch website for [NavaSound](https://navasound.com), an Australian music distribution company for independent artists.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run build
```

## Deployment

The production project is linked to Vercel as `emirgroup/navasound` and deploys
automatically from the private GitHub repository's `main` branch. The live custom
domains are `navasound.com` and `www.navasound.com`.

## Founding-artist beta

The `/apply` route prepares a structured application in the visitor's email app.
NavaSound does not collect payment, store artist data, or accept release files on
the website while the distribution backend and final service terms are pending.
