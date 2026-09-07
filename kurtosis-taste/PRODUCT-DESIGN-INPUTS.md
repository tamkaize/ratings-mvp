# Kurtosis Product Design Inputs

This is the **founder-facing source of truth** for product-design decisions that materially affect the UI.

You should edit this file when a product/design input changes. The detailed system files should then be updated from here.

## Status

Most critical inputs are now resolved. The only material unresolved input is the exact elapsed-time threshold for data freshness labels.

---

# Ratings

## Grade system

Kurtosis uses an **S&P-inspired internal token-risk grade ladder**.

| Token-risk score | Grade | Classification |
|---|---|---|
| `0.00 <= score < 0.50` | `A` | Investment grade |
| `0.50 <= score < 0.75` | `BBB` | Investment grade |
| `0.75 <= score < 1.00` | `BB` | Speculative grade |
| `1.00 <= score < 1.50` | `B` | Speculative grade |
| `1.50 <= score < 2.00` | `CCC` | Speculative grade |
| `2.00 <= score < 2.50` | `CC` | Speculative grade |
| `2.50 <= score < 3.00` | `C` | Speculative grade |
| `3.00 <= score` | `D` | Uninvestable |

These are internal token-risk grades, not external credit ratings or default-probability estimates.

Factor scorecards retain their factor-level numeric inputs and `Low / Medium / High` labels. Final layer and token outputs use the grade ladder above.

## Numeric score

Yes. Show the raw token-risk score in addition to the grade when supplied.

Lower is better. Do not convert it to `/100` unless the methodology changes.

## Rating statuses

- `NO_RATE`: cannot approve a rating yet because evidence is missing, contradictory, insufficient, or required assessment steps remain unresolved. This does not automatically mean the asset is unsafe.
- `REJECT`: structurally uninvestable; sufficient evidence identifies a fundamental problem that prevents approval.
- `WATCHLIST`: closer monitoring required; a letter grade can still exist alongside this status.

### Approval state

- `Indicated rating`: analytical result before final approval; it may remain visible even when the approved outcome is `NO_RATE`.
- `Approved rating`: result that has passed required evidence, review, and approval checks.

The grade describes assessed risk. The status describes whether that assessment is approved, withheld, rejected, or under monitoring.

## Confidence

- `High`
- `Medium`
- `Low`

Rules:

- Medium confidence normally limits the best grade to `BBB`.
- Low confidence limits the best grade to `B` and requires `WATCHLIST`.
- Missing essential evidence can cause `NO_RATE`; approved confidence is then left empty.

## Evidence quality

Per evidence item:

- `Complete`
- `Partial`
- `Stale`
- `Contradictory`
- `Missing`
- `Unevaluable`

## Coverage

Coverage means which required areas have supporting evidence and which still have gaps.

There is no single overall evidence-coverage percentage.

---

# Data freshness

Elfa AI provides real-time intelligence.

## Still unresolved

Define the exact elapsed-time thresholds for:

- `Current`: `[TBD]`
- `Delayed`: `[TBD]`
- `Stale`: `[TBD]`

Until defined, the UI should show actual timestamps and source state rather than inventing thresholds.

---

# Horizon

## Canonical product name

`Kurtosis Horizon Vault`

## Cycle / maturity terminology

- Vault cycle
- Current cycle
- Cycle start
- Cycle end / maturity
- Days to maturity
- Next cycle

Use `maturity` only when the underlying position has a contractual maturity date.

## Canonical user metrics

- Your position value
- Net APY, clearly labeled as historical or estimated
- Total vault assets (TVL)
- Available to withdraw
- Next withdrawal window or expected settlement date
- Fees
- Risk grade
- Rating status
- Evidence confidence
- Last updated

## Withdrawal lifecycle

`Available to request → Requested → Queued → Processing → Claimable → Completed`

Additional states:

- Cancelled
- Delayed
- Paused
- Failed

Show amount, expected availability, and reason for any delay. Use `Claimable` only when a separate user claim action is required.

---

# Brand / UI

## Primary font

```css
.hero-title {
  font-family: "Inter Display", "Inter", sans-serif;
  font-size: 64px;
  font-weight: 650;
  line-height: 0.98;
  letter-spacing: -0.035em;
}

.hero-body {
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.012em;
}
```

## Risk severity foreground colors

- Low: `#15803D`
- Moderate: `#A16207`
- High: `#C2410C`
- Critical: `#B91C1C`
- Unrated / insufficient evidence: `#475569`

Always show the severity/grade label alongside color. Keep confidence separately labeled.

## Icons

Lucide. Outline icons, typically `20px`, `1.75–2px` stroke.

## Theme

Light mode only.

---

# Implementation

- Framework: Next.js
- Runtime: React
- Language: TypeScript
- Styling: Tailwind CSS
- Charts: Recharts
