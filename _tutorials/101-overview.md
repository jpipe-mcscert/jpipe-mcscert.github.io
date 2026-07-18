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
<img src="/assets/images/tutorials/101_overview/components.svg" alt="The jPipe IDE is the starting point; the compiler and runner are optional command-line tools for terminals and CI/CD" style="max-width:75%"/>
</div>

This section takes you from a blank editor to your first justification. Before you install
anything, here is the map of the tools you will meet.

# The three tools


| Tool | What it does | When you need it |
|------|--------------|------------------|
| **jPipe IDE** | A Visual Studio Code extension to author `.jd` files, with syntax highlighting, a live diagram preview, and one-click export. | **Everyone starts here.** |
| **jPipe Compiler** | The `jpipe` command-line tool that parses, validates, and exports models. In *managed mode* the IDE downloads and runs it for you. | Scripting, automation, or if you prefer the terminal. |
| **jPipe Runner** | The `jpipe-runner` tool that turns a justification into an *executable* check against real data. | When you want the argument verified automatically, typically in CI/CD. |

# Where to start: the IDE

Thanks to the extension's **managed mode**, the IDE can download and run the compiler for you, so
for most people *installing the IDE is the only step you need*. You write a `.jd` file, the
extension previews and validates it, and there is no separate command-line setup.

1. **[Install the IDE](/tutorials/install/ide/)**: the one tool most readers need.
2. **[jPipe 101](/tutorials/jpipe101/)**: write, preview, and export your first justification.

# Going further: the command-line tools

You do not need these to get started, and you can always add them later. Reach for them when you
outgrow the editor:

- **[The Compiler](/tutorials/install/compiler/)** installs the `jpipe` CLI (Homebrew, APT, a JAR,
  or from source) for scripting and automation. It is the home of the [language
  reference](/tutorials/language/), [patterns](/tutorials/patterns/), and [composition
  operators](/tutorials/operators/).
- **[The Runner](/tutorials/install/runner/)** installs `jpipe-runner` (Homebrew, APT, or pip) to
  make justifications executable, all the way to [CI/CD integration](/tutorials/cicd/).

From there, follow **The Compiler** when you want to work from a terminal, and **The Runner** when
you want your justifications checked automatically.
