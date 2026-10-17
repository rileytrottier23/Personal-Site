---
title: Probabilistic Planner, Deterministic Executor
date: 2026-10-17
dek: In finance software, every number has to be explainable. That changes how I think about putting AI into a product.
category: Product
---

I work on finance software at Workday as a Senior Product Manager. In finance, someone has to find every wrong number, explain it and fix it, sometimes months later. That changes how I think about putting AI into a product.

The design I use is often called "probabilistic planner, deterministic executor." The model reads messy input and proposes what should happen. Plain, rule-based code checks the proposal and carries it out.

Here's a made-up example from outside my area. Say an employee photographs a stack of expense receipts and you want to turn them into an expense report. The tempting design is to ask the model to read the receipts and hand back the finished report, with totals, tax and currency conversion already done. It will often get it right. When it gets one wrong, it gets it wrong just as confidently, and nobody can tell which report is the bad one.

The alternative is to split the job. The model copies each amount exactly as it's printed on the receipt and does no arithmetic. Then ordinary code adds things up, converts currencies and checks the result against something independent, like the card statement. If the numbers match, you move on. If they don't, you know which receipt to look at.

That check can also decide what a person sees next. One way to set it up: a report where everything matches goes straight to the normal approval step. One where a value had to be guessed, like a blurry merchant name, gets that field flagged. One that doesn't match at all goes back to the employee with the reason.

The model's own confidence score isn't what decides any of that. Models are poor judges of their own mistakes, and I'd rather route on a check that can actually fail. I'd still log the confidence score next to the result, since it's useful when you're debugging.

This approach costs something. Someone has to write and maintain the rules, and the rules cover fewer odd cases than a model that tries to work everything out. For anything involving money, I think that's the right trade.

The test I use: for each step, ask whether it needs judgment or precision. Reading a crumpled receipt needs judgment. Adding up a column needs precision. Give each step to the tool that's built for it, and make the code check the model's work before a person relies on it.

*Views are my own and don't represent Workday.*
