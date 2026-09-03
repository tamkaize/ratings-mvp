---
title:
type: token-risk-rating-workpaper
status: draft
lifecycle: active
methodology_version: v0.3-alpha
review_date:
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
analyst:
independent_reviewer:
approval_status: pending
---

# Token Risk Rating Workpaper

## 0. Complete Record Identity

```text
Rating series ID:
Rating ID:
Rating version:
Supersedes rating ID, if any:
Record status:
Frozen at:
Created at:
Updated at:
Schema version:
Methodology version:
```

Store each rating version as one complete JSON document. The record includes the full rating, every atomic conclusion, its embedded audit, and its version history; do not create a separate pilot-audit envelope.

## 1. Exact Rated Object And Route

```text
Exact rated object:
Economic form / instrument route:
Chain:
Contract / market / maturity / share class / vault / pool:
Rated access route:
Rated custody and transfer route:
Rated redemption / conversion / settlement route:
Rated liquidation and exit route:
Position-size or market-depth assumption:
Review date:
Source versions:
Token-family lane:
Primary loss object:
Secondary loss objects:
Assumptions:
Scope exclusions:
Language / accounting gates checked:
Preparer / reviewer / approver:
```

If the object or a material route is unclear, record `NO_RATE = Required`.

## 2. Recursive Layer Map

| Layer ID | Object | Function | Parent edge | Instrument route | Venue route | `[D]` children | `[I]` references | `[S]` dependencies | `[R]` dependencies | Materiality and rationale | Assessment status | Non-assessment reason | Evidence state | Horizon |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| L1 | | | | | | | | | | | assessed / unassessed_early_stop | | | |

## 3. Diagnostic Layer Scorecards

Record all relevant `NEW`, `CARRIED`, and `SHARED` items. Evidence is assessed separately and is not an economic increment.

| Layer | Component | Score Formation Specification ID/version/status | Factor / subfactor | Applicable / N/A | Factor score | Component score | Route weight | Factor arithmetic role | Diagnostic contribution | Attribution | Risk Condition ID, if required | Primary carrier | Chargeable contribution | Failure condition / pathway | Rationale | Evidence |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | ---: | --- | --- | --- |
| | Instrument Mechanics | | | | | | | directly_weighted / component_input / diagnostic_only | | | | | | | | |
| | Claim | | | | | | | | | | | | | | | |
| | Substance / Yield Source | | | | | | | | | | | | | | | |
| | Venue / Infrastructure | | | | | | | | | | | | | | | |

Attribution values:

```text
NEW
CARRIED
SHARED
```

Do not fractionally exclude a qualitative dominance score unless its contribution basis was defined before scoring.

### 3.1 Score Formation Specification Gate

| Specification ID | Route module/version | Calculator ID/version | Test-vector IDs | Components/factor IDs | Applicability/N/A rule | Combining rule/formula | Dominance/override | Missing-evidence rule | Route allocation/rounding | Boundary examples | Status | Owner/validator/approver | Effective/review dates |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SFS-001 | | | | | | | | | | | draft / approved / expired / superseded | | |

If any material component depends on an unapproved or incomplete combining, dominance, N/A, missing-data, rounding, or allocation choice, retain diagnostic and indicated arithmetic but set the approved result to `NO_RATE`.

## 4. Risk Condition Master

Complete only for material cross-layer, carried, shared, operator-bearing, Required, Dominant, common-cause, alternative-route, leverage, liquidation, or cycle risks.

State every Risk Condition and impact pathway in full. The system-generated ID exists only for linkage and must not replace the condition statement in human-readable output. A clearly local `NEW` factor does not need a separate Risk Condition record.

| Risk Condition ID | Object and scope | Risk class | Failure condition | Primary impact pathway | Horizon | Common-cause group | Evidence references | Evidence state | Materiality | Economic-effect mode | Primary carrier | Operator IDs | Owner/reviewer | Effective/review dates | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RC-001 | | | | | | | | | | carrier / operator / both / immaterial diagnostic | | | | | |

Failure-condition form:

> If `[condition]` occurs, `[layer function]` is impaired through `[edge or route]`, affecting `[payoff, NAV, redemption, recovery, liquidation, custody, transfer, settlement, or exit]` over `[horizon]`.

Evidence-state values:

```text
complete
partial
stale
contradictory
missing
unevaluable
```

Materiality values are functional, not measures of current risk quality. `Required` does not mean High risk, and `Dominant` does not automatically mean a score of 1.

| Priority | Materiality | Classification test | Workpaper consequence |
| ---: | --- | --- | --- |
| 1 | `Required` | Removing, failing, or leaving the item unevaluable makes a necessary payoff, valuation, recovery, redemption, settlement, liquidation, custody, transfer, or exit function unavailable, or makes the approved conclusion unsupported. | Assess it; unresolved Required information produces `NO_RATE` unless an approved conservative full charge makes the conclusion independent of the gap. |
| 2 | `Dominant` | If it is not `Required`, its plausible standalone failure can control the primary loss object, grade, or a binding score, grade, confidence, `WATCHLIST`, `NO_RATE`, or `REJECT` operator. | Assess it; complete the loss-dominance test and name its carrier or operator. |
| 3 | `Modifier` | If it is neither `Required` nor `Dominant`, a plausible adverse change can still alter a score, result, confidence, band, monitoring status, output language, or binding-driver conclusion. | Assess it locally or through a proportionate named operator. A `SHARED` Modifier still requires a carrier or effective operator. |
| 4 | `Immaterial` | Removing it and applying a plausible adverse state would change none of those outcomes for the scoped route, horizon, and position size. | Exclude from chargeable treatment only with evidence, a counterfactual rationale, and independent-review approval. |

Use the first satisfied class. If an item is both necessary and loss-dominant, record `Required` and also complete the loss-dominance test; do not duplicate the Risk Condition. Reassess the label when the route, horizon, position size, evidence, or primary loss object changes. `Rating-relevant` means `Required`, `Dominant`, or `Modifier`; it is not a fifth class.

## 5. Attachment And Attribution Ledger

| Attachment ID | Risk Condition ID | Layer / object | Graph edge | Graph role | Attribution | Primary carrier | Diagnostic factor | Chargeable contribution | Immediate consequence | Impact pathway | Materiality | Operator | Alternative / mitigation | Evidence / rationale | Approval |
| --- | --- | --- | --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| AT-001 | RC-001 | | | | | | | | | | | | | | |

Graph roles:

```text
[D] direct scoring child
[I] inherited reference
[S] shared dependency
[R] route-specific dependency
```

Operators:

```text
NONE
RISK_SCORE_FLOOR >= x
RATING_CEILING <= grade
CONFIDENCE_CEILING = level
WATCHLIST = Required
NO_RATE = Required
REJECT = Required
```

Every `Required`, `Dominant`, or `Modifier` `SHARED` Risk Condition must have a named primary economic carrier or an effective operator. `NONE` is permitted only for an `Immaterial` diagnostic Risk Condition or when a named carrier demonstrably transmits the effect.

## 6. Chargeable Layer Score And Propagation

Only `NEW` contributions enter the current-layer increment. Excluded weight is not renormalized.

| Layer | `InheritedRisk_L` | `IncrementalRisk_L` | `PreOperatorRisk_L` | Shared operators | Evidence operators | Loss-dominance / disposition operators | `IndicatedRisk_L` | Indicated grade | Confidence |
| --- | ---: | ---: | ---: | --- | --- | --- | ---: | --- | --- |
| | | | | | | | | | |

```text
InheritedRisk_L =
  max(IndicatedRisk_child for material [D] children)

IncrementalRisk_L =
  sum of approved fixed-weight component, factor, or subfactor
  contributions classified NEW at the layer

PreOperatorRisk_L =
  max(InheritedRisk_L + IncrementalRisk_L, 0)

IndicatedRisk_L =
  ApplyOperators(PreOperatorRisk_L)
```

### 6.1 Materiality, Loss-Dominance, And Disposition Test

| Layer / Risk Condition | Materiality | Functional test | High-risk or blocking condition | Impact pathway | Where economically carried | Operator / gate | Binding? | Non-binding rationale and residual trigger | Evidence / reviewer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | Required / Dominant / Modifier / Immaterial | | | | | | | | |

Required or Dominant high-risk items cannot be marked non-binding with generic language. Name the failure pathway, carrier, operator, evidence, and condition that would make the item bind.

Fundamental-layer early-stop gate:

| Required terminal layer | Sufficient evidence? | Structural uninvestibility | Primary loss-object effect | Independent substitute or recovery path | Decision | Unassessed upper layers and reason | Operator/evidence/reviewer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | Continue / `NO_RATE` / `REJECT` | | |

Use `REJECT` and stop upper-layer scoring only when sufficient evidence establishes that the Required terminal layer is structurally uninvestible and no credible independent alternative exists. Use `NO_RATE` for an unevaluable Required terminal layer. Do not publish a numeric top-layer score or grade when the early-stop gate prevents upper-layer assessment.

## 7. Mixed Score-Cell Register

Complete when one component contains both new and carried/shared risks.

| Layer / score cell | New content | Carried/shared content | Decomposable? | Treatment | Conservative limitation | Reviewer |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

Allowed treatments:

```text
Split before scoring using exact contributions.
Classify the whole cell as carried only if wholly duplicated.
Otherwise retain the whole cell as NEW.
NO_RATE where an unresolved Required cell controls the output.
```

## 8. Critical-Path And Time-Cliff Check

| Trigger | Present? | Required annex or treatment |
| --- | --- | --- |
| Several dependencies must work simultaneously | | `AND` / `k-of-n` logic |
| Alternatives may share a common cause | | Common-cause and independence test |
| Leverage or liquidation | | Liquidation pathway and stress treatment |
| Cycle or reflexive backing | | Cycle / strongly connected component analysis |
| Dependency order changes outcome | | Fault tree, bow-tie, or minimal cut set |
| Required or Dominant item cannot be attributed | | Conservative treatment or `NO_RATE` |
| Maturity, migration, incentive expiry, refinancing, queue, or wind-down cliff | | Critical-date scenario and next review |
| Stress result is worse than current result | | Named operator, `WATCHLIST`, or `NO_RATE` |

| Critical Path Record ID | Trigger/affected IDs | Joint or sequential failure | Critical date/horizon | Current/expected/stress state | Recovery/substitution time | Common cause/order | Is max(child) conservative? | Scenario result | Operators/disposition | Evidence/owner/reviewer | Next review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CPR-001 | | | | | | | | | | | |

## 9. Conditional Mitigation-Effectiveness Record

Complete only when a mitigation is used to lower a score, avoid or weaken an operator, change materiality, or improve confidence or monitoring status.

| Record ID | Risk Condition/pathway | Control/substitute | Relief requested | Authority | Trigger/executor | Timing | Capacity/equivalence | Cost/transition loss | Dependencies/common cause | Override powers | Test history | Evidence/expiry | Residual risk/operators | Relief granted? | Owner/reviewer/approver |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MER-001 | | | | | | | | | | | | | | | |

Unsupported authority, executability, timing, capacity, equivalence, or common-cause independence means no relief.

## 10. Result Reconciliation, Limitations, And Change Log

```text
diagnostic result
-> chargeable result
-> post-operator indicated result
-> approved result
```

| Reconciliation ID | From/to stage | Closed reason type | Dimension | Previous value | New value | Evidence | Owner/approver | Effective/expiry | Reassessment trigger |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| REC-001 | | attribution / operator / evidence / approved_calibration / approved_exception / methodology_version / correction | | | | | | | |

| Limitation ID | Category | Statement | Affected IDs | Evidence | Output effect | Conservative bias | Methodology-change impact | Next review | Owner/reviewer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| LIM-001 | | | | | | | | | |

| Change ID | Affected Risk Conditions / attachments | Previous state | New state | Trigger | Output effect | Owner / approver | Effective date | Expiry |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | |

### 10.1 Atomic Conclusion Register

Complete exactly one row for every factor, component, Risk Condition, attachment, operator, propagation result, Critical Path Record, Mitigation Effectiveness Record, gap, reconciliation, limitation, and final rating conclusion. `Basis IDs` must identify the records used to derive the conclusion; source IDs alone are not a substitute for the decision rule and rationale.

| Conclusion ID | Type | Subject ID | Conclusion / structured outcome | Basis IDs | Source IDs | Decision rule / formula | Rationale | Counterevidence | Uncertainty | Confidence | Review status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CON-001 | | | | | | | | | | | analyst_complete / reviewed / approved / disputed |

## 11. Final Output

```text
Exact rated object:
Rated route:
Review date:
Token-family lane:
Primary loss object:
Secondary loss objects:
Assumptions and scope exclusions:
Score Formation Specification IDs/status:
Material layers:
Unassessed upper layers and early-stop reasons:
Top-layer InheritedRisk:
Top-layer IncrementalRisk:
Top-layer PreOperatorRisk:
Top-layer IndicatedRisk:
Binding SHARED operators:
Evidence and confidence operators:
Loss-dominance / disposition operators:
Diagnostic result:
Chargeable result:
Post-operator indicated score/grade:
Approved score/grade:
Reconciliation record ID:
Limitation IDs:
Critical-path record IDs:
Mitigation-effectiveness record IDs:
Indicated confidence:
Approved confidence:
Watchlist status:
NO_RATE gaps:
Reject conditions:
Binding drivers:
Key limitations and stale / missing evidence:
Shared-factor portfolio tags:
Decision:
Next review and reassessment triggers:
Preparer / reviewer / approver:
```

## 12. Acceptance Register

| Test | Status | Evidence artifact | Owner | Reviewer | Review date |
| --- | --- | --- | --- | --- | --- |
| Exact object and route complete | | | | | |
| Every material cross-layer risk mapped | | | | | |
| Every attachment has one attribution class | | | | | |
| Every `CARRIED` item names a prior carrier | | | | | |
| Every `SHARED` item names its assessment and operators | | | | | |
| Every applicable factor has a score, rationale, and evidence | | | | | |
| Every factor has an arithmetic role; non-weighted factors use null contributions | | | | | |
| Component aggregation judgment and sensitivity disclosed | | | | | |
| Approved Score Formation Specifications support every approved numeric result | | | | | |
| Every material `SHARED` Risk Condition has an economic carrier or effective operator | | | | | |
| Triggered critical paths and time cliffs have records and conservative consequences | | | | | |
| Every claimed mitigation relief passes authority/execution/timing/capacity/equivalence/common-cause tests | | | | | |
| Diagnostic, chargeable, indicated, and approved stages reconcile through closed reason types | | | | | |
| Token-family lane and primary/secondary loss objects are retained | | | | | |
| Rating-specific limitations and methodology-change impact are complete | | | | | |
| No unsupported fractional exclusion | | | | | |
| Required / Dominant loss-dominance tests completed | | | | | |
| N/A used only for structural irrelevance | | | | | |
| `NO_RATE` and `REJECT` are distinguished | | | | | |
| Missing evidence does not improve output | | | | | |
| Arithmetic independently reproduced | | | | | |
| Required and Dominant disagreements resolved | | | | | |
| Change and exception records complete | | | | | |
| Every rating-relevant conclusion has exactly one atomic conclusion record | | | | | |
| Every atomic conclusion has subject, basis, evidence, rule/formula, rationale, uncertainty, confidence, and review status | | | | | |
| Embedded audit conclusion coverage equals 100% with no uncovered conclusion IDs | | | | | |

### 12.1 Embedded Audit Record

```text
Audit title:
Audit objective:
Audit status:
Independent reviewer:
Approver:
Required conclusion IDs:
Tested conclusion IDs:
Uncovered conclusion IDs:
Coverage basis: conclusion_manifest
Manifest coverage rate:
Acceptance-test coverage:
Coverage rationale:
Audit limitations:
```

| Hypothesis ID | Statement | Success criterion | Status | Conclusion |
| --- | --- | --- | --- | --- |
| HYP-001 | | | untested / supported / not_supported / inconclusive | |

| Test case ID | Acceptance test | Purpose | Input IDs | Conclusion IDs | Assertion IDs | Analyst rationale | Reviewer rationale | Status | Deviation IDs | Evidence IDs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | | | | | | | | pass / fail / blocked / not_run / not_applicable | | |

| Assertion ID | Type | Target JSON Pointer | Expected | Observed | Tolerance / formula | Status | Evidence | Rationale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AST-001 | JSON_POINTER_EQUALS / JSON_POINTER_EXISTS / MANUAL_REVIEW / unsupported-until-implemented | | | | | | | |

| Deviation ID | Test case | Assertion | Description | Severity | Affected IDs | Evidence | Disposition | Corrective action / owner / due date | Correction change ID | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DEV-001 | | | | | | | | | | open / corrected / accepted / blocked |

The acceptance summary must reconcile all test statuses and state the rating decision and rationale. Independent review may be recorded as supplementary commentary, but it is not an acceptance condition.
