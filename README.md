# personal-site

Riley Trottier's personal site and blog. A small static site: Markdown posts in, plain HTML out.

## Add a post

1. Copy `posts/_TEMPLATE.md.example` to `posts/YYYY-MM-DD-short-slug.md`.
2. Fill in the frontmatter (`title`, `date`, `dek`, `category`) and write the post in Markdown.
3. Commit and push to `main`. Railway rebuilds and redeploys automatically.

Set `draft: true` to keep a post off the site. The newest post becomes the lead story on the front page.

## Run locally

```
npm install
npm run dev   # builds, then serves on http://localhost:3000
```

## How it works

- `build.mjs` turns `posts/*.md` into `dist/` (front page plus one page per post).
- `server.mjs` serves `dist/` with no dependencies.
- `public/` holds static files. Images stored as `.b64` text are decoded at build time.
- Railway runs `npm run build`, then `npm start`.
