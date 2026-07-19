---
layout: single
classes: wide
title: Justify every change - CI/CD with GitHub Actions
excerpt: "Re-validate a justification in GitHub Actions and catch decision drift before it ships."
permalink: /tutorials/cicd/
header:
  teaser: /assets/images/covers/execution.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/execution.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

A justification is a snapshot of a decision: *at the moment you wrote it*, every claim held. But code,
dependencies, and documents keep moving, and a fact you validated long ago can quietly stop being
true. That is **decision drift**: the argument still *looks* fine on the page, yet one of its claims no
longer holds, and the conclusion it once supported is now in jeopardy with nobody noticing.

The cure is to stop trusting the drawing and re-check the argument **against reality, automatically**.
jPipe ships a GitHub Action that runs the [Runner](/tutorials/runner/) in your pipeline, so the whole
justification is re-validated whenever you ask, and a drifted claim surfaces as a failed check instead
of a silent lie.

This builds on the [Runner tutorial](/tutorials/runner/): commit its compiled model
(`run/release.jd.json`) and step library (`run/release_lib.py`) to the repository, here under a
`release-example/` project folder.
{: .notice--info}

# The workflow

Create `.github/workflows/jpipe.yml`. Any regular GitHub Actions trigger works here, a `push`, a
`pull_request`, a schedule, so the justification can be re-validated on whatever event matters to you
(we wire those up [at the end](#from-demo-to-guardrail)). For this demonstration, though, we trigger
it **by hand** with `workflow_dispatch` and expose one input, the version the changelog will announce,
so you can watch the argument hold and then drift on command:

{% raw %}
```yaml
name: Justify the release

on:
  workflow_dispatch:
    inputs:
      changelog_version:
        description: "Version the changelog will announce (try 2.0, then 1.9)"
        default: "2.0"

permissions:
  contents: write        # push the generated diagram to a branch
  pull-requests: write   # comment on a pull request

jobs:
  justify:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Prepare the mock evidence
        working-directory: release-example
        env:
          CHANGELOG_VERSION: ${{ inputs.changelog_version }}
        run: |
          mkdir -p mock
          touch mock/tests.ok
          echo "## $CHANGELOG_VERSION" > mock/CHANGELOG.md

      - name: Run the jPipe justification
        uses: jpipe-mcscert/jpipe-runner@v3.5.3
        with:
          working_directory: release-example
          jd_file: "run/release.jd.json"
          library: |
            run/release_lib.py
          embed_image: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
{% endraw %}

The middle step is the demonstration's trick: it fabricates the same `mock/` evidence you used
locally, but writes the changelog from the `changelog_version` input passed in as an environment
variable. In a real project you would **delete this step**, since the changelog and test results
already live in the repository, and let the action check them as they are. The final step installs the
runner, executes your justification against the library, and (`embed_image: true`) commits the coloured
diagram, posting it back as a comment when the run belongs to a pull request. Both steps run inside
`release-example/` (the `working-directory` / `working_directory` keys), where the project's `run/`
and `mock/` folders live, so every path in the workflow stays relative to it.

# Run it: the argument holds

Push the workflow, open the repository's **Actions** tab, choose *Justify the release*, and click
**Run workflow**. Leave `changelog_version` at its default `2.0` and launch. The changelog the step
writes names `2.0`, every gate passes, and the run is green:

<!-- CAPTURE-SS: The Actions "Run workflow" dispatch with changelog_version=2.0, and the resulting green run. -->
**📸 Screenshot needed:** the manual run with `changelog_version` = `2.0`, passing (green).
{: .notice--warning}
![](/assets/images/tutorials/303_cicd/run-passing.png)

# ...until a decision drifts

Run it again, but set `changelog_version` to `1.9`, as if the release were cut while the changelog was
never updated past the previous version. The step now writes a changelog that never mentions `2.0`, so
*"the changelog is up to date"* fails, the strategy and conclusion above it are skipped, and the run
goes red:

<!-- CAPTURE-SS: The manual run with changelog_version=1.9, failing (red), showing the changelog evidence failed. -->
**📸 Screenshot needed:** the manual run with `changelog_version` = `1.9`, failing (red).
{: .notice--warning}
![](/assets/images/tutorials/303_cicd/run-failing.png)

That red check is decision drift caught in the act: nothing about the *argument* changed, only the
world it describes, and the pipeline refused to let the stale claim slip through unnoticed.

# From demo to guardrail

Delete the mock-writing step and trigger on real changes to turn this into a standing guardrail:

```yaml
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
```

Now every pull request re-validates the whole justification against the actual repository. With
`embed_image: true` and `github-token`, the action commits the coloured diagram and posts it as a PR
comment, so reviewers see the argument's live status inline:

<!-- CAPTURE-SS: The pull-request comment containing the embedded, coloured justification diagram. -->
**📸 Screenshot needed:** the PR comment with the embedded justification diagram.
{: .notice--warning}
![](/assets/images/tutorials/303_cicd/pr-comment.png)

A failing claim turns the check red and blocks the merge: the very drift you triggered by hand, now
caught automatically on every change.

# Where to next?

- Make the argument itself more reusable with **[templates](/tutorials/templates/)** and the
  composition operators (**[assemble](/tutorials/assemble/)**, **[refine](/tutorials/refine/)**).

Full action reference:
[jpipe-runner/docs/ACTION.md](https://github.com/jpipe-mcscert/jpipe-runner/blob/main/docs/ACTION.md).
