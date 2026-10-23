# RWAvenue — TypeScript build recovery

**Role:** Senior Full-Stack / Backend Engineer  
**Timebox:** 60–90 minutes  
**Repo:** RWAvenue PoC (React + Vite frontend, Express + TypeScript API)

A type-safety pass on the HTTP layer was started and not finished. The production backend build is red. Restore it without weakening the type system.

---

## Setup

From the repository root:

```bash
npm install
npm run db:migrate
npm run db:seed
npm run build
```

`npm run build` currently fails (`prisma generate && tsc`). That is the task.

You can still run the app with `npm run dev` (tsx does not type-check). Do not treat a running dev server as a passing build.

- Backend API: `http://localhost:3001`
- Frontend: `http://localhost:3000`

---

## What you must deliver

1. `npm run build` exits **0**.
2. `tsconfig.json` compiler options stay as they are (`strict`, `noUnusedLocals`, `noUnusedParameters`, `module` / `moduleResolution: NodeNext`).
3. Keep branded / request types that already exist. Do not erase them just to silence the compiler (`AssetId`, `AuthenticatedRequest`).
4. Keep the existing layering: routes → controllers → services. Do not add a parallel API.

A short note (5–10 lines) on what was broken and how you fixed it is welcome.

---

## Constraints (automatic fail if used as the main fix)

- Turning off `strict` or removing `noUnusedLocals` / `noUnusedParameters`
- Blanket `any`, `@ts-ignore`, `@ts-nocheck`, or `as unknown as ...`
- Changing `moduleResolution` away from `NodeNext`
- Rewriting the app in a different framework

---

## Out of scope

- UI polish, new product features, and test suites
- Database schema / migration changes
- Frontend `npm run build:frontend` (Vite). Nice-to-have only if you finish early.

---

## How we review

We look at the diff, not only a green build. A passing `tsc` that cheats the type system is a fail. A passing `tsc` that keeps the new types honest at the HTTP boundary is a pass.
