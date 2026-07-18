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
justification release {
  conclusion c is "Version 2.0 is ready to ship"

  strategy s is "All release gates pass"
  s supports c

  // "The code is tested": an intermediate claim with its own argument
  sub-conclusion tested is "The code is tested"
  strategy ts is "The test suite passes with high coverage"
  ts supports tested
  evidence te is "The test suite passes"
  te supports ts
  evidence tc is "Coverage is above 80%"
  tc supports ts
  tested supports s

  // "The documentation is updated": another intermediate claim
  sub-conclusion documented is "The documentation is updated"
  strategy ds is "The changelog and API docs are current"
  ds supports documented
  evidence de is "The changelog is up to date"
  de supports ds
  documented supports s
}
```

The rules for support edges are worth internalising:

| A… | can support a… |
|----|----------------|
| `evidence` | `strategy` |
| `sub-conclusion` | `strategy` |
| `strategy` | `conclusion` **or** `sub-conclusion` |

Preview it (**jPipe: Open Diagram Preview**, or `jpipe process -i release.jd -m release -f SVG -o release.svg`)
and the layered structure is clear: the two sub-conclusions each carry their own sub-argument up to
the top strategy.

<div align="center">
<img src="/assets/images/tutorials/202_subconclusions/subconclusions.svg" alt="A layered release justification using sub-conclusions"/>
</div>

# Comments and layout

Whitespace is insignificant, and comments help you narrate the argument. Both C-style forms are
supported:

```jpipe
// a single-line comment

/* a multi-line
   comment */
```

# Where to next?

- **[Splitting models with `load`](/tutorials/modularity/)** breaks a large argument into per-concern
  files you can reuse and compose.
- **[Patterns](/tutorials/patterns/)** capture a reusable argument shape once and reapply it.
- **[Make it executable](/tutorials/runner/)** binds each piece of evidence to a real check.

For larger, real-world models, see the
[jpipe-examples](https://github.com/jpipe-mcscert/jpipe-examples) repository.
