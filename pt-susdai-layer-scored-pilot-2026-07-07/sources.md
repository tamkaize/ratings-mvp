---
title: Sources - PT-sUSDai Layer Scored Pilot
type: source-register
status: active
lifecycle: active
run_id: pt-susdai-layer-scored-pilot-2026-07-07
created: 2026-07-07
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
tags: [pendle, pt, susdai, usdai, pyusd, token-risk]
---

# Source Register

Initial review date: 2026-07-07

Follow-up review date: 2026-07-08, for the claim that AI-infrastructure collateralized loan interest is AA-rated.

## Sources

| Source ID | Source | Link | Type | Evidence quality | Used for |
| --- | --- | --- | --- | --- | --- |
| S1 | Pendle PT documentation | https://docs.pendle.finance/pendle-v2/ProtocolMechanics/YieldTokenization/PT | official protocol docs | strong | PT payoff, maturity redemption, accounting asset |
| S2 | Pendle V2 high-level architecture | https://docs.pendle.finance/pendle-v2-dev/HighLevelArchitecture | official protocol docs | strong | PT/SY/YT mechanics, router permissions, market immutability |
| S3 | Pendle Market smart contract docs | https://docs.pendle.finance/pendle-v2-dev/Contracts/PendleMarket | official developer docs | strong | market tokens, expiry, post-expiry behavior |
| S4 | Arbitrum RPC `eth_call` on market `0xcbf629c8d396b1261f81f55175afa010e94787d8` | recorded in `audit-log.md` | direct on-chain read | strong | exact market, PT/SY/YT addresses, expiry, non-expired state |
| S5 | Arbiscan transaction showing PT-sUSDai market route | https://arbiscan.io/tx/0xfde891afc96bf7617a3deba2198b7bf7ebd0998e209c75db791362f53df428e2 | block explorer | medium to strong | route sanity check, PT/SY/sUSDai labels |
| S6 | DeFiLlama yield pools and charts | https://yields.llama.fi/pools | market data API | medium | live TVL and APY for Pendle sUSDai routes |
| S7 | USD.AI USDai depositor docs | https://docs.usd.ai/depositor/usdai | official protocol docs | strong for mechanics, medium for full backing verification | USDai backing, mint/redeem restrictions |
| S8 | USD.AI mint/redeem upgrade, March 26, 2026 | https://usd.ai/insights/usdai-mint-redeem-upgrade | official protocol announcement | strong | whitelisted direct mint/redeem, PYUSD backing statement |
| S9 | USD.AI sUSDai depositor docs | https://docs.usd.ai/depositor/susdai | official protocol docs | strong for mechanics, medium for portfolio quality | sUSDai redemption, GPU loans, T-bill floor |
| S10 | USD.AI technical protocol overview | https://docs.usd.ai/technical-overview/technical-protocol-overview | official developer docs | medium | role, queue, oracle, position manager mechanics |
| S11 | USD.AI contract addresses | https://docs.usd.ai/technical-overview/contract-addresses | official developer docs | strong | USDai and sUSDai Arbitrum addresses |
| S12 | USD.AI audits page | https://docs.usd.ai/technical-overview/audits | official audit register | medium | audit existence and bug bounty |
| S13 | USD.AI Pendle FAQ | https://docs.usd.ai/depositor/faq/pendle-yield-yt-locks | official protocol FAQ | medium | Pendle/YT/yield interpretation |
| S14 | USD.AI PYUSD integration announcement | https://usd.ai/insights/pyusd-paypal-usdai-integration | official protocol announcement | medium | PYUSD partnership and incentive context |
| S15 | Paxos PYUSD page | https://www.paxos.com/pyusd | issuer page | strong for reserve framework | PYUSD issuer, reserve, redemption framework |
| S16 | Paxos PYUSD transparency page | https://www.paxos.com/pyusd-transparency | issuer transparency page | strong for report existence, medium until PDFs inspected | monthly reports and attestations |
| S17 | PayPal PYUSD page | https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd | issuer/distribution page | medium to strong | PYUSD retail buy/sell and backing statements |
| S18 | PayPal PYUSD on Arbitrum whitepaper | https://www.paypalobjects.com/ppdevdocs/ArbitrumWhitepaper.pdf | issuer ecosystem paper | medium to strong | Arbitrum route, eligibility, L2 and restriction risks |
| S19 | Paxos PYUSD developer docs | https://docs.paxos.com/guides/stablecoin/pyusd | issuer developer docs | strong for product description | PYUSD issuance and reserve framework |
| S20 | USD.AI May 2026 recap | https://usd.ai/insights/usdai-may-2026-recap | official protocol update | medium | Pendle PT yield and loan-market context |
| S21 | Aave governance ARFC for USDai/sUSDai | https://governance.aave.com/t/arfc-onboard-usdai-susdai-to-aave-v3-arbitrum-instance/23260 | third-party risk/forum analysis | contextual, historical | conflicting older M0/T-bill framing; not primary for current PYUSD backing |
| S22 | CoreWeave DDTL 4.0 financing release, March 31, 2026 | https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-Landmark-8-5-Billion-Financing-Facility-Achieving-First-Investment-Grade-Rated-GPU-backed-Financing/default.aspx | issuer release | medium | investment-grade GPU/HPC financing example; not sUSDai portfolio evidence |
| S23 | CoreWeave DDTL 5.0 financing release, May 18, 2026 | https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-3-1-Billion-Loan-Facility-Expanding-Access-to-Public-Markets-for-GPU-Backed-Financing/default.aspx | issuer release | medium | below-investment-grade GPU/HPC financing counterexample |
| S24 | Staking Rewards public sUSDai risk report | https://github.com/stakingrewards/defi-risk-rating/blob/master/ratings/USDai-sUSDai.md | third-party public risk report | medium | external protocol-level risk view; current public grade is not AA |
| S25 | BIS Bulletin 120, Financing the AI boom: from cash flows to debt | https://www.bis.org/publ/bisbull120.pdf | official / central-bank research | medium to strong | AI private-credit sector context and systemic-risk caution |
| S26 | Moody's: Understanding credit ratings | https://www.moodys.com/web/en/us/solutions/ratings/understanding-ratings.html | rating-agency definition page | strong for scale definitions | distinguishes Aa from A ratings |

## Source Treatment Notes

- Current USD.AI primary sources S7 and S8 are treated as the controlling sources for USDai backing and mint/redeem mechanics as of this review date.
- S21 is useful for historical risk context, but it predates or conflicts with the PYUSD transition described in S8 and is not used as controlling evidence for current USDai backing.
- S16 confirms the existence of PYUSD monthly attestations, but this run did not inspect the individual latest attestation PDF. That keeps the PYUSD evidence result at Medium for completeness even though the source quality is high.
- S12 lists audit reports and a bug bounty, but this run did not inspect the PDFs line-by-line. Audit existence improves venue confidence but does not produce a Low-risk venue score by itself.
- S22 verifies that at least one GPU/HPC infrastructure financing reached investment grade, but it was A3 / A(low), not AA/Aa, and it is not evidence that the current sUSDai loan book is AA-rated.
- S23 shows a later CoreWeave HPC-backed facility rated Ba2 / BB+, which supports treating AI-infrastructure loan ratings as transaction-specific rather than automatic.
- S24 is not a rating-agency credit rating, but it is useful contradictory risk evidence because it assigns `USD.ai - sUSDai` a public DeFi risk grade of CCC-.
- S25 supports sector caution: AI-related private-credit lending has grown rapidly, and loan pricing may not fully distinguish AI-related credit risk from broader private-credit risk.
