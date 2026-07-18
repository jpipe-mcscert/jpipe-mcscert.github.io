---
layout: single
classes: wide
title: Using Justification Patterns
excerpt: "Learn how to use justification patterns to enforce argumentation schemas in your justifications."
permalink: /tutorials/patterns/
header:
  teaser: /assets/images/covers/mosaic.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/mosaic.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

The same argument *shape* shows up again and again: "the artefact is ready **because** all its
quality gates pass, **as evidenced by** …". Rather than retyping that skeleton for every release,
every component, every team — you can capture it once as a **template** and specialise it wherever
you need it.

This tutorial assumes you are comfortable with the basics from
[jPipe 101](/tutorials/jpipe101/) and [Language features](/tutorials/language/).
{: .notice--info}

# A template is an argument with a hole in it

A **template** looks like a justification, but it can leave positions *deliberately unfilled* using
an abstract-support placeholder, written `@support`. The placeholder marks "some evidence goes here,
to be provided later".

```jpipe
template QualityGate {
  conclusion c is "The artifact is ready"
  strategy s is "All quality gates pass"
  s supports c

  @support ev is "TBD"   // a hole: real evidence must fill this in
  ev supports s
}
```

The `@support` slot is the whole point: it fixes the *shape* of the argument (a conclusion, argued
by a strategy, backed by evidence) while leaving the *content* of the evidence open.

<div align="center">
<img src="/assets/images/tutorials/06_patterns/template.svg" alt="The QualityGate template with an abstract-support slot"/>
</div>

`@support` is only valid inside a `template` — a plain `justification` has no holes.
{: .notice--warning}

# Specialising a template with `implements`

A justification fills a template's holes by declaring `implements <Template>` and providing concrete
elements for the abstract slots. You refer to inherited elements with **qualified ids**
(`Template:id`):

```jpipe
justification release implements QualityGate {
  // Fill the @support slot with real evidence
  evidence QualityGate:ev is "The test suite passes"
  QualityGate:ev supports QualityGate:s
}
```

The result is a complete, ordinary justification — the template's conclusion and strategy, now backed
by concrete evidence:

<div align="center">
<img src="/assets/images/tutorials/06_patterns/implemented.svg" alt="A release justification implementing the QualityGate template"/>
</div>

# Why bother?

- **Consistency.** Every "readiness" argument in your project has the same, reviewable structure.
- **Reuse.** Keep `QualityGate` in its own file and `load` it (see
  [Language features](/tutorials/language/#splitting-a-model-across-files)); a `frontend`, a
  `backend`, and a `docs` justification can each `implements gates:QualityGate` with their own
  evidence.
- **Intent.** A template documents *how you expect claims of this kind to be argued* — reviewers can
  check that an argument follows the agreed schema.

# Where to next?

- **[Composition operators](/tutorials/operators/)** — combine several finished justifications into
  a bigger one with `assemble` and `refine`.

For patterns used in anger, browse the
[jpipe-examples](https://github.com/jpipe-mcscert/jpipe-examples) repository.
