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

The [sub-conclusions](/tutorials/sub-conclusions/) and [templates](/tutorials/templates/) tutorials
built the `readiness` argument **top-down**: start from the conclusion "Version 2.0 is ready to ship"
and break it into the claims beneath it (a template even fixes that shape as a contract up front).
`assemble` works the other way, **bottom-up**: argue each claim on its own, as an independent
justification, then compose those finished pieces into the larger argument.

This tutorial assumes [jPipe 101](/tutorials/jpipe101/) and
[sub-conclusions](/tutorials/sub-conclusions/).
{: .notice--info}

# The building blocks

Take the two claims that `readiness` rested on, and this time argue each as a **standalone**
justification, complete with its own conclusion:

```jpipe
justification tested {
  conclusion tested is "The code is tested"
  strategy testing is "The test suite passes with high coverage"
  testing supports tested
  evidence suite is "The test suite passes"
  suite supports testing
  evidence coverage is "Coverage is above 80%"
  coverage supports testing
}

justification documented {
  conclusion documented is "The documentation is updated"
  strategy docs is "The changelog and API docs are current"
  docs supports documented
  evidence changelog is "The changelog is up to date"
  changelog supports docs
}
```

Each brick stands on its own two feet, provable and reviewable in isolation:

<div align="center">
<img src="/assets/images/tutorials/205_assemble/tested.svg" alt="The tested justification" style="max-height:260px"/>
&nbsp;&nbsp;
<img src="/assets/images/tutorials/205_assemble/documented.svg" alt="The documented justification" style="max-height:260px"/>
</div>

# Calling `assemble`

A justification can be defined by *calling an operator* in place of a body, written
`is <operator>(<sources>) { … }`. `assemble` takes the bricks' conclusions and gathers them under one
new conclusion and strategy; you give it a label for each:

```jpipe
justification readiness is assemble(tested, documented) {
  conclusionLabel: "Version 2.0 is ready to ship"
  strategyLabel: "All release gates pass"
}
```

As your models grow, `tested` and `documented` would each move to their own file and be pulled in
with [`load`](/tutorials/modularity/); here they share one file, so `assemble` can name them
directly.

The result is the very [same `readiness` argument](/tutorials/sub-conclusions/) you wrote top-down,
reached from the bottom up. Notice how each brick's *conclusion* has become a **sub-conclusion** of the
whole: "The code is tested" and "The documentation is updated" now sit beneath the new strategy
instead of topping their own trees.

<div align="center">
<img src="/assets/images/tutorials/205_assemble/assembled.svg" alt="The readiness justification assembled from its two parts"/>
</div>

# Two directions, one argument

Top-down and bottom-up are not rival techniques; they are two routes to the same tree, and which one
fits depends on how the work is divided. When a single author decomposes a claim, sub-conclusions keep
the whole thing in one place. When separate people or teams own separate concerns, `assemble` lets
each prove its own brick in isolation and then hands you the combined argument for free: no brick
rewritten, none of them aware of the others. As an assurance case grows, that independence is what
keeps it reviewable.

# Where to next?

The other operator, **[`refine`](/tutorials/refine/)**, composes in the opposite direction, expanding
a single node into a deeper argument rather than joining arguments side by side. When several bricks
share a shape, **[templates](/tutorials/templates/)** let you fix that shape once and reuse it. And
once the argument reads the way you want, **[make it executable](/tutorials/runner/)** so every piece
of evidence is backed by a real check.

For larger compositions in practice, see the
[empowrd example](https://github.com/jpipe-mcscert/jpipe-examples/tree/main/empowrd).
