---
layout: single
classes: wide
title: Justification Templates
excerpt: "Capture an argument's reasoning as a reusable template, and instantiate it with concrete evidence."
permalink: /tutorials/templates/
redirect_from:
  - /tutorials/patterns/
header:
  teaser: /assets/images/covers/mosaic.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/mosaic.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

The same *reasoning* recurs across a project: "the artefact is ready **because** all its quality
gates pass". What changes from one release, component, or team to the next is rarely the reasoning
itself, but the concrete evidence that backs it.

If you have met the **template method** in object-oriented design, this will feel familiar: there,
you fix the skeleton of an algorithm once and let each subclass supply a few specific steps. A jPipe
**template** does the same for an argument. It captures the reasoning, a conclusion and the strategy
that argues it, once, and deliberately leaves *holes* where the backing will go. Each justification
then **instantiates** the template, filling those holes with its own argument, without disturbing the
shared reasoning.

In this tutorial we take the `readiness` argument you built with
[sub-conclusions](/tutorials/sub-conclusions/), **factor out its top-level shape** into a `quality`
template, and then rebuild the very same argument by instantiating that template. Nothing about the
conclusion changes; what changes is that the shape is now reusable.

This tutorial assumes you are comfortable with the basics from
[jPipe 101](/tutorials/jpipe101/) and [sub-conclusions](/tutorials/sub-conclusions/).
{: .notice--info}

# A template is an argument with holes in it

A **template** looks like a justification, but it can leave positions *deliberately unfilled* using
an abstract-support placeholder, written `@support`. Each placeholder marks "some support goes here,
to be provided later".

Take the [readiness argument](/tutorials/sub-conclusions/) and keep only its reasoning: the
conclusion, the strategy that argues it, and two holes where the backing will go. That is the
`quality` template.

```jpipe
template quality {
  conclusion ready is "Version 2.0 is ready to ship"
  strategy gates is "All release gates pass"
  gates supports ready

  @support tested is "Testing is demonstrated"
  tested supports gates

  @support documented is "Documentation is demonstrated"
  documented supports gates
}
```

The `@support` keyword marks an **abstract support**: a placeholder that stands for "some support
belongs here, to be supplied later". Its label says *what kind* of backing the argument expects
(`Testing is demonstrated`), not the concrete fact that will eventually provide it. Like every
support, an abstract one still needs its `supports` edge, so the template stays a well-formed
argument, just one with two clearly marked gaps.

Those two slots are the whole point: they fix the *shape* of the argument (a conclusion, argued by a
strategy, resting on two obligations) while leaving *how* each obligation is met open. In the preview
they render as dashed boxes:

<div align="center">
<img src="/assets/images/tutorials/203_templates/template.svg" alt="The quality template with two abstract-support slots"/>
</div>

`@support` is only valid inside a `template`; a plain `justification` has no holes.
{: .notice--warning}

# Instantiating a template with `implements`

A justification fills a template's holes by declaring `implements <template>`. Each abstract support
is a support position like any other, so you can back it however the claim deserves: a single piece
of `evidence`, or, when the obligation is itself worth arguing, a full **sub-conclusion** with its
own layered [sub-argument](/tutorials/sub-conclusions/).

To rebuild the `readiness` argument, fill each hole with exactly the sub-argument it had in the
[sub-conclusions tutorial](/tutorials/sub-conclusions/): `tested` becomes the intermediate claim
"the code is tested" argued by its test strategy, and `documented` becomes "the documentation is
updated":

```jpipe
justification readiness implements quality {
  sub-conclusion quality:tested is "The code is tested"
  strategy testing is "The test suite passes with high coverage"
  testing supports quality:tested
  evidence suite is "The test suite passes"
  suite supports testing
  evidence coverage is "Coverage is above 80%"
  coverage supports testing

  sub-conclusion quality:documented is "The documentation is updated"
  strategy docs is "The changelog and API docs are current"
  docs supports quality:documented
  evidence changelog is "The changelog is up to date"
  changelog supports docs
}
```

The preview frames the inherited part in a `<<template>> quality` box, with each hole now expanded
into its own sub-argument. Compare it with the diagram from the sub-conclusions tutorial: it is the
**same** `readiness` argument, only its top-level shape is now supplied by the template.

<div align="center">
<img src="/assets/images/tutorials/203_templates/implemented.svg" alt="The readiness justification rebuilt by instantiating the quality template"/>
</div>

## What is inherited, what is declared

Once a justification implements a template, it is not obvious from the source alone which elements it
owns and which it borrows. The IDE's **Outline panel** (at the bottom of the Explorer) spells it out:
under `readiness` it lists every element and tags the ones that come from the template as
**`(inherited)`**, leaving the ones you declared locally plain.

<div align="center">
<img src="/assets/images/tutorials/203_templates/outline.png" alt="The IDE Outline panel marking the template's elements as (inherited) under the readiness justification"/>
</div>

The four inherited entries (`quality:ready`, `quality:gates`, `quality:tested`, `quality:documented`)
are the template's conclusion, its strategy, and its two holes. Everything listed below them is what
`readiness` added to fill those holes.

## A note on namespaces

Every element belongs to a **namespace** named after the template or justification that declares it.
Inside `template quality`, the strategy written `gates` is really `quality:gates`; inside a plain
justification, its elements sit in that justification's own namespace.

That is why `readiness` refers to the template's holes with the **qualified id** `quality:tested`: it
is reaching across into the `quality` namespace to fill an inherited slot. The brand-new elements it
adds for itself (`testing`, `suite`, `coverage`, `docs`, `changelog`) live in `readiness`'s own
namespace, so they need no prefix.

# Why templates matter

A template is more than a copy-paste shortcut: it turns an argument's shape into a **contract**. Once
your team agrees that every release must argue `quality`, that one template becomes the standard the
whole project is held to, and three things follow.

- **The reasoning is reviewed once, not argument by argument.** A reviewer vets the `quality`
  template, its conclusion, its strategy, its two obligations, a single time. Every `implements
  quality` inherits that vetted skeleton, so review shifts from re-litigating the *shape* of each
  argument to checking that the evidence filling it is real.
- **No obligation can be quietly dropped.** A hole *must* be filled: leave `documented` unfilled and
  the model does not compile (`abstract support 'quality:documented' was not overridden`). A
  `readiness` that forgets to argue documentation is not a weaker argument, it is a broken one jPipe
  rejects. "Did we cover everything?" becomes a property the compiler checks for you.
- **Raise the bar in one place.** When the standard grows a new gate, say a security scan, you add a
  single `@support` to the template. Every justification that implements it is instantly incomplete
  until it addresses the new obligation. The requirement propagates by construction, instead of being
  chased across dozens of files.

Multiply that across a `frontend`, a `backend`, and a `docs` argument that each `implements quality`
in its own file (see [splitting models with `load`](/tutorials/modularity/)), and one reviewed
template keeps an entire fleet of arguments consistent, complete, and honest.

# Where to next?

- **[Splitting models with `load`](/tutorials/modularity/)** keeps a template in its own file so many
  arguments can share it, the natural next step for reuse.
- **[assemble](/tutorials/assemble/)** and **[refine](/tutorials/refine/)** combine several finished
  justifications into a bigger one.

For templates used in anger, browse the
[jpipe-examples](https://github.com/jpipe-mcscert/jpipe-examples) repository.
