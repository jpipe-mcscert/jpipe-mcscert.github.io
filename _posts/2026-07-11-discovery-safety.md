---
layout: single
title:  "Funding Announcement: Safety for Non-Safety-Critical Systems (NSERC)"
date:   2026-07-11 09:00:00 -0500
categories: funding
---

On July 11th, 2026, the _Natural Sciences and Engineering Research Council of Canada_ (NSERC) announced that the research program titled _Safety-inspired language for non-safety-critical systems_ is awarded $210,000 as part of the Discovery Grant program. The program started on April 1st, 2026 and runs through 2031.
{: .text-justify }

Safety engineering is a mature discipline, but its methods have always been reserved for systems whose failures are obviously catastrophic: aircraft, medical devices, nuclear control. Everyday software was never held to that bar, and never needed to be. That assumption is now breaking. A wrong recommendation in a therapy app is not a rounding error, and the developers writing it have no structured way to reason about safety at all, let alone demonstrate it.
{: .text-justify }

The first of the program's three objectives is jPipe's research agenda stated in full: a safety-inspired language in which developers write down _why_ a system is safe to deploy, a compiler that checks those arguments stay sound, and a composition algebra for building large arguments out of small ones. The "safety cards" mentioned under that objective are a thread already being pulled: at [ICSE-NIER'26](/publications/2026/04/15/icse-nier-model-cards.html) model cards were reframed as safety artifacts, and [_Safety First!_](https://hal.science/hal-05681913), to be presented next month at MoDRE, runs the idea at full size on the GPT-5 system card, tracing 74 published claims back to 22 requirements nobody had written down. The two remaining objectives push outward: organizing reusable safety knowledge so developers can find it, then wiring the whole thing into ordinary development so that a change preserving behaviour also preserves safety.
{: .text-justify }

This grant follows the [Large Scale Composition Discovery Grant](/funding/2020/05/01/discovery.html) (2020 - 2026), whose work on composition operators became one of the keystones of jPipe.
{: .text-justify }

# Abstract

This research program pioneers the study of safety for non-safety-critical (non-SC) systems, focusing on everyday software rather than high-risk domains like aerospace or nuclear control. While classical Safety-Critical (SC) systems follow strict regulatory frameworks, non-SC software increasingly carries safety implications, especially as AI-powered applications expand into domains such as mental health. A wrong recommendation or privacy breach in a therapy app can cause genuine harm. Yet, current development practices provide no structured way for regular developers to reason about or demonstrate safety.
{: .text-justify }

This program aims to close that gap by transferring principles from system safety engineering into practical, developer-friendly methods. Over the next five years, the research will deliver three short-term objectives (STOs): (i) to design a safety-inspired programming language enabling developers to express why their systems are safe to deploy (STO1); (ii) to categorize and organize reusable safety assets that guide decision-making (STO2); and (iii) to integrate these mechanisms into standard software lifecycles to support qualification and potential certification (STO3).
{: .text-justify }

STO1 will create a lightweight domain-specific language, supported by a compiler that performs syntactic and semantic checks to verify safety-related claims. Developers will be able to express arguments such as "the feedback system is rule-based and psychologist-approved," and the compiler will ensure that such claims remain logically and semantically sound in the developed software. A composition algebra will let developers build complex safety arguments from smaller sub-claims, while "safety cards" (adapted from AI model cards) will enable empirical validation against real-world systems and repositories such as GitHub and Hugging Face.
{: .text-justify }

STO2 will structure the diverse landscape of safety-related decisions by linking them to their underlying goals. Using goal modelling and product family engineering, it will identify universal versus domain-specific practices, such as post-processing safeguards (generic) versus text sensitivity in mental health apps (domain-dependent). The resulting framework will help developers detect risks, propose mitigations, and avoid unsafe design choices, such as misusing generative AI for therapeutic guidance.
{: .text-justify }

STO3 will embed these ideas into the developer workflow, connecting safety claims directly to code and ensuring that any modification that preserves functionality also preserves safety. It will culminate in a qualification process that adapts principles from standards like ISO 26262 to non-SC software, paving the way for lightweight certification of non-SC systems.
{: .text-justify }

The program's impact extends well beyond its initial focus on AI and mental health. By providing open-source tools, open-access publications, and direct engagement with practitioner communities, it aims to reshape how developers reason about safety.
{: .text-justify }

# Consortium

- McMaster Centre for Software Certification ([McSCert](https://www.mcscert.ca/))
  - Sébastien Mosser
