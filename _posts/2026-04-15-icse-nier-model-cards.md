---
layout: single
title:  "New paper: Model Cards for Responsible AI (ICSE-NIER'26)"
date:   2026-04-15 09:00:00 -0500
categories: publications
---

[Kalvin Thuan-Phong Khuu](https://kalvinkhuu.github.io/) is in Rio de Janeiro this week for the 48th IEEE/ACM International Conference on Software Engineering (April 12th - 18th, 2026), presenting [_Model Cards for Responsible AI: Stop Carding, Start Modelling!_](https://hal.science/hal-05679580v1) in the New Ideas and Emerging Results track.
{: .text-justify }

![Kalvin presenting at ICSE 2026](/assets/images/posts/kalvin_icse.jpg){: .align-center}

The paper starts from an uncomfortable observation: model cards are the industry's de facto safety documentation, and they are prose. Nothing in them says which claim rests on which evidence, so nothing notices when the evidence stops holding. Turn a card into a justification model instead and all three become explicit, and the check can run on every push. The authors do exactly that for GPT-OSS, Claude 3 and Gemma 3N, and it is the opening move of the group's work on safety for systems nobody classifies as safety-critical.
{: .text-justify }

This is a first paper with the team for [Baptiste Lacroix](/students/2025/04/28/baptiste.html).
{: .text-justify }

# Abstract

Artificial intelligence (AI) and Machine Learning (ML) models are increasingly deployed in systems that, while not safety-critical per se, may still cause harm (e.g., a recent tragedy involving the death of a sixteen-year-old teenager and ChatGPT). Recent incidents have highlighted how unsafe such systems can be in practice. While safety engineering is a mature discipline for safety-critical systems, AI Safety remains closer to model validation than to safety assurance. In this paper, we propose integrating engineering practices from system safety, including argumentation models, templates, and operations, into AI Safety. This alignment enables a broader consideration of potential harm and supports the construction of explicit, structured safety arguments. We validate our approach by reframing Model Cards, a de facto industry standard, as actionable safety artifacts that make safety claims and supporting evidence explicit. We analyze state-of-the-art large language models (GPT-OSS, Claude 3, Gemma 3N) to show that it is possible to (i) identify safety templates in existing artifacts, (ii) express them as argumentation models using justification diagrams, and (iii) operationalize these models to provide immediate feedback to AI developers when evidence no longer supports safety claims.
{: .text-justify }

# Reference

Kalvin Thuan-Phong Khuu, Nicolas Lacroix, Baptiste Lacroix, Richard Paige, Mireille Blay-Fornarino, and Sébastien Mosser. _Model Cards for Responsible AI: Stop Carding, Start Modelling!_ In 2026 IEEE/ACM 48th International Conference on Software Engineering (ICSE-NIER '26). April 2026. [[HAL]](https://hal.science/hal-05679580v1)
{: .text-justify }
