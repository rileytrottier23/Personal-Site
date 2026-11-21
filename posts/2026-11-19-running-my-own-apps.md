---
title: Maintaining Your Own Apps as a PM
date: 2026-11-19
dek: Hosting costs, expiring sign-ins, domains, database backups and a monthly security scan, the upkeep behind three small apps that most PMs never see up close.
category: Product
---

AI has made building easier than ever - a dream for any product manager who has been frustrated by the slow pace of development. But as I quickly learned, building isn't the hard part. At work, if a database needs a backup or a certificate is close to expiring, there's a team for that, and I hear about it in a status update. With my own apps that's all on me.

I have three vibe-coded applications on the web: ReflectAI, a journaling app I [wrote about here](https://rileytrottier.com/posts/building-reflectai/), OnePage, a task manager, and this website. More to come soon, but that's all you'll find for now. This fall I moved all of them off Replit onto Railway and started doing my development in Claude Code. The move went fine. What I wasn't ready for was the list of small jobs that comes with owning the whole stack:

1. Hosting cost
2. Authentication and identity management
3. Domains
4. Backups
5. Security

<figure><img src="../../upkeep-list.webp" alt="The upkeep behind three small apps: hosting cost, kept down with app sleep, memory caps and usage alerts; authentication, where a Google sign-in app in testing mode expired sign-ins every seven days; domains, moved from a reseller into my own account; backups, a monthly job to private storage; and security, a monthly read-only scan" width="1000" height="848" loading="lazy"><figcaption>The jobs that came with owning the whole stack.</figcaption></figure>

**Cost came first.** Railway costs can add up quickly, so I looked for ways to keep things cheap. I turned on app sleep for the low-traffic services, capped their memory and set usage alerts. Lots of "free" trials expire quickly, and start-up credits don't get you very far.

**Then authentication and identity management.** ReflectAI switched sign-in libraries during the move and OnePage got a fresh Clerk setup. A few weeks later one of my Google connections stopped working, and the cause was a setting I'd never looked at. The Google sign-in app was still in "testing" mode, which expires sign-ins every seven days. Fixing it meant filling in a few branding fields and a privacy policy link and publishing the app. None of it was hard, I just didn't know it existed. I had worked in identity management during my time at Umo, but that was a lot more complex than this. It also already existed when I was there, so there were a lot of start-up considerations I hadn't faced before.

**Domains were the same kind of thing.** reflectai.net was bought through a reseller, so before I could move it anywhere I first had to get it into my own registrar account. Replit didn't make that easy, which reinforced why I wanted more control over what I was building.

**Backups made me the most nervous.** ReflectAI holds people's journal entries. Railway's paid plan includes daily backups, but it costs more than I want to spend. My first plan was a free monthly GitHub Action, but it needed the database open to the internet and a database password copied into GitHub. That swapped one risk for another. So the backup runs inside Railway instead. Once a month a job saves the database to a private storage bucket, checks the copy has the tables it should and keeps the last three. The first run saved 24 tables. Then I closed the public database connection.

<figure><img src="../../upkeep-backups.webp" alt="Two backup options compared. A free monthly GitHub Action needed the database open to the internet and a password copied into GitHub. A monthly job inside Railway keeps the database private, saves to a private bucket, checks the tables and keeps the last three copies. I went with the job inside Railway" width="1000" height="577" loading="lazy"><figcaption>I picked the option that kept the database private.</figcaption></figure>

**Security took the most thought.** I worry that AI makes it cheaper to find holes in small apps like mine, so I set up a monthly security scan across all three. It checks packages, looks for leaked keys, runs a static scan and has Claude review the code against a checklist. It's read-only. It emails me a report, and every recommended fix has to say what users would notice if I made it. I approve fixes one at a time.

Before I turned it on, I had a second agent review the plan, and it caught two things I'd missed:

- The scanner reads text from public repos, which anyone can write to, and it also had access to tools that could change data.
- A fix opened on a public repo would show the hole before it was patched.

Now the scan can't use those tools, and serious fixes go through a private GitHub security advisory. I also turned on Dependabot, secret scanning and code scanning, and added a switch that pauses new ReflectAI sign-ups with one setting change.

<figure><img src="../../upkeep-security-scan.webp" alt="The monthly security scan loop: the scan runs read-only, a report arrives by email with the user impact of each fix, I approve or reject each fix, approved fixes are made on a branch, and next month's scan checks the fix held" width="1000" height="493" loading="lazy"><figcaption>Nothing changes until I approve it.</figcaption></figure>

None of this is the fun part, and it's not work a PM usually sees up close. I used to nod along when an engineer said a migration needed time for backups and cutover. Now I have a rough idea what's inside that time, and I think I'll read those estimates a bit differently.

Claude did most of the setup. But it wouldn't paste a database password for me, and it kept asking what users would notice before it changed anything. The calls on cost, risk and user experience stayed with me. Same as with my [scheduled AI jobs](https://rileytrottier.com/posts/ai-automations-failed-quietly/), most of the work came after launch.

*Views are my own and don't represent Workday.*
