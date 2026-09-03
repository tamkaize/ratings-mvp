---
title: Selected Output - ONyc/USD Kamino Looping Vault
type: selected-output
status: active
lifecycle: active
run_id: onyc-usd-kamino-looping-vault-2026-07-09
created: 2026-07-09
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
classification_status: unclassified
classification_confidence:
classified_at:
classification_reason:
---

# Selected Output

## Bottom Line

ONyc/Kamino Multiply is suitable for a source-backed methodology example, but not for a production exact-vault rating from this run. The ONyc token mint is identified from OnRe docs, and Kamino plus OnRe official sources support a leveraged ONyc stable-debt route. The exact live Kamino reserve/vault ID, exact debt asset for the user's intended route, and target leverage/LTV were not verified. The methodology example should therefore use an indicative route-pattern output: `1.325 B / source-backed watchlist`, with production exact-vault rating blocked until those identifiers are inspected.

## Finding Register

| Finding ID | Finding | Why it matters | Source IDs | Candidate artifact | Notes |
| --- | --- | --- | --- | --- | --- |
| F1 | ONyc is a Solana NAV-based, yield-bearing RWA token representing exposure to a regulated segregated reinsurance account; it is not a fixed $1 stablecoin. | Prevents the example from treating ONyc as ordinary stablecoin collateral. | S9, S13, S15 | writing / decision example | Strong issuer documentation, but legal terms and independent attestations were not fully extracted. |
| F2 | ONyc primary minting/redemption is conditional: minting accepts stablecoins, while primary redemptions require KYC/accredited eligibility, queue processing, available USDC/USDG liquidity, and may remain pending. | Supports Medium/BBB claim and venue treatment for the ONyc token layer. | S10, S11, S15 | writing / decision example | Secondary liquidity exists but was not quantified in this run. |
| F3 | Kamino Multiply creates leveraged exposure through flash-loan-assisted looping; borrow-rate inversion, liquidation, and RWA/NAV impairment are explicit route risks. | Supports a high Instrument Mechanics score for the top looping layer. | S1, S2, S3, S4, S5 | writing / decision example | Exact target leverage and liquidation buffer are position-specific and were not provided. |
| F4 | Official sources confirm ONyc is integrated with Kamino and can be used for borrowing/looping, but sources conflict or remain incomplete on exact stable debt asset and live reserve/vault ID. | Limits the example to source-backed watchlist and blocks production exact-vault rating. | S3, S17, S18, S19, S20, S21 | writing / gap register | Kamino docs mention ONyc/USDC; OnRe launch incentives emphasize USDG borrowing; API inspection did not identify ONyc in the primary market reserve list. |
| F5 | ONyc's principal substance risk is underwriting/NAV impairment from real-world insurance claims, reserving, collateral yield, and liquidity management; this risk is not assessable from on-chain data alone. | Supports a High substance factor for the ONyc source layer and a non-binding hard-cap rationale only if carried into propagation. | S9, S11, S12, S15, S16, S18 | writing / decision example | Current portfolio, attestation, credit report, and legal documents were not extracted in full. |
| F6 | OnRe and Kamino controls are documented but incomplete for production: OnRe reports audits, multisig, segregated custody, Pyth/Chainlink roles, and timelock work; Kamino documents risk controls and APIs, but exact ONyc reserve config was not verified. | Supports BBB shared-dependency floors and Medium evidence confidence, not A-grade output or production approval. | S5, S6, S7, S8, S12, S13, S14, S20, S21 | writing / decision example | Full audit PDFs, attestation documents, exact oracle accounts, and reserve config remain gaps. |

## Synthesis

The ONyc/Kamino route is materially different from a simple stablecoin loop. ONyc is a NAV-based RWA token backed by a regulated segregated reinsurance account and explicitly not a stablecoin (F1; S9, S15). Primary redemption is eligibility-gated and liquidity-managed, with queue and available-liquidity limits (F2; S11). That makes ONyc suitable as a tokenized RWA/source layer rather than a fiat stablecoin layer.

Kamino Multiply is a leveraged-yield route, not just an asset holding. Kamino's docs describe a flash-loan-assisted loop that deposits collateral, borrows against it, and leaves the user with leveraged collateral and debt; Kamino also states that negative carry can occur when borrow rates exceed collateral yield and that liquidation mechanics apply (F3; S1-S5). For ONyc, OnRe separately names NAV drawdown from catastrophic claims, borrow-cost risk, underlying RWA risk, and smart-contract risk (F5; S18).

The exact live route is not fully pinned. Kamino's official concepts page names ONyc/USDC, the Lince tracker labels ONyc Multiply under USDC, while OnRe's launch article emphasizes ONyc collateral used to borrow USDG and OnRe's Multiply risk note refers to USDC/USDG borrow costs (F4; S3, S17-S19). A direct review of Kamino's documented primary-market API endpoints found the leverage and reserve metrics endpoints accessible, but did not identify an ONyc reserve by the ONyc mint `5Y8NV33Vv7WbnLfq3zBcKSdYPrk7g2KoiQoe7M2tcxp5` or token name in the inspected primary market results (S20, S21). This does not disprove that the product exists; it blocks a production exact-vault rating from this run.

The methodology example should therefore be framed as an indicative route-pattern worked example, not as an approved live position score. The suggested output is `1.325 B / source-backed watchlist`, with no production approval and explicit no-rate gaps for exact Kamino reserve/vault ID, exact debt asset, target leverage/LTV, live reserve config, active oracle accounts, secondary liquidity, current ONyc portfolio/attestations, and full audit/legal review.

## Source Register

See `sources.md`.

## Open Gaps

- Verify exact Kamino ONyc reserve/vault/market public keys and whether the route is ONyc/USDC, ONyc/USDG, or both.
- Verify target leverage, liquidation LTV, current LTV, max LTV, reserve config, liquidation penalty, borrow caps, and utilization for the exact route.
- Inspect OnRe audit PDFs, monthly Apex attestations, credit report, BMA register entry, legal participation agreement, and exact redemption terms.
- Inspect current ONyc transparency dashboard values from a working data endpoint; the fetched dashboard shell returned placeholder zeroes.
- Inspect exact Chainlink/Pyth feed accounts used by Kamino for ONyc collateral valuation and liquidation.
- Quantify secondary market liquidity, slippage, and liquidation exit capacity for ONyc.
