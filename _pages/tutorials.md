---
title: Tutorials
layout: archive
permalink: /tutorials/
classes:
  - wide
  - section-grid
sidebar:
  nav: "tutorials"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/covers/technology.jpg
  show_overlay_excerpt: true
  caption: "Photo credit: [**Pixabay**](https://pixabay.com/)"
---

{% comment %}
  Tutorials are grouped using the section structure defined in
  _data/navigation.yml (the "tutorials" nav). Each section becomes a
  category heading, and its children are matched to the collection
  documents by URL and rendered as grid cards.
{% endcomment %}
{% for section in site.data.navigation.tutorials %}
  <h2 class="archive__subtitle">{{ section.title }}</h2>
  <div class="entries-grid">
    {% for item in section.children %}
      {% for post in site.tutorials %}
        {% if post.url == item.url %}
          {% include archive-single.html type="grid" %}
        {% endif %}
      {% endfor %}
    {% endfor %}
  </div>
{% endfor %}
