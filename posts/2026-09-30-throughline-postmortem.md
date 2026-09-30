---
title: Throughline, the dashboard I built and then turned off
date: 2026-09-30
dek: I spent a few weeks building a personal command centre with Claude. It looked great, and it never quite worked. Here's why I shut it down.
category: Building
---

For a few weeks this September I built a personal dashboard called Throughline. The idea was simple. I wanted one screen, on my laptop and my phone, that showed my day: today's tasks, my calendar, my inbox, and a short note from Claude on what actually mattered. I wanted to tick things off right there, and I wanted it to get smarter week over week, with a Sunday review that looked back at what I'd finished, what kept slipping, and what I should change. The name came from that last part: I wanted the thread running through my weeks, more than a morning digest.

<figure><img src="../../throughline-week.webp" alt="Throughline Week view: counts of tasks completed and rolled over, Claude's notes on the week, and lists of completed tasks, rolled-over tasks, journal entries and events" width="1000" height="625" loading="lazy"><figcaption>The Week view, with Claude's look back at what got done, what kept slipping and what to change.</figcaption></figure>

I built it the way I build most things now, in conversation with [Claude](https://claude.ai). Throughline was a single web page hosted inside Claude, pulling live data from [Google Tasks](https://tasks.google.com), Gmail and Google Calendar through connectors, with a few scheduled Claude runs writing the "judgement" layer: a headline for the day, notes on individual tasks, a reading suggestion, and automatic tickets when one of my side projects failed to deploy. I spent more time on the design than I'd like to admit. It went through four visual directions before landing on a blueprint look, deep blue and paper white, with amber reserved for anything that needed attention right now. I still think it looked good.

<figure><img src="../../throughline-today.webp" alt="Throughline Today view: a blue left rail with Claude's note for the day and the calendar, a board of task lists, tasks done today, and primary inbox mail" width="1000" height="625" loading="lazy"><figcaption>The Today view in the blueprint design: Claude's note and calendar on the left, the task board, and the primary inbox.</figcaption></figure>

The trouble was that it never became something I could trust. Tasks were often out of date. Ticking things off in Throughline sometimes made tomorrow's repeating tasks show up early in Google Tasks. Subtasks landed in the wrong place. And it was expensive to run, because a Claude session woke up every hour to rebuild a briefing that mostly hadn't changed.

When I finally stepped back and asked Claude to assess the whole thing against what I'd set out to do, the answer was uncomfortable. For weeks the "live" part of the dashboard hadn't been live at all. The page was asking for a connector by the wrong name, every live request was quietly failing, and the page was falling back to the last snapshot the scheduled job had written. Nothing on screen said anything was wrong. It just looked slightly stale, which is the most dangerous kind of broken, because you keep using it.

Fixing that exposed the deeper problem. I wanted three things at once: to act from Throughline, to keep Google Tasks as the source of truth in case Throughline broke, and to see only today's tasks in both places. Google Tasks can't give you all three. Its repeating tasks only behave properly when you tick them in Google's own app. Tick them from anywhere else and the next occurrence appears immediately. Every workaround moved the source of truth somewhere I didn't want it, or asked me to change how I work to suit the tool.

Once I looked at it plainly, most of what I'd built was the commodity part. Showing tasks, syncing ticks, handling repeats: a task app does all of that better than a hand-built page, and does it without needing a fix every few days. The part only Claude could add, a thoughtful read on what matters today and an honest look back at the week, was the smallest and most reliable piece of the whole system. I'd built a fragile house around it.

So I turned it off. It's a strange feeling to delete something you put real care into, but it was the right call, and it's the same call I'd make at work. The product didn't meet the need it was built for, the fixes kept adding complexity, and the cost of maintaining it was higher than the value it gave back.

A few things I'm taking with me:

- Silent failure is worse than loud failure. If something breaks, the product should say so plainly rather than show old data that looks current.
- Know which part of a product is yours to build, and buy or reuse the rest.
- Build on foundations that can hold the weight. I spent a lot of effort working around the limits of a simple task app instead of asking early whether it was the right base.
- Step back sooner. The most useful conversation in the whole project was the one where I stopped asking how to fix Throughline and asked whether it should exist at all.

I don't regret building it. I learned more about connectors, scheduling and live data in these few weeks than I would have from reading about them. Sometimes the best outcome of an experiment is a clear reason to stop.
