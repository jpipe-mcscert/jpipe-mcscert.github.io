---
layout: single
classes: wide
title: Install the jPipe IDE
permalink: /tutorials/install/ide/
excerpt: "Install the VS Code extension and let it manage the compiler for you."
header:
  teaser: /assets/images/covers/painting.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/painting.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
toc: true
---

# Overview

The jPipe IDE is a [Visual Studio Code](https://code.visualstudio.com/) extension. It gives you
syntax highlighting for `.jd` files, a **live diagram preview**, validation as you type, and export
to SVG/PNG/JSON and more.

This is the **recommended way to start**: with the extension's *managed mode* you never have to
install the compiler by hand — the IDE downloads and runs it for you.

# Step 1 — Install the extension

1. Launch Visual Studio Code.
2. Open the **Extensions** view (`Ctrl+Shift+X` / `⇧⌘X`).
3. Search for **jPipe**.
4. Choose **jPipe Language (McSCert)** (publisher `mcscert`) to be sure you have the official tool.
5. Click **Install**.

<!-- CAPTURE-SS: VS Code Extensions view, search "jPipe", the "jPipe Language (McSCert)" result highlighted. -->
**📸 Screenshot needed:** the Extensions view with the *jPipe Language (McSCert)* result selected.
{: .notice--warning}
![](/assets/images/tutorials/01_install/marketplace.png)

The extension activates automatically whenever you open a `.jd` (Justification Diagram) file.

# Step 2 — Let the IDE install the compiler (managed mode)

The extension needs a compiler to render and validate your models. The easiest option — and the one
we recommend, especially on Windows — is **managed mode**, where the extension fetches the compiler
for you.

1. Open the **Command Palette** (`Ctrl+Shift+P` / `⇧⌘P`).
2. Run **jPipe: Install Compiler from GitHub Release**.

   <!-- CAPTURE-SS: Command Palette showing "jPipe: Install Compiler from GitHub Release". -->
   **📸 Screenshot needed:** the Command Palette with *jPipe: Install Compiler from GitHub Release* highlighted.
   {: .notice--warning}
   ![](/assets/images/tutorials/02_install_ide/managed-command.png)

3. Pick a compiler version from the list. The extension downloads that release's JAR over HTTPS into
   its own private storage.

   <!-- CAPTURE-SS: The quick-pick list of available compiler releases. -->
   **📸 Screenshot needed:** the release-picker quick-pick listing available compiler versions.
   {: .notice--warning}
   ![](/assets/images/tutorials/02_install_ide/release-picker.png)

4. When it finishes, the extension switches to `managed` execution mode and confirms with a
   notification.

   <!-- CAPTURE-SS: The "installed and activated (managed mode)" notification. -->
   **📸 Screenshot needed:** the *"jPipe … installed and activated (managed mode)"* notification.
   {: .notice--warning}
   ![](/assets/images/tutorials/02_install_ide/managed-activated.png)

<!-- CAPTURE-CAST (optional): a short screencast of the whole managed-install flow. -->
That's it — you can now open a `.jd` file and use **jPipe: Open Diagram Preview**. Head to
[jPipe 101](/tutorials/jpipe101/) to write your first model.
{: .notice--success}

# Other execution modes

Managed mode is the default recommendation, but the extension supports three modes, set via the
`jpipe.executionMode` setting:

| Mode | How it runs the compiler | Relevant settings |
|------|--------------------------|-------------------|
| `managed` | The extension downloads and runs a release JAR (Step 2 above). | `jpipe.managedCheckForUpdates`, `jpipe.managedIncludePrereleases` |
| `path` | Uses a `jpipe` executable already on your `PATH`. | `jpipe.cliPath` |
| `jar` | Runs a JAR you downloaded yourself, via `java`. | `jpipe.jarFile`, `jpipe.javaExecutable` |

If you have already [installed the compiler CLI](/tutorials/install/compiler/), pick `path` mode
instead — the extension will call your system `jpipe`.

# Verify the setup

Run **jPipe: Check jPipe Installation** from the Command Palette. It reports which execution mode is
active and whether the compiler (and Graphviz) can be reached.

# Next steps

- **[Write your first justification → jPipe 101](/tutorials/jpipe101/)**
- Prefer the terminal? **[Install the Compiler CLI](/tutorials/install/compiler/)**.
