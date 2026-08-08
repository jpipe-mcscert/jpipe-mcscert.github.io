---
layout: single
title:  "Upcoming talk: Safety First! Modelling requirements from the GPT-5 system card (MoDRE'26)"
date:   2026-08-08 09:00:00 -0500
categories: annoucements
---

[_Safety First! Modelling Requirements from GPT-5 System Card using Lightweight Safety Models_](https://hal.science/hal-05681913) will be presented on August 17th, 2026 at the 16th International Model-Driven Requirements Engineering workshop (MoDRE), co-located with the 34th IEEE International Requirements Engineering conference (RE 2026) in Montreal.
{: .text-justify }

Where the [ICSE-NIER paper](/annoucements/2026/04/15/icse-nier-model-cards.html) argued the principle, this one runs the experiment at full size. The paper takes the GPT-5 model and system card, pulls out 74 claims, and traces them back to 22 requirements nobody ever wrote down. The requirements that turn out to be missing, and the claims left with no evidence attached, are the actual result: current documentation practice hides both.
{: .text-justify }

The paper is part of the FATES-MLOps project, funded by the [ANR](/funding/2024/08/02/fates-mlops.html) in France and [NSERC](/funding/2025/04/22/fates-mlops-nserc.html) in Canada, and it comes out of the long-running collaboration between McSCert and the French teams in Toulouse and Nice that the project is built on. Two of its four authors, Mireille Blay-Fornarino and Nicolas Lacroix, sit on the Nice side of that consortium.
{: .text-justify }

# Abstract

Requirements engineering for Machine Learning (ML) models is gaining renewed importance as organizations increasingly publish model cards and system cards to document the behaviour, capabilities, and limitations of their models. These artifacts have become a de facto standard for communicating model properties to downstream developers and auditors. However, the claims made in such cards are rarely linked to explicit requirements, and they are often expressed in vague or imprecise language, particularly with respect to safety. This makes it difficult to determine which requirements a card actually addresses, or whether the supporting evidence is adequate. We propose an approach based on argumentation modelling, drawing on Toulmin's model in the form of justification models, to systematically capture the claims made in model and system cards and trace them back to upfront requirements. The resulting diagrams make each claim's grounds and warrants explicit and establish traceability links between documented assertions and the requirements they are intended to satisfy. We evaluate the approach on the model and system card for GPT-5, identifying 74 claims and tracing them to 22 implicit requirements. The analysis surfaces unspecified requirements and gaps in evidence, showing that argumentation-based traceability can expose weaknesses obscured by current documentation practices.
{: .text-justify }

# Reference

Kalvin Thuan-Phong Khuu, Nicolas Lacroix, Mireille Blay-Fornarino, and Sébastien Mosser. _Safety First! Modelling Requirements from GPT-5 System Card using Lightweight Safety Models_. In 16th International Model-Driven Requirements Engineering (MoDRE), co-located with IEEE RE 2026. Montreal, Canada. August 2026. [[HAL]](https://hal.science/hal-05681913)
{: .text-justify }
