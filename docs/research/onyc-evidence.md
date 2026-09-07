# ONyc evidence packet

Observed **2026-09-08**. Research input for unlevered ONyc, PT-ONyc and PT-srONyc. This is an evidence-backed assessment packet, not an approved rating. The [structured packet](../../data/research/onyc-evidence.json) contains source IDs, facts, missing inputs, API observations and a historical deal schedule. `observed_at` is our retrieval date; it is never a substitute for the underlying financial data's effective date.

## What the evidence supports

OnRe describes ONyc as a NAV-based interest in a Bermuda segregated reinsurance account. Its economic drivers include underwriting performance and collateral returns. The legal agreement, investor rights and recovery priority still need examination; issuer documentation is not independent legal verification. The authoritative product URL now omits `-fund-`; the URL in the September 7 local guide returns a missing-page response. [Product description](https://docs.onre.finance/introduction/onre-tokenized-reinsurance-onyc), [account segregation](https://docs.onre.finance/reinsurance-framework/collateral-security-and-segregation).

The official Solana mint is `5Y8NV33Vv7WbnLfq3zBcKSdYPrk7g2KoiQoe7M2tcxp5`. The issuer lists program `onreuGhHHgVzMWSkj2oQDLDtvvGvoepBPkqyaubFcwe`, mint-authority PDA `AbpE5YLpdpxj2jRczG9P341Jicf67NvZsaZYrATbMnNX`, reserve multisig `45YnzauhsBM8CpUz96Djf8UG5vqq2Dua62wuW9H3jaJ5` and administration/upgrade authority `FvmhydbpHGQzMUp51GmhB1fwsrkyfmnRsTg7oPwDe25f`. These are document observations; current account state was not read from chain. [Token reference](https://docs.onre.finance/technical-resources/token-configuration-and-reference).

The collateral page currently lists **T-Bills, sUSDe, syrupUSDC, USCC, USDC, USDG, sUSDS and USYC**, without weights or dated balances. Its current content does not contain the allocation image expected by the local guide. Do not reduce backing to sUSDe, assume equal weights, or draw a proportional allocation chart. Underwriting exposures and collateral supporting them must not be summed as independent pools. [Collateral composition](https://docs.onre.finance/for-capital-providers/collateral-composition).

Portfolio policy targets an approximately equal specialty/ILW mix. That target is not a measured allocation. A separate deals page contains a screenshot whose filename includes June 15, 2026. It displays 15 rows totaling $112.712 million, but no reliable financial as-of date. Its active/allocated labels and projected yields are historical research material; they are not current portfolio observations. The JSON preserves the manually inspected rows and the original image URL. [Portfolio policy](https://docs.onre.finance/reinsurance-framework/portfolio-makeup), [deals screenshot](https://docs.onre.finance/reinsurance-framework/reinsurance-deals-overview).

## Entry and exit

Minting documentation supports USDC/USDG and no issuer mint fee. Open access and institutional onboarding are distinct acquisition paths. [Minting](https://docs.onre.finance/for-capital-providers/minting-onyc), [access](https://docs.onre.finance/for-capital-providers/open-access-vs-institutional-access).

The current redemption page describes eligible, verified holders entering a liquidity-dependent queue; settlement can use USDC/USDG. The stated fee is 25bp. Neither the 15% reserve target nor the 2.5%-of-NAV monthly capacity target is guaranteed availability. Documentation also references weekly constraints, requiring clarification. Unlike the local guide, the inspected page has no “Coming Soon” label. Deployment, queue balances and realized execution times were not verified. [Redemptions](https://docs.onre.finance/for-capital-providers/redemptions).

## Valuation and controls

There is an unresolved distinction between economic account NAV and executable offer pricing. The token reference describes contract parameters, while insurer reporting describes committee-calculated daily NAV and oracle publication. The evidence does not establish how a loss changes contract pricing or how quickly wrappers would recognize impairment. [Token reference](https://docs.onre.finance/technical-resources/token-configuration-and-reference), [reporting](https://docs.onre.finance/for-insurers/reporting), [oracle roles](https://docs.onre.finance/technical-resources/data-streams-and-oracle-providers).

OnRe describes two 3-of-6 multisigs, broad administrative powers and timelock implementation still in progress. Segregated custody is an issuer assertion; custodian mandates and legal account balances remain unverified. [Integrity overview](https://docs.onre.finance/security-and-verification/system-integrity-overview).

The inspected OtterSec PDF is dated **July 30, 2026**, while the issuer index labels it August. It reviews commit `8aceb86`: 16 findings, with nine resolved and seven acknowledged. The acknowledged partial-redemption fee issue relies on backend behavior; this qualifies blanket claims about backend compromise. The report does not establish a present exploit or a match to deployed code. [OtterSec report](https://osec.io/reports/onre_app_solana_audit_final.pdf), [audit index](https://docs.onre.finance/security-and-verification/independent-audits).

The Apex index's latest listed period is **June 2026**. The linked report could not be read: public-preview retrieval failed and downloading was explicitly restricted by its owner. We therefore cannot verify report balances, qualifications or scope. No attempt was made to bypass that restriction. [Attestation index](https://docs.onre.finance/security-and-verification/independent-attestations), [June report](https://drive.google.com/file/d/1uzbcVsZ8AsHj9y2FhYC-pLO9gv4el3Aj/view?usp=drive_link).

OnRe states it has a BARR Advisory SOC 2 Type II examination, but the report requires a request and was not inspected. Its own regulation page identifies On Re SAC Ltd and Bermuda permissions; regulator search and a partial register download did not establish an exact entry. That retrieval limitation is not evidence of absence or license loss. [SOC 2 disclosure](https://docs.onre.finance/legal/compliance), [issuer regulation](https://docs.onre.finance/for-insurers/regulatory-framework), [BMA register](https://www.bma.bm/regulated-entities).

## Retrieved API values

These responses are issuer API observations from September 8, 2026. They contain **no timestamp, slot, reporting period or attestation**. They are suitable for evidence detail with those limitations visible, not for a “live verified” badge. APY is retained as raw data because basis, unit convention and window were not independently pinned.

| Endpoint | Exact scalar response | Display treatment |
| --- | --- | --- |
| [NAV](https://core.api.onre.finance/data/live-nav) | `1.143166274` | Issuer NAV observation; state timestamp unknown |
| [TVL](https://core.api.onre.finance/data/live-tvl) | `287723838.800025469986198890` | Issuer TVL; not redemption cash or attested assets |
| [APY](https://core.api.onre.finance/data/live-apy) | `0.115411` | Raw research input; exclude from yield comparison |

## Required next inputs and MVP treatment

The shared substrate has ten open input groups: signed legal claim, dated portfolio/reserves, valuation reconciliation, independent assurance, deployed controls/custody, executable exit, position definition, timestamped API state, reserve-asset materiality and regulator entity mapping. The JSON records each independently; missing evidence must remain unknown rather than become a zero-risk score.

The initial MVP can show ONyc's economic layers, named collateral candidates, conditional exit route, specific control evidence, conflicts and review tasks. It should show no approved grade. PT assessments should inherit this evidence once and add market-specific mechanics. Neither a senior label nor a historical Kamino pilot grade closes these gaps. The issuer's approximate loss-probability claim is excluded from score calibration because the inspected page does not establish a suitable model horizon or validation. [Issuer risk description](https://docs.onre.finance/reinsurance-framework/claims-and-risk-management).
