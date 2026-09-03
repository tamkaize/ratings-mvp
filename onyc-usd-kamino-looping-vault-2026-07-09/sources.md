---
title: Sources - ONyc/USD Kamino Looping Vault
type: source-register
status: active
lifecycle: active
run_id: onyc-usd-kamino-looping-vault-2026-07-09
created: 2026-07-09
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
tags: [onyc, onre, kamino, multiply, rwa, token-risk]
---

# Source Register

Review date: 2026-07-09.

| Source ID | Source | Link | Type | Evidence quality | Used for |
| --- | --- | --- | --- | --- | --- |
| S1 | Kamino Multiply overview | https://kamino.com/docs/products/multiply/index | official protocol docs | strong for product mechanics | Multiply product definition, flash-loan/looping overview |
| S2 | Kamino Multiply how-it-works | https://kamino.com/docs/products/multiply/how-it-works | official protocol docs | strong for mechanics | flash-loan open/close flow, variable borrow-rate APY formula, eMode context |
| S3 | Kamino Multiply concepts | https://kamino.com/docs/products/multiply/concepts | official protocol docs | strong for mechanics, medium for ONyc-specific live parameters | looping mechanics, RWA token treatment, ONyc/USDC statement, RWA-specific risks |
| S4 | Kamino Multiply strategies | https://kamino.com/docs/products/multiply/strategies | official protocol docs | medium to strong | stablecoin/RWA strategy category, ONyc base-yield framing, borrow-rate risk |
| S5 | Kamino Multiply risks | https://kamino.com/docs/products/multiply/risks | official protocol docs | strong for risk mechanics | borrow-rate risk, liquidation mechanics, RWA/counterparty risk, auto-deleveraging |
| S6 | Kamino leverage/multiply metrics API docs | https://kamino.com/docs/build/api-reference/borrow/market-data/market-leverage-metrics | official API docs | strong for API schema | leverage metrics endpoint schema and fields |
| S7 | Kamino reserve metrics API docs | https://kamino.com/docs/build/kamino-lend-markets/get-metrics-for-market-reserves | official API docs | strong for API schema | reserve metrics endpoint schema and fields |
| S8 | Kamino reserve config reference | https://kamino.com/docs/curators/markets/reserve-parameters | official protocol docs | strong for parameter meaning | reserve LTV, liquidation threshold, caps, oracle config, emergency controls |
| S9 | OnRe tokenized reinsurance ONyc docs | https://docs.onre.finance/introduction/onre-tokenized-reinsurance-onyc | official issuer docs | strong for product description, medium for independent verification | ONyc nature, NAV-based yield, segregated account, not stablecoin |
| S10 | OnRe minting ONyc docs | https://docs.onre.finance/for-capital-providers/minting-onyc | official issuer docs | strong for issuer-stated mint mechanics | supported stablecoins, minting flow, no mint fee |
| S11 | OnRe redemptions docs | https://docs.onre.finance/for-capital-providers/redemptions | official issuer docs | strong for issuer-stated redemption mechanics | KYC redemption, queue, capacity targets, 0.25% redemption fee |
| S12 | OnRe system integrity overview | https://docs.onre.finance/security-and-verification/system-integrity-overview | official issuer docs | medium | audits, multisig, timelock in progress, custody segregation, primary underwriting risk |
| S13 | OnRe token configuration and reference | https://docs.onre.finance/technical-resources/token-configuration-and-reference | official issuer docs | strong for token address, medium for controls | ONyc mint, program, mint authority, liquidity layer, program upgrade authority |
| S14 | OnRe data streams and oracle providers | https://docs.onre.finance/technical-resources/data-streams-and-oracle-providers | official issuer docs | medium to strong | Pyth, Chainlink, NAV/market pricing roles |
| S15 | OnRe FAQ | https://docs.onre.finance/technical-resources/frequently-asked-questions | official issuer docs | medium | ONyc not stablecoin, APY target, BMA licenses, access and redemption summary |
| S16 | OnRe insurer reporting docs | https://docs.onre.finance/for-insurers/reporting | official issuer docs | medium | NAV/APY methodology, claims/reserve reporting, portfolio transparency |
| S17 | OnRe ONyc launches on Kamino | https://www.onre.finance/blog/onyc-launches-on-kamino-unlocking-real-world-yield-and-collateral-utility-in-solana-defi | official issuer announcement | medium | Kamino integration, USDG borrowing incentives, Chainlink NAV statement |
| S18 | OnRe ONyc joins Kamino Multiply | https://www.onre.finance/blog/unlocking-more-utility-onyc-joins-kamino-multiply | official issuer blog | medium | ONyc Multiply product description, risk disclosures, USDC/USDG borrow-cost risk |
| S19 | Lince ONyc Multiply tracker | https://yields.lince.finance/tracker/solana/kamino/kamino-onyc-multiply | third-party tracker | weak to medium | external ONyc Multiply route and USDC category indication |
| S20 | Kamino primary-market reserve metrics API pull | https://api.kamino.finance/kamino-market/7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF/reserves/metrics | official API data | medium; live endpoint inspected but route not found | primary market reserve list did not show ONyc mint/name in filtered inspection |
| S21 | Kamino primary-market leverage metrics API pull | https://api.kamino.finance/kamino-market/7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF/leverage/metrics | official API data | medium; live endpoint inspected but route not found | leverage/multiply metrics endpoint accessible; ONyc route not identified from reserve IDs |

## Source Treatment Notes

- S1-S8 are treated as controlling sources for generic Kamino Multiply mechanics and Kamino API schema.
- S9-S18 are treated as controlling sources for issuer-stated ONyc mechanics, controls, redemptions, and ONyc/Kamino integration.
- S19 is useful for external route discovery only. It does not substitute for Kamino official reserve/vault identifiers.
- S20 and S21 are direct official API observations from the review date. They are negative evidence for exact-object verification because the primary market endpoint did not expose an ONyc reserve by the inspected token mint/name filter.
- The debt asset is not pinned for production: Kamino docs and Lince point to ONyc/USDC, while OnRe launch incentives emphasize ONyc collateral used to borrow USDG and OnRe's Multiply risk note says USDC/USDG.
