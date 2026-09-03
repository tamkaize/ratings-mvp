---
title: Selected Output - PT-sUSDai Layer Scored Pilot
type: selected-output
status: active
lifecycle: active
run_id: pt-susdai-layer-scored-pilot-2026-07-07
created: 2026-07-07
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
tags: [pendle, pt, susdai, usdai, pyusd, token-risk]
---

# Selected Output

## Bottom Line

The previous `PT-sUSDai` illustrative pilot was capped too harshly on evidence after the exact live route was inspected. The evidence is strong enough to remove the old Low-confidence / watchlist-only cap for the exact Arbitrum `PT-sUSDai-15OCT2026` route.

That does not make the instrument Low risk. The revised score is:

```text
Final pilot output: Medium risk / source-backed watchlist
Controlling material layer: L5 sUSDai yield/NAV source, 0.675 Medium
Top PT layer score before caps: 0.500 Medium
Binding evidence cap: Medium confidence, not Low confidence
Production status: not production-approved until reserve reconciliation, loan/NAV evidence, role/admin evidence, and audit review gaps are closed
```

## Follow-Up: AA-Rated AI-Infrastructure Loan Claim

Follow-up review date: 2026-07-08

Query tested:

```text
Are the interest payments from AI-infrastructure collateralized loans backing sUSDai highly rated at AA/Aa, and would that change L5?
```

Finding:

```text
The AA/Aa claim was not verified for the actual current sUSDai loan book.
```

The strongest verified comparable was CoreWeave's DDTL 4.0 facility, which received A3 from Moody's and A(low) from DBRS. That is investment grade, but it is not AA/Aa. A later CoreWeave DDTL 5.0 facility was rated Ba2 by Moody's and BB+ by Fitch, showing that AI/HPC-backed financings are transaction-specific rather than automatically high-grade. A public Staking Rewards sUSDai report assigned `USD.ai - sUSDai` a CCC- DeFi risk grade, which is not directly comparable to a bond rating but is relevant contradictory protocol-risk evidence. BIS also flags rapid AI private-credit growth and possible risk underpricing.

Scoring consequence:

```text
No change to L5 on current evidence.
Current L5 remains:
  Instrument 0.5, Claim 0.5, Substance 1, Venue 0.5
  Score = 0.675 Medium, near High
```

If a later production review verifies that the actual sUSDai loan book is mostly externally rated AA/Aa obligations, with enforceable senior claims, low concentration, audited NAV, current loan-level evidence, and clear sUSDai holder pass-through, then the L5 substance score could move from `1` to `0.5`:

```text
Potential L5 if high-grade loan-book evidence is verified:
  10%*0.5 + 35%*0.5 + 35%*0.5 + 20%*0.5 = 0.500 -> Medium
```

Moving L5 below Medium would require more than high-grade borrower or facility ratings. It would require proof that sUSDai holders receive that credit quality through enforceable claim, valuation, liquidity, servicing, and control mechanics.

## Exact Rated Object

```text
Object: PT-sUSDai-15OCT2026
Chain: Arbitrum One
Rated route: buy/hold PT-sUSDai through the Pendle Arbitrum market
Review date: 2026-07-07
Market: 0xcbf629c8d396b1261f81f55175afa010e94787d8
PT: 0xb459db106f645d698e74027eef6019a26a0675cc
SY: 0x30ccf4bbee313fcd19f3e295b3ba2920a24e2f62
YT: 0x11456849c38ea4af212ab8d4324b39983716516a
sUSDai: 0x0b2b2b2076d95dda7817e785989fe353fe955ef9
USDai: 0x0a1a1a107e45b7ced86833863f482bc5f4ed82ef
Maturity: 2026-10-15 00:00:00 UTC
Market state checked: not expired on 2026-07-07
```

## Layer Scoring Summary

Risk scale:

```text
Low risk = 0
Medium risk = 0.5
High risk = 1
```

| Layer                                     | Route                                       | Instrument | Claim | Substance / yield | Venue | Economic score | Evidence | Shared or child cap  | Layer outcome     |
| ----------------------------------------- | ------------------------------------------- | ---------: | ----: | ----------------: | ----: | -------------: | -------- | -------------------- | ----------------- |
| L4 PYUSD reserve layer                    | Fiat / reserve stablecoin                   |          0 |   0.5 |                 0 |   0.5 |          0.275 | Medium   | None                 | Medium            |
| L3 USDai layer                            | Fiat / reserve stablecoin wrapper           |        0.5 |   0.5 |               0.5 |   0.5 |          0.500 | Medium   | L4 Medium; D1 Medium | Medium            |
| L5 sUSDai yield/NAV source                | RWA / tokenized credit source               |        0.5 |   0.5 |                 1 |   0.5 |          0.675 | Medium   | D3 Medium            | Medium, near High |
| L2 sUSDai layer                           | Vault / aggregator or yield-bearing receipt |        0.5 |   0.5 |               0.5 |   0.5 |          0.500 | Medium   | L5 Medium; D1 Medium | Medium            |
| D1 USD.AI issuer/admin/control dependency | Shared dependency                           |        N/A |   N/A |               N/A |   0.5 |            N/A | Medium   | Attaches to L2/L3    | Medium cap        |
| L1 PT-sUSDai PT layer                     | PT / principal token                        |        0.5 |   0.5 |               0.5 |   0.5 |          0.500 | High     | L2/L3/L5 Medium      | Final Medium      |

## Arithmetic

```text
L4 PYUSD:
  10%*0 + 30%*0.5 + 35%*0 + 25%*0.5 = 0.275 -> Medium

L3 USDai:
  10%*0.5 + 30%*0.5 + 35%*0.5 + 25%*0.5 = 0.500 -> Medium

L5 sUSDai yield/NAV source:
  10%*0.5 + 35%*0.5 + 35%*1 + 20%*0.5 = 0.675 -> Medium, near High

L2 sUSDai:
  15%*0.5 + 15%*0.5 + 45%*0.5 + 25%*0.5 = 0.500 -> Medium

L1 PT-sUSDai:
  35%*0.5 + 20%*0.5 + 20%*0.5 + 25%*0.5 = 0.500 -> Medium
```

## Finding Register

| Finding ID | Finding | Why it matters | Source IDs | Candidate artifact | Notes |
| --- | --- | --- | --- | --- | --- |
| F1 | The exact live rated object is identifiable and contract-verifiable: Arbitrum market `0xcbf...87d8`, PT `0xb459...75cc`, SY `0x30cc...f62`, YT `0x1145...16a`, maturity `2026-10-15 00:00:00 UTC`, not expired on 2026-07-07. | Removes the old no-rate premise that the exact contract, maturity, and route were uninspected. | S3, S4, S5, S6, S11 | writing / source-backed pilot | Strong support from direct RPC, protocol docs, explorer, and DeFiLlama market data. |
| F2 | Pendle PT mechanics are well documented, but the PT payoff is to the accounting asset and redemption uses the Pendle PT/SY/YT structure; it is not a simple one-token reserve claim. | Supports a Medium PT layer score despite strong evidence. | S1, S2, S3, S4 | writing / concept | The PT layer is understandable and tradable, but settlement complexity remains real. |
| F3 | sUSDai is a yield-bearing receipt, not a stablecoin; current docs describe epoch-based redemption, FIFO/cash constraints, and exposure to illiquid GPU-collateralized loans plus idle T-bill allocation. | Prevents the PT layer from inheriting PYUSD reserve quality as if no sUSDai transformation existed. | S9, S10, S13, S20 | writing / claim candidate after review | Strong mechanics evidence; medium evidence for current portfolio quality. |
| F4 | USDai is described in current USD.AI sources as 100% PYUSD-backed with restricted direct mint/redeem access after April 6, 2026; non-whitelisted users rely on DEX/CEX acquisition and staking routes. | Explains why USDai is Medium rather than Low: backing is stronger than old evidence implied, but direct redemption is eligibility-gated. | S7, S8, S11, S14 | writing / claim candidate after review | Older M0/T-bill framing exists in third-party material, but current primary sources support PYUSD backing. |
| F5 | PYUSD has strong issuer-level reserve and attestation evidence, but holder route, issuer restrictions, regulatory controls, and Arbitrum/L2 transfer dependencies keep the layer at Medium rather than Low. | Keeps the stablecoin root from becoming an unqualified Low-risk pass-through. | S15, S16, S17, S18, S19 | writing / source-backed pilot | Latest individual reserve report was not extracted, so overall confidence remains Medium for completeness. |
| F6 | The sUSDai yield/NAV source is material and separable: sUSDai value depends on GPU loan performance, idle T-bill allocation, queue liquidity, manager/servicer processes, and valuation controls. | This is the controlling material layer in the revised pilot. | S9, S10, S20, S21 | writing / source-backed pilot | Score is 0.675 Medium, near High, because the substance factor is High risk but the weighted route score remains below 0.75. |
| F7 | USD.AI admin/control risk is Medium, not currently evidenced as High: docs show roles, multisig/offchain execution, contract addresses, audits, and bug bounty, but role assignments, signer thresholds, audit findings, and operational procedures were not fully inspected. | Replaces the old unsupported High shared dependency cap with a medium cap and named gaps. | S10, S11, S12 | writing / gap register | If role/audit review later finds unbounded or unsafe controls, this can escalate to High. |
| F8 | Final pilot result is Medium risk / source-backed watchlist, not High risk / low-evidence watchlist-only. | Directly answers the audit question about why the old evidence cap was too low. | F1-F7 | writing / decision candidate after review | Not production-approved; gaps remain material for limit-setting. |
| F9 | The claim that sUSDai's AI-infrastructure loan interest is AA/Aa-rated was not verified for the actual current sUSDai loan book. | Prevents upgrading L5 based on generic AI-infrastructure credit examples rather than loan-book-specific evidence. | S10, S22, S23, S24, S25, S26 | writing / gap register | Comparable GPU/HPC financing evidence includes A3/A(low) and Ba2/BB+ examples; no AA/Aa evidence was found for current sUSDai loans. |

## Layer Logic

### L1 PT-sUSDai PT Layer

Instrument mechanics = 0.5. Pendle PT payoff and maturity are documented and contract-verifiable, but the output is an accounting-asset redemption through PT/SY mechanics rather than a simple token-at-par claim.

Claim = 0.5. The claim is explicit at maturity, but it is conditional on the Pendle market/YT/SY mechanics and lower-layer sUSDai/USDai mechanics.

Substance / yield = 0.5. The PT inherits exposure to sUSDai economics rather than only to PYUSD reserves.

Venue = 0.5. Pendle route evidence is strong, market TVL is observable, and the market is live, but pre-maturity exit still depends on the Pendle/Arbitrum market route and liquidity.

Evidence = High. Exact object, maturity, market route, token addresses, protocol docs, on-chain reads, explorer labels, and market data reconcile.

### L2 sUSDai Layer

Instrument mechanics = 0.5. sUSDai is a yield-bearing vault/receipt with asynchronous redemption and epoch mechanics, not a direct stablecoin claim.

Claim = 0.5. Redemption exists by rule, but timing and fulfillment depend on queue processing, available USDai, and protocol servicing.

Substance / yield = 0.5 at L2. The economic source is scored separately in L5, so L2 receives Medium for mapped but conditional underlying exposure rather than double-counting the High substance factor.

Venue = 0.5. Contract addresses and docs exist, but admin, servicing, oracle/valuation, and liquidity routes have residual gaps.

Evidence = Medium. Mechanics are well evidenced; current loan/NAV data, role assignments, legal documents, and audit reports need deeper inspection.

### L3 USDai Layer

Instrument mechanics = 0.5. USDai is described as fully backed, but direct mint/redeem at the contract level is whitelisted.

Claim = 0.5. Non-whitelisted holders can hold, transfer, stake, and acquire through secondary venues, but direct redemption is routed through approved market makers or institutional depositors.

Substance / yield = 0.5. Current primary sources state 1:1 PYUSD backing and no private-key minting, but this run did not independently reconcile USDai supply against locked PYUSD.

Venue = 0.5. Secondary liquidity exists, but direct primary-market access is gated and Arbitrum/market-maker route dependence remains.

Evidence = Medium. Current primary documents are strong, but backing reconciliation and current market-depth evidence are incomplete.

### L4 PYUSD Layer

Instrument mechanics = 0. PYUSD is a conventional fiat/reserve stablecoin issued by Paxos.

Claim = 0.5. The issuer framework supports 1:1 redemption, but direct redemption/access depends on eligible channels and issuer terms.

Substance / yield = 0. Reserves are described by Paxos/PayPal as high-quality cash, Treasuries, and cash equivalents with monthly reporting and attestations.

Venue = 0.5. Centralized issuer, regulatory, transfer, and Arbitrum/L2 dependencies remain material.

Evidence = Medium. Source quality is high, but this run did not inspect the latest individual attestation PDF.

### L5 sUSDai Yield/NAV Source

Instrument mechanics = 0.5. The source is a mapped but hybrid on-chain/off-chain credit and treasury allocation system.

Claim = 0.5. sUSDai holders do not underwrite individual loans; their route to value depends on protocol NAV, repayments, queue servicing, and collateral/loan processes.

Substance / yield = 1. GPU-collateralized loans are illiquid, credit-sensitive, and operationally complex. Idle T-bill allocation helps, but it does not remove loan-book and redemption-liquidity risk.

2026-07-08 AA-rating check: no source verified that the actual current sUSDai loan book is AA/Aa-rated. Investment-grade GPU/HPC financing examples exist, but the inspected examples were A3/A(low) and Ba2/BB+. Therefore the L5 substance score remains `1` until loan-book-specific ratings, portfolio composition, claim pass-through, and NAV evidence are verified.

Venue = 0.5. The docs describe risk controls, audits, bug bounty, and servicing mechanics, but this run did not verify loan-level legal documents, current portfolio composition, or role/admin implementation.

Evidence = Medium. Official docs are sufficient for a source-backed pilot, not for production limit-setting.

### D1 USD.AI Admin/Control Dependency

D1 is scored once and attached to L2 and L3. It is Medium because control mechanisms are disclosed but not fully verified. The evidence does not currently support the old High cap, but it also does not support a Low control score.

## Audit Conclusion

The old pilot's key weakness was not the arithmetic. It was the evidence treatment. Once the exact route and current primary sources are inspected, Low confidence is too punitive. The better result is:

```text
Medium risk because the structure is conditional and layered.
Medium confidence because several production-grade verification items remain open.
No High-risk cap is currently supported by the inspected evidence.
No Low-risk output is justified because the controlling sUSDai/yield-source layer remains structurally conditional and credit/liquidity-sensitive.
```
