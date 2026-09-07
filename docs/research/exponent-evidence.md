# Exponent PT-ONyc and PT-srONyc evidence packet

Research completed before MVP implementation. Assessment date: **8 September 2026, Singapore**. Sources checked by **7 September 2026, 19:11:43 UTC**. Machine-readable observations, addresses, source URLs and unresolved items are in [exponent-evidence.json](../../data/research/exponent-evidence.json).

**Decision: NO_RATE.** The public APIs resolve four exact candidate series and the senior/junior market. They establish publisher-reported identities and state, rather than independent verification of finalized onchain accounts. A defensible score still requires the selected position mandate, deployment matching, executable settlement/exit checks, underlying ONyc evidence and approved tranche calibration.

## Exact candidate series

The user has not selected a maturity. The near-term candidates differ by 19 seconds; the January candidates differ by two hours. Preserve the complete timestamp rather than grouping solely by the date. The API reports all four as active at observation time. September API names use `10SEPT26`, while the interface uses `10SEP26`.

| Candidate | Maturity, UTC | Principal token mint | Yield stripping vault |
| --- | --- | --- | --- |
| PT-ONyc, September | 2026-09-10 09:58:19 | `2W5zZccVq8AMdrg7P4b3NvBKJyzbdnytRy2CKEDHvhiJ` | `66R3TcKjaUqxQwYV31BS4nD2s7YH4V7ENuvdwYbQMXCm` |
| PT-srONyc, September | 2026-09-10 09:58:00 | `BKP9Rt3pwh96cCoCp3bkh1zxXZpZez17xA6w64LuMJQy` | `FLWUHWccnouW4EkB4dgczX9ZkSTA4FTnADiKSCkJvLp5` |
| PT-ONyc, January | 2027-01-10 13:00:00 | `HH7FiYbEfDwQoK2ZJpkMz1T6wG6TqPsWcxWCtEVgigrZ` | `7f1PgxY3kGsPqLAKpwcduZkcBEhpjMz7U1iJ4pcCCzDy` |
| PT-srONyc, January | 2027-01-10 11:00:00 | `HSbdobdvfGAfqKWSWZ7s2XfFx1P1FJutTa96MHJtkm5` | `y5UFEeB3LfUErLBjDMdZynAoqCwBgsMnDZSzth68aaH` |

Identities were cross-checked across the publisher's [markets](https://app.exponent.finance/api/markets), [vaults](https://app.exponent.finance/api/vaults), and [active CLMM pools](https://app.exponent.finance/api/clmm/pools?is_active=true&is_expired=false) responses. Those responses are related publisher systems, not independent sources. The JSON preserves YT mints, SY mints, orderbooks, CLMM accounts, exchange-rate observations and source-response hashes.

The ONyc series use `wONyc` SY mint `G1qbuP11CdquJCzuDjruWqatQAHroajmxhLfeQVgHosF`; the srONyc series use `wsrONyc` SY mint `AojEeHMjnRciTXQpvoURGGfqCxDUknpRCS4w5QknGkj9`. Both have a **USD accounting denomination with nine decimals** in API quote/base metadata. That metadata is not evidence of a USDC payout. The underlyings are respectively ONyc and srONyc; actual redemption output and impaired conversion remain to be simulated. [Markets API](https://app.exponent.finance/api/markets)

## The senior protection dependency

The publisher API reports ONyc tranching market `HM8iLNE2WEN6J1AuwSSCoM37wgeLQFwYZ4ymYLqAoapN`, senior mint `9J8VvigcjFTkN3jhZH2ieTi2hdGVBVpEXbcA1JDo7QpA`, and junior mint `71j6BZaUPaSG1f1Y3e12KvU66d23kHgzWXhMDHn23wyB`. Its underlying mint is ONyc `5Y8NV33Vv7WbnLfq3zBcKSdYPrk7g2KoiQoe7M2tcxp5`. [Tranching API](https://app.exponent.finance/api/tranching-markets)

| Publisher snapshot field | Observed value | Interpretation |
| --- | --- | --- |
| Senior effective NAV | $4,968,754.37 | Senior claim value reported by the API |
| Junior effective NAV | $2,025,914.14 | First-loss capital, not additional collateral to add twice |
| Total effective NAV | $6,994,668.52 | Sum of senior and junior effective NAV |
| Coverage | 28.96369053% | Junior effective NAV / total effective NAV; arithmetic reconciles |
| Minimum coverage | 20% | Reported configuration; not a permanent guarantee |
| Utilization | 69.05197381% | Minimum coverage / observed coverage |
| Target utilization | 90% | Reported target parameter |
| Settlement utilization | 110% | Raw configuration decoded on the documented scale |
| Derived coverage threshold | 18.1818% | 20% / 1.10; derived, not a separate live reading |
| Fixed term duration | 604,800 seconds | Seven-day parameter; executable recovery semantics need verification |
| Last sync | 2026-09-07 19:01:55 UTC | API `lastSyncTs`, distinct from research retrieval time |
| Last updated slot | 445139832 | API account-state marker |

Source: [Tranching API](https://app.exponent.finance/api/tranching-markets). This snapshot has no automatic refresh. API market state `1`, flags `0`, and recovery end `0` are preserved as raw fields; an enum/deployment check is required before claiming the market is currently withdrawable.

The active NAV interface is reported as **Scope**, with price-chain entry `108`, oracle account `3t4JZcueEzTbVP6kLxXrL3VpWx45jDer4eqysweBchNH`, and a 3,600-second maximum-age setting. A separate initial-interface field says Pyth; it should not replace the active Scope dependency in the graph. Admin and sentinel both resolve to `7me39wqdi9Chh7WeZEmf16v7GASNa88EXj3KZeVK6JHq`; the signer threshold and underlying authority structure remain unverified. [Tranching API](https://app.exponent.finance/api/tranching-markets)

## Mechanics and failure paths

Matching PT and YT may merge before maturity. At maturity, PT becomes redeemable and YT ceases accrual. Generic documentation includes accounting examples, so its 1:1 shorthand cannot independently establish these markets' cash output. [Yield stripping](https://docs.exponent.finance/user-documentation/yield-stripping-swap)

Senior and junior LP tokens represent their respective tranche NAVs. Junior absorbs losses before senior; senior losses remain possible after the buffer is depleted. Withdrawals depend on market conditions and protection requirements. [Tranching markets](https://docs.exponent.finance/user-documentation/tranching-markets)

NAV effects are recognized on sync. During recovery, senior withdrawals and yield pause; more severe losses can force settlement. PT maturity and successful senior withdrawal must therefore be separate route steps. [Risk-tranching](https://docs.exponent.finance/user-documentation/risk-tranching)

A useful **illustrative** static waterfall assumes a total pool NAV loss fraction `d`, initial junior share `c`, fixed pre-loss claims, and no fees, flows, recovery or accounting lags. Under those assumptions, senior claim loss fraction is `max(d − c, 0) / (1 − c)`, and junior claim loss fraction is `min(d / c, 1)`. This is analyst-derived arithmetic, not deployed-code simulation or a score transformation. The denominator must stay visible: percentage points of total pool loss are different from the loss percentage of senior capital.

Early exit depends on market counterparties; fees vary by market, venue and remaining maturity. [Risks and fees](https://docs.exponent.finance/user-documentation/protocol-risks-fees) The JSON retains observed pool liquidity and rates as **non-executable publisher snapshots**. No $10,000/$100,000 depth or realized return claim is supported. Do not render these observations as a live rate feed.

## Controls and audit evidence

The documented core program is `ExponentnaRg3CQbW6dqQNZKXp7gtZ9DGMp1cwC4HAS7`; tranching is `XPTrnchoawiUc9iYJrpfchS8vgr8Y5X2QGBdHPXukty`; generic wrapping is `XP1BRLn8eCYSygrd8er5P4GKdzqKbC3DLoSsS5UYVZy`. Documentation describes mutable code, parameters, flow limits and Squads administration. [Programs and security](https://docs.exponent.finance/user-documentation/security)

The June 22 Sec3 tranching report reviews initial commit `b45838d` and lists three low and five informational findings as resolved. Live deployment correspondence remains unverified. [Sec3 report](https://github.com/exponent-finance/exponent-audits/blob/main/exponent_tranching_report_june_sec3.pdf)

The May 27 Accretion report records six medium and thirteen low findings: twelve fixed, seven acknowledged. It gives audited commit `b45838d8ced6bf5ff2e6adf27eef26a008982e57`, labels its audit-result status unverified, and names program `5vD9m4eGgbeccFRUYR36GTJpR7cpreq17riqFAtg7nDL`, which differs from current tranching documentation. This discrepancy requires resolution rather than a generic “audited” badge. [Accretion report](https://github.com/exponent-finance/exponent-audits/blob/main/exponent_tranching_audit_may_accretion.pdf)

## Remaining rating gates

1. Select the exact series, position size, horizon, access eligibility and intended cash exit.
2. Fetch finalized account data independently and tie deployed binaries to audited versions; resolve outstanding and acknowledged findings.
3. Simulate PT settlement, SY unwrapping, senior recovery, oracle staleness and underlying redemption; record output units and fees.
4. Quote size-specific early exit through each venue and the final cash conversion, including stress capacity and fallback.
5. Complete shared ONyc economic/legal evidence and approve tranche score treatment. Do not apply a negative risk contribution or evade the inherited risk floor.

The MVP can present three distinct preliminary assessment records and explorable risk dependencies now. It should withhold a comparative numeric grade until these gates are met.
