# Kurtosis Canonical Product Pages

## Purpose

These pages define the current taste bar for generated and engineered UI.

For the Startup Village / Demo Day product surface, treat these as the three canonical experiences:

1. Landing page
2. Ratings detail page
3. Explainable Horizon vault page

They are reference compositions, not rigid templates. New pages may differ when the user job differs, but they should preserve the same hierarchy, density, component language, and product semantics.

---

# 1. Landing Page

## Primary job

Explain what Kurtosis is quickly enough that a sophisticated crypto-native or institutional user knows why to investigate further.

## Primary audience question

> Why does Kurtosis exist, and what can I do with it?

## Desired first impression

- systematic
- institutional
- technically credible
- differentiated from generic DeFi yield products
- visually unmistakable

## Recommended page sequence

### A. Navigation

Keep concise.

Recommended:

- Strategies
- Ratings
- Methodology or Research
- About
- one primary CTA

Do not overload the nav with every company resource.

### B. Hero

One strong thesis.

Preferred composition:

- monumental alpine photography
- strong left-aligned headline
- restrained support sentence
- one primary CTA
- optional secondary text link

Do not place product screenshots, three stats, a badge stack, and a long value proposition in the same hero.

### C. Problem / operating insight

Explain the actual investment problem rather than generic market pain.

Potential structure:

- yield headline does not describe the full position
- wrappers and dependencies change the risk
- institutional teams still need to explain and defend allocations

Use no more than three clear points.

### D. Product system

Introduce the relationship:

`Ratings → explain position risk`

`Horizon → systematically manage fixed-income exposure`

Do not make Ratings and Horizon look like unrelated startups.

### E. Ratings proof / Russian Doll concept

Use a concrete position example.

Show how a visible token can contain multiple dependency layers.

Preferred visual:

- structured dependency stack
- concise rationale
- current rating

Avoid a decorative network graph.

### F. Horizon product proof

Show one serious portfolio or vault surface.

Prioritize:

- what it holds
- how exposures are structured
- how risk reasoning connects to positions

Avoid heroing advertised APY alone.

### G. Evidence

Place verified proof close to the relevant claim.

Use only claims the company can substantiate.

### H. Closing CTA

One direct next action.

Examples:

- Explore ratings
- Explore strategies
- Review methodology

## Desktop behavior

- hero may use a two-field image/text composition
- content max width 1200–1280px
- major sections 96–120px apart

## Mobile behavior

- preserve thesis before imagery if crop compromises legibility
- do not put text over a visually busy mountain crop
- stack product proof modules
- avoid horizontal mini-dashboard layouts

## Landing acceptance criteria

- user can explain Kurtosis after first screen + one scroll
- Horizon and Ratings relationship is clear
- page does not look like generic Web3
- claims have evidence or are qualified
- one dominant CTA exists per major section

---

# 2. Ratings Detail Page

## Primary job

Help the user determine what a specific on-chain position is exposed to and why Kurtosis rates it the way it does.

## Primary audience question

> What would I actually own, how risky is it, and why?

## Demo example

A structured position such as `PT-ONyc` is preferable to a plain token because it demonstrates dependency-aware ratings.

## Recommended page anatomy

### A. Product navigation

Keep product nav quieter than the page content.

### B. Search / asset switcher

Allow the user to change position without leaving the ratings context.

Search results should disambiguate:

- symbol
- full position name
- protocol/wrapper
- chain if relevant
- maturity if relevant

### C. Position header

Use `PositionIdentity`.

Show:

- full position name
- type
- underlying
- protocol/context
- maturity if material

### D. Rating summary

Use `RatingSummary`.

First viewport should include:

- approved grade when one exists
- numeric token-risk score when one exists
- one-sentence rationale
- rating status
- confidence when approved
- actual source/update timestamp
- most material caveat or change

Do not make the user scroll to discover why the grade exists.

### E. What drives the rating

Use `RiskFactorList`.

Show the highest-materiality factors first.

Each row should be understandable without opening it, with deeper evidence available on disclosure.

### F. Russian Doll / dependency structure

Use `DependencyStack`.

The user should understand:

- the position they own
- the wrapper/market
- the underlying
- the critical protocols
- the redemption/base dependency

Annotate material risk at the layer where it originates.

### G. Redemption or maturity path

Use `RedemptionPath` when the position has a non-trivial exit path.

Especially important for PTs, vault shares, looped positions, or assets with redemption constraints.

### H. Evidence / methodology

Expose:

- methodology reference
- source recency
- selected supporting sources
- methodology version if material

Avoid burying methodology in the site footer.

### I. Historical changes, if supported

A compact timeline may show:

- rating change
- methodology change
- material dependency event

Do not invent history if the product does not have it.

## Desktop composition

Recommended first viewport:

- position header across top
- rating summary in a stable left/primary block
- rationale in the main reading column
- currentness and status aligned to the same summary region

Second viewport:

- risk factors as primary column
- dependency structure as adjacent or following major module

Avoid four equal cards across the top.

## Tablet

- stack rating and rationale if needed
- dependency moves below risk factors
- preserve table readability

## Mobile

Order:

1. position
2. rating
3. rationale
4. warning/status
5. material factors
6. dependencies
7. redemption/maturity
8. methodology/evidence

Dependency view becomes a single vertical chain.

## Required states

Design before calling the page complete:

- approved rating
- approved rating + `WATCHLIST`
- `NO_RATE` with no approved grade
- `NO_RATE` with explicitly labeled indicated rating
- `REJECT`
- loading
- unsupported position
- source unavailable
- methodology changed
- evidence items marked `Partial`, `Stale`, `Contradictory`, `Missing`, or `Unevaluable`

## Ratings page acceptance criteria

- exact position is unambiguous
- rating is visible immediately
- rationale is visible in first viewport
- dependency structure can be understood without hovering
- stale/partial state cannot be mistaken for current coverage
- user can reach evidence/methodology in one clear action

---

# 3. Explainable Horizon Vault Page

## Primary job

Help a user understand what the **Kurtosis Horizon Vault** is doing, what they own, what they can withdraw, and the risk context behind its positions.

## Primary audience question

> If I allocate here, what is my position, what is the vault exposed to, and what are my withdrawal/risk conditions?

## Core design boundary

The page should be explainable without implying that Kurtosis publishes every proprietary portfolio-management decision or model rule.

Expose:

- user position state
- vault holdings and key exposures
- risk reasoning
- withdrawal conditions and lifecycle
- relevant portfolio metrics

Do not claim full transparency into proprietary PM logic unless explicitly true.

## Recommended page anatomy

### A. Vault header

Use `VaultIdentity`.

Show:

- `Kurtosis Horizon Vault`
- base asset where relevant
- current vault status
- `Current cycle`
- `Cycle start`
- `Cycle end`
- `Days to maturity` only where the underlying position has contractual maturity

### B. Objective

One concise statement explaining the strategy job before performance or yield.

### C. Your position and key vault state

Use a restrained metric region rather than a gallery of equal cards.

Canonical metrics, when applicable:

- `Your position value`
- `Net APY · Historical` or `Net APY · Estimated`
- `Total vault assets (TVL)`
- `Available to withdraw`
- `Next withdrawal window` or `Expected settlement date`
- `Fees`
- `Risk grade`
- `Rating status`
- `Evidence confidence`
- `Last updated`

Never present estimated APY as realized or guaranteed.

### D. Withdrawal state

Use `WithdrawalTerms` when the user has a pending or available withdrawal action.

Canonical lifecycle:

`Available to request → Requested → Queued → Processing → Claimable → Completed`

Additional states:

`Cancelled · Delayed · Paused · Failed`

Show the amount, expected availability/settlement, and reason for any delay. Use `Claimable` only when a separate user claim action is required.

### E. Current portfolio

Use `AllocationTable`.

Each position should make it possible to understand:

- what it is
- allocation
- maturity where applicable
- yield/rate basis where supported
- risk grade
- rating status
- evidence confidence where supported

Link into the Ratings detail surface where appropriate.

### F. Portfolio exposure

Use `ExposureSummary` only for decision-relevant breakdowns.

Potential analytics, when supported:

- floating vs fixed exposure
- weighted time to maturity
- maturity buckets
- protocol concentration
- asset concentration
- rating distribution

These are secondary analytical modules, not mandatory top-level metrics.

Avoid a dashboard gallery of charts.

### G. Risk summary

Explain current material portfolio risks.

Separate:

- portfolio-level exposure
- position-level rating concerns
- operational/liquidity constraints

Where a position is `WATCHLIST`, `NO_RATE`, or `REJECT`, preserve that exact status rather than translating it to generic warning language.

### H. How Kurtosis evaluates holdings

Show the relationship between Horizon and Ratings.

Preferred pattern:

`Position row → grade/status/confidence → inspect rating rationale`

This is better than a generic "Powered by Kurtosis Risk Engine" badge.

### I. Methodology / disclosures

Expose:

- strategy description
- actual data timestamp
- source where relevant
- material methodology links
- product limitations

If Elfa AI contributes real-time intelligence, label the source accurately while still showing the actual timestamp.

## Desktop composition

Recommended:

- header + objective
- user position / key vault-state region
- withdrawal state when active
- primary portfolio table
- risk/exposure analysis below or alongside where width allows

The portfolio table should carry more visual importance than decorative performance charts.

## Mobile composition

Order:

1. vault identity
2. objective
3. current status/warning
4. your position value
5. net APY + basis
6. available to withdraw + next withdrawal/settlement state
7. risk grade + rating status + confidence
8. current holdings
9. risk/exposure summary
10. methodology/disclosures

Portfolio rows become expandable compact records if necessary.

## Required states

Design:

- active/current
- loading
- no active positions
- withdrawal available
- withdrawal requested
- queued
- processing
- claimable
- completed
- cancelled
- delayed
- paused
- failed
- source unavailable / partial source data
- cycle ended where applicable

## Explainable vault acceptance criteria

- user understands the strategy before seeing yield
- user can find their position value quickly
- APY basis is explicit
- withdrawal amount/state/timing are findable
- current holdings are inspectable
- risk grade, rating status, and confidence are not collapsed into one signal
- risk is connected to actual positions
- portfolio data timestamp is clear
- page does not imply proprietary logic is fully disclosed

---

# 4. Cross-Page Consistency Rules

Across all three canonical pages:

- use the same position naming convention
- use the same rating component
- use the same freshness/status language
- use the same spacing tokens
- use the same border/radius rules
- use the same risk terminology
- use the same CTA hierarchy
- use the same source/methodology patterns

A user moving from Landing → Ratings → Horizon should feel like they stayed inside one system.

---

# 5. Recommended Demo Flow

For Demo Day, the strongest product story is likely:

1. **Landing:** state the problem and product thesis.
2. **Ratings:** search/open a structured position and show why the surface token name is insufficient.
3. **Dependency:** open the Russian Doll layers and identify the material risk source.
4. **Horizon:** show a managed vault holding positions that can be inspected with the same risk language.
5. **Close:** return to the decision outcome: the allocator can inspect what is held and understand the risk reasoning behind the position.

This flow should guide page transitions and prototype interactions.

