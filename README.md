# personal-site

Riley Trottier's personal site and blog. A small static site: Markdown posts in, plain HTML out.

## Add a post

1. Copy `posts/_TEMPLATE.md.example` to `posts/YYYY-MM-DD-short-slug.md`.
2. Fill in the frontmatter (`title`, `date`, `dek`, `category`) and write the post in Markdown.
3. Commit and push to `main`. Railway rebuilds and redeploys automatically.

Set `draft: true` to keep a post off the site. The newest post becomes the lead story on the front page.

## Add or edit a page

Standalone pages live in `pages/<slug>.md` and are published at `/<slug>/`. Frontmatter: `title`, `kicker`, `dek`, `description`. Markdown and raw HTML both work.

## Run locally

```
npm install
npm run dev   # builds, then serves on http://localhost:3000
```

## How it works

- `build.mjs` turns `posts/*.md` and `pages/*.md` into `dist/`: the front page, one page per post, and standalone pages (Work, Projects).
- The stylesheet link carries a content hash (`styles.css?v=...`), so browsers pick up style changes right away.
- `server.mjs` serves `dist/` with no dependencies.
- `public/` holds static files. Images stored as base64 text (`name.jpg.b64`, or parts `name.jpg.b64.00`, `.01`, ...) are decoded at build time.
- Railway runs `npm run build`, then `npm start`.
