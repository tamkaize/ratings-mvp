# Visualization and assessment rules for the ratings MVP

Research date: 08 Sep 2026. This document records the design and assessment decisions before product implementation. It applies to ONyc, PT-ONyc, and PT-srONyc. It is a product research specification, not methodology approval or a completed canonical rating record.

## Decision

Build an evidence-led assessment workspace. The first screen should show what the selected position is, its approval disposition, the principal reason, and the date/basis of the evidence. A comparison table, a dependency stack, and ordered exit routes should answer the investment questions before numerical graphics are considered.

The supplied methodology is `v0.3-alpha`, explicitly draft, with approval pending. The supplied ONyc brief also identifies unresolved exact-route inputs and a senior-tranche calibration issue. These facts allow useful source-backed assessments; they do not authorize fabricated scores, grades, sign-offs, or apparent ranking precision. Unless new approved methodology and review records are supplied, the three MVP assessments should have an approved result of `NO_RATE` and no approved numeric score or confidence. An indicated result is optional and requires a reproducible workpaper; this MVP should leave it empty when that work has not been completed. See the [methodology](../../Token%20Risk%20Rating%20Methodology%20V0.3%20alpha.md), sections 1, 3.3, 7.5, 9, and 13, and the [ONyc assessment brief](../onyc-assessment-guide.md).

## Governing local references

The [Kurtosis Taste skill](../../kurtosis-taste/SKILL.md) controls brand execution. The [brand system](../../kurtosis-taste/references/brand-system.md), [product design system](../../kurtosis-taste/references/product-design-system.md), [UI patterns](../../kurtosis-taste/references/ui-patterns.md), [canonical ratings page](../../kurtosis-taste/references/canonical-pages.md), and [product QA guide](../../kurtosis-taste/references/product-ui-qa.md) require restrained analytical density, evidence near claims, explicit position identity, distinct approval/confidence/severity meanings, accessible controls, and visual inspection before delivery.

The [canonical record schema](../../output%20formatting/token-risk-rating.schema.json), version `2.0.2-alpha`, remains the storage contract for complete individual assessments. A compact MVP projection must be labeled as a read model; it must not pretend to pass that much larger schema. Keep the historical Kamino looping pilot scoped to its leveraged route. Its July arithmetic does not provide ONyc spot or either Exponent PT with a current approved score.

## External evidence and concrete choices

The following are primary guidance sources, inspected on 08 Sep 2026. Their recommendations inform the product; the application choices are Kurtosis design judgments.

| Concern | Evidence | MVP application |
| --- | --- | --- |
| Honest comparisons and axes | Government Analysis Function recommends plain charts, clear labels, zero baselines for bars, and considers a good table a strong alternative. It advises leaving gaps when observations are missing. [Data visualisation: charts](https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/) | Compare the three positions in a table. Use a horizontal bar only for real, comparable quantitative observations. Never bridge absent time-series observations. |
| Uncertainty that changes the decision | Quality limitations should be prominent; explain their effect on interpretation. Quantified bounds belong with an estimate when supported. [Communicating quality, uncertainty and change](https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/) | Put `NO_RATE` and the binding evidence gap beside the assessment. Show uncertainty in words when it has not been quantified. Do not invent error bars, confidence percentages, or scenarios. |
| Meaning beyond color | WCAG requires information conveyed by color to have another visual means. [Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | Every status has visible text. Every dependency edge has a role label. A selected position has a non-color indicator. Confidence uses neutral text separate from risk severity. |
| Readable text | WCAG AA text contrast is at least 4.5:1 for normal text and 3:1 for qualifying large text. [Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Verify text on its actual background, including metadata, controls, and semantic labels. Reserve ice-blue for suitable accents rather than small text on white. |
| Meaningful graphical contrast | Required graphical objects and control-state cues need 3:1 contrast against adjacent colors, subject to the criterion's exceptions. [Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Give dependency connectors and control focus/selection cues sufficient contrast when required for understanding. Do not rely on a faint border alone to reveal an interactive element. |
| Accessible tables | Header/data semantics and explicit relationships give assistive technology context; captions identify the table. [W3C Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/) | Use native `table`, `caption`, `th`, and `scope`. Keep row/column headers meaningful. Use real buttons for sorting and expose sort state. |
| Diagram alternatives | Complex graphics need an identifying description and an accessible account of essential relationships and information. [W3C Complex Images](https://www.w3.org/WAI/tutorials/images/complex/) | The dependency stack is semantic HTML with visible relationship text. If a native SVG connector layer is used, keep all essential node and relationship information in text. A chart gets a summary and inspectable values. |
| Targets and interaction | WCAG 2.2's minimum pointer target is 24 × 24 CSS pixels, with specified spacing and other exceptions. [Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Follow the stronger local preference of 40px desktop and 44px mobile control height. Avoid tightly packed icon-only disclosure targets. |

### Screen composition and behavior

User: an allocator or risk analyst deciding what requires investigation before allocation. Primary job: understand the exact position, why no approved rating is available or why an approved result binds, and the path from the held token to the intended cash exit.

1. **Quiet product navigation and position identity.** Show Kurtosis Ratings, a compact comparison entry point, and a searchable position switcher. Identity includes symbol, structure, protocol, chain, maturity where applicable, and exact-scope resolution. ONyc has no PT maturity. Never use a ticker alone to identify a rated PT series.
2. **Assessment and rationale.** Use `PositionIdentity`, `RatingSummary`, `RatingStatus`, and `DataFreshness`. The left assessment column stays stable; the main reading column carries one decisive sentence. The first viewport includes `NO_RATE`, its binding reason, and the review timestamp. A `WATCHLIST` flag may coexist and has its own meaning.
3. **Material factors.** Reuse `RiskFactorList`. Each row states the failure condition, why it matters, evidence state, and source link. Order by decision materiality. Avoid uncalibrated Low/Moderate/High/Critical labels when the available assessment supports only a mechanism and gap.
4. **Underlying exposure.** Reuse `DependencyStack`: a compact vertical ownership/economic chain with expandable layer details. Distinguish the held asset from protection, infrastructure, and settlement dependencies. Label proposed analytical graph treatments when scope/materiality remains under review.
5. **Redemption / Maturity.** Reuse `RedemptionPath`: explicit ordered steps with input/output assets, timing/eligibility constraints, route dependencies, and failure points. Keep maturity redemption, issuer withdrawal, and secondary sale distinguishable. An entry path is a separate direction, not reverse-engineered from the dependency tree.
6. **Evidence and methodology.** Reuse `EvidenceSource` and area-level evidence states. Put primary-source links and actual observation dates beside claims, with a compact source drawer or disclosure for detail. Make methodology and unresolved approval gates accessible in one action.

Use white/snow surfaces, ink and slate typography, restrained signal-blue interaction, Inter if available, tabular numerals, 4px controls, aligned rows, and minimal shadow. Reserve alpine imagery for editorial framing only if it earns space; keep analytical modules clear. On mobile, preserve the same reading order, turn the dependency view into a single vertical chain, and retain comparison header context through a contained horizontal table or an equivalent labeled per-position view. Critical caveats must remain visible without hover.

Keep loading, source unavailable, unsupported position, missing history, and methodology-changed states distinct from methodology dispositions. A static snapshot must say so. Refreshing the browser must not change the observation date to imply newer evidence.

### Chart and table contract

| Question | Initial MVP representation | Required input / restriction |
| --- | --- | --- |
| How do these positions differ? | Three-row comparison table: position, structure, maturity, approval result, primary blocker, exit distinction | Match size, horizon, cash denomination, and access assumptions before claiming quantitative comparability. Different token-family lanes/loss objects prohibit naive grade ranking. |
| What does the holder depend on? | Labeled dependency stack, with protection and shared conditions visibly attached beside the relevant layer | Distinguish economic ownership, direct scoring children, shared failure conditions, and transaction order. No force-directed graph. |
| What still prevents approval? | Evidence matrix: required area, quality state, unresolved question, consequence, source/date | No percentage of evidence coverage is defined. Counts may describe actual records but cannot imply confidence or probability. |
| How is the position realized? | Ordered route list with normal and stress explanations | Actual output denomination, timing, eligibility, capacity, fees, and fallback must be verified or explicitly unresolved. |
| Does junior capital protect senior capital? | Qualitative loss-order and state-transition table | Any numeric loss waterfall requires exact senior/junior NAV, denominator, coverage rule, timestamps, program state, and approved treatment. No live buffer inferred from documentation examples. |
| How has risk or value changed? | Only supported dated events; otherwise explicit absence | Do not generate history from a single snapshot or repurpose another route's historical rating. |
| What returns can be compared? | Source-backed labeled metric or absence | Distinguish implied yield, estimated APY, historical return, and incentives. Observe date, maturity, quote size, fees, and exact market. No default yield leaderboard. |

Future numeric score display uses the raw score with the text “Lower is lower assessed token risk.” It is neither `/100` nor a default probability. Grades are ordinal; do not place letters at invented equally spaced numeric positions. Factor components are not a pie-chart partition of risk. A future composition bar must use an actual common denominator and retain unknown composition rather than normalize known observations to 100%. These are product interpretation rules derived from the local methodology.

## Assessment rules suitable for implementation

The MVP should validate its projection at load/build time and fail visibly on contradictory records. UI formatting must not silently repair an invalid approval record into an apparent result.

| Rule | Condition / consequence |
| --- | --- |
| R01 Exact scope | Missing material object, chain, mint, market, maturity, share class, route, or required horizon/size assumptions → `NO_RATE`. Preserve identified candidate markets separately from a resolved exact rated position. |
| R02 Approval gate | An approved numeric result requires approved/effective score formation, complete graph/attribution, effective conditions/operators, triggered critical-path review, required mitigation records, reconciliation, and reviewer/approver sign-off. Otherwise retain `NO_RATE`; do not auto-approve after data refresh. |
| R03 Evidence gap | Missing/unevaluable Required evidence or material unresolved contradiction blocks approval unless an explicit approved treatment makes the conclusion independent of the gap. Preserve approved exceptions; never invent one. |
| R04 Disposition | Missing evidence is `NO_RATE`. `REJECT` requires sufficient evidence of structural uninvestibility. `WATCHLIST` is independent monitoring and can coexist with an indicated or approved grade or with `NO_RATE`. |
| R05 Separate result stages | Diagnostic, chargeable, indicated, and approved results are separate. Any displayed indicated grade/score is labeled `Indicated`. Approved score/confidence are null where there is no approved rating. |
| R06 No invented evidence arithmetic | Evidence quality and confidence do not add/subtract economic risk points. Do not generate an evidence score, completion percentage, or synthetic confidence from source count. |
| R07 Graph propagation | Only material `D` children feed inherited risk: `max(child.indicatedRisk)`. Current increment is the sum of fixed-weight `NEW` contributions. No summing all child scores and no reweighting excluded contributions. |
| R08 Attribution integrity | `D/I/S/R` graph role is separate from `NEW/CARRIED/SHARED` economic attribution. `CARRIED` and `SHARED` require complete carrier/condition records before receiving zero local charge. `R` normally contributes local Venue risk unless supported attribution establishes another treatment. |
| R09 Shared controls | Define a failure condition once and attach it to each affected layer; do not double-charge the same Exponent control failure. Distinct program failures remain distinguishable when their conditions differ. |
| R10 Seniority | Do not reduce srONyc/PT-srONyc inherited risk below its material ONyc child under current methodology. No negative `NEW`, hidden child relabeling, or automatic senior-label uplift. A waterfall annex documents mechanics; a score transformation still requires an approved versioned methodology change. |
| R11 Protection accounting | Junior capital is a protection dependency, not an additional senior-owned collateral holding. Do not add reinsurance exposures and the collateral assets supporting the same economic structure as independent reserve totals. |
| R12 Time and capacity | PT maturity, recovery pauses, NAV sync, withdrawal windows, and execution depth require scenario/critical-path treatment where material. TVL and volume do not establish executable depth for the assessed size. |
| R13 Confidence ceilings | Medium confidence normally caps the best approved grade at `BBB`; Low caps it at `B` and requires `WATCHLIST`. Preserve approved exceptions and all worse economic grades. `NO_RATE` is not a confidence level. |
| R14 Null and N/A | Unknown numeric inputs are null and displayed as `—` with a reason. Zero means measured zero. N/A means structurally irrelevant; never use it for missing or unreviewed information. |
| R15 Currentness | Store source publication/effective/observation times separately from research retrieval/review times. Display actual timestamps. Do not compute Current/Delayed/Stale using an invented threshold; preserve source/reviewer-supplied evidence state. |
| R16 Provenance | Every material factual assertion links to a source and exact supported claim; derived statements carry assumptions and method. Official descriptions are evidence of described mechanics, not automatic verification of deployed state, enforceability, or current liquidity. |
| R17 Comparative scope | Retain token-family lane and primary loss object. Equal grades in different lanes do not establish equal probability, recovery, severity, liquidity loss, or expected loss. No blanket safest-position sorting. |
| R18 No silent route borrowing | A Kamino leveraged ONyc assessment is not an ONyc spot assessment. An Exponent series is not interchangeable with another maturity or PT mint. Material route changes create a new assessment/version or explicit sensitivity. |

Rule authority: local methodology sections 1–3, 6–9, 10.10–10.11, and 12; tranche-specific interpretation in the ONyc assessment brief. These rules preserve the supplied method; they do not calibrate it.

## Canonical status and score fields

Keep storage values intact. Derive readable labels at the rendering boundary.

| Canonical path | Type / meaning | UI mapping |
| --- | --- | --- |
| `schema_version` | `2.0.2-alpha` for a complete canonical record | Only claim this version for a schema-conforming complete record. |
| `methodology_version` | e.g. `v0.3-alpha` | Visible methodology reference, including draft/approval caveat from the methodology record. |
| `status` | `draft / in_review / approved / watchlist / no_rate / rejected / superseded` | Record lifecycle; preserve separately from the output booleans. |
| `final_output.indicated_economic_score` | Nonnegative number or null | “Indicated token-risk score”; hide absent value or show explained `—`. |
| `final_output.indicated_grade` | `A / BBB / BB / B / CCC / CC / C / D / null` | Explicit `Indicated` label; never approved styling. |
| `final_output.indicated_confidence` | `High / Medium / Low / null` | Only alongside the indicated analysis it supports. |
| `final_output.approved_economic_score` | Nonnegative number or null | Approved raw token-risk score only when a supported approved rating exists. |
| `final_output.approved_grade` | Grade ladder, `NO_RATE`, or `REJECT` | Extract letter grade and disposition into separate display fields. `NO_RATE`/`REJECT` are not letter grades. |
| `final_output.approved_confidence` | `High / Medium / Low / null` | Null when no approved rating exists. |
| `final_output.watchlist` | Boolean | Separate visible monitoring label when true. |
| `final_output.no_rate` | Boolean | `NO_RATE` disposition; validate consistency with approved grade and missing approved score/confidence. |
| `final_output.rejected` | Boolean | `REJECT` disposition; do not infer `D`. |
| `final_output.score_formation_gate_passed` | Boolean | One prerequisite for approval, not approval itself. |
| `final_output.binding_driver_ids / gap_ids / limitation_ids` | Referenced IDs | Trace rationale to factors, gaps, and limitations. |
| `final_output.token_family_lane / primary_loss_object` | Strings | Keep the interpretation context with the assessment and comparison. |
| Evidence `evidence_state` | `complete / partial / stale / contradictory / missing / unevaluable` | Sentence-case text. Keep separate from materiality and severity. |
| `frozen_at / created_at / updated_at` | Datetimes | Record timestamps; not substitutes for individual source observation dates. |

The display projection can use this explicit shape without claiming to be a full canonical record:

```ts
type Grade = 'A' | 'BBB' | 'BB' | 'B' | 'CCC' | 'CC' | 'C' | 'D';
type Confidence = 'High' | 'Medium' | 'Low';
type Disposition = 'APPROVED' | 'NO_RATE' | 'REJECT';
type EvidenceState =
  | 'complete' | 'partial' | 'stale'
  | 'contradictory' | 'missing' | 'unevaluable';

type AssessmentSummary = {
  dataKind: 'assessment_read_model';
  id: string;
  methodologyVersion: string;
  exactScopeResolved: boolean;
  disposition: Disposition;
  watchlist: boolean;
  approvedScore: number | null;
  approvedGrade: Grade | null;
  approvedConfidence: Confidence | null;
  indicatedScore: number | null;
  indicatedGrade: Grade | null;
  indicatedConfidence: Confidence | null;
  scoreFormationGatePassed: boolean;
  rationale: string;
  blockingGapIds: string[];
  sourceIds: string[];
  tokenFamilyLane: string;
  primaryLossObject: string;
  reviewedAt: string;
  observationBasis: string;
};
```

For initial `NO_RATE` records: `approvedScore`, `approvedGrade`, and `approvedConfidence` are all null; indicated fields are also null unless supported by an actual reproducible workpaper; `scoreFormationGatePassed` is false while the applicable specifications remain unapproved. `watchlist` must reflect an actual monitoring determination, not a default coloring choice. A working research dataset may add `scopeStatus`, candidate market IDs, source claims, and route assumptions without presenting them as complete canonical rating fields.

Pre-calibration grade boundaries, for explaining supplied future scores rather than producing scores: `A [0,0.50)`, `BBB [0.50,0.75)`, `BB [0.75,1.00)`, `B [1.00,1.50)`, `CCC [1.50,2.00)`, `CC [2.00,2.50)`, `C [2.50,3.00)`, `D [3.00,∞)`. Do not use `AAA`, `AA`, plus/minus modifiers, or default-probability language. Operators and approval gates still apply after score-to-grade lookup.

## Pre-delivery review

Validate all three assessment projections and source references; explicitly exercise null and conflicting-status handling. Confirm each position switch changes its identity, underlying layers, route, rationale, and evidence without mixing series. Check keyboard access, focus, visible status labels, native table context, responsive reading order, 200% zoom, and actual contrast. Inspect desktop and mobile screenshots against the reference board and perform the skill's reduction/taste pass. Every visible control must work or have a clearly explained inactive state. Finish with a concrete list of unresolved inputs rather than an invented “complete” assessment.
