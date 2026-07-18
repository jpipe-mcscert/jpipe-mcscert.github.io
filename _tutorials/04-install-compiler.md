---
layout: single
classes: wide
title: "Install the Compiler (CLI)"
permalink: /tutorials/install/compiler/
excerpt: "Install the jpipe command-line compiler for terminals, scripts and CI."
header:
  teaser: /assets/images/covers/code.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/code.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

The **jPipe compiler** is the `jpipe` command-line tool: it parses `.jd` files, validates them, and
exports diagrams. Installing it as a standalone CLI lets you **script and automate** jPipe tasks
from a terminal, a build script, or a CI server.

Installing with a **package manager** (Homebrew or APT, below) is the smoothest option: it pulls in
the correct dependencies (Java and Graphviz) for you. The manual JAR route works too, but you
install those prerequisites yourself.

Once the CLI is on your machine, we recommend switching the IDE to its **`cli`** execution mode, so
the editor and your terminal always run the exact same compiler version (see
[Install the IDE](/tutorials/install/ide/#other-execution-modes)).
{: .notice--info}

# 🍎 macOS (Homebrew)

Tap the McSCert repository and install:

```
$ brew tap jpipe-mcscert/mcscert
$ brew install jpipe
```

# 🐧 Linux & Windows (WSL): APT

We build packages for the Ubuntu releases in active support, following our
[release-target policy](https://www.jpipe.org/jpipe-compiler/adr/0023-ubuntu-release-target-policy/):
every LTS from **24.04 (Noble)** onward while it stays in standard support, plus any interim release
still inside its 9-month support window. Add the McSCert Personal Package Archive (PPA):

```
$ sudo add-apt-repository ppa:mcscert/ppa
$ sudo apt update
$ sudo apt install jpipe
```

**Troubleshooting**

- If you see *`add-apt-repository: command not found`*, install the prerequisites:
  ```
  $ sudo apt update
  $ sudo apt install software-properties-common
  ```
- If you see *`Depends: openjdk-25-jre but it is not installable`*, your distribution doesn't ship
  Java 25 by default; add the OpenJDK 25 PPA to satisfy the requirement.

# ☕️ Manual installation (JAR)

Prefer not to use a package manager? Run jPipe as a JAR.

**Prerequisites** (both on your `$PATH`):
- Java 25 (LTS): [https://www.java.com/en/download/](https://www.java.com/en/download/)
- Graphviz: [https://www.graphviz.org/download/](https://www.graphviz.org/download/)

### From an official release

1. Open the [jPipe Compiler releases page](https://github.com/jpipe-mcscert/jpipe-compiler/releases).
2. Download `jpipe-cli-<VERSION>.jar` from the **Assets** of the latest release.

   ![](/assets/images/tutorials/04_install_compiler/release.png)
3. Move it somewhere on your machine (e.g. `~/bin`).
4. Add an alias to your shell profile (`.zshrc` or `.bashrc`):
   ```bash
   alias jpipe='java -jar ~/bin/jpipe.jar'
   ```

### From source

```
$ git clone https://github.com/jpipe-mcscert/jpipe-compiler.git
$ cd jpipe-compiler
jpipe-compiler $ mvn install
```

The fat JAR is produced at `jpipe-cli/target/jpipe-cli-<VERSION>.jar`; alias it as above.

# 🩺 Verify your installation

`jpipe doctor` confirms the compiler starts and can reach Graphviz:

```
$ jpipe doctor
McMaster University - McSCert (c) 2023-...
    _   ___ _
   (_) / _ (_)_ __   ___
   | |/ /_)/ | '_ \ / _ \
   | / ___/| | |_) |  __/
  _/ \/    |_| .__/ \___|
 |__/        |_|

jPipe 2.1.0
Checking external tools:
  dot (Graphviz): OK
```

# Next steps

- **[Write your first justification → jPipe 101](/tutorials/jpipe101/)**
- Point the IDE at this CLI by setting its execution mode to `cli` (see
  [Install the IDE](/tutorials/install/ide/#other-execution-modes)).
- **[Install the Runner](/tutorials/install/runner/)** to make justifications executable.
