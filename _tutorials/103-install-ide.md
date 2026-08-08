---
layout: single
classes: wide
title: "Install the jPipe IDE"
permalink: /tutorials/install/ide/
excerpt: "Install the VS Code extension; it picks up the compiler you already installed."
header:
  teaser: /assets/images/covers/panel.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/panel.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

The jPipe IDE is a [Visual Studio Code](https://code.visualstudio.com/) extension. It gives you
syntax highlighting for `.jd` files, validation as you type, completion, hover and go-to-definition,
plus a **live diagram preview** and export to SVG/PNG/JSON and more.

Those two halves come from different places. Everything the *editor* knows about the language ships
inside the extension itself, so it works the moment you install it. Everything that produces a
*picture*, the preview, the exports and the diagnostic view, is the compiler doing the work.

This page assumes you have already **[installed the compiler](/tutorials/install/compiler/)**. If
you have not, start there: it is one command, and it brings Java and Graphviz with it.
{: .notice--info}

# Install the extension

The extension is published on the Visual Studio Marketplace as
[**jPipe Language (McSCert)**](https://marketplace.visualstudio.com/items?itemName=mcscert.jpipe-extension).
Install it straight from that page, or from inside the editor:

1. Launch Visual Studio Code.
2. Open the **Extensions** view (`Ctrl+Shift+X` / `⇧⌘X`).
3. Search for **jPipe**.
4. Choose **jPipe Language (McSCert)** (publisher `mcscert`) to be sure you have the official tool.
5. Click **Install**.

![](/assets/images/tutorials/103_install_ide/marketplace.png)

The extension activates automatically whenever you open a `.jd` (Justification Diagram) file.

That is the whole installation: there is nothing to point at your compiler. The extension ships in
**`cli`** execution mode with its **CLI path** set to plain `jpipe`, a name it resolves through your
`PATH` every time it runs the compiler. So it picks up the `jpipe` your package manager installed on
its own, and your editor and your terminal always run the exact same compiler.

Two situations do call for a setting: `jpipe` living somewhere unusual that is not on your `PATH`,
and wanting the extension to download and manage a compiler instead of using yours. Both are covered
in [IDE execution modes](/tutorials/ide/execution-modes/).
{: .notice--info}

# Verify the setup

1. Open the Command Palette (`Ctrl+Shift+P` / `⇧⌘P`) and run **jPipe: Check jPipe Installation**.
   The same check is one click away on the jPipe settings page.

   **📸 Screenshot needed:** invoking the check, either the Command Palette filtered on *jPipe:
   Check jPipe Installation* or the **Check jPipe installation** link on the settings page.
   {: .notice--warning}
   ![](/assets/images/tutorials/103_install_ide/check.png)

2. Read the report: it names the active execution mode, the compiler it resolved, and whether
   Graphviz answered.

   **📸 Screenshot needed:** the result dialog in `cli` mode, showing the resolved compiler and
   `dot (Graphviz): OK`.
   {: .notice--warning}
   ![](/assets/images/tutorials/103_install_ide/diagnostic.png)

🎉 That's it: you can now open a `.jd` file and use **jPipe: Open Diagram Preview**. 
Head to [jPipe 101](/tutorials/jpipe101/) to write your first model.
{: .notice--success}

# Next steps

- **[Write your first justification → jPipe 101](/tutorials/jpipe101/)**
- No package manager on this machine, or a project that needs a specific compiler version?
  **[IDE execution modes](/tutorials/ide/execution-modes/)** covers letting the extension download
  and manage a compiler itself.
