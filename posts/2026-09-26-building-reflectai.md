---
title: Building ReflectAI, an AI Journaling App
date: 2026-09-26
dek: A daily journal where Claude writes monthly and yearly reports. The AI reports took one rewrite of the instructions; privacy, sign-in and testing took much longer.
category: Building
app_published: June 2025
---

ReflectAI was the second app I built. You write one journal entry a day, rate how happy you felt from 1 to 10, and at the end of each month Claude writes you a report on the patterns in what you wrote. I started it in June 2025, a month after [OnePage](../onepage-lessons/), and it's the project I've kept coming back to ever since. It's open for sign-ups and free to use, on the web for now. Under the hood it's React and Express with a Postgres database, and Claude writes the reports.

<figure><img src="../../reflectai-journal.webp" alt="ReflectAI journal page: a calendar marking days with entries, a 1 to 10 mood slider, and an empty box for today's entry" width="1000" height="440" loading="lazy"><figcaption>The ReflectAI journal page: pick a day, rate how you felt, and write your entry.</figcaption></figure>

The first version of the reports was disappointing. They read like a wellness poster: drink water, get some sleep, practice gratitude. Nothing in them showed that the AI had read my entries at all. Fixing that had very little to do with code. I rewrote the instructions I gave the model so it would point to specific entries, name the patterns it saw, be kind but direct about them and suggest a next step. I also had it return the report as structured data instead of free text, so the app checks the shape of what comes back before it shows anything. The reports got much better. I think the instructions are most of the product in a feature like this, and writing them is close to the product work I already do.

A journal is about the most personal data a person has, so privacy took a lot of my time. Checking who someone is at login isn't enough. Every time the app reads or saves an entry, it confirms the entry belongs to the person asking, at the storage layer, so knowing an entry's ID or date never gets you into someone else's journal. The database also allows only one entry per person per day, so that rule doesn't depend on the app remembering it.

A journal entry is also untrusted input to the AI. Someone could write "ignore your instructions" in their own journal, and the model shouldn't obey it. So entries are wrapped in tags before they go to the model, the model is told to ignore any instructions inside them, and the response is parsed as data rather than trusted as text. I didn't know to do any of this when I started.

Logins were the part I underestimated most. I built my own sign-in system first, with accounts, passwords and sessions, and spent a lot of time fixing bugs in it. One stubborn bug showed people the wrong screen after they logged out, because the browser, the app's page rules and the server each had their own idea of who was signed in. Eventually I moved to [Clerk](https://clerk.com), a service built for sign-in, and most of those problems went away. The tricky part was the switch itself. Every entry and report was already tied to an account in my database, so I matched each Clerk sign-in to an existing account by email instead of rebuilding everything.

Clerk wasn't the end of it, though. Its sign-in screens made the app look bad, and I couldn't fix that without leaving Clerk. So I switched again, to [Better Auth](https://www.better-auth.com), an open-source sign-in library that runs inside my own app and let me design those screens to match the rest of ReflectAI. The email matching I'd set up for Clerk carried over, so people kept their entries. It now has email verification, password reset and optional Google sign-in.

I also learned to make changes in smaller steps. At one point I added a batch of security improvements all at once, and some of them broke the live app. I rolled everything back the next day. A few weeks later I added a smaller, more focused set of changes, and that time it worked.

For a while, new people couldn't sign up at all. It looked like a sign-up bug, but the tool connecting my app to its database crashed whenever a search came back empty, and for a brand-new user almost every search comes back empty. That one took a while to find.

Over time ReflectAI changed from a daily journal with an AI button into a record you can look back on. Reports are saved now, and there's a yearly report as well as the monthly one. I also pulled out the piece that lets Claude read and write journal entries and published it as its own project, [journal-mcp-server](https://github.com/rileytrottier23/journal-mcp-server), with proper OAuth sign-in so it works as a Claude connector. I can ask Claude about my own journal now: search past entries for a topic, pull up a specific day, or summarize my happiness scores over a date range. Each of those is a separate tool with a narrow job. That server is also where I'm building an evaluation suite, a set of test cases that measure whether an agent uses those tools correctly.

I built the early versions on Replit. In September 2026 I moved ReflectAI and my other apps to [Railway](https://railway.com), and I now do most of the development in Claude Code, with GitHub as the record of every change. ReflectAI runs today at [reflectai.net](https://reflectai.net).

---

Try ReflectAI: [reflectai.net](https://reflectai.net) · [code on GitHub](https://github.com/rileytrottier23/ReflectAI)
