---
title: Token Risk Rating Methodology V0.3 Alpha
type: decision
status: draft
lifecycle: active
date: 2026-07-18
version: v0.3-alpha
audience: internal asset-selection, risk, accounting, legal, operations, treasury, model validation, and risk committee
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
tags: [credit-risk, dependency-risk, methodology, model-risk, risk-attribution, risk-rating, token-risk]
evidence_status: internal_design_synthesis_unapproved
approval_status: pending
implementation_status: adopted_for_alpha_pilot
---

# Token Risk Rating Methodology

## Executive Summary

Asset selection is the first and most important risk-management decision in a DeFi portfolio. Downstream hedging, sizing, and monitoring costs depend on what is admitted into the book. This methodology adapts structured risk discipline to exact token routes so internal reviews are explicit, reproducible, and independently challengeable.

We aim to address this question:

> What are we truly buying into when we allocate capital to a token and what exactly can we defensibly rely on?

To answer this, the methodology recursively strips a token into each material layer and rates each layer independently: **instrument mechanics, claim, substance or yield source, venue/infrastructure, shared dependencies, and evidence confidence.**

Strong backing at one layer cannot obscure weak rights, fragile venues, opaque controls, incremental wrapper risk, or poor evidence at another layer. The method therefore preserves a complete diagnostic view at every layer while charging each material economic risk only once through explicit ex-ante attribution.

## High-Level Operational Approach

Do not rate the token label; rate the token and route being reviewed. The review first fixes the exact object and rated route: the access, custody, transfer, settlement, redemption, conversion, and exit paths used for scoring. The token is then stripped into every material layer that can affect payoff, redemption, settlement, NAV, recovery, or exit.

The methodology operates in two directions:

```text
Decompose downward:
  identify what the rated position depends on until every material
  value, payoff, recovery, settlement, and exit layer is visible.

Propagate upward:
  calculate how the risk of those layers reaches the exact position
  being rated, while charging each economic contribution only once.
```

The operational sequence is:

```text
exact rated object and route
-> material layer decomposition
-> typed dependency graph
-> full diagnostic scoring at each layer
-> evidence assessment
-> Risk Condition mapping
-> ex-ante NEW / CARRIED / SHARED attribution
-> chargeable current-layer increment
-> bottom-up indicated-result propagation
-> approved-result gates
-> human-readable and machine-readable output
```

The output of each stage becomes the controlled input to the next stage. Analysts must not begin numeric propagation before the exact object, rated route, material layers, graph roles, and attribution treatments are complete.

Decomposition begins at the top-level rated position and proceeds downward one dependency at a time.

For each identified layer, the reviewer records:

```text
exact layer object
function performed for the parent
specific parent-to-child dependency edge
instrument route
venue / infrastructure route
materiality and rationale
direct scoring children
inherited references
shared Risk Conditions
route-specific dependencies
evidence state
current and stress horizon
```

The reviewer continues decomposing when another object, asset, mechanism, or route can materially affect the parent's payoff, claim, NAV, settlement, recovery, liquidation, custody, transfer, or exit.

Decomposition stops only when:

1. every material dependency has been identified;
2. terminal value, recovery, settlement, or economic-substance layers have been reached;
3. every Required dependency has a specific edge and evidence treatment;
4. any remaining excluded item is demonstrably Immaterial; and
5. no unresolved generic `depends_on` relationship could change the indicated or approved result.

A provider or protocol is not automatically a separate layer. Create a layer only when it represents a distinct material economic object or function. Repeated issuer, administrator, oracle, custody, redemption, liquidity, or control conditions are normally represented through Risk Conditions rather than duplicate layers.

Each layer is assessed on its own terms. A PT layer is rated as a PT layer, a vault receipt as a vault receipt, a stablecoin as a stablecoin, and a bridge wrapper as a bridge wrapper. For every material layer, the reviewer applies:

```text
1. the instrument-specific battery for that layer;
2. the venue / infrastructure scorecard for that same layer;
3. the evidence state, confidence outcome, and any resulting evidence/confidence operators for that same layer.
```

The assessment of each layer follows a fixed order:

```text
1. Score the complete own-layer economic risk diagnostically.
2. Assess evidence separately from economic risk.
3. Identify repeated or cross-layer risk conditions.
4. Attribute each material contribution as NEW, CARRIED, or SHARED.
5. Calculate the fixed-weight NEW current-layer increment.
6. Obtain the indicated results of material direct children.
7. Combine the controlling child result with the NEW increment.
8. Apply all binding operators.
9. Return the post-operator indicated result to the parent.
```

The complete own-layer diagnostic score covers:

```text
Instrument Mechanics
Claim
Substance / Yield Source
Venue / Infrastructure
```

Evidence is excluded from the economic sum. Evidence can restrict confidence, grade, monitoring status, or approval, but it cannot add positive economic points or offset a weak component.

The full diagnostic score answers:

> What risks exist at this layer before determining whether they are new, already transmitted, or shared with another location?

The diagnostic score is therefore not automatically the amount added during propagation.

Where several layers rely on the same issuer, venue, admin, oracle, custodian, bridge, redemption route, or liquidity route, the reviewer defines the material failure condition precisely. The Risk Condition is assessed once, assigned one primary carrier or a non-numeric operator-only treatment, and attached to every affected layer. Each attachment records its impact pathway and any score, grade, confidence, `WATCHLIST`, `NO_RATE`, or `REJECT` consequence.

The graph role and the economic attribution class are related but separate decisions.

The graph role answers:

> How is the linked item connected to the current layer?

```text
[D] direct scoring child
    A distinct material child layer whose indicated result may feed
    the parent's inherited child input.

[I] inherited reference
    Lower-layer context retained for lineage and output explanation,
    but not scored again at this parent.

[S] shared dependency
    A repeated condition represented through one Risk Condition,
    its primary carrier, attachments, and operators.

[R] route-specific dependency
    A current-layer execution, access, custody, pricing, settlement,
    redemption, liquidation, transfer, or exit dependency.
```

The attribution class answers:

> Does this economic contribution enter the current-layer increment?

```text
NEW
    The risk originates independently at the current layer.
    Its fixed-weight contribution is eligible to enter the increment.

CARRIED
    The risk is already transmitted through a named direct child
    or prior economic carrier. It remains diagnostically visible
    but is not charged again.

SHARED
    The same Risk Condition affects several locations. It is assessed
    once and represented through its primary carrier and named operators.
```

Only `[D]` child results can feed the parent's numeric child input. `[I]` references do not feed it. `[R]` dependencies normally default to `NEW` Venue / Infrastructure treatment unless a completed Risk Condition demonstrates that the contribution is carried or shared.

Every Risk Condition must include the full condition statement and impact pathway. A system-generated Risk Condition ID may link attachments, carriers, operators, evidence, and change records, but the ID must never replace the full statement in a human-readable output.

The rating is then built upward from the deepest material layer. A parent inherits the highest-risk material direct-child score and adds only fixed-weight contributions classified as `NEW` before chargeable scoring. `CARRIED` and `SHARED` conditions remain fully visible diagnostically but are not charged again. Strong substance in one layer cannot sweep away a weak claim, fragile venue, opaque control route, incremental wrapper risk, or poor evidence in another.

Bottom-up assessment also operates as a substance-first admission test. The reviewer begins with the deepest material value, support, or recovery layer because every wrapper, claim, maturity structure, and route above it ultimately depends on that foundation. If sufficient evidence shows that a Required terminal layer is structurally uninvestible, and no credible independent substitute or recovery path exists, additional upper-layer features cannot make the rated object investible. Record `REJECT` and stop further scoring. If the terminal layer is unevaluable, record `NO_RATE`; if it is weak but not structurally uninvestible, continue the assessment and propagate that weakness upward.

At each layer `L`, the propagation calculation is:

```text
InheritedRisk_L =
  maximum IndicatedRisk_child
  among material [D] children

IncrementalRisk_L =
  sum of fixed-weight current-layer contributions
  classified as NEW

PreOperatorRisk_L =
  max(InheritedRisk_L + IncrementalRisk_L, 0)

IndicatedRisk_L =
  ApplyOperators(PreOperatorRisk_L)
```

Where:

- `InheritedRisk_L` carries the risk already transmitted by the riskiest material direct child;
- `IncrementalRisk_L` contains only the independently incremental risk introduced at the current layer;
- `PreOperatorRisk_L` combines inherited and incremental economic risk; and
- `IndicatedRisk_L` reflects all binding economic, confidence, monitoring, and disposition operators before the result is passed upward.

If a layer has no material `[D]` child, `InheritedRisk_L = 0`.

Weights excluded through `CARRIED` or `SHARED` treatment are not redistributed. Renormalizing the remaining weights would silently change the route calibration and could increase unrelated contributions.

Several child scores are not ordinarily summed. The maximum-child rule selects the controlling standalone child path while avoiding repeated charges for related economic losses.

If several children must function simultaneously, share a common cause, interact through leverage or liquidation, form a cycle, or create materially greater joint loss, the ordinary maximum-child rule is not assumed sufficient. The case must trigger the proportionate complex-structure procedure and a Critical Path Record.

The layer's post-operator indicated result is then returned to its parent, which repeats the same calculation. Recursion continues until the top-level rated object has received the results of all material direct-child paths and added its own `NEW` risk.

Operationally, the recursion is:

```text
Rating scope
|-- exact rated object
`-- rated route
    |
    v
Recursive layer map
|-- [D] direct scoring children -> feed inherited child risk
|-- [I] inherited references -> context and lineage only
|-- [S] shared dependencies -> Risk Conditions and attachment-specific operators
`-- [R] current-layer route dependencies -> normally NEW in Venue / Infrastructure
    |
    v
Full diagnostic scorecard at every material layer
    |
    v
Ex-ante material attribution
|-- NEW     -> eligible for the current-layer increment
|-- CARRIED -> transmitted by a named direct child or prior carrier
`-- SHARED  -> assessed once, attached many, with named operators
    |
    v
Chargeable current-layer increment
    |
    v
Bottom-up propagation
|-- InheritedRisk_L = maximum IndicatedRisk of material [D] children
|-- IncrementalRisk_L = sum of fixed-weight NEW contributions
|-- PreOperatorRisk_L = InheritedRisk_L + IncrementalRisk_L
`-- IndicatedRisk_L = result after explicit score, grade, confidence, `WATCHLIST`, `NO_RATE`, and `REJECT` operators
    |
    v
Atomic output and reviewer controls
```

Read the diagram as a sequence of controlled transformations:

| Stage                 | Main question                                                | Required output                                                                                |
| --------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Rating scope          | What exact position and route are being rated?               | Exact object, route, horizon, position-size assumption, loss objects, and exclusions.          |
| Recursive layer map  | What does the position depend on?                            | Material layers, specific edges, and `[D]`, `[I]`, `[S]`, and `[R]` roles.                     |
| Diagnostic scoring    | What risks exist at every layer?                             | Factor scores, component scores, evidence states, sources, and rationale.                      |
| Ex-ante attribution   | Which risks are new, already transmitted, or shared?         | `NEW`, `CARRIED`, and `SHARED` classifications with carriers and Risk Conditions.              |
| Chargeable increment  | What independent risk does the current layer add?            | Exact fixed-weight `NEW` contributions and `IncrementalRisk_L`.                                              |
| Bottom-up propagation | How does child risk reach the parent?                        | `InheritedRisk_L`, `IncrementalRisk_L`, `PreOperatorRisk_L`, applied operators, and `IndicatedRisk_L`.                  |
| Approval              | Is the indicated result deterministic and sufficiently supported? | Approved result or `NO_RATE`/`REJECT`, with reconciliation and limitations.                 |
| Atomic output         | Can the result be reproduced and retrieved?                  | Complete factor, condition, attachment, operator, propagation, evidence, and approval records. |

The recursion produces four distinct result views:

```text
Diagnostic result
  complete view of all material risks before attribution

Chargeable result
  each economic contribution charged once

Indicated result
  bottom-up propagation after applicable operators

Approved result
  indicated result after methodology, determinism,
  governance and reconciliation gates
```

The top-layer post-operator result is the indicated token result. It is not automatically an approved rating.

An approved numeric result additionally requires:

```text
approved and effective Score Formation Specifications
complete and effective SHARED Risk Condition treatment
critical-path and time-cliff review where triggered
mitigation-effectiveness review where relief is claimed
typed indicated-to-approved reconciliation
reviewer and approver sign-off
```

If any material determinism or approval gate fails, the workpaper retains its diagnostic and indicated arithmetic but records the approved result as `NO_RATE`.

The practical effect is that each parent result must reconcile three separate questions:

```text
1. What risk has already arrived from material children?
   Answered by InheritedRisk_L.

2. What independent risk is introduced by this parent?
   Answered by IncrementalRisk_L.

3. What score, grade, confidence, monitoring, or disposition
   restrictions apply after the economic calculation?
   Answered by the operator register and approval gates.
```

A parent may be diagnostically stronger than its child in some components, but it cannot use those strengths to erase a binding inherited weakness. Conversely, the parent does not automatically receive every lower-layer contribution again; only its own `NEW` contributions are added.

This distinction allows the methodology to remain conservative without charging the same economic condition more than once.

The governing propagation rule is:

```text
The indicated token result, and any approved result derived from it, must be at least as risk-sensitive as every binding loss path in the rated route.

It cannot be lower-risk than:
  1. the deepest material [D] layer propagated score;
  2. any binding claim weakness;
  3. any binding substance or yield-source weakness;
  4. any binding wrapper, maturity, conversion, or instrument-mechanics weakness;
  5. any binding venue, infrastructure, route, custody, oracle, redemption, liquidity, or exit weakness;
  6. any binding [S] shared-dependency operator;
  7. any binding evidence, confidence, `NO_RATE`, or `REJECT` operator.

It must also include independent parent-layer increments classified as NEW before chargeable scoring and must preserve every CARRIED or SHARED condition in the diagnostic and attribution records.
```

### Operating Principles

1. Rate the exact object and rated route, including chain, contract, market, maturity, share class, custody, access, transfer, settlement, redemption, conversion, and exit path.
2. Strip recursively until every material instrument layer, backing layer, settlement layer, yield-source layer, and venue route is identified.
3. Score each material layer separately using the instrument route and venue scorecard that match that layer, not the top-level token label.
4. Do not push venue, issuer, oracle, custody, bridge, admin, redemption, or liquidity controls into a single final overlay.
5. Assess shared conditions once, attach them to every affected layer, and apply only explicitly named operators.
6. Score from the bottom up. A parent layer cannot outrank a material child layer needed for recovery, settlement, NAV, redemption, payoff, or exit.
7. Evidence is non-additive. It can impose a rating or confidence ceiling, `NO_RATE`, or `REJECT`, but it cannot add points to a weak layer.
8. Do not average strong substance, weak legal rights, opaque redemption, and thin venue liquidity into one blended score.
9. Propagate risk through ex-ante attribution: maximum material child risk plus fixed-weight `NEW` current-layer contributions, followed by explicit operators.
10. For no-claim or reflexive assets, avoid forced credit language. Mark claim N/A or minimal where appropriate and score substance through liquidity, adoption, attention, holder concentration, market depth, settlement utility, and reflexivity.

## 1. Rating Scope Gate

Before scoring, define the exact rated object and the route used to access, hold, value, settle, redeem, liquidate, unwind, and exit it.

The following terms control the scope record:

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Exact rated object | The precise token, contract, chain, market, maturity, vault, pool, wrapper, receipt, share class, or position being assessed. | A ticker, protocol name, or product family alone is insufficient. Record the identifiers needed to distinguish the object from economically or technically different variants. |
| Rated route | The specific route assumed for access, eligibility, custody, transfer, valuation, settlement, redemption, conversion, withdrawal, liquidation, unwind, and exit. | The rating applies to this route, not every theoretically available route. A materially different route requires a separate assessment or an explicit route sensitivity. |
| Position-size assumption | The exposure amount used to assess execution, liquidation, redemption, withdrawal, unwind, and exit. | State whether the amount is observed or assumed. A result based on a de minimis trade size must not be presented as valid for a larger position. |
| Market-depth assumption | The executable depth, slippage, time-to-exit, venue capacity, and stress capacity assumed for the position. | TVL, displayed liquidity, or headline volume alone does not establish executable depth. Name the data, measurement window, and stress treatment. |
| Assessment horizon | The current, expected, stress, and, where relevant, maturity period over which the object and route are assessed. | The result is not timeless. Record any maturity, queue, incentive expiry, upgrade, migration, refinancing, or other time cliff inside the horizon. |
| Token-family lane | The economic family used to select the route module and interpret the grade, such as reserve stablecoin, RWA/tokenized fund, PT/YT, vault/receipt, LP, derivative/leveraged position, LST, bridge wrapper, native/governance token, or reflexive token. | The lane is an interpretation and module-selection control, not a substitute for the exact object or Recursive Layer Map. |
| Primary loss object | The principal adverse outcome around which the assessment is organized, such as reserve impairment, claim/recovery impairment, NAV loss, payoff transformation, liquidation loss, bridge/custody loss, market-liquidity loss, or reflexive value collapse. | Select one primary loss object. It determines which pathways can bind the conclusion but does not suppress other material losses. |
| Secondary loss object | A material additional adverse outcome retained in the analysis but not used as the primary interpretation lane. | A secondary loss object does not replace or dilute the primary loss object. Record separate impact pathways where the mechanisms differ. |
| Review date | The effective assessment date against which object configuration, evidence freshness, market conditions, and source versions are evaluated. | Do not use the drafting date as a proxy when the underlying evidence or configuration has a different effective date. |

Eligibility or access restrictions are considered only when they change the rated route, claim rights, redemption access, transferability, recovery path, or evidence operators.

If the rated object or a material route is unclear, set the approved result to `NO_RATE`. Evidence-limited work may remain in a `source-backed watchlist` when the inspected sources, unresolved gaps, and resulting operators are explicit. Watchlist status does not convert unsupported analysis into an approved numeric result.

Every output must retain its token-family lane and primary loss object. A grade is ordinal only within the stated lane and loss-object context. Equal grades across different lanes do not imply equal probability, severity, liquidity loss, recovery, or expected loss unless a separate approved calibration demonstrates that relationship. Do not create separate grade ladders solely to satisfy this labeling rule.

The scope record must distinguish facts from assumptions. If position size, market depth, access eligibility, or exit is assumed rather than observed, label the assumption and test whether a different reasonable assumption changes score, grade, confidence, `WATCHLIST`, `NO_RATE`, or `REJECT`.

## 2. Recursive Layer Map

The Recursive Layer Map replaces product-label analysis. It breaks the rated object into its material economic layers, shows what each layer does, and records which dependencies must be tested before scoring.

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Recursion | The procedure that assesses the deepest material children first, returns each post-operator indicated result to its parent, and repeats until the rated object is reached. | Recursion is an ordered bottom-up assessment, not a basis for leaving cycles in the map. Apply Section 10.10 if a cycle cannot be resolved by defining the rated position, horizon, and recovery or settlement boundary. |
| Layer | A distinct economic object or function whose own mechanics, claim, substance, or route can be assessed separately from its parent. | A provider, protocol, contract, control, risk label, or data source is not automatically a layer. Create a layer only when separate treatment changes the economic or recovery analysis and the materiality test is met. |
| Material layer | A layer whose inclusion, removal, impairment, or unevaluability can change a score, grade, confidence, operator, band, output language, `WATCHLIST`, `NO_RATE`, or `REJECT` conclusion. | Apply the ordered `Required`, `Dominant`, `Modifier`, and `Immaterial` tests in Section 9. A small market-value layer can still be material when it controls a necessary route. |
| Parent layer | A layer whose payoff, value, claim, recovery, operation, or exit depends on a linked child layer at the current graph step. | Parent denotes economic dependency in this methodology, not necessarily legal ownership, technical control, or corporate hierarchy. |
| Child layer | A distinct material underlying object or function on which a parent depends. | A child affects the parent's numeric inherited input only when the current edge role is `[D]`; `[I]`, `[S]`, and `[R]` links have different treatments. |
| Terminal layer | The deepest material value, support, recovery, settlement, or loss-bearing layer on a path for which no further material direct child is identified. | Terminal means the stopping point of the scoped decomposition, not risk-free, bankruptcy-remote, liquid, or fully evidenced. State why further stripping would not change a rating-relevant output. |
| Recursive Layer Map | A directed acyclic representation of the exact rated object, material layers, named dependency edges, and the `[D]`, `[I]`, `[S]`, and `[R]` role of every material link at each parent step. | Scores, confidence, operators, and propagation results are outputs linked to the map; they do not replace the map. Direction runs from parent to the object or function on which it depends. |
| Dependency edge | A named relationship explaining how a parent depends on a child or dependency and which loss or route function must be tested. | Use the most specific approved edge. `depends_on` is a temporary fallback only and must include a written dependency description before approval. |
| Instrument route | The layer's economic form used to select its instrument-specific factor battery and route weights. | Select independently for every material layer. The route of the top-level token does not automatically govern its children. |
| Venue route | The layer-specific access, execution, custody, pricing, control, settlement, redemption, liquidation, transfer, withdrawal, unwind, or exit systems assessed in Venue / Infrastructure. | A venue route is not limited to an exchange or blockchain; it can include an issuer portal, administrator, custodian, oracle, bridge, adapter, queue, market, or settlement process. |

The graph-role symbols control propagation and deconfliction:

| Role | Controlling definition | Numeric consequence at the current parent step |
| --- | --- | --- |
| `[D]` direct scoring child | A distinct material child layer whose post-operator indicated result represents an economic path required by the parent. | Eligible to feed `InheritedRisk_L`; its contributions are not re-added at the parent. |
| `[I]` inherited reference | Lower-layer context retained for lineage, disclosure, inherited-cap visibility, or audit explanation. | Does not feed `InheritedRisk_L` and is not scored again at that parent. |
| `[S]` shared dependency | One repeated failure condition represented by a Risk Condition and attached to every affected location. | Acts through its named primary carrier and attachment operators; it is not independently added at each attachment. |
| `[R]` route-specific dependency | A dependency of the current layer's access, execution, valuation, custody, control, settlement, redemption, liquidation, transfer, withdrawal, unwind, or exit route. | Scored in the current layer's Venue / Infrastructure component and defaults to `NEW` unless a completed Risk Condition proves `CARRIED` or `SHARED` treatment. |

Template:

```text
Rated object
|
|-- L1: top token / wrapper layer
|   |-- Function:
|   |-- Parent edge:
|   |-- Instrument route:
|   |-- Venue route:
|   |-- [D] Direct scoring children:
|   |-- [I] Inherited references:
|   |-- [S] Shared dependency IDs:
|   |-- [R] Route-specific dependencies:
|   `-- Materiality reason:
|
|-- L2: child layer
|   |-- Function:
|   |-- Parent edge:
|   |-- Instrument route:
|   |-- Venue route:
|   |-- [D] Direct scoring children:
|   |-- [I] Inherited references:
|   |-- [S] Shared dependency IDs:
|   |-- [R] Route-specific dependencies:
|   `-- Materiality reason:
|
`-- Ln: terminal value / recovery layer
    |-- Function:
    |-- Parent edge:
    |-- Instrument route:
    |-- Venue route:
    |-- [D] Direct scoring children:
    |-- [I] Inherited references:
    |-- [S] Shared dependency IDs:
    |-- [R] Route-specific dependencies:
    `-- Materiality reason:
```

Dependency deconflict rule:

```text
1. [D] feeds inherited child risk. Only [D] child-layer propagated scores may enter the inherited child risk input for that parent.
2. [I] never feeds the score again at that parent. Use [I] only to preserve context, output language, inherited cap visibility, or audit trail.
3. `[S]` requires a Risk Condition, completed primary-carrier treatment, attachments to every affected layer, and a named operator record. `NONE` is permitted only under the economically effective `SHARED` invariant in Section 7.3.
4. `[R]` is scored in the current layer's Venue / Infrastructure component because it is a route-specific access, execution, settlement, custody, valuation, redemption, liquidation, transfer, or exit path. It defaults to `NEW` unless a Risk Condition proves that it is carried or shared.
5. If the same real-world dependency appears as both `[S]` and `[R]`, split it only when distinct failure conditions or impact pathways exist. Otherwise assess it once as `[S]` and reference it from affected layers.
6. A dependency may have different graph roles at different parent steps, but every step must state its graph role, attribution class, arithmetic carrier, and operator consequence.
7. Cycles, reflexive backing, jointly required branches, common-cause exposure, and leverage/liquidation interactions trigger the complex-structure procedure in Section 10.10.
```

The map should answer six questions:

```text
1. What does this layer do for the parent layer?
2. What instrument route applies to this layer?
3. What venue or infrastructure route does this layer depend on?
4. Does this layer share an issuer, admin, oracle, custody, bridge, redemption, or liquidity condition with another layer?
5. Is the linked item `[D]`, `[I]`, `[S]`, or `[R]`, and is its economic attribution `NEW`, `CARRIED`, or `SHARED` for this parent step?
6. Would removing it change score, grade, confidence, `WATCHLIST`, output language, or a `NO_RATE`/`REJECT` decision?
```

Minimum typed-graph fields:

| Field                           | Purpose                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Layer ID                        | Identifies the layer in the recursive stack.                                                                                         |
| Layer object                    | Names the token, wrapper, receipt, fund share, backing asset, settlement asset, pool, yield source, collateral pool, or venue route. |
| Function                        | Explains what the layer does for the parent: payoff, backing, redemption, NAV, custody, pricing, settlement, liquidation, or exit.   |
| Parent edge                     | Shows how the parent depends on this layer.                                                                                          |
| Instrument route                | Selects the correct instrument-specific battery.                                                                                     |
| Venue route                     | Selects the layer-specific venue / infrastructure scorecard.                                                                         |
| [D] Direct scoring children     | Identifies child layers whose propagated scores can feed inherited child risk at the parent.                                         |
| [I] Inherited references        | Identifies lower-layer context disclosed at the parent but not scored again at that parent.                                          |
| [S] Shared Risk Condition IDs   | Links repeated issuer, admin, oracle, custody, bridge, redemption, or liquidity conditions assessed once and attached here.          |
| [R] Route-specific dependencies | Identifies current-layer venue / infrastructure dependencies scored in the current layer.                                            |
| Materiality reason              | Classifies the layer as Required, Dominant, Modifier, or Immaterial and explains its functional consequence.                         |
| Evidence and horizon            | Names exact source versions, evidence state, assessment date, and relevant current and stress horizons.                             |

Common parent edges are grouped into five families. Use the most specific edge available; the edge should tell the reviewer which loss path to test.

**Wrapper / Exposure**

| Parent edge | Definition | Example |
| --- | --- | --- |
| `wraps` | Parent is a wrapper or representation of the child layer. | Wrapped token over an underlying token. |
| `transforms` | Parent changes the payoff, maturity, yield, leverage, or risk form of the child layer. | PT transforms a yield-bearing asset into a fixed-maturity principal claim. |
| `references` | Parent payoff, NAV, or valuation depends on the child without necessarily holding or redeeming into it. | Derivative references ETH price. |

**Conversion / Recovery**

| Parent edge | Definition | Example |
| --- | --- | --- |
| `settles_into` | Parent matures, closes, or settles into the child layer. | PT settles into the accounting asset at maturity. |
| `redeems_into` | Parent can be redeemed into the child layer through a documented path. | Stablecoin redeems into fiat or reserve asset where eligible. |
| `withdraws_from` | Parent is a receipt, share, or position that exits by withdrawing from the child layer or pool. | Vault share withdraws from vault assets. |

**Support**

| Parent edge | Definition | Example |
| --- | --- | --- |
| `backed_by` | Child layer provides reserve, backing, NAV support, or economic support for the parent. | Reserve stablecoin backed by cash and T-bills. |
| `collateralized_by` | Child layer is collateral securing the parent exposure or loss allocation. | Lending position collateralized by supplied assets. |

**Infrastructure / Control**

| Parent edge | Definition | Example |
| --- | --- | --- |
| `priced_by` | Child layer provides valuation, oracle, NAV, or price input for the parent. | Lending market priced by oracle feed. |
| `custodied_by` | Child layer controls possession, safekeeping, segregation, or custody of assets used by the parent. | Tokenized fund assets custodied by named custodian. |
| `controlled_by` | Child layer can change, pause, upgrade, gate, or administer parent mechanics. | Admin multisig can pause withdrawals or upgrade contracts. |
| `bridged_by` | Child layer transports or represents the parent across chains or settlement venues. | Bridged token depends on bridge contracts and validators. |

**Exit / Enforcement**

| Parent edge | Definition | Example |
| --- | --- | --- |
| `exits_through` | Parent value depends on a route to sell, transfer, unwind, or otherwise exit. | LP exits through AMM or secondary market liquidity. |
| `liquidates_through` | Parent recovery or solvency depends on liquidation execution. | Lending pool depends on liquidation engine and liquidator depth. |

Fallback edge:

```text
depends_on = temporary placeholder when the dependency is material but the exact edge is not yet known.
```

Do not leave `depends_on` in an approved output unless the dependency is Immaterial or the workpaper explains why a more specific edge cannot be assigned.

**Layer completeness checklist:**

1. Every material layer must be a root layer, an intermediate layer with parent and child edges, or a terminal recovery/value layer.
2. If settlement, redemption, backing, custody, pricing, control, bridge, liquidity, or exit edges are Required and missing, set the approved result to `NO_RATE`. If they are material but not Required, apply the evidence fallback in Sections 3.3 and 6 and disclose watchlist treatment where applicable.
3. Every parent-layer propagation step must identify which linked items are [D], [I], [S], and [R].
4. Only [D] child layers can feed inherited child risk input; [I] references are not scored again at that parent.
5. Scoring outputs such as factor scores, evidence confidence, binding operators, layer ratings, and propagation effects are not graph fields. They are produced after the graph, in the scorecard and output records.

## 3. What Each Layer Receives

Every material stripped layer receives one full scoring round:

```text
Layer rating =
  instrument-specific battery
  + layer-specific venue / infrastructure scorecard
  subject to evidence operators
  subject to loss-dominance, `NO_RATE`, and `REJECT` operators
```

### 3.1 Instrument-Specific Battery

Select the instrument-specific battery and route weights from the layer's actual economic function. The weights determine the relevance and contribution of each scorecard component at that layer.

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Instrument-specific battery | The approved set of factor definitions, applicability rules, anchors, combining rules, and component weights used for one instrument route. | It is route-specific and version-controlled. A list of factors without an approved Score Formation Specification is a diagnostic battery, not an approved numeric model. |
| Component | One of the four economic scoring domains: Instrument Mechanics, Claim, Substance / Yield Source, or Venue / Infrastructure. | Evidence / Confidence is assessed separately and is not an additive economic component. |
| Factor | The smallest scored criterion for which the methodology supplies an applicability rule, definition, anchor, evidence basis, and rationale. | Do not use a broad risk label as a factor unless the scored condition and anchor are specific enough for independent reproduction. |
| Subfactor | A defined subdivision of a factor used when one factor contains separately observable conditions. | A subfactor affects arithmetic only where an approved specification states its weight or combining rule; otherwise it is diagnostic support. |
| Factor arithmetic role | The explicit statement of whether a factor contributes directly to arithmetic, feeds a component-combining rule, or is diagnostic only. | Use `directly_weighted` only when the approved specification gives the factor its own weight or transformation; store its diagnostic and chargeable contributions. Use `component_input` when the factor is scored but the component rule combines it; store factor contributions as null and calculate at component level. Use `diagnostic_only` when it informs judgment without entering the approved calculation; contributions remain null. This prevents one component weight from being falsely repeated across every underlying factor. |
| Route weight | The fixed proportion assigned by an approved route module to an economic component, factor, or subfactor. | Route weights are selected before observing the desired result. Excluded `CARRIED`, `SHARED`, or N/A weight is not redistributed unless an approved calibration explicitly requires it. |

| Scorecard | What belongs here | Examples |
| --- | --- | --- |
| Instrument Mechanics | The form of the instrument and how it changes payoff, maturity, duration, leverage, conversion, settlement, wrapper exposure, pool exposure, or liquidation profile. | PT maturity payoff, YT path dependency, LP pool exposure, derivative leverage, wrapper complexity. |
| Claim | The entitlement or execution right created by the layer, if any. | Holder claim, parent-layer entitlement, enforceability, redemption right, withdrawal right, priority, recovery path, claim/substance alignment. |
| Substance / Yield Source | The asset, mechanism, cashflow, demand base, reserve, collateral, NAV support, or strategy that makes the layer valuable. | Reserve support, loan book, vault strategy, staking yield, collateral quality, market demand, liquidity depth for reflexive assets. |
| Venue / Infrastructure | The route-dependent systems and controls needed for access, execution, valuation, custody, transfer, settlement, redemption, liquidation, or exit. | Protocol contracts, issuer controls, admin keys, oracle route, bridge, custodian, withdrawal queue, redemption portal, AMM or secondary venue. |
| Evidence / Confidence | The source quality and reviewability of the layer evidence. This is a cap, not an economic score. | Legal terms, official docs, verified contracts, audits, attestations, reserve/NAV reports, on-chain data, market data, source freshness. |

Boundary rule:

```text
Classify a factor by the failure path being tested.

Redemption right -> Claim
Redemption formula or maturity treatment -> Instrument Mechanics
Redemption portal, queue, gate, issuer process, or liquidity route -> Venue / Infrastructure
Assets or cashflows supporting redemption -> Substance / Yield Source
Evidence that proves any of the above -> Evidence / Confidence
```

The instrument route is layer-specific. A top-level PT over a stablecoin-like layer is not rated as only a PT. The PT layer uses the PT route. The underlying stablecoin-like layer uses the stablecoin route. A backing token or fund share uses its own route if material.

### 3.2 Venue / Infrastructure Handling Procedure

Venue / Infrastructure handling has two jobs:

```text
1. score route-specific venue and control risks at the layer where they apply;
2. identify repeated venue, issuer, oracle, custody, bridge, admin, redemption, or liquidity failure conditions for Risk Condition attribution.
```

Venue / Infrastructure belongs at the layer where the route or control can affect access, execution, valuation, custody, transfer, settlement, redemption, liquidation, or exit.

Examples:

```text
PT layer -> Pendle market, maturity route, SY adapter, AMM liquidity
vault layer -> vault contracts, manager/curator controls, withdrawal route, NAV accounting
stablecoin layer -> issuer route, redemption process, reserve custody, transfer restrictions
bridge layer -> bridge security, custody, unwrap route, chain liveness
derivative layer -> oracle, margin engine, liquidation route, close-out venue
```

Layer-specific venue rule:

```text
For each material layer:
  identify the layer-specific route and control dependencies;
  score the venue / infrastructure factors at that layer;
  record any rating or confidence ceiling, liquidity band, severity band, `NO_RATE` operator, or evidence consequence.
```

Shared dependency rule:

```text
1. If the same material failure condition and impact pathway appears in multiple layers:
	  assign one Risk Condition ID;
	  name one primary arithmetic carrier or an operator-only treatment;
	  attach the Risk Condition to every affected layer;
	  record the attachment-specific impact and operator;
	  do not add the same economic risk again inside each layer increment.

2. If the same dependency also creates distinct route-specific loss paths:
	  assess the common condition once as SHARED;
	  score genuinely distinct route-specific conditions as NEW at their layers;
	  apply every named binding operator upward.
```

Common shared dependency examples:

```text
same issuer or protocol admin controls
same oracle or valuation route
same custodian or reserve account
same bridge or transport route
same redemption processor, transfer agent, or withdrawal gate
same liquidity venue or market-maker dependency
same governance process controlling multiple layers
```

The default unit remains the stripped instrument layer. The procedure exists to prevent double counting and inconsistent scoring of repeated venue, issuer, oracle, custody, bridge, redemption, or liquidity dependencies.

Example:

```text
Pendle venue risk at the PT layer is independent of USD.AI issuer/control risk.
Score Pendle at the PT layer.

USD.AI admin controls may affect both sUSDai and USDai.
Define the precise control failure condition as one Risk Condition.
Assign its primary carrier and attach it to both layers with explicit operator records.

sUSDai withdrawal queue and USDai redemption route may still be distinct route-specific risks.
Score those as NEW at their respective layers when their failure conditions and impact pathways differ.
```

Venue / Infrastructure can impose a rating or confidence ceiling, widen liquidity or severity bands, require watchlist status, or force `NO_RATE`. It cannot improve a weak instrument-battery score.

### 3.3 Evidence / Confidence Operators

Evidence is non-additive. Good evidence can allow a supported economic or propagated score to stand. It cannot add points to a weak layer or offset weak claim, substance, instrument, venue mechanics, or a chargeable `NEW` contribution.

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Evidence item | A specific source, observation, dataset, document, contract state, or test result used to support or challenge one material statement, factor, condition, route, or operator. | A source title or URL alone is not an evidence item unless the relied-on content, effective date, exact-object relevance, and source record are identifiable. |
| Evidence state | The controlled status assigned to a material evidence item after testing exact-object relevance, route specificity, freshness, reconciliation, completeness, authenticity, and reviewability. | Use only `complete`, `partial`, `stale`, `contradictory`, `missing`, or `unevaluable` as defined below. It is not a factor score. |
| Confidence | The degree to which the stated economic and propagation result is supported by sufficient, current, exact-object, route-specific, reconcilable, and independently reviewable evidence. | Confidence describes support for the conclusion, not the economic quality of the token. High confidence can support a poor grade and cannot improve that grade. |
| Evidence operator | A named non-additive consequence imposed because evidence support is insufficient or conditional. | It can preserve or restrict a result through a confidence ceiling, rating ceiling, `WATCHLIST`, `NO_RATE`, or `REJECT`; it cannot subtract risk or add economic points. |
| Indicated confidence | The confidence supported by the evidence after applying evidence operators to the bottom-up indicated analysis. | It can exist for a diagnostic or indicated result even when the approved result is `NO_RATE`. |
| Approved confidence | The confidence attached to the approved result after all determinism, governance, and reconciliation gates pass. | If there is no approved rating, record approved confidence as none; do not copy indicated confidence into the approval field. |

Every material evidence item receives one state before a confidence conclusion is assigned:

| Evidence state | Definition | Default treatment |
| --- | --- | --- |
| `complete` | Current, exact-object, route-specific, reconcilable, and independently reviewable. | May support High confidence if all material evidence is complete. |
| `partial` | Relevant evidence exists, but scope, coverage, assurance, or route specificity is incomplete. | Medium or Low confidence according to materiality; may trigger `WATCHLIST` or `NO_RATE`. |
| `stale` | Evidence is older than the risk-sensitive refresh interval or no longer tied to the current object/configuration. | Treat as missing for time-sensitive Required conditions; otherwise apply a conservative confidence ceiling and watchlist. |
| `contradictory` | Material sources disagree and the conflict is not reconciled. | `NO_RATE` for Required or Dominant conditions; otherwise conservative factor treatment plus confidence ceiling. |
| `missing` | Required evidence was not obtained. | `NO_RATE` for Required conditions; otherwise conservative factor treatment plus confidence ceiling. |
| `unevaluable` | Evidence exists but cannot be authenticated, interpreted, reproduced, or connected to the exact object. | Same treatment as missing until resolved. |

| Evidence-derived confidence | Treatment |
| --- | --- |
| High | No evidence ceiling. The economic score can stand if no other operator binds. |
| Medium | Best possible layer grade is BBB through `RATING_CEILING <= BBB`, unless a documented and approved exception exists. Worse economic grades stand. No A output while material evidence gaps remain. |
| Low | Best possible layer grade is B through `RATING_CEILING <= B`; `WATCHLIST` is mandatory. Worse economic grades stand. Retain the evidence gaps and reassessment triggers explicitly. |

`NO_RATE` is not a confidence level. When evidence does not support a defensible approved layer result, apply the `NO_RATE = Required` disposition operator. A binding Required `NO_RATE` condition makes every dependent parent and the approved object result `NO_RATE`; retain High, Medium, or Low only for any disclosed diagnostic or indicated analysis that remains supportable.

Evidence-operator precedence:

```text
Evidence cannot improve the economic layer score.
Evidence can only preserve a result or impose `CONFIDENCE_CEILING`, `RATING_CEILING`, `WATCHLIST`, `NO_RATE`, or `REJECT`.
If evidence quality is weaker than the economic result implies, the riskier named operator binds without improving any worse economic grade.
```

## 4. Instrument Routes And Layer Weights

Weights are unapproved experimental priors. Treat resulting numeric outputs as alpha results until research, calibration, and testing are complete.

| Instrument / wrapper route | Instrument mechanics | Claim | Substance / yield | Venue / infra | Evidence treatment |
| --- | ---: | ---: | ---: | ---: | --- |
| Fiat / reserve stablecoin | 10% | 30% | 35% | 25% | Confidence cap only |
| RWA / tokenized fund | 10% | 35% | 35% | 20% | Confidence cap only |
| PT / principal token | 35% | 20% | 20% | 25% | Confidence cap only |
| YT / yield token | 40% | 10% | 30% | 20% | Confidence cap only |
| Lending receipt | 15% | 20% | 30% | 35% | Confidence cap only |
| Vault / aggregator | 15% | 15% | 45% | 25% | Confidence cap only |
| LP / AMM position | 40% | 10% | 30% | 20% | Confidence cap only |
| Derivative / leveraged yield | 45% | 5% | 15% | 35% | Confidence cap only |
| LST / wrapped LST | 20% | 15% | 35% | 30% | Confidence cap only |
| Bridge / transport wrapper | 30% | 20% | 20% | 30% | Confidence cap only |
| Native / governance token | 5% | 5% | 55% | 35% | Confidence cap only |
| Memecoin / pure reflexive token | 5% | 0% | 55% | 40% | Confidence cap only |

Override rule:

```text
Use the table by default.
Select the route matching the layer's actual economic function, not the top-level label.
Record the closest credible alternative where classification could change the result.
Override only when the layer's actual failure pathways materially differ from the route prior.
Record the prior and replacement weights, rationale, evidence, approver, effective date, and result sensitivity.
If route selection remains material and unresolved, set the approved result to `NO_RATE`.
```

## 5. Core Scorecards

### 5.1 Instrument Mechanics

`Instrument Mechanics` means the rules by which the layer creates or changes payoff, maturity, duration, leverage, conversion, settlement, wrapper exposure, pool exposure, or liquidation behavior. It assesses the form of the exposure, not the quality of the supporting substance or the operational reliability of the route. Use it whenever the layer performs one or more of these transformations.

| Factor                            | Low risk (0)                                                            | Medium risk (0.5)                                                                    | High risk (1)                                                                  |
| --------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Payoff clarity                    | Payoff is deterministic, documented, and contract-verifiable.           | Payoff is documented but has conditions, discretionary steps, or complex edge cases. | Payoff is vague, marketing-described, or materially discretionary.             |
| Conversion / settlement mechanics | Wrap, unwrap, redeem, mature, or settle path is tested and direct.      | Path exists but depends on queues, adapters, governance, or limited venues.          | Path is untested, opaque, blocked, or discretionary.                           |
| Maturity / duration risk          | Maturity treatment and rate sensitivity are transparent and manageable. | Some sensitivity or rollover risk exists but is bounded.                             | Duration, rollover, or maturity mechanics can materially impair exit or value. |
| Leverage / path dependency        | No leverage or path dependency; exposure is linear.                     | Moderate embedded leverage or convexity.                                             | High leverage, liquidation, decay, or severe path dependency.                  |
| Wrapper complexity                | Simple wrapper with few dependencies.                                   | Multiple dependencies but mapped and evidenced.                                      | Highly composable, circular, or dependency-heavy.                              |

### 5.2 Claim

`Claim` means what the holder or parent layer is entitled to receive, rely on, redeem, settle into, withdraw, convert, or economically access through the specific layer being rated. Economic access requires a documented legal entitlement or protocol execution path. Secondary-market saleability alone is not a Claim to substance; score saleability under Venue / Infrastructure, liquidity, market integrity, and exit route. Use Claim for every layer with a holder or parent-layer entitlement. Apply Section 6 when no such entitlement structurally exists.

| Factor | Low risk (0) | Medium risk (0.5) | High risk (1) |
| --- | --- | --- | --- |
| Claim identity | Holder entitlement is precise, documented, and mapped to legal or protocol mechanics. | Entitlement is mostly clear but has unresolved terms or interpretation issues. | Entitlement is vague, marketing-led, or contradicted by documents. |
| Enforceability / execution | Holder can enforce, redeem, withdraw, settle, or receive without discretionary approval. | Access exists but is conditional on eligibility, queues, gates, or operational process. | Holder cannot enforce or access the stated claim. |
| Beneficial ownership / priority | Ownership, segregation, and priority are clear and protected. | Protections exist but are partial or unopined. | Ownership is commingled, subordinated, or uncertain. |
| Recovery path | Recovery route is explicit, timed, and available under the rated route. | Recovery route exists but is slow, conditional, or size-limited. | Recovery route is missing, discretionary, or unavailable. |
| Claim/substance alignment | Claim accurately maps to the underlying substance. | Some mismatch between marketed claim and actual backing. | Claim materially overstates access to substance. |

### 5.3 Substance / Yield Source

`Substance / Yield Source` means the asset, mechanism, cashflow, demand base, collateral, reserve, or strategy that makes the layer's Claim or economic exposure valuable. It addresses what supports value and how durable that support is; it does not by itself establish that the holder can legally or operationally reach that support. Use it for the source that supports value at the layer.

| Factor                   | Low risk (0)                                                                  | Medium risk (0.5)                                                    | High risk (1)                                                                 |
| ------------------------ | ----------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Asset / source quality   | High-quality, liquid, exogenous, or economically durable source.              | Mixed-quality, partly volatile, or moderately cyclical source.       | Speculative, illiquid, reflexive, opaque, or weak source.                     |
| Coverage / support       | Backing, NAV, collateral, or cashflow support is strong and stress-resilient. | Support exists but buffer is thin or stress sensitivity is material. | Under-supported, unverified, or vulnerable to impairment.                     |
| Volatility / reflexivity | Low volatility and limited feedback loops.                                    | Moderate volatility or partial self-reference.                       | High volatility, self-referential backing, or reflexive demand collapse risk. |
| Concentration            | Diversified across independent sources.                                       | Some concentration but no single dominant failure point.             | Single asset, issuer, borrower pool, strategy, or counterparty dominates.     |
| Sustainability           | Yield/value source is organic, durable, and observable.                       | Partly incentive-driven or short-track-record but plausible.         | Mostly emissions, points, leverage, opaque strategy, or unsustainable spread. |

### 5.4 Venue / Infrastructure

`Venue / Infrastructure` means the route-dependent systems, actors, controls, and markets needed to access, execute, value, custody, transfer, settle, redeem, withdraw, liquidate, unwind, or exit the layer. It includes protocol, liquidity, governance, oracle, custody, bridge, settlement, issuer-control, and market-integrity risk. It does not include an underlying economic asset merely because that asset is accessed through infrastructure; represent a distinct material underlying asset as a layer or Substance / Yield Source.

| Factor | Low risk (0) | Medium risk (0.5) | High risk (1) |
| --- | --- | --- | --- |
| Access / exit route | Multiple reliable routes are available under the rated route. | Route exists but is concentrated, gated, or stress-sensitive. | Single, thin, halted, discretionary, or unavailable route. |
| Protocol / contract resilience | Mature, audited, monitored, and incident-tested. | Audited but young, complex, or with limited stress history. | Unaudited, stale, exploit-prone, or opaque. |
| Governance / admin / issuer controls | Bounded, timelocked, high-quorum, transparent, or legally constrained. | Some discretion or short timelocks but disclosed. | Single signer, undisclosed admin, bypassable controls, discretionary issuer action, or unbounded powers. |
| Oracle / valuation route | Independent, manipulation-resistant, fresh, with fallback. | Some source diversity but weak fallback or freshness risk. | Single source, stale, manipulable, opaque, or unilateral override. |
| Custody / bridge / settlement | Segregated, reconciled, independently assured, tested. | Credible but not fully independently verified. | Commingled, unaudited, discretionary, or unclear loss allocation. |
| Market integrity | Trading, disclosure, conflicts, and incentives are transparent. | Some concerns but manageable. | Wash trading, misleading disclosure, severe concentration, or undisclosed conflicts. |

### 5.5 Evidence / Confidence

| Factor | Low risk (0) | Medium risk (0.5) | High risk (1) |
| --- | --- | --- | --- |
| Source quality | Legal terms, audited reports, verified contracts, official docs, reliable market/on-chain data. | Official docs plus partial reports or incomplete legal/market data. | Marketing copy, stale docs, secondary commentary, or no source. |
| Freshness | Current for the review date and tied to exact object. | Some stale but not clearly material. | Stale for a time-sensitive structure. |
| Reconciliation | On-chain, off-chain, legal, and market data reconcile. | Minor gaps or unresolved differences. | Contradictory or unreconciled evidence. |
| Completeness | All material layers and dependency edges evidenced. | Some non-critical gaps remain. | Material claim, substance, route, or control gap remains. |
| Reviewability | Workpaper allows independent reviewer to reproduce the rating. | Reviewer can mostly reproduce with follow-up. | Reviewer cannot reproduce the conclusion. |

## 6. N/A And Missing Information

N/A means structurally irrelevant. It does not mean unknown, undocumented, stale, inconvenient, immaterial-by-assumption, or hard to score.

Rules:

```text
If there is no enforceable claim, do not score Claim as bad by default.
Mark Claim as N/A or minimal, avoid claim-like wording, and move economic emphasis to substance, venue, and market structure.

If value is mostly reflexive demand, use the Substance / Yield Source component.
Mark cashflow, backing, or coverage factors N/A only where structurally absent.

Relevant but missing, stale, contradictory, or unevaluable information is not N/A.
Treat it as High risk or apply an evidence operator, `NO_RATE`, or `REJECT` according to materiality.
```

## 7. Risk Identity And Deterministic Layer Scoring

### 7.1 Risk Identity And Failure-Condition Test

Do not combine risk identity, graph role, score attribution, and output effect in one label.

| Term              | Controlling definition                                                                                                                                                                                   | Boundary and required treatment                                                                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Risk class        | The broad family used to group similar risks for reporting and coverage review.                                                                                                                          | Instrument, claim, substance, liquidity, oracle, governance, custody, legal, operational, or market integrity. A risk class does not identify a specific scorable condition.                   |
| Failure condition | The specific event, state, omission, threshold breach, or control weakness whose occurrence or existence is being assessed.                                                                              | Examples include a stale feed, unauthorized upgrade, transfer pause, reserve shortfall, or withdrawal-queue failure. Avoid labels such as `oracle risk` without the condition that could fail. |
| Impact pathway    | The causal route by which a failure condition impairs a named layer function and affects payoff, NAV, redemption, recovery, liquidation, custody, transfer, settlement, or exit over the stated horizon. | A broad consequence label is insufficient; name the affected function, dependency edge or route, loss object, and horizon. An impact pathway expresses possibility, not certainty.             |
| Binding loss path | The impact pathway that actually constrains the indicated or approved result through the propagated score or a binding operator.                                                                         | A diagnostically material pathway is not automatically binding. State the score, operator, or disposition consequence that makes it controlling.                                               |
| Attribution class | The classification determining whether and where the economic contribution enters standalone arithmetic.                                                                                                 | Use only `NEW`, `CARRIED`, or `SHARED` under Section 7.3. It is separate from graph role and risk class.                                                                                       |

`Impact pathway` describes how a condition could affect value or access. It does not state that loss is expected or certain. A material condition must be expressible as:

> If `[condition]` occurs, `[layer function]` is impaired through `[edge or route]`, affecting `[payoff, NAV, redemption, recovery, liquidation, custody, transfer, settlement, or exit]` over `[horizon]`.

### 7.2 Risk Condition Requirement

A `Risk Condition` is one precisely scoped failure condition and its primary impact pathway, recorded as a reusable controlled object when cross-layer attribution, operator application, common-cause analysis, or lifecycle tracking is required. It is not a synonym for a broad risk category, provider, protocol, layer, factor, or adverse outcome.

A separate Risk Condition record is mandatory when any of these conditions applies:

- the risk appears in more than one layer;
- it is proposed as `CARRIED` or `SHARED`;
- it can impose an operator;
- it is Required or Dominant and its placement could change the result;
- it shares a common cause with another dependency; or
- the structure contains alternatives, leverage, liquidation, cycles, or materially different impact pathways.

Every Risk Condition record must state the condition and impact pathway in full.

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Risk Condition statement | The complete human-readable statement of the dependency object and scope, risk class, specific failure condition, primary impact pathway, exact route, and horizon. | It must be understandable without resolving an ID. Repeat it or display it beside the ID wherever a human decision depends on it. |
| Risk Condition ID | A stable, system-generated identifier used to join the condition to attachments, carriers, operators, evidence, reviews, changes, and API records. | The ID provides uniqueness and referential integrity; it must never replace the Risk Condition statement in a human-readable output. Renaming the prose must not silently create a new identity, and materially changing the condition or pathway requires versioning or a new ID. |

A clearly local factor remains a factor or subfactor at its layer and defaults to `NEW`; it does not need a separate Risk Condition record.

```text
Risk Condition =
  canonical dependency object and technical/legal scope
  + risk class
  + specific failure condition
  + primary impact pathway
  + exact route and horizon
```

One provider may create several Risk Conditions. One Risk Condition may attach to several layers. Distinct Risk Conditions must have distinct failure conditions or primary impact pathways.

### 7.3 Attribution Classes And Operators

| Class | Definition | Score treatment |
| --- | --- | --- |
| `NEW` | Independent current-layer risk not already represented by a material child or shared assessment. | Eligible for the current-layer increment. |
| `CARRIED` | Risk already transmitted from a direct child or another named primary carrier. | Visible diagnostically; excluded from the current-layer increment. |
| `SHARED` | One dependency condition affecting more than one scored location. | Assessed once and applied through named attachment operators. |

Each material cross-layer Risk Condition must have one primary carrier for standalone arithmetic or an explicit operator-only treatment.

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Primary economic carrier | The single layer result, factor contribution, component contribution, child result, or operator-only treatment designated to represent a Risk Condition's standalone economic effect in the rated object's arithmetic. | The carrier is selected by causal and arithmetic fit, not convenience. Other attachments preserve local consequences but do not create duplicate charge. A carrier may be numeric or operator-only; an ID by itself is not a carrier. |
| Attachment | A record linking one Risk Condition to a specific affected layer, edge, factor, or component and stating the immediate consequence, impact pathway, attribution, carrier relationship, evidence state, and operator consequence at that location. | An attachment shows where the condition matters; it is not automatically a new score contribution. Each materially affected location requires its own attachment even when the operator is `NONE`. |
| Operator | A deterministic rule that changes or restricts a score, grade, confidence, monitoring status, or disposition when its stated trigger is satisfied. | Attribution answers where a contribution is charged; an operator answers what consequence applies. Do not use an operator as an unrecorded discretionary notch. |
| Economically or disposition-effective operator | An operator with a defined target, observable trigger, effective period, and conservative consequence that either binds now or will bind when the trigger occurs. | A narrative warning, blank operator, untriggered label, or `NONE` without a named carrier does not satisfy the `SHARED` invariant. |

Economically effective `SHARED` invariant:

```text
Every Required, Dominant, or Modifier SHARED Risk Condition must have:
  one named primary economic carrier; or
  at least one economically or disposition-effective operator with a stated trigger.

If neither exists:
  reclassify the contribution as NEW at the approved primary layer;
  or classify it Immaterial with evidence and independent-review approval;
  otherwise set NO_RATE = Required.
```

`NONE` is allowed only when the Risk Condition is diagnostically useful but Immaterial to the standalone result, or when its effect is demonstrably transmitted by a named carrier. A non-binding operator is economically effective only when it has an observable contingent trigger, an effective period, and a conservative consequence that will bind if the trigger occurs. Reviewers must not add an arbitrary floor merely to satisfy this invariant.

Operators are separate from attribution:

In the numeric scale, a higher score is riskier. A score floor therefore prevents the result from falling below a minimum risk score, while a rating ceiling prevents the grade from being better than the named grade. Where several operators affect the same dimension, the most restrictive supported consequence binds.

| Operator | Exact effect |
| --- | --- |
| `NONE` | No separate score, grade, confidence, `WATCHLIST`, `NO_RATE`, or `REJECT` effect. |
| `RISK_SCORE_FLOOR >= x` | The post-operator economic score cannot be lower than `x`. |
| `RATING_CEILING <= grade` | The output cannot be better than the named grade. |
| `CONFIDENCE_CEILING = level` | Confidence cannot exceed the named level. |
| `WATCHLIST = Required` | Watchlist status is mandatory. |
| `NO_RATE = Required` | Evidence or structure is insufficient for a defensible rating. |
| `REJECT = Required` | Sufficient evidence demonstrates a structurally uninvestible condition. |

Do not use ambiguous combined phrases such as `BBB cap/floor`. Every material shared attachment names an operator, even if it is `NONE`.

### 7.4 Diagnostic And Chargeable Views

The diagnostic view shows every material factor, including `NEW`, `CARRIED`, and `SHARED` items. It exists for completeness and independent review; it is not the propagated increment.

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Diagnostic contribution | A factor's or component's fixed-weight contribution to the full own-layer diagnostic score before attribution relief. | It remains visible for `NEW`, `CARRIED`, and `SHARED` items and therefore must not be mistaken for the amount added during propagation. |
| Chargeable contribution | The portion of a fixed-weight contribution permitted to enter `IncrementalRisk_L` after ex-ante attribution. | Under the default rule it is the full approved contribution when `NEW` and zero when wholly `CARRIED` or represented through `SHARED` treatment. Judgmental partial exclusions are prohibited. |
| Attribution relief | Exclusion of an otherwise visible diagnostic contribution from `IncrementalRisk_L` because the same economic effect is demonstrably transmitted by a named carrier or represented by completed `SHARED` treatment. | Relief is a double-counting control, not mitigation and not evidence that the risk is smaller. Incomplete records cannot create relief. |
| No renormalization | The rule that weights excluded from `IncrementalRisk_L` through N/A, `CARRIED`, or `SHARED` treatment are not redistributed to the remaining contributions. | Redistribution changes the calibrated meaning of the route weights and requires a separate approved calibration; it is not an analyst discretion. |

The chargeable view contains only fixed-weight contributions classified `NEW`:

```text
IncrementalRisk_L = sum of approved fixed-weight component, factor, or subfactor
      contributions classified NEW at layer L
```

`CARRIED` contributions arrive through child propagation. `SHARED` conditions act through their named operators. Excluded weight is not redistributed. Renormalization requires a separate calibration decision, sensitivity testing, and independent validation.

If a score cell combines `NEW` and `CARRIED`/`SHARED` risks: split it before scoring when exact contributions exist; classify the full cell as `CARRIED` only when it is wholly duplicated; otherwise retain the full cell as `NEW` and disclose conservative double-counting risk. Never apply a judgmental partial exclusion. Set the approved result to `NO_RATE` where an unresolved Required mixed cell controls the output.

### 7.5 Factor Anchors And Score-Formation Boundary

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Factor score | The numeric anchor assigned to one applicable factor under its approved definition and boundary examples. | The default anchors are 0, 0.5, and 1. The score records the assessed risk condition, not evidence quality or materiality. |
| Component score | The result of applying the approved factor-combining rule for one economic component at one layer. | It is not automatically a simple average. The Score Formation Specification must state the weights, maximum rule, decision table, dominance rule, or other combining method. |
| Weighted diagnostic contribution | A component, factor, or subfactor score multiplied or otherwise transformed by its fixed approved route weight for inclusion in the gross own-layer diagnostic view. | It precedes attribution and therefore can include contributions later classified `CARRIED` or `SHARED`. |
| Gross diagnostic score | The complete weighted own-layer economic score across Instrument Mechanics, Claim, Substance / Yield Source, and Venue / Infrastructure before attribution and propagation. | It is neither `IncrementalRisk_L` nor the layer's propagated result. Evidence is excluded from the sum. |
| Score Formation Specification | The versioned, approved rule set that converts factor observations and anchors into component scores, weighted contributions, and reproducible lineage for a route module. | A scorecard table alone is not a specification. An unspecified or unapproved material combining choice can support diagnostics or sensitivity only and triggers the governing `NO_RATE` gate for an approved numeric result. |

Factor scores and gross own-layer economic scores are bounded from 0 to 1:

```text
Low risk = 0
Medium risk = 0.5
High risk = 1
NO_RATE = blocking approved-result status, not a numeric score
REJECT = evidenced structural uninvestibility
```

The full diagnostic score is:

```text
GrossDiagnostic_L =
  w_instrument * InstrumentScore_L
  + w_claim * ClaimScore_L
  + w_substance * SubstanceScore_L
  + w_venue * VenueScore_L
```

Evidence is excluded from the sum. The scorecards define a structured factor battery, not automatically equal-weighted subfactors. An approved numeric result requires a versioned and approved `Score Formation Specification` for every route module used in that result. In addition, an approved specification must name a registered calculator implementation, its version, the applicable factor-definition IDs, and reproducible boundary test vectors. The human-readable formula remains explanatory; it is not an executable substitute for the named calculator.

Minimum specification fields:

```text
specification ID, route module, and version
component and factor-definition IDs
applicability and N/A rules
factor anchor definitions and boundary examples
factor weights or explicit non-weighted combining rule
dominance and override conditions
missing, stale, contradictory, and unevaluable evidence treatment
component formula and route-weight allocation
factor-to-component-to-contribution lineage
rounding rule
worked ordinary, boundary, N/A, missing-evidence, and dominance examples
owner, independent validator, approver, effective date, review date, and change record
```

Governing gate:

> If a numeric output materially depends on an unspecified, unapproved, expired, or unreproducible factor-combining, dominance, N/A, missing-data, rounding, or contribution-allocation choice, the workpaper may publish diagnostic anchors and an indicated sensitivity range but must set the approved result to `NO_RATE`.

The specification may use route-specific weights, a maximum/dominance rule, a decision table, or another explicit combining method. It must not invent universal equal factor weights merely to fill the gap, create weights after observing the desired result, or use reviewer prose as a substitute for a rule.

Identical frozen factor inputs must reproduce identical component scores and contribution lineage. Boundary, N/A, missing-evidence, and dominance examples must pass independent implementation before the specification can be `approved`. A draft specification may support pilot diagnostics only.

Layer scoring sequence:

```text
1. Record the exact layer object, function, route, materiality, horizon, and evidence state.
2. Score every applicable factor and record its source and rationale.
3. Identify the applicable Score Formation Specification. Use its fixed combining rule when approved; if it is draft, expired, or incomplete, label the resulting component scores diagnostic/indicated only and invoke the score-formation gate.
4. Mark N/A only for structural irrelevance.
5. Attribute every material cross-layer contribution as `NEW`, `CARRIED`, or `SHARED` before chargeable scoring.
6. Name the child or prior carrier for every `CARRIED` item.
7. Complete the Risk Condition, primary carrier, attachments, and operators for every `SHARED` item.
8. Calculate every fixed-weight `NEW` contribution and their sum `IncrementalRisk_L`.
9. Calculate the maximum material direct-child input `InheritedRisk_L`.
10. Calculate `PreOperatorRisk_L = max(InheritedRisk_L + IncrementalRisk_L, 0)`.
11. Apply risk-score floors, rating ceilings, confidence ceilings, `WATCHLIST`, `NO_RATE`, and `REJECT` operators.
12. Apply the score-formation gate; if it fails, retain the indicated arithmetic but set the approved result to `NO_RATE`.
13. Print the post-operator indicated score, grade, and confidence; the approved result and approved confidence; binding drivers; unresolved gaps; and parent propagation effect.
```

Recommended pre-calibration internal token-risk grade ranges:

```text
0.00 <= score < 0.50 -> A
0.50 <= score < 0.75 -> BBB
0.75 <= score < 1.00 -> BB
1.00 <= score < 1.50 -> B
1.50 <= score < 2.00 -> CCC
2.00 <= score < 2.50 -> CC
2.50 <= score < 3.00 -> C
3.00 <= score -> D / uninvestable
```

These are internal token-risk grades, not external credit ratings or default-probability estimates.
The Low / Medium / High labels in the factor scorecards remain factor-level numeric inputs; final layer and token outputs use the A / BBB / BB / B / CCC / CC / C / D grade ladder above.

Loss-dominance operator test:

```text
A Required or Dominant factor scored High risk (1) must be tested for a potentially binding operator.
The factor can be non-binding only if the workpaper explains why it does not dominate payoff, recovery, exit, NAV/solvency, route dependency, or final propagated score for the rated route, horizon, and liquidity assumption.

Generic language such as "not bound on inspected evidence" is insufficient.

A non-binding rationale must name:
  layer,
  factor or component,
  High-risk score,
  tested loss path,
  why the factor does not dominate that path,
  whether the risk is already carried in the propagated score,
  and whether any `NO_RATE` or `REJECT` operator is triggered.

If the rationale is missing, the workpaper cannot claim the loss-dominance operator is non-binding. It must apply the applicable named operator or leave the approved output at `NO_RATE` until the rationale is documented.
```

Quick example:

```text
Layer: L5 yield/NAV source
High-risk factor: Substance / yield source = 1 because current loan-level coverage and concentration are not verified.
Tested loss path: NAV loss and delayed recovery through the source layer.

Binding case:
  If unverified collateral or borrower concentration can directly impair NAV, recovery, or redemption and that loss path is not already carried into the propagated score, apply the applicable named operator.

Non-binding case:
  If the L5 propagated score already carries the High source-risk path into the parent layer and indicated token output, and no inspected evidence triggers a separate `NO_RATE` or `REJECT` operator, the workpaper may mark the additional loss-dominance operator non-binding.

Insufficient rationale:
  "Not bound on inspected evidence."
```

## 8. Ex-Ante Incremental Bottom-Up Propagation

The method classifies material contributions before chargeable scoring. It is neither a raw sum of layer scores nor a cap-only stack. Layering creates incremental risk through `NEW` contributions, while inherited and shared conditions remain visible without being charged again:

```text
InheritedRisk_L = max(IndicatedRisk_child for material [D] children)

IncrementalRisk_L = sum(fixed-weight current-layer contributions classified NEW)

PreOperatorRisk_L = max(InheritedRisk_L + IncrementalRisk_L, 0)

IndicatedRisk_L = ApplyOperators(PreOperatorRisk_L), including:
  shared risk-score floors,
  rating ceilings,
  evidence confidence ceilings,
  watchlist requirements,
  NO_RATE operators,
  REJECT operators,
  disposition restrictions.
```

Use the following controlling interpretation:

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Bottom-up propagation | The ordered process that completes each material child, applies its operators, returns its indicated result to the parent, and repeats to the rated object. | Do not propagate an unfinished pre-operator or diagnostic score. Every parent step must preserve the child and contribution lineage. |
| Maximum-child rule | The default rule selecting the highest-risk post-operator indicated score among material `[D]` children as the parent's inherited child input. | It represents the controlling standalone child path; it does not assert that other children are safe or irrelevant. Use Section 10.10 when joint, common-cause, sequential, or non-linear interaction can be more severe. |
| `InheritedRisk_L` | The maximum `IndicatedRisk` of the material `[D]` children of layer `L`, or zero when no such child exists. | Only `[D]` child results enter `InheritedRisk_L`. Do not sum children or insert `[I]`, `[S]`, or `[R]` records directly. |
| `IncrementalRisk_L` | The sum of approved fixed-weight current-layer contributions classified `NEW` at layer `L`. | It excludes `CARRIED` and `SHARED` contributions without redistributing their weight. Evidence is not an increment. |
| `PreOperatorRisk_L` | The non-negative sum `max(InheritedRisk_L + IncrementalRisk_L, 0)` before score, grade, confidence, monitoring, and disposition operators. | It is an intermediate arithmetic result, not the indicated or approved result. |
| `IndicatedRisk_L` | The riskier result after applying every applicable operator to `PreOperatorRisk_L` and its associated grade, confidence, and status. | It is the layer result eligible to pass to the parent. A binding `NO_RATE` or `REJECT` status replaces a numeric indicated grade for propagation and approval purposes. |

The diagnostic score preserves the complete own-layer picture before attribution. `CARRIED` identifies contributions already transmitted by a named child or prior carrier, while `SHARED` identifies conditions assessed once and attached wherever they matter. Evidence acts only through named confidence, grade, `WATCHLIST`, `NO_RATE`, or `REJECT` operators.

If there is no material `[D]` child, `InheritedRisk_L = 0`. Multiple child scores are not summed in the standalone rating. Common causes, simultaneous failures, joint dependencies, and aggregate exposure require the complex-structure procedure or a separate portfolio overlay.

Attribution-control requirement:

```text
Every material CARRIED or SHARED treatment must be supported before scoring by:
  Risk Condition ID,
  exact failure condition and impact pathway,
  source contribution and affected factor/component,
  primary carrier,
  every affected layer and graph edge,
  attribution class,
  named operator,
  evidence state and source IDs,
  rationale, owner, reviewer, and review status.

An incomplete attribution record cannot create score relief.
Required unresolved treatment -> NO_RATE unless an approved full charge makes the result independent of it.
Dominant unresolved treatment -> full charge, `RISK_SCORE_FLOOR`, `CONFIDENCE_CEILING`, and `WATCHLIST`; `NO_RATE` if the conclusion depends on it.
Modifier unresolved treatment -> retain the full current-layer contribution and disclose the limitation.
Immaterial unresolved treatment -> disclosure with materiality rationale.
```

Propagation procedure:

1. Complete the graph, factor scoring, evidence assessment, and ex-ante attribution specified in Sections 2, 3, and 7.
2. Start at each terminal material layer and move upward one parent step at a time.
3. At each layer, calculate `InheritedRisk_L`, exact fixed-weight `NEW` contributions, `IncrementalRisk_L`, and `PreOperatorRisk_L`; do not renormalize excluded weight.
4. Apply every named score, grade, confidence, `WATCHLIST`, `NO_RATE`, and `REJECT` operator.
5. Record the post-operator result and propagate it to the parent. The top-layer post-operator result is the indicated result; the approved result then applies the gates in Section 8.1.

### 8.1 Arithmetic Summary

```text
Computational procedure:
  InheritedRisk_L = maximum IndicatedRisk of material [D] children
  IncrementalRisk_L = sum of fixed-weight NEW current-layer contributions
  PreOperatorRisk_L = max(InheritedRisk_L + IncrementalRisk_L, 0)
  IndicatedRisk_L = ApplyOperators(PreOperatorRisk_L) after every applicable
                    score, grade, confidence, watchlist, NO_RATE, and REJECT operator.

  Indicated result = top-layer PostOperator result.

  If any binding layer PostOperator is NO_RATE or REJECT,
  the indicated result carries that status instead of a numeric grade.

  Approved result = indicated result after:
    Score Formation Specification gate,
    SHARED-effectiveness invariant,
    critical-path/time-cliff consequence,
    mitigation-effectiveness gate,
    typed reconciliation,

  Any material failed determinism gate -> approved result NO_RATE,
  while diagnostic and indicated arithmetic remains disclosed.

Do not compute:
  final score = average(PT, sUSDai, USDai, PYUSD, venue) [No Averaging Allowed]
  final score = L1 own score + L2 own score + L3 own score + L4 own score
```

## 9. Materiality, NO_RATE, And REJECT Rules

Materiality is functional, not just proportional. A layer can be material even if it is small by market value when it controls redemption, settlement, valuation, custody, liquidation, or exit.

The labels describe how much the object or condition can matter to the rated result; they do not describe its current risk quality. `Required` does not mean High risk, and `Dominant` does not by itself require a factor score of 1. Classify against the exact rated route, horizon, position-size assumption, and primary loss object.

Treat a layer or dependency as material when one or more tests is true:

```text
Required-for-recovery test:
  The holder cannot recover, redeem, settle, liquidate, value, or exit without it.

Binding-result test:
  Failure or impairment can impose a score floor, rating ceiling, confidence ceiling, `WATCHLIST`, `NO_RATE`, or `REJECT`.

Loss-severity test:
  Failure can dominate PI, LGI, PSL, depeg loss, NAV loss, liquidation loss, or liquidity haircut.

Route-control test:
  It controls conversion, redemption, withdrawal, custody, oracle pricing, settlement, bridge movement, transfer, or secondary exit.

Evidence-dependence test:
  The rating conclusion depends on evidence for this layer or dependency.

Language-control test:
  It changes whether the output may use claim, redemption, reserve, NAV, principal, credit, derivative, or no-claim language.
```

Apply the classifications in this order. The first satisfied class is the canonical materiality label:

| Priority | Materiality | Deterministic definition and counterfactual test | Required treatment |
| ---: | --- | --- | --- |
| 1 | `Required` | The object, function, dependency, or evidence is necessary to execute or assess a material payoff, valuation, recovery, redemption, settlement, liquidation, custody, transfer, or exit path. Ask: if it were removed, failed, or remained unevaluable, would a necessary route function become unavailable or would the approved conclusion cease to be supportable? | Assess it. Missing, contradictory, stale, or unevaluable information produces `NO_RATE = Required` unless an approved conservative full-charge treatment makes the conclusion independent of the gap. |
| 2 | `Dominant` | It is not classified `Required`, but its plausible standalone failure can control the primary loss object, set the indicated or approved grade, or impose a binding score, grade, confidence, `WATCHLIST`, `NO_RATE`, or `REJECT` operator. Ask: holding other conditions unchanged, can its failure alone determine the result or loss severity? | Assess it and complete the loss-dominance operator test. Name the economic carrier or binding/contingent operator and the tested failure path. |
| 3 | `Modifier` | It is neither `Required` nor `Dominant`, but a plausible adverse change can still alter a layer score, the indicated or approved result, confidence, liquidity or market-risk band, monitoring status, output language, or a binding-driver conclusion. | Assess it locally or through a proportionate named operator. A `SHARED` Modifier must still have a carrier or effective operator. |
| 4 | `Immaterial` | Under the stated route, horizon, and position size, removing it and applying a plausible adverse state would not change any layer result, indicated or approved result, operator, confidence, band, output language, or decision. | Exclude from chargeable treatment only with the counterfactual rationale, supporting evidence, and independent-review approval. Retain diagnostically when useful. |

Precedence resolves overlaps. If an item is both necessary and capable of dominating loss, label it `Required` and also complete the loss-dominance operator test; do not create a second Risk Condition merely to apply both concepts. Reclassify whenever the rated route, horizon, position size, evidence, or primary loss object changes the counterfactual result.

In this methodology, `rating-relevant` means that the item satisfies the `Required`, `Dominant`, or `Modifier` definition above. The phrase is not a fifth materiality class. An `Immaterial` item is, by definition, not rating-relevant for the scoped assessment.

`NO_RATE` versus `REJECT` decision tree:

```text
1. Is the exact object, rated route, Recursive Layer Map, or review-date evidence missing?
   -> `NO_RATE = Required`.

2. Is a Required or Dominant layer unevaluable, stale, contradicted, or not tied to the rated route?
   -> `NO_RATE = Required` unless an approved conservative full-charge treatment makes the conclusion independent of the gap.

3. Does the available evidence prove structural uninvestibility through failure of the rated route, legal claim, control, backing, liquidity, or stated risk threshold?
   -> `REJECT = Required`.

4. Is the structure probably weak but the decisive evidence is missing?
   -> `NO_RATE` or `WATCHLIST`; do not convert uncertainty into a factual `REJECT` decision.

5. Is the structure understandable and not structurally uninvestible but has identified weaknesses?
   -> Rate with explicit score, operators, confidence, conditions, and `WATCHLIST` status where required.
```

Set the approved result to `NO_RATE` when:

- the exact object, chain, contract, market, maturity, share class, or route is unknown;
- a required layer, holder claim, settlement asset, backing, reserve, collateral, or yield source cannot be identified;
- a material dependency edge is missing;
- the holder's claim to the layer substance is unsupported or contradicted by evidence;
- the product markets a redemption, backing, reserve, NAV, principal, or yield claim but the workpaper cannot evidence whether that claim exists under the rated route;
- legal terms are missing for stablecoin, RWA, fund, tokenized credit, legal-claim, or accounting-language analysis;
- official mechanics, reserve/NAV reports, market-depth data, audit/control data, or protocol documents are unavailable for a material layer;
- a critical venue / infrastructure dependency is unevaluable;
- the requested output requires ECL/PD/LGD/EAD language and the accounting scope gate has not been approved.

Set `REJECT` rather than `NO_RATE` when sufficient evidence demonstrates that the structure is fundamentally uninvestible. Examples:

- the rated route cannot access the claimed recovery path;
- root substance is structurally uninvestible;
- redemption is discretionary and material;
- control power can impair holders unilaterally and is unmanaged;
- collateral, reserve, or NAV support is materially insufficient;
- venue exit is unavailable under the rated route and no alternative recovery route exists.

### Fundamental-Layer Early-Stop Rule

Apply this rule after the graph identifies the Required terminal value, support, recovery, or settlement layers and before scoring the layers above them:

```text
1. Assess every Required terminal layer first.

2. If sufficient evidence demonstrates that a Required terminal layer:
     is structurally unacceptable for the rated route;
     causes the primary loss object to exceed the stated risk threshold; and
     has no credible independent substitute, recovery route, or alternative path,
   then:
     set REJECT = Required;
     stop further upper-layer scoring;
     identify every unassessed upper layer as
       "not assessed because the fundamental-layer gate failed";
     and retain the terminal-layer evidence, failure condition,
       impact pathway, binding operator, and approval record.

3. If a Required terminal layer is missing, contradictory, stale,
   or otherwise unevaluable:
     set NO_RATE = Required;
     do not infer REJECT from insufficient evidence.

4. If the terminal layer is High risk but not structurally uninvestible:
     continue bottom-up propagation;
     apply every resulting score, grade, confidence, and WATCHLIST operator.

5. Where several terminal paths or substitutes exist:
     do not stop solely because one path is unacceptable;
     first determine whether the failed path is Required,
       whether an alternative remains available under stress,
       and whether Section 10.10 requires a Critical Path Record.
```

An early stop is a completed disposition decision, not an incomplete rating. The output must still retain the exact rated object and route, Recursive Layer Map completed to the terminal gate, terminal-layer score and evidence, Risk Conditions and operators supporting the decision, unassessed-layer register, reviewer approval, and rating-specific limitations. Do not publish a numeric top-layer score or grade for layers that were not assessed.

## 10. Output Templates

The working output is atomic enough to store, query, validate, and expose through an API or website without reconstructing judgments from narrative. Human-readable tables and machine-readable records must reconcile exactly. Every entity has a stable ID, every cross-reference is explicit, and every arithmetic value is stored at the lowest level used to produce it.

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Atomic output | A result record decomposed to the lowest decision-relevant unit needed to retrieve, reproduce, validate, compare, and update the rating without parsing narrative. | At minimum, preserve separate scope, layer, edge, factor, contribution, Risk Condition, attachment, operator, propagation, evidence, reconciliation, limitation, approval, and change records where applicable. Atomic does not mean splitting prose that has no independent decision or retrieval value. |
| Stable ID | A unique identifier that continues to refer to the same logical record across displays, exports, reviews, and non-substantive edits. | An ID enables joins and lifecycle tracking; it never replaces the human-readable statement. A material change in identity, scope, condition, or pathway requires versioning or a new record under the applicable rule. |
| Cross-reference | An explicit ID-based link from one atomic record to another. | Display order, indentation, matching names, or nearby prose must not be used to infer a relationship required for scoring or review. |
| Layer assessment status | The controlled state showing whether a mapped layer was `assessed` or left `unassessed_early_stop` because a deeper Required layer produced a binding `NO_RATE` or `REJECT`. | Every unassessed layer requires a specific non-assessment reason and must not contain factor, component, or propagation records. |

Use the reusable [token-risk-rating-workpaper.md](../../templates/token-risk-rating-workpaper.md) for human review and the canonical schema in Section 10.9 for storage and API exchange.

### 10.1 Exact Rated Object

```text
Object:
Chain / network:
Contract / market / maturity / share class:
Access, custody, transfer, valuation, settlement, redemption, liquidation, unwind, and exit route:
Position size and market-depth assumption:
Token-family lane:
Primary loss object:
Secondary loss objects:
Assessment and stress horizon:
Review date:
Research packet:
Scope exclusions:
Fact/assumption register:
NO_RATE and REJECT gates checked:
```

### 10.2 Recursive Layer Map

```text
L1:
  object:
  function:
  parent edge: root / rated object
  materiality reason:
  assessment status: assessed / unassessed_early_stop
  non-assessment reason: null / specific early-stop reason
  instrument route:
  venue / infrastructure route:
  evidence state and confidence outcome:
  [D] direct scoring children:
  [I] inherited references:
  [S] attached Risk Condition IDs:
  [R] route-specific dependencies:

L2:
  object:
  function:
  parent edge:
  materiality reason:
  assessment status: assessed / unassessed_early_stop
  non-assessment reason: null / specific early-stop reason
  instrument route:
  venue / infrastructure route:
  evidence state and confidence outcome:
  [D] direct scoring children:
  [I] inherited references:
  [S] attached Risk Condition IDs:
  [R] route-specific dependencies:

Risk Condition IDs:
  RC-01:
  RC-02:
```

### 10.3 Layer Diagnostic And Chargeable Table

This table preserves full diagnostic scores while making the chargeable arithmetic explicit. Attached Risk Conditions remain separate records unless they are themselves distinct material asset layers.

| Layer | Exact object | Route | Score Formation Specification ID/status | Materiality | Diagnostic Instrument | Diagnostic Claim | Diagnostic Substance | Diagnostic Venue | Gross diagnostic | `InheritedRisk_L` | `NEW` Instrument | `NEW` Claim | `NEW` Substance | `NEW` Venue | `IncrementalRisk_L` | `PreOperatorRisk_L` | `IndicatedRisk_L` | Indicated grade | Confidence | Attached Risk Condition IDs |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| L1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| L2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 10.4 Risk Condition Master

The master defines each material Risk Condition once. A completed record contains:

| Field | Required content |
| --- | --- |
| Risk Condition ID | Stable unique identifier. |
| Canonical object and scope | Exact provider, contract, legal entity, control, oracle, custodian, venue, route, or technical/legal boundary. |
| Risk class | Broad risk family. |
| Failure condition | Specific, observable or testable condition. |
| Primary impact pathway | Main payoff, NAV, redemption, recovery, liquidation, custody, transfer, settlement, or exit effect. |
| Route and horizon | Exact route and current/stress period. |
| Materiality | Required, Dominant, Modifier, or Immaterial with rationale. |
| Primary carrier | Layer, factor, contribution, child result, or operator-only treatment carrying the standalone economic effect. |
| Economic effect | Carrier, operator, both, or immaterial diagnostic treatment, with every applicable operator ID. |
| Evidence state and source IDs | `complete`, `partial`, `stale`, `contradictory`, `missing`, or `unevaluable`, linked to source records. |
| Owner and review | Analyst, reviewer, status, timestamps, and rationale. |

| Risk Condition ID | Object/scope | Risk class | Failure condition | Primary impact pathway | Route/horizon | Materiality | Primary carrier | Evidence state/source IDs | Owner/reviewer/status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RC-01 |  |  |  |  |  |  |  |  |  |

### 10.5 Attachment, Attribution, Operator, And Propagation Records

Each Risk Condition has one or more attachment records:

| Attachment ID | Risk Condition ID | Layer ID | Edge ID | Factor/component ID | Immediate consequence | Impact pathway | Attribution | Primary carrier | Operator IDs | Evidence state | Rationale/review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ATT-01 | RC-01 |  |  |  |  |  | `NEW`/`CARRIED`/`SHARED` |  |  |  |  |

Every operator is independently addressable:

| Operator ID | Risk Condition/attachment/layer source | Type | Value | Target | Binding? | Pre-effect | Post-effect | Rationale/source IDs | Approval |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OP-01 |  | `NONE` / `RISK_SCORE_FLOOR` / `RATING_CEILING` / `CONFIDENCE_CEILING` / `WATCHLIST` / `NO_RATE` / `REJECT` |  |  |  |  |  |  |  |

Propagation is stored step by step:

| Step ID | Layer | Material child IDs | Child `IndicatedRisk` values | `InheritedRisk_L` | `NEW` contribution IDs | `IncrementalRisk_L` | `PreOperatorRisk_L` | Applied operator IDs | `IndicatedRisk_L` | Indicated grade | Confidence | Parent effect |
| --- | --- | --- | --- | ---: | --- | ---: | ---: | --- | ---: | --- | --- | --- |
| PROP-01 |  |  |  |  |  |  |  |  |  |  |  |  |

### 10.6 Final Output Block

```text
Exact rated object:
Rated route:
Position-size assumption:
Token-family lane:
Primary loss object:
Secondary loss objects:
Review date:
Research packet:
Score Formation Specification IDs and approval status:
Recursive Layer Map:
Diagnostic and chargeable layer records:
Risk Condition master:
Attachment and attribution ledger:
Operator register:
Propagation records:
Unassessed upper layers and early-stop reasons:
Deepest material layer:
Top-layer gross diagnostic score:
Top-layer `InheritedRisk_L`:
Top-layer `IncrementalRisk_L`:
Top-layer `PreOperatorRisk_L`:
Top-layer `IndicatedRisk_L` and indicated grade:
Binding score floors and rating ceilings:
Confidence ceilings and watchlist operators:
NO_RATE and REJECT operators:
Approved score and grade:
Indicated-to-approved difference record IDs:
Rating-specific limitation IDs:
Liquidity / exit band:
Market-risk band, if relevant:
Indicated confidence:
Approved confidence:
NO_RATE gaps:
Binding driver IDs:
Shared-factor tags:
Decision:
Reviewer sign-offs:
```

### 10.7 Atomic Factor And Contribution Detail

Every factor evaluation must be independently retrievable and must contain: stable factor ID; layer ID; component; factor name and definition; applicability; factor anchor and numeric score; materiality; attribution class; route weight; exact weighted diagnostic contribution; exact `NEW` contribution; carried/Risk Condition/attachment IDs; evidence-state and source IDs; analyst rationale; reviewer rationale; created/updated timestamps; and status.

Every component record must list its factor IDs, Score Formation Specification ID/version, component score, route weight, diagnostic contribution, `NEW` contribution, aggregation method, formula/decision-rule lineage, sensitivity, and reviewer approval. `aggregation_method = reviewer_judgment` may support diagnostics and sensitivity only; it cannot support an approved numeric result.

### 10.8 Typed Result Reconciliation, Limitations, And Change Log

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Diagnostic result | The complete view of material factor and component risk before attribution relief, propagation, and approval gates. | It supports analysis and review but is not the amount charged or an approved rating. |
| Chargeable result | The economic result after ex-ante attribution permits each contribution to be charged once, including the recorded `InheritedRisk_L`, `IncrementalRisk_L`, and pre-operator lineage. | It does not include the consequences of operators that apply after the chargeable arithmetic. |
| Indicated result | The top-layer result after bottom-up propagation and every applicable score, grade, confidence, monitoring, and disposition operator. | It is the methodology's calculated conclusion before final determinism, governance, and reconciliation review. |
| Approved result | The result authorized after the indicated result passes every applicable methodology, determinism, governance, and reconciliation gate. | Approval cannot be inferred from completion of arithmetic. If a material gate fails, retain the diagnostic and indicated analysis but record the approved result as `NO_RATE` or `REJECT`, as applicable. |
| Reconciliation | The typed record explaining every difference between adjacent result stages and identifying its permitted reason, affected dimension, evidence, authority, effective period, and reversal trigger. | It is an audit bridge, not a discretionary notching mechanism. It cannot improve a result without an approved calibration, operator, or exception. |

The output sequence is mandatory:

```text
diagnostic result
-> chargeable result
-> post-operator indicated result
-> approved result
```

Every difference between adjacent stages requires a reconciliation difference record containing a closed reason type, affected score, grade, confidence, monitoring, or disposition dimension, previous and new values, evidence, owner, approver, effective date, expiry, and reversal/reassessment trigger. Permitted reason types are `attribution`, `operator`, `evidence`, `approved_calibration`, `approved_exception`, `methodology_version`, or `correction`. `Other` is prohibited unless the risk committee first creates and versions a new reason type.

The approved result must not be better than the indicated result unless an approved operator, calibration, or exception explicitly permits the difference and the record contains its evidence, expiry, and reversal trigger. Reconciliation is an audit trail, not a free-form notching system.

Every rating also requires a rating-specific limitation record covering source access, assumptions, stale or missing evidence, common causes, out-of-range metrics, horizon, known omissions, conservative bias, next review, and methodology-change impact. Empty limitations are prohibited; use an explicit `none identified after review` statement only with reviewer approval.

Every change to scope, evidence, score, attribution, carrier, operator, monitoring status, disposition, or approved result must record a change ID, timestamp, actor, affected entity ID, field, previous value, new value, reason, evidence IDs, required approval, approval status, and rollback reference. Exceptions must state their expiry and reassessment trigger.

### 10.9 Canonical Machine-Readable Schema

The normative JSON Schema is [token-risk-rating.schema.json](../../references/schemas/token-risk-rating.schema.json), currently `2.0.2-alpha`. It defines one complete, self-contained storage and audit record for one exact rated object, route, and rating version. The record contains series and version identity, timestamps, assumptions, sources, layers, layer assessment status, edges, Score Formation Specifications, factor and component evaluations, Risk Conditions, attachments, operators, propagation steps, critical paths, mitigation effectiveness, reconciliation, limitations, gaps, atomic conclusions, final output, approvals, embedded audit tests, and changes. Early-stop outputs use null top-layer indicated fields rather than inventing a score or grade for unassessed layers.

An **atomic conclusion** is the machine-readable explanation of one rating-relevant judgment. It does not replace the underlying factor, component, Risk Condition, attachment, operator, propagation, critical-path, mitigation, gap, reconciliation, limitation, or final-output record. It points to that subject and states the conclusion, structured outcome, basis IDs, source IDs, controlling decision rule, formula where applicable, rationale, counterevidence, uncertainty, confidence, and review status. Exactly one conclusion is required for every record or layer result in those categories, including one final conclusion whose subject is the rating ID. This makes each conclusion queryable through an API without requiring a consumer to reconstruct decisive logic from prose or display order.

Every underlying factor remains a separate record even when the arithmetic is performed at component level. A `component_input` factor retains its own name, score, materiality, failure condition, pathways, evidence state, sources, rationale, attribution, carrier, Risk Condition link, and atomic conclusion, while its factor-level contribution fields remain null. The component record alone stores the fixed route weight and resulting contribution until an approved specification assigns factor-level weights.

The schema is necessary but not sufficient. A conforming record must also pass the repository validator, which checks ID uniqueness, references, graph acyclicity, exact graph-to-propagation equality, arithmetic, named score-formation calculators for approved specifications, specification effectiveness and component binding, typed rating ceilings, grade mapping, root/final consistency, complete atomic-conclusion coverage, determinism, `SHARED`, critical-path, mitigation, reconciliation, limitation, and lane controls, and the embedded audit's conclusion-manifest coverage, declared acceptance-test accounting, executable assertion semantics, deviations, acceptance counts, and version controls. A minimal complete-record example is stored at [schema-conformance-example.json](../../outputs/token-risk-rating/schema-conformance-example.json), and the sole validator is [validate_token_rating.py](../../analysis/scripts/validate_token_rating.py).

#### Control-hardening interpretation of audit coverage

The embedded `coverage_rate` is explicitly a `conclusion_manifest` measure: it confirms that every atomic conclusion is assigned to an audit test case. It is not a claim that every conclusion has been independently re-performed. Acceptance-test coverage is reported separately as the number of declared acceptance-test IDs represented by an applicable or explicitly not-applicable test case. The PT-sUSDai and ONyc/Kamino pilots now account for all 31 declared acceptance tests. An audit cannot be accepted while declared tests are missing or while an unsupported assertion type is marked `pass`.

Approved Score Formation Specifications are fail-closed. The validator requires an effective date covering the rating review date, a non-expired review date, route/component compatibility, factor-definition compatibility, and a registered calculator implementation. V0.3 alpha retains the narrow `sole_factor_identity.v1` calculator for the conformance fixture; additional route calculators require their own specification, boundary vectors, and negative tests. No generic formula interpreter is introduced.

API and website implementations must expose both diagnostic and chargeable views. They must not discard carried/shared factors merely because those factors contribute zero to `IncrementalRisk_L`, and they must not infer missing links from display order or narrative text.

### 10.10 Proportionate Complex-Structure Triggers

The ordinary Recursive Layer Map and maximum-child propagation remain the default. Add a separate annex only when one or more conditions are material:

| Term | Controlling definition | Boundary and required treatment |
| --- | --- | --- |
| Critical path | The jointly required, sequential, common-cause, capacity-constrained, or non-linear dependency path whose supported failure outcome can be worse than the ordinary maximum-child result. | It is not merely the riskiest single child. Record the affected IDs, ordering, assumptions, scenario, sensitivity, and consequence. |
| Time cliff | A dated event or finite window within the assessment horizon that can materially change payoff, route availability, recovery, liquidity, evidence validity, score, confidence, monitoring, or disposition. | Examples include maturity, incentive expiry, migration, upgrade, refinancing, withdrawal queue, redemption window, or wind-down. A calendar date alone is not a time cliff unless the consequence is stated. |
| Critical Path Record | The controlled annex documenting why ordinary propagation may be insufficient and whether the maximum-child rule remains conservative under the tested interaction or time cliff. | Complete it only when a trigger below is material. It supplements rather than silently changes factor weights or propagation arithmetic. |

- two or more dependencies are jointly required for payoff, NAV, redemption, liquidation, recovery, or exit;
- one common cause can impair multiple otherwise distinct children or routes;
- leverage, liquidation, collateral, debt, oracle, and exit capacity interact non-linearly;
- the structure contains a cycle, reflexive backing, recursive collateral, or self-referential liquidity;
- alternative pathways exist and path availability changes under stress;
- processing order changes the resulting carrier, score, grade, or operator;
- attribution remains ambiguous after the Risk Condition and mixed-cell rules; or
- position size makes simultaneous liquidity or execution constraints material.

Also trigger the test when a material maturity, incentive expiry, migration, upgrade, refinancing, withdrawal queue, redemption window, wind-down date, or other time cliff falls within the rating horizon, or when the supported stress result is worse than the current-state result.

When triggered, complete one `Critical Path Record`:

```text
record ID, trigger, and affected layer/edge/Risk Condition IDs
joint or sequential failure condition
critical date and current/expected/stress horizons
current, expected, and stress states
recovery, replacement, or substitution time
capacity, ordering, and common-cause assumptions
whether max(child) remains conservative and why
scenario result and sensitivity
required operator, `WATCHLIST`, `NO_RATE`, or `REJECT` result
owner, reviewer, evidence IDs, next review date, and status
```

The annex may use a dependency matrix, fault tree, bow-tie, scenario table, minimal cut sets, or a small directed calculation graph. Do not add child scores. If the interaction cannot be represented defensibly by the existing score or operator vocabulary, impose `WATCHLIST`/`NO_RATE` and escalate for calibration. Added analysis must not silently change route weights or factor scores.

If a cycle cannot be broken by defining the exact rated position, horizon, and settlement/recovery boundary, set the approved result to `NO_RATE`. If processing order changes the result, calculate every plausible order and retain the riskier supported outcome until an approved rule resolves the ambiguity.

### 10.11 Conditional Mitigation-Effectiveness Test

A Mitigation Effectiveness Record is mandatory only when a control is used to lower a factor or component score, avoid or weaken an operator, change materiality, or support better confidence or monitoring status. Relevant controls include fallbacks, substitutes, multisigs, pauses, timelocks, emergency withdrawals, alternative oracles, replacement venues, custodian substitution, sponsor support, and insurance.

The `Mitigation Effectiveness Record` must state:

```text
record ID and Risk Condition/impact-pathway IDs
claimed control or substitute and exact relief requested
legal and technical authority
trigger, executor, and conflicting/override powers
activation and completion time
capacity and economic equivalence
cost, slippage, interruption, and transition loss
dependencies and common cause
test history or prior use
evidence state, source IDs, validity, and expiry
residual risk and remaining operator
owner, reviewer, approver, and status
```

If authority, executability, timing, capacity, economic equivalence, or common-cause independence is unsupported, do not grant the claimed relief. The mitigation may remain in the diagnostic record. Removing or degrading evidence for any required element must remove the associated relief or reduce confidence; it must never improve the result.

### 10.12 Complete Rating Record Standard

Each rating version is stored as exactly one JSON document. That document is both the full rating output and its audit package; no companion envelope, snapshot URI, duplicate rating file, or second schema is required. A reader or API consumer must be able to reconstruct the documented pilot from that file alone.

```text
complete rating record
  -> identity and immutable version metadata
  -> exact scope, assumptions, sources, and Recursive Layer Map
  -> every factor, component, Risk Condition, attachment, and operator
  -> every propagation step, critical path, mitigation, gap, and limitation
  -> reconciliation, final output, approvals, and atomic conclusions
  -> embedded hypotheses, tests, assertions, deviations, conclusion coverage,
     reviewer re-performance, acceptance summary, and audit limitations
  -> atomic change history for that rating series
```

The canonical schema in Section 10.9 is the only normative schema. The `audit` object must list the complete conclusion set in the same record, assign every conclusion ID to at least one applicable test, report no uncovered IDs, and equal `1.0` conclusion-manifest coverage. It must also account for every declared acceptance-test ID before an audit can be accepted. Assertions that point into the rating resolve against the same JSON document. This prevents audit drift while retaining one storage object and one API retrieval boundary. Structural coverage does not mean that the substantive judgment is approved; executable assertion semantics, reviewer re-performance, and all other acceptance gates remain separate.

Rating version history uses immutable complete records. Every record has a stable `rating_series_id`, a unique `rating_id`, an integer `rating_version`, an optional `supersedes_rating_id`, frozen/created/updated timestamps, and an atomic `change_log`. Version 1 cannot name a predecessor. Every later version must name the rating it supersedes and contain at least one change record with entity, field path, previous and new values, reason, evidence, approval reference, and rollback reference. A revised rating is a new complete JSON record; the prior version remains unchanged.

Every complete rating record must contain:

1. exact rated object, route, date, horizon, position-size assumption, and exclusions;
2. source register with stable source IDs, inspected locations, access dates, evidence states, conflicts, and unresolved requests;
3. Recursive Layer Map with exact objects, functions, edge types, graph roles, materiality, and route dependencies;
4. every applicable factor and N/A rationale at atomic level, with anchor, source, diagnostic contribution, attribution, chargeable contribution, and reviewer rationale;
5. component aggregation method, dominance rationale, sensitivity, and any material alternative component result;
6. Risk Conditions, primary carriers, attachments, attachment-specific consequences, economically effective operators, evidence states, owners, and review status;
7. exact `InheritedRisk_L`, `IncrementalRisk_L`, `PreOperatorRisk_L`, operator, `IndicatedRisk_L`, indicated grade, indicated confidence, and parent-effect arithmetic at every layer;
8. Score Formation Specification status, critical-path/time-cliff triggers, mitigation-relief tests, loss-dominance, evidence, `NO_RATE`, `REJECT`, and liquidity tests;
9. diagnostic, chargeable, indicated, and approved result reconciliation with typed differences;
10. final output with token-family lane, primary/secondary loss objects, binding driver IDs, assumptions, rating-specific limitations, open gaps, next review, and source-backed watchlist status;
11. an atomic conclusion for every rating-relevant factor, component, condition, attachment, operator, layer result, critical path, mitigation, gap, reconciliation, limitation, and final result;
12. 100% embedded-audit coverage of the record's conclusion IDs; and
13. independent reviewer recalculation, disagreement/correction register, schema validation, and approval record.

Record completion requires every applicable factor to be source-linked, every `CARRIED` or `SHARED` treatment to name a carrier, every `NEW` contribution to have exact arithmetic, and every output effect to use a typed operator. The independent reviewer must recalculate from the frozen inputs before seeing the analyst's final explanation where practicable. Removing evidence or a carrier must never improve the result.

## 11. Worked Example Patterns

Section 11 examples are source-backed diagnostic and indicated walkthroughs for methodology testing, not approved ratings. Their frozen arithmetic remains useful for propagation testing, but no approved route-module Score Formation Specification yet converts the underlying factor batteries into reproducible approved component scores. The score-formation gate therefore sets both approved results to `NO_RATE`; the displayed numeric scores and grades are post-operator indicated results only.

Each link below is the complete executable rating, including its reasoning and embedded audit:

- PT-sUSDai: [complete rating JSON](../../outputs/token-risk-rating/pt-susdai-15oct2026-rating.json).
- ONyc/Kamino: [complete rating JSON](../../outputs/token-risk-rating/onyc-kamino-multiply-route-pattern-rating.json).

### 11.1 PT-sUSDai-15OCT2026 Source-Backed Worked Walkthrough

#### Exact Rated Object

```text
Object: PT-sUSDai-15OCT2026
Chain: Arbitrum One
Rated route: buy/hold PT-sUSDai through the Pendle Arbitrum market
Review date: 2026-07-07
Follow-up review date: 2026-07-08 for the AA/Aa loan-rating claim
Market: 0xcbf629c8d396b1261f81f55175afa010e94787d8
PT: 0xb459db106f645d698e74027eef6019a26a0675cc
SY: 0x30ccf4bbee313fcd19f3e295b3ba2920a24e2f62
YT: 0x11456849c38ea4af212ab8d4324b39983716516a
sUSDai: 0x0b2b2b2076d95dda7817e785989fe353fe955ef9
USDai: 0x0a1a1a107e45b7ced86833863f482bc5f4ed82ef
Maturity: 2026-10-15 00:00:00 UTC
Market state checked: not expired on 2026-07-07
Scope: methodology worked walkthrough / source-backed watchlist
Token-family lane: PT / principal token over a yield-bearing RWA receipt stack
Primary loss object: payoff and recovery impairment through the maturity/accounting-asset route
Secondary loss objects: NAV loss, claim/redemption impairment, market-liquidity loss, issuer/control failure
Score Formation Specification status: draft/unapproved route logic; approved result is NO_RATE
```

#### Recursive Layer Map

Use the Recursive Layer Map for readability. Each layer gets one instrument-specific battery, one venue scorecard, one evidence assessment, and any attached Risk Condition IDs. Shared conditions are assessed once through their named primary carriers and attached to every affected layer.

```text
PT-sUSDai-15OCT2026
|
|-- L1: PT layer
|   |-- Function -> top-level principal-token payoff and route wrapper for the exact rated object
|   |-- Parent edge -> root / rated object
|   |-- Materiality reason -> exact rated object; receives propagated lower-layer risk and determines the indicated token result
|   |-- Instrument route -> PT / principal token
|   |-- Instrument-specific battery -> PT battery
|   |-- Venue scorecard -> Pendle Arbitrum market route
|   |-- [D] Direct scoring children -> L2 sUSDai
|   |-- [I] Inherited references -> L3 USDai and L5 yield/NAV source through L2
|   |-- [S] Shared dependency IDs -> none directly; inherited through the child post-operator result and attached operators
|   |-- [R] Route-specific dependencies -> Pendle Arbitrum market, PT/SY maturity route, exit liquidity
|   `-- Evidence outcome -> complete / High confidence for the exact PT and Pendle route
|
|-- L2: sUSDai layer
|   |-- Function -> yield-bearing receipt and withdrawal/NAV access layer
|   |-- Parent edge -> L1 PT layer depends on sUSDai as accounting asset
|   |-- Materiality reason -> controls the PT payoff asset and carries USDai plus yield/NAV source exposure
|   |-- Instrument route -> vault / aggregator or yield-bearing receipt
|   |-- Instrument-specific battery -> receipt / withdrawal / NAV route
|   |-- Venue scorecard -> sUSDai withdrawal, queue, NAV, conversion, liquidity route
|   |-- [D] Direct scoring children -> L3 USDai and L5 yield/NAV source
|   |-- [I] Inherited references -> L4 PYUSD through L3
|   |-- [S] Shared Risk Condition IDs -> RC-PT-01, RC-PT-03
|   |-- [R] Route-specific dependencies -> sUSDai withdrawal, queue, NAV, conversion, and liquidity mechanics distinct from the shared conditions
|   `-- Evidence outcome -> partial / Medium confidence
|
|-- L3: USDai layer
|   |-- Function -> USDai stablecoin-wrapper backing and access layer
|   |-- Parent edge -> L2 sUSDai depends on USDai for deposit, conversion, and value support
|   |-- Materiality reason -> USDai backing and redemption restrictions affect sUSDai NAV and exit route
|   |-- Instrument route -> fiat / reserve stablecoin wrapper
|   |-- Instrument-specific battery -> stablecoin wrapper / restricted mint-redeem route
|   |-- Venue scorecard -> USDai redemption, conversion, liquidity, market-integrity route
|   |-- [D] Direct scoring children -> L4 PYUSD
|   |-- [I] Inherited references -> none
|   |-- [S] Shared Risk Condition IDs -> RC-PT-01, RC-PT-02
|   |-- [R] Route-specific dependencies -> USDai redemption, conversion, liquidity, and market-integrity mechanics distinct from RC-PT-01/02
|   `-- Evidence outcome -> partial / Medium confidence
|
|-- L4: PYUSD layer
|   |-- Function -> reserve stablecoin backing layer for USDai
|   |-- Parent edge -> L3 USDai depends on PYUSD backing and transferability
|   |-- Materiality reason -> PYUSD reserve, issuer, custody, and transfer constraints support or impair USDai backing
|   |-- Instrument route -> fiat / reserve stablecoin
|   |-- Instrument-specific battery -> reserve stablecoin battery
|   |-- Venue scorecard -> PYUSD issuer, reserve, custody, transfer route
|   |-- [D] Direct scoring children -> none
|   |-- [I] Inherited references -> none
|   |-- [S] Shared Risk Condition IDs -> RC-PT-02
|   |-- [R] Route-specific dependencies -> PYUSD transfer and rated-route access mechanics distinct from RC-PT-02
|   `-- Evidence outcome -> partial / Medium confidence
|
`-- L5: sUSDai yield/NAV source
    |-- Function -> source asset pool and NAV/yield realization layer
    |-- Parent edge -> L2 sUSDai depends on source performance for yield, NAV, recovery, and liquidity
    |-- Materiality reason -> GPU-loan performance, idle allocation, NAV process, and servicing can impair sUSDai value support
    |-- Instrument route -> strategy / loan book / asset pool / RWA route
    |-- Instrument-specific battery -> tokenized credit / source-specific battery
    |-- Venue scorecard -> manager, servicer, custody, valuation route
    |-- [D] Direct scoring children -> none
    |-- [I] Inherited references -> none
    |-- [S] Shared Risk Condition IDs -> RC-PT-03
    |-- [R] Route-specific dependencies -> loan/NAV realization and source-liquidity mechanics distinct from RC-PT-03
    `-- Evidence outcome -> partial / Medium confidence
```

L2 is the receipt, withdrawal, conversion, and holder-access layer; L5 is the underlying loan/NAV, valuation, servicing, and liquidity-support source. Keeping them separate preserves the High-risk source analysis without charging it again inside L2. L1 references L3 and L5 through L2 rather than feeding them directly into L1 arithmetic, and the three shared Risk Conditions remain visible through their attachments and operators.
#### Diagnostic And Chargeable Layer Results

| Layer | Object | Route | Diagnostic Instrument | Diagnostic Claim | Diagnostic Substance | Diagnostic Venue | Gross diagnostic | `InheritedRisk_L` | `NEW` Instrument | `NEW` Claim | `NEW` Substance | `NEW` Venue | `IncrementalRisk_L` | `PreOperatorRisk_L` | `IndicatedRisk_L` | Indicated grade | Confidence | Attached Risk Conditions |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| L4 | PYUSD reserve layer | Fiat / reserve stablecoin | 0 | 0.5 | 0 | 0.5 | 0.275 | 0.000 | 0.000 | 0.150 | 0.000 | 0.125 | 0.275 | 0.275 | 0.275 | BBB | Medium | RC-PT-02 |
| L3 | USDai layer | Fiat / reserve stablecoin wrapper | 0.5 | 0.5 | 0.5 | 0.5 | 0.500 | 0.275 | 0.050 | 0.150 | 0.175 | 0.125 | 0.500 | 0.775 | 0.775 | BB | Medium | RC-PT-01, RC-PT-02 |
| L5 | sUSDai yield/NAV source | RWA / tokenized credit source | 0.5 | 0.5 | 1 | 0.5 | 0.675 | 0.000 | 0.050 | 0.175 | 0.350 | 0.100 | 0.675 | 0.675 | 0.675 | BBB | Medium | RC-PT-03 |
| L2 | sUSDai layer | Vault / yield-bearing receipt | 0.5 | 0.5 | 0.5 | 0.5 | 0.500 | 0.775 | 0.075 | 0.075 | 0.000 `CARRIED` | 0.125 | 0.275 | 1.050 | 1.050 | B | Medium | RC-PT-01, RC-PT-03 |
| L1 | PT-sUSDai PT layer | PT / principal token | 0.5 | 0.5 | 0.5 | 0.5 | 0.500 | 1.050 | 0.175 | 0.100 | 0.000 `CARRIED` | 0.125 | 0.400 | 1.450 | 1.450 | B | Medium | inherited attachment effects |

#### Risk Conditions, Attachments, And Operators

| Risk Condition                        | Failure condition                                                                                             | Primary carrier                    | Attachments and consequences                    | Materiality | Operators                                                                                | Evidence                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------- | ------------------------- |
| RC-PT-01 USD.AI admin/control         | Admin, role, pause, upgrade, or conversion control failure impairs USDai/sUSDai access or recovery.           | L3 Venue contribution 0.125        | L3 conversion/transfer; L2 withdrawal/NAV route | Dominant    | `CONFIDENCE_CEILING = Medium`; `WATCHLIST = Required`                                    | S10-S12; F7               |
| RC-PT-02 PYUSD issuer/reserve/custody | Issuer, reserve, custody, redemption, or transfer failure impairs PYUSD support and USDai realization.        | L4 Claim 0.150 and Venue 0.125     | L4 claim/transfer; L3 backing/conversion        | Dominant    | `CONFIDENCE_CEILING = Medium`                                                            | S15-S19; F5               |
| RC-PT-03 source manager/servicer/NAV  | Servicing, collateral recovery, valuation, custody, or NAV control failure impairs sUSDai NAV and withdrawal. | L5 Substance 0.350 and Venue 0.100 | L5 NAV/recovery; L2 queue/receipt realization   | Required    | `CONFIDENCE_CEILING = Medium`; `WATCHLIST = Required`; contributes to approved `NO_RATE` | S9-S12, S20-S26; F3/F6/F9 |

Primary carriers are fixed before chargeable scoring. L2 Substance is wholly `CARRIED` by L3/L5, and L1 Substance is wholly `CARRIED` by L2. All other current-layer contributions remain `NEW` because the pilot identifies distinct local impact pathways.

#### Factor-Level Scorecard Rationale For Audit

These factor notes explain the component score decisions. Until calibration is approved, component scores are not a simple average of factor notes; a Required or Dominant factor can drive the component score when it controls the loss path.

```
> L4 PYUSD

Instrument Mechanics:

- Payoff clarity / `0` - Reserve stablecoin payoff is documented as a conventional token-at-par structure.
- Conversion / settlement mechanics / `0` - No wrapper conversion or maturity transformation is scored at the PYUSD substance layer.
- Maturity / duration risk / `0` - No PT-style maturity, rollover, or duration mechanics apply to the token mechanics.
- Leverage / path dependency / `0` - No embedded leverage or path-dependent payoff is scored at this layer.
- Wrapper complexity / `0` - PYUSD is treated as the reserve stablecoin layer, not as a composable wrapper in this route.

Claim:

- Claim identity / `0.5` - Issuer/redemption framework exists, but rated-route entitlement is indirect in the PT-sUSDai stack.
- Enforceability / execution / `0.5` - Redemption/access can depend on eligibility and issuer process rather than being universally executable by the rated holder.
- Beneficial ownership / priority / `0.5` - Reserve framework is described, but this run did not fully review legal priority and holder treatment.
- Recovery path / `0.5` - Recovery exists at issuer level, but route availability through the stack is conditional.
- Claim/substance alignment / `0.5` - Claim broadly maps to reserves, but exact rated-route access and restrictions remain material.

Substance / Yield:

- Asset / source quality / `0` - Cash, Treasuries, and cash equivalents are high-quality reserve substance.
- Coverage / support / `0` - Issuer materials describe reserve backing; attestation incompleteness is handled in Evidence.
- Volatility / reflexivity / `0` - Reserve substance is not reflexive crypto collateral in the reviewed sources.
- Concentration / `0` - Concentration risk is treated through issuer/custody venue dependencies rather than reserve-asset quality.
- Sustainability / `0` - No incentive-driven yield source or unsustainable spread is scored at PYUSD substance layer.

Venue / Infrastructure:

- Access / exit route / `0.5` - Rated stack depends on route eligibility and transferability rather than direct universal redemption.
- Protocol / contract resilience / `0.5` - L2 token route and contract context are credible but not fully stress-reviewed here.
- Governance / admin / issuer controls / `0.5` - Issuer controls and restrictions remain material.
- Oracle / valuation route / `0.5` - Reserve reporting/attestation route exists but latest individual report was not extracted.
- Custody / bridge / settlement / `0.5` - Custody, reserve account, and Arbitrum route dependencies remain material.
- Market integrity / `0.5` - Market/distribution route is source-backed but not fully stress-tested.

Evidence:

- Source quality / `0` - Paxos/PayPal sources are high quality.
- Freshness / `0.5` - Transparency page was current enough, but latest individual attestation PDF was not extracted.
- Reconciliation / `0.5` - Reserve statements were not independently reconciled to exact values in this run.
- Completeness / `0.5` - Holder-route, restriction, custody, and Arbitrum transfer dependencies remain incomplete.
- Reviewability / `0.5` - Reviewer can follow the source trail, but material evidence gaps remain.

Propagation:

- Child input / `0.000` - L4 has no material direct child.
- `NEW` contribution / `0.275` - Claim 0.150 and Venue 0.125 are local; RC-PT-02 attaches to their named primary carriers.
- Post-operator indicated result / `0.275 / BBB` - The numeric result remains 0.275, while Medium evidence imposes `RATING_CEILING <= BBB` and `CONFIDENCE_CEILING = Medium`.

> L3 USDai

Instrument Mechanics:

- Payoff clarity / `0.5` - USDai payoff is documented but depends on wrapper and issuer mechanics.
- Conversion / settlement mechanics / `0.5` - Direct mint/redeem is whitelisted; non-whitelisted users depend on market/staking routes.
- Maturity / duration risk / `0.5` - No fixed maturity, but wrapper settlement and route timing remain conditional.
- Leverage / path dependency / `0.5` - No explicit leverage, but wrapper dependency creates conditional exposure.
- Wrapper complexity / `0.5` - USDai wraps PYUSD support with issuer/admin and access restrictions.

Claim:

- Claim identity / `0.5` - Current sources identify backing and mint/redeem mechanics, but exact holder entitlement needs legal/route review.
- Enforceability / execution / `0.5` - Execution depends on whitelist, market access, or staking route.
- Beneficial ownership / priority / `0.5` - Priority to PYUSD support is not independently legal-reviewed in this run.
- Recovery path / `0.5` - Recovery is mapped but conditional and not directly available to every rated-route holder.
- Claim/substance alignment / `0.5` - PYUSD backing is stated, but independent supply/backing reconciliation remains open.

Substance / Yield:

- Asset / source quality / `0.5` - Underlying PYUSD is strong, but USDai is not direct PYUSD ownership.
- Coverage / support / `0.5` - Primary sources state PYUSD backing; contract-level reconciliation was not completed.
- Volatility / reflexivity / `0.5` - Stablecoin wrapper reduces volatility, but wrapper confidence depends on issuer route.
- Concentration / `0.5` - Reliance is concentrated in PYUSD and USD.AI controls.
- Sustainability / `0.5` - No yield sustainability issue at USDai itself, but backing route is not fully verified.

Venue / Infrastructure:

- Access / exit route / `0.5` - Access and conversion are gated or market-dependent.
- Protocol / contract resilience / `0.5` - Contracts and documents are visible, but the controls were not independently verified in this run.
- Governance / admin / issuer controls / `0.5` - RC-PT-01 admin/control risk remains material.
- Oracle / valuation route / `0.5` - Stability depends on backing/accounting evidence that was not fully reconciled.
- Custody / bridge / settlement / `0.5` - PYUSD custody and route dependencies attach through RC-PT-02.
- Market integrity / `0.5` - Liquidity and market-route evidence supports the pilot, but executable-depth validation remains incomplete.

Evidence:

- Source quality / `0.5` - Official sources are strong but incomplete for legal/backing reconciliation.
- Freshness / `0.5` - Sources are current enough for the pilot; risk-sensitive refresh intervals remain unapproved.
- Reconciliation / `0.5` - USDai supply versus locked PYUSD was not independently reconciled.
- Completeness / `0.5` - Role/admin, market-depth, and legal-route gaps remain.
- Reviewability / `0.5` - The route is reviewable, but follow-up evidence is required.

Propagation:

- Child input / `0.275` - L4 PYUSD post-operator indicated score feeds upward.
- `NEW` contribution / `0.500` - USDai wrapper, restricted claim, wrapper-level reconciliation, and conversion/control route are distinct local contributions.
- Shared treatment - RC-PT-01 and RC-PT-02 remain visible through attachments and confidence/watchlist operators; neither is added as a second economic row.

> L5 sUSDai Yield/NAV Source

Instrument Mechanics:

- Payoff clarity / `0.5` - Yield/NAV route is documented but depends on credit/NAV mechanics.
- Conversion / settlement mechanics / `0.5` - Value realization depends on repayments, NAV process, and protocol mechanics.
- Maturity / duration risk / `0.5` - Loan book and asset pool can create timing and duration sensitivity.
- Leverage / path dependency / `0.5` - No simple leverage token, but credit performance creates path sensitivity.
- Wrapper complexity / `0.5` - The source route combines loans, idle allocation, servicing, NAV, and controls.

Claim:

- Claim identity / `0.5` - sUSDai exposure to the source is mapped, but holders do not own individual loans directly.
- Enforceability / execution / `0.5` - Access to value depends on protocol redemption/NAV and servicing processes.
- Beneficial ownership / priority / `0.5` - Loan-level priority and holder pass-through were not verified.
- Recovery path / `0.5` - Recovery depends on borrower repayment, collateral process, and protocol-level handling.
- Claim/substance alignment / `0.5` - Claim maps to NAV/yield source, but pass-through details remain incomplete.

Substance / Yield:

- Asset / source quality / `1` - GPU-collateralized loans are illiquid and credit-sensitive.
- Coverage / support / `1` - Current loan-level coverage, collateral, and reserve evidence were not fully verified.
- Volatility / reflexivity / `0.5` - Not reflexive emissions, but NAV and liquidity can be stress-sensitive.
- Concentration / `1` - Borrower/sector concentration risk remains open and potentially material.
- Sustainability / `1` - Yield durability depends on private-credit performance and was not verified as AA/Aa for the current book.

Venue / Infrastructure:

- Access / exit route / `0.5` - Exit depends on protocol redemption, queue, and liquidity route.
- Protocol / contract resilience / `0.5` - Docs, audits, and bug bounty are visible but not fully reviewed.
- Governance / admin / issuer controls / `0.5` - RC-PT-03 manager/servicer/control dependency remains material.
- Oracle / valuation route / `0.5` - NAV valuation process is material and not fully verified.
- Custody / bridge / settlement / `0.5` - Custody/servicing route for collateral and repayments remains incomplete.
- Market integrity / `0.5` - Disclosure and conflict/servicing evidence are sufficient for pilot only.

Evidence:

- Source quality / `0.5` - Official docs are useful, but loan-level evidence is incomplete.
- Freshness / `0.5` - Current portfolio/NAV data were not fully inspected.
- Reconciliation / `0.5` - Loan/NAV/collateral values were not independently reconciled.
- Completeness / `0.5` - Loan ratings, concentration, legal documents, and role implementation remain gaps.
- Reviewability / `0.5` - Reviewer can reproduce the pilot logic, but the evidence does not support calibrated limit conclusions.

Propagation:

- Child input / `0.000` - L5 has no material direct child.
- `NEW` contribution / `0.675` - Source mechanics, receipt-holder recovery, loan/NAV substance, and source controls are locally carried at L5.
- Net layer increment / `0.675` - Full source-layer gross score propagates upward.
- Loss-dominance operator test - Tested High L5 Substance factors are loan-level coverage, borrower/sector concentration, and yield durability. The tested impact pathway is NAV impairment and delayed recovery through repayment, collateral process, valuation, and redemption-queue effects. The full 0.350 Substance contribution is charged at L5 and propagated into the indicated L1 result. No additional `RISK_SCORE_FLOOR` is needed in this pilot; later evidence of current NAV impairment, unavailable recovery, or unevaluable Required evidence triggers `NO_RATE` or `REJECT`.

> L2 sUSDai

Instrument Mechanics:

- Payoff clarity / `0.5` - Receipt mechanics are documented but depend on vault/NAV and redemption process.
- Conversion / settlement mechanics / `0.5` - Epoch/FIFO withdrawal and conversion route are conditional.
- Maturity / duration risk / `0.5` - No fixed PT maturity, but redemption timing and asset duration matter.
- Leverage / path dependency / `0.5` - No explicit leverage, but NAV and queue outcomes are path-sensitive.
- Wrapper complexity / `0.5` - sUSDai combines USDai, yield/NAV source, withdrawal, queue, and controls.

Claim:

- Claim identity / `0.5` - Holder claim is to sUSDai receipt/NAV route, not direct PYUSD or direct loan claims.
- Enforceability / execution / `0.5` - Withdrawals depend on queue, liquidity, and protocol process.
- Beneficial ownership / priority / `0.5` - Pass-through priority to underlying source was not fully legal-reviewed.
- Recovery path / `0.5` - Recovery is mapped but slow/conditional through NAV and redemption mechanics.
- Claim/substance alignment / `0.5` - Claim aligns directionally with USDai/yield source, but details remain conditional.

Substance / Yield:

- Asset / source quality / `0.5` - L5 separately captures high-risk source quality; L2 captures mapped but conditional exposure.
- Coverage / support / `0.5` - Support exists through USDai and yield/NAV route, but buffers and queues remain material.
- Volatility / reflexivity / `0.5` - NAV can be stress-sensitive; not a pure stablecoin.
- Concentration / `0.5` - Concentration is inherited from USDai/yield source and not fully double-counted here.
- Sustainability / `0.5` - Yield depends on L5 performance; L2 does not add a separate Low-risk yield assumption.

Venue / Infrastructure:

- Access / exit route / `0.5` - Redemption/withdrawal is queue and liquidity dependent.
- Protocol / contract resilience / `0.5` - The protocol route is documented but not independently verified.
- Governance / admin / issuer controls / `0.5` - RC-PT-01/03 control conditions remain material.
- Oracle / valuation route / `0.5` - NAV update and valuation route are material.
- Custody / bridge / settlement / `0.5` - Settlement relies on USD.AI and underlying route dependencies.
- Market integrity / `0.5` - Liquidity and disclosure evidence supports the pilot, but material validation gaps remain.

Evidence:

- Source quality / `0.5` - Official docs support mechanics, but portfolio/legal evidence is incomplete.
- Freshness / `0.5` - Current loan/NAV/queue evidence was not fully inspected.
- Reconciliation / `0.5` - USDai, NAV, and loan-book data were not fully reconciled.
- Completeness / `0.5` - Role/admin, audit, market-depth, and loan details remain open.
- Reviewability / `0.5` - Pilot is reproducible with noted gaps.

Propagation:

- Child input / `0.775` - Maximum of L3 0.775 and L5 0.675.
- `CARRIED` Substance / `0.225 diagnostic; 0.000 chargeable` - USDai backing and source economics are wholly transmitted through L3/L5.
- `NEW` contribution / `0.275` - Receipt mechanics 0.075, claim/queue 0.075, and local venue/withdrawal route 0.125.

> L1 PT-sUSDai

Instrument Mechanics:

- Payoff clarity / `0.5` - PT payoff is documented but depends on accounting-asset/SY mechanics.
- Conversion / settlement mechanics / `0.5` - Redemption/maturity route depends on Pendle mechanics and underlying SY route.
- Maturity / duration risk / `0.5` - PT maturity creates time-specific settlement and exit risk.
- Leverage / path dependency / `0.5` - No explicit leverage, but PT pricing and maturity payoff are path and liquidity sensitive.
- Wrapper complexity / `0.5` - PT wraps sUSDai exposure through Pendle PT/SY/market mechanics.

Claim:

- Claim identity / `0.5` - PT holder claim is to maturity/accounting-asset route, not direct PYUSD or loan-book recovery.
- Enforceability / execution / `0.5` - Claim execution depends on Pendle maturity/redemption route and underlying asset mechanics.
- Beneficial ownership / priority / `0.5` - Priority is mediated by PT/SY structure, not direct underlying ownership.
- Recovery path / `0.5` - Recovery route is mapped but conditional on maturity and market/adapter function.
- Claim/substance alignment / `0.5` - PT claim aligns with sUSDai economics, but only through layered mechanics.

Substance / Yield:

- Asset / source quality / `0.5` - PT inherits sUSDai economics; underlying source risk is carried below.
- Coverage / support / `0.5` - Principal exposure depends on sUSDai route, not standalone reserve backing.
- Volatility / reflexivity / `0.5` - PT price and exit can vary with rates, maturity, liquidity, and underlying risk.
- Concentration / `0.5` - Concentration is inherited through sUSDai/USDai/yield source, not scored as a separate root substance here.
- Sustainability / `0.5` - PT implied yield depends on market pricing and underlying sUSDai economics.

Venue / Infrastructure:

- Access / exit route / `0.5` - Exit depends on Pendle market liquidity and maturity route.
- Protocol / contract resilience / `0.5` - Pendle mechanics are documented, but route complexity remains material.
- Governance / admin / issuer controls / `0.5` - No direct new shared Risk Condition is introduced at L1, but Pendle/SY route controls remain material.
- Oracle / valuation route / `0.5` - Pricing/accounting-asset route is material for valuation and exit.
- Custody / bridge / settlement / `0.5` - Arbitrum/Pendle/SY settlement route remains relevant.
- Market integrity / `0.5` - Market depth/slippage stress testing remains open.

Evidence:

- Source quality / `0` - Exact PT/Pendle route evidence is strong.
- Freshness / `0` - Exact route, maturity, and non-expired state were checked for the review date.
- Reconciliation / `0` - Market, PT, SY, YT, maturity, and contract reads reconcile.
- Completeness / `0.5` - Lower-layer evidence remains Medium and constrains final confidence.
- Reviewability / `0` - Route evidence is reproducible from the packet.

Propagation:

- Child input / `1.050` - L2 post-operator indicated score feeds upward.
- `CARRIED` Substance / `0.100 diagnostic; 0.000 chargeable` - Lower-layer economic support is wholly transmitted by L2.
- `NEW` contribution / `0.400` - PT mechanics 0.175, maturity claim 0.100, and Pendle/exit venue 0.125.
```
#### Propagation And Operators

| Layer        | Direct children | `InheritedRisk_L` | Chargeable `NEW` components                                    | `IncrementalRisk_L` | `PreOperatorRisk_L` | Binding operators                                      | `IndicatedRisk_L` | Indicated grade | Confidence |
| ------------ | --------------- | ----: | -------------------------------------------------------------- | ----: | -----------: | ------------------------------------------------------ | ----------------------: | --------------- | ---------- |
| L4 PYUSD     | None            | 0.000 | Claim 0.150 + Venue 0.125                                      | 0.275 |        0.275 | `RATING_CEILING <= BBB`; `CONFIDENCE_CEILING = Medium` |                   0.275 | BBB             | Medium     |
| L3 USDai     | L4              | 0.275 | Instrument 0.050 + Claim 0.150 + Substance 0.175 + Venue 0.125 | 0.500 |        0.775 | `CONFIDENCE_CEILING = Medium`; `WATCHLIST = Required`  |                   0.775 | BB              | Medium     |
| L5 source    | None            | 0.000 | Instrument 0.050 + Claim 0.175 + Substance 0.350 + Venue 0.100 | 0.675 |        0.675 | `CONFIDENCE_CEILING = Medium`; `WATCHLIST = Required`  |                   0.675 | BBB             | Medium     |
| L2 sUSDai    | L3, L5          | 0.775 | Instrument 0.075 + Claim 0.075 + Venue 0.125                   | 0.275 |        1.050 | inherited confidence/watchlist operators               |                   1.050 | B               | Medium     |
| L1 PT-sUSDai | L2              | 1.050 | Instrument 0.175 + Claim 0.100 + Venue 0.125                   | 0.400 |        1.450 | `WATCHLIST = Required`                                 |                   1.450 | B               | Medium     |

#### PT-sUSDai Loss-Dominance Operator Test

This test is separate from numeric propagation. It explains why no additional loss-dominance operator binds after all shared, evidence, `NO_RATE`, and `REJECT` operators are checked.

| Layer                      | Candidate operator trigger tested                                                                 | Tested loss path or route dependency                                                                                           | Result                                                                                                                                                                                                                                                 | Residual trigger                                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L4 PYUSD                   | Reserve, issuer/custody, and transfer-restriction evidence incomplete.                            | PYUSD reserve impairment or transfer restriction impairs USDai backing and redemption.                                         | RC-PT-02 attaches to the full L4 Claim/Venue carrier; Medium evidence imposes `RATING_CEILING <= BBB` and `CONFIDENCE_CEILING = Medium`. Inspected evidence does not prove reserve failure or blocked rated-route transfers.                           | Current reserve impairment, unresolved attestation failure, blocked transfer route, or unevaluable issuer/reserve evidence.                                                |
| L3 USDai                   | Issuer/admin control and PYUSD backing/access route.                                              | USDai backing, conversion, or admin failure impairs sUSDai NAV and exit.                                                       | Full L3 local contributions are charged and RC-PT-01/02 attachments preserve the shared conditions; inspected evidence does not prove backing shortfall or conversion impossibility.                                                                   | Current backing shortfall, blocked redemption/conversion, unreconciled supply/backing failure, or unevaluable control evidence.                                            |
| L5 sUSDai yield/NAV source | High substance factors: loan-level coverage, borrower/sector concentration, and yield durability. | NAV impairment and delayed recovery through repayment, collateral process, valuation, servicing, and redemption-queue effects. | The full 0.350 Substance contribution is charged at L5 and propagated upward; no separate score floor is needed while evidence does not prove impairment.                                                                                              | Current NAV impairment, unavailable recovery, blocked redemption, or unevaluable Required source evidence.                                                                 |
| L2 sUSDai                  | Receipt, withdrawal queue, NAV conversion, and inherited L3/L5 dependencies.                      | sUSDai withdrawal or conversion failure prevents PT accounting-asset realization.                                              | The 0.275 local increment charges receipt/claim/venue risk while Substance is wholly `CARRIED`; shared conditions remain attached through RC-PT-01/03.                                                                                                 | Suspended withdrawals, unbounded queue, failed NAV conversion, or unevaluable Required sUSDai evidence.                                                                    |
| L1 PT-sUSDai               | PT maturity/accounting-asset payoff, Pendle market route, and exit liquidity.                     | PT cannot be redeemed or exited through the Pendle/SY/maturity path despite lower-layer propagation.                           | No additional loss-dominance operator binds; exact route evidence was High, the market was not expired on the review date, and inspected evidence does not show Pendle/SY failure, maturity-redemption impossibility, or a `NO_RATE`/`REJECT` trigger. | Expired or matured market with failed redemption, broken PT/SY adapter, frozen market route, severe liquidity failure for the assumed exit, or unevaluable route evidence. |

#### Critical-Path, Time-Cliff, And Mitigation Tests

| Record | Trigger | Joint/time-dependent condition | Current/expected/stress treatment | Base `max(child)` conservative? | Consequence | Next review |
| --- | --- | --- | --- | --- | --- | --- |
| CPR-PT-01 | L3 USDai and L5 yield/NAV source are jointly Required for L2 realization; PT maturity is 2026-10-15 | PT payoff requires functioning L2 receipt realization, supported USDai access, source NAV/recovery, and PT/SY maturity execution in sequence | Current indicated arithmetic uses `max(L3,L5)` plus L2/L1 increments; stress failure of either Required branch or the maturity route can block recovery | Not demonstrated for joint failure; no calibrated interaction adjustment exists | `WATCHLIST = Required`; approved result `NO_RATE`; review before maturity and after any queue/NAV/control event | At least monthly and immediately before the maturity/liquidity window |

No mitigation is used to lower a factor/component score, avoid an operator, change materiality, or improve confidence or monitoring status in this pilot. Pendle maturity execution, queues, controls, attestations, and liquidity routes remain diagnostic dependencies, not credited mitigants. A Mitigation Effectiveness Record becomes mandatory before any of them can create relief.

#### Arithmetic

```text
Own-layer economic scores:

L4 PYUSD reserve layer:
  10%*0 + 30%*0.5 + 35%*0 + 25%*0.5 = 0.275 -> A diagnostic result

L3 USDai layer:
  10%*0.5 + 30%*0.5 + 35%*0.5 + 25%*0.5 = 0.500 -> BBB

L5 sUSDai yield/NAV source:
  10%*0.5 + 35%*0.5 + 35%*1 + 20%*0.5 = 0.675 -> BBB

L2 sUSDai layer:
  15%*0.5 + 15%*0.5 + 45%*0.5 + 25%*0.5 = 0.500 -> BBB

L1 PT-sUSDai layer:
  35%*0.5 + 20%*0.5 + 20%*0.5 + 25%*0.5 = 0.500 -> BBB

Ex-ante attribution and propagation:

L4 PYUSD:
  InheritedRisk_L = 0.000
  IncrementalRisk_L = Claim 0.150 + Venue 0.125 = 0.275
  PreOperator = PostOperator score = 0.275; diagnostic grade A; post-operator grade BBB; confidence Medium

L3 USDai:
  InheritedRisk_L = L4 post-operator 0.275
  IncrementalRisk_L = Instrument 0.050 + Claim 0.150 + Substance 0.175 + Venue 0.125 = 0.500
  PreOperator = PostOperator = 0.775 -> BB; confidence Medium

L5 sUSDai yield/NAV source:
  InheritedRisk_L = 0.000
  IncrementalRisk_L = Instrument 0.050 + Claim 0.175 + Substance 0.350 + Venue 0.100 = 0.675
  PreOperator = PostOperator = 0.675 -> BBB; confidence Medium

L2 sUSDai:
  InheritedRisk_L = max(L3 0.775, L5 0.675) = 0.775
  Diagnostic Substance 0.225 is wholly CARRIED by L3/L5 and contributes 0.000 locally.
  IncrementalRisk_L = Instrument 0.075 + Claim 0.075 + Venue 0.125 = 0.275
  PreOperator = PostOperator = 1.050 -> B; confidence Medium

L1 PT-sUSDai:
  InheritedRisk_L = L2 post-operator 1.050
  Diagnostic Substance 0.100 is wholly CARRIED by L2 and contributes 0.000 locally.
  IncrementalRisk_L = Instrument 0.175 + Claim 0.100 + Venue 0.125 = 0.400
  PreOperator = PostOperator = 1.450 -> B; confidence Medium

No excluded weight is renormalized. Shared conditions act through their named attachments and operators.

Post-operator indicated result:
  1.450 B / source-backed watchlist

Approved result:
  NO_RATE because the applicable route-module Score Formation Specifications are not approved.
```

#### Final Output Block

```text
Exact rated object: PT-sUSDai-15OCT2026 on Arbitrum One
Rated route: buy/hold PT-sUSDai through the Pendle Arbitrum market
Token-family lane: PT / principal token over a yield-bearing RWA receipt stack
Primary loss object: payoff and recovery impairment through the maturity/accounting-asset route
Secondary loss objects: NAV loss; claim/redemption impairment; market-liquidity loss; issuer/control failure
Review date: 2026-07-07
Research packet: vault/research-logs/active/pt-susdai-layer-scored-pilot-2026-07-07/
Score Formation Specification status: unapproved; diagnostic and indicated arithmetic only
Deepest material layer: L5 sUSDai yield/NAV source
Controlling yield/source layer: L5 sUSDai yield/NAV source, 0.675 BBB
Highest child risk input before sUSDai increment: L3 USDai, 0.775 BB
Top-layer gross own score: L1 PT-sUSDai = 0.500 BBB
Top-layer `InheritedRisk_L`: L2 `IndicatedRisk_L` = 1.050 B
Top-layer `CARRIED` contribution: Substance 0.100 diagnostic; 0.000 chargeable, carried by L2
Top-layer `IncrementalRisk_L`: 0.400 for PT maturity, accounting-asset payoff, Pendle route, and market exit complexity
Top-layer post-operator indicated score: 1.450 B
Binding Risk Conditions: RC-PT-01, RC-PT-02, RC-PT-03
Evidence operators: `CONFIDENCE_CEILING = Medium`; `WATCHLIST = Required`
Approved-result gates: `NO_RATE = Required` because score formation is unapproved
Critical-path record: CPR-PT-01; max-child conservatism is not demonstrated for the joint L3/L5 and maturity sequence
Mitigation-effectiveness records: none; no mitigation relief granted
Liquidity / exit band: watchlist; market-depth and slippage stress remain open
Diagnostic result: factor and component anchors as printed above
Chargeable result: top-layer `InheritedRisk_L + IncrementalRisk_L = 1.450`
Post-operator indicated result: 1.450 / B / source-backed watchlist
Approved score: none
Approved result: NO_RATE
Reconciliation: score-formation gate changes indicated `1.450 / B` to approved `NO_RATE`; reason type `methodology_version`; approver pending; expires only when all applicable route-module specifications are approved and the frozen pilot is re-performed
Indicated confidence: Medium
Approved confidence: none because the approved result is `NO_RATE`
Rating-specific limitations: source cutoff 2026-07-07/08; unapproved score formation; max-child joint-path limitation; reserve reconciliation, loan/NAV, role/admin, audit, legal recovery/pass-through, queue-state, and position-size liquidity gaps; next review before maturity and after any material event
NO_RATE gaps: unapproved route-module score formation plus the stated material evidence gaps
Shared-factor tags: USD.AI control, PYUSD reserve/custody, USD.AI manager/servicer/NAV, Pendle Arbitrum route
Decision: usable as a source-backed methodology walkthrough only
```

### 11.2 ONyc/USD Kamino Multiply Source-Backed Route-Pattern Example

This example tests a leveraged RWA looping route. It is deliberately narrower than an exact-vault rating: official sources support ONyc on Kamino Multiply, but this run did not verify the exact live Kamino reserve/vault ID, exact debt asset for the assessed route, or target leverage/LTV.

#### Exact Rated Object

```text
Object: ONyc/USD stable-debt looping route through Kamino Multiply
Chain: Solana
ONyc mint: 5Y8NV33Vv7WbnLfq3zBcKSdYPrk7g2KoiQoe7M2tcxp5
Rated route: use Kamino Multiply to lever ONyc exposure against USD stablecoin debt
Review date: 2026-07-09
Scope: methodology route-pattern example / source-backed watchlist
Token-family lane: derivative / leveraged RWA collateral position
Primary loss object: liquidation loss
Secondary loss objects: NAV loss, claim/redemption impairment, debt-rate/liquidity loss, oracle/market-exit failure
Score Formation Specification status: draft/unapproved route logic; approved result is NO_RATE
Route caveat: Kamino docs and third-party tracker indicate ONyc/USDC; OnRe launch materials emphasize ONyc collateral used to borrow USDG; OnRe risk note refers to USDC/USDG borrow costs
NO_RATE gates checked: exact ONyc mint identified; exact live Kamino reserve/vault ID, exact debt reserve, target leverage, live reserve config, oracle accounts, secondary liquidity, audit/legal documents, and attestations remain unresolved for an approved exact-route result
```

#### Recursive Layer Map

```text
ONyc/USD Kamino Multiply route-pattern
|
|-- L1: Kamino ONyc/USD looping route
|   |-- Function -> top-level leveraged yield position using ONyc collateral and USD stablecoin debt
|   |-- Parent edge -> root / rated object
|   |-- Materiality reason -> leverage, liquidation, borrow-rate, swap, and route-exit mechanics determine final payoff
|   |-- Instrument route -> derivative / leveraged yield
|   |-- Instrument-specific battery -> leveraged-yield / liquidation battery
|   |-- Venue scorecard -> Kamino Multiply, Kamino Lend, swap, oracle, liquidation, stablecoin borrow route
|   |-- [D] Direct scoring children -> L2 ONyc token wrapper
|   |-- [I] Inherited references -> L3 ONyc reinsurance/NAV source through L2
|   |-- [S] Shared Risk Condition IDs -> RC-ON-02; RC-ON-03/04 remain local `[R]` conditions
|   |-- [R] Route-specific dependencies -> target leverage, liquidation buffer, stablecoin borrow rate, swap depth, liquidation path, secondary exit
|   `-- Evidence outcome -> partial / Medium confidence for product mechanics; incomplete for an exact live reserve/vault route
|
|-- L2: ONyc token wrapper
|   |-- Function -> transferable NAV-based RWA token and holder access layer
|   |-- Parent edge -> L1 uses ONyc as collateral in the looping route
|   |-- Materiality reason -> ONyc claim, transfer, redemption, NAV, and secondary-liquidity mechanics control collateral value
|   |-- Instrument route -> RWA / tokenized fund
|   |-- Instrument-specific battery -> tokenized RWA / NAV wrapper
|   |-- Venue scorecard -> OnRe mint/redemption, secondary liquidity, Solana token, eligibility, queue, and NAV route
|   |-- [D] Direct scoring children -> L3 ONyc reinsurance/NAV source
|   |-- [I] Inherited references -> none
|   |-- [S] Shared Risk Condition IDs -> RC-ON-01, RC-ON-02
|   |-- [R] Route-specific dependencies -> primary redemption queue, KYC/accredited eligibility, secondary exit route
|   `-- Evidence outcome -> partial / Medium confidence
|
`-- L3: ONyc reinsurance/NAV source
    |-- Function -> real-world underwriting, reserves, collateral yield, claims, and NAV source
    |-- Parent edge -> L2 ONyc token is backed by and valued from this source
    |-- Materiality reason -> underwriting losses, claims, reserve adequacy, portfolio concentration, and liquidity can impair NAV
    |-- Instrument route -> RWA / tokenized fund
    |-- Instrument-specific battery -> tokenized reinsurance / NAV source
    |-- Venue scorecard -> OnRe governance, custody, reporting, attestations, NAV publication, oracle support
    |-- [D] Direct scoring children -> none
    |-- [I] Inherited references -> none
    |-- [S] Shared Risk Condition IDs -> RC-ON-01, RC-ON-02
    |-- [R] Route-specific dependencies -> claims reporting, reserve/liquidity management, NAV updates, portfolio disclosure
    `-- Evidence outcome -> partial / Medium confidence

Risk Conditions:
  RC-ON-01: OnRe issuer/admin/redemption/legal/custody controls [S]
  RC-ON-02: OnRe NAV/oracle/pricing route [S]
  RC-ON-03: Kamino Multiply/Lend/swap/liquidation route [R at L1]
  RC-ON-04: USD stablecoin debt reserve and borrow-rate/liquidity route [R at L1]
```

#### Diagnostic And Chargeable Layer Results

| Layer | Object | Route | Diagnostic Instrument | Diagnostic Claim | Diagnostic Substance | Diagnostic Venue | Gross diagnostic | `InheritedRisk_L` | `NEW` Instrument | `NEW` Claim | `NEW` Substance | `NEW` Venue | `IncrementalRisk_L` | `PreOperatorRisk_L` | `IndicatedRisk_L` | Indicated grade | Confidence | Attached Risk Conditions |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| L3 | ONyc reinsurance/NAV source | RWA / tokenized fund | 0.5 | 0.5 | 1.0 | 0.5 | 0.675 | 0.000 | 0.050 | 0.175 | 0.350 | 0.100 | 0.675 | 0.675 | 0.675 | BBB | Medium | RC-ON-01, RC-ON-02 |
| L2 | ONyc token wrapper | RWA / tokenized fund | 0.5 | 0.5 | 0.5 | 0.5 | 0.500 | 0.675 | 0.050 | 0.175 | 0.000 `CARRIED` | 0.100 | 0.325 | 1.000 | 1.000 | B | Medium | RC-ON-01, RC-ON-02 |
| L1 | Kamino ONyc/USD looping route | Derivative / leveraged yield | 1.0 | 0.5 | 0.5 | 0.5 | 0.725 | 1.000 | 0.450 | 0.025 | 0.000 `CARRIED` | 0.175 | 0.650 | 1.650 | 1.650 | CCC | Medium (route pattern) | RC-ON-02, RC-ON-03, RC-ON-04 |

#### Risk Conditions, Attachments, And Operators

| Risk Condition | Failure condition | Primary carrier | Attachments and consequences | Materiality | Operators | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| RC-ON-01 OnRe issuer/redemption/custody | Issuer authority, custody segregation, legal-right, redemption-process, or liquidity-management failure impairs ONyc claim and recovery. | L2 Claim 0.175 and Venue 0.100 | L3 source recovery; L2 redemption/transfer | Required | `CONFIDENCE_CEILING = Medium`; `WATCHLIST = Required`; contributes to approved `NO_RATE` | S9, S11-S16; F1/F2/F5/F6 |
| RC-ON-02 ONyc NAV/oracle | NAV state, Chainlink/Pyth publication, fallback, freshness, or Kamino-consumption failure impairs valuation and liquidation. | L3 Venue 0.100 | L3 NAV; L2 token value; L1 collateral/liquidation | Dominant | `CONFIDENCE_CEILING = Medium`; contributes to approved `NO_RATE` | S13-S14, S17; F6 |
| RC-ON-03 Kamino reserve/liquidation route | Reserve configuration, oracle integration, swap, liquidation, or close-out failure causes wrongful liquidation or blocks exit. | L1 Venue 0.175 | L1 only; graph role `[R]` | Required | `NO_RATE = Required` for an approved exact-route result | S1-S8, S20-S21; F3/F4/F6 |
| RC-ON-04 stablecoin debt route | Debt-asset, borrow-liquidity, utilization, rate, or stablecoin-value change impairs net APY and liquidation buffer. | L1 Venue 0.175 | L1 only; graph role `[R]` | Dominant | `WATCHLIST = Required`; `NO_RATE = Required` for an approved exact-route result | S3, S17-S21; F4 |

RC-ON-03 and RC-ON-04 are local route conditions, not shared merely because they are important. L2 Substance is wholly `CARRIED` by L3, and L1 Substance is wholly `CARRIED` by L2. Leverage, liquidation, wrapper claim, and local execution-route contributions remain fully `NEW`.

#### Factor-Level Scorecard Rationale For Audit

```
> L3 ONyc Reinsurance/NAV Source

- Instrument Mechanics / `0.5` - NAV and reporting mechanics are documented, but the source depends on offchain underwriting, reserves, claims, collateral yield, and daily NAV publication.
- Claim / `0.5` - ONyc is described as a proportional exposure to a segregated account, but legal documents and priority terms were not fully reviewed.
- Substance / Yield / `1.0` - Catastrophic or correlated claims, reserve shortfall, portfolio concentration, collateral-yield compression, or unevaluable current portfolio evidence can impair NAV.
- Venue / Infrastructure / `0.5` - OnRe reports audits, multisig, segregated custody, attestations, Chainlink/Pyth roles, and BMA licensing, but audit PDFs, attestation reports, exact feed accounts, and legal evidence were not fully extracted.
- Evidence / `0.5` - Official issuer documents support a methodology example but not calibrated limit conclusions.

> L2 ONyc Token Wrapper

- Instrument Mechanics / `0.5` - ONyc is transferable and composable, but it is NAV-based and not a fixed $1 stablecoin.
- Claim / `0.5` - Primary redemptions are available only through eligibility-gated and liquidity-managed processes; secondary exit was not quantified.
- Substance / Yield / `0.5` - L3 carries the High source-risk path; L2 keeps wrapper/NAV exposure rather than assuming stablecoin-like backing.
- Venue / Infrastructure / `0.5` - Mint/redemption, queue, KYC/accredited requirements, Solana token controls, and secondary liquidity create material but documented dependencies.
- Evidence / `0.5` - Token mint and issuer mechanics are documented; live liquidity, legal, and attestation evidence remain incomplete.

> L1 Kamino ONyc/USD Looping Route

- Instrument Mechanics / `1.0` - Multiply is an explicitly leveraged route with liquidation and path dependency; target leverage was not provided.
- Claim / `0.5` - The position is a Kamino Lend/Multiply obligation over collateral and debt rather than direct ownership of the source asset alone.
- Substance / Yield / `0.5` - Net APY depends on ONyc yield minus variable stablecoin borrow rate, amplified by leverage; incentives and borrow rates can change.
- Venue / Infrastructure / `0.5` - Kamino's mechanics and risk controls are documented, but the exact reserve/vault ID, debt asset, reserve configuration, oracle accounts, and liquidation route were not verified.
- Evidence / `0.5` - Product mechanics and route existence are source-backed; exact live-route evidence remains a `NO_RATE` gap.
```

#### ONyc/Kamino Loss-Dominance Operator Test

This test is separate from numeric propagation. It explains why no additional loss-dominance operator binds for the route-pattern indicated score while preserving an approved `NO_RATE` result for an exact-vault assessment until the route evidence is verified.

| Layer | Candidate operator trigger tested | Tested loss path or route dependency | Result | Residual trigger |
| --- | --- | --- | --- | --- |
| L3 ONyc reinsurance/NAV source | High substance factors: catastrophic or correlated claims, reserve shortfall, portfolio concentration, collateral-yield compression, and unevaluable current portfolio evidence. | ONyc NAV impairment, delayed recovery, reserve-liquidity stress, claims loss, or unavailable primary redemption through the source layer. | The full 0.350 Substance contribution is charged at L3 and inherited upward; no separate score floor is needed while evidence does not prove current impairment. | Current NAV impairment, unavailable recovery or redemption, blocked valuation, structural collateral insufficiency, or unevaluable Required source evidence. |
| L2 ONyc token wrapper | Eligibility-gated primary redemption, liquidity-managed queue, NAV wrapper mechanics, and unquantified secondary exit. | ONyc holder cannot redeem, transfer, value, or exit the token wrapper while it is used as L1 collateral. | The 0.325 local increment charges wrapper/claim/venue risk; Substance is wholly `CARRIED`, while RC-ON-01/02 preserve shared consequences. | Suspended redemptions, unavailable queue liquidity, blocked secondary exit, contradictory legal terms, transfer freeze, or unevaluable redemption/legal evidence. |
| L1 Kamino ONyc/USD looping route | High instrument-mechanics factor from explicit leverage/liquidation path, plus unresolved exact reserve/vault ID, debt asset, target leverage/LTV, oracle accounts, and liquidation settings. | ONyc NAV drawdown, borrow-rate inversion, oracle failure, swap-depth stress, or stablecoin debt stress causes liquidation, impaired payoff, or unavailable exit. | The full 0.450 leverage contribution and 0.175 local Venue contribution produce the CCC route-pattern indicated result. The approved exact-route result remains `NO_RATE` until the route gaps close. | Real position near liquidation, inadequate buffer, stale oracle, unavailable debt market, failed swap/exit route, or unevaluable exact route evidence. |

#### Propagation And Operators

| Layer | Direct children | `InheritedRisk_L` | Chargeable `NEW` components | `IncrementalRisk_L` | `PreOperatorRisk_L` | Binding operators | `IndicatedRisk_L` | Indicated grade | Confidence |
| --- | --- | ---: | --- | ---: | ---: | --- | ---: | --- | --- |
| L3 ONyc source | None | 0.000 | Instrument 0.050 + Claim 0.175 + Substance 0.350 + Venue 0.100 | 0.675 | 0.675 | `CONFIDENCE_CEILING = Medium`; `WATCHLIST = Required` | 0.675 | BBB | Medium |
| L2 ONyc wrapper | L3 | 0.675 | Instrument 0.050 + Claim 0.175 + Venue 0.100 | 0.325 | 1.000 | inherited confidence/watchlist operators | 1.000 | B | Medium |
| L1 Kamino route | L2 | 1.000 | Instrument 0.450 + Claim 0.025 + Venue 0.175 | 0.650 | 1.650 | `WATCHLIST = Required` | 1.650 | CCC | Medium (route pattern) |

#### Critical-Path, Time-Cliff, And Mitigation Tests

| Record | Trigger | Joint/time-dependent condition | Current/expected/stress treatment | Base `max(child)` conservative? | Consequence | Next review |
| --- | --- | --- | --- | --- | --- | --- |
| CPR-ON-01 | Leverage/liquidation interaction; ONyc NAV/oracle, debt reserve, swap, liquidation, and exit routes are jointly Required | A NAV decline, stale oracle, borrow-rate/utilization increase, or thin exit can interact sequentially and force liquidation before recovery/redemption is available | Route-pattern arithmetic charges full leverage and venue contributions, but exact leverage, reserve, oracle, and liquidity states are unresolved | Not demonstrable for an exact position; route pattern alone cannot establish liquidation conservatism | `WATCHLIST = Required`; approved exact-route result `NO_RATE` | Before any live use and after any reserve, oracle, rate, NAV, or liquidity change |

No mitigation is credited. Kamino controls, oracle alternatives, deleveraging, ONyc redemption, and secondary liquidity remain diagnostic until authority, executability, timing, capacity, equivalence, common-cause independence, and test history are evidenced in a Mitigation Effectiveness Record.

#### Arithmetic

```text
Own-layer economic scores:

L3 ONyc reinsurance/NAV source:
  10%*0.5 + 35%*0.5 + 35%*1.0 + 20%*0.5 = 0.675 -> BBB

L2 ONyc token wrapper:
  10%*0.5 + 35%*0.5 + 35%*0.5 + 20%*0.5 = 0.500 -> BBB

L1 Kamino ONyc/USD looping route:
  45%*1.0 + 5%*0.5 + 15%*0.5 + 35%*0.5 = 0.725 -> BBB

Ex-ante attribution and propagation:

L3 ONyc source:
  InheritedRisk_L = 0.000
  IncrementalRisk_L = Instrument 0.050 + Claim 0.175 + Substance 0.350 + Venue 0.100 = 0.675
  PreOperator = PostOperator = 0.675 -> BBB; confidence Medium

L2 ONyc token wrapper:
  InheritedRisk_L = L3 post-operator 0.675
  Diagnostic Substance 0.175 is wholly CARRIED by L3 and contributes 0.000 locally.
  IncrementalRisk_L = Instrument 0.050 + Claim 0.175 + Venue 0.100 = 0.325
  PreOperator = PostOperator = 1.000 -> B; confidence Medium

L1 Kamino ONyc/USD looping route:
  InheritedRisk_L = L2 post-operator 1.000
  Diagnostic Substance 0.075 is wholly CARRIED by L2 and contributes 0.000 locally.
  IncrementalRisk_L = Instrument 0.450 + Claim 0.025 + Venue 0.175 = 0.650
  PreOperator = PostOperator = 1.650 -> CCC; confidence Medium for route pattern

No excluded weight is renormalized. Route-specific leverage, liquidation, debt, oracle, and exit contributions remain fully charged.

Post-operator indicated route-pattern result:
  1.650 CCC / source-backed watchlist

Approved result:
  NO_RATE because the applicable route-module Score Formation Specifications are not approved and the exact live route is unresolved.
```

#### Final Output Block

```text
Exact rated object: ONyc/USD stable-debt looping route through Kamino Multiply on Solana
Rated route: use Kamino Multiply to lever ONyc exposure against USD stablecoin debt
Token-family lane: derivative / leveraged RWA collateral position
Primary loss object: liquidation loss
Secondary loss objects: NAV loss; claim/redemption impairment; debt-rate/liquidity loss; oracle/market-exit failure
Review date: 2026-07-09
Research packet: vault/research-logs/active/onyc-usd-kamino-looping-vault-2026-07-09/
Score Formation Specification status: unapproved; diagnostic and indicated arithmetic only
Deepest material layer: L3 ONyc reinsurance/NAV source
Controlling source layer: L3 ONyc reinsurance/NAV source, 0.675 BBB
Top-layer gross own score: L1 Kamino ONyc/USD looping route = 0.725 BBB
Top-layer `InheritedRisk_L`: L2 ONyc token wrapper `IndicatedRisk_L` = 1.000 B
Top-layer `CARRIED` contribution: Substance 0.075 diagnostic; 0.000 chargeable, carried by L2
Top-layer `IncrementalRisk_L`: 0.650 for leverage, liquidation, claim, variable borrow-rate, route execution, and exact-route complexity
Top-layer post-operator indicated score: 1.650 CCC
Binding Risk Conditions: RC-ON-01, RC-ON-02, RC-ON-03, RC-ON-04
Evidence operators: `CONFIDENCE_CEILING = Medium` for route-pattern mechanics
Indicated-result operator: `WATCHLIST = Required`
Approved-result gates: `NO_RATE = Required` for the exact-route result
Critical-path record: CPR-ON-01; max-child conservatism cannot be demonstrated for the leveraged NAV/oracle/debt/liquidation/exit interaction without exact route data
Mitigation-effectiveness records: none; no mitigation relief granted
Liquidity / exit band: watchlist; secondary ONyc liquidity, liquidation exit capacity, and redemption queue capacity remain open
Market-risk band, if relevant: leveraged RWA / variable borrow-rate watchlist
Diagnostic result: factor and component anchors as printed above
Chargeable result: top-layer `InheritedRisk_L + IncrementalRisk_L = 1.650`
Post-operator indicated result: 1.650 / CCC / source-backed watchlist
Approved score: none
Approved result: NO_RATE
Reconciliation: score-formation and exact-route gates change indicated `1.650 / CCC` to approved `NO_RATE`; reason types `methodology_version` and `evidence`; approver pending; reversal requires approved route-module specifications and complete exact-route re-performance
Indicated confidence: Medium for route-pattern mechanics
Approved confidence: none because the approved exact-route result is `NO_RATE`
Rating-specific limitations: source cutoff 2026-07-09; unapproved score formation; unresolved reserve/vault, debt asset, leverage/LTV, reserve configuration, oracle accounts, secondary liquidity, legal/audit/attestation evidence; max-child interaction limitation; next review before any live use and after any route parameter change
NO_RATE gaps: unapproved route-module score formation plus exact reserve/vault ID, exact debt asset, target leverage/LTV, reserve config, oracle accounts, secondary liquidity, legal/audit/attestation review
Shared-factor tags: OnRe issuer/redemption/custody, ONyc NAV/oracle route, Kamino Multiply/Lend route, USD stablecoin borrow-rate/liquidity route
Decision: usable as a source-backed methodology walkthrough only
```


## 12. Acceptance Tests

| Test                                 | Pass condition                                                                                                                                                                                                                                                                                 |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exact object test                    | The output names token, chain, contract/market/maturity/share class, rated route, and review date.                                                                                                                                                                                             |
| Recursive layer test                 | Every material stripped layer receives its own instrument route, instrument-specific battery, venue scorecard, evidence outcome, and propagation effect.                                                                                                                                           |
| Recursive Layer Map treatment test   | The map assigns `[D]`, `[I]`, `[S]`, or `[R]` to every material linked item; only `[D]` child scores feed `InheritedRisk_L`, `[I]` is not charged, `[S]` maps to Risk Conditions and attachments, and `[R]` defaults to `NEW` in current-layer Venue unless a Risk Condition proves otherwise. |
| Layer-specific venue test            | Venue/control risk is scored at the layer where it applies, not only as a final overlay.                                                                                                                                                                                                       |
| Shared-condition attribution test    | Each repeated material failure condition has one Risk Condition, one primary carrier or operator-only treatment, all affected attachments, and a named operator; no duplicate charge is created. |
| Control-view layout test             | A completed output separates diagnostic/chargeable layers, Risk Condition master, attachment/attribution ledger, operator register, propagation steps, and change log. |
| Scorecard rationale test             | Each pilot gives factor-level source, anchor, rationale, materiality, diagnostic contribution, attribution, chargeable contribution, carrier, evidence state, and reviewer rationale. |
| Ex-ante propagation test             | Each layer prints `InheritedRisk_L`, exact fixed-weight `NEW` contribution IDs, `IncrementalRisk_L`, `PreOperatorRisk_L`, applied operator IDs, `IndicatedRisk_L`, indicated grade, indicated confidence, and parent effect. |
| Attribution completeness test        | Every `CARRIED` and `SHARED` record is complete before it can create zero charge; an incomplete record receives the materiality-based conservative fallback. |
| No-renormalization test              | Weight excluded as wholly `CARRIED` or `SHARED` is not redistributed to remaining current-layer factors. |
| Operator typing test                 | Every score, grade, confidence, `WATCHLIST`, `NO_RATE`, or `REJECT` effect uses the explicit operator vocabulary and has a target, value, source, and binding status. |
| Loss-dominance operator test         | A Required or Dominant High-risk factor can be marked non-binding only with a concrete rationale showing why it does not dominate payoff, recovery, exit, NAV/solvency, route dependency, or the indicated propagated score; vague language such as "not bound on inspected evidence" fails.           |
| Non-additive evidence test           | Evidence can impose only a confidence/rating ceiling, `WATCHLIST`, `NO_RATE`, or `REJECT`; it does not add points to the economic layer score.                                                                                                                                                                        |
| Evidence-operator table test         | Evidence produces High, Medium, or Low confidence separately from any rating ceiling, `WATCHLIST`, `NO_RATE`, `REJECT`, or approved-result consequence.                                                                                                                                                                                       |
| Deterministic scoring test           | A reviewer can reproduce factor scores, diagnostic component scores, aggregation judgments, `InheritedRisk_L`, every `NEW` contribution, `IncrementalRisk_L`, `PreOperatorRisk_L`, operator application, N/A treatment, evidence outcome, `IndicatedRisk_L`, and approved output. |
| Score-formation gate test            | Every approved numeric result references approved and effective route-module specifications; any material unspecified combining, dominance, N/A, missing-data, rounding, or allocation choice forces approved `NO_RATE`. |
| Shared-risk effectiveness test       | Every `Required`, `Dominant`, or `Modifier` `SHARED` Risk Condition has a named economic carrier or an effective operator; removing both fails validation. |
| Critical-path/time-cliff test        | Triggered joint, sequential, common-cause, maturity, migration, queue, refinancing, wind-down, or order-sensitive cases have a complete Critical Path Record and supported conservative consequence. |
| Mitigation-relief test               | No claimed score, operator, materiality, confidence, or monitoring relief survives removal of authority, executability, timing, capacity, equivalence, or common-cause evidence. |
| Result-reconciliation test           | Every diagnostic-to-chargeable-to-indicated-to-approved difference is typed, evidenced, owned, approved, dated, expiring or permanently justified, and reversible through a stated trigger. |
| Family/loss-object test              | Every output retains token-family lane and primary/secondary loss objects; no unsupported cross-lane grade equivalence is asserted. |
| Materiality classification test      | `Required`, `Dominant`, `Modifier`, and `Immaterial` labels follow the stated precedence and counterfactual tests; an item satisfying more than one test receives the first applicable label without duplicating the Risk Condition.                                                                                                                                                                |
| NO_RATE/REJECT decision test         | Missing or unevaluable Required evidence produces `NO_RATE`, while evidenced structural failure produces `REJECT`.                                                                                                                                                                                 |
| Scored pilot test                    | Both Section 11 pilots name exact scope limits, lanes/loss objects, source packets, graph roles, attributions, Risk Conditions, operators, indicated arithmetic, Score Formation Specification status, critical-path/mitigation tests, reconciliation, limitations, approved `NO_RATE` result, and source-backed watchlist status. |
| N/A guardrail test                   | Relevant but missing, stale, contradictory, or unevaluable information is never treated as N/A.                                                                                                                                                                                                |
| Derivative branch test               | A no-principal derivative routes to derivative-risk output while still unwrapping collateral, reference asset, oracle, liquidation, and venue.                                                                                                                                                 |
| No-claim asset test                  | No-claim assets avoid claim-like language but still score substance, venue, liquidity, market structure, and evidence.                                                                                                                                                                         |
| Output visibility test               | Final output shows diagnostic and chargeable records, propagated and indicated scores/grades, indicated confidence, approved result and approved confidence, binding operator IDs, liquidity, market-risk band, source-backed watchlist status, and `NO_RATE` gaps. |
| Portfolio overlay separation test    | Shared-factor portfolio exposure is tagged separately and does not change the standalone token rating without a separate portfolio decision.                                                                                                                                                   |
| Atomic schema test                   | Every stored rating validates against the canonical JSON Schema and passes ID uniqueness, reference, DAG, arithmetic, typed-ceiling, grade, root/final, and complete atomic-conclusion consistency checks. |
| Complete-record audit test           | Each rating validates as one self-contained document; embedded audit coverage equals 100%; assertions, deviations, acceptance counts, timestamps, predecessor rules, and change controls pass the canonical validator. |
| Complex-trigger test                 | Joint dependencies, common cause, leverage/liquidation, cycles, alternative paths, order-sensitive propagation, or attribution ambiguity trigger proportionate annex analysis rather than being forced into ordinary DAG arithmetic. |

## 13. Governance And Open Calibration Items

| Role | Responsibility |
| --- | --- |
| Analyst | Builds scope, graph, diagnostic scorecards, required Risk Conditions, attachments, attribution, arithmetic, and proposed output. |
| Dependency/control owner | Maintains condition identity, evidence, validity dates, control status, and change triggers. |
| Independent reviewer | Challenges completeness, Risk Condition boundaries, graph roles, attribution, operators, arithmetic, and evidence treatment. |
| Model validation | Tests conceptual soundness, implementation, sensitivity, invariants, schema conformance, and audit-test execution. |
| Risk committee | Approves taxonomy, aggregation, attribution boundaries, operators, thresholds, exceptions, and methodology changes. |
| Internal audit or equivalent | Tests adherence to the approved workflow and completeness of approvals and change records. |

Reassessment is mandatory after:

- a contract, oracle, bridge, venue, market, custody, admin, multisig, governance, servicer, manager, or legal-entity change;
- an incident, exploit, depeg, redemption suspension, liquidity failure, or control breach;
- evidence expiry or contradiction;
- addition of a layer, route, leverage, collateral, debt, or settlement asset;
- methodology recalibration;
- reviewer challenge that changes identity, attribution, materiality, or an operator; or
- portfolio analysis revealing an unrecorded common cause.

| Open item                                                                                                           | Owner                                                 | Required artifact                                                                                              | Acceptance criterion                                                                                                                                                              | Review timing                                                                                |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Route weights, evidence-confidence ceilings, loss-dominance thresholds, and rating-to-band mappings                 | Risk committee                                        | Approved calibration memo and methodology changelog                                                            | Committee approves numeric values, band mappings, `NO_RATE`/`REJECT` handling, and a versioned change record                                                                      | Before alpha calibration is promoted; refresh after scored-pilot drift or at least quarterly |
| Route-module Score Formation Specifications                                                                         | Methodology owner / model validation / risk committee | Versioned specifications with formulas, decision rules, boundary examples, implementation tests, and approvals | Identical frozen inputs reproduce identical components and contributions without reviewer discretion                                                                              | Before any approved numeric result; review after methodology or factor changes               |
| Loss-dominance operator and binding/non-binding rationale standards                                                 | Risk committee                                        | Operator register with trigger examples                                                                        | Each common trigger has a named operator, required evidence, non-binding rationale test, and escalation rule                                                                      | Before alpha calibration is promoted; update when a new token pattern is added               |
| Risk Condition, attribution, attachment, and operator conventions                                                   | Risk committee and model validation                   | Attribution playbook and worked examples                                                                       | Condition identity, carrier choice, attachment consequences, evidence fallbacks, and operator application are explicit across sample stacks                                      | Before alpha calibration is promoted; review after each pilot stack                          |
| Critical-path and time-cliff controls                                                                               | Model validation / risk committee                     | Joint-dependency and lifecycle edge-case pack                                                                  | Joint, sequential, common-cause, maturity, migration, queue, wind-down, and ordering triggers produce consistent conservative treatment                                           | Before alpha calibration is promoted; review when a new structural pattern appears           |
| Mitigation-effectiveness controls                                                                                   | Operations / legal / model validation                 | Control and substitution evidence standard                                                                     | Relief requires authority, execution, timing, capacity, equivalence, common-cause, test history, and residual-risk evidence                                                       | Before any mitigation relief; after control changes or evidence expiry                       |
| Reconciliation, limitation, and comparability controls                                                              | Methodology owner / risk committee                    | Closed reason taxonomy, limitation standard, and comparison policy                                             | Every result difference is reconstructable; every output retains lane/loss-object context; unsupported cross-lane equivalence is blocked                                          | Before publication or comparative API ranking                                                |
| Change control and reassessment                                                                                     | Methodology owner                                     | Change/exception register and trigger catalog                                                                  | Contract upgrades, role/control changes, reserve/NAV updates, incidents, market-depth breaks, legal changes, and evidence expiry create traceable reassessment tasks              | Before alpha calibration is promoted; event-driven plus quarterly review                     |
| Position-size liquidity thresholds                                                                                  | Treasury                                              | Liquidity and position-sizing policy                                                                           | Defines TVL, depth, slippage, redemption, and stressed-exit thresholds by rating band and route                                                                                   | Before limit setting; refresh monthly or after material market stress                        |
| Holder-claim tests for major stablecoins, RWAs, fund tokens, and wrapped/receipt tokens                             | Legal                                                 | Holder-claim legal test memo                                                                                   | Defines claim, enforceability, pass-through, priority, and redemption tests that analysts can apply consistently                                                                  | Before alpha calibration is promoted; refresh on material legal or regulatory change         |
| Language controls for no-claim assets, native tokens, governance tokens, derivatives, and reflexive tokens          | Legal                                                 | Approved wording and forbidden-wording library                                                                 | Output language avoids unsupported claim, guarantee, redemption, or reserve wording for each token class                                                                          | Before publication or client-facing use; refresh when new token classes enter scope          |
| Custody, bridge, oracle, admin, issuer-control, protocol-control, and incident-response standards                   | Operations                                            | Control-standard checklist                                                                                     | Minimum evidence, source types, escalation triggers, and `NO_RATE`/`REJECT` conditions are defined for each control category                                                      | Before alpha calibration is promoted; review after control incidents or protocol upgrades    |
| Source-backed scored pilots for aUSDC, BUIDL/T-bill-backed RWA, LP token, YU/derivative, BTC, and memecoin patterns | Research                                              | Pilot packets with selected findings, evidence review, source register, and scoring worksheet                  | Each pilot passes Section 12 acceptance tests and records unresolved gaps through `WATCHLIST` or `NO_RATE` treatment                                                              | Before broad coverage expansion; review after each pilot                                     |
| Source notes for named BUIDL/USDtb/USDe structures before those examples become factual rating precedents           | Research                                              | Source notes and promotion packet                                                                              | Each named structure has inspected source notes, evidence strength, allowed wording, and unresolved-gap register                                                                  | Before examples are used as precedents; refresh when issuer disclosures change               |

Evidence-limited cases may remain on the source-backed watchlist when their sources, gaps, operators, and reassessment triggers are explicit.
