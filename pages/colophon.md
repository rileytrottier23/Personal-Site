---
title: How this site is built
kicker: Colophon
dek: A small static site, built in conversation with Claude. Markdown goes in, plain HTML comes out.
description: How Riley Trottier's personal site is built - a static site made with Claude, Markdown, a short Node build script and Railway.
---

I built this site the same way I build my other projects: by describing what I want to [Claude](https://claude.ai) and making the product and design decisions myself. Claude wrote the code. I chose the newspaper look and decided what belongs on each page.

## How it works

- **Markdown in, HTML out:** each post is a Markdown file. One short Node script turns the posts and pages into plain HTML. There's no framework and no database.
- **Almost no JavaScript:** the pages are static HTML and CSS. The only script on the site loads my latest GitHub activity on the front page.
- **Share images made at build time:** the preview card you see when a post is linked on LinkedIn is drawn by the build script from the post's title, in the same fonts as the site.
- **Light and dark:** the site follows your device's light or dark setting.
- **Small details in CSS:** the reading-progress bar on posts and the fade between pages are a few lines of CSS, and they switch off if your device asks for reduced motion.
- **Built for search:** every page has a canonical address, a sitemap entry and structured data that tells search engines who the site is about. There's an [RSS feed](../feed.xml) too.

## What it runs on

- **Type:** [Newsreader](https://fonts.google.com/specimen/Newsreader) for reading and [Inter](https://fonts.google.com/specimen/Inter) for labels.
- **Hosting:** [Railway](https://railway.com), which rebuilds the site every time a change is pushed to GitHub.
- **Domain:** registered and managed on [Cloudflare](https://www.cloudflare.com).
- **Code:** public on [GitHub](https://github.com/rileytrottier23/Personal-Site).

## Why so simple

A personal site should be fast, easy to change and hard to break. I learned that the hard way with [Throughline](../posts/throughline-postmortem/), a dashboard I built and then turned off because it needed a fix every few days. This site is the opposite: publishing a post means adding one file.
