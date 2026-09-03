---
title: Gaps - ONyc/USD Kamino Looping Vault
type: gap-register
status: active
lifecycle: active
run_id: onyc-usd-kamino-looping-vault-2026-07-09
created: 2026-07-09
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
tags: [onyc, onre, kamino, multiply, rwa, token-risk]
---

# Gaps

## Production-Blocking Gaps

- Exact Kamino ONyc reserve/vault/market public keys were not verified.
- Exact debt asset for the intended "ONyc/USD" route remains unresolved: sources refer to ONyc/USDC, USDG borrowing incentives, and USDC/USDG borrow costs.
- User-specific target leverage, current LTV, liquidation LTV, liquidation buffer, and borrow-rate assumptions were not provided.
- Live reserve config was not downloaded from chain or Kamino manager tooling.
- Exact Chainlink/Pyth feed accounts used by Kamino for ONyc valuation and liquidation were not verified.
- Current ONyc portfolio, claims exposure, active-deal concentration, attestation reports, and credit report were not extracted.
- OnRe legal documents, participation agreement, BMA register evidence, audit PDFs, and monthly proof-of-reserves attestations were not inspected.
- Secondary market liquidity, slippage, liquidator exit capacity, and liquidation market depth for ONyc were not quantified.

## Non-Blocking For Methodology Example

- Official sources are sufficient to create an indicative route-pattern worked example.
- The worked example should clearly state that it is not a production exact-vault rating.
- The final output should preserve watchlist language and no-rate gaps.
