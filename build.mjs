// Builds the static site into dist/.
// Posts live in posts/*.md with frontmatter: title, date (YYYY-MM-DD), dek, category, draft (optional).
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const SITE = {
  name: 'Riley Trottier',
  tagline: 'Senior PM — dispatches on product management for agentic AI',
  role: 'Senior Product Manager, Agentic AI',
  location: 'Victoria, BC',
  email: 'riley.a.trottier@gmail.com',
  github: 'https://github.com/rileytrottier23',
  linkedin: 'https://www.linkedin.com/in/rileytrottier/',
};

const root = path.dirname(new URL(import.meta.url).pathname);
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// Static assets. Binary files can be stored as base64 text so they can be committed via text-only tools:
// either one file (name.jpg.b64) or numbered parts (name.jpg.b64.00, .01, ...) joined in order.
const b64 = {};
for (const f of fs.readdirSync(path.join(root, 'public')).sort()) {
  const src = path.join(root, 'public', f);
  const m = f.match(/^(.+)\.b64(\.\d+)?$/);
  if (m) {
    b64[m[1]] = (b64[m[1]] || '') + fs.readFileSync(src, 'utf8');
  } else {
    fs.copyFileSync(src, path.join(dist, f));
  }
}
for (const [name, text] of Object.entries(b64)) {
  fs.writeFileSync(path.join(dist, name), Buffer.from(text.replace(/\s+/g, ''), 'base64'));
}
fs.copyFileSync(path.join(root, 'src', 'styles.css'), path.join(dist, 'styles.css'));

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmtDate = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const monthYear = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-CA', { month: 'short', year: 'numeric', timeZone: 'UTC' });

const postsDir = path.join(root, 'posts');
const posts = fs.readdirSync(postsDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const { data, content } = matter(fs.readFileSync(path.join(postsDir, f), 'utf8'));
    const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
    const slug = data.slug || f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
    const words = content.split(/\s+/).filter(Boolean).length;
    return { ...data, date, slug, html: marked.parse(content), minutes: Math.max(1, Math.round(words / 230)) };
  })
  .filter((p) => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

const page = ({ title, description, body, prefix = '' }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${prefix}styles.css">
</head>
<body>
<div class="wrap">
  <header class="masthead">
    <img src="${prefix}riley.jpg" alt="Riley Trottier">
    <div>
      <a class="title" href="${prefix || './'}">${esc(SITE.name)}</a>
      <div class="tagline">${esc(SITE.tagline)}</div>
    </div>
  </header>
  <nav class="meta-row" aria-label="Site">
    <span>${esc(SITE.location)}</span>
    <span><a href="${prefix}#writing">Writing</a><a href="${prefix}work/">Work</a><a href="${prefix}projects/">Projects</a><a href="${prefix}#about">About</a><a href="${SITE.github}">GitHub</a></span>
  </nav>
${body}
  <footer class="colophon">
    Published irregularly from ${esc(SITE.location)}.<br>
    Get in touch: <a href="mailto:${SITE.email}">${SITE.email}</a> — <a href="${SITE.github}">GitHub</a> — <a href="${SITE.linkedin}">LinkedIn</a>
  </footer>
</div>
</body>
</html>
`;

const about = `
  <section class="about" id="about">
    <img src="riley.jpg" alt="">
    <div>
      <h2>ABOUT</h2>
      <p>I'm a Senior Product Manager working on agentic AI for enterprises.</p>
      <p>Based in Victoria, BC. Outside of work I'm learning French, playing more chess than my rating shows, and challenging myself on the squash court and golf course. Proud new father as of 2026.</p>
    </div>
  </section>`;

// Home page
const [latest, ...rest] = posts;
const leadHtml = latest
  ? `
  <section class="lead" id="writing">
    <div class="kicker">LATEST DISPATCH${latest.category ? ' · ' + esc(String(latest.category).toUpperCase()) : ''}</div>
    <h1><a href="posts/${latest.slug}/">${esc(latest.title)}</a></h1>
    ${latest.dek ? `<p class="dek">${esc(latest.dek)}</p>` : ''}
    <div class="byline">${fmtDate(latest.date)} · ${latest.minutes} min read</div>
  </section>`
  : `
  <section class="lead" id="writing">
    <div class="kicker">DISPATCHES</div>
    <p class="empty">The first dispatch is on its way — notes on building and governing AI agents for enterprise work.</p>
  </section>`;

const indexHtml = rest.length
  ? `
  <section class="index">
    <h2>RECENT DISPATCHES</h2>
    ${rest.map((p) => `<a class="entry" href="posts/${p.slug}/">
      ${p.category ? `<div class="cat">${esc(String(p.category).toUpperCase())}</div>` : ''}
      <h3>${esc(p.title)}</h3>
      ${p.dek ? `<p>${esc(p.dek)}</p>` : ''}
      <div class="foot">${monthYear(p.date)} · ${p.minutes} min read</div>
    </a>`).join('\n    ')}
  </section>`
  : '';

fs.writeFileSync(path.join(dist, 'index.html'), page({
  title: `${SITE.name} — ${SITE.role}`,
  description: 'Dispatches on product management for agentic AI, by Riley Trottier.',
  body: leadHtml + indexHtml + about,
}));

// Post pages
for (const p of posts) {
  const dir = path.join(dist, 'posts', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page({
    title: `${p.title} — ${SITE.name}`,
    description: p.dek || p.title,
    prefix: '../../',
    body: `
  <article>
    <header class="lead">
      ${p.category ? `<div class="kicker">${esc(String(p.category).toUpperCase())}</div>` : ''}
      <h1>${esc(p.title)}</h1>
      ${p.dek ? `<p class="dek">${esc(p.dek)}</p>` : ''}
      <div class="byline">By ${esc(SITE.name)} · ${fmtDate(p.date)} · ${p.minutes} min read</div>
    </header>
    <div class="article">
${p.html}
      <a class="back" href="../../">← All dispatches</a>
    </div>
  </article>`,
  }));
}

// Standalone pages: pages/<slug>.md -> dist/<slug>/index.html
// Frontmatter: title, kicker, dek, description. Markdown and raw HTML are both allowed.
const pagesDir = path.join(root, 'pages');
const pageNames = fs.existsSync(pagesDir) ? fs.readdirSync(pagesDir).filter((f) => f.endsWith('.md')) : [];
for (const f of pageNames) {
  const { data, content } = matter(fs.readFileSync(path.join(pagesDir, f), 'utf8'));
  const slug = f.replace(/\.md$/, '');
  const dir = path.join(dist, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page({
    title: `${data.title} — ${SITE.name}`,
    description: data.description || data.dek || data.title,
    prefix: '../',
    body: `
  <article>
    <header class="lead">
      ${data.kicker ? `<div class="kicker">${esc(String(data.kicker).toUpperCase())}</div>` : ''}
      <h1>${esc(data.title)}</h1>
      ${data.dek ? `<p class="dek">${esc(data.dek)}</p>` : ''}
    </header>
    <div class="article page">
${marked.parse(content)}
    </div>
  </article>`,
  }));
}

console.log(`Built ${posts.length} post(s) and ${pageNames.length} page(s) into dist/`);
