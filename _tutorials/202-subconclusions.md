---
layout: single
classes: wide
title: "Sub-conclusions: growing your argument"
excerpt: "Add depth to a justification with intermediate claims."
permalink: /tutorials/sub-conclusions/
redirect_from:
  - /tutorials/language/
header:
  teaser: /assets/images/covers/blueprint2.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/blueprint2.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

The [jPipe 101](/tutorials/jpipe101/) model was deliberately flat: one strategy, two facts. Real
arguments have **structure**: intermediate claims, each argued in its own right. This tutorial adds
that depth with **sub-conclusions**.

# Sub-conclusions: intermediate claims

Our release model claimed "all gates pass" and hung two pieces of evidence off a single strategy.
But "the release is ready" really rests on several *distinct* claims (the code is tested, the docs
are current), and each of those deserves its own little argument.

A **sub-conclusion** is an intermediate claim: it is *concluded* by a strategy below it, and in turn
*supports* a strategy above it. It lets you build the argument in layers.

```jpipe
justification readiness {
  conclusion ready is "Version 2.0 is ready to ship"

  strategy gates is "All release gates pass"
  gates supports ready

  // "The code is tested": an intermediate claim with its own argument
  sub-conclusion tested is "The code is tested"
  strategy testing is "The test suite passes with high coverage"
  testing supports tested
  evidence suite is "The test suite passes"
  suite supports testing
  evidence coverage is "Coverage is above 80%"
  coverage supports testing
  tested supports gates

  // "The documentation is updated": another intermediate claim
  sub-conclusion documented is "The documentation is updated"
  strategy docs is "The changelog and API docs are current"
  docs supports documented
  evidence changelog is "The changelog is up to date"
  changelog supports docs
  documented supports gates
}
```

Notice the ids (`ready`, `gates`, `tested`, `testing`, …): unlike the terse `c`/`s`/`e1` of
[jPipe 101](/tutorials/jpipe101/), meaningful ids make the `supports` edges read almost like
sentences and keep a growing model navigable.

Open the [diagram preview](/tutorials/jpipe101/#step-2-preview-the-diagram) in the IDE and the
layered structure is clear: the two sub-conclusions each carry their own sub-argument up to the top
strategy.

<div align="center">
<img src="/assets/images/tutorials/202_subconclusions/subconclusions.svg" alt="A layered readiness justification using sub-conclusions"/>
</div>

From a terminal, the same export is one command:

```
jpipe process -i readiness.jd -m readiness -f SVG -o readiness.svg
```

# The shape of a valid argument

Now that the models are growing, a few rules are worth making explicit. They are what keep a
justification well-formed, and what give its diagram that layered shape.

**Every justification has exactly one conclusion.** A `conclusion` is the single claim the whole
argument exists to establish, so a justification always requires one, and never more than one. A
model with no conclusion is incomplete; a model with two is really two arguments sharing a file.

Everything else hangs beneath that conclusion through *support* edges, and only certain edges are
allowed:

- **Evidence** and **sub-conclusions** back **strategies**: a piece of `evidence` or a
  `sub-conclusion` can only support a `strategy`, never a conclusion directly.
- **Strategies** back **claims**: a `strategy` supports either the top `conclusion` or a
  `sub-conclusion`.

Put together, every path runs from a piece of evidence, up through one or more strategies and
sub-conclusions, to the single conclusion at the top:

| A… | can support a… |
|----|----------------|
| `evidence` | `strategy` |
| `sub-conclusion` | `strategy` |
| `strategy` | `conclusion` **or** `sub-conclusion` |

# Where to next?

- **[Splitting models with `load`](/tutorials/modularity/)** breaks a large argument into per-concern
  files you can reuse and compose.
- **[Patterns](/tutorials/patterns/)** capture a reusable argument shape once and reapply it.
- **[Make it executable](/tutorials/runner/)** binds each piece of evidence to a real check.

For larger, real-world models, see the
[jpipe-examples](https://github.com/jpipe-mcscert/jpipe-examples) repository.
