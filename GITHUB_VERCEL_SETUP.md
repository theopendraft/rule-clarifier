# GitHub Actions & Vercel Environment Setup

## Problem
GitHub Actions workflow fails with:
```
Error: You must provide a nonempty URL. The environment variable `DATABASE_URL` resolved to an empty string.
```

This means the `DATABASE_URL` secret is **not configured** in your GitHub repository.

---

## Solution: Add DATABASE_URL Secret to GitHub

### Step 1: Copy your DATABASE_URL
From your local `.env` file, copy the Postgres connection string:
```
postgresql://neondb_owner:npg_7cWCtqbnBu4p@ep-bold-brook-a16w20wn-pooler.ap-southeast-1.aws.neon.tech/railway_v2?sslmode=require
```

### Step 2: Add to GitHub Repository Secrets
1. Go to your GitHub repository: https://github.com/theopendraft/rule-clarifier
2. Click **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** (green button)
5. Fill in:
   - **Name**: `DATABASE_URL`
   - **Secret**: Paste the connection string from Step 1
6. Click **Add secret**

### Step 3: Verify the Secret Works
Once the secret is added:
1. Go to **Actions** tab in your repo
2. Click on the latest failed workflow run
3. Click **Re-run all jobs** (top right)
4. Or manually trigger the "Test DB Connection" workflow from the Actions tab

The workflow should now succeed and migrations will deploy.

---

## Add DATABASE_URL to Vercel (for runtime)

Your app running on Vercel also needs the database URL to query data.

### Steps:
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Same Postgres URL from above
   - **Environment**: Select **Production** and **Preview**
4. Click **Save**
5. Redeploy your app (or it will auto-deploy on next push)

---

## Files Added/Modified

✅ **Workflow files created:**
- `.github/workflows/prisma-deploy.yml` - Auto-runs migrations on push to main
- `.github/workflows/prisma-migrate-deploy.yml` - Manual/auto migration runner
- `.github/workflows/test-db-connection.yml` - Test workflow to verify secret works

✅ **Next.js config fixed:**
- `app/layout.tsx` - Moved `viewport` to `generateViewport()` export (removes Vercel warnings)

✅ **Prisma schema updated:**
- `prisma/schema.prisma` - Changed provider from `sqlite` to `postgresql`

✅ **Environment file cleaned:**
- `.env` - Removed Markdown fences and quotes so Prisma can read it

---

## Quick Reference: Run Migrations Locally

If you want to run migrations locally (not via CI):

```powershell
# Set the env var in PowerShell (temporary, for this session)
$env:DATABASE_URL='postgresql://neondb_owner:npg_7cWCtqbnBu4p@ep-bold-brook-a16w20wn-pooler.ap-southeast-1.aws.neon.tech/railway_v2?sslmode=require'

# Run migrate deploy
npx prisma migrate deploy --schema=./prisma/schema.prisma

# Or run migrate dev (creates migration files if schema changed)
npx prisma migrate dev --name your_migration_name --schema=./prisma/schema.prisma
```

---

## Summary Checklist

- [ ] Add `DATABASE_URL` to GitHub repo secrets (Settings → Secrets → Actions)
- [ ] Add `DATABASE_URL` to Vercel environment variables (Project Settings → Environment Variables)
- [ ] Re-run the failed GitHub Action to verify it now works
- [ ] Push any local changes and confirm Vercel redeploy succeeds

Once these are done, your GitHub Actions migrations will deploy automatically on every push to `main`, and your Vercel app will have DB access.
