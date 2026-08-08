---
layout: single
title:  "Kalvin Khuu accepted at the MODELS'26 Doctoral Symposium"
date:   2026-08-04 09:00:00 -0500
categories: publications
---

Congrats to [Kalvin Thuan-Phong Khuu](https://kalvinkhuu.github.io/), whose paper _When Safety Claims Fail Silently: A Modelling Approach to AI Assurance_ is accepted at the Doctoral Symposium of the ACM/IEEE 29th International Conference on Model Driven Engineering Languages and Systems (MODELS), held in Málaga, Spain from October 4th to 9th, 2026.
{: .text-justify }

The Doctoral Symposium is where PhD students put a whole thesis programme in front of the modelling community, rather than a single result. Kalvin's pulls together the thread running through his year, [model cards as safety artifacts](/publications/2026/04/15/icse-nier-model-cards.html) and the [GPT-5 system card](https://hal.science/hal-05681913), and names the piece that does not exist yet: a guidance system on top of jPipe, where a practitioner queries a curated library of modelled safety claims and gets back guidance that fits their own system.
{: .text-justify }

It also puts numbers on how much of the groundwork is already in place: 32 recurring safety patterns extracted from the model cards of major providers, and the composition operators that let those patterns be taken apart and reused.
{: .text-justify }

McSCert has a good record at MODELS. [Nirmal Chaudhari](/awards/2024/10/27/acm_src.html) took an ACM SRC silver medal there in 2024, and Corinne Pulgar a bronze in 2022.
{: .text-justify }

# Abstract

**Problem.** The rapid deployment of Large Language Models (LLMs) into safety-critical roles, including mental health support, education, and professional guidance, has created a dangerous gap between the safety claims AI developers publish and the behaviors their systems exhibit in practice. Current documentation practices, primarily model cards and system cards, describe safety properties in natural language which is unstructured by nature, lack proper validation mechanisms, and are rarely maintained across the lifecycle of a deployed system.
{: .text-justify }

**Proposal & Approach.** This paper presents my doctoral research project that addresses this gap through three contributions. First, we propose to model AI safety claims with a structured argumentation notation that makes the logical dependencies between evidence and claims explicit and exposes precisely where a safety argument breaks down. Second, we propose a guidance system built on top of jPipe, an open-source modelling tooling platform, that allows practitioners to query a curated library of modeled safety claims and receive contextually relevant, personalized guidance for their own AI systems.
{: .text-justify }

**Current Status.** The first phase is substantially complete: five publications establish the empirical and tooling foundations of the project, including the extraction and categorization of 32 recurring safety patterns from major provider model cards, an in-depth model-based analysis of the GPT-5 system card, and the development of composition operators within jPipe that enable decomposition and reuse of sub-models. The remaining work focuses on completing the models library, building the guidance system, and evaluating both phases through expert review, case studies, and a user study with ML practitioners and safety-critical systems engineers.
{: .text-justify }

# Reference

Kalvin Thuan-Phong Khuu. _When Safety Claims Fail Silently: A Modelling Approach to AI Assurance_. In ACM/IEEE 29th International Conference on Model Driven Engineering Languages and Systems (MODELS), Doctoral Symposium. Málaga, Spain. October 2026.
{: .text-justify }
