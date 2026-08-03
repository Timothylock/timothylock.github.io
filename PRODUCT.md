# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are recruiters/hiring managers evaluating Timothy for a role, engineering peers/collaborators checking his technical work, and general portfolio visitors who found the site online. All are scanning for evidence of experience and project quality within a short visit.

## Product Purpose

A personal portfolio and resume site (timlock.dev) for Timothy Lock, a software engineer. It presents his work experience, projects, and a downloadable resume so visitors can quickly assess his background and reach him via GitHub/LinkedIn.

## Positioning

Proves scale and production impact that a generic resume PDF can't convey as vividly: systems built for millions of users (Kubernetes operators for online services), traffic-critical infrastructure (auth/API gateways handling 100% of traffic), and safety-critical throughput (image moderation processing 3M+ images monthly). The site's job is to make that scale legible fast, not just list it.

## Operating Context

Static site hosted on GitHub Pages at timlock.dev, deployed via `.github` workflow. Single-page portfolio (`index.html`) with sections: hero, About, Experience, Projects, footer. Links out to a downloadable resume PDF, GitHub, LinkedIn, and Instagram.

## Capabilities and Constraints

- Static HTML/CSS/JS, no build framework or backend.
- Also hosts a small number of unrelated personal pages (e.g. `cutie_val/`, `jon_aniv/`, `jonbday/`) and a `legacy/` archive on the same repo/domain. These are intentionally unlinked from the portfolio nav and reachable only via direct URL — out of scope for this product record and for portfolio design work.
- `ttcbusses.html` is a separate standalone project page, also out of scope unless explicitly targeted.

## Brand Commitments

- Name/identity: "Timothy Lock", logo initials "TL".
- Tagline voice: light personality alongside professionalism (e.g. "Powered by ☕ coffee and 🍣 sushi (but not both at the same time)").
- Current role: Software Engineer.

## Product Principles

- Lead with scale and impact — numbers and system criticality over generic task descriptions.
- Fast to scan: recruiters and peers should grasp experience and project depth without deep reading.
- Personality without undermining credibility — light voice in taglines, professional substance in experience/projects.
- Keep unrelated personal pages fully decoupled from the portfolio's navigation and design system.
