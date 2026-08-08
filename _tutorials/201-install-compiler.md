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

Installing with a **package manager** (Homebrew, APT or Scoop, below) is the smoothest option: it
pulls in the correct dependencies (Java and Graphviz) for you. The manual JAR route works too, but
you install those prerequisites yourself.

Once the CLI is on your machine, we recommend switching the IDE to its **`cli`** execution mode, so
the editor and your terminal always run the exact same compiler version (see
[Install the IDE](/tutorials/install/ide/#other-execution-modes)).
{: .notice--info}

# 🍎 macOS (Homebrew)

We ship jPipe for macOS through [Homebrew](https://brew.sh), in the McSCert tap
([`jpipe-mcscert/homebrew-mcscert`](https://github.com/jpipe-mcscert/homebrew-mcscert)). With
Homebrew installed, tap that repository and install:

```
$ brew tap jpipe-mcscert/mcscert
$ brew install jpipe
```

# 🐧 Linux (APT)

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

# 🪟 Windows (Scoop)

We ship jPipe for Windows through [Scoop](https://scoop.sh), in the McSCert bucket
([`jpipe-mcscert/scoop-mcscert`](https://github.com/jpipe-mcscert/scoop-mcscert)). With Scoop
installed, open a PowerShell prompt and run:

```
PS> scoop install git
PS> scoop bucket add java
PS> scoop bucket add mcscert https://github.com/jpipe-mcscert/scoop-mcscert
PS> scoop install mcscert/jpipe
```

All four steps are required:

- **`git`**: `scoop bucket add` clones the bucket repository, so Scoop refuses to add a bucket
  without it.
- **the `java` bucket**: jPipe depends on `java/temurin25-jre`, and Scoop resolves dependencies
  only against buckets you have already added. It will *not* add a missing one for you, and the
  install fails if `java` is absent. Graphviz comes from `main`, which Scoop adds by default, so it
  needs no equivalent step.

**Troubleshooting**

- Windows packaging starts at **jPipe 2.3.0**. Asking for an older release
  (`scoop install mcscert/jpipe@2.2.0`) fails on a download error: those versions publish no
  Windows archive. Take them from the
  [releases page](https://github.com/jpipe-mcscert/jpipe-compiler/releases) instead.
- Running Windows Subsystem for Linux? The [APT route](#-linux-apt) above works unchanged inside
  your WSL distribution, but the resulting `jpipe` is a Linux binary, visible to WSL only.

# ☕️ Manual installation (JAR)

Prefer not to use a package manager? Run jPipe as a JAR.

**Prerequisites** (both on your `$PATH`):
- Java 25 (LTS): [Eclipse Temurin 25](https://adoptium.net/temurin/releases/?version=25), the same
  runtime our packages depend on
- Graphviz: [https://www.graphviz.org/download/](https://www.graphviz.org/download/)

### From an official release

1. Open the [jPipe Compiler releases page](https://github.com/jpipe-mcscert/jpipe-compiler/releases).
2. Download `jpipe-cli-<VERSION>.jar` from the **Assets** of the latest release.

   ![](/assets/images/tutorials/201_install_compiler/release.png)
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
