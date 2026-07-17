# BUILD BRIEF — Cyber Security Youth Camp 2026
## Live Daily-Updates Dashboard

> This is an editable specification. Change any value, section, or rule below and
> hand it to a developer, designer, or AI tool to (re)build or modify the site.
> Everything currently in the site maps to a line in this brief.

---

## 1. PROJECT SUMMARY

Build a **single-file, responsive HTML landing page** that acts as the official
**live daily-updates hub** for a youth cyber-security camp. The page structure stays
the same for a **3-week** event; only the content changes each day. It must feel like a
**live event dashboard** parents return to every day — fast to scan, energetic, and
easy for non-designers to update without redesigning.

**Audience:** parents of teenage campers (primary), campers (secondary).
**Tone:** modern, futuristic, professional, youth-friendly. NOT "hacker movie."

---

## 2. LANGUAGE & DIRECTION

- **Bilingual Arabic + English**, with a live **ع / EN toggle** in the top bar.
- Toggling swaps ALL visible text and flips layout **RTL ↔ LTR** instantly.
- **Default = Arabic (RTL).**
- Remember the visitor's language choice on their device.
- Implementation: every translatable element carries a `data-en` attribute; the
  original Arabic is preserved and swapped by a small script.

---

## 3. BRAND SYSTEM  (from the official Camp Brand Guideline)

| Token | Value |
|---|---|
| Primary cyan | `#00b1d5` |
| Bright cyan | `#22d3f0` |
| Primary navy | `#295b98` |
| Deep navy | `#0a2a52` |
| Background (ink) | `#030c1e` |
| Signal / alert | `#ff6b8a` |
| Success | `#35d0a5` |
| Gold | `#ffc857` |
| Brand gradient | deep-navy → navy → bright-cyan |

- **Fonts:** Tajawal (Arabic + UI), Oswald (numbers, English display).
  Closest free matches to the guideline's Molde / Madani Arabic.
- **Visual style:** dark dashboard background, faint circuit-grid texture,
  glassmorphism cards, rounded corners (14–20px), subtle neon glow, animated
  hover states, tabular numerals for stats.
- **Keep it clean** — no clutter, minimal scrolling fatigue, large visual hierarchy.

---

## 4. FIXED TOP BAR (sticky)

Contains, from the brief's request:
- **Three real logo images:** National Cyber Security Agency + National Cyber
  Security Academy on one side; the **camp title logo** on the other.
- **Live-updating clock** (HH:MM:SS, visitor's local time).
- **Animated "live" ticker** — one scrolling line of the day's top updates.
- **Archive link** (→ past days).
- **ع / EN language toggle.**

Logos stay visible on mobile at reduced size.

---

## 5. SECTIONS (modular, reusable, collapse gracefully if empty)

The layout must work with 1 or 10 announcements, 3 or 30 photos, 1 or 8 highlights,
and with or without any given section on a given day.

1. **Hero** — camp title, "live daily updates" label, current-day badge (e.g. Day 4),
   date, week/session, floating 3D character illustrations with orbiting data chips.
2. **"Happening Now" spotlight bar** — auto-selects the session running right now from
   the schedule, and shows a **countdown to the next** session. Hides when the day ends.
   (Add clear vertical spacing between the top bar and this section.)
3. **Today's Snapshot** — animated stat counters: participants, sessions completed,
   challenges solved, teams competing, photos uploaded. Plus a **"what's new since
   yesterday"** chip strip and a "last updated" stamp.
4. **Daily Timeline** — horizontal scrollable rail of sessions with
   done / now / upcoming states and colour-coded tags (workshop, challenge, break, ceremony).
5. **Highlights** — large feature cards: image, tag, title, short description, optional
   "read more." One card can be "featured" (double width).
6. **Photo Gallery** — responsive grid that auto-adapts to 4 / 6 / 9+ images.
7. **Top Students (الطلاب المتفوقون)** — medal cards: rank medal, avatar, name, team,
   what they excelled at, points.
8. **Daily Attendance (الحضور اليومي)** — girls count + boys count + total, with a
   proportion bar and percentages.
9. **Announcements** — colour-coded notice cards: urgent / info / success, each with
   icon, title, text, time-ago.
10. **Leaderboard** — ranked team table: rank, team (avatar + name), points, up/down change.
11. **Student Feedback (فيدباك من الطلاب)** — testimonial block: star rating, quote,
    student name + team + day, character illustration. (Replaces a generic quote block.)
12. **Tomorrow Preview** — teaser list of tomorrow's workshops / guests / challenges.
13. **Footer** — organizers, sponsors/partners, social links, contact.

> NOTE: There is intentionally **no video / daily-recap section**.

---

## 6. LIVE ENGINE (vanilla JavaScript, no libraries)

- A single **editable `SCHEDULE` array** (bilingual: Arabic + English titles and
  locations) is the source of truth.
- From it, the script computes and updates: the **clock**, the **"happening now"** bar,
  and the **countdown** — all based on the visitor's real time.
- **Stat counters animate up** on load.
- Respect `prefers-reduced-motion` (disable animation when requested).
- No backend, no database, no build step — pure static files.

---

## 7. ARCHITECTURE & FILES

- `index.html` — always shows **today**.
- `days/` — one **archived HTML page per past day** (frozen: clock shows "archived,"
  no live countdown), plus `days/index.html` = a browsable archive list.
- `images/` — character art, photos, and the three logos.
- `favicon.svg` — brand shield-lock icon.
- `404.html` — on-brand not-found page.
- `GUIDE.html` — Arabic step-by-step daily-update guide for camp staff.
- SEO + Open-Graph meta (nice WhatsApp/Twitter share preview).
- `.nojekyll` + `README.md` for GitHub Pages.

---

## 8. EDITABILITY (critical requirement)

- Must be **updatable daily by non-designers** in ~5 minutes, no redesign.
- All daily-editable content is marked in the HTML with `✏️ حدّث يومياً` comments.
- Content blocks can be **duplicated or deleted freely** — the layout absorbs any count.
- Daily routine: archive yesterday → edit today's markers → edit the `SCHEDULE` list →
  commit. Live in under a minute.

---

## 9. HOSTING

- Free, secure, static hosting on **GitHub Pages** (automatic HTTPS).
- Publishable as-is by uploading the folder; no configuration or build tools.
- (For an official government-branded deployment, confirm the organization's approved
  hosting policy before publishing under its identity.)

---

## 10. FLEXIBILITY CHECKLIST (must all hold true)

- [ ] Works with 1 announcement or 10.
- [ ] Works with 3 photos or 30.
- [ ] Works with 1 highlight or 8.
- [ ] Sections collapse cleanly when a day has no content for them.
- [ ] Longer or shorter daily schedules both render correctly.
- [ ] Fully responsive, mobile-first.
- [ ] Arabic RTL and English LTR both correct on every breakpoint.

---

### HOW TO EDIT THIS BRIEF
- **Add a section:** copy a numbered item in §5, change its name/fields.
- **Change the look:** edit the tokens in §3.
- **Remove a feature:** delete its line (e.g. drop the language toggle in §2 for
  Arabic-only).
- **Change behavior:** edit §6 (e.g. "refresh counters every 60s from a data file").
- Hand the edited brief back to a developer or AI tool to rebuild accordingly.
