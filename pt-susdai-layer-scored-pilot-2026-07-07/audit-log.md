---
title: Audit Log - PT-sUSDai Layer Scored Pilot
type: audit-log
status: active
lifecycle: active
run_id: pt-susdai-layer-scored-pilot-2026-07-07
created: 2026-07-07
projects: [credit-risk-risk-rating]
workstreams: [token-classification-ecl-workstream]
tags: [pendle, pt, susdai, usdai, pyusd, token-risk]
---

# Audit Log

Review date: 2026-07-07

Follow-up review date: 2026-07-08

## Research Question

Run online research for each material `PT-sUSDai` layer, score from scratch under the 0 / 0.5 / 1 scorecard, and replace the old illustrative pilot with the revised source-backed result.

## Query And Inspection Trail

1. Searched for exact Pendle `PT-sUSDai` markets, maturities, contract labels, and live market data.
2. Excluded false positives including old/matured `18JUN2026` routes and unrelated `sUSDE` routes.
3. Selected the live Arbitrum `PT-sUSDai-15OCT2026` route because direct on-chain reads and market data reconcile.
4. Inspected Pendle docs for PT, SY, YT, market, expiry, and redemption mechanics.
5. Queried Arbitrum RPC directly for `readTokens()`, `isExpired()`, `expiry()`, and ERC-20 metadata.
6. Queried DeFiLlama pools and charts for current Pendle sUSDai LP and PT-buying routes.
7. Inspected USD.AI official pages for USDai, sUSDai, mint/redeem restrictions, technical mechanics, contract addresses, audits, Pendle FAQ, and protocol updates.
8. Inspected Paxos and PayPal PYUSD pages for issuer, reserve, redemption, transparency, and Arbitrum/L2 context.
9. Noted historical M0/T-bill framing in third-party Aave forum material but did not use it as controlling evidence for current USDai backing because newer USD.AI primary sources state PYUSD backing.
10. Follow-up on 2026-07-08 tested whether AI-infrastructure collateralized loans backing sUSDai are AA/Aa-rated and whether L5 should change.

## Direct On-Chain Check

RPC endpoint used: `https://arb1.arbitrum.io/rpc`

Market checked: `0xcbf629c8d396b1261f81f55175afa010e94787d8`

Selectors:

```text
readTokens() = 0x2c8ce6bc
isExpired() = 0x2f13b60c
expiry() = 0xe184c9be
name() = 0x06fdde03
symbol() = 0x95d89b41
decimals() = 0x313ce567
```

Result:

```json
{
  "checkedAtUtc": "2026-07-07T15:47:05.331Z",
  "chain": "Arbitrum One",
  "market": "0xcbf629c8d396b1261f81f55175afa010e94787d8",
  "marketReadTokens": {
    "SY": "0x30ccf4bbee313fcd19f3e295b3ba2920a24e2f62",
    "PT": "0xb459db106f645d698e74027eef6019a26a0675cc",
    "YT": "0x11456849c38ea4af212ab8d4324b39983716516a"
  },
  "marketIsExpired": false,
  "marketExpiryUnix": 1792022400,
  "marketExpiryUtc": "2026-10-15T00:00:00.000Z",
  "erc20": {
    "market": {
      "name": "PLP Staked USDai 15OCT2026",
      "symbol": "PLP-sUSDai-15OCT2026",
      "decimals": "18"
    },
    "pt": {
      "name": "PT Staked USDai 15OCT2026",
      "symbol": "PT-sUSDai-15OCT2026",
      "decimals": "18"
    },
    "sy": {
      "name": "SY Staked USDai",
      "symbol": "SY-sUSDai",
      "decimals": "18"
    },
    "yt": {
      "name": "YT Staked USDai 15OCT2026",
      "symbol": "YT-sUSDai-15OCT2026",
      "decimals": "18"
    },
    "susdai": {
      "name": "Staked USDai",
      "symbol": "sUSDai",
      "decimals": "18"
    },
    "usdai": {
      "name": "USDai",
      "symbol": "USDai",
      "decimals": "18"
    }
  }
}
```

## Live DeFiLlama Market Check

Endpoint: `https://yields.llama.fi/pools`

Filtered for `project = pendle`, `chain = Arbitrum`, and `SUSDAI`.

Current rows:

| Pool meta | Pool ID | TVL USD | APY | APY base | APY reward | Underlying tokens |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| For LP, Maturity 15OCT2026 | `55d53cce-4455-4085-8245-557257d9fe61` | 14,409,665 | 8.83702 | 8.57540 | 0.26162 | `0xb459...75cc`, `0x30cc...f62` |
| For buying PT-sUSDai-15OCT2026 | `894ef05d-8143-4fa2-9a1c-bebc14686337` | 14,409,665 | 9.76902 | 9.76902 | null | `0x0b2b...5ef9` |
| For LP, Maturity 25FEB2027 | `0ab4e683-9d5b-43d3-aeb8-98dd1da1a694` | 2,012,834 | 11.64798 | 9.95773 | 1.69025 | `0xe9d0...2fce`, `0x30cc...f62` |
| For buying PT-sUSDai-25FEB2027 | `b44dc004-56b7-48d0-97b6-da33ead5e6eb` | 2,012,834 | 9.67516 | 9.67516 | null | `0x0b2b...5ef9` |

Latest chart point for the selected 15OCT2026 LP route:

```json
{
  "timestamp": "2026-07-07T15:03:12.074Z",
  "tvlUsd": 14409665,
  "apy": 8.83702,
  "apyBase": 8.5754,
  "apyReward": 0.26162
}
```

Latest chart point for the selected 15OCT2026 PT-buying route:

```json
{
  "timestamp": "2026-07-07T15:03:12.074Z",
  "tvlUsd": 14409665,
  "apy": 9.76902,
  "apyBase": 9.76902,
  "apyReward": null
}
```

## Key Evidence Observations

### Pendle / PT

- Pendle docs define PT as the principal portion of a yield-bearing asset and describe redemption at maturity to the accounting asset.
- Pendle architecture docs separate SY, PT, and YT, and explain that after maturity only PT is required for redemption.
- Direct Arbitrum RPC confirms the selected market is `PLP-sUSDai-15OCT2026`, the PT is `PT-sUSDai-15OCT2026`, and the market is not expired.

### USD.AI / USDai

- Current USD.AI USDai docs state that USDai is currently 100% backed by PayPal's PYUSD stablecoin and that minting is programmatically restricted.
- The March 26, 2026 USD.AI mint/redeem upgrade states that from April 6, direct mint/redeem is restricted to KYC'd market makers and approved institutional depositors.
- The same upgrade says non-whitelisted participants retain permissionless hold, transfer, stake/unstake, and secondary-market access.

### USD.AI / sUSDai

- Current USD.AI sUSDai docs state that sUSDai is not a stablecoin and is not instantly redeemable at par.
- Docs describe sUSDai as exposed to underlying assets including illiquid GPU-collateralized loans.
- Redemptions are described as global 30-day epoch / FIFO / cash-constrained mechanics.
- Idle capital is described as allocated to short-term U.S. Treasury Bills.

### PYUSD

- Paxos and PayPal materials describe PYUSD as backed by cash, U.S. Treasuries, and cash equivalents.
- Paxos has a PYUSD transparency page with monthly reserve reports and attestations.
- The latest individual reserve attestation PDF was not extracted in this run.
- PayPal's Arbitrum whitepaper adds useful L2 and eligibility context.

### Conflicting Or Historical Evidence

- Older third-party or historical material, including an Aave governance ARFC, describes USDai in M0/T-bill terms.
- This is treated as context, not current controlling evidence, because USD.AI's newer March 26, 2026 upgrade and current USDai docs state PYUSD backing.
- The historical conflict is still a residual evidence gap: a production rating should reconcile contract-level backing, supply, and custody directly.

## Scoring Decisions

The revised pilot deliberately separates economic score from evidence confidence.

- Strong evidence removes the old Low-confidence cap.
- It does not make conditional redemption, queueing, off-chain credit, whitelisted mint/redeem, or admin controls Low risk.
- No inspected source currently proves an unbounded control failure, insolvent backing, missing redemption path, or broken market route, so the old High shared cap is not supported.
- No inspected source proves enough for production Low-risk treatment because loan-level, NAV, role, audit, and backing reconciliation gaps remain.

## Follow-Up: AA-Rated AI-Infrastructure Loan Claim

Follow-up question on 2026-07-08:

```text
If interest payments from AI-infrastructure collateralized loans are highly rated at AA/Aa, should L5 sUSDai yield/NAV source change?
```

Inspection result:

- No source verified that the actual current sUSDai loan book is AA/Aa-rated.
- CoreWeave's DDTL 4.0 facility was rated A3 by Moody's and A(low) by DBRS. This is investment grade, but not AA/Aa.
- CoreWeave's later DDTL 5.0 facility was rated Ba2 by Moody's and BB+ by Fitch, showing that HPC/GPU-backed credit outcomes are deal-specific.
- The public Staking Rewards sUSDai report assigned `USD.ai - sUSDai` a CCC- DeFi risk grade. This is not a bond rating, but it is relevant contradictory risk evidence.
- BIS Bulletin 120 cautions that AI private-credit lending has grown rapidly and that spreads may imply lenders are treating AI-related loans similarly to average private-credit risk.
- USD.AI's technical docs still say lending pool debt positions are not guaranteed, loans may default, and redemption/NAV depend on queue servicing and conservative/optimistic valuation.

Scoring decision:

```text
No change to L5.
Current L5 remains:
  Instrument 0.5, Claim 0.5, Substance 1, Venue 0.5
  Economic score = 0.675 Medium, near High
```

Potential future change:

```text
If loan-book-specific evidence verifies mostly AA/Aa external ratings, senior perfected claims,
low concentration, audited NAV, current portfolio composition, and clear sUSDai holder pass-through:
  Substance / yield could move from 1 to 0.5.
  L5 would become 0.500 Medium.
```

## Files Updated

- `vault/research-logs/active/pt-susdai-layer-scored-pilot-2026-07-07/selected.md`
- `vault/research-logs/active/pt-susdai-layer-scored-pilot-2026-07-07/sources.md`
- `vault/research-logs/active/pt-susdai-layer-scored-pilot-2026-07-07/evidence-review.md`
- `vault/research-logs/active/pt-susdai-layer-scored-pilot-2026-07-07/gaps.md`
- `vault/writing/token-risk-rating-methodology-v0-5-recursive-layer-scorecard-framework-2026-07-07.md`
