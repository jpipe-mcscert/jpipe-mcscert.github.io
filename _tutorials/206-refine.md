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

`refine` is one of jPipe's two composition operators (the other is
[`assemble`](/tutorials/assemble/)). Where `assemble` joins independent arguments side by side,
`refine` drills **down**: it expands a single node of one argument into a whole sub-argument.

This tutorial assumes [jPipe 101](/tutorials/jpipe101/) and
[splitting models with `load`](/tutorials/modularity/).
{: .notice--info}

# When to refine

Sometimes a single piece of evidence is really a claim that deserves its own argument. Rather than
inflating the parent model, you argue that claim in a separate model and graft it on. `refine` does
the grafting, replacing a chosen element with a second model's argument.

# Calling `refine`

Like every operator, `refine` is called in place of a model body:

```jpipe
justification <name> is refine(<base>, <detail>) {
  hook: "<id>"
}
```

`base` is the argument to deepen, `detail` is the model grafted in, and the **`hook`** key names the
element of `base` to expand. Start from a base argument whose evidence "The test suite passes" you
want to justify further, and a detail model that argues exactly that claim:

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
<img src="/assets/images/tutorials/206_refine/refined.svg" alt="The refined justification"/>
</div>

For the graft to read as one continuous argument, `detail`'s conclusion should match the claim made
by the `hook` element. As with `assemble`, the source models usually live in their own files, so you
will [`load`](/tutorials/modularity/) them first.

# Where to next?

- **[assemble](/tutorials/assemble/)** composes independent arguments side by side.
- **[Templates](/tutorials/templates/)** capture a reusable argument skeleton you instantiate with `implements`.
- **[Make it executable](/tutorials/runner/)** binds each piece of evidence to a real check.

For larger compositions in practice, see the
[empowrd example](https://github.com/jpipe-mcscert/jpipe-examples/tree/main/empowrd).
