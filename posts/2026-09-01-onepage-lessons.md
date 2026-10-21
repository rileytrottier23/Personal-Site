---
title: OnePage, the task app I built to see if I could
date: 2026-09-01
dek: My first app took two weeks on Replit in May 2025. Keeping it running taught me just as much.
category: Building
app_published: May 2025
---

OnePage was the first thing I built with AI. It's a task manager where everything sits on one screen, with a Today section at the top for what needs doing now, and I started it on [Replit](https://replit.com) in May 2025. I'm a Senior Product Manager and I had never shipped software myself. I understood agentic AI at a product level, and I wanted to find out whether that was enough to actually build and ship something. Replit made it possible to try.

The first version came together in about two weeks. Going back through the commit history, repeating tasks came first, on day one, with rules for daily, weekly, monthly and quarterly. Then a landing page, a sidebar that remembers if you collapsed it, and an archive where finished tasks go so you can look back at them later. Drag and drop and indenting subtasks with the Tab key came a few days later. The AI part, a monthly report from Claude on what you got done, was the last thing I added, on May 21.

I had to look up a lot that a developer would take for granted: how a frontend talks to a backend, what a database migration is, why the app worked in one session and broke in the next. OnePage ended up as React on the front, Express on the back and a Postgres database. I was running into most of it for the first time, and I usually learned the code by getting it wrong first.

The decisions themselves were mostly product decisions, and I already knew how to make those. What counts as "done" for a task, how forgiving the input box should be when someone types something ambiguous, whether a finished task should disappear right away or stay on screen until tomorrow (I went with tomorrow). You can also paste a block of text and get one task per line.

Asking a tool to explain something I suspected I should already understand was uncomfortable. I had to get over that quickly or I wasn't going to finish anything.

<figure><img src="../../onepage-home.webp" alt="OnePage home page with the headline The simplest way to manage your tasks and three features: everything in one view, repeating tasks and smart archiving" width="1000" height="449" loading="lazy"><figcaption>The OnePage home page as it runs today on Railway.</figcaption></figure>

Then I mostly left it alone for a year. When I came back to it in 2026, most of the work was keeping it running. In June I found that tasks could break when the AI service was down, so I made the app handle outages and saved the reports so they don't disappear. Getting code from Replit into GitHub took a run of fixes in June and August, including pushes that raced each other and a sync token that expired without telling anyone. In September I moved OnePage off Replit onto [Railway](https://railway.com) with my other projects, replaced my own login code with Clerk and changed the database driver. Tests now run on every push.

OnePage is still running. It isn't polished, and I don't think it needs to be. It's the first time I went from having opinions about AI products to building one, and the projects after it, including [ReflectAI](../building-reflectai/), have been easier because of it.

If you're a PM thinking about building something, start smaller than you think you need to. I'd love to hear what other PMs are building on the side.

---

Try OnePage: [live app](https://onepage-production-a1c7.up.railway.app) · [code on GitHub](https://github.com/rileytrottier23/OnePage)
