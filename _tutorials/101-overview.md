---
layout: single
classes: wide
title: Overview
permalink: /tutorials/overview/
redirect_from:
  - /tutorials/install/
excerpt: "What jPipe is, the three tools it ships, and where to start."
header:
  teaser: /assets/images/covers/setup.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/setup.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

jPipe is a language and toolchain for **justification diagrams**: structured arguments that
connect a top-level claim ("version 2.0 is ready to ship") down to the sub-claims, strategies,
and evidence that support it. You write a model in a small textual language (a `.jd` file), and
jPipe renders it as a diagram you can read and review, then later *execute* against real data to
check that the argument still holds.

<div align="center">
<img src="/assets/images/tutorials/101_overview/components.svg" alt="The jPipe compiler is the starting point; the VS Code extension and the runner both build on it" style="max-width:75%"/>
</div>

This section takes you from a blank editor to your first justification. Before you install
anything, here is the map of the tools you will meet.

# The three tools


| Tool | What it does | When you need it |
|------|--------------|------------------|
| **jPipe Compiler** | The `jpipe` command-line tool that parses, validates, and renders models. Everything else in jPipe runs on top of it. | **Start here**: one package-manager command. |
| **jPipe IDE** | A Visual Studio Code extension to author `.jd` files, with syntax highlighting, a live diagram preview, and one-click export. | Install it second. It finds the compiler on its own. |
| **jPipe Runner** | The `jpipe-runner` tool that turns a justification into an *executable* check against real data. | When you want the argument verified automatically, typically in CI/CD. |

# Where to start

One command installs the compiler, and it brings **Java** and **Graphviz** with it: our Homebrew,
APT and Scoop packages declare both as dependencies, so you never chase a runtime by hand. The
extension then picks that compiler up with no configuration at all, because it looks for a `jpipe`
on your `PATH` out of the box.

1. **[Install the compiler](/tutorials/install/compiler/)**: `brew`, `apt` or `scoop`, one line.
2. **[Install the IDE](/tutorials/install/ide/)**: the extension, with nothing to configure.
3. **[jPipe 101](/tutorials/jpipe101/)**: write, preview, and export your first justification.

Locked-down machine, no package manager, or a project pinned to a specific compiler version? The
extension can download and manage a compiler itself: see
[IDE execution modes](/tutorials/ide/execution-modes/).
{: .notice--info}

# Going further

- **The Language** takes your models past a single flat argument:
  [sub-conclusions](/tutorials/sub-conclusions/), [templates](/tutorials/templates/),
  [splitting models](/tutorials/modularity/), and the composition operators
  ([assemble](/tutorials/assemble/), [refine](/tutorials/refine/)).
- The **[runner](/tutorials/install/runner/)** (Homebrew, APT, or pip) makes justifications
  executable, all the way to [CI/CD integration](/tutorials/cicd/) under **Execution**.
