---
layout: single
title: jPipe runner - Make your justification executable!
excerpt: "Learn how to implement your strategies and evidence verifications in Python."
permalink: /tutorials/runner/
header:
  teaser: /assets/images/covers/run.jpg
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/run.jpg
  show_overlay_excerpt: false	
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
toc: true
---

So far, "The test suite passes" has been a *promise* written in a box. This tutorial makes it a
**check**: you will bind each piece of evidence to real Python code, run the model with the
[jPipe Runner](/tutorials/install/runner/), and get a diagram coloured by what actually held.

This tutorial assumes the [Runner is installed](/tutorials/install/runner/) and that you have the
[release model from jPipe 101](/tutorials/jpipe101/).
{: .notice--info}

# The idea

A justification and its verification live in two files:

- the **model** (`release.jd`) — *what* you claim and how it is argued;
- a **step library** (a `.py` file) — *how* each claim is checked.

The runner matches them up by element id, runs the checks bottom-up (evidence → strategy →
conclusion), and reports PASS/FAIL for every node.

# Step 1 — Compile the model to the runner's input format

The runner does not read `.jd` directly; it consumes the **compiled JSON**. Export it with the
compiler:

```
$ jpipe process -i release.jd -m release -f JSON -o release.jd.json
```

# Step 2 — Scaffold the step library

You could write the Python by hand, but the compiler can generate a skeleton for you — one function
per element, already wired with the right decorators:

```
$ jpipe process -i release.jd -m release -f PYTHON -o release_lib.py
```

That produces stubs like this (bodies left as `pass` for you to fill in):

```python
from jpipe_runner.framework.decorators.jpipe_decorator import jpipe
from jpipe_runner.framework.decorators.link_decorator import jpipe_link


@jpipe_link("release:e1")
@jpipe(produce=[])
def the_test_suite_passes(produce) -> bool:
    """[evidence] The test suite passes"""
    pass
```

Two decorators do the work:

- **`@jpipe_link("release:e1")`** ties this function to the element whose id is `release:e1` (the
  `<model>:<id>` you saw in the diagnostic symbol table).
- **`@jpipe(consume=[...], produce=[...])`** declares the function's **data-flow contract**: which
  variables it reads and which it writes.

# Step 3 — Implement the checks

The runner enforces a simple contract: **every piece of evidence must `produce` at least one
variable, and a strategy `consume`s the variables it reasons over.** That is how facts flow up into
the reasoning.

Fill in the bodies so each evidence performs a real check and publishes its result, and the strategy
combines them:

```python
import os

from jpipe_runner.framework.decorators.jpipe_decorator import jpipe
from jpipe_runner.framework.decorators.link_decorator import jpipe_link


@jpipe_link("release:e1")
@jpipe(produce=["tests_pass"])
def the_test_suite_passes(produce) -> bool:
    """[evidence] The test suite passes"""
    result = os.path.isfile("reports/tests.ok")   # your real check goes here
    produce("tests_pass", result)
    return result


@jpipe_link("release:e2")
@jpipe(produce=["changelog_ok"])
def the_changelog_is_up_to_date(produce) -> bool:
    """[evidence] The changelog is up to date"""
    result = os.path.isfile("CHANGELOG.md")
    produce("changelog_ok", result)
    return result


@jpipe_link("release:s")
@jpipe(consume=["tests_pass", "changelog_ok"])
def all_release_gates_pass(tests_pass, changelog_ok) -> bool:
    """[strategy] All release gates pass"""
    return tests_pass and changelog_ok
```

Each function returns a boolean (did this node hold?), evidence calls `produce(name, value)` to
publish a variable, and the strategy receives those variables as arguments named exactly as it
`consume`s them.

# Step 4 — Validate without running (dry run)

Before executing anything, check that the model and the library fit together — every evidence
produces, every strategy's inputs are satisfied:

```
$ jpipe-runner --dry-run -l release_lib.py release.jd.json
```

If a piece of evidence forgets to `produce`, the runner tells you precisely which one and how to fix
it — a good reason to dry-run in CI.

# Step 5 — Run it

```
$ jpipe-runner -l release_lib.py -f svg -o . release.jd.json
```

The runner executes each check and prints a report:

```
jPipe Files.Justification :: release
==============================================================================
evidence<release:e1> :: The test suite passes                         | PASS |
evidence<release:e2> :: The changelog is up to date                   | PASS |
strategy<release:s> :: All release gates pass                         | PASS |
conclusion<release:c> :: Version 2.0 is ready to ship                 | PASS |
------------------------------------------------------------------------------
1 justification, 4 passed, 0 failed, 0 skipped
```

It also writes a diagram, coloured by the outcome — your justification, *verified*:

<div align="center">
<img src="/assets/images/tutorials/07_runner/executed.svg" alt="The executed release justification, coloured by result"/>
</div>

If, say, the changelog were missing, `release:e2` would come back FAIL, the strategy and conclusion
above it would fail too, and the diagram would show exactly where the argument broke.

# Useful options

| Option | Short | What it does |
|--------|-------|--------------|
| `--library` | `-l` | Load a Python step library (repeatable). |
| `--variable NAME:VALUE` | `-v` | Inject a variable into the run (repeatable). |
| `--format` | `-f` | Output image format: `svg`, `png`, `pdf`, `dot`, … |
| `--output-path` | `-o` | Directory to write the diagram into. |
| `--diagram PATTERN` | `-d` | Only run diagrams matching a wildcard. |
| `--dry-run` | | Validate the wiring without executing. |
| `--verbose` | `-V` | Verbose logging. |
| `--config-file` | | Read options from a YAML file instead of the command line. |

See the full [Usage Guide](https://github.com/jpipe-mcscert/jpipe-runner/blob/main/docs/USAGE.md)
for variable syntax (JSON and Python literals) and config files.

# Where to next?

- **[Run it in CI/CD](/tutorials/cicd/)** — have every pull request checked automatically and the
  diagram posted back as a comment.

For a complete, executable machine-learning example, see
[jpipe-examples/llm_FATES](https://github.com/jpipe-mcscert/jpipe-examples/tree/main/llm_FATES).
