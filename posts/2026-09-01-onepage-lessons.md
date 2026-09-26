---
title: What I learned building OnePage
date: 2026-09-01
dek: OnePage was the first app I built myself. Here's what I got wrong, what I fixed, and what it taught me as a product manager.
category: Building
---

OnePage was my first real software project. I had spent years as a product manager, working with engineering teams on SaaS, payments and health-tech products, but I had never built an app myself. A lot of it was trial and error. I broke things, fixed them, and broke them again in new ways. This post covers the lessons that stuck.

## What OnePage is

OnePage is a task manager built around one idea: everything you do with a task should happen on a single screen. There are no pop-ups and no separate pages for each task. You get a "Today" list and your own categories. Paste ten lines and you get ten tasks. Press Tab to turn a task into a subtask.

I built it on Replit in May 2025, using React for the front end and a Postgres database behind it. Replit made it easy to get started, which was the point. I wanted to learn by building.

## Features that work alone can fail together

Within a couple of weeks, OnePage let you drag tasks between categories, nest subtasks, archive finished tasks overnight and set up recurring tasks. I tested each feature as I built it, and each one worked.

Then I started using them together. A single task could be nested under another, marked done, dragged to a new category, archived and created by a recurring rule, all at the same time. I had never tested those combinations, and they caused most of my early bugs. I spent a long stretch fixing them.

Two of those issues are still open. If you reorder tasks within a list, the order resets when you reload the page, because I never gave the database a way to store it. And a task can look like a subtask on screen without actually being linked to its parent.

As a PM, this changed how I scope work. When a feature is added, I now plan time to test how it behaves alongside the features that already exist.

## Adding login wasn't enough

When I opened OnePage to more than one user, I added accounts and passwords first. I then learned that login alone doesn't keep people's data apart. Every request to the database also has to check that the data belongs to the person asking for it. I went back through the whole app and added that check everywhere.

It's the same question I now ask about AI agents at work: the agent may be signed in, but is every action it takes limited to what that user is allowed to see?

## AI reports that keep working when the AI doesn't

I added a feature that uses OpenAI to write a monthly summary of your productivity. My first version assumed the AI would always respond. But an AI service can fail for lots of reasons, like an expired key, a usage limit or an outage, and my app showed the same vague error for all of them.

I rebuilt it in three steps. First, the app now recognizes each type of failure and tells the user what happened and whether to try again. Second, it saves each report once it's generated, so if the AI is down you still see your last report instead of an error. Third, it clears out old reports on a schedule. I also made sure the app cleans the AI's output before showing it on screen, since you can't assume a model's output is safe.

The lesson for me as a PM: treat an AI model like any outside service that will sometimes fail, and design what the user sees when it does.

## Backing up my code to GitHub

The hardest part of the project was outside the app. I wanted every change I made in Replit to be copied to GitHub automatically, so I'd have a backup and could run automated checks.

My first attempt could run twice at once and overwrite itself. I rebuilt it so it compares the two copies of the code before doing anything. If they match, it does nothing. If one is simply newer, it updates the other. If they've gone in different directions, it stops and reports an error instead of guessing. I also made sure that a problem with GitHub never blocks the app itself from going live, and I added a page in the app that shows whether the last backup worked.

## A green light that meant nothing

I set up an automated check to warn me if the backup broke. It stayed green while the backup had quietly stopped working.

The check was looking at the wrong thing. It confirmed that a password it had access to was valid, but the backup was using a different copy of that password, and that copy had expired. I changed the check to confirm that a backup had actually happened recently. That's the signal I care about.

This one stuck with me because it's so common in product work. A dashboard can show healthy numbers that don't measure the outcome you care about.

## The time I lost 25 changes

At one point the two copies of my code had gone in different directions. The backup tool did what I had built it to do: it stopped and refused to continue. That refusal was overridden with a forced update, and 25 changes disappeared from GitHub, including tests and several features.

I got them back by saving a copy of the old version before GitHub deleted it for good. The lesson was simple. I built that safety check for a reason, and overriding it without understanding why it stopped put a lot of work at risk. I want the same discipline from AI agents: when a guardrail stops them, the right move is to find out why.

## What's next

OnePage now runs on Railway, which meant fixing a few settings that only worked inside Replit. There's still a short list of things I'd fix:

- Scheduled jobs like archiving only run while the app is running.
- "Monthly" repeating tasks repeat every 30 days, not on the same date each month.
- The monthly AI report can miss tasks from the last day of the month.
- Task order within a list doesn't save.

Building OnePage made me a better PM. I have a much clearer sense of where engineering time actually goes, and I ask better questions before something ships.
