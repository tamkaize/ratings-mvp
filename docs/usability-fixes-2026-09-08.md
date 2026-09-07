# Usability corrections — 08 Sep 2026

This implements the nine findings in the [usability audit](usability-audit-2026-09-08.md). The original audit and initial QA record remain historical records. Research conclusions and all three `NO_RATE` dispositions are unchanged.

## Changes

| Audit finding | Implemented behavior |
| --- | --- |
| U01: incomplete comparison | All 11 evidence requirements are represented. PT early exit is Missing; inherited ONyc redemption and sale remain Partial. N/A is reserved for inapplicable mechanisms. States link to the exact assessment evidence record. |
| U02: lost navigation context | New views reveal and focus their beginning. Tab changes reveal the selected panel. Scope/evidence links focus their named destination, including bookmarked URLs. Back/Forward restore the prior viewport. |
| U03: mobile inspection offscreen | Selected layers disclose their explanation immediately below the row on narrow screens. Desktop retains an adjacent inspector. |
| U04: buried material risks | Three prioritized factors appear before the dependency structure, including the underlying NAV contradiction. “Show all” exposes every remaining factor in place. Each factor has a direct evidence action. |
| U05: mobile comparison loses labels | Narrow screens use labeled field groups: every value remains beside its position and comparison dimension. Desktop retains semantic tables. |
| U06: buried scope and next step | Scope appears beside the assessment context with the September assumption and unspecified size/custody/eligibility. “Inspect scope & sources” lands at Position scope. “Review approval requirements” lands at the prioritized risks. |
| U07: lost unsaved notes | Drafts live above tab remounts, stay separate by position and survive navigation/reload in session storage. Saved notes remain in local storage. Unsaved, saved and storage-error states are explicit. |
| U08: weak source traceability | All 37 sources have preserved JSON records. Thirteen sources expose selected exact historical fields or passages checked against recorded hashes. Missing extracts stay explicit. The assessed PT series opens first; analyst synthesis is separate. |
| U09: ambiguous dependency language | Clear relationship verbs and full role names replace internal letters. Junior capital branches directly from srONyc; underwriting and collateral are labeled as account exposures/assets. |

## Validation

- Production build and TypeScript: passed.
- Integrity/API suite: 22/22 passed, including unchanged null ratings, exact series identities, comparison completeness/applicability and preserved source attribution.
- Complete browser suite against the final production build: 39/39 passed, with no exclusions or retries. Dedicated regressions reproduce the original failures, including viewport placement and focus, comparison completeness, full risk access, draft retention and source attribution.
- Automated WCAG checks: no detected violations on Overview, a selected dependency, Evidence and Compare at 1440px and 390px.
- Production visual review: desktop 1440px, tablet 900px and mobile 390px; no page errors during the captured walkthrough. The initial production test run exposed a test that measured geometry before streamed content appeared; it now waits for the visible controls before measuring. The complete rerun passed.

Selected production captures: [desktop overview](qa/usability-fixes/overview-1440.png), [tablet overview](qa/usability-fixes/overview-900.png), [mobile overview](qa/usability-fixes/overview-390.png), [mobile comparison](qa/usability-fixes/mobile-comparison.png), [mobile dependency detail](qa/usability-fixes/mobile-dependency.png), [mobile source inspection](qa/usability-fixes/mobile-source.png).

Automated checks do not establish representative analysts’ comprehension or task-success rates.

## Design review

Reviewed against the local Kurtosis product references at 1440px desktop, 900px tablet and 390px mobile. The corrected hierarchy is identity → assessment/rationale → scope → material risks → dependencies → realization. Retained the restrained light palette, explicit dates, conditional protection and null scores. Removed ambiguous diagram shorthand and redundant role copy. Detailed evidence is disclosed progressively.

Subjective design judgment after the corrections: restraint 4/5; hierarchy 4/5; precision 4/5; institutional credibility 4/5; distinctiveness 4/5; technical character 4/5. Alpine imagery is not applicable. These scores assess the rendered revision against the brand rubric, not measured usability or financial readiness. Representative analyst task sessions remain the next validation step.

The evidence is a dated research snapshot. The new source records expose historical support; they do not refresh, independently verify or approve it. Notes remain local to the browser and outside assessment exports.
