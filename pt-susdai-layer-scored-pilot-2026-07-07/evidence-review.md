---
title: Evidence Review - PT-sUSDai Layer Scored Pilot
type: evidence-review
status: active
lifecycle: active
approval_status: pending
target: selected.md
created: 2026-07-07
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
tags: [pendle, pt, susdai, usdai, pyusd, token-risk]
---

# Evidence Review

## Review Status

This packet is pending review. Findings may be used in the working draft as a source-backed pilot, but they are not promoted durable claims until reviewed.

## Source Register

See `sources.md`.

## Finding Review

| Finding ID | Reviewed finding | Verdict | Source IDs | Quote / anchor | Summary | Analysis | Allowed wording | Forbidden wording | Disposition | Promotion target |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F1 | Exact live rated object is identifiable and contract-verifiable. | strong | S3, S4, S5, S6, S11 | RPC `readTokens`, `isExpired`, `expiry`; DeFiLlama 15OCT2026 rows | The market, PT, SY, YT, maturity, and non-expired state reconcile. | Strong enough to remove no-rate for exact-object identification. | The exact Arbitrum `PT-sUSDai-15OCT2026` route was identified and checked on 2026-07-07. | The route is production-approved or risk-free. | pending | writing / source-backed pilot |
| F2 | Pendle PT mechanics are documented but conditional on accounting-asset and PT/SY/YT mechanics. | strong | S1, S2, S3, S4 | PT maturity/accounting asset; after maturity PT redemption mechanics | PT payoff is understandable and verifiable, but not a simple token-at-par claim. | Supports Medium PT mechanics rather than Low. | Pendle PT mechanics are clear but structurally conditional. | PT-sUSDai is equivalent to direct PYUSD exposure. | pending | writing / concept |
| F3 | sUSDai is not a stablecoin and has epoch/FIFO/cash-constrained redemption. | strong for mechanics, medium for current portfolio | S9, S10, S13, S20 | `not a stablecoin`; `30-day epoch`; `FIFO`; GPU loans/T-bills | Mechanics are official and current; portfolio quality remains incomplete. | Supports Medium confidence and a separable L5 source layer. | sUSDai has conditional redemption and exposure to GPU-loan/T-bill economics. | sUSDai is instantly redeemable at par like a fiat stablecoin. | pending | writing / claim after review |
| F4 | USDai is currently described as PYUSD-backed, but direct mint/redeem is whitelisted. | medium to strong | S7, S8, S11, S14, S21 | March 26, 2026 upgrade; current USDai docs; historical conflict note | Primary USD.AI sources support PYUSD backing and whitelist restrictions. | Strong current primary source support, but production use needs backing reconciliation. | Current USD.AI sources state USDai is 100% PYUSD-backed and direct mint/redeem is whitelisted. | USDai backing was independently reconciled in this run. | pending | writing / source-backed pilot |
| F5 | PYUSD has strong issuer reserve evidence, but the latest attestation PDF was not extracted. | medium | S15, S16, S17, S18, S19 | reserve reporting and attestation pages | High-quality issuer sources exist, but completeness gap remains. | Supports Medium confidence for the PYUSD layer, not Low-risk production treatment. | PYUSD has strong issuer-level reserve and transparency evidence. | This run independently verified the latest PYUSD reserve values. | pending | writing / source-backed pilot |
| F6 | sUSDai yield/NAV source is material and separable. | medium | S9, S10, S20, S21 | GPU loans, T-bill floor, redemption liquidity, current/historical context | The source layer drives the controlling score. | Needs current loan-book and NAV inspection before promotion as a durable claim. | The sUSDai yield source is a material, separable credit/liquidity layer in this pilot. | The GPU loan book is fully verified or low risk. | pending | writing / source-backed pilot |
| F7 | USD.AI admin/control dependency is Medium, not yet evidenced as High. | medium | S10, S11, S12 | role/admin docs, contract addresses, audits page | Controls are disclosed but not fully verified. | The old High cap is not supported by this evidence; escalation remains possible after role/audit review. | USD.AI admin/control evidence supports a Medium cap pending role and audit inspection. | USD.AI controls are proven safe or proven unsafe. | pending | writing / gap register |
| F8 | Final pilot result is Medium risk / source-backed watchlist. | medium | F1-F7 | scoring table | Evidence is stronger than old pilot but residual gaps remain. | Suitable for methodology draft as a worked pilot; not a production rating. | Revised pilot result is Medium risk with Medium confidence residual gaps. | PT-sUSDai is production-approved or Low risk. | pending | writing |
| F9 | The claim that sUSDai's AI-infrastructure loan interest is AA/Aa-rated was not verified for the actual current sUSDai loan book. | medium | S10, S22, S23, S24, S25, S26 | CoreWeave A3/A(low) and Ba2/BB+ examples; Staking Rewards CCC-; Moody's Aa/A definitions; USD.AI loan-default/NAV docs | Comparable AI/HPC financings show mixed ratings and do not establish AA/Aa quality for sUSDai. | Supports no change to L5 until loan-book-specific external ratings, NAV, concentration, and pass-through evidence are inspected. | No inspected source verifies that the current sUSDai loan book is AA/Aa-rated. | sUSDai's loan interest stream is AA-rated; L5 is Low risk because AI-infrastructure collateral is high grade. | pending | gap register / writing |

## Approved For Promotion

- None yet. User review pending.

## Blocked / Needs Work

- Production approval is blocked by the gaps listed in `gaps.md`.

## Reviewer Notes

- The most important audit choice is whether L5 should be scored as a separable layer or embedded entirely inside L2 sUSDai. This packet treats L5 as separable because the yield/NAV source is material, independently described, and controls redemption liquidity and value support.
- The second audit choice is whether the High substance component in L5 should hard-cap the final output at High despite the weighted score being 0.675. The current framework says this "must be considered" as a potential binding cap, not automatically applied. This packet does not bind it because idle T-bill allocation, documented controls, and lack of decisive impairment evidence make a hard High cap too strong on inspected evidence.
- 2026-07-08 follow-up: if future evidence verifies that the actual sUSDai loan book is mostly AA/Aa-rated and that sUSDai holders have enforceable, liquid, well-valued pass-through to that credit quality, the L5 substance score could be reconsidered. Current evidence does not support that change.
