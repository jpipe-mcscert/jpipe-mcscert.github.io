# CLAUDE.md

Guidance for working on the jPipe website. This is a Jekyll site using the
**Minimal Mistakes** theme as a *remote theme* (`mmistakes/minimal-mistakes@4.28.0`),
so the theme's layouts and includes are fetched at build time and are **not**
on disk. Content lives in `_pages/`, collections (`_tutorials/`, `_docs/`),
`_posts/`, and `_data/`.

Build/preview locally with:

```
bundle exec jekyll serve     # live preview
bundle exec jekyll build     # one-off build into _site/
```

## Writing conventions

- **No em-dashes** ("—") in prose. Rephrase, or use a comma, a colon, or a
  parenthetical. A plain hyphen ("-") for ranges (e.g. `2024 - 2028`) is fine.
- Body paragraphs are justified site-wide (see `p { text-align: justify }` in
  `assets/css/local.css`). Match that when adding prose.
- **No table of contents in tutorials.** Do not set `toc: true` in `_tutorials/`
  front matter. Tutorial pages are kept short and self-contained, so a sidebar
  TOC adds clutter without value. (Other collections may still use it.)

## Pending screenshots

Tutorial images live in **one `assets/images/tutorials/NNN_<name>/` folder per
tutorial**, numbered to match the tutorial (see the numbering scheme below).
When a screenshot has **not been captured yet**, mark its spot with a visible
**`📸 Screenshot needed`** callout so no capture is forgotten and nothing ships
silently blank:

```
**📸 Screenshot needed:** what the shot should show.
{: .notice--warning}
![](/assets/images/tutorials/NNN_<name>/<file>.png)
```

Keep the `![]()` ref (it is the eventual home for the image). Remove **only the
callout** once the real screenshot is committed, since a captured image renders
on its own. Do not leave a bare `![]()` pointing at a missing file with no
callout: that ships a broken image icon with no signal that it is pending.

## No inline CSS

Do **not** put `<style>` blocks inside Markdown pages. All custom styling goes
in **`assets/css/local.css`**, which is loaded on every page via
`_includes/head/custom.html` (after the theme CSS, so overrides win).

To scope a rule to one page, add a class through the page's `classes:` front
matter, which Minimal Mistakes copies onto the `<body>` (e.g. `classes: wide`
becomes `<body class="layout--archive wide">`). Then scope the CSS to that
class. Existing examples:

- `.section-grid ...` for the grouped tutorials/docs listings.
- `.publications-list ...` for the publications page.

## Tutorials and Documentation (grouped listing pages)

`_pages/tutorials.md` and `_pages/docs.md` do **not** use the theme's flat
`collection` layout. They use `layout: archive` and render their entries
**grouped by the sections defined in `_data/navigation.yml`** (the `tutorials`
and `documentation` navs, which also drive the sidebar). Each nav section
becomes an `<h2 class="archive__subtitle">` heading; its children are matched
to collection documents **by URL** and rendered as grid cards.

Both pages carry `classes: [wide, section-grid]` so `local.css` can add the
clearfix and tighten spacing.

**To add a tutorial or doc:**

1. Create the collection file (`_tutorials/NNN-name.md` or `_docs/name.md`) with
   `layout: single`, a `permalink`, a `title`, an `excerpt` (shown on the card),
   and a `header.teaser` image. Tutorial filenames use a **category-based 3-digit
   prefix** (see below); pick the next free number in the category.
2. Add a matching entry under the right section in `_data/navigation.yml`, with
   a `url` equal to the file's `permalink`.

A page appears in the grouped listing **only if it is listed in the nav**
(matched by URL). Forget the nav entry and the card will not show up.

**Tutorial numbering is category-based.** The first digit is the category, the
rest order within it, so a new page slots into its category without renumbering
the others:

- `1xx` — Getting Started
- `2xx` — The Compiler
- `3xx` — The Runner
- `4xx` — The IDE (advanced usage)

The filename order drives the theme's Previous/Next pager, so the categories
must stay in reading order (and match the section order in the nav). Each
tutorial also owns exactly one image folder
`assets/images/tutorials/NNN_<name>/` sharing its number.

## Adding a team member

Edit `_pages/team.md`. Members are YAML entries rendered via
`{% include feature_row id="core_team" %}` (and `id="alumni"`). Add an entry
under `core_team:` (current members) or `alumni:` (past members):

```yaml
  - image_path: /assets/images/people/<name>.jpg
    title: "Full Name"
    excerpt: "<p class=\"text-justify\">Short bio.</p>"
    url: "https://..."          # optional personal/LinkedIn link
    btn_label: "Read More"      # omit url + these two to drop the button
    btn_class: "btn--primary btn--small"
```

Drop the portrait in `assets/images/people/` (roughly square works best).

## Adding a project / sponsor

Edit `_pages/sponsors.md`. Projects are YAML entries rendered via
`{% include feature_row id="active_projects" %}` (and `id="old_projects"`).
Add an entry under `active_projects:` (ongoing) or `old_projects:` (completed):

```yaml
  - image_path: /assets/images/sponsors/projects/<name>.jpg
    title: "Project Name (YYYY - YYYY)"
    excerpt: "<p class=\"text-justify\">Description. It is funded by ....<br/><br/>PI: Dr. Name</p>"
    url: "https://..."          # optional; add with btn_label/btn_class for a button
    btn_label: "Read More"
    btn_class: "btn--primary btn--small"
```

Drop the image in `assets/images/sponsors/projects/`. Use `<br/>` inside the
title if it needs to wrap onto two lines to align with sibling cards.

## Navigation

`_data/navigation.yml` holds every menu: the top bar (`main`) and the section
sidebars (`tutorials`, `documentation`, `news`). Editing a section here updates
both the sidebar **and** the grouped listing page for that collection, so keep
them as the single source of truth.
