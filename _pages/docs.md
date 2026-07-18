---
title: Documentation
layout: archive
permalink: /docs/
classes:
  - wide
  - section-grid
sidebar:
  nav: "documentation"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/tiles.jpg
  show_overlay_excerpt: true
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

{% comment %}
  Docs are grouped using the section structure defined in
  _data/navigation.yml (the "documentation" nav). Each section becomes a
  category heading, and its children are matched to the collection
  documents by URL and rendered as grid cards.
{% endcomment %}
{% for section in site.data.navigation.documentation %}
  <h2 class="archive__subtitle">{{ section.title }}</h2>
  <div class="entries-grid">
    {% for item in section.children %}
      {% for post in site.docs %}
        {% if post.url == item.url %}
          {% include archive-single.html type="grid" %}
        {% endif %}
      {% endfor %}
    {% endfor %}
  </div>
{% endfor %}
