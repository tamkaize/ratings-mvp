# Research foundation — 08 Sep 2026

This research phase was completed before application implementation. The initial MVP uses the September 10 PT pair as explicitly identified candidate positions; January series remain in the research packet. All are unlevered analytical scopes with size, custody, eligibility, and cash-exit mandate unresolved.

- [ONyc evidence](onyc-evidence.md): 23 primary-source records, current collateral candidates, issuer API observations, inspected audit, redemption conditions, and unresolved claim/NAV/assurance questions.
- [Exponent evidence](exponent-evidence.md): exact API-reported PT series and maturities, senior/junior market metadata, coverage denominator, NAV synchronization, recovery mechanics, and audit/deployment limitations.
- [Visualization and rating rules](visualization-and-rating-rules.md): eight authoritative visualization/accessibility references and 18 implementation rules.
- [Pre-build design plan](../mvp-design-plan.md): audience, composition, reusable patterns, responsive behavior, states, and verification.

## Build decisions from evidence

1. Show three source-backed research assessments with `NO_RATE`; leave indicated and approved grades, scores, and confidence empty. Exact API identities help scope research but do not establish complete position scope or executable onchain behavior.
2. Keep ONyc evidence reusable across all three positions. Separate underwriting economics from the collateral that supports them, and separate senior protection from collateral ownership.
3. Use comparison and evidence tables, a selectable dependency stack, and separate acquisition, settlement, early-exit, and stress routes. Never turn unknown allocation weights into a chart.
4. Distinguish API retrieval dates from source state timestamps. Keep untimestamped metrics in evidence detail, without live labels or APY rankings.
5. Keep the September 7 guide and July canonical examples as dated historical research. The new packets explicitly reconcile changed documentation. Do not overwrite their facts or reuse their scores.
6. Use a versioned application read model; exports identify themselves as research packets, not canonical schema-conforming ratings. The original `2.0.2-alpha` canonical schema remains unchanged.

The unresolved inputs are part of the assessment, not a reason to hide the analytical work. Their closure requires financial/legal evidence, executable route checks, and approved score formation and review.
