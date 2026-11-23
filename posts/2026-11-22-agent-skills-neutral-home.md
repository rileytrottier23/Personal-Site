---
title: Agent Skills Moves to a Neutral Home
date: 2026-11-22
dek: Anthropic handed the Agent Skills standard to the Agentic AI Foundation. What that changes, and what it leaves alone, for a public library of 65 skills.
category: Product
draft: true
---

The world of AI changes quickly. Many of the skills, best practices and technologies are out of date a few months after they are released. And without a lot of formal regulations, builders and users are vulnerable to sudden changes they may not understand. It's important to not just build your own stack and constantly stress test it, but to keep an eye on what is happening in the larger AI community.

On October 22, Anthropic gave the Agent Skills standard to the Agentic AI Foundation, a group that runs under the Linux Foundation. Anthropic co-founded the foundation last year with Block and OpenAI, and it already looks after the Model Context Protocol (MCP), which Anthropic handed over when the foundation launched in December 2025.

Agent Skills is the format behind the skills I [wrote about in October](https://rileytrottier.com/posts/library-of-ai-skills/). A skill is a folder with a SKILL.md file in it, plus any scripts or reference files it needs. The assistant reads the short description at the top of the file and loads the rest when a task matches it, so it can carry a lot of skills without loading them all up front.

The format started inside Claude Code. Anthropic launched skills in October 2025, developers published thousands of them on GitHub within weeks, and people wrote loaders so tools like Codex, Cursor and OpenCode could use them too. Anthropic then published Agent Skills as an open standard in December 2025. Since then more than 70 agent platforms have added support, including ChatGPT, Cursor, GitHub Copilot and VS Code. Anthropic says about a million skills have been published and nearly 280 million installed.

## What moved, and what didn't

Three things moved to the foundation:

1. The Agent Skills name and logo
2. The GitHub organization where the spec lives
3. The agentskills.io domain

Engineers from Anthropic, Google, OpenAI and other companies will maintain the spec as individuals, with two lead maintainers, David Soria Parra and Mahesh Murag. You don't have to join the foundation to use the standard or contribute to it.

Agent Skills wasn't the only handover that day. The foundation announced four new projects at once: Agent Skills from Anthropic, Open Responses from OpenAI, OpenEnv from Hugging Face and OpenSandbox from Alibaba. They join MCP, Block's goose, OpenAI's AGENTS.md and a few others. So the pieces most agents now share, MCP for tools, AGENTS.md for repo instructions and skills for packaged know-how, all sit with the same group.

<figure><img src="../../skills-neutral-home.png" alt="Two columns. What moved to the Agentic AI Foundation: the Agent Skills name and logo, the GitHub organization where the spec lives, and the agentskills.io domain. What stays the same: a skill is still a folder with a SKILL.md file, the spec is still published at agentskills.io, there's no need to join the foundation to use it, and nothing in my three repos needs editing" width="1000" height="545" loading="lazy"><figcaption>What changed hands, and what didn't.</figcaption></figure>

## My library

Outside of work I keep a public skills library on GitHub. It's split into three repos by topic:

- riley-pm-skills (16 skills)
- riley-coding-skills (27)
- riley-thinking-skills (22)

A fourth repo, Riley-Claude-Skills, is a hub that installs all three as one plugin marketplace. Each repo has a mine/ folder for skills I wrote and a vendored/ folder for skills other people wrote, pinned to the exact upstream commit I copied and kept under its original license. Most of the 65 are vendored. I wrote 17 of them.

One of mine, publish-skill-to-github, shows how plain the format is. When I say "push this skill", it works out which of the three repos a new skill belongs in, files it under mine/ or vendored/, and updates that repo's README, marketplace and changelog. The whole thing is a markdown file with instructions. There's no SDK or build step involved.

For a library like this, day to day, nothing changes. The file format is the same, the spec is still at agentskills.io and none of my repos need editing. I use the skills in Claude Code, Cowork and Claude Projects, and they keep working there.

## The proposed roadmap

Where the format goes next is now up to the project and its community. Anthropic proposed starting with a roadmap of three items, and each one lands somewhere in my repos:

1. **Versioned releases of the spec.** My repos already keep a changelog for every skill change. Once the format has version numbers too, a skill could say which version it was written for.
2. **A formal proposal process.** Anthropic has asked for feedback on proposed spec changes on GitHub and in the project's Discord. With a formal process, a change to how skills load should be visible well before it reaches my setup.
3. **Security guidance for people who write and install skills.** A skill can include scripts, so installing one means running someone else's instructions with the assistant's access.

<figure><img src="../../skills-roadmap.png" alt="The three proposed roadmap items mapped to my library. Versioned spec releases: each repo already keeps a changelog of skill changes, and the format would get versions too. A formal proposal process: a change to how skills load would be visible before it reaches my setup. Security guidance: applies first to the vendored folder, the skills other people wrote, pinned to an upstream commit" width="1000" height="689" loading="lazy"><figcaption>Where each roadmap item meets my repos.</figcaption></figure>

The third item is where vendored/ comes in. Most of my library came from other authors: the superpowers collection for coding work and Dean Peters' and Gene Dai's PM skills, among others. Even my own AI-writing skill is built on blader's humanizer. I could pull all of those in because everyone writes to the same format. Pinning each one to a commit means an upstream change never reaches my setup until I copy it on purpose.

My [monthly security scan](https://rileytrottier.com/posts/running-my-own-apps/) covers my three apps, and the skills repos aren't part of it. Shared guidance on what to check in a skill before installing it would fill that gap.

MCP is the other half of my setup. My journal MCP server, pulled out of ReflectAI, uses it. Both standards now sit with the same group, and Anthropic says that, as with MCP, the skills project will put community input and open decision-making first.

For now, nothing in my setup needs to change. But Agent Skills is a large part of how I and many others build with AI. And without proper government regulation (or even with it) new institutions, norms and controls will naturally emerge from Anthropic, OpenAI and the broader community. It's hard to stay on top of everything happening, but it's critical to stay on top of industry standards, and know who is setting them.

*Views are my own and don't represent Workday.*
