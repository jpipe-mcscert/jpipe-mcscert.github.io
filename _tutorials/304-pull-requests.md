---
layout: single
classes: wide
title: Pull request integration
excerpt: "Bring a failing justification into the pull-request conversation, where the change is reviewed."
permalink: /tutorials/pull-requests/
header:
  teaser: /assets/images/covers/technology.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/technology.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

The [CI/CD workflow](/tutorials/cicd/) already re-validates the justification on every change and turns
the check red when a claim drifts. But that red mark lives in the **Actions** tab, off to the side of
where the work actually happens. On a team, a change arrives as a **pull request**, and the pull
request is where it is discussed, reviewed, and approved.

So the point of wiring jPipe into pull requests is this: a failing justification becomes **part of the
conversation**. Instead of a bare red check someone has to go hunting for, the coloured diagram is
posted right into the PR, so the broken claim sits in the discussion, next to the change that caused
it, for every reviewer to see.

This continues the [CI/CD tutorial](/tutorials/cicd/): the same model and step library, and the same
stale-changelog drift, now delivered through a pull request.
{: .notice--info}

# The workflow

Trigger on pull requests, let the action comment, and switch `embed_image` on. There is no mock step
this time: the pull request carries the real changelog, stale or not.

{% raw %}
```yaml
name: Justify the release

on:
  pull_request:
    branches: [main]

permissions:
  contents: write        # push the rendered diagram to a branch
  pull-requests: write   # comment on the pull request

jobs:
  justify:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Run the jPipe justification
        uses: jpipe-mcscert/jpipe-runner@v3.5.3
        with:
          jd_file: "run/release.jd.json"
          library: |
            run/release_lib.py
          embed_image: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
{% endraw %}

Three things change from the [CI/CD job](/tutorials/cicd/):

- **`on: pull_request`** runs the justification on every pull request against `main`, and again on
  each new commit pushed to the branch.
- **`embed_image: true`** tells the action to publish the coloured diagram as a PR comment instead of
  only uploading it as an artifact.
- the **`permissions`** block lets the built-in `github-token` do that: `contents: write` to commit
  the rendered image to a branch (`jpipe-runner-diagrams` by default) and `pull-requests: write` to
  leave the comment.

# The argument joins the review

Open a pull request that ships `2.0` but leaves the changelog on the previous version, the same drift
from the CI/CD tutorial, now on a branch under review. GitHub starts the check right away:

![A newly opened pull request with the jPipe justification check in progress](/assets/images/tutorials/304_pull_requests/pull_request_created.png)

When it finishes, the justification has failed, and the jPipe action posts the result as a comment
from the `github-actions` bot: the coloured diagram, right there in the conversation, with *"The
changelog is up to date"* in red and the strategy and conclusion above it greyed out. The pull
request's check is red, and *"All checks have failed"* holds the merge box shut:

![The github-actions bot comment reporting a failed justification, with the coloured diagram showing the changelog evidence in red](/assets/images/tutorials/304_pull_requests/failure.png)

The broken claim is part of the discussion now, not a red mark buried in the Actions tab. A reviewer
sees exactly which fact failed, without leaving the page, and the comment even links the diagram
artifact and the full runner output.

# Fixing it in the open

Push a commit to the branch that bumps the changelog to name `2.0`. The action re-runs on the new
commit and comments again, this time *"Justification process completed!"*, the check turns green, and
the merge box clears:

![The pull request after the fix: the bot reports the justification completed and all checks pass](/assets/images/tutorials/304_pull_requests/success.png)

Because it all played out on the pull request, the record is complete: the conversation shows the
argument breaking, the commit that answered it, and the justification passing, all before anything
merged.

# Block the merge on a broken argument

The check's status follows the justification, so make it **required** in your repository's branch
protection rules (*Settings → Branches*). GitHub then refuses to merge a pull request whose argument
is red: a change cannot land until its justification holds again.

# Where to next?

- Make the argument itself more reusable with **[templates](/tutorials/templates/)** and the
  composition operators (**[assemble](/tutorials/assemble/)**, **[refine](/tutorials/refine/)**).

Full action reference:
[jpipe-runner/docs/ACTION.md](https://github.com/jpipe-mcscert/jpipe-runner/blob/main/docs/ACTION.md).
