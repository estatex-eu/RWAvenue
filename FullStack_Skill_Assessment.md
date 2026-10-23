# RWAvenue Skill Assessment (optional feature round)

The take-home to send first is **`ASSESSMENT_CANDIDATE.md`** (fix the TypeScript build). Use this file only if you want a second, product-feature round.

20-minute practical tasks for **Frontend**, **Backend**, and **Full-Stack** candidates.

These tasks are based on the current RWAvenue codebase: a React + TypeScript marketplace for tokenized real-world assets, with an Express + Prisma + PostgreSQL API.

---

## Candidate setup

From the repository root:

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

- Backend API: `http://localhost:3001`
- Frontend: `http://localhost:3000`

The UI depends on the API. Run both services together, even for frontend-only tasks.

---

## Frontend Engineer

**Time:** ~20 minutes. Complete **both** items.

**Context:** The UI is mostly built. Several screens still use mock data, and wallet connect is present but broken.

### 1. Fix wallet connection (currently not working)

- The Sign In flow on the first page / header opens `AuthModal` and calls `connectWallet` in `frontend/src/store/authStore.ts`.
- Connecting MetaMask fails today. Find why and make connect / disconnect work.
- After connect, show the **truncated wallet address** and connection status in the header (not only Dashboard / Logout).
- Handle account change and network change without breaking the page.

### 2. Replace mock data on one live screen

- Pick **either** the homepage featured assets **or** `/marketplace`.
- Stop using `mockData` / `useMockDataStore` for that list.
- Load real data from the existing backend: `GET /api/assets/featured` or `GET /api/assets`.
- Show loading and error states. Keep the current layout.

**Notes:** Follow existing patterns (`validatorStore` / `validatorService` already talk to the API). The app is Vite, so use `import.meta.env` or the `/api` proxy — do not assume Next.js env vars.

---

## Backend Engineer

**Time:** ~20 minutes.

**Context:** Express + TypeScript + Prisma + PostgreSQL. Routes → controllers → services. `validateRequest` already exists in `src/middlewares/apiValidation.middleware.ts` but is **not used** on any route.

Review the existing backend structure and **implement validation + a correct buyer on the asset purchase endpoint**.

- Endpoint: `POST /api/assets/:id/purchase`
- Today it accepts almost anything and always records the buyer as `user123`.
- Validate required input (`paymentMethod` must be `crypto` or `fiat`; `buyerId` required).
- Use the existing `validateRequest` helper and keep routes / controllers / services consistent with the rest of the project.
- On success, persist the purchase with the **provided** `buyerId` and return `201` with the transaction payload already used by `purchaseAsset`.
- On invalid input, return `400` with a clear error body. If the asset does not exist, keep returning `404`.

You may also tighten `POST /api/assets` so an empty body cannot create an “Untitled Asset” — only if time remains.

---

## Full-Stack Engineer

**Time:** ~20 minutes. Complete **any two**.

- Add dark (night) mode on the first page (`/`) without using AI. Toggle should persist (localStorage is fine) and not break the existing header / hero layout.
- Enable the wallet connection on the first page (currently not working). After connect, show address + status in the header.
- After the tokenize wizard finishes IPFS upload, `POST` the new asset to `/api/assets` so it appears in the API / marketplace instead of only showing a toast and navigating away.

---

The TypeScript **build-fix** take-home (send this one to the freelancer) lives in `ASSESSMENT_CANDIDATE.md`.
