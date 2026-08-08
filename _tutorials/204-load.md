---
layout: single
classes: wide
title: "Splitting an argument across files"
excerpt: "Use load to keep a reusable model in its own file and pull it into many arguments."
permalink: /tutorials/modularity/
header:
  teaser: /assets/images/covers/saw.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/saw.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

On the [templates tutorial](/tutorials/templates/) the `quality` template and the `readiness`
justification that instantiates it shared a single file. That is fine for a demo, but a template only
earns its keep when it is *shared*: many arguments across a project should reuse the same `quality`
shape, and none of them wants a private copy of it.

The fix is **separation of concerns**: keep the reusable template in one file, keep each argument in
its own file, and let jPipe stitch them together. The `load` directive pulls a model out of another
file and into scope.

# The `load` directive

Give the template a file of its own:

```jpipe
// quality.jd
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

The `readiness` argument then lives in its own file. It `load`s `quality.jd` and instantiates the
template exactly as before; the only change is that `quality` now comes from another file:

```jpipe
// readiness.jd
load "quality.jd"

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

`load "quality.jd"` imports **every model** declared in that file, resolved relative to the current
file. Compile `readiness.jd` and you get back the very
[same argument](/tutorials/templates/#instantiating-a-template-with-implements) you built on the
templates tutorial, only now the template is shared: a second file, say `docs.jd`, could `load
"quality.jd"` and instantiate `quality` with its own evidence, no copy-paste.

# Binding a load with `as`

As a project grows you may `load` several files at once, and their model names can collide (two files
might each define a `quality`). Bind a file under a name with **`as`**, and everything it declares is
reachable through that prefix:

```jpipe
// readiness.jd
load "quality.jd" as templates

justification readiness implements templates:quality {
  sub-conclusion templates:quality:tested is "The code is tested"
  strategy testing is "The test suite passes with high coverage"
  testing supports templates:quality:tested
  evidence suite is "The test suite passes"
  suite supports testing
  evidence coverage is "Coverage is above 80%"
  coverage supports testing

  sub-conclusion templates:quality:documented is "The documentation is updated"
  strategy docs is "The changelog and API docs are current"
  docs supports templates:quality:documented
  evidence changelog is "The changelog is up to date"
  changelog supports docs
}
```

The template is now reached as `templates:quality` and its holes as `templates:quality:tested`: the
same [qualified ids](/tutorials/templates/#a-note-on-namespaces) you already met, with the file's
alias in front. Reach for `as` whenever a plain `load` would leave a name ambiguous.

The IDE's **Outline panel** makes the split visible: everything imported from `quality.jd` sits under
the `templates` namespace, while the current file's own models stay in the **default** namespace.
There, as [on the templates page](/tutorials/templates/#what-is-inherited-what-is-declared), the
`readiness` justification lists its inherited holes (`(inherited) quality:tested`, ...) alongside the
elements it declares to fill them.

<div align="center">
<img src="/assets/images/tutorials/204_load/ns_outline.png" alt="The IDE Outline panel showing the loaded quality.jd models under the templates namespace, separate from the current file's default namespace"/>
</div>

# From many files to one argument

Splitting is what makes an argument **modular**: each file can be written, reviewed, and reused on its
own, while a shared template like `quality` keeps them all arguing to the same standard. `load` is
only the glue that lets one file see another; turning those loaded pieces into a single tree is the
job of jPipe's **composition operators**, `assemble` and `refine`. Together they let a large assurance
case grow as a handful of small, focused files instead of one sprawling model.

# Where to next?

- **[assemble](/tutorials/assemble/)** independent arguments side by side under one shared conclusion.
- **[refine](/tutorials/refine/)** a single node by grafting a loaded model onto it.
- **[Make it executable](/tutorials/runner/)** binds each piece of evidence to a real check.

For larger, real-world models split across files, see the
[jpipe-examples](https://github.com/jpipe-mcscert/jpipe-examples) repository.
