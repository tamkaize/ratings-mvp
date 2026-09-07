# Kurtosis Ratings MVP

An evidence-led assessment workspace for **ONyc, PT-ONyc and PT-srONyc**, built with the supplied [kurtosis-taste](kurtosis-taste/SKILL.md) design system. Research and visualization decisions were documented before implementation.

All three initial assessments are **`NO_RATE`**. Material evidence, executable exit checks and approved score formation remain unresolved. This status means an approved rating cannot yet be issued; it does not by itself establish that a position is unsafe. Approved grades, scores and confidence remain empty.

## Run locally

Use Node.js 20.9.0 or newer, as required by the installed Next.js package, and npm:

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). The application uses Next.js 16, React 19, TypeScript, Tailwind CSS 4, Recharts and local Inter fonts. Browser runtime assets are served locally. Reading the application requires no wallet connection or API credentials; opening original evidence links accesses the publishers' websites.

For a production build:

```bash
npm run build
npm run start
```

## What the MVP provides

- Search and switch among the three assessments; use shareable position/view/tab URLs.
- Start with visible scope and three prioritized risks; expand the complete factor list, inspect dependencies, and follow four acquisition/exit scenarios.
- Compare all shared and position-specific evidence requirements. Mobile field groups preserve labels; evidence states link directly to their records.
- Open preserved source fields/passages, attributed JSON records, original documents, the research register and methodology. Missing exact extracts remain explicit.
- Save a separate personal research note for each position in this browser's local storage. Unsaved drafts survive tab/view/position navigation and reload in the same browser tab. Notes do not change evidence or approval, and are not synchronized or included in assessment exports.
- Download assessment projections and the underlying research packets as JSON.

The initial PT comparison uses the **10 September 2026** candidates. Their maturities differ by **19 seconds**; they are not interchangeable series. January 2027 alternatives remain in the raw Exponent research packet, outside the initial three assessment views.

| Assessment ID | Position | Maturity, UTC | Token mint |
| --- | --- | --- | --- |
| `onyc` | ONyc | No contractual PT maturity | `5Y8NV33Vv7WbnLfq3zBcKSdYPrk7g2KoiQoe7M2tcxp5` |
| `pt-onyc` | PT-ONyc | 2026-09-10 09:58:19 | `2W5zZccVq8AMdrg7P4b3NvBKJyzbdnytRy2CKEDHvhiJ` |
| `pt-sronyc` | PT-srONyc | 2026-09-10 09:58:00 | `BKP9Rt3pwh96cCoCp3bkh1zxXZpZez17xA6w64LuMJQy` |

These identities come from issuer documentation and related publisher APIs. They do not establish independently verified finalized account state or executable settlement. Position size, custody, investor eligibility and the intended exit mandate remain open; displayed cash routes use an explicit research assumption.

## Research and data boundaries

Start with the [research summary](docs/research/README.md), [ONyc evidence](docs/research/onyc-evidence.md), [Exponent evidence](docs/research/exponent-evidence.md), [visualization and assessment rules](docs/research/visualization-and-rating-rules.md), and [pre-build design plan](docs/mvp-design-plan.md). The visual handoff is available at [localhost:3000/research-brief.html](http://localhost:3000/research-brief.html) while the app runs, or in [.lavish/ratings-research-brief.html](.lavish/ratings-research-brief.html).

The app uses a **dated, file-based research snapshot**, reviewed on 8 September 2026 in Singapore. It performs no live market ingestion. Reloading the page does not refresh evidence or prices. Publisher response times, reported state times and research dates retain separate meanings; some OnRe scalar responses contain no underlying state timestamp.

Source packets live in [data/research/onyc-evidence.json](data/research/onyc-evidence.json) and [data/research/exponent-evidence.json](data/research/exponent-evidence.json). [lib/assessments.ts](lib/assessments.ts) builds the versioned display projection; [lib/assessment-rules.ts](lib/assessment-rules.ts) checks its semantic consistency. Selected historical API fields and document passages are retained in [source-captures.json](data/research/source-captures.json), with original response hashes and locations. These expose existing research support; they do not add a live feed. Updating evidence requires an explicit file change, review and rebuild.

The display and API projection is `kurtosis.assessment-read-model.v1`. It is **not** a complete record conforming to the larger canonical rating schema and does not implement an approved scoring or approval service. No historical pilot score is reused. Junior protection observations do not authorize automatic senior-grade improvement, and TVL is not treated as executable liquidity.

## Local exports and documents

These endpoints operate against the same local snapshot and require the application server:

| Route | Result |
| --- | --- |
| `/api/assessments` | All three assessment projections and source records |
| `/api/assessments?id=pt-sronyc&download=1` | Download one assessment and its referenced sources; valid IDs are listed above |
| `/api/assessments?download=1` | Download all assessment projections |
| `/api/research?download=1` | Download both source research packets, including January candidates |
| `/api/source-records?id=EXP-API-MARKETS` | Preserved source metadata, selected exact capture and attributed packet records; add `download=1` to download |
| `/api/documents?name=onyc` | Read an allowlisted Markdown document |
| `/api/documents?name=methodology&download=1` | Download an allowlisted document |
| `/research-brief.html` | Self-contained research/design handoff |

Supported document names are `methodology`, `research`, `onyc`, `exponent`, `visualization` and `plan`. The endpoint selects fixed repository paths rather than accepting arbitrary file paths. Unknown IDs or document names return an error. Exports retain `NO_RATE`, null rating outputs, snapshot metadata and evidence limitations.

## Checks

The corrected production build, 22 integrity tests and 39 browser tests passed on 08 Sep 2026. See the [usability corrections and verification](docs/usability-fixes-2026-09-08.md) for test coverage and review limits. The [initial QA record](docs/mvp-qa.md) predates the usability audit and fixes.

```bash
npm run typecheck
npm test
npm run build
```

Browser checks cover interactions, exports, accessibility and responsive layouts. Start `npm run dev` in one terminal, then run the following in another; the Playwright configuration does not start the application automatically:

```bash
npm run test:browser
```

For a different server, set `PLAYWRIGHT_BASE_URL`. The [Playwright configuration](playwright.config.ts) supports `PLAYWRIGHT_CHROMIUM_EXECUTABLE` and uses an existing local Chromium installation when available. On another machine, install the matching browser if needed:

```bash
npx playwright install chromium
```

---

## Research workflow and historical records

The research materials below predate the MVP: a risk methodology, two historical examples, a JSON output schema, a validator and a conceptual explorer. Their original scope and verification notes are retained.

For the original conceptual model, open the [interactive ONyc layer explorer](.lavish/onyc-layer-explorer.html) and the [ONyc assessment guide](docs/onyc-assessment-guide.md). The explorer is a research prototype with unresolved market identities, not an approved rating.

## How to use this repository

1. Define one exact position: chain, token mint, market, maturity, size, holding period, custody, acquisition route, and intended exit. A PT holding and a leveraged PT position require different assessments.
2. Copy [the workpaper](output%20formatting/token-risk-rating-workpaper.md) into a new assessment directory. Complete scope and the recursive layer map before scoring.
3. Work downward through each material claim, wrapper, backing asset, and yield source. Record dependencies and evidence. Stop only when further decomposition cannot change the result; an unknown material backing asset is a gap, not a terminal layer.
4. Map acquisition, maturity settlement, withdrawal, early sale, and stress exits separately. Each step needs preconditions, accounts, output assets, fees, timing, and capacity evidence.
5. Assess the deepest substance first. Then work upward using the methodology's fixed-weight NEW contributions, inherited child risk, shared conditions, and operators. Do not copy historical example scores.
6. Populate the [canonical rating schema](output%20formatting/token-risk-rating.schema.json), validate it, and complete evidence and score-formation gates before approving any rating.

The controlling rules are in [Token Risk Rating Methodology V0.3 alpha](Token%20Risk%20Rating%20Methodology%20V0.3%20alpha.md). For this scope, read the operational approach and Sections 1–2 first, followed by attribution/propagation and Sections 10.10–10.11 on critical paths and mitigation.

## Validate the existing examples

From the repository root, with [uv](https://docs.astral.sh/uv/) installed:

```bash
uv run --with jsonschema python "output formatting/validate_token_rating.py" \
  "onyc-usd-kamino-looping-vault-2026-07-09/onyc-kamino-multiply-route-pattern-rating.json" \
  --schema "output formatting/token-risk-rating.schema.json"

uv run --with jsonschema python "output formatting/validate_token_rating.py" \
  "pt-susdai-layer-scored-pilot-2026-07-07/pt-susdai-15oct2026-rating.json" \
  --schema "output formatting/token-risk-rating.schema.json"
```

Alternatively install `jsonschema` in your Python environment and omit `uv run --with jsonschema`. The explicit `--schema` is necessary: the validator's default and introductory usage text refer to a different directory layout.

Both commands passed on 2026-09-07, reporting 31/31 represented acceptance tests. A validator pass establishes record consistency; it does not verify onchain state, legal claims, current evidence, or investment suitability. Both examples have approved result `NO_RATE`.

The bundled hardening test file also references the original directory layout and a missing `schema-conformance-example.json`. It cannot run unchanged in this export. The commands above exercise the available complete records.

## Open the visual explorer

Open `.lavish/onyc-layer-explorer.html` directly in a browser; it is self-contained. To annotate through Lavish:

```bash
npx -y lavish-axi .lavish/onyc-layer-explorer.html
```

Choose an asset, pull its layers apart, select a layer for its evidence checklist, and switch the route view between entry, maturity/withdrawal, early exit, and stress. No wallet connection is needed.

## Historical records need reconciliation

The July `selected.md` narratives contain older indicated results than their JSON records. For example, the ONyc/Kamino narrative says 1.325/B while JSON `final_output` says 1.650/CCC. The PT-sUSDai JSON says 1.450/B. Both JSON records withhold approved numeric ratings and have August review dates. Treat these as historical methodology examples; the Kamino example is not a standalone ONyc assessment, and the Pendle example is not an Exponent PT assessment.

The original explorer and guide do not alter the methodology or either historical assessment.
