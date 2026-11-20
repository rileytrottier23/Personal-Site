// Runs after build.mjs: draws each diagrams/<name>.mjs to dist/<name>.png (see lib/diagrams.mjs).
// Files starting with _ are skipped. Prints each size for the post's <img> tag.
import fs from 'node:fs';
import path from 'node:path';
import { renderDiagram } from './diagrams.mjs';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const dir = path.join(root, 'diagrams');
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.mjs') && !f.startsWith('_')).sort() : [];
for (const f of files) {
  const { default: tree } = await import(path.join(dir, f));
  const { png, width, height } = await renderDiagram(tree);
  const name = f.replace(/\.mjs$/, '.png');
  fs.writeFileSync(path.join(root, 'dist', name), png);
  console.log(`Diagram ${name}: width="${width}" height="${height}"`);
}
console.log(`Drew ${files.length} diagram(s)`);
