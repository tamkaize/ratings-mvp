# Kurtosis Product UI Build and QA Guide

## Purpose

Use this file when building Kurtosis UI in Framer, Claude Code, another AI design/coding environment, or production frontend code.

This is intentionally a compact execution layer. It does not replace the brand or product design references.

---

# 1. Required Context Order

Before generating or substantially changing product UI, read:

1. `brand-system.md`
2. `product-design-system.md`
3. `ui-patterns.md`
4. the relevant section of `canonical-pages.md`
5. inspect `visual-reference-board.png`

Do not ask the model to infer the Kurtosis aesthetic from a single screenshot.

---

# 2. Pre-Build Plan

Before implementation, write a short design plan covering:

- user
- primary job
- information hierarchy
- page composition
- components reused
- responsive behavior
- loading/error/stale states
- any new pattern that is not already in the system

Keep the plan short. If a new pattern can be expressed through an existing component, reuse it.

---

# 3. Framer Setup

For the prototype, create or maintain a `/design-system` page containing the actual rendered primitives.

Minimum sections:

- color variables
- typography styles
- spacing examples
- buttons
- inputs/search
- tabs
- status labels
- cards/surfaces
- table patterns
- rating components
- dependency components
- vault components
- states

## Variables

Create named variables rather than local one-off values.

Recommended naming style:

### Color

- `Color/Ink`
- `Color/Deep Navy`
- `Color/Slate`
- `Color/Snow`
- `Color/White`
- `Color/Signal Blue`
- `Color/Ice Blue`
- `Color/Alpine Teal`
- `Color/Risk Low` → `#15803D`
- `Color/Risk Moderate` → `#A16207`
- `Color/Risk High` → `#C2410C`
- `Color/Risk Critical` → `#B91C1C`
- `Color/Unrated` → `#475569`

### Spacing

- `Space/04`
- `Space/08`
- `Space/12`
- `Space/16`
- `Space/24`
- `Space/32`
- `Space/48`
- `Space/64`
- `Space/96`
- `Space/120`

### Radius

- `Radius/00`
- `Radius/04`
- `Radius/08`
- `Radius/Pill`

Use the same semantic names in code if practical.

## Current implementation defaults

- theme: light mode only
- font: Inter Display / Inter
- icons: Lucide, typically 20px at 1.75–2px stroke
- framework: Next.js + React + TypeScript
- styling: Tailwind CSS
- charts: Recharts

Do not let library defaults override the design system.

---

# 4. Component Rules

A reusable component should have:

- one clear job
- named variants
- defined content slots
- responsive behavior
- hover/focus/disabled states if interactive
- loading/empty/error/stale states if data-backed

Do not create a component solely because two elements happen to share a visual box.

Prefer composition over giant all-purpose components with dozens of boolean properties.

---

# 5. AI Generation Guardrail Prompt

When handing a page to an AI design or coding agent, include this constraint block or an equivalent:

> Follow the Kurtosis brand and product design references exactly. Prioritize clarity, restraint, hierarchy, institutional credibility, and technical precision. Do not default to generic rounded-card SaaS design, dark glowing crypto UI, decorative dashboards, gauges, gradients, or gamified ratings. Reuse existing Kurtosis product components and terminology. Preserve position-level identity, data recency, risk rationale, dependency structure, and honest missing/stale states. Before finishing, compare the rendered result against the references and remove any element that adds neither information, hierarchy, nor brand.

Do not use this prompt instead of the references. Use both.

---

# 6. Screenshot Review Loop

For important pages:

1. render at desktop
2. render at tablet
3. render at 390px mobile
4. inspect the screenshots visually
5. compare against the intended hierarchy
6. remove generic AI-generated patterns
7. fix overflow, wrapping, clipping, and density
8. repeat until the page passes QA

Do not accept code quality as proof of design quality.

---

# 7. Visual QA

Check:

## Hierarchy

- is there one obvious first thing to read?
- does the main conclusion appear before secondary analytics?
- are primary and secondary actions visibly different?

## Restraint

- can any card, border, badge, icon, chart, or label be removed?
- is color doing a job?
- are there more accents than necessary?

## Precision

- do repeated modules align exactly?
- are numerical columns aligned?
- are spacing tokens used consistently?
- are radii consistent?

## Kurtosis distinctiveness

- does the product feel systematic and institutional rather than generic SaaS?
- is the visual character present without relying on the logo?
- is alpine imagery reserved for moments where it adds brand, rather than inserted into analytical modules?

---

# 8. Product QA

For Ratings:

- exact position identity is clear
- only the approved grade is styled as approved
- numeric token-risk score is shown where supplied and is not rendered as `/100`
- `NO_RATE`, `REJECT`, and `WATCHLIST` are preserved as distinct statuses
- an indicated rating is explicitly labeled `Indicated`
- confidence is separate from severity and status
- evidence quality supports `Complete / Partial / Stale / Contradictory / Missing / Unevaluable`
- coverage is shown by required area, never as an invented overall percentage
- rationale is visible
- material factors are ordered by importance
- dependency structure is understandable
- redemption/maturity path is shown when material
- source/methodology path exists
- actual source/update timestamp is visible

For Horizon:

- canonical product name is `Kurtosis Horizon Vault`
- strategy objective appears before yield marketing
- `Your position value` is findable
- Net APY is explicitly labeled `Historical` or `Estimated`
- TVL, available-to-withdraw, next withdrawal/settlement, fees, risk grade, rating status, confidence, and last-updated are represented when applicable
- withdrawal states use the canonical lifecycle and exceptions
- current holdings are inspectable
- rating/risk links exist where supported
- optional exposure analytics do not displace the canonical user metrics
- actual data timestamp is clear
- UI does not imply disclosure of proprietary PM logic

---

# 9. Responsive QA

At each breakpoint verify:

- no text overlaps
- no clipped ratings or symbols
- no critical metadata disappears
- tables remain usable
- dependency chain remains understandable
- tap targets are large enough
- typography does not fall below defined minimums
- long token/protocol names wrap or truncate predictably
- sticky elements do not consume excessive viewport height

---

# 10. Accessibility QA

Verify:

- contrast
- keyboard navigation
- visible focus
- semantic landmarks/headings
- label/control association
- icon accessible names
- no color-only risk signaling
- reduced motion
- chart summary available in text/data

---

# 11. Content QA

Check every page for:

- consistent product nouns
- sentence case
- no unsupported claims
- no fake precision
- no "safe" wording unless methodology explicitly permits it
- no vague "risk insights" labels when a more precise term exists
- no hidden basis/window for yield or performance
- no missing as-of timestamp where recency matters

---

# 12. Final Reduction Pass

Before approval:

1. remove elements that add neither information nor hierarchy
2. replace multiple weak modules with one stronger module where possible
3. reduce redundant labels
4. remove decorative charts
5. remove excessive card containers
6. confirm the page still works at 390px
7. confirm the primary user question is answered within 10 seconds

If the interface becomes less clear after simplification, restore the information, not the decoration.

---

# 13. Definition of Done

A page is ready for Demo Day or handoff when:

- it follows all required references
- desktop/tablet/mobile are reviewed
- current/loading/error/stale/partial states exist where relevant
- visual hierarchy is intentional
- terminology is consistent
- no critical claim is unsupported
- data recency is explicit
- product boundaries are preserved
- it passes the Kurtosis taste score at 4/5 or better in all applicable categories

