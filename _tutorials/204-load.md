---
layout: single
classes: wide
title: "Splitting an argument across files"
excerpt: "Use load to keep a reusable model in its own file and pull it into many arguments."
permalink: /tutorials/modularity/
header:
  teaser: /assets/images/covers/tiles.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/tiles.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

The [QualityGate pattern](/tutorials/patterns/) captured a reusable argument shape once. But a real
project has many arguments that should reuse it: the frontend, the backend, and the docs each need a
"is it ready?" justification of the same shape. You do not want to copy `QualityGate` into every
file.

This is **separation of concerns**: keep the reusable template in one file, keep each concern's
argument in its own file, and pull the pieces together. jPipe's `load` directive is what pulls them
together.

# The `load` directive

Put the template in its own file:

```jpipe
// gates.jd
template QualityGate {
  conclusion c is "The artifact is ready"
  strategy s is "All quality gates pass"
  s supports c
  @support ev is "TBD"
  ev supports s
}
```

`load` imports **every model** declared in another `.jd` file, resolved relative to the current
file. Each concern can now `load` the template and specialise it:

```jpipe
// frontend.jd
load "gates.jd"

justification frontend implements QualityGate {
  evidence QualityGate:ev is "Frontend tests pass"
  QualityGate:ev supports QualityGate:s
}
```

`backend.jd` and `docs.jd` do exactly the same, each with their own evidence: one template, argued in
three files, no copy-paste.

# Namespaces: avoiding name clashes

Independent files reuse short ids like `c`, `s`, or `ev`. When you load several of them, those names
can collide. Bind a loaded file under a **namespace** with `as`, and reach its models through that
prefix:

```jpipe
// frontend.jd
load "gates.jd" as gates

justification frontend implements gates:QualityGate {
  evidence gates:QualityGate:ev is "Frontend tests pass"
  gates:QualityGate:ev supports gates:QualityGate:s
}
```

Every model from `gates.jd` is then reachable as `gates:<ModelName>`, and its elements as
`gates:<ModelName>:<id>`. You can confirm how names resolve with the diagnostic mode: the symbol
table shows exactly where each qualified id was defined:

```
=== Symbol Table ===
template "gates:QualityGate"  [gates.jd:2:9]
  c   3:13
  s   4:11
  ev  6:11
justification "frontend"  [frontend.jd:3:14]
  gates:QualityGate:c   gates.jd:3:13
  gates:QualityGate:s   gates.jd:4:11
  gates:QualityGate:ev  4:11
```

# Loading is only half the story

`load` brings a model into scope, but on its own it does nothing to your top-level argument: you
still have to *combine* the per-concern justifications into one. That is the job of the **composition
operators**:

- **[assemble](/tutorials/assemble/)** joins the `frontend`, `backend`, and `docs` justifications
  under one product-level conclusion.
- **[refine](/tutorials/refine/)** expands a single node of a justification with a second, loaded
  model.

# Where to next?

- **[assemble independent arguments](/tutorials/assemble/)** into one product-level justification.
- **[Make it executable](/tutorials/runner/)** binds each piece of evidence to a real check.

For larger, real-world models split across files, see the
[jpipe-examples](https://github.com/jpipe-mcscert/jpipe-examples) repository.
