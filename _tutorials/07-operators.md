---
layout: single
classes: wide
title: Composition Operators
excerpt: "Learn how to call composition operators to assemble elementary justifications into complex ones."
permalink: /tutorials/operators/
header:
  teaser: /assets/images/covers/puzzle.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/puzzle.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

Big justifications are best built from small ones. Instead of writing one giant model, you argue each
part on its own and then **compose** the parts with an *operator*. jPipe ships two built-in
operators: `assemble` and `refine`.

This tutorial assumes [jPipe 101](/tutorials/jpipe101/) and, ideally,
[Language features](/tutorials/language/) (for `load`).
{: .notice--info}

# The operator-call syntax

A justification can be defined by *calling an operator* instead of listing a body. The form is:

```jpipe
justification <name> is <operator>(<source>, <source>, …) {
  key: "value"
  …
}
```

The parentheses list the source models being composed; the block gives the operator its
configuration.

# `assemble` — combine independent arguments

Suppose your product ships in two parts, each argued separately:

```jpipe
justification frontend {
  conclusion fc is "The frontend is ready"
  strategy fs is "Frontend gates pass"
  fs supports fc
  evidence fe is "Frontend tests pass"
  fe supports fs
}

justification backend {
  conclusion bc is "The backend is ready"
  strategy bs is "Backend gates pass"
  bs supports bc
  evidence be is "Backend tests pass"
  be supports bs
}
```

<div align="center">
<img src="/assets/images/tutorials/07_operators/frontend.svg" alt="The frontend justification" style="max-height:260px"/>
&nbsp;&nbsp;
<img src="/assets/images/tutorials/07_operators/backend.svg" alt="The backend justification" style="max-height:260px"/>
</div>

`assemble` gathers their conclusions under a single new conclusion and strategy. It requires two
labels — one for the new top conclusion, one for the aggregating strategy:

```jpipe
justification product is assemble(frontend, backend) {
  conclusionLabel: "The whole product is ready to ship"
  strategyLabel: "Both components are ready"
}
```

The two component arguments now hang under one roof:

<div align="center">
<img src="/assets/images/tutorials/07_operators/assembled.svg" alt="The assembled product justification"/>
</div>

Because the sources usually live in their own files, you will typically `load` them first:

```jpipe
load "frontend.jd"
load "backend.jd"

justification product is assemble(frontend, backend) {
  conclusionLabel: "The whole product is ready to ship"
  strategyLabel: "Both components are ready"
}
```

# `refine` — expand one node into a deeper argument

Sometimes a single piece of evidence deserves an argument of its own. `refine` grafts a second model
onto a chosen element of the first, identified by the **`hook`** configuration key.

Start from a base argument whose evidence "The test suite passes" you want to justify further, and a
detail model that argues exactly that claim:

```jpipe
justification base {
  conclusion c is "Version 2.0 is ready to ship"
  strategy s is "All release gates pass"
  s supports c
  evidence e is "The test suite passes"
  e supports s
}

justification detail {
  conclusion dc is "The test suite passes"
  strategy ds is "Unit and integration suites are green"
  ds supports dc
  evidence de is "CI reported 0 failures"
  de supports ds
}

justification refined is refine(base, detail) {
  hook: "e"     // the element in `base` to expand
}
```

The `hook` element in `base` is replaced by `detail`'s argument, deepening the tree:

<div align="center">
<img src="/assets/images/tutorials/07_operators/refined.svg" alt="The refined justification"/>
</div>

# The two operators at a glance

| Operator | Purpose | Required configuration |
|----------|---------|------------------------|
| `assemble(a, b, …)` | Join independent justifications under one new conclusion. | `conclusionLabel`, `strategyLabel` |
| `refine(base, detail)` | Expand one element of `base` into `detail`'s argument. | `hook` (the element to expand) |

# Where to next?

You now have the whole workflow: [author](/tutorials/jpipe101/) a model,
[grow](/tutorials/language/) it, [make it executable](/tutorials/runner/),
[run it in CI](/tutorials/cicd/), and structure it with [patterns](/tutorials/patterns/) and
operators.

For larger compositions in practice, see the
[empowrd example](https://github.com/jpipe-mcscert/jpipe-examples/tree/main/empowrd).
