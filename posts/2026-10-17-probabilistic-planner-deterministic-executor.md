---
title: Probabilistic Planner, Deterministic Executor
date: 2026-10-17
dek: In finance software, every number has to be explainable. That changes how I put AI into a product.
category: Product
---

I work on finance software at Workday as a Senior Product Manager. In finance, someone has to find every wrong number, explain it and fix it, sometimes months later. That changes how I think about putting AI into a product.

The design I use is often called "probabilistic planner, deterministic executor." The model reads messy input and proposes what should happen. Plain, rule-based code checks the proposal and carries it out.

A made-up example from outside my area: an employee photographs a stack of expense receipts and you want to turn them into an expense report. The obvious design is to ask the model to read the receipts and hand back the finished report, with totals, tax and currency conversion already done. It will often get it right. When it gets one wrong, it gets it wrong just as confidently, and nobody can tell which report is the bad one.

The alternative is to split the job. The model copies each amount exactly as it's printed on the receipt and does no arithmetic. Then ordinary code adds things up, converts currencies and checks the result against something independent, like the card statement. If the numbers match, you move on. If they don't, you know which receipt to look at.

That check can also decide what a person sees next. A report where everything matches goes straight to the normal approval step. One where a value had to be guessed, like a blurry merchant name, gets that field flagged. One that doesn't match at all goes back to the employee with the reason.

The model's own confidence score doesn't decide any of that. Models are poor judges of their own mistakes, and I'd rather route on a check that can actually fail. I'd still log the confidence score next to the result, since it helps when you're debugging.

This approach costs something. Someone has to write and maintain the rules, and the rules cover fewer odd cases than a model that tries to work everything out. For anything involving money, I think that's the right trade.

I use the same split in my own projects, on a smaller scale. In [ReflectAI](../building-reflectai/), Claude writes the monthly report, but it returns structured data, and the app checks that data before it shows anyone anything. The rule that each person gets one journal entry per day lives in the database, not in the model's instructions. In my [journal MCP server](https://github.com/rileytrottier23/journal-mcp-server), each tool declares whether it only reads or also writes, so the app hosting the agent can tell the difference before it runs a call instead of trusting the model to be careful.

The split also makes the system easier to test. The deterministic half can be tested like any other code: same input, same output, every time. The model half needs a different kind of test, a set of realistic cases with a clear bar for what counts as good enough. I'm building one of those now for the journal MCP server. It's much easier to write those cases when the model's job is small and well defined.

When I'm designing a feature, I go step by step and ask whether the step needs judgment or precision. Reading a crumpled receipt needs judgment, and adding up a column needs precision. I give each step to the tool that's built for it, and make the code check the model's work before a person relies on it.

*Views are my own and don't represent Workday.*
