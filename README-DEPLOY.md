# Deployment to Vercel

This project is ready to be deployed to Vercel. Follow these steps.

## 1) Choose a production database

Recommended providers:
- Vercel Postgres (easy to integrate)
- Supabase
- PlanetScale

After provisioning, copy the connection string and use it as `DATABASE_URL`.

## 2) Required environment variables (Vercel project settings)

Set the following in both Preview and Production environments as needed:

- `DATABASE_URL` = your production database connection string (postgresql://...)
- `UPLOADTHING_SECRET` = your UploadThing server secret (if using UploadThing)
- `UPLOADTHING_APP_ID` = UploadThing app id
- `NODE_ENV` = `production`
- Any other keys from your `.env` that are required in production

## 3) GitHub Actions (migrations)

A GitHub Action has been added at `.github/workflows/prisma-deploy.yml`. It runs on `push` to `main` and will execute:

- `npm ci`
- `npx prisma generate`
- `npx prisma migrate deploy`

Important: Add a GitHub repository secret named `DATABASE_URL` (the production DB URL) so the workflow can run migrations.

## 4) Vercel setup

1. Go to https://vercel.com/new and import the GitHub repo: `theopendraft/rule-clarifier`.
2. In Project Settings → Environment Variables add the keys listed above.
3. Build & Output settings are usually auto-detected for Next.js:
   - Install Command: `npm ci`
   - Build Command: `npm run build`
   - Output Directory: (leave default)

Vercel will run `npm ci` (which triggers `postinstall` -> `prisma generate`) then `npm run build`.

## 5) Run migrations on production

Options:

- Let the GitHub Action run migrations automatically (recommended). Ensure `DATABASE_URL` secret is set in GitHub.
- Or run migrations manually: connect to the VM or run locally using the same `DATABASE_URL` and run:

```bash
npx prisma migrate deploy --schema=./prisma/schema.prisma
```

## 6) Post-deploy checks

- Open the deployed URL and verify:
  - `/manuals` loads and shows manuals
  - Manual detail pages load
  - Uploading works (if configured) — ensure UploadThing credentials are set
- Check Vercel function logs for runtime errors

## Troubleshooting

- If Next.js build fails on Vercel due to native modules (e.g. `puppeteer`), consider moving heavy server-only libraries behind feature flags or use API microservices.
- If you see `Attempted import error: 'utapi' is not exported` during build, we added a local shim in `lib/uploadthing.ts`. Replace with real UploadThing client for production.

If you want, I can:
- Add a Vercel CLI instruction set to deploy from your machine.
- Add an automated workflow to run `npx prisma migrate deploy` only after Vercel reports a successful deployment (advanced).
