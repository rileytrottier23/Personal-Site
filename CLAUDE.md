# CLAUDE.md — Personal Site

Riley's personal site and blog (rileytrottier.com). Markdown posts in, plain HTML out. See `README.md` for how to add posts and pages.

## How to work with Riley
- Plan before coding. For anything bigger than a small fix, write a short plan and wait for a yes.
- Push back. If an idea is weak, risky or out of scope, say why. Don't just agree.
- Explain changes in plain language. Riley is a PM, not a full-time engineer.
- Show a task list for multi-step work.

## Working habits
- **Docs vs code:** when a doc (this file, README) and the code disagree, follow the code, and list every mismatch you found in your final reply so the doc can be fixed.
- **Prove it works:** run the build before saying something works, and paste the output. At the end of a task, say what you didn't test.
- **Never weaken checks:** don't weaken or delete an existing check or test to make a change pass. Fix the code, or stop and ask.
- **Read, then edit:** run the build once before changing anything, so you know what was already broken. Then list the files you need, read them in one pass, make all the edits, and build again.
- **No stray files:** don't create new markdown files without asking (posts and pages Riley asked for are fine). Each fact lives in one file; update that file instead of starting another.

## Commands
| Task | Command |
|---|---|
| Install | `npm install` |
| Build | `npm run build` |
| Build + serve on :3000 | `npm run dev` |

## Layout
- `posts/` blog posts (`YYYY-MM-DD-slug.md`); `pages/` standalone pages
- `build.mjs` builds everything into `dist/`; `server.mjs` serves it
- `public/` static files; `.b64` images are decoded at build time

## Rules
- **Publishing:** everything pushed to `main` goes live. Before adding or changing a post or page, check it for private, strategic or financial employer info, and ask Riley if unsure.
- **Writing:** posts use Riley's voice and his title "Senior Product Manager". Link to his older posts where it fits.
- **Secrets:** never commit `.env` or keys. This repo is public.

## Deploy
Railway runs `npm run build`, then `npm start`, on every push to `main`.
