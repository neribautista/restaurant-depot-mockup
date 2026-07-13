# Restaurant Depot — Wholesale Foodservice Mockup

A presentation mockup of a wholesale foodservice distributor site (in the
spirit of Restaurant Depot), built with Next.js 14 (App Router) + Tailwind,
with free-tier Gemini API integration for search and support chat.

## Setup

```bash
npm install
cp .env.local.example .env.local   # add your GEMINI_API_KEY
npm run dev
```

Open http://localhost:3000. The AI search bar (Catalog page), the "Track an
Order" widget, and the help chat bubble all call the Gemini API — everything
else runs entirely client-side against mock data in `data/` and
`localStorage`, so the app also works (minus AI features) with no key set.

## What's mocked vs. real

- **No backend / database.** Registration, admin approval, and login are
  simulated in `lib/store.js` using `localStorage`, so the full flow can be
  demoed live in a browser. Swap this out for real API routes + a database
  before this becomes a production app.
- **AI features are real API calls** to Gemini (default model:
  `gemini-2.5-flash`, free-tier and fast — see `lib/gemini.js`).
- **Products, flyer items, and orders** are static JSON in `data/`.

## Demo script (registration → approval → catalog access)

1. **Home** (`/`) — hero, category tabs, "Margin Audit" CTA, "Apply for
   Membership" CTA.
2. **Register** (`/register`) — fill out a new business application. On
   submit you land on `/account/pending`, which shows a "Pending Review"
   stamp.
3. Open a second tab (or sign out and back in) and **sign in as the admin**:
   `admin@restaurantdepot.com` / `admin123`. Go to `/admin` and approve the
   application you just submitted.
4. Back in the applicant's tab/session, click **"Check Status"** on the
   pending page (or just sign back in) — it redirects straight to
   `/products`, the full catalog.
5. **Monthly Flyer** (`/flyer`) is public — no login needed to browse or add
   items to an order. Adding items and clicking **"View Order"** goes to
   `/cart`; clicking **checkout** there prompts sign-in if you're not
   authenticated yet (or not yet approved), demonstrating the gated
   checkout requirement.
6. **Catalog** (`/products`, gated) has the AI natural-language search bar
   and an AI order tracker (try order numbers `RD-10234`, `RD-10190`,
   `RD-10301`).

Pre-seeded demo accounts (see `lib/store.js` to add more):
- Admin: `admin@restaurantdepot.com` / `admin123`
- Approved member: `member@demo.com` / `member123`

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. Import it in Vercel.
3. Add the `GEMINI_API_KEY` environment variable in the Vercel project
   settings (Production + Preview).
4. Deploy.

Note: since state lives in `localStorage`, the admin-approval demo only
works within one browser (an admin approving on their own machine won't be
visible to someone else's browser). That's fine for a live walkthrough on
one screen; a real deployment needs a database once you're past the mockup
stage.

## Next steps if this moves past mockup stage

- Replace `lib/store.js` with real API routes + a database (Postgres via
  Vercel Postgres/Neon is a natural fit).
- Add real authentication (NextAuth or Clerk) instead of the plaintext demo
  passwords here.
- Move `data/*.json` into the same database once there's one.
