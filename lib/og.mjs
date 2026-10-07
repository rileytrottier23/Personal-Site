// Draws the share image (the preview card shown when a page is linked on LinkedIn, Slack, etc.).
// Text is turned into shapes with satori, then rendered to PNG with resvg, so no system fonts are needed.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);
const font = (pkg, file) => fs.readFileSync(require.resolve(`@fontsource/${pkg}/files/${file}`));
const fonts = [
  { name: 'Newsreader', data: font('newsreader', 'newsreader-latin-600-normal.woff'), weight: 600, style: 'normal' },
  { name: 'Newsreader', data: font('newsreader', 'newsreader-latin-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'Inter', data: font('inter', 'inter-latin-500-normal.woff'), weight: 500, style: 'normal' },
  { name: 'Inter', data: font('inter', 'inter-latin-600-normal.woff'), weight: 600, style: 'normal' },
];

const el = (style, children) => ({ type: 'div', props: { style: { display: 'flex', ...style }, children } });

export async function ogImage({ title, kicker, footer, name, photo }) {
  const size = title.length > 70 ? 54 : title.length > 45 ? 64 : 76;
  const tree = el(
    { width: 1200, height: 630, flexDirection: 'column', background: '#EFEDE6', color: '#14171C', padding: '56px 72px', fontFamily: 'Inter' },
    [
      el({ alignItems: 'center', borderBottom: '5px solid #14171C', paddingBottom: 26 }, [
        photo
          ? { type: 'img', props: { src: photo, width: 76, height: 76, style: { borderRadius: 38, objectFit: 'cover', marginRight: 22 } } }
          : null,
        el({ fontFamily: 'Newsreader', fontWeight: 600, fontSize: 40 }, name),
      ].filter(Boolean)),
      el({ flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }, [
        el({ color: '#2452B0', fontWeight: 600, fontSize: 22, letterSpacing: 2, marginBottom: 22 }, kicker),
        el({ fontFamily: 'Newsreader', fontWeight: 600, fontSize: size, lineHeight: 1.12, letterSpacing: -1 }, title),
      ]),
      el({ borderTop: '1px solid #C9C5B8', paddingTop: 22, fontSize: 22, fontWeight: 500, color: '#565B63', justifyContent: 'space-between' }, [
        el({}, footer),
        el({ color: '#14171C', fontWeight: 600 }, 'rileytrottier.com'),
      ]),
    ],
  );
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  return new Resvg(svg).render().asPng();
}
