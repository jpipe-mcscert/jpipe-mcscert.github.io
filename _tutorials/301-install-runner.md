---
layout: single
classes: wide
title: "Install the Runner"
permalink: /tutorials/install/runner/
excerpt: "Install jpipe-runner, the execution environment for justifications."
header:
  teaser: /assets/images/covers/race_start.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/race_start.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

The **jPipe Runner** is the `jpipe-runner` command-line tool: it binds each piece of evidence to a
real check written in Python, runs those checks against a compiled justification, and renders a
diagram **coloured by the result**. Installing it lets you **execute and verify** justifications from
a terminal, a build script, or a CI server.

Installing with a **package manager** (Homebrew or APT, below) is the smoothest option: it pulls in
the correct dependencies (Python and Graphviz) for you. The `pip` route works too, but you provide
those prerequisites yourself. On **Windows** the runner has no native package yet, so `pip` is the
route to take.

You only need the runner once you want your justification *checked*, not just drawn. If you are only
authoring models, the [compiler](/tutorials/install/compiler/) and the
[IDE](/tutorials/install/ide/) are enough.
{: .notice--info}

# 🍎 macOS (Homebrew)

Tap the McSCert repository and install:

```
$ brew tap jpipe-mcscert/mcscert
$ brew install jpipe-runner
```

# 🐧 Linux (APT)

We build packages for the Ubuntu releases in active support, following our
[release-target policy](https://www.jpipe.org/jpipe-compiler/adr/0023-ubuntu-release-target-policy/):
every LTS from **24.04 (Noble)** onward while it stays in standard support, plus any interim release
still inside its 9-month support window. Add the McSCert Personal Package Archive (PPA):

```
$ sudo add-apt-repository ppa:mcscert/ppa
$ sudo apt update
$ sudo apt install jpipe-runner
```

**Troubleshooting**

- If you see *`add-apt-repository: command not found`*, install the prerequisites:
  ```
  $ sudo apt update
  $ sudo apt install software-properties-common
  ```

# 🪟 Windows (pip)

Unlike the compiler, the runner has **no Windows package** yet: install it from PyPI. Its two
prerequisites come from [Scoop](https://scoop.sh), the same tool that installs the
[compiler](/tutorials/install/compiler/#-windows-scoop):

```
PS> scoop install python
PS> scoop install graphviz
PS> pip install jpipe-runner
```

Scoop puts Python's `Scripts` directory on your `PATH`, so `jpipe-runner` is available in a fresh
PowerShell prompt once `pip` finishes. Running Windows Subsystem for Linux instead? The
[APT route](#-linux-apt) above works unchanged inside your WSL distribution.

# 🐍 Manual installation (pip)

Prefer not to use a package manager? The runner is a Python package, so install it with `pip`.

**Prerequisites** (both on your `$PATH`):
- Python 3.11 or newer: [https://www.python.org/downloads/](https://www.python.org/downloads/)
- Graphviz: [https://www.graphviz.org/download/](https://www.graphviz.org/download/)

### From PyPI

```
$ pip install jpipe-runner
```

### From source

```
$ git clone https://github.com/jpipe-mcscert/jpipe-runner.git
$ cd jpipe-runner
jpipe-runner $ pip install .
```

# 🩺 Verify your installation

`jpipe-runner -h` prints its banner (with the installed version) and the usage summary:

```
$ jpipe-runner -h
usage: jpipe-runner [-h] [--variable VARIABLE] [--library LIBRARY]
                    [--diagram PATTERN]
                    [--format {dot,gif,jpeg,jpg,pdf,png,svg}]
                    [--output-path PATH] [--dry-run] [--verbose]
                    [--config-file CONFIG_FILE] [--python-path PYTHON_PATH]
                    jd_file

McMaster University - McSCert (c) 2023-... - Version 3.5.3
    _ ____  _               ____
   (_)  _ \(_)_ __   ___   |  _ \ _   _ _ __  _ __   ___ _ __
   | | |_) | | '_ \ / _ \  | |_) | | | | '_ \| '_ \ / _ \ '__|
   | |  __/| | |_) |  __/  |  _ <| |_| | | | | | | |  __/ |
  _/ |_|   |_| .__/ \___|  |_| \_\\__,_|_| |_|_| |_|\___|_|
 |__/        |_|
```

# Next steps

With the runner in place, the **[Runner tutorial](/tutorials/runner/)** walks you through binding a
justification's evidence to real Python checks and reading the coloured result; from there,
**[CI/CD integration](/tutorials/cicd/)** runs that check on every push. Since the runner executes
the compiler's JSON output rather than the `.jd` source, you will also want the
**[compiler](/tutorials/install/compiler/)** on hand to produce it.
