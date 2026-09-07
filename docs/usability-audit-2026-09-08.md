# Kurtosis Ratings MVP: usability audit

Reviewed 08 Sep 2026 against the running production application. This is a browser-based expert inspection, supported by reproduced interactions, screenshots and code inspection. No representative analysts were recruited; there are no measured task-success rates or user-satisfaction scores.

## Verdict

The MVP has substantial usability issues. The visual restraint is sound, but task flow, risk hierarchy and comparison semantics need correction before recommending unaided analyst use. The earlier blanket 4/5 taste assessment overstated readiness. Passing functional and accessibility checks established narrower properties than usability.

`NO_RATE` is appropriate for these incomplete assessments. Inventing grades would make the product worse. The problem is how the interface helps a reader understand the limits, compare different positions and take the next research step.

## Findings, in priority order

### U01 — High: comparison obscures missing PT exit evidence

**Reproduce:** Open Compare and scroll to “Evidence across the positions.” “Executable exit” is Partial for ONyc and both PT positions. Open a PT's Evidence view and filter Missing: “Executable PT exit” is Missing.

**Cause and consequence:** The matrix selects six inherited ONyc evidence IDs, including `liquidity`, while omitting `pt-liquidity`, conversion, tranche and Exponent-control evidence. The caption claims shared and position-specific coverage. A reader can interpret identical columns as equivalent evidence readiness and overlook a missing leg of the PT exit.

**Correction:** Rename the existing row “Underlying ONyc redemption and sale.” Add PT conversion, PT early exit, Exponent deployment and senior recovery rows. Show the actual Missing state and explicit N/A only where a mechanism is inapplicable. Link each cell to its evidence record.

References: [comparison implementation](../components/ratings-workspace.tsx#L168), [PT evidence](../lib/assessments.ts#L174).

### U02 — High: navigation skips the beginning of the destination

**Reproduce:** Scroll to the bottom of PT-srONyc Overview and click “Inspect exit routes.” At 1440×1000, the new view lands around step 03. At 390×844, it lands at step 05; the route heading is approximately 1,923px above the viewport. Opening ONyc from the comparison table similarly leaves its identity, NO_RATE and blocker above the viewport.

**Cause and consequence:** Navigation changes React state and the URL but does not manage scroll or focus. Users miss the selected scenario, initial conversion and senior withdrawal prerequisites.

**Correction:** On new positions/views, reveal and focus the destination heading. On intra-assessment tabs, reveal the selected panel. Preserve deliberate Back/Forward restoration separately.

Reference: [navigate](../components/ratings-workspace.tsx#L59).

### U03 — High: mobile layer selection updates content outside the viewport

**Reproduce:** At 390×844, scroll to the first layer and select it. The selection changes to PT-srONyc, but the inspector remains below the full layer and supporting-dependency list. In the captured state, scrollY remains 779 and the inspector begins 1,283px below the viewport top.

**Consequence:** The defining interaction gives only a selection-color change onscreen; the explanation a user requested is invisible. Repeated layer comparisons require substantial back-and-forth scrolling.

**Correction:** Use an inline mobile disclosure beneath the selected layer, or a clearly titled detail sheet with reliable close/focus return. Keep the desktop side-by-side inspector.

Reference: [DependencyView](../components/ratings-workspace.tsx#L123).

### U04 — High: the structure precedes the material risk explanation

**Observed:** On the default PT-srONyc Overview, risk factors begin at approximately document y=1,709 on desktop and y=2,601 on mobile. The dependency section occupies about 935px on desktop. Only four of eight factors are rendered; the underlying ONyc factors, including the NAV/pricing contradiction, are absent from that list. “Review all evidence” opens an inventory rather than the remaining factors.

**Consequence:** The summary does give a short blocker, but a reader must explore considerable structure before reaching concrete risk explanations. Wrapper mechanics dominate the visual story while fundamental underlying uncertainty receives less attention.

**Correction:** Put three concise, material blockers immediately after the assessment summary, including shared underlying uncertainty. Follow with the compact structure and allow “Show all 8 risk factors.”

Reference: [overview composition](../components/ratings-workspace.tsx#L103).

### U05 — Medium: mobile comparison loses the labels needed to interpret cells

**Reproduce:** At 390px, the comparison is a 770px table in a 350px region. Scroll right to PT-srONyc: row labels and the ONyc column disappear to the left. No column or row header is pinned.

**Consequence:** The user must remember which attribute and position they were comparing while moving in both directions. Contained horizontal scrolling passes an overflow check but does not preserve comprehension.

**Correction:** Use a position-pair comparison or labeled field groups on mobile. If retaining the table, preserve the row labels and header context without consuming most of the usable width.

### U06 — Medium: applicability and the next research step are buried

**Reproduce:** Open Evidence with all states. Position scope follows eleven evidence cards at roughly y=3,245 on desktop. That section contains the unspecified size, custody and eligibility, and the September-series assumption. “Inspect scope & sources” opens the beginning of Evidence rather than the scope section.

**Consequence:** A reader encounters a specific-looking assessment before finding the assumptions needed to determine whether it applies to their holding. Internal language about score formation and transformations is more prominent than a short, prioritized list of unresolved investment questions.

**Correction:** Place a compact scope strip beside the result and three concrete approval blockers with direct links. Keep `NO_RATE` as the canonical state; explain it in plain English. This correction does not require an approval backend.

### U07 — Medium: ordinary tab navigation silently discards unsaved notes

**Reproduce:** Save a note, change its text without saving, switch to Overview, then return to Evidence. The earlier saved text returns and the draft is lost without warning.

**Correction:** Retain drafts above the remounted tab panel, autosave with visible status, or explicitly warn before discarding. The browser-only storage disclosure does not explain this loss of unsaved work.

References: [panel remount](../components/ratings-workspace.tsx#L102), [AnalystNote](../components/ratings-workspace.tsx#L162).

### U08 — Medium: source inspection stops short of inspectable claim support

**Reproduce:** In a PT Evidence view, open the Exponent markets source. The modal contains retrieval metadata, limitations and composite assessment summaries. It provides neither a captured field/value nor a direct path to its preserved observation. “Inspect the full evidence record” is plain text.

**Correction:** Expose the specific preserved API fields or document passage/location behind the selected claim, link the full packet record, and keep analyst synthesis distinct. Retain the original-source link and retrieval limits.

### U09 — Medium: dependency labels expose internal notation and confuse relationships

The chain reads “PT-srONyc → Depends through PT-srONyc → wsrONyc.” The branches say “Sibling branch of OnRe segregated account,” although the account is their parent. D/S/R roles are not explained at the point of scanning.

**Correction:** Name the relationship directly, identify child branches as account exposures, and provide full role names or an adjacent compact legend. Attach junior protection visibly to the senior claim.

## Preserve

The restrained brand treatment, distinct position identities, complete maturity timestamps in detail, null score honesty, explicit source dates, conditional exit language, source links, keyboard tab controls and working JSON downloads are useful foundations. The correction is primarily information and interaction design.

## Recommended first iteration

1. Correct the evidence comparison and destination scroll/focus behavior.
2. Make mobile layer details visible at the point of selection; preserve comparison labels.
3. Lead with applicable scope and three prioritized risks, then expose the full evidence and structure.
4. Preserve note drafts and connect claims to exact evidence observations.
5. Add behavioral checks for viewport placement, comparison completeness and draft retention. Then conduct task sessions with representative analysts: identify the principal blocker, compare PT exit uncertainty, explain senior protection and export a reviewable finding.

Suggested lead copy, without changing the financial conclusion:

> Assessment incomplete
>
> NO_RATE · No approved grade
>
> Holder rights, loss transmission and the selected exit path still require verification.
>
> Research scope: September 2026 series; position size, custody and eligibility are unspecified.
>
> Review approval requirements

## Review basis

The local [canonical ratings page](../kurtosis-taste/references/canonical-pages.md) places material factors before deeper dependency exploration. The [product design system](../kurtosis-taste/references/product-design-system.md) requires clear position identity, evidence near claims and useful mobile hierarchy. The original [QA report](mvp-qa.md) remains a historical record of narrower checks.

The external framework considers feedback, conceptual clarity, control, consistency and recognition. [Nielsen Norman Group: usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/). An expert walkthrough should be followed by observation of representative people performing tasks; this review does not establish their actual success rates. [NN/g: usability testing](https://www.nngroup.com/articles/usability-testing-101/).

Revised subjective taste assessment: restraint 4/5; hierarchy 2/5; precision 3/5; institutional credibility 3/5; distinctiveness 3/5; technical character 3/5; alpine imagery not applicable. These are reviewer judgments, not measured user outcomes. No MVP code or research data was changed during this audit.
