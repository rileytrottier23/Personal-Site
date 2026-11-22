---
title: Writing Answer Keys for AI Evaluations
date: 2026-11-21
dek: Testing AI features with synthetic documents and known answers, separate scores for the model and the code, and a quality metric next to every speed metric.
category: Product
draft: true
---

An answer key is the list of correct values for a test document. I write it before I look at anything the model produces. A first demo can show that an AI feature gets something right, but only an evaluation tells you how often, and you can't run one until you've written down the right answers.

Writing the key first sounds obvious, but it's easy to skip. The model's output is right there and it usually looks pretty good. If I read the output first and then decide what the answer should have been, I end up grading it generously without meaning to.

So I work in four steps, in this order:

1. Make a test document
2. Write its answer key, with the correct value for every field
3. Run the model, only on documents that have a key
4. Score the output against the key, field by field

<figure><img src="../../evals-answer-key-first.webp" alt="A flow: make a synthetic test document, write its answer key, run the model, and score the output against the key. When the model and the key disagree, check which one is wrong before counting a model error, and fix key mistakes in a copy" width="1000" height="777" loading="lazy"><figcaption>The order I work in: key first, then the model.</figcaption></figure>

## Synthetic documents

I use synthetic test documents. These are realistic fake contracts I make myself, so I know the correct value for every field. No customer data is involved, and I can make them as awkward as I like:

- A free first month
- An unusual payment term
- A discount that only applies to one line

Those are the cases that show where a model breaks. A clean, standard document doesn't tell you much on its own.

I only score documents that have a key. It's tempting to run everything you have through the model and look at the results. But a document without a key can't be scored, so you end up eyeballing it and deciding it looks right. I leave those out, even if it means a smaller test set.

## Two scores, not one

The features I work on pair a model with deterministic code, a setup I wrote about in [Probabilistic Planner, Deterministic Executor](https://rileytrottier.com/posts/probabilistic-planner-deterministic-executor/). The model reads and extracts, and the code calculates and checks. I score those two sides separately and never blend them into one number:

1. The model score: did it pull the right values out of the document?
2. The code score: given the right values, did the rules produce the right result?

If an end-to-end result is 90%, I need to know whether the model misread something or the code got the math wrong, because those are different problems with different fixes. A misread means changing how the model reads the document. A math error means fixing the rules in code, and that half can be tested like any other code, with the same input giving the same output every time.

<figure><img src="../../evals-two-scores.webp" alt="One end-to-end result split into two scores: the model score for reading and extracting, and the code score for calculating and checking. Each failure type has a different fix" width="1000" height="820" loading="lazy"><figcaption>One number hides which half failed. Two numbers show it.</figcaption></figure>

## When the key is wrong

The answer key won't always be right either. When you write keys by hand, some will have mistakes. When the model and the key disagree, I check which one is wrong before I count it as a model error. When I found errors in my keys, I fixed them in copies, so the original test documents stayed untouched.

It's the same reason one of my [rules for my AI assistant](https://rileytrottier.com/posts/guardrails-for-my-ai-assistant/) is no invented numbers. A wrong value that looks plausible is worse than an obvious gap, because nobody goes looking for it. A bad key does the same thing to an evaluation. It can mark a correct answer as a model error, or pass a wrong answer that happens to match it.

## Speed needs quality next to it

I'd also pair every speed metric with a quality metric. Measuring how often work flows through without a person stepping in is useful. On its own, though, it rewards a system that's fast and wrong.

Slow and wrong is easy to spot, because people are already looking at the work. Fast and wrong is the risky one. Everything looks smooth, the speed number goes up, and the mistakes go out without anyone checking them. The answer key is what lets you measure the quality half at all.

<figure><img src="../../evals-speed-and-quality.webp" alt="A two-by-two grid of speed against quality. Fast and right is the goal. Slow and right is safe but costly. Slow and wrong is easy to spot. Fast and wrong is the risky corner that a speed metric alone would reward" width="1000" height="703" loading="lazy"><figcaption>Why a speed metric needs a quality metric next to it.</figcaption></figure>

None of this needs a data science background. If you can write down the right answer, you can build an evaluation.

*Views are my own and don't represent Workday.*
