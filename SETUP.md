# Skaftalia Writer panel — setup

This adds a private writing dashboard at `writer.html`. Chapters are stored in Supabase; no Git commands are needed to write or save.


## 1) Create the database
1. Go to https://supabase.com and create a project.
2. In the project, open **SQL Editor** and run the full contents of `supabase-schema.sql`.
3. Go to **Project Settings → API**. Copy the Project URL and the anon/public key.
4. Paste those into `supabase-config.js`, replacing the two `YOUR_...` values.

## 2) Create the writer account
1. Open Supabase **Authentication → Users** and create your own user (email + password).
2. Once the account is created, disable public sign-ups in Authentication settings. You only need the one author account.

## 3) Upload the panel
Upload the contents of `writer-panel` folder to your website's root directory (where `index.html` is located). That makes `writer.html` available at `/writer.html`.

## 4) Make published posts appear on the public website
Follow `PUBLIC-INTEGRATION.md` to add the small loader to the existing `script.js` and load `supabase-config.js` on the public page.

## Using it
- Visit `/writer.html` and sign in.
- Click **+ Yeni**, fill chapter metadata and write.
- Autosave creates/saves drafts after typing pauses; the **Taslak kaydet** button also saves immediately.
- **Yayınla** changes status to published, which makes it visible on the public website once the public loader is installed.
- Clicking an existing entry loads it into the editor. Draft/published status is shown in the list.

## Security
- The anon/public key is designed for browser use. Never upload the Supabase service-role key.
- Database row-level security is enabled in the supplied SQL. Only the logged-in account can insert/update/delete its own posts. Public readers can read only published posts.
- Keep account sign-up disabled after creating your author account.
