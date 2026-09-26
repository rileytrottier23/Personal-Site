---
title: How I built ReflectAI, an AI journaling app
date: 2026-09-26
dek: My second AI project taught me that the hardest parts of an AI app often have nothing to do with the AI.
category: Building
app_published: June 2025
---

ReflectAI was the second app I built. The idea is simple: you write one journal entry a day, rate how happy you felt from 1 to 10, and at the end of each month an AI writes you a report on the patterns in what you wrote. I started it in June 2025, a month after [OnePage](../onepage-lessons/), and it's the project I've kept coming back to ever since.

The first version of the reports was disappointing. They read like a wellness poster: drink water, get some sleep, practice gratitude. Nothing in them showed that the AI had read my entries at all. Fixing that had very little to do with code. I rewrote the instructions I gave the model so it would point to specific things I'd written, name the patterns it saw, and be kind but direct about them. The reports got much better, and I learned that with an AI feature, the instructions you give the model are the product. Writing them is product work, and I was already good at that.

A journal is about the most personal data a person has, so I spent more time than I expected on keeping it private. Early on I learned that checking who someone is at login isn't enough. Every time the app reads or saves an entry, it has to confirm the entry belongs to the person asking. I also learned that a journal entry is untrusted input to the AI. Someone could write "ignore your instructions" in their own journal, and the model shouldn't obey it. None of this was obvious to me at the start.

Logins were the part I underestimated most. I built my own sign-in system first, with accounts, passwords and sessions, and spent a lot of time fixing bugs in it. One stubborn bug showed people the wrong screen after they logged out, because the browser, the app's page rules and the server each had their own idea of who was signed in. Eventually I moved to [Clerk](https://clerk.com), a service built for sign-in, and most of those problems went away. The tricky part was the switch itself. Every entry and report was already tied to an account in my database, so I matched each Clerk sign-in to an existing account by email instead of rebuilding everything. Clerk wasn't the end of it, though. Its sign-in screens made the app look bad, and I couldn't fix that without leaving Clerk. So I switched again, to [Better Auth](https://www.better-auth.com), an open-source sign-in library that runs inside my own app and let me design those screens to match the rest of ReflectAI. The email matching I'd set up for Clerk carried over, so people kept their entries. Sign-in isn't what ReflectAI is about, but it's the first screen every person sees, so it has to feel like part of the product.

I also learned to make changes in smaller steps. At one point I added a batch of security improvements all at once, and some of them broke the live app. I rolled everything back the next day. A few weeks later I added a smaller, more focused set of changes, and that time it worked. It's the same advice I'd give any team, and I had to learn it for myself before it really stuck.

Some bugs didn't look like what they were. For a while, new people couldn't sign up at all. It turned out that the tool connecting my app to its database crashed whenever a search came back empty, and for a brand-new user, almost every search comes back empty. What looked like a sign-up bug was really a problem underneath the app. Finding it took patience more than skill.

Over time ReflectAI changed from a daily journal with an AI button into a record you can look back on. Reports are saved now, and there's a yearly report as well as the monthly one. It runs today at [reflectai.net](https://reflectai.net), on [Railway](https://railway.com) alongside my other projects.

Most of the hard work had little to do with AI. The model did its job once I told it clearly what the job was. The rest was privacy, sign-in, testing and patience, which is most of what makes any product trustworthy. As a product manager, I'm glad I learned that by doing it myself.

---

Try ReflectAI: [reflectai.net](https://reflectai.net) · [code on GitHub](https://github.com/rileytrottier23/ReflectAI)
