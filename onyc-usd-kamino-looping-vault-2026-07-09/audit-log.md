---
title: Audit Log - ONyc/USD Kamino Looping Vault
type: audit-log
status: active
lifecycle: active
run_id: onyc-usd-kamino-looping-vault-2026-07-09
created: 2026-07-09
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
tags: [onyc, onre, kamino, multiply, rwa, token-risk]
---

# Audit Log

## Run Metadata

- Root question: Add a source-backed token rating example for ONyc/USD looping vault on Kamino.
- Skill route: `deep-research` with repo-local Searchbot protocol.
- Retrieval tools: Exa `web_search_exa`, Exa `web_fetch_exa`, and read-only PowerShell `Invoke-WebRequest` calls to official Kamino API endpoints.
- Model-routing gap: Searchbot's exact planner/searcher/synthesizer model split could not be enforced in this runtime. The plan, retrieval, evidence labels, and synthesis are recorded explicitly instead.
- Source-library check: `references/source-library/README.md` and `catalog.md` were read. No project-specific trusted or blocked sources were configured.
- Existing-knowledge check: `vault/index.md` was read; token workstream exists under `vault/workstreams/token-classification-ecl-workstream.md`.

## Planner Graph

Root: Can ONyc/USD looping on Kamino be added as a methodology worked example, and what source-backed grade should it receive?

| Node ID | Atomic question | Perspective | Source family | Dependencies |
| --- | --- | --- | --- | --- |
| STD-N01 | What is the exact ONyc asset, token mint, and ONyc claim/substance structure? | issuer/product identity | company | none |
| STD-N02 | How does Kamino Multiply/looping work, and what are the route-specific leverage, borrow-rate, and liquidation risks? | protocol mechanics | company | none |
| STD-N03 | What does OnRe say specifically about ONyc on Kamino Multiply and ONyc/Kamino risks? | issuer integration | company | STD-N01, STD-N02 |
| STD-N04 | Can the exact live Kamino reserve/vault/debt route be verified from official Kamino APIs or inspectable pages? | exact-object verification | company / API | STD-N02 |
| STD-N05 | What controls, oracles, legal/redemption paths, and evidence gaps should cap the score? | controls and evidence | company / authority-like issuer docs | STD-N01, STD-N02 |

Dispatch waves:

- Wave 1: STD-N01, STD-N02.
- Wave 2: STD-N03, STD-N04, STD-N05.

## Query Ledger

| Node ID | Query variants |
| --- | --- |
| STD-N01 | `OnRe ONyc documentation NAV reinsurance tokenized access redemption mint fee Chainlink oracle Bermuda Monetary Authority docs`; `ONyc token mint OnRe Solana token configuration`; `OnRe ONyc FAQ not stablecoin redemption KYC` |
| STD-N02 | `Official Kamino ONyc USD looping vault ONyc/USD Solana vault page Kamino Lend Multiply`; `Kamino Multiply how it works flash loan leverage liquidation RWA ONyc`; `Kamino Multiply risks borrow rate liquidation RWA stablecoin` |
| STD-N03 | `ONyc joins Kamino Multiply OnRe risk USDC USDG`; `ONyc launches on Kamino borrow USDG incentives Chainlink NAV`; `ONyc/USDC Kamino Multiply ONyc USDC Kamino` |
| STD-N04 | `Kamino ONyc USDC Multiply vault APY TVL LTV ONyc/USDC live data Solana Kamino API`; `5Y8NV33Vv7WbnLfq3zBcKSdYPrk7g2KoiQoe7M2tcxp5 Kamino ONyc reserve`; official API calls to reserve and leverage metric endpoints |
| STD-N05 | `OnRe system integrity overview audits multisig timelock Chainlink Pyth`; `OnRe redemptions KYC queue liquidity capacity`; `Kamino reserve parameters oracle LTV liquidation threshold` |

## Inspected URL Inventory

| URL | Label | Notes |
| --- | --- | --- |
| https://kamino.com/docs/products/multiply/index | [fetched] | Product overview and net APY formula. |
| https://kamino.com/docs/products/multiply/how-it-works | [fetched] | Seven-step open flow, flash-loan fee, variable borrow rates. |
| https://kamino.com/docs/products/multiply/concepts | [fetched] | Looping, RWA tokens, ONyc/USDC statement, RWA risks. |
| https://kamino.com/docs/products/multiply/strategies | [fetched] | Stablecoin/RWA strategies and ONyc base-yield framing. |
| https://kamino.com/docs/products/multiply/risks | [fetched] | Borrow-rate risk, liquidation mechanics, RWA/counterparty risk, auto-deleveraging. |
| https://kamino.com/docs/build/api-reference/borrow/market-data/market-leverage-metrics | [fetched] | API schema for leverage metrics. |
| https://kamino.com/docs/build/kamino-lend-markets/get-metrics-for-market-reserves | [fetched] | API schema for reserve metrics. |
| https://kamino.com/docs/curators/markets/reserve-parameters | [fetched] | Reserve config fields and meanings. |
| https://docs.onre.finance/introduction/onre-tokenized-reinsurance-onyc | [fetched] | ONyc product description and not-stablecoin language. |
| https://docs.onre.finance/for-capital-providers/minting-onyc | [fetched] | Minting mechanics and supported assets. |
| https://docs.onre.finance/for-capital-providers/redemptions | [fetched] | Redemption queue, KYC, liquidity, fees. |
| https://docs.onre.finance/security-and-verification/system-integrity-overview | [fetched] | Audits, multisig, timelock in progress, primary risk. |
| https://docs.onre.finance/technical-resources/token-configuration-and-reference | [fetched] | ONyc mint, program, mint authority, upgrade authority. |
| https://docs.onre.finance/technical-resources/data-streams-and-oracle-providers | [fetched] | Pyth and Chainlink roles. |
| https://docs.onre.finance/technical-resources/frequently-asked-questions | [fetched] | Not stablecoin, BMA licenses, APY target, redemption summary. |
| https://docs.onre.finance/for-insurers/reporting | [fetched] | NAV/APY methodology, claims and reserve reporting. |
| https://www.onre.finance/blog/onyc-launches-on-kamino-unlocking-real-world-yield-and-collateral-utility-in-solana-defi | [fetched] | Kamino integration, USDG incentives, Chainlink NAV statement. |
| https://www.onre.finance/blog/unlocking-more-utility-onyc-joins-kamino-multiply | [fetched] | ONyc Multiply product and risk disclosures. |
| https://yields.lince.finance/tracker/solana/kamino/kamino-onyc-multiply | [fetched] | Third-party tracker confirms ONyc Multiply category and USDC tag but lacks exact reserve IDs in fetched content. |
| https://api.kamino.finance/kamino-market/7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF/reserves/metrics | [fetched] | Official API endpoint accessible; filtered inspection did not locate ONyc mint/name. |
| https://api.kamino.finance/kamino-market/7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF/leverage/metrics | [fetched] | Official API endpoint accessible; metrics returned reserve IDs but ONyc route not identified. |

## API Inspection Notes

Read-only calls run from repo root:

```powershell
Invoke-WebRequest -UseBasicParsing -Uri "https://api.kamino.finance/kamino-market"
Invoke-WebRequest -UseBasicParsing -Uri "https://api.kamino.finance/kamino-market/7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF/reserves/metrics"
Invoke-WebRequest -UseBasicParsing -Uri "https://api.kamino.finance/kamino-market/7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF/leverage/metrics"
```

Observed:

- Market list returned one primary market: `7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF`.
- Reserve metrics returned many reserves, including several USDC reserves and USDG, but a filtered search for ONyc, ONYC, NYC, or mint `5Y8NV33Vv7WbnLfq3zBcKSdYPrk7g2KoiQoe7M2tcxp5` did not identify an ONyc reserve.
- Leverage metrics returned 94 rows with reserve IDs and tags, but the ONyc route could not be identified without a verified ONyc reserve ID.

## Evidence Labels And Synthesis Decisions

- [fetched] Official sources support ONyc token identity, ONyc not-stablecoin treatment, Kamino Multiply mechanics, and RWA/borrow-rate/liquidation risk.
- [fetched] Official sources support ONyc/Kamino integration and ONyc Multiply route existence.
- [fetched] Official sources conflict on or do not fully pin the exact debt asset: Kamino docs mention ONyc/USDC; OnRe integration materials emphasize USDG borrowing incentives; OnRe's Multiply risk note says USDC/USDG.
- [inferred] Because exact route identifiers and target leverage are missing, an indicative route-pattern score can be added, but production exact-vault rating remains no-rate.
- [asserted/blocked] Any claim that exact live reserve addresses, current LTV/liquidation thresholds, or active oracle accounts were verified is unsupported by this run.

## Selected Scoring Judgment

Indicative route-pattern score for methodology example:

```text
L3 ONyc reinsurance/NAV source: 0.675 -> BBB
L2 ONyc token wrapper: 0.875 propagated -> BB
L1 Kamino ONyc/USD looping route: 1.325 propagated -> B
Final route-pattern output: 1.325 B / source-backed watchlist
Production exact-vault output: no production rating until exact route IDs, debt asset, leverage, reserve config, oracle, liquidity, legal, audit, and attestation gaps close.
```

## Repair Attempts

- Attempted exact route repair through official Kamino API docs and live API calls.
- Attempted exact route repair through ONyc mint query and external tracker search.
- Outcome: route existence is supported, but exact reserve/vault ID remains unresolved.

## Unresolved Gaps

See `gaps.md`.
