---
version: alpha
name: Dispatches
description: The look of rileytrottier.com. A personal newspaper set in ink on paper, with one blue for links and labels.
colors:
  primary: "#14171C"
  secondary: "#565B63"
  tertiary: "#2452B0"
  neutral: "#EFEDE6"
  rule: "#C9C5B8"
  tint: "#E3E0D6"
  dark-primary: "#ECE9E0"
  dark-secondary: "#A3A8B0"
  dark-tertiary: "#8FB0F2"
  dark-neutral: "#14171C"
  dark-rule: "#343941"
  dark-tint: "#22262D"
typography:
  masthead:
    fontFamily: Spectral
    fontSize: 32px
    fontWeight: 600
    letterSpacing: -0.01em
  headline-lead:
    fontFamily: Spectral
    fontSize: 38px
    fontWeight: 600
    lineHeight: 1.18
  headline-page:
    fontFamily: Spectral
    fontSize: 30px
    fontWeight: 600
    letterSpacing: -0.01em
  headline-section:
    fontFamily: Spectral
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.25
  headline-entry:
    fontFamily: Spectral
    fontSize: 23px
    fontWeight: 600
    lineHeight: 1.3
  headline-sub:
    fontFamily: Spectral
    fontSize: 21px
    fontWeight: 600
  intro:
    fontFamily: Spectral
    fontSize: 21px
    fontWeight: 400
    lineHeight: 1.5
  dek:
    fontFamily: Spectral
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.5
  body-lg:
    fontFamily: Spectral
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Spectral
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Spectral
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
  drop-cap:
    fontFamily: Spectral
    fontSize: 56px
    fontWeight: 600
    lineHeight: 0.8
  label-nav:
    fontFamily: Schibsted Grotesk
    fontSize: 14px
    fontWeight: 400
  label-meta:
    fontFamily: Schibsted Grotesk
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  label-kicker:
    fontFamily: Schibsted Grotesk
    fontSize: 12px
    fontWeight: 600
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Schibsted Grotesk
    fontSize: 11px
    fontWeight: 600
    letterSpacing: 0.02em
  label-control:
    fontFamily: Schibsted Grotesk
    fontSize: 12px
    fontWeight: 500
    letterSpacing: 0.04em
spacing:
  column: 720px
  gutter: 24px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 36px
  xxl: 48px
  xxxl: 56px
  tap-target: 44px
rounded:
  none: 0px
  sm: 3px
  md: 4px
  full: 9999px
components:
  masthead-title:
    textColor: "{colors.primary}"
    typography: "{typography.masthead}"
  masthead-portrait:
    size: 76px
    rounded: "{rounded.full}"
  nav-link:
    textColor: "{colors.secondary}"
    typography: "{typography.label-nav}"
    height: 44px
  nav-link-active:
    textColor: "{colors.primary}"
  kicker:
    textColor: "{colors.tertiary}"
    typography: "{typography.label-kicker}"
  entry-title:
    textColor: "{colors.primary}"
    typography: "{typography.headline-entry}"
  entry-summary:
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
  article-body:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-lg}"
  article-link:
    textColor: "{colors.tertiary}"
  code-inline:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 1px
  code-block:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 16px
  figure-caption:
    textColor: "{colors.secondary}"
    typography: "{typography.label-meta}"
  pref-button:
    textColor: "{colors.secondary}"
    typography: "{typography.label-control}"
    rounded: "{rounded.full}"
    height: 32px
  pref-button-pressed:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
  colophon:
    textColor: "{colors.secondary}"
    typography: "{typography.label-meta}"
  reading-progress:
    backgroundColor: "{colors.tertiary}"
    height: 3px
  rule-hairline:
    backgroundColor: "{colors.rule}"
    height: 1px
  rule-heavy:
    backgroundColor: "{colors.primary}"
    height: 3px
  article-body-dark:
    backgroundColor: "{colors.dark-neutral}"
    textColor: "{colors.dark-primary}"
    typography: "{typography.body-lg}"
  entry-summary-dark:
    textColor: "{colors.dark-secondary}"
    typography: "{typography.body-sm}"
  article-link-dark:
    textColor: "{colors.dark-tertiary}"
  code-block-dark:
    backgroundColor: "{colors.dark-tint}"
    textColor: "{colors.dark-primary}"
    rounded: "{rounded.md}"
    padding: 16px
  rule-hairline-dark:
    backgroundColor: "{colors.dark-rule}"
    height: 1px
---

# Dispatches: rileytrottier.com

The source of truth for values is `src/styles.css`. This file explains them so an agent can extend the site without guessing. If the two disagree, the CSS wins; fix this file in the same change.

## Overview

The site is a one-person newspaper. The front page runs the newest post as the lead story, the rest as an index, and the whole thing sits between a heavy masthead rule and a heavy colophon rule. Readers are recruiters and other PMs, so it should feel credible, calm and easy to read, like a well-kept quarterly.

Everything is ink on paper. There is one colour that isn't ink or paper, a pressroom blue, and it only marks things you can follow or read as a label. The identity comes from the newspaper parts used for real jobs: a masthead, kickers over headlines, a drop cap on each post, rules between stories, captions under figures.

Light and dark themes both exist. Dark follows the reader's system setting unless they pick one with the Theme button. Motion is off by default and is an opt-in reader setting (see Motion below).

## Colors

The palette is two core colours plus one accent. Riley set that limit on purpose: no gradient washes, no extra hues.

- **Ink (#14171C):** headlines, body text, the masthead and colophon rules, the pressed state of reader controls.
- **Soft ink (#565B63):** secondary text: navigation, deks, bylines, summaries, captions. Passes AA on paper (5.8:1).
- **Press blue (#2452B0):** the only accent. Links inside articles, kickers and category labels, focus rings, the reading-progress bar, the "now" dot. 6.2:1 on paper.
- **Paper (#EFEDE6):** the page. A grey newsprint tone.
- **Rule (#C9C5B8):** hairlines between stories and around figures. Decorative only, never the only way something is shown.
- **Tint (#E3E0D6):** code backgrounds. The one fill the site uses.

Dark theme swaps each role one for one: paper becomes #14171C, ink becomes #ECE9E0, soft ink #A3A8B0, blue lifts to #8FB0F2, rule #343941, tint #22262D. Every text pairing still passes AA (ink 14.8:1, soft 7.5:1, blue 8.3:1). The portrait gets a slight grayscale and dim in dark mode so it doesn't glare.

## Typography

Two families with clear jobs:

- **Spectral** carries the paper: headlines, body, the drop cap. Weights 400 and 600, plus 400 italic for blockquotes. Nothing heavier than 600.
- **Schibsted Grotesk** carries the furniture: navigation, kickers, bylines, captions, dates, reader controls. Weights 400, 500, 600.

Riley chose this pair in Oct 2026 because they are rarely used on AI-built sites. Don't swap in Inter, Geist or another default sans.

Body text in posts is 18px Spectral at 1.7 line height, capped at 66 characters a line. Summaries and about text cap at 60 to 62 characters. The first paragraph of a post opens with a 56px drop cap; standalone pages turn it off.

Kickers and category labels are sentence case at a 0.02em track, in blue. The only uppercase on the site is the small term labels in project case studies (`.case dt`). Don't add more.

## Layout

One column, 720px wide, 24px side padding. No sidebar and no multi-column grid. The newspaper feeling comes from the rules and type, not from columns.

Vertical rhythm changes by section: intro 36px top / 32px bottom, lead story 48 / 40, index 44, about 48 / 56, article 36 / 56. Spacing inside a story is tighter (6 to 22px). Keep this contrast: big gaps between stories, small gaps inside them.

Navigation links are at least 44px tall for touch. At 600px and below the masthead stacks, the lead headline drops to 28px, and the project case-study grid collapses to one column.

## Elevation & Depth

The site is flat. No shadows anywhere. Hierarchy comes from rule weight and type size:

- 3px ink rule: the masthead bottom and the colophon top. Only these two.
- 2px ink underline: the active nav item.
- 1px rule colour: between stories, around figures, under the nav.
- 3px ink left border: blockquotes.

## Shapes

Square by default. Rounded corners appear only where the object is round in print or is a physical control: the circular portrait, the reader-setting pills, the status dot, and a 3 to 4px radius on code. Cards don't exist here, so there is nothing else to round.

## Components

- **Masthead:** portrait (76px circle, 64px on mobile), the name in 32px Spectral, the tagline "Senior Product Manager - building with artificial intelligence" in 13px Grotesk soft ink. 3px ink rule underneath.
- **Nav:** Grotesk 14px soft ink links; the current page is ink, 600 weight, with a 2px ink underline. Theme and Motion controls sit at the right end as outlined pills.
- **Lead story:** blue kicker, 38px headline (underline on hover), dek in soft ink, byline in small Grotesk.
- **Index entry:** whole row is the link. Blue 11px category, 23px headline, 15px summary, small footer line. Rule underneath.
- **Article:** drop cap, 18px body, blue links, figures with a 1px rule border and a Grotesk caption. Every post has at least one image, either a screenshot or a diagram Riley made.
- **"Now" strip:** a small blue label with a pulsing dot showing what Riley is working on now. The dot is the only looping animation on the site, because it marks a live state. It stops under reduced motion.
- **Colophon:** centred Grotesk 13px soft ink between a 3px ink rule and the page end.

## Motion

Two layers:

1. **Always on, and tiny:** a 0.18s cross-fade between pages, the reading-progress bar (scroll-linked, hidden where unsupported), the "now" dot pulse.
2. **Motion mode (opt-in):** printing-press metaphors. Rules draw across, headlines set in word by word, the kicker tightens from wide tracking, figures print top to bottom behind a blue scan line, link underlines draw like a pen, pages turn instead of fading.

Motion mode only runs when the reader turns it on and `prefers-reduced-motion` is `no-preference`. Reduced motion also turns off the progress bar, the pulse and page transitions. New motion belongs in motion mode, uses the press metaphor, and never runs without the reader asking for it.

## Do's and Don'ts

- Do keep blue as the only accent, and only on things that are links, labels or focus.
- Do add new colours as a light/dark pair and check both themes reach 4.5:1 for text.
- Do use real newspaper parts (kicker, dek, byline, caption, rule) only when the content is that thing.
- Do give every image a width and height, and a caption that says what it shows.
- Don't add gradients, shadows, glass, glow or cards.
- Don't add a third typeface or weights above 600.
- Don't add all-caps labels, eyebrow badges, emoji, or arrows on links.
- Don't add autoplaying or looping motion outside motion mode. The "now" dot is the one exception.
- Don't turn the single column into a grid or bento layout.
