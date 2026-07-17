---
layout: single
classes: wide
title: Installing jPipe
permalink: /tutorials/install/
excerpt: "The three pieces of the jPipe ecosystem, and the fastest way to get started."
header:
  teaser: /assets/images/covers/setup.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/setup.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
toc: true
---

# Overview

The jPipe ecosystem is made of three components. You do **not** need all of them to get started —
in fact, the recommended path installs only one.

<div align="center">
<img src="/assets/images/tutorials/01_install/components.svg" alt="The three components of the jPipe ecosystem" style="max-width:100%"/>
</div>

| Component | What it is | When you need it |
|-----------|------------|------------------|
| **jPipe IDE** | A Visual Studio Code extension to author `.jd` files with syntax highlighting, a live diagram preview, and one-click export. | **Everyone — start here.** |
| **jPipe Compiler** | The `jpipe` command-line tool that parses, validates and exports models. | Scripting, automation, or if you prefer the terminal. The IDE can manage it for you (see below). |
| **jPipe Runner** | The execution environment that turns a justification into an *executable* check, typically in CI/CD. | Later, when you want your justification to be verified automatically. |

# The recommended path: the IDE

Thanks to the extension's **managed mode**, the IDE can download and run the compiler for you — so
for most people, *installing the IDE is the only step you need*. You write a `.jd` file, the
extension previews and validates it, and there is no separate command-line setup.

👉 **[Install the jPipe IDE →](/tutorials/install/ide/)**
{: .notice--success}

# Advanced: the command-line tools

If you want to run jPipe from a terminal, in scripts, or on a CI server, install the standalone
tools directly:

- **[Install the Compiler (CLI) →](/tutorials/install/compiler/)** — `jpipe` via Homebrew, APT, a
  JAR, or from source.
- **[Install the Runner →](/tutorials/install/runner/)** — `jpipe-runner` via Homebrew, APT, or pip.

# Which do I need?

- *"I just want to write and visualise justifications."* → **IDE only.**
- *"I want to compile models from the terminal or a script."* → IDE **+** Compiler CLI.
- *"I want my justification checked automatically in my pipeline."* → add the **Runner** (see the
  [CI/CD tutorial](/tutorials/cicd/)).

Once something is installed, jump into **[jPipe 101](/tutorials/jpipe101/)** to write your first
justification.
