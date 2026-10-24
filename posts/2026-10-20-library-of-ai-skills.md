---
title: Building an AI Skills Library
date: 2026-10-20
dek: Turning repeated AI instructions into versioned skill files, split across git repos, so a fix made once carries over to every task after it.
category: Product
---

A skill is a short instruction file an AI assistant loads when a task calls for it. I started writing them because I was typing the same instructions over and over: how to structure a feature spec, how to turn a business rule into a decision table, how to review a draft before it goes to leadership. Every new chat started from zero.

For work I now have about 45 skills across two git repos, plus 8 reviewer agents that each read a document from one point of view.

<figure><img src="../../skills-loop.webp" alt="A loop: a task keeps coming back, I write the steps down as a skill, version it in git, use it, and a monthly review of my AI sessions suggests fixes that feed back into the skill" width="1000" height="1072" loading="lazy"><figcaption>How a skill gets built and improved.</figcaption></figure>

I version the skills the way I'd version code. Each repo has a version number, and every change bumps it. That's how I can tell which version of a skill produced a given output. When something goes wrong, I look at the history and see what changed.

The two work repos split by audience. One holds skills my wider team could use, like release process and quality checklists. The other holds skills that only make sense for me, so I can share the first without handing over my personal shortcuts.

I also keep people out of the files. No colleague or customer names go into a skill, because skills get shared and copied and names travel with them. I write role names instead, like "the UX designer", and a check blocks the commit if a real name slips in.

<figure><img src="../../skills-two-repos.webp" alt="Two repos side by side. The team repo holds shareable skills like release process and quality checklists. The personal repo holds my own shortcuts. A name check sits in front of both and blocks any commit with a real name in it" width="1000" height="742" loading="lazy"><figcaption>Two repos, split by who can use them, with one check in front of both.</figcaption></figure>

My skills from outside work are public on GitHub, split into three repos by topic: [product](https://github.com/rileytrottier23/Riley-PM-Skills), [coding](https://github.com/rileytrottier23/Riley-Coding-Skills) and [thinking](https://github.com/rileytrottier23/riley-thinking-skills), with a [hub](https://github.com/rileytrottier23/Riley-Claude-Skills) that installs all of them at once. Some are mine and some are other people's, kept in separate folders with their original licenses. Anything specific to my day job stays private. One of the skills handles publishing: when I write or change a skill, it decides which repo it belongs in and updates that repo's README, install file and changelog, so I don't do that by hand.

The work itself tells me what to build. Once a month, a scheduled job reads my past month of AI sessions and suggests skills to add or fix. The first time it ran, it found corrections I'd made mid-conversation that never reached the skill files. I'd said "do it this way next time", the assistant agreed, and nothing was saved. Those get caught now, and I also have a skill that saves a lesson the moment I say "don't make that mistake again".

One example: drafts from my writing-cleanup skill still sounded like AI, so in October I rebuilt it around a public list of AI writing patterns plus a profile of how I actually write, taken from my own emails and older LinkedIn posts, and checked it against my own site. It's [on GitHub](https://github.com/rileytrottier23/riley-thinking-skills/tree/main/mine/avoid-ai-writing) now, and every post here has been through it since.

Not every task needs a skill. A good one-off prompt is fine for something you'll do once. A skill is worth writing when a task keeps coming back and the output depends on following particular steps.

<figure><img src="../../skills-prompt-or-skill.webp" alt="A two-question decision guide. If the task keeps coming back and the output depends on following particular steps, write a skill. Otherwise a one-off prompt is fine" width="1000" height="738" loading="lazy"><figcaption>Two questions I ask before writing a new skill.</figcaption></figure>

When I fix my spec-writing skill, every spec after that gets better. Before, a good prompt disappeared into chat history the day I wrote it.

If you've built up your own set of skills, I'd love to hear which ones you use most.

*Views are my own and don't represent Workday.*
