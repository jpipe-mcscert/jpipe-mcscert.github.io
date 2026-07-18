---
layout: single
classes: wide
title: Install the jPipe IDE
permalink: /tutorials/install/ide/
excerpt: "Install the VS Code extension and let it manage the compiler for you."
header:
  teaser: /assets/images/covers/panel.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/panel.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

The jPipe IDE is a [Visual Studio Code](https://code.visualstudio.com/) extension. It gives you
syntax highlighting for `.jd` files, a **live diagram preview**, validation as you type, and export
to SVG/PNG/JSON and more.

This is the **recommended way to start**: with the extension's *managed mode* you never have to
install the compiler by hand, because the IDE downloads and runs it for you.

# Step 1: Install the extension

1. Launch Visual Studio Code.
2. Open the **Extensions** view (`Ctrl+Shift+X` / `⇧⌘X`).
3. Search for **jPipe**.
4. Choose **jPipe Language (McSCert)** (publisher `mcscert`) to be sure you have the official tool.
5. Click **Install**.

![](/assets/images/tutorials/02_install_ide/marketplace.png)

The extension activates automatically whenever you open a `.jd` (Justification Diagram) file.

# Step 2: Let the IDE install the compiler (managed mode)

The extension needs a compiler to render and validate your models. The easiest option, and the one
we recommend (especially on Windows), is **managed mode**, where the extension fetches the compiler
for you.

**Prerequisites:** managed mode downloads the compiler JAR, but it does not install what that JAR
needs to run. Make sure you already have **Java 25 or newer**
([download](https://www.java.com/en/download/)) and **Graphviz**
([download](https://www.graphviz.org/download/)) installed and on your `PATH`: the IDE runs the JAR
with your Java, and calls Graphviz to render the diagrams.
{: .notice--warning}

1. Open the **jPipe settings**. In the Extensions view, click the gear icon on **jPipe Language
   (McSCert)** and choose **Settings**, or open VS Code Settings (`Ctrl+,` / `⌘,`) and search for
   *jPipe*.

   ![](/assets/images/tutorials/02_install_ide/settings.png)

2. Click **Install from GitHub Release**. The extension fetches the list of published compiler
   releases.

3. Select the compiler version you want from the list. The extension downloads that release's JAR
   over HTTPS into its own private storage.

   ![](/assets/images/tutorials/02_install_ide/release-picker.png)

4. Back in the settings, set the **execution mode** dropdown to **managed** (rather than **cli**).
   The IDE now runs the compiler it just downloaded.

   ![](/assets/images/tutorials/02_install_ide/execution-mode.png)

# Verify the setup

Click on **Check jPipe Installation** from the **Settings** page. It reports which execution mode is
active and whether the compiler (and Graphviz) can be reached.

![](/assets/images/tutorials/02_install_ide/diagnostic.png)

🎉 That's it: you can now open a `.jd` file and use **jPipe: Open Diagram Preview**. 
Head to [jPipe 101](/tutorials/jpipe101/) to write your first model.
{: .notice--success}

# Other execution modes

Managed mode is the recommended default, but the **execution mode** dropdown offers three choices,
depending on where you want the compiler to come from:

- **`managed`**: the extension downloads a published compiler release and runs it for you (Step 2
  above). The simplest option, and the one most people want.
- **`cli`**: the extension uses the `jpipe` already installed on your machine, so your terminal and
  your IDE always run the exact same compiler. Pick this once you have [installed the compiler
  CLI](/tutorials/install/compiler/).
- **`jar`**: the extension runs a compiler JAR you downloaded yourself. Mostly a developer option,
  handy for trying an unreleased build of the compiler.

# Next steps

- **[Write your first justification → jPipe 101](/tutorials/jpipe101/)**
- Prefer the terminal? **[Install the Compiler CLI](/tutorials/install/compiler/)**.
