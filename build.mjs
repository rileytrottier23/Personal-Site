// Builds the static site into dist/.
// Posts live in posts/*.md with frontmatter: title, date (YYYY-MM-DD), dek, category, app_published (optional, e.g. "May 2025"), draft (optional).
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { ogImage } from './lib/og.mjs';

const SITE = {
  name: 'Riley Trottier',
  tagline: 'Senior Product Manager - building with artificial intelligence',
  role: 'Senior Product Manager',
  url: 'https://rileytrottier.com',
  employer: 'Workday',
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
// Version the stylesheet URL so browsers pick up CSS changes right away instead of using a cached copy.
const cssVersion = crypto.createHash('sha1').update(fs.readFileSync(path.join(dist, 'styles.css'))).digest('hex').slice(0, 10);

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

// Structured data that tells search engines who this site is about.
const personLd = {
  '@type': 'Person',
  '@id': `${SITE.url}/#riley`,
  name: SITE.name,
  url: `${SITE.url}/`,
  image: `${SITE.url}/riley.jpg`,
  jobTitle: SITE.role,
  worksFor: { '@type': 'Organization', name: SITE.employer },
  address: { '@type': 'PostalAddress', addressLocality: 'Victoria', addressRegion: 'BC', addressCountry: 'CA' },
  sameAs: [SITE.linkedin, SITE.github],
};
const ldScript = (obj) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', ...obj }).replace(/</g, '\\u003c')}</script>`;
const urls = [];

const page = ({ title, description, body, prefix = '', current = '', urlPath = '/', type = 'website', ld = '', lastmod = '', image = 'og/site.png', progress = false }) => { urls.push({ urlPath, lastmod }); return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta name="author" content="${esc(SITE.name)}">
<link rel="canonical" href="${SITE.url}${urlPath}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${SITE.url}${urlPath}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:image" content="${SITE.url}/${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="alternate" type="application/rss+xml" title="${esc(SITE.name)}" href="${SITE.url}/feed.xml">
${ld}
<link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${prefix}styles.css?v=${cssVersion}">
</head>
<body>
${progress ? '<div class="progress" aria-hidden="true"></div>' : ''}
<div class="wrap">
  <header class="masthead">
    <img src="${prefix}riley.jpg" alt="Riley Trottier">
    <div>
      <a class="title" href="${prefix || './'}">${esc(SITE.name)}</a>
      <div class="tagline">${esc(SITE.tagline)}</div>
    </div>
  </header>
  <nav class="site-nav" aria-label="Site">
    ${[['writing', 'Writing', `${prefix}#writing`], ['work', 'Work', `${prefix}work/`], ['projects', 'Projects', `${prefix}projects/`], ['about', 'About', `${prefix}about/`], ['github', 'GitHub', SITE.github]]
      .map(([key, label, href]) => `<a href="${href}"${key === current ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
  </nav>
${body}
  <footer class="colophon">
    Published irregularly from ${esc(SITE.location)}.<br>
    Get in touch: <a href="mailto:${SITE.email}">${SITE.email}</a> — <a href="${SITE.github}">GitHub</a> — <a href="${SITE.linkedin}">LinkedIn</a><br>
    <a href="${prefix}colophon/">How this site is built</a> — <a href="${prefix}feed.xml">RSS</a>
  </footer>
</div>
</body>
</html>
`; };

const about = `
  <section class="about" id="about">
    <h2>About</h2>
    <p>I've spent about eight years in product management, across payments, health tech, public transit and now enterprise finance software. I'm based in Victoria, BC, where I'm learning French and playing more chess than my rating shows. Proud new father as of 2026.</p>
    <p>I'm always glad to talk about product management and building with AI. <a href="about/">More about me</a> or <a href="mailto:${SITE.email}">send me an email</a>.</p>
  </section>`;

// A small strip on the front page that shows my latest public GitHub activity. Filled in by site.js; hidden if GitHub can't be reached.
const nowStrip = `
  <aside class="now" id="now" hidden>
    <span class="now-label">NOW BUILDING</span>
    <span id="now-text"></span>
  </aside>
  <script src="site.js" defer></script>`;

// Home page
const intro = `
  <section class="intro">
    <p>I'm a Senior Product Manager at Workday, building an agent for contract management and automated accounting. On my own time I build AI apps and tools to learn how these products work in practice. My experience covers a broad range of industries including finance, transportation, government and healthcare.</p>
  </section>`;
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
  description: 'Riley Trottier is a Senior Product Manager at Workday, based in Victoria, BC. Writing on product management and building with artificial intelligence.',
  ld: ldScript({ '@graph': [personLd, { '@type': 'WebSite', '@id': `${SITE.url}/#site`, url: `${SITE.url}/`, name: SITE.name, author: { '@id': personLd['@id'] } }] }),
  body: intro + nowStrip + leadHtml + indexHtml + about,
  current: 'writing',
}));

// Post pages
for (const p of posts) {
  const dir = path.join(dist, 'posts', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page({
    title: `${p.title} — ${SITE.name}`,
    description: p.dek || p.title,
    prefix: '../../',
    current: 'writing',
    urlPath: `/posts/${p.slug}/`,
    type: 'article',
    lastmod: p.date,
    image: `og/${p.slug}.png`,
    progress: true,
    ld: ldScript({ '@type': 'BlogPosting', headline: p.title, description: p.dek || p.title, datePublished: p.date, url: `${SITE.url}/posts/${p.slug}/`, mainEntityOfPage: `${SITE.url}/posts/${p.slug}/`, image: `${SITE.url}/og/${p.slug}.png`, author: personLd }),
    body: `
  <article>
    <header class="lead">
      ${p.category ? `<div class="kicker">${esc(String(p.category).toUpperCase())}</div>` : ''}
      <h1>${esc(p.title)}</h1>
      ${p.dek ? `<p class="dek">${esc(p.dek)}</p>` : ''}
      <div class="byline">By ${esc(SITE.name)} · ${fmtDate(p.date)} · ${p.minutes} min read${p.app_published ? ` · App first published ${esc(p.app_published)}` : ''}</div>
    </header>
    <div class="article">
${p.html}
    </div>
  </article>
  <section class="index more">
    <h2>MORE DISPATCHES</h2>
    ${posts.filter((o) => o.slug !== p.slug).slice(0, 3).map((o) => `<a class="entry" href="../${o.slug}/">
      ${o.category ? `<div class="cat">${esc(String(o.category).toUpperCase())}</div>` : ''}
      <h3>${esc(o.title)}</h3>
      ${o.dek ? `<p>${esc(o.dek)}</p>` : ''}
      <div class="foot">${monthYear(o.date)} · ${o.minutes} min read</div>
    </a>`).join('\n    ')}
    <a class="back" href="../../">← All dispatches</a>
  </section>`,
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
    current: slug,
    urlPath: `/${slug}/`,
    ld: ldScript(personLd),
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

// Share images: one per post in the site's newspaper style, plus one for every other page.
fs.mkdirSync(path.join(dist, 'og'), { recursive: true });
const photo = `data:image/jpeg;base64,${fs.readFileSync(path.join(dist, 'riley.jpg')).toString('base64')}`;
await Promise.all([
  ogImage({ name: SITE.name, photo, kicker: 'VICTORIA, BC', title: SITE.tagline.replace(' - ', ' — '), footer: 'Writing, work and projects' })
    .then((png) => fs.writeFileSync(path.join(dist, 'og', 'site.png'), png)),
  ...posts.map((p) => ogImage({ name: SITE.name, photo, kicker: String(p.category || 'Dispatch').toUpperCase(), title: p.title, footer: `${fmtDate(p.date)} · ${p.minutes} min read` })
    .then((png) => fs.writeFileSync(path.join(dist, 'og', `${p.slug}.png`), png))),
]);

// RSS feed so readers can follow new posts.
const rfc822 = (d) => new Date(d + 'T12:00:00Z').toUTCString();
fs.writeFileSync(path.join(dist, 'feed.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(SITE.name)}</title>
  <link>${SITE.url}/</link>
  <description>${esc(SITE.tagline)}</description>
  <language>en</language>
  <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map((p) => `  <item>
    <title>${esc(p.title)}</title>
    <link>${SITE.url}/posts/${p.slug}/</link>
    <guid>${SITE.url}/posts/${p.slug}/</guid>
    <pubDate>${rfc822(p.date)}</pubDate>
    <description>${esc(p.dek || p.title)}</description>
  </item>`).join('\n')}
</channel>
</rss>
`);

// Sitemap and robots.txt so search engines can find every page.
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE.url}${u.urlPath}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

console.log(`Built ${posts.length} post(s) and ${pageNames.length} page(s) into dist/`);
