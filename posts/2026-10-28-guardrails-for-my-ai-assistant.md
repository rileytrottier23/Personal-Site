---
title: Guardrails for an AI Assistant
date: 2026-10-28
dek: Five rules that keep an AI assistant from doing something slightly wrong under my name, and how each one is enforced.
category: Product
---

I use an AI assistant for real work. The mistake I worry about is a small one, made quietly, under my name. So I set five rules for it.

<figure><img src="../../guardrails-five-rules.webp" alt="Five guardrails, each with the risk it covers and how it is enforced: a writing check before anything is sent, placeholders instead of invented numbers, drafts only for anything shared, a review panel for important documents, and corrections that become rules only with my sign-off" width="1000" height="1085" loading="lazy"><figcaption>The five rules, what each one protects against, and how it's enforced.</figcaption></figure>

The first is a writing check. A hook stops the assistant from sending an email or chat message until the text has been through a pass that strips out AI writing habits, like stacked buzzwords and em dashes in every sentence. Messages to myself are exempt. I've had the same problem on my own projects. Claude drafted a LinkedIn intro for one of my posts that read like AI wrote it, and I rewrote most of it before posting. Now the same check runs on everything I publish, before I even see the draft.

The second is no invented numbers. If data is missing, the assistant writes a placeholder that says what's missing and where to get it. In my drafts that shows up as a bracketed note starting with NEED, so a gap is obvious when I read through. It never fills the gap with a number that just looks right. A made-up baseline that seems plausible is worse than an obvious hole, because nobody goes looking for it. It's the same reason I [let plain code do the math](https://rileytrottier.com/posts/probabilistic-planner-deterministic-executor/) in the products I work on.

Third, anything shared stays a draft. The assistant can draft tickets, documents and calendar changes, but it doesn't create or change them until I've said yes to that specific change. A yes to one change doesn't count for the next one. My blog works the same way - Claude gets each post ready, but nothing goes live until I say yes.

Fourth, important documents go past a review panel. For anything headed to leadership or an engineering handoff, I run a set of [reviewer agents](https://rileytrottier.com/posts/library-of-ai-skills/). Each one reads the draft the way a different reader would: an executive with five minutes, a skeptical engineer, a customer, an auditor, and someone arguing the other side. Their output is a list of questions I'd otherwise hear for the first time in the meeting. None of them can approve anything.

<figure><img src="../../guardrails-review-panel.webp" alt="A draft in the middle with five reviewers around it: an executive with five minutes, a skeptical engineer, a customer, an auditor and someone arguing the other side. Their output is a list of questions, not an approval" width="1000" height="785" loading="lazy"><figcaption>The review panel. It produces questions, not approvals.</figcaption></figure>

I use the same idea outside work. Before I turned on a monthly security scan for my own apps, I had a second agent review the plan, and it caught two things I'd missed.

Last, corrections become rules, with my sign-off. When I correct the assistant, it proposes a one-line change to its standing rules and waits for my yes. Rules don't change behind my back, and I don't have to make the same correction twice.

<figure><img src="../../guardrails-correction-to-rule.webp" alt="A flow: I correct the assistant, it proposes a one-line rule change, I approve or reject it, and an approved rule is saved and applies from the next session on" width="1000" height="622" loading="lazy"><figcaption>How a correction turns into a standing rule.</figcaption></figure>

There are a few rules I've added for my personal projects too. Before anything I write goes public, the assistant scans it for details from work that shouldn't be shared and checks with me if it isn't sure. And it never types a password or creates an account for me, even when that would save a step.

The tool is right most of the time, which makes it easy to stop checking. The rules are for the times it isn't. I started with tight limits, and I plan to loosen them where the tool has shown it doesn't need them.

What's the one rule you'd put on your own assistant? I'd love to hear it.

*Views are my own and don't represent Workday.*
