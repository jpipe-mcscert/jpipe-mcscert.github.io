---
layout: single
classes: wide
title: "Composing with assemble"
excerpt: "Join independent justifications under one conclusion with the assemble operator."
permalink: /tutorials/assemble/
redirect_from:
  - /tutorials/operators/
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
operators: `assemble` (this page) and [`refine`](/tutorials/refine/).

This tutorial assumes [jPipe 101](/tutorials/jpipe101/) and
[splitting models with `load`](/tutorials/modularity/).
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

# `assemble`: combine independent arguments

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
<img src="/assets/images/tutorials/205_assemble/frontend.svg" alt="The frontend justification" style="max-height:260px"/>
&nbsp;&nbsp;
<img src="/assets/images/tutorials/205_assemble/backend.svg" alt="The backend justification" style="max-height:260px"/>
</div>

`assemble` gathers their conclusions under a single new conclusion and strategy. It requires two
labels: one for the new top conclusion, one for the aggregating strategy:

```jpipe
justification product is assemble(frontend, backend) {
  conclusionLabel: "The whole product is ready to ship"
  strategyLabel: "Both components are ready"
}
```

The two component arguments now hang under one roof:

<div align="center">
<img src="/assets/images/tutorials/205_assemble/assembled.svg" alt="The assembled product justification"/>
</div>

Because the sources usually live in their own files, you will typically
[`load`](/tutorials/modularity/) them first:

```jpipe
load "frontend.jd"
load "backend.jd"

justification product is assemble(frontend, backend) {
  conclusionLabel: "The whole product is ready to ship"
  strategyLabel: "Both components are ready"
}
```

# Where to next?

- **[refine](/tutorials/refine/)** expands a single node into a deeper argument.
- **[Patterns](/tutorials/patterns/)** specialise a reusable `template` with `implements`.
- **[Make it executable](/tutorials/runner/)** binds each piece of evidence to a real check.

For larger compositions in practice, see the
[empowrd example](https://github.com/jpipe-mcscert/jpipe-examples/tree/main/empowrd).
