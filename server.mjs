// Minimal static file server for dist/ (used by Railway).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain' };
const port = process.env.PORT || 3000;
// Baseline security headers sent with every response.
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "frame-ancestors 'none'; object-src 'none'; base-uri 'self'",
  'Strict-Transport-Security': 'max-age=31536000',
};

http.createServer((req, res) => {
  for (const [name, value] of Object.entries(securityHeaders)) res.setHeader(name, value);
  // Send the old Railway address and www to the main domain so search engines see one site.
  const host = String(req.headers.host || '').toLowerCase().split(':')[0];
  if (host.endsWith('.up.railway.app') || host === 'www.rileytrottier.com') {
    res.writeHead(301, { Location: 'https://rileytrottier.com' + req.url }).end();
    return;
  }
  // A malformed URL (e.g. a stray "%") must not throw: an uncaught error here
  // would crash the whole server.
  let p;
  try {
    p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Bad request');
    return;
  }
  let file = path.normalize(path.join(root, p));
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!p.endsWith('/')) { res.writeHead(301, { Location: p + '/' }).end(); return; }
    file = path.join(file, 'index.html');
  }
  if (!fs.existsSync(file)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end('<p style="font-family:Georgia,serif;padding:48px">Page not found. <a href="/">Back to the front page</a>.</p>');
    return;
  }
  const ext = path.extname(file);
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400' });
  fs.createReadStream(file).pipe(res);
}).listen(port, '0.0.0.0', () => console.log(`Serving dist/ on port ${port}`));
