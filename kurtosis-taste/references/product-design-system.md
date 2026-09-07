# Kurtosis Product Design System

## Purpose

This document translates the Kurtosis brand system into operational rules for product UI.

Use it for:

- ratings and risk interfaces
- Horizon vault interfaces
- internal or external dashboards
- product prototypes in Framer
- production interfaces built by engineers
- UI generated or modified by AI coding/design agents

This document does **not** replace `brand-system.md`.

Read `brand-system.md` first for the governing aesthetic. Then use this file for product-specific rules.

The product UI should feel like:

> Institutional research software made by a small, highly technical investment firm.

The governing product tension is:

**Dense enough to support real decisions. Restrained enough to remain legible.**

---

# 1. Product Context

## What Kurtosis is

Kurtosis is systematic on-chain fixed-income infrastructure.

The product has two closely related jobs:

1. **Evaluate complex on-chain positions** through structured, inspectable ratings and risk reasoning.
2. **Manage systematic fixed-income exposure** through Horizon vault strategies.

Ratings should help a user understand the position they would actually own, including dependencies created by wrappers, lending markets, principal tokens, vaults, loops, and redemption paths.

Horizon should help a user understand what a managed strategy holds, how exposed it is, and what risk reasoning supports the positions without implying disclosure of proprietary portfolio-management logic.

## Primary users

Design primarily for:

- institutional allocators
- crypto-native portfolio managers
- investment and risk teams
- treasury or research teams
- sophisticated investors who need to explain a decision internally

Do not optimize the core information architecture around first-time retail users.

## Core user questions

Every product surface should help answer one or more of these questions:

- What am I actually exposed to?
- What is the rating or risk view?
- Why did it receive that rating?
- Which dependency creates the most material risk?
- What changed?
- How current is this information?
- What happens at redemption or maturity?
- What does this vault hold?
- How much of the portfolio remains exposed to floating rates?
- Is there anything I need to investigate before allocating?

If a component cannot be traced to a meaningful user question, reconsider whether it belongs in the interface.

---

# 2. Product Design Principles

## 2.1 Decision-first

A page should make the primary decision legible before exposing the full analytical depth.

Preferred order:

1. position identity
2. current assessment
3. material reason
4. supporting evidence
5. deeper methodology or dependencies

Do not force the user to decode a dashboard before understanding the main conclusion.

## 2.2 Progressive analytical depth

Kurtosis should support both rapid scanning and detailed investigation.

Use progressive disclosure:

- summary first
- material factors second
- dependency detail third
- methodology and source evidence on demand

Do not hide critical risk behind interaction.

## 2.3 Evidence close to claims

When the UI makes a risk claim, expose the evidence, source, timestamp, or rationale close enough that the claim can be checked.

Avoid decorative confidence signals that are not tied to evidence.

## 2.4 Position-level, not token-level shorthand

Do not visually collapse structured positions into the underlying token.

If `PT-ONyc` has a different risk profile from `ONyc`, the UI must preserve that distinction in naming, hierarchy, dependencies, and explanation.

## 2.5 Calm under complexity

Complexity should be organized rather than simplified away.

A dense table with clear grouping is preferable to six decorative cards that fragment the same information.

## 2.6 Explainability without false completeness

Expose the reasoning needed to understand a rating or position.

Do not imply that every proprietary portfolio-management rule, model weight, or internal decision is disclosed unless it actually is.

## 2.7 Currentness is part of trust

Risk information decays.

Show recency wherever it materially affects interpretation:

- last updated
- effective date
- observation window
- stale-data warning
- methodology version when relevant

## 2.8 No gamification

Ratings, yields, and risk indicators are analytical information, not reward mechanics.

Avoid:

- celebratory animations
- score rings used as decoration
- confetti
- aggressive red/green trading cues
- "health" metaphors
- achievement language

---

# 3. Brand Foundations for Product UI

## 3.1 Core palette

Use these approved Kurtosis colors as the base system.

| Token | Value | Primary role |
|---|---|---|
| `ink` | `#172840` | Primary dark surface, primary text on light backgrounds |
| `deep-navy` | `#263F63` | Secondary dark surface, structural emphasis |
| `slate` | `#57606A` | Secondary text, metadata, muted controls |
| `alpine-teal` | `#0F766E` | Restrained positive or selected emphasis |
| `snow` | `#EDF2F7` | Pale background, separators, quiet surfaces |
| `signal-blue` | `#0061E8` | Primary interactive state, links, focused data emphasis |
| `ice-blue` | `#5AB3F2` | Secondary informational accent |
| `white` | `#FFFFFF` | Primary light surface |

### Color use rules

- Most product pages should be predominantly white, snow, ink, and slate.
- Use one meaningful accent per local section whenever possible.
- `signal-blue` is for interaction or explicit analytical emphasis, not decoration.
- `alpine-teal` may support positive/stable states, but never imply "safe" by color alone.
- Never communicate rating or risk solely through hue.
- Avoid rainbow severity palettes unless a future approved semantic palette explicitly requires one.

### Semantic risk colors

Use semantic severity color only when it carries analytical meaning.

| Severity | Foreground | Usage |
|---|---|---|
| `Low` | `#15803D` | Low factor-level severity |
| `Moderate` | `#A16207` | Moderate factor-level severity |
| `High` | `#C2410C` | High factor-level severity |
| `Critical` | `#B91C1C` | Critical factor-level severity |
| `Unrated / insufficient evidence` | `#475569` | No approved rating, insufficient evidence, or neutral evidence gaps |

Rules:

- use these as foreground text, icon, or border colors on pale/light surfaces
- always show the severity or grade label alongside color
- keep confidence visually and semantically separate from severity
- do not map confidence `High / Medium / Low` onto the risk-severity palette
- do not use green to mean an asset is "safe"
- do not invent additional severity colors without updating this system
- if a tinted alert background is needed, prefer a white or `snow` surface with the semantic color carried by text/icon/border until a dedicated tint palette is approved

## 3.2 Typography

Primary families:

- display: `"Inter Display", "Inter", sans-serif`
- product/body: `"Inter", sans-serif`

Use Inter consistently across marketing and product UI unless a future brand revision explicitly changes the type family.

### Canonical hero styles

```css
.hero-title {
  font-family: "Inter Display", "Inter", sans-serif;
  font-size: 64px;
  font-weight: 650;
  line-height: 0.98;
  letter-spacing: -0.035em;
}

.hero-body {
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.012em;
}
```

### Product type scale

| Role | Desktop size | Weight | Use |
|---|---:|---:|---|
| Display | 48–64px | 600–650 | Marketing or major product thesis only |
| H1 | 36–44px | 600 | Page title |
| H2 | 26–32px | 600 | Major section |
| H3 | 20–24px | 600 | Subsection / primary module title |
| Body large | 18px | 500 | Key explanation |
| Body | 15–16px | 400–500 | Default UI copy |
| Body small | 13–14px | 400 | Supporting information |
| Label | 12–13px | 500 | Field labels, metadata |
| Data large | 28–40px | 500–600 | Primary metric |
| Data | 14–18px | 500 | Table or module metrics |
| Caption | 11–12px | 400–500 | Timestamp, source, footnote |

### Type rules

- prefer sentence case
- avoid excessive uppercase
- use tabular numerals where available for financial data
- keep numeric values visually stable across updates
- do not use monospace as a generic "technical" aesthetic; reserve it for hashes, addresses, code, IDs, or exact machine-readable values
- default body line height: `1.45–1.6`
- default compact-data line height: `1.25–1.4`
- limit long explanatory text to approximately 65–75 characters per line

## 3.3 Spacing

Use a 4px base grid.

Preferred spacing tokens:

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 120`

Rules:

- use `8–16px` within compact controls
- use `16–24px` within product modules
- use `24–32px` between related module groups
- use `48–64px` between major product sections
- use `96–120px` for major marketing sections
- preserve larger outer margins than inner component gaps

Avoid arbitrary values unless required for optical alignment.

## 3.4 Radius

Geometry should remain severe and controlled.

Preferred radii:

- `0px`: tables, structural dividers, selected editorial surfaces
- `4px`: buttons, inputs, compact cards
- `6–8px`: larger product modules when needed
- `999px`: only true pills such as compact statuses or tags

Avoid 16–32px "soft SaaS" cards.

## 3.5 Borders

Default border:

- 1px
- low-contrast slate-derived neutral
- visible enough to structure information, never ornamental

Preferred approach:

- use spacing first
- use dividers second
- use full card borders only when containment improves comprehension

## 3.6 Shadows

Default: **none**.

Use subtle shadow only for:

- menus
- popovers
- modals
- floating layers that require elevation to explain z-order

Do not use shadows to make ordinary cards feel "premium."

## 3.7 Icons

Use **Lucide** as the default icon library.

Default product treatment:

- outline icons
- typically `20px`
- `1.75–2px` stroke
- inherit the surrounding text/semantic color
- avoid mixing icon families on the same surface
- avoid decorative icon boxes when a direct icon is clearer
- icon-only controls require an accessible name and tooltip when meaning is not universal

---

# 4. Layout System

## 4.1 Marketing surfaces

Recommended maximum content width: `1200–1280px`.

Use:

- 12-column desktop grid
- generous outer margins
- asymmetry inside a disciplined grid
- large image fields only when photography has a real role

Marketing pages should feel editorial, not dashboard-like.

## 4.2 Product application surfaces

Recommended working canvas: `1280–1440px` desktop.

Use:

- persistent left or top navigation only when justified by product breadth
- 12-column content grid where useful
- tighter vertical rhythm than marketing pages
- clear separation between summary, analysis, and evidence

Avoid a dashboard composed of equal-sized cards merely to fill the grid.

## 4.3 Responsive breakpoints

Treat breakpoints as behavior changes, not only width changes.

Recommended design targets:

- Desktop: `>= 1200px`
- Tablet: `810–1199px`
- Mobile: `< 810px`
- Small mobile QA target: `390px`

Framer breakpoints may be adjusted to the implementation, but behavior should follow this hierarchy.

## 4.4 Mobile priority

On mobile, preserve this order:

1. identity
2. primary assessment
3. material warning or change
4. critical metrics
5. explanation
6. dependency detail
7. secondary evidence

Do not preserve desktop side-by-side relationships at the expense of legibility.

---

# 5. Surfaces and Containers

## 5.1 Page background

Preferred:

- white
- snow
- ink for deliberately dark product moments

Do not alternate backgrounds every section merely to create visual rhythm.

## 5.2 Cards

A card needs a reason to exist.

Use a card when content has:

- a distinct state
- a reusable object identity
- an interaction boundary
- a meaningful comparison boundary

Do not place every heading, number, and sentence inside separate cards.

## 5.3 Dark surfaces

Kurtosis product UI is **light mode only**.

Dark surfaces may still be used selectively for:

- primary navigation
- focused summary modules
- major product moments
- controlled contrast

Do not create, expose, or imply a full dark-mode theme unless this system is explicitly revised.

---

# 6. Controls

## 6.1 Buttons

### Primary

Use for one dominant action in a local context.

- ink or signal-blue fill
- high contrast label
- 4px radius
- minimum 40px height desktop
- minimum 44px touch target mobile

### Secondary

- white or transparent surface
- visible border
- ink label

### Tertiary / text

Use for low-emphasis actions such as methodology, source, or drill-down links.

### Button rules

- use action verbs
- avoid "Learn more" when a more precise action exists
- do not put two equal primary buttons next to each other
- avoid icon-only buttons unless the icon is universal or a tooltip/label is available

## 6.2 Inputs and search

Search is especially important for ratings.

Inputs should:

- use explicit labels when ambiguity exists
- show token/position identity clearly in results
- preserve full structured-position names
- distinguish symbol from protocol or wrapper
- support keyboard focus visibly

## 6.3 Tabs

Use tabs only for sibling views of the same object.

Good:

- Overview
- Risk factors
- Dependencies
- Methodology

Bad:

- unrelated navigation disguised as tabs

## 6.4 Tooltips

Use tooltips for short definitions, not essential explanation.

If information is required to interpret a rating or investment risk, keep it visible or one clear interaction away.

---

# 7. Data Formatting

## 7.1 Numbers

Default conventions:

- percentage: `8.42%`
- currency: `$18.4M`
- ratio: `1.42×` or documented domain convention
- rating: `BBB`
- token-risk score: `0.68` (raw internal numeric score; lower is better)
- date: use unambiguous date formatting, e.g. `07 Sep 2026`
- time: include timezone where relevant to market or data recency

Do not create fake precision.

If the source is only precise to one decimal place, do not display three.

## 7.2 Sign and direction

Use explicit sign when direction matters:

- `+1.8%`
- `-0.7%`

Pair movement with:

- time window
- comparison basis
- direction icon where helpful
- text label when risk interpretation is non-obvious

## 7.3 Missing values

Use:

- `—` for unavailable numeric data
- explanatory state text when absence matters

Do not display `0` when the value is unknown.

## 7.4 Recency

Elfa AI is used as a real-time intelligence source. The interface must still display the actual source/update timestamp rather than relying on the phrase "real-time" as a substitute for recency evidence.

Use language such as:

- `Updated 14 min ago`
- `As of 08 Sep 2026, 02:40 SGT`
- `Source: Elfa AI · real-time intelligence`

The exact thresholds that convert timestamps into `Current`, `Delayed`, or `Stale` labels are **not yet defined**. Until they are:

- always show the timestamp
- do not infer a stale threshold
- do not label a record `Current`, `Delayed`, or `Stale` from elapsed time unless the product supplies that state directly
- preserve source-level evidence quality such as `Stale` when the methodology explicitly marks an evidence item stale

Never imply live data unless the source actually supplies live/real-time data for that field.

---

# 8. Ratings Semantics

## 8.1 Grade ladder

Kurtosis uses an **S&P-inspired internal token-risk grade ladder**, not the full S&P Global credit-rating scale.

The currently recommended pre-calibration ranges are:

| Token-risk score | Grade | Classification |
|---|---|---|
| `0.00 <= score < 0.50` | `A` | Investment grade |
| `0.50 <= score < 0.75` | `BBB` | Investment grade |
| `0.75 <= score < 1.00` | `BB` | Speculative grade |
| `1.00 <= score < 1.50` | `B` | Speculative grade |
| `1.50 <= score < 2.00` | `CCC` | Speculative grade |
| `2.00 <= score < 2.50` | `CC` | Speculative grade |
| `2.50 <= score < 3.00` | `C` | Speculative grade |
| `3.00 <= score` | `D` | Uninvestable |

Rules:

- lower numeric scores represent better assessed token risk
- final layer and token outputs use the `A / BBB / BB / B / CCC / CC / C / D` ladder
- do not invent `AAA`, `AA`, `+`, or `-` modifiers unless the methodology is explicitly revised
- `A` and `BBB` are the investment-grade buckets in the current internal ladder
- `BB` and below are speculative-grade buckets; `D` is uninvestable
- these are **internal token-risk grades**, not external credit ratings and not default-probability estimates
- factor scorecards may continue to use factor-level `Low / Medium / High` numeric inputs; do not substitute those labels for the final grade

## 8.2 Rating output

A rating surface should distinguish at minimum:

- exact position name
- underlying asset(s)
- approved grade, when one exists
- numeric token-risk score, when one exists
- rating status
- confidence, when an approved rating exists
- rating rationale
- material risk factors
- dependency structure
- redemption or maturity path where relevant
- methodology reference
- data/source recency

Optional where supported:

- indicated rating
- previous approved rating
- rating change
- historical rating timeline
- source-level evidence

## 8.3 Rating status

The **grade describes assessed risk**. The **status describes whether that assessment can be approved, is rejected, or requires monitoring**.

### `NO_RATE`

Cannot approve a rating yet because evidence is missing, contradictory, insufficient, or required assessment steps remain unresolved.

- does **not** automatically mean the asset is unsafe
- an indicated analytical result may remain visible
- no approved rating should be implied
- approved confidence is left empty when essential evidence prevents approval

### `REJECT`

The position is assessed as structurally uninvestable because sufficient evidence identifies a fundamental problem that prevents approval.

Do not visually conflate `REJECT` with `NO_RATE`, and do not silently translate it into a `D` grade unless the methodology/backend explicitly returns both.

### `WATCHLIST`

The position requires closer monitoring because weaknesses, uncertainty, or changing conditions need follow-up.

- a letter grade can still exist alongside `WATCHLIST`
- make the monitoring status visible without visually replacing the grade

## 8.4 Indicated vs approved rating

- **Indicated rating:** analytical result before final approval
- **Approved rating:** result that has passed the required evidence, review, and approval checks

The UI must label indicated results explicitly. Never style an indicated grade as if it were approved.

## 8.5 Confidence

Confidence describes how strongly the evidence supports the rating:

- `High`
- `Medium`
- `Low`

Methodology constraints:

- `Medium` confidence normally caps the best approved grade at `BBB`
- `Low` confidence caps the best approved grade at `B` and requires `WATCHLIST`
- when missing essential evidence causes `NO_RATE`, approved confidence is left empty

Confidence is not severity. Keep its label and styling separate from `Low / Moderate / High / Critical` risk severity.

## 8.6 Evidence quality and coverage

Evidence quality is recorded at the individual evidence-item level:

- `Complete`
- `Partial`
- `Stale`
- `Contradictory`
- `Missing`
- `Unevaluable`

Coverage means **which required assessment areas have supporting evidence and which still have gaps**.

There is currently **no single overall evidence-coverage percentage**. Do not create progress rings, percentages, or synthetic coverage scores. Prefer a checklist, matrix, or grouped evidence-area state.

## 8.7 Supporting UI states

In addition to methodology status, design operational UI states such as:

- loading
- source unavailable
- unsupported position
- methodology changed
- no historical rating

Never make all non-current states look like generic errors.

---

# 9. Horizon Semantics

## 9.1 Canonical product name

Use:

**Kurtosis Horizon Vault**

Do not invent additional vault-family names unless product explicitly introduces them.

## 9.2 Cycle and maturity terminology

Use these terms consistently:

- `Vault cycle`
- `Current cycle`
- `Cycle start`
- `Cycle end`
- `Maturity`
- `Days to maturity`
- `Next cycle`

Use **maturity** only when the underlying position has a contractual maturity date. Otherwise prefer cycle language.

## 9.3 Canonical user metrics

A Horizon surface should make these metrics easy to find when applicable:

- **Your position value**
- **Net APY**, clearly labeled as `Historical` or `Estimated`
- **Total vault assets (TVL)**
- **Available to withdraw**
- **Next withdrawal window** or **expected settlement date**
- **Fees**
- **Risk grade**
- **Rating status**
- **Evidence confidence**
- **Last updated**

Do not show APY without its basis. Never present estimated APY as realized or guaranteed yield.

Additional strategy analytics such as floating-rate exposure, fixed-rate exposure, WTTM, maturity buckets, or concentration may be shown when they are actually supported and decision-relevant, but they are not mandatory top-level metrics by default.

## 9.4 Withdrawal lifecycle

Canonical lifecycle:

`Available to request → Requested → Queued → Processing → Claimable → Completed`

Additional states:

- `Cancelled`
- `Delayed`
- `Paused`
- `Failed`

Rules:

- show the amount for the withdrawal/request where applicable
- show expected availability or settlement timing where known
- show the reason for any delay
- use `Claimable` only when the user must take a separate claim action
- do not hide a paused, delayed, or failed withdrawal in generic system messaging

## 9.5 Horizon information boundary

A Horizon surface should help a user understand:

- vault identity and objective
- current portfolio state and holdings
- current allocations or exposures
- yield information with clear period/basis
- liquidity and withdrawal conditions
- risk factors
- rating/rationale linkage where available
- cycle/maturity information where relevant
- freshness of portfolio data

Do not imply guaranteed daily liquidity unless the product actually guarantees it.
Do not imply disclosure of proprietary portfolio-management logic.

---

# 10. Navigation and Information Architecture

Prefer a small number of stable product nouns.

Recommended top-level product vocabulary:

- Strategies
- Ratings
- Methodology
- Insights / Research
- About

Within a ratings object:

- Overview
- Risk factors
- Dependencies
- Redemption / Maturity
- Methodology

Within a vault object:

- Overview
- Portfolio
- Risk
- Activity / History
- Methodology or Strategy details

Do not invent new synonyms for the same concept across pages.

---

# 11. Product Copy

Follow the verbal taste in `brand-system.md`.

Additional UI rules:

- state the conclusion before explaining it
- use plain action labels
- define specialist terms at first use when the user may not know them
- avoid marketing language inside analytical modules
- keep warnings specific: state what changed, why it matters, and what the user can inspect
- prefer "Rating rationale" over "Risk insights"
- prefer "Underlying exposure" over "Asset health"
- prefer "Dependencies" over "Ecosystem map"
- prefer "Review methodology" over "Learn more"

Never use copy to make a rating sound safer than the evidence supports.

---

# 12. Interaction and Motion

Motion should explain change or preserve spatial context.

Preferred:

- `120–200ms` control transitions
- restrained ease-out
- subtle disclosure animation
- table-row or value updates without dramatic motion

Avoid:

- bouncy spring motion
- celebratory motion
- parallax inside analytical product pages
- continuous background animation
- auto-rotating carousels
- chart animation that delays reading

Respect `prefers-reduced-motion`.

---

# 13. Accessibility

Minimum standard: WCAG 2.2 AA for production UI where practical.

Required:

- text contrast that passes AA
- visible keyboard focus
- logical tab order
- semantic headings
- accessible names for icon-only controls
- 44px minimum mobile touch target where feasible
- color never used as the only risk/status signal
- tables remain understandable to screen readers
- chart conclusions also available as text or data
- reduced-motion support
- zoom to 200% without loss of core function

Do not trade accessibility for visual austerity.

---

# 14. Product Anti-Patterns

Reject interfaces that look like:

- generic rounded-card SaaS dashboard
- Bloomberg cosplay with unnecessary information density
- retail trading terminal
- DeFi yield farm
- casino or gamified score app
- crypto analytics page with ten unrelated charts
- dark-mode AI dashboard with glowing accents
- consumer fintech "health score" experience

Specific anti-patterns:

- every metric inside an equal card
- giant donut chart for a simple percentage
- decorative gauges for ratings
- green = safe, red = dangerous with no text explanation
- excessive badges
- multiple accent colors in one module
- hidden timestamps
- ratings without rationale
- APY without basis/window
- dependency graphs that are beautiful but unreadable
- animations that obscure data changes

---

# 15. Approval Test

Before approving any Kurtosis product UI, ask:

1. Can the primary user question be answered in under 10 seconds?
2. Is the position or vault identity unambiguous?
3. Can the user see why the conclusion exists?
4. Is the most material risk visible without hunting?
5. Is data recency clear?
6. Are missing/partial/stale states honest?
7. Does the page remain useful without decorative charts?
8. Is the information dense without becoming visually noisy?
9. Would an institutional allocator be comfortable showing this screen internally?
10. Would removing the logo still leave something recognizably Kurtosis?

A product surface should normally pass all ten before being treated as canonical.

---

# 16. Implementation Defaults

Use these defaults for the current Horizon/product implementation unless a repository-specific constraint overrides them:

- framework: **Next.js**
- UI runtime: **React**
- language: **TypeScript**
- styling: **Tailwind CSS**
- charts: **Recharts**
- icons: **Lucide**
- theme: **light mode only**

For charts, keep the design-system rules above primary. Recharts is the implementation library, not permission to add a chart where a number or table is clearer.

---

# 17. Open Decisions / Inputs Still Needed

Most product-critical inputs are now resolved.

## Still required

### Data freshness thresholds

Elfa AI provides real-time intelligence, but Kurtosis has not yet defined exact elapsed-time thresholds for UI labels such as:

- `Current`
- `Delayed`
- `Stale`

Until thresholds are approved, show actual timestamps and source state rather than inventing elapsed-time classifications.

## Can remain implementation-specific

- production breakpoint choices if they differ from the recommended behavior targets
- Framer-specific variable naming if prototype tokens are promoted directly into production
