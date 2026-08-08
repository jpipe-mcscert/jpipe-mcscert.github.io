---
layout: single
classes: wide
title: "IDE Execution Modes"
permalink: /tutorials/ide/execution-modes/
excerpt: "Teach the extension where to find a compiler: yours, a JAR, or one it downloads."
header:
  teaser: /assets/images/covers/blueprint.png
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/blueprint.png
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

When you followed [Install the IDE](/tutorials/install/ide/), the extension found your compiler
without being told anything. In this tutorial you will look at *why* that worked, and learn what to
do when it cannot: on a machine with no package manager, or in a project that has to be built with
one specific compiler version.

# The extension does not contain a compiler

Start from that fact, because everything on this page follows from it.

The extension carries its own language server, which is what highlights your `.jd` files, validates
them as you type, and answers completion, hover and go-to-definition. But the moment you ask for a
*picture*, a preview, an export or the diagnostic view, it has to hand your model to the `jpipe`
compiler and wait for the answer. That compiler is never in the box.

This is a deliberate choice, and a security one. Bundling the compiler would mean that installing an
editor plugin silently drops an executable onto your machine and runs it, which is precisely the
supply-chain move that makes extensions worth worrying about. **We would rather ship no binaries at
all.** By default the extension runs a compiler *you* installed, from a channel you already trust:
Homebrew, an Ubuntu PPA, or Scoop, each of which you can inspect, pin, update and uninstall with the
same tooling you use for everything else on that machine. Nothing arrives behind your back.

That leaves the interesting case, the machine where you cannot install anything. The extension can
fetch a compiler for you there, but downloading and running code someone else published is a
decision, so the extension treats it as one: it happens only when you ask for it, by name.
`managed` mode is that consent, made explicit. The
[section below](#-managed-a-release-the-extension-fetches) covers what it does to keep it honest.

# One question, three answers

Every time it renders, the extension has to answer one question: **where is the compiler?** The
**execution mode** setting is where you answer it, and there are three possible answers:

- **`cli`**: *"it is already on this machine, and the system knows where."* The extension runs the
  `jpipe` command, letting your `PATH` resolve it, exactly as your terminal would.
- **`jar`**: *"it is this exact file."* You give it the path to a compiler JAR, and it runs that JAR
  with your `java`.
- **`managed`**: *"you go and get one."* The extension downloads a published release and keeps it in
  its own private storage.

![](/assets/images/tutorials/401_execution_modes/execution-mode.png)

Notice what the three answers have in common: they all end with a compiler running on **your**
machine. None of them installs the two things that compiler needs, **Java 25 or newer** and
**Graphviz**. Changing modes changes where the compiler comes from, never what it runs on, so if a
preview fails for a missing `dot`, switching modes will not fix it. Installing with
[a package manager](/tutorials/install/compiler/) is the one route that brings the runtime along.
{: .notice--warning}

# 🩺 Which mode am I in?

You already know how to answer this: it is the same check you ran at the end of the IDE install.
Open the Command Palette (`Ctrl+Shift+P` / `⇧⌘P`), run **jPipe: Check jPipe Installation**, and read
the first line of the report. It names the mode that is active and the compiler that mode resolved
to, which together tell you exactly what your previews are being drawn by.

To change the answer, open the **jPipe settings**: click the gear icon on **jPipe Language
(McSCert)** in the Extensions view and choose **Settings**, or press `Ctrl+,` / `⌘,` and search for
*jPipe*. **Execution Mode** sits at the top, the path settings for each mode are underneath it, and
the two links you will use in this tutorial, **Install from GitHub Release** and **Check jPipe
installation**, sit between them.

![](/assets/images/tutorials/401_execution_modes/settings.png)

Take the tour of the three modes below in any order. Each one explains what it is for and the single
setting that goes with it.

# 💻 `cli`: the compiler you installed

This is the mode you are already in, because it is the default. It has exactly one setting, **CLI:
Path**, and it starts as the bare word `jpipe`.

A bare word matters here: because it is a name and not a location, the extension hands it to the
operating system and lets your `PATH` resolve it fresh on every run, which is how it found a
compiler you never told it about. It also means your editor and your terminal are guaranteed to be
running the same binary, so a model that previews correctly cannot fail in your build for a
version-mismatch reason.

Change **CLI: Path** to an absolute path when you keep `jpipe` somewhere your `PATH` does not
reach, or when you have several compilers installed and want the editor to use one in particular:

```
/opt/jpipe/2.3.0/bin/jpipe
```

If a preview suddenly fails in this mode, run `jpipe doctor` in a terminal first. `cli` mode makes
that a genuine diagnosis: the terminal and the editor are looking at the same compiler, so whatever
the terminal reports is what the editor is hitting too.

# ☕ `jar`: a JAR you point at

Reach for this mode when the compiler you want to use is a file rather than an installation, which
in practice means you built it yourself. If you have cloned the compiler and run `mvn install` (see
[from source](/tutorials/install/compiler/#from-source)), your fresh build is sitting at
`jpipe-cli/target/jpipe-cli-<VERSION>.jar`, and this mode lets the editor preview with it.

Three settings apply:

- **JAR: File**, the absolute path to the JAR. This is the one you must set.
- **JAR: Java Executable**, the `java` used to run it. It defaults to the bare name `java`, resolved
  through your `PATH`. Set it to an absolute path when that `java` is not the one you want, which is
  worth checking: a JAR built for Java 25 fails with an unhelpful error under an older runtime.
- **JVM Args**, extra arguments passed to the JVM, for the rare model that needs a bigger heap.

Because the path points at one specific file, rebuilding the compiler updates what the editor uses
with no further action. That makes this the mode to be in while you are working *on* jPipe, and the
mode to leave once you go back to working *with* it.

# 📦 `managed`: a release the extension fetches

The other two modes assume you can put a compiler on the machine yourself. This one does not.
Instead of asking you for a compiler, the extension goes and gets one: you pick a published release
from a list, and it downloads that release into its own storage.

That makes it the answer for a locked-down machine, where you can install a VS Code extension but
not run a package manager, and nothing lands outside the extension's own folder.

## What you are agreeing to

Using this mode means asking a program to download an executable and then run it, so it is worth
knowing exactly what the extension will and will not do on your behalf:

- **It downloads nothing until you ask.** There is no fetch on install, none on startup, and none
  the first time a preview fails. A download happens only when you run the install command and pick
  a release from the list.
- **It only talks to GitHub.** Requests are HTTPS-only and restricted to GitHub's own hosts, with a
  hard limit on redirects, so a hijacked link cannot walk the download somewhere else. The releases
  come from `jpipe-mcscert/jpipe-compiler`.
- **A half-finished download is never run.** The JAR is written to a temporary file, checked against
  the size GitHub reports for that asset, and only then moved into place under its real name. Its
  SHA-256 is recorded in the jPipe output panel if you want to compare it against the release.
- **It never swaps your compiler silently.** Updates are offered in a notification and applied only
  when you accept, so the version you chose stays until you choose another.

The one setting that changes any of this is the advanced **Repository** option
(`jpipe.managedRepository`), which points the picker at a different GitHub repository. Pointing it
at a fork means running that fork's code, so treat it as you would any other "run code from a
stranger" switch: leave it alone unless you own the fork.
{: .notice--info}

But its real strength is that it turns the compiler into something you can **change your mind
about**. Downloading a different release is a two-click operation, so you can move between versions
as easily as you switch a branch.

## Picking a version

1. Open the Command Palette and run **jPipe: Install Compiler from GitHub Release**, or click
   **Install from GitHub Release** on the settings page.
2. Choose a release from the list.

   ![](/assets/images/tutorials/401_execution_modes/release-picker.png)

3. There is no third step. Once the download succeeds, the extension switches **Execution Mode** to
   `managed` for you and starts previewing with what it just fetched.

Run the same command whenever you want a different version. Releases you have already downloaded are
reused rather than fetched again, so switching back and forth is quick.

Check the result the usual way: the report now names the release it is running.

![](/assets/images/tutorials/401_execution_modes/diagnostic-managed.png)

## Being told when a new version ships

A compiler you downloaded by hand is a compiler you have to remember to update. Managed mode is the
only mode that keeps track for you: on startup it compares your release against the latest published
one, and when yours is behind it offers the update in a notification. It **never** updates silently,
so a version you deliberately chose stays put until you say otherwise.

Three settings shape that behaviour, all under **jPipe: Managed Compiler**:

- **Check For Updates**, on by default. Turn it off to freeze your compiler entirely.
- **Update Check Interval Hours**, 24 by default. The check runs at startup at most this often, so
  raising it makes the prompt rarer.
- **Include Prereleases**, off by default. Turn it on to see prereleases in the version list, which
  is how you try a build before it is announced.

## Pinning a project to a version

Everything above is a personal choice, but a version can also belong to a *project*. Because these
are ordinary VS Code settings, a workspace can override them: commit a `.vscode/settings.json`
alongside a model that has to be built with a particular compiler, and everyone who opens that
folder gets it.

```json
{
  "jpipe.executionMode": "managed"
}
```

This is what makes the mode worth knowing about even when you do have a package manager: a
repository whose pipeline still builds with an older compiler can be edited against that same
compiler, while every other project on your machine goes on using the current one from your `PATH`.

## Going back

Set **Execution Mode** back to `cli`, or delete the setting to fall back to the default, and confirm
**CLI: Path** reads `jpipe`. Downloaded releases are left where they are, so returning to `managed`
later costs nothing but the click.

# Next steps

- Run the check once more so you finish this tutorial knowing which compiler your editor is using.
- **[Install the Runner](/tutorials/install/runner/)** to make your justifications executable, then
  run them in **[CI/CD](/tutorials/cicd/)**.
