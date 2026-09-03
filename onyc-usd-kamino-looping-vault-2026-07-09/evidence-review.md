---
title: Evidence Review - ONyc/USD Kamino Looping Vault
type: evidence-review
lifecycle: pending_review
status: active
approval_status: pending
reviewed_by:
reviewed_date:
target: selected.md
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
classification_status: unclassified
classification_confidence:
classified_at:
classification_reason:
---

# Evidence Review

## How To Review This File

1. Read each finding in `selected.md`.
2. Open the linked source IDs in the source register.
3. Check the quote anchor against the source.
4. Review the same finding IDs in the finding review table.
5. Approve, caveat, block, reject, mark duplicate, or mark no-promotion.
6. Promote only `strong` findings or carefully worded `medium` findings. Do not promote `weak` or `unsupported` findings without more evidence.
7. Promote the reviewed finding, not raw selected prose and not the whole evidence review.
8. Use writing only as synthesis from reviewed claims, concepts, decisions, source notes, or approved finding rows.
9. Keep this research log under `vault/research-logs/active/` while `approval_status` is `pending`.
10. Move the run to `vault/research-logs/archive/` only after all findings are approved, rejected, blocked, duplicate, or explicitly marked no-promotion.

## Source Register

| Source ID | Source | Link | Type | Evidence quality | Used for finding IDs |
| --- | --- | --- | --- | --- | --- |
| S1 | Kamino Multiply overview | https://kamino.com/docs/products/multiply/index | official protocol docs | strong | F3 |
| S2 | Kamino Multiply how-it-works | https://kamino.com/docs/products/multiply/how-it-works | official protocol docs | strong | F3 |
| S3 | Kamino Multiply concepts | https://kamino.com/docs/products/multiply/concepts | official protocol docs | strong for mechanics, medium for live ONyc route | F3, F4 |
| S4 | Kamino Multiply strategies | https://kamino.com/docs/products/multiply/strategies | official protocol docs | medium to strong | F3 |
| S5 | Kamino Multiply risks | https://kamino.com/docs/products/multiply/risks | official protocol docs | strong | F3, F6 |
| S6 | Kamino leverage/multiply metrics API docs | https://kamino.com/docs/build/api-reference/borrow/market-data/market-leverage-metrics | official API docs | strong for schema | F6 |
| S7 | Kamino reserve metrics API docs | https://kamino.com/docs/build/kamino-lend-markets/get-metrics-for-market-reserves | official API docs | strong for schema | F6 |
| S8 | Kamino reserve config reference | https://kamino.com/docs/curators/markets/reserve-parameters | official protocol docs | strong for parameter meanings | F6 |
| S9 | OnRe tokenized reinsurance ONyc docs | https://docs.onre.finance/introduction/onre-tokenized-reinsurance-onyc | official issuer docs | strong for issuer-stated product description | F1, F5 |
| S10 | OnRe minting ONyc docs | https://docs.onre.finance/for-capital-providers/minting-onyc | official issuer docs | strong for issuer-stated minting mechanics | F2 |
| S11 | OnRe redemptions docs | https://docs.onre.finance/for-capital-providers/redemptions | official issuer docs | strong for issuer-stated redemption mechanics | F2, F5 |
| S12 | OnRe system integrity overview | https://docs.onre.finance/security-and-verification/system-integrity-overview | official issuer docs | medium | F5, F6 |
| S13 | OnRe token configuration and reference | https://docs.onre.finance/technical-resources/token-configuration-and-reference | official issuer docs | strong for token address, medium for controls | F1, F6 |
| S14 | OnRe data streams and oracle providers | https://docs.onre.finance/technical-resources/data-streams-and-oracle-providers | official issuer docs | medium to strong | F6 |
| S15 | OnRe FAQ | https://docs.onre.finance/technical-resources/frequently-asked-questions | official issuer docs | medium | F1, F2, F5 |
| S16 | OnRe insurer reporting docs | https://docs.onre.finance/for-insurers/reporting | official issuer docs | medium | F5 |
| S17 | OnRe ONyc launches on Kamino | https://www.onre.finance/blog/onyc-launches-on-kamino-unlocking-real-world-yield-and-collateral-utility-in-solana-defi | official issuer announcement | medium | F4 |
| S18 | OnRe ONyc joins Kamino Multiply | https://www.onre.finance/blog/unlocking-more-utility-onyc-joins-kamino-multiply | official issuer blog | medium | F4, F5 |
| S19 | Lince ONyc Multiply tracker | https://yields.lince.finance/tracker/solana/kamino/kamino-onyc-multiply | third-party tracker | weak to medium | F4 |
| S20 | Kamino primary-market reserve metrics API pull | https://api.kamino.finance/kamino-market/7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF/reserves/metrics | official API data | medium negative evidence | F4, F6 |
| S21 | Kamino primary-market leverage metrics API pull | https://api.kamino.finance/kamino-market/7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF/leverage/metrics | official API data | medium negative evidence | F4, F6 |

## Finding Review

| Finding ID | Reviewed finding | Verdict | Source IDs | Quote anchor | Summary | Analysis | Allowed wording | Forbidden wording | Disposition | Promotion target |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F1 | ONyc is a Solana NAV-based, yield-bearing RWA token representing exposure to a regulated segregated reinsurance account; it is not a fixed $1 stablecoin. | strong for issuer-stated mechanics; medium for legal verification | S9, S13, S15 | "not a stablecoin"; "ONyc Token Mint" | OnRe docs state ONyc represents a proportional share of a segregated reinsurance account and provide the Solana mint. | Official issuer docs are sufficient for methodology classification, not for production legal claim validation. | ONyc is issuer-described as a NAV-based tokenized reinsurance asset, not a fixed-peg stablecoin. | ONyc is a risk-free stablecoin or externally verified legal claim. | pending | writing / decision example |
| F2 | ONyc primary minting/redemption is conditional: minting accepts stablecoins, while primary redemptions require KYC/accredited eligibility, queue processing, available USDC/USDG liquidity, and may remain pending. | strong for issuer-stated process | S10, S11, S15 | "Redemptions are available to verified"; "sufficient USDC or USDG liquidity" | OnRe docs describe supported mint assets and conditional redemption mechanics. | Supports BBB claim/venue treatment and liquidity watchlist language. | Primary redemption is eligibility-gated and liquidity-managed. | Any ONyc holder can always redeem immediately at par. | pending | writing / decision example |
| F3 | Kamino Multiply creates leveraged exposure through flash-loan-assisted looping; borrow-rate inversion, liquidation, and RWA/NAV impairment are explicit route risks. | strong | S1, S2, S3, S4, S5 | "Net APY"; "Borrow Rate > Collateral Asset Yield"; "RWA / Counterparty Risk" | Kamino docs explain Multiply mechanics, variable borrow-rate risk, liquidation mechanics, and RWA-specific risks. | Supports High Instrument Mechanics for the top looping layer. | Kamino Multiply is a leveraged route whose risk depends on leverage, borrow rates, liquidation mechanics, and collateral performance. | Kamino Multiply is equivalent to unlevered ONyc holding. | pending | writing / decision example |
| F4 | Official sources confirm ONyc is integrated with Kamino and can be used for borrowing/looping, but sources conflict or remain incomplete on exact stable debt asset and live reserve/vault ID. | medium | S3, S17, S18, S19, S20, S21 | "ONyc/USDC"; "borrow USDG"; "USDC/USDG" | Kamino docs and Lince point to USDC, while OnRe launch materials emphasize USDG borrowing incentives; official API inspection did not locate an ONyc reserve by inspected mint/name. | This is enough for source-backed route-pattern scoring but not exact-vault production rating. | The ONyc/Kamino route is evidenced, but exact debt asset and reserve/vault IDs remain unresolved in this run. | The exact live ONyc/USDC vault and all reserve addresses were verified. | pending | gap register / writing |
| F5 | ONyc's principal substance risk is underwriting/NAV impairment from real-world insurance claims, reserving, collateral yield, and liquidity management; this risk is not assessable from on-chain data alone. | medium | S9, S11, S12, S15, S16, S18 | "primary risk is underwriting risk"; "NAV may decline"; "catastrophic claims" | OnRe and Kamino/OnRe risk materials disclose underwriting/NAV drawdown and redemption-liquidity risks. | Supports High substance factor at the source layer because current portfolio and stress evidence were not independently inspected. | ONyc source risk includes underwriting, claims, reserve, NAV, and redemption-liquidity exposure. | ONyc underwriting risk is proven low or fully diversified. | pending | writing / decision example |
| F6 | OnRe and Kamino controls are documented but incomplete for production: OnRe reports audits, multisig, segregated custody, Pyth/Chainlink roles, and timelock work; Kamino documents risk controls and APIs, but exact ONyc reserve config was not verified. | medium | S5, S6, S7, S8, S12, S13, S14, S20, S21 | "Timelock: In progress"; "Pyth"; "Chainlink"; "Reserve Config" | Control and oracle frameworks are documented, but full supporting evidence was not extracted and exact route config remains missing. | Supports BBB shared-dependency floors and no production approval. | Controls and oracle routes are documented but incomplete for production rating. | Controls, oracles, reserve config, and audits are fully verified. | pending | writing / decision example |

## Approved For Promotion

- None yet. User review pending.

## Blocked / Needs Work

- Production exact-vault rating is blocked by exact route, reserve/vault ID, debt asset, leverage, oracle, liquidity, legal, audit, and attestation gaps.

## Gaps

- Verify exact Kamino ONyc reserve/vault/market public keys and whether the route is ONyc/USDC, ONyc/USDG, or both.
- Verify target leverage, liquidation LTV, current LTV, max LTV, reserve config, liquidation penalty, borrow caps, and utilization for the exact route.
- Inspect OnRe audit PDFs, monthly Apex attestations, credit report, BMA register entry, legal participation agreement, and exact redemption terms.
- Inspect current ONyc transparency dashboard values from a working data endpoint; the fetched dashboard shell returned placeholder zeroes.
- Inspect exact Chainlink/Pyth feed accounts used by Kamino for ONyc collateral valuation and liquidation.
- Quantify secondary market liquidity, slippage, and liquidation exit capacity for ONyc.
