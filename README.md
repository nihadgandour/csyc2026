# المخيم الشبابي للأمن السيبراني 2026 — لوحة التحديثات اليومية

Live daily-updates hub for the Cyber Security Youth Camp 2026. Static site — no build step, no dependencies.

## Files
- `index.html` — today's live dashboard (always current)
- `days/` — archive: `index.html` (list) + one `day-XX.html` per past day
- `GUIDE.html` — Arabic step-by-step daily-update guide for camp staff
- `404.html` — on-brand not-found page
- `images/` — character art + photos
- `favicon.svg` — brand shield-lock icon
- `.nojekyll` — tells GitHub Pages to serve all files as-is

## Publish free on GitHub Pages
1. Create a free GitHub account and a **Public** repo (e.g. `cyber-camp-2026`).
2. **Add file → Upload files** → drag in everything in this folder. Commit.
3. **Settings → Pages → Deploy from branch → main → / (root) → Save.**
4. Live in ~1 min at `https://<username>.github.io/cyber-camp-2026/`.
   Automatic free HTTPS. Only your account can edit; anyone can view.

## Daily updates (≈5 min, no redesign)
Open `GUIDE.html` for the full Arabic walkthrough. In short:
1. Archive yesterday into `days/` (change `images/` → `../images/` in the copy).
2. Edit `index.html` — follow the `✏️ حدّث يومياً` markers.
3. Update the `SCHEDULE` list near the bottom — the clock, "happening now",
   and countdown update themselves.
4. Commit. Done.

## Notes
- Live features (clock, "happening now", counters) are plain JavaScript embedded
  in the page — they work the moment it's hosted, no configuration.
- This carries official National Cyber Security Agency / Academy branding.
  Confirm the organization's hosting policy before publishing under their identity.
- Arabic font: Tajawal (closest free match to the brand's Madani Arabic).
