---
layout: single
classes: wide
title: "Composing with refine"
excerpt: "Expand one node of a justification into a deeper argument with the refine operator."
permalink: /tutorials/refine/
header:
  teaser: /assets/images/covers/books.png
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/books.png
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

`refine` is jPipe's other composition operator (the first is [`assemble`](/tutorials/assemble/)).
Where `assemble` joins finished arguments side by side, `refine` drills **down**: it takes a single
node you had been treating as a black box and replaces it with a whole sub-argument. It is how an
argument grows *incrementally*, one node at a time deepening from "trust me" into "here is why".

This tutorial assumes [jPipe 101](/tutorials/jpipe101/) and
[sub-conclusions](/tutorials/sub-conclusions/).
{: .notice--info}

# A first draft

Here is an early version of the release argument. The documentation side is already argued in full,
but testing is still just asserted: a lone piece of evidence, "The test suite passes", stands in for
the whole idea that the code is tested.

```jpipe
justification draft {
  conclusion ready is "Version 2.0 is ready to ship"
  strategy gates is "All release gates pass"
  gates supports ready

  evidence tests is "The test suite passes"
  tests supports gates

  sub-conclusion documented is "The documentation is updated"
  strategy docs is "The changelog and API docs are current"
  docs supports documented
  evidence changelog is "The changelog is up to date"
  changelog supports docs
  documented supports gates
}
```

<div align="center">
<img src="/assets/images/tutorials/206_refine/draft.svg" alt="The draft argument, with testing as a single black-box evidence"/>
</div>

A reviewer could fairly push back on that `tests` node: a passing suite is *some* reason to believe
the code is tested, but the draft never says how thoroughly. That claim deserves its own argument.

# Refining a node

Write that argument as a separate justification. Its conclusion is the claim we want to make in full,
"The code is tested", and beneath it sits the real reasoning:

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
```

<div align="center">
<img src="/assets/images/tutorials/206_refine/tested.svg" alt="The standalone argument that the code is tested" style="max-height:280px"/>
</div>

`refine` grafts it onto the draft. It takes two arguments, the **base** to deepen (`draft`) and the
**detail** to graft in (`tested`), plus a **`hook`**:

```jpipe
justification readiness is refine(draft, tested) {
  hook: "tests"
}
```

The `hook` is an element **id from the first argument**, the base. Here `"tests"` is the id of the
`evidence tests` declared in `draft`; that is the node `refine` will replace with the `tested`
argument. Pick the wrong id, or one that lives in the detail instead of the base, and there is nothing
to graft onto.

The black-box `tests` evidence is gone; in its place, the whole `tested` argument now hangs under the
release strategy. The passing suite has not disappeared, it has moved down to become one of the two
facts that *support* the richer claim:

<div align="center">
<img src="/assets/images/tutorials/206_refine/refined.svg" alt="The readiness argument after refining the testing node"/>
</div>

# Deepening without disruption

The point of `refine` is that you did not touch the rest of the argument to grow this one branch. The
conclusion, the release strategy, and the whole documentation side are exactly as they were; only the
node under scrutiny got deeper. That lets an assurance case mature the way real review works, one
questioned claim at a time, turning black boxes into arguments as the questions arrive, without ever
rewriting what already holds.

# Where to next?

Its sibling operator, **[`assemble`](/tutorials/assemble/)**, grows an argument in breadth instead of
depth, joining independent justifications side by side. When a branch recurs across arguments,
**[templates](/tutorials/templates/)** capture its shape for reuse. And once the argument says what
you mean, **[make it executable](/tutorials/runner/)** so every piece of evidence is backed by a real
check.

For larger compositions in practice, see the
[empowrd example](https://github.com/jpipe-mcscert/jpipe-examples/tree/main/empowrd).
