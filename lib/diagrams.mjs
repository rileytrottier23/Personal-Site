// Draws post diagrams at build time, so a new diagram is a few lines of text instead of a committed image.
// Each diagrams/<name>.mjs file default-exports a tree built with the helpers below; the build writes it to
// dist/<name>.png. Same approach as the share image (lib/og.mjs): satori turns text into shapes, resvg renders PNG.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);
const font = (pkg, file) => fs.readFileSync(require.resolve(`@fontsource/${pkg}/files/${file}`));
const fonts = [
  ['Spectral', 'spectral', 'spectral-latin-400-normal.woff', 400, 'normal'],
  ['Spectral', 'spectral', 'spectral-latin-400-italic.woff', 400, 'italic'],
  ['Spectral', 'spectral', 'spectral-latin-600-normal.woff', 600, 'normal'],
  ['Spectral', 'spectral', 'spectral-latin-600-italic.woff', 600, 'italic'],
  ['Schibsted Grotesk', 'schibsted-grotesk', 'schibsted-grotesk-latin-400-normal.woff', 400, 'normal'],
  ['Schibsted Grotesk', 'schibsted-grotesk', 'schibsted-grotesk-latin-500-normal.woff', 500, 'normal'],
  ['Schibsted Grotesk', 'schibsted-grotesk', 'schibsted-grotesk-latin-600-normal.woff', 600, 'normal'],
].map(([name, pkg, file, weight, style]) => ({ name, data: font(pkg, file), weight, style }));

// Colours from DESIGN.md (light theme), plus the card surface used in the existing post images.
export const C = { ink: '#14171C', soft: '#565B63', blue: '#2452B0', paper: '#EDECE8', card: '#FAF9F6', line: '#D9D7D0', rule: '#C9C5B8' };
const SERIF = 'Spectral';
const SANS = 'Schibsted Grotesk';

// box(style, ...children): a flex div. Strings become text. Falsy children are dropped.
export const box = (style, ...kids) => {
  const children = kids.flat().filter((k) => k !== null && k !== undefined && k !== false);
  return { type: 'div', props: { style: { display: 'flex', ...style }, children: children.length === 1 ? children[0] : children } };
};
export const text = (style, s) => box(style, String(s));

// title: a string, or an array where [ ] items are blue italic, e.g. ['The upkeep behind ', ['three small apps']].
const titleParts = (t) => (Array.isArray(t) ? t : [t]).map((p) =>
  Array.isArray(p) ? { type: 'span', props: { style: { color: C.blue, fontStyle: 'italic' }, children: p[0] } } : p);

const label = (s) => text({ fontSize: 10, fontWeight: 600, letterSpacing: 1.4, color: '#777', textTransform: 'uppercase' }, s);

// frame: the shared card with kicker, headline, optional subtitle, body and byline footer.
export function frame({ kicker, title, sub }, ...body) {
  return box({ width: 1000, flexDirection: 'column', background: C.paper, color: C.ink, fontFamily: SANS },
    box({ height: 8, background: C.ink }),
    box({ flexDirection: 'column', padding: '44px 56px 0' },
      box({ justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 16, borderBottom: `1px solid ${C.ink}` },
        text({ fontWeight: 600, fontSize: 14, letterSpacing: 2.5, color: C.blue }, kicker.toUpperCase()),
        text({ fontFamily: SERIF, fontStyle: 'italic', fontSize: 15, color: C.soft }, 'Notes from rileytrottier.com')),
      { type: 'div', props: { style: { display: 'block', fontFamily: SERIF, fontWeight: 600, fontSize: 46, lineHeight: 1.15, marginTop: 26 }, children: titleParts(title) } },
      sub && text({ fontSize: 16, color: C.soft, marginTop: 8 }, sub),
      box({ marginTop: 22, height: 4, borderTop: `1px solid ${C.ink}`, borderBottom: `1px solid ${C.ink}` }),
      box({ flexDirection: 'column', marginTop: 22, gap: 24 }, body),
      box({ justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 26, borderTop: `1px solid ${C.ink}`, padding: '16px 0 30px' },
        box({ alignItems: 'center' },
          text({ fontFamily: SERIF, fontWeight: 600, fontSize: 15 }, 'Riley Trottier'),
          text({ fontSize: 13.5, color: C.soft, marginLeft: 8 }, '·  Senior Product Manager')),
        text({ fontSize: 13.5, color: C.soft }, 'rileytrottier.com'))));
}

// rows: a table of cards. cols = column labels; items = [{ name, values: [...] }].
export function rows(cols, items) {
  return box({ flexDirection: 'column', gap: 10 }, items.map((it) =>
    box({ background: C.card, border: `1px solid ${C.line}`, padding: '18px 20px', alignItems: 'flex-start' },
      text({ width: 172, flexShrink: 0, fontFamily: SERIF, fontWeight: 600, fontSize: 21, lineHeight: 1.2, paddingRight: 12 }, it.name),
      it.values.map((v, i) => box({ flexDirection: 'column', ...(i === it.values.length - 1 ? { flex: 1 } : { width: 330, flexShrink: 0 }), paddingRight: 16 },
        label(cols[i]), text({ fontSize: 14.5, lineHeight: 1.45, marginTop: 2 }, v))))));
}

// steps: numbered cards in a column joined by arrows. items = [{ title, body }]. loop: an optional note under the last step, e.g. "Repeats monthly".
export function steps(items, { loop } = {}) {
  const arrow = () => text({ justifyContent: 'center', fontSize: 20, color: C.soft, height: 26, alignItems: 'center' }, '↓');
  return box({ flexDirection: 'column' },
    items.map((it, i) => [
      i > 0 && arrow(),
      box({ background: C.card, border: `1px solid ${C.line}`, padding: '16px 20px', alignItems: 'flex-start' },
        text({ width: 34, height: 34, borderRadius: 17, background: C.ink, color: C.paper, fontSize: 15, fontWeight: 600, justifyContent: 'center', alignItems: 'center', marginRight: 18, flexShrink: 0 }, i + 1),
        box({ flexDirection: 'column', flex: 1 },
          text({ fontFamily: SERIF, fontWeight: 600, fontSize: 20, lineHeight: 1.25 }, it.title),
          it.body && text({ fontSize: 14.5, lineHeight: 1.45, color: C.soft, marginTop: 3 }, it.body))),
    ]),
    loop && text({ justifyContent: 'center', marginTop: 12, fontSize: 14, fontWeight: 600, color: C.blue, letterSpacing: 0.5 }, loop));
}

// compare: two columns side by side. sides = [{ title, tag, points: [...] }]; the side with pick: true is outlined in blue.
export function compare(sides, note) {
  return box({ flexDirection: 'column' },
    box({ gap: 16 }, sides.map((s) =>
      box({ flex: 1, flexDirection: 'column', background: C.card, border: s.pick ? `2px solid ${C.blue}` : `1px solid ${C.line}`, padding: '18px 20px' },
        s.tag && text({ fontSize: 10, fontWeight: 600, letterSpacing: 1.4, color: s.pick ? C.blue : '#777', textTransform: 'uppercase', marginBottom: 6 }, s.tag),
        text({ fontFamily: SERIF, fontWeight: 600, fontSize: 22, lineHeight: 1.2, marginBottom: 10 }, s.title),
        s.points.map((p) => box({ marginTop: 6, fontSize: 14.5, lineHeight: 1.45 },
          text({ width: 14, flexShrink: 0, color: C.soft }, '–'), text({ flex: 1 }, p)))))),
    note && text({ marginTop: 14, fontSize: 14.5, color: C.soft, fontStyle: 'italic', fontFamily: SERIF }, note));
}

// Renders a tree to PNG at 1.5x, matching the existing post images (1500px wide, shown at 1000).
export async function renderDiagram(tree) {
  const svg = await satori(tree, { width: 1000, fonts });
  const r = new Resvg(svg, { fitTo: { mode: 'zoom', value: 1.5 } }).render();
  return { png: r.asPng(), width: 1000, height: Math.round(r.height / 1.5) };
}
