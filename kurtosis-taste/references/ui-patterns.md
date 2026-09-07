# Kurtosis Product UI Patterns

## Purpose

This file defines reusable product-specific patterns for Ratings and Horizon.

Read in this order:

1. `brand-system.md`
2. `product-design-system.md`
3. this file
4. `canonical-pages.md` for page composition

The goal is to prevent every new screen from inventing its own way to present risk, ratings, dependencies, or portfolio information.

---

# 1. Component Families

Use generic primitives only as the base layer.

Kurtosis should also have product-specific component families.

## Ratings

- `PositionIdentity`
- `RatingBadge`
- `RatingSummary`
- `RatingStatus`
- `RatingChange`
- `RatingRationale`
- `RiskFactorList`
- `RiskFactorRow`
- `DependencyStack`
- `DependencyNode`
- `RedemptionPath`
- `MethodologyReference`
- `EvidenceSource`
- `DataFreshness`
- `CoverageState`

## Horizon

- `VaultIdentity`
- `VaultObjective`
- `VaultMetric`
- `AllocationTable`
- `PositionRow`
- `ExposureSummary`
- `FloatingRateExposure`
- `MaturitySummary`
- `WithdrawalTerms`
- `RiskSummary`
- `PositionRatingLink`
- `PortfolioFreshness`

## Shared

- `SectionHeader`
- `InlineDefinition`
- `StatusLabel`
- `WarningBanner`
- `EmptyState`
- `Skeleton`
- `SourceList`
- `Timestamp`
- `ChangeIndicator`
- `DataTable`

---

# 2. PositionIdentity

## Job

Make it immediately clear what exact position is being evaluated.

## Required content

- canonical position name
- ticker/symbol where applicable
- product/protocol context when necessary to disambiguate
- position type, e.g. underlying, lend, PT, vault, looped position

## Optional

- chain
- contract address
- issuer/protocol
- maturity date

## Rules

- position name is always more prominent than ticker
- do not collapse a structured position into the underlying token identity
- contract address is metadata, not the headline
- show maturity beside the name when it materially changes interpretation

---

# 3. RatingBadge

## Job

Communicate the current grade quickly.

## Anatomy

- grade text
- optional short status label
- optional change marker

## Rules

- grade must remain readable in monochrome
- do not use a circular gauge
- do not use color as the only severity signal
- avoid oversized treatment that turns the rating into gamification
- preserve enough visual weight that it is one of the first things seen

## Example hierarchy

`BBB`

`Token-risk score 0.68`

`Approved · High confidence`

`Updated 14 min ago`

---

# 4. RatingSummary

## Job

Answer: "What is the current assessment, can it be relied on as approved, and what is the main reason?"

## Required content

- approved grade when one exists
- numeric token-risk score when one exists
- one-sentence rationale
- rating status
- confidence when an approved rating exists
- source/update timestamp
- highest-priority risk factor or caveat

## Optional

- indicated rating
- previous approved rating
- change date
- short methodology link

## Status behavior

- `WATCHLIST`: keep the grade prominent and show `WATCHLIST` as a separate monitoring state
- `NO_RATE`: do not imply an approved grade; an indicated grade may be shown only with an explicit `Indicated` label
- `REJECT`: show the rejection state prominently; do not automatically translate it to `D` unless the product supplies both

## Layout

Desktop:

- grade and numeric score occupy a narrow stable assessment column
- rationale occupies the main reading column
- status, confidence, and freshness remain visible without competing for attention

Mobile:

- grade/approval state first
- numeric score second when present
- rationale third
- material warning/status next
- confidence and timestamp after the main assessment

---

# 5. RatingRationale

## Job

Explain the grade in language an investment or risk team can repeat internally.

## Structure

1. conclusion
2. material drivers
3. mitigating factors
4. unresolved or conditional factors
5. evidence/source links where appropriate

## Rules

- prefer 2–4 strong points over ten weak bullets
- separate observed facts from methodology inference when useful
- do not state "safe" or "low risk" without the exact methodology supporting that language
- avoid generic phrases such as "strong fundamentals"

---

# 6. RiskFactorList

## Job

Show which factors materially drive the rating.

## Recommended row anatomy

- factor name
- assessment/status
- short explanation
- evidence/metric where supported
- disclosure control for detail

## Example factors

Depending on methodology:

- underlying asset risk
- protocol risk
- liquidity / exit risk
- oracle dependency
- smart-contract dependency
- issuer / counterparty dependency
- redemption risk
- maturity mismatch
- concentration
- bridge exposure

Do not hard-code this list if the methodology uses different factor names.

## Ordering

Order by materiality to the rating, not alphabetically.

---

# 7. DependencyStack

## Job

Make the "Russian Doll" structure legible.

## Preferred representation

Default to a vertically ordered or nested dependency structure before using a free-form node graph.

A good first representation is:

`Position owned`
↓
`Wrapper / market`
↓
`Underlying position`
↓
`Protocol dependencies`
↓
`Base asset / redemption dependency`

## Rules

- ownership direction must be obvious
- each layer must have a semantic label
- the user should understand which layer creates which risk
- avoid arbitrary physics-based network diagrams
- do not require hovering to understand the main dependency chain

## Interaction

Each node may expand to show:

- what the layer does
- material risk
- source / protocol
- rating effect

Keep the default state compact.

---

# 8. RedemptionPath

## Job

Explain how the position returns to a base or spendable asset and where that path can fail or become expensive.

## Anatomy

- ordered steps
- asset at each step
- protocol/market used
- timing or maturity condition
- major dependency/risk at the step

## Rules

- represent direction explicitly
- distinguish contractual redemption from secondary-market exit
- show maturity requirement where applicable
- do not imply instant liquidity when exit depends on a market

---

# 9. EvidenceSource

## Job

Let the user inspect the evidence behind a claim.

## Show when relevant

- source name
- source type
- timestamp / block / observation date
- external-link indicator
- short context for what the source supports

## Rules

- do not dump raw URLs into the main UI
- distinguish Kurtosis-derived reasoning from externally observed data
- expose raw evidence progressively

---

# 10. RatingStatus and EvidenceState

## Job

Keep approval state, monitoring state, confidence, evidence quality, and coverage distinct.

## Rating statuses

- `NO_RATE`
- `REJECT`
- `WATCHLIST`

Do not represent these as interchangeable severities.

### `NO_RATE`

Use when an approved rating cannot be issued yet because evidence or required assessment steps are unresolved. If an indicated rating is shown, label it `Indicated` explicitly.

### `REJECT`

Use when the position is structurally uninvestable based on sufficient evidence of a fundamental blocker.

### `WATCHLIST`

Use alongside a grade when closer monitoring is required.

## Confidence

Show as a separate label:

- `High`
- `Medium`
- `Low`

Do not color confidence using the risk-severity palette.

## Evidence quality

At individual evidence-item level, support:

- `Complete`
- `Partial`
- `Stale`
- `Contradictory`
- `Missing`
- `Unevaluable`

## Coverage

Show which required assessment areas are supported and which have gaps.

Do **not** show an overall coverage percentage; none is defined.

---

# 10A. DataFreshness

## Job

Make currentness explicit without inventing thresholds.

## Display

Examples:

- `Updated 14 min ago`
- `As of 08 Sep 2026, 02:40 SGT`
- `Source: Elfa AI · real-time intelligence`

Exact elapsed-time thresholds for `Current / Delayed / Stale` are not yet defined.

Until defined:

- always show the timestamp
- use source-supplied state if available
- do not calculate a freshness label from elapsed time
- preserve methodology evidence quality `Stale` when an individual evidence item is explicitly marked stale

---

# 11. WarningBanner

## Job

Surface material information that changes how the user should interpret the page.

Examples:

- rating under review
- source data stale
- methodology changed
- redemption path unavailable
- vault withdrawal restricted
- asset unsupported

## Rules

- one clear sentence explaining what happened
- one sentence or action explaining what the user should inspect
- do not use vague "Something went wrong" copy
- warning color is secondary to text clarity

---

# 12. VaultIdentity

## Job

Make it clear what product the user is allocating to and where it is in its operating cycle.

## Required content

- canonical name: `Kurtosis Horizon Vault`
- base asset where relevant
- vault status
- `Current cycle`
- `Cycle start`
- `Cycle end` where relevant
- `Days to maturity` only when the underlying position has contractual maturity

Use `maturity` only for contractual maturity. Otherwise use cycle terminology.

---

# 13. VaultMetric

## Job

Present the small set of user-facing metrics needed to understand the vault before deeper portfolio analysis.

## Canonical metrics

Show when applicable:

- `Your position value`
- `Net APY` with explicit `Historical` or `Estimated` basis
- `Total vault assets (TVL)`
- `Available to withdraw`
- `Next withdrawal window` or `Expected settlement date`
- `Fees`
- `Risk grade`
- `Rating status`
- `Evidence confidence`
- `Last updated`

## Rules

- do not treat every metric as a separate decorative card
- pair value with unit/basis and relevant timestamp
- never present estimated APY as realized or guaranteed
- risk grade, status, and confidence are separate fields
- use `—` rather than `0` for unavailable values

---

# 14. Strategy-Specific Exposure Metric

## Job

Show a strategy-specific exposure only when it materially helps the user understand the current portfolio.

Examples may include:

- floating-rate exposure
- fixed-rate exposure
- weighted time to maturity
- maturity buckets
- concentration

These are **not mandatory top-level Horizon metrics by default**.

If floating-rate exposure is shown:

- use one explicit percentage
- add one short explanation
- add a target/bound only when one formally exists
- avoid giant donuts; a precise number or horizontal bar is usually enough

---

# 15. AllocationTable

## Job

Show what the vault owns in a way that supports scrutiny.

## Recommended columns

Depending on product availability:

- position
- protocol / venue
- allocation %
- notional/NAV
- yield or fixed rate
- maturity
- rating
- status

## Rules

- left-align descriptive columns
- right-align numerical columns
- support sorting only where it helps a real task
- keep rows compact
- link position rating to the corresponding ratings surface when available
- use sticky headers on long tables
- on mobile, prioritize position, allocation, maturity, rating; disclose secondary fields on expansion

---

# 16. ExposureSummary

## Job

Show portfolio-level exposure without pretending to reveal proprietary PM logic.

Potential categories:

- protocol
- asset
- maturity bucket
- chain
- risk rating bucket
- floating vs fixed exposure

Use only categories that are actually supported and meaningful.

---

# 17. WithdrawalTerms

## Job

Make withdrawal state, amount, and expected availability impossible to miss.

## Canonical lifecycle

`Available to request → Requested → Queued → Processing → Claimable → Completed`

Additional states:

- `Cancelled`
- `Delayed`
- `Paused`
- `Failed`

## Required display where applicable

- current withdrawal state
- amount
- expected availability, withdrawal window, or settlement date
- reason for delay, pause, or failure
- fees or operational constraints that materially affect withdrawal

Use `Claimable` only when the user must take a separate claim action.

Avoid tiny legal-style footnotes for operationally important constraints.

---

# 18. Tables

Kurtosis should prefer tables when the user needs comparison.

## Table rules

- no zebra striping by default
- use subtle row separators or whitespace
- sticky header for long tables
- direct labels
- right-align numbers
- tabular numerals
- default to 40–48px row height for dense desktop data
- preserve sorting state visibly
- never hide critical columns only because they do not fit; define responsive priorities

---

# 19. Charts

Use a chart only when shape, trend, distribution, or comparison matters.

Do not use a chart when a number or table answers the question faster.

Preferred chart types:

- line
- area only when magnitude matters and fill remains restrained
- bar
- stacked bar
- precise timeline

Use donut/pie sparingly.

Avoid:

- 3D
- gauges
- radar charts
- glowing lines
- decorative gradients
- multiple unrelated accent colors

Always include:

- metric definition
- time window
- unit
- direct labels where possible
- source/as-of context when material

---

# 20. States

Every major component should define at least these states where relevant:

## Default

Normal loaded state.

## Hover

Only for interactive elements.

## Focus

Visible keyboard state.

## Selected

Clearly different from hover.

## Disabled

Explain why when the unavailable action matters.

## Loading

Use skeletons for stable layouts; avoid indefinite spinners as the only feedback on complex pages.

## Empty

Explain what is absent and why.

## Error

State the failing operation or data source when known.

## Partial

Show available data while clearly marking missing sections.

## Stale

Keep data visible if useful, but identify age and caution.

## Unsupported

Explain that Kurtosis does not currently cover the position rather than presenting a generic error.

---

# 21. Responsive Pattern Rules

## Tables

Desktop: full table.

Tablet: preserve essential columns; allow horizontal scroll only when comparison still benefits from a table.

Mobile: convert each row into a compact disclosure pattern only when necessary. Keep the same data semantics.

## Dependency stack

Desktop: nested/side-by-side inspection allowed.

Mobile: single vertical chain with expandable details.

## Ratings summary

Desktop: grade + rationale + status can share a row.

Mobile: stack in decision priority order.

## Vault summary

Desktop: key metrics may sit in a restrained grid.

Mobile: no more than two metrics per row; avoid tiny text.

---

# 22. Component Acceptance Checklist

Before a component becomes reusable, verify:

- exact job is documented
- required data is defined
- optional data is defined
- all meaningful states exist
- keyboard focus exists
- mobile behavior exists
- missing/stale data behavior exists
- it does not rely on color alone
- copy follows Kurtosis terminology
- it composes cleanly with surrounding modules
- it does not add decorative complexity

