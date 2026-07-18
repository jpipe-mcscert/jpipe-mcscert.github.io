---
layout: single
classes: wide
title: Install the jPipe Runner
permalink: /tutorials/install/runner/
excerpt: "Install jpipe-runner, the execution environment for justifications."
header:
  teaser: /assets/images/covers/run.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/run.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

# Overview

The **jPipe Runner** (`jpipe-runner`) executes a justification: it binds each piece of evidence to a
real check written in Python, runs them, and renders a diagram coloured by the result. It is the
piece you use to verify justifications automatically — see the [Runner tutorial](/tutorials/runner/)
and [CI/CD integration](/tutorials/cicd/).

You only need the runner once you want your justification *checked*, not just drawn. If you are just
authoring models, the [IDE](/tutorials/install/ide/) is enough.
{: .notice--info}

# 🍎 macOS (Homebrew)

If you have already tapped the McSCert repository (see the
[compiler install](/tutorials/install/compiler/)):

```
$ brew install jpipe-runner
```

# 🐧 Linux & Windows (WSL) — APT

If you have already added McSCert's PPA:

```
$ sudo apt install jpipe-runner
```

# 🐍 Any platform — pip

```
$ pip install jpipe-runner
```

# Verify your installation

```
$ jpipe-runner -h
usage: jpipe-runner [-h] [--variable VARIABLE] [--library LIBRARY]
                    [--diagram PATTERN]
                    [--format {dot,gif,jpeg,jpg,pdf,png,svg}]
                    [--output-path PATH] [--dry-run] [--verbose]
                    [--config-file CONFIG_FILE]
                    jd_file
```

You are ready to make a justification executable. Continue with the
**[Runner tutorial →](/tutorials/runner/)**.
