# ONyc, PT-ONyc, and PT-srONyc: assessment starting point

Research checked 2026-09-07. Working interpretation of the user's names: OnRe ONyc and Exponent PT-ONyc / PT-srONyc on Solana. Exact PT markets, maturities, accounts, and position routes remain unconfirmed. This document is a mapping brief, not a canonical rating record.

## Is the methodology enough?

It is enough to structure the research and explain the layers. It already supports material layers, typed dependency edges, direct versus shared risk, route-specific dependencies, evidence gaps, critical paths, and mitigation records. Use it now for decomposition and evidence collection.

It is not yet sufficient to issue a defensible comparative numeric rating for these three positions. Besides missing live evidence and approved score formation, senior loss protection creates a specific calibration issue: the default maximum-child-plus-NEW rule and operating principle 6 prevent a parent from outranking its material child. With raw ONyc as a direct child, adding srONyc can only preserve or increase inherited risk. That is conservative, but cannot by itself quantify a senior tranche's changed loss exposure.

Add a documented tranche loss-waterfall annex before attempting that ranking. Determine losses borne by junior and senior capital, coverage depletion, valuation/sync timing, recovery pauses, settlement ordering, and residual control/exit risks. Use a Mitigation Effectiveness Record for any claimed relief. This annex does not itself override the inheritance floor: any score transformation requires an explicit, versioned, approved methodology/calculator change. Do not use a negative NEW contribution, relabel ONyc as an inherited reference merely to bypass the floor, or assume a senior label guarantees protection.

## Build three roots over a reusable evidence graph

Conceptual economic paths, not verified transaction sequences:

```text
ONyc ────────────────────────────────────────┐
PT-ONyc → Exponent yield wrapper → ONyc ─────┤
PT-srONyc → Exponent yield wrapper → srONyc  │
                                      ↓     │
                       senior/junior pool → ONyc
                                            ↓
                            OnRe account / claim
                                ↙                 ↘
                 reinsurance exposures      collateral / liquidity assets
```

The last two branches both need investigation: premiums less claims and expenses, and the assets used to collateralize obligations or support liquidity. They are functions of the same economic structure, not two independent reserves to add together. Do not hardcode an old sUSDe-only backing stack. Identify current holdings, then recursively map any material tokenized fund, stablecoin, custodian, bridge, or yield strategy.

Treat the Exponent yield wrapper as a candidate distinct layer. Resolve the actual vault/SY/adapter accounts first; if it does not create an independently material economic claim, represent the relevant mechanics as a route dependency instead. Do not invent a separate scoring layer for every program.

Junior capital belongs beside the srONyc waterfall as a protection dependency. It is not an extra asset the senior holder owns, and should not be counted twice as underlying collateral. An Exponent control failure shared by yield stripping and tranching needs one precisely defined Risk Condition with multiple attachments; distinct program bugs can still be distinct conditions.

## Keep three views separate

- **Layers:** what do I hold, what claim does it represent, and what ultimately produces or supports value? Show the explodable vertical stack.
- **Dependencies:** which controls, accounts, NAV inputs, custody arrangements, junior buffer, and settlement assets must work? Use `D` for scoring children, `I` for contextual lineage, `S` for shared conditions, and `R` for route dependencies. Graph role and NEW/CARRIED/SHARED attribution are different fields.
- **Routes:** how does a user acquire the position and get back to the chosen cash asset? Show direction, order, alternatives, and failures separately from score propagation.

The score graph is acyclic. A route can revisit an asset during a rollover or unwind, so do not force transaction history into the score graph. Preserve stable economic object IDs across assessments, but keep local layer IDs, route assumptions, and rating versions scoped to each record. The existing canonical schema stores one assessment; a cross-assessment visual index is an additional read model.

## Route differences that matter

| Position | Entry to investigate | Maturity / withdrawal to investigate | Early exit | Distinct stress path |
| --- | --- | --- | --- | --- |
| ONyc | Eligible primary mint or secondary swap | No PT maturity; eligible issuer redemption into the supported settlement asset | Sell ONyc through a specified liquid market | NAV impairment, unavailable issuer liquidity, constrained secondary depth |
| PT-ONyc | Buy exact PT market; alternatively strip underlying and dispose of YT | Redeem PT through its actual wrapper/accounting conversion, then choose ONyc sale or issuer redemption | Sell PT; alternatively acquire matching YT and merge where supported | Thin PT liquidity, settlement/adapter failure, then ONyc exit limits |
| PT-srONyc | Buy exact PT market; an assembly route additionally acquires/mints srONyc | PT settlement, senior withdrawal where available, then ONyc exit | Sell PT; merge and unwind only if each step is available | Junior depletion, stale NAV sync, recovery pause, maturity during pause, then ONyc exit limits |

Buying a PT on a secondary market does not require the buyer to manually execute every underlying mint step. PT redemption is also not a promise of immediate USDC. Verify denomination, exchange-rate formula, actual output token, conversion authority, fees, and impairment behavior from the exact market and deployed code. Generic documentation's “1:1” wording is insufficient to infer one ONyc token or one dollar per PT.

## What to collect first

1. Three exact position definitions: mint, market/vault/program IDs, PT maturity timestamp, settlement denomination, size, horizon, wallet custody, access eligibility, intended cash exit. Keep leverage off the initial comparison unless it is the intended position.
2. One reusable ONyc evidence packet: participation rights, account structure, current holdings and underwriting book, claims and reserves, valuation process, independent attestations, controls, and executable redemption rules.
3. Exponent market evidence: PT and YT mints, wrapper accounts, exchange-rate/impairment mechanics, program versions, administrative powers, audits tied to those versions, executable settlement and market depth.
4. srONyc evidence: actual junior and senior NAV, coverage definition and denominator, current utilization, withdrawals, NAV source, sync behavior, recovery duration, settlement triggers and state, loss waterfall, and residual risks outside its protection scope.
5. Route step records: `route_id`, `position_id`, `scenario`, `step_id`, `sequence`, `input_asset_id`, `output_asset_id`, `venue/account_ids`, `preconditions`, `time_or_queue`, `fee_and_capacity_basis`, `failure_mode`, `fallback`, `source_ids`, `observed_at`. Keep this companion data separate until a schema extension is approved.

Start with ONyc, then PT-ONyc, then the senior waterfall, then PT-srONyc. Compare matched position sizes, cash denominations, and horizons. If maturities differ, show duration sensitivity explicitly. Later add lending/looping as distinct roots with debt, oracle, liquidation, and unwind dependencies; do not inherit the old Kamino route as if every ONyc holder used it.

## Source register and evidence limits

Official docs establish described mechanics, not verification of deployed market state or legal enforceability. These links were inspected for this brief:

- [OnRe token description](https://docs.onre.finance/introduction/onre-tokenized-reinsurance-fund-onyc): issuer describes ONyc as a NAV-based claim on a segregated reinsurance account, rather than a stablecoin.
- [OnRe insurer introduction](https://docs.onre.finance/for-insurers/introduction): describes premium income and collateral returns.
- [OnRe collateral composition](https://docs.onre.finance/for-capital-providers/collateral-composition): current schedule is presented as an image; individual holdings/weights have not been extracted for this brief.
- [OnRe capital-provider introduction](https://docs.onre.finance/for-capital-providers/introduction): describes multiple collateral categories.
- [OnRe redemptions](https://docs.onre.finance/for-capital-providers/redemptions): describes eligibility, available liquidity, and execution-time valuation. The page includes “Coming Soon” language; do not treat the described automated path as confirmed live.
- [Older OnRe liquidity page](https://docs.onre.finance/getting-started/the-onchain-yield-coin-onyc/liquidity-and-redemption): describes a quarterly rONyc route. Reconcile versions against current terms and deployed state before choosing a rated primary exit.
- [Exponent yield stripping](https://docs.exponent.finance/user-documentation/yield-stripping-swap): explains PT/YT, pre-maturity merging, and maturity settlement. Market-specific denomination and conversion still require verification.
- [Exponent tranching markets](https://docs.exponent.finance/user-documentation/tranching-markets): identifies srONyc and jrONyc and describes state-dependent withdrawals.
- [Exponent risk-tranching](https://docs.exponent.finance/user-documentation/risk-tranching): explains coverage, junior first-loss treatment, NAV synchronization, recovery, and settlement. Illustrative percentages are not a live srONyc buffer observation.
- [OnRe August review](https://www.onre.finance/blog/onre-in-review-august-2026): confirms ONyc/srONyc maturities and tranching activity, but does not pin the user's chosen PT accounts.

No current APYs, liquidity estimates, exact PT mint addresses, or rating grades are asserted in the explorer. Its dependency roles are proposed analytical treatments pending scope and materiality review.
