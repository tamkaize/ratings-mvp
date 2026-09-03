---
title: Gaps - PT-sUSDai Layer Scored Pilot
type: gaps
status: active
lifecycle: active
run_id: pt-susdai-layer-scored-pilot-2026-07-07
created: 2026-07-07
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
tags: [pendle, pt, susdai, usdai, pyusd, token-risk]
---

# Gaps

## Blocking For Production Approval

- Reconcile USDai supply against locked PYUSD using contract-level or proof-of-reserves data rather than relying only on current USD.AI narrative sources.
- Inspect the latest individual PYUSD reserve report and attestation PDF from Paxos, not just the transparency index page.
- Inspect USD.AI audit PDFs for scope, critical findings, unresolved issues, and whether the exact USDai/sUSDai/Pendle-related contracts were covered.
- Verify USD.AI role assignments, multisig signers, signer thresholds, timelocks, pause/upgrade powers, bridge admin powers, and any emergency controls on-chain.
- Inspect current sUSDai loan/NAV evidence: active loan book, borrower concentration, collateral values, maturities, insurance, DSRA, default process, valuation policy, and current idle T-bill allocation.
- Verify whether any actual current sUSDai loan positions have external credit ratings or credit estimates, and map those ratings to the sUSDai holder claim and NAV treatment rather than using generic AI-infrastructure financing examples.
- Inspect current secondary-market depth, slippage, and exit cost for the selected PT route at relevant position sizes.

## Non-Blocking But Important

- Confirm whether the selected Pendle market uses the latest factory version and whether any SY proxy admin or pause-controller assumptions apply to this exact SY.
- Reconcile older M0/T-bill descriptions with the current PYUSD-backed documentation in a source note.
- Determine whether the score should use "Medium risk / source-backed watchlist" or a more formal pre-production label.
- Define a committee rule for when a single High substance component inside a lower-layer RWA/source route should hard-cap the parent at High despite a weighted score below 0.75.

## Recommended Follow-Up Runs

1. USD.AI on-chain controls and role audit for USDai/sUSDai on Arbitrum.
2. USDai/PYUSD backing reconciliation and latest attestation review.
3. sUSDai loan book, NAV, and redemption queue evidence review.
4. Pendle market liquidity/slippage stress test for PT-sUSDai-15OCT2026.
