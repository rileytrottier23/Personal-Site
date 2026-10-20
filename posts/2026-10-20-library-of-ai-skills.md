---
title: I turned my PM job into a library of AI skills
date: 2026-10-20
dek: I kept typing the same instructions into my AI assistant. Now they live in versioned files, and every fix sticks.
category: Product
---

For a while I was typing the same instructions into my AI assistant over and over. How to structure a feature spec. How to turn a business rule into a decision table. How to review a draft before it goes to leadership. Every new chat started from zero.

So I started writing those instructions down as skills. A skill is a short instruction file the assistant loads when a task calls for it. I now have about 45 of them across two git repos, plus 8 reviewer agents that each read a document from one point of view.

<figure><img src="../../skills-loop.webp" alt="A loop: a task keeps coming back, I write the steps down as a skill, version it in git, use it, and a monthly review of my AI sessions suggests fixes that feed back into the skill" width="1000" height="1072" loading="lazy"><figcaption>How a skill gets built and improved.</figcaption></figure>

I version the skills the way I'd version code. Each repo has a version number, and every change bumps it. That's how I can tell which version of a skill produced a given output. When something goes wrong, I look at the history and see what changed.

The two repos split by audience. One holds skills my wider team could use, like release process and quality checklists. The other holds skills that only make sense for me. That way I can share the first without handing over my personal shortcuts.

I also keep people out of the files. No colleague or customer names go into a skill, because skills get shared and copied and names travel with them. I write role names instead, like "the UX designer", and a check blocks the commit if a real name slips in.

<figure><img src="../../skills-two-repos.webp" alt="Two repos side by side. The team repo holds shareable skills like release process and quality checklists. The personal repo holds my own shortcuts. A name check sits in front of both and blocks any commit with a real name in it" width="1000" height="742" loading="lazy"><figcaption>Two repos, split by who can use them, with one check in front of both.</figcaption></figure>

The part I'd recommend most is letting the work tell you what to build. Once a month, a scheduled job reads my past month of AI sessions and suggests skills to add or fix. The first time it ran, it found corrections I'd made mid-conversation that never reached the skill files. I'd said "do it this way next time", the assistant agreed, and nothing was saved. Those corrections get caught now.

Not every task needs a skill. A good one-off prompt is fine for something you'll do once. A skill is worth writing when a task keeps coming back and the output depends on following particular steps.

<figure><img src="../../skills-prompt-or-skill.webp" alt="A two-question decision guide. If the task keeps coming back and the output depends on following particular steps, write a skill. Otherwise a one-off prompt is fine" width="1000" height="738" loading="lazy"><figcaption>Two questions I ask before writing a new skill.</figcaption></figure>

The best part of this setup is that improvements stick. When I fix my spec-writing skill, every spec after that gets better. Before, a good prompt disappeared into chat history the day I wrote it.

If you've built up your own set of skills, I'd love to hear which ones you use most.

*Views are my own and don't represent Workday.*
