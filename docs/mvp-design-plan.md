# Ratings MVP design plan

Prepared before implementation, 08 Sep 2026. Design source: `kurtosis-taste`, including the full brand reference, product system, UI patterns, canonical ratings page, visual board, and QA guide.

## User and job

An investment or risk analyst needs to inspect what an unlevered ONyc, PT-ONyc, or PT-srONyc position represents, understand the important unresolved risks, and trace each conclusion to evidence. The initial scope is a research snapshot on Solana. Position size, custody, exact PT series, holding period, and executable cash exit must be identified before approval.

## Information hierarchy and composition

Use a light, editorial research workspace: quiet top navigation, a searchable three-position directory, and a dominant assessment pane. Lead with position identity, approval state, the blocking reason, and the evidence observation date. Follow with material risk factors and an inspectable dependency stack. Keep comparison, exits, evidence, and methodology one clear action away. No unsupported APY, liquidity, score, or historical charts.

Reuse `PositionIdentity`, `RatingSummary`, `RiskFactorList`, `DependencyStack`, `RedemptionPath`, `EvidenceSource`, `CoverageState`, and semantic tables from the taste references. Use the existing Kurtosis logo. White, snow, ink, slate, and a restrained blue interaction accent; Inter, tabular numerals, 4px control radii, no shadows on analytical surfaces. Photography is unnecessary inside this analytical workspace.

## Data and visual treatment

Complete the primary-source evidence register and the visualization research before writing application code. Preserve each claim's source, observation date, assurance boundary, and missing information. Product data is a versioned research read model, distinct from the complete canonical rating record. Approval state, evidence quality, confidence, and risk severity remain separate. Missing numeric values stay null. Display no synthetic coverage percentage.

Use a comparison table for the three positions, an evidence-area matrix for missing/partial/contradictory findings, a vertically ordered dependency structure with selectable details, and separate ordered entry/settlement/early-exit/stress routes. Any senior loss illustration must be expressly hypothetical, disclose its denominator, and have no effect on the rating. Do not imply a senior label overrides inherited risk.

## Interaction and states

Provide search, position selection, sibling-view navigation, source inspection, comparison, and downloadable assessment packets. Keep selection in the URL for sharing. A local analyst note, if included, is explicitly personal and never evidence or approval. Static observations remain available without external services. Expose empty search, unavailable evidence, unsupported position, loading, and recoverable error states. Display actual dates, with no invented freshness threshold or live feed.

## Responsive and accessible behavior

At desktop, preserve a narrow directory and a wide reading pane. At tablet, compress navigation and stack analytical regions when needed. At 390px, use a horizontal position selector and stack identity, assessment, caveat, explanation, dependencies, and evidence. Comparison tables can scroll within a labeled region. Maintain 44px touch targets, visible focus, semantic headings/tables, readable contrast, reduced motion, and text equivalents for visual relationships.

## Verification

Test financial/display invariants, source references, graph validity, exports, search and URL navigation. Exercise real browser flows at desktop, tablet, and 390px; review screenshots for hierarchy and overflow. Check keyboard use, accessible names, contrast, and error handling. Run type checks and a production build. Retain the original methodology and historical records intact.
