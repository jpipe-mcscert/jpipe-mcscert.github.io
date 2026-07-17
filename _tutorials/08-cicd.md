---
layout: single
classes: wide
title: Justify every change - CI/CD integration
excerpt: "Run the jPipe Runner in GitHub Actions and post the diagram on every pull request."
permalink: /tutorials/cicd/
header:
  teaser: /assets/images/covers/execution.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/execution.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
toc: true
---

An executable justification is most valuable when it runs **on every change**. jPipe ships a GitHub
Action that runs the [Runner](/tutorials/runner/) in your pipeline, so each pull request is checked
against your argument — and the resulting diagram is posted right in the PR.

This builds directly on the [Runner tutorial](/tutorials/runner/): you need the compiled model
(`release.jd.json`) and your Python step library committed to the repository.
{: .notice--info}

# The workflow

Create `.github/workflows/jpipe.yml`:

```yaml
name: Justify the release

on:
  pull_request:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write        # push the generated diagram to a branch
  pull-requests: write   # comment on the PR

jobs:
  justify:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run the jPipe justification
        uses: jpipe-mcscert/jpipe-runner-action@main
        with:
          jd_file: "release.jd.json"
          library: |
            release_lib.py
          embed_image: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

On every pull request the action installs the runner, executes your justification against the
library, and — because `embed_image: true` — commits the coloured diagram and posts it back as a PR
comment.

# What the inputs mean

**Required**

| Input | Description |
|-------|-------------|
| `jd_file` | Path to the **compiled** justification (`.jd.json`). |
| `library` | One or more Python step libraries, one per line. |

**Common options**

| Input | Default | Description |
|-------|---------|-------------|
| `variable` | — | `NAME:VALUE` pairs, one per line, injected into the run. |
| `config-file` | — | A YAML config file instead of inline options. |
| `diagram` | `*` | Wildcard selecting which diagrams to run. |
| `format` | `svg` | Output image format. |
| `dry_run` | `false` | Validate the wiring without executing (see below). |
| `embed_image` | `false` | Post the diagram as a PR comment (needs `github-token`). |
| `image_branch` | `jpipe-runner-diagrams` | Branch the diagram is committed to. |

When `embed_image` is `true` you must pass `github-token` (the built-in `${{ secrets.GITHUB_TOKEN }}`
is enough), and the job needs `contents: write` and `pull-requests: write` permissions, as shown
above.

# Fail the build, or just report?

Two useful patterns:

- **Gate the merge.** Run for real (`embed_image: true`) and let a failing evidence node fail the
  job — the PR check goes red and the diagram shows exactly which claim broke.
- **Validate only.** Set `dry_run: true` to confirm the model and library still fit together
  (every evidence produces, every strategy's inputs are satisfied) without executing the checks —
  cheap protection against a model/library drift.

# The result

<!-- CAPTURE-SS: The GitHub Actions run summary for the "Justify the release" workflow (green check). -->
**📸 Screenshot needed:** the Actions run summary for *Justify the release* (passing).
{: .notice--warning}
![](/assets/images/tutorials/08_cicd/action-run.png)

<!-- CAPTURE-SS: The pull-request comment containing the embedded, coloured justification diagram. -->
**📸 Screenshot needed:** the PR comment with the embedded justification diagram.
{: .notice--warning}
![](/assets/images/tutorials/08_cicd/pr-comment.png)

<!-- CAPTURE-CAST (optional): open a PR -> the action runs -> the diagram comment appears. -->

# Where to next?

- Make the argument itself more reusable with **[Patterns](/tutorials/patterns/)** and
  **[Composition operators](/tutorials/operators/)**.

Full action reference:
[jpipe-runner/docs/ACTION.md](https://github.com/jpipe-mcscert/jpipe-runner/blob/main/docs/ACTION.md).
