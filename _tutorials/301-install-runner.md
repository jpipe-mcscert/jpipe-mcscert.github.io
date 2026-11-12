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
the correct dependencies (Python, and Graphviz for the diagrams) for you. The `pip` route works too, but you provide
those prerequisites yourself. On **Windows** the runner has no native package yet, so `pip` is the
route to take.

You only need the runner once you want your justification *checked*, not just drawn. If you are only
authoring models, the [compiler](/tutorials/install/compiler/) and the
[IDE](/tutorials/install/ide/) are enough.
{: .notice--info}

**Coming from version 3?** The runner was rewritten for version 4: step libraries are written
differently and the command line changed, so a v3 library does not run on v4 unchanged. The
[migration guide](https://github.com/jpipe-mcscert/jpipe-runner/blob/main/docs/migration-v3-v4.md)
takes a v3 library to v4, change by change. The tutorials on this site all use version 4.
{: .notice--warning}

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

Unlike the compiler, the runner has **no Windows package** yet: install it from PyPI. Python, and
Graphviz for the diagrams, come from [Scoop](https://scoop.sh), the same tool that installs the
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

**Prerequisites** (on your `$PATH`):
- Python 3.11 or newer: [https://www.python.org/downloads/](https://www.python.org/downloads/)
- Graphviz, to draw diagrams (a run without `--diagram` or `--dataflow` does not need it):
  [https://www.graphviz.org/download/](https://www.graphviz.org/download/)

### From PyPI

The checks you will write are Python code, and they run on the same Python as the runner. A virtual
environment keeps the runner next to whatever packages your checks import:

```
$ python3 -m venv .venv
$ . .venv/bin/activate
$ pip install jpipe-runner
```

### From source

```
$ git clone https://github.com/jpipe-mcscert/jpipe-runner.git
$ cd jpipe-runner
jpipe-runner $ pip install .
```

# 🩺 Verify your installation

`jpipe-runner --version` prints the installed version:

```
$ jpipe-runner --version
jpipe-runner 4.0.0
```

Any `4.x` version follows these tutorials. `jpipe-runner -h` lists every option, and ends with the
exit codes a CI pipeline can act on:

```
$ jpipe-runner -h
usage: jpipe-runner [-h] -l PATH [-p DIR] [--strict] [--dry-run] [--json]
                    [--report PATH] [--diagram PATH] [--dataflow PATH]
                    [--colour {auto,always,never}] [-v | -q] [--version]
                    JUSTIFICATION

Run a jPipe justification against the Python step libraries that implement its
evidence and its reasoning, and report its verdict.
...
```

# Next steps

With the runner in place, the **[Runner tutorial](/tutorials/runner/)** walks you through binding a
justification's evidence to real Python checks and reading the result; from there,
**[CI/CD integration](/tutorials/cicd/)** runs that check on every push. Since the runner executes
the compiler's JSON output rather than the `.jd` source, you will also want the
**[compiler](/tutorials/install/compiler/)** on hand to produce it, and to write the skeleton of your
checks.
