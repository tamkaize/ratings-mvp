'use client';

import type { ReactNode } from 'react';
import { ArrowUpRight, Info } from 'lucide-react';
import { assessments, type Assessment } from '@/lib/assessments';
import { comparisonEvidenceCell, comparisonEvidenceRows, type ComparisonEvidenceRow } from '@/lib/comparison';
import { EvidenceLabel } from './assessment-ui';
import styles from './compare-view.module.css';

type CompareViewProps = {
  onOpen: (id: string) => void;
  onEvidence: (positionId: string, evidenceId: string) => void;
};

const groups = [
  { id: 'position', title: 'Additional PT and senior requirements' },
  { id: 'underlying', title: 'Shared ONyc requirements' },
] as const;

const maturity = (value: string) => new Intl.DateTimeFormat('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
  hourCycle: 'h23', timeZone: 'UTC',
}).format(new Date(value)) + ' UTC';

const mechanisms: Record<Assessment['id'], string> = {
  onyc: 'Direct NAV-based exposure',
  'pt-onyc': 'Yield stripping, PT settlement and early-sale market',
  'pt-sronyc': 'PT settlement plus finite junior protection, NAV sync and recovery state',
};
const cashRoutes: Record<Assessment['id'], string> = {
  onyc: 'Eligible issuer redemption, or a secondary sale',
  'pt-onyc': 'PT realization, ONyc realization, then any cash conversion',
  'pt-sronyc': 'PT realization, conditional senior withdrawal, ONyc realization, then cash conversion',
};
const structureRows: { id: string; title: string; value: (position: Assessment) => ReactNode }[] = [
  { id: 'exposure', title: 'Position exposure', value: position => position.summary },
  { id: 'maturity', title: 'Contractual maturity', value: position => position.maturity ? maturity(position.maturity) : 'No PT maturity' },
  { id: 'loss', title: 'Loss object', value: position => position.lossObject },
  { id: 'mechanism', title: 'Additional mechanism', value: position => mechanisms[position.id] },
  { id: 'cash', title: 'Route to cash', value: position => cashRoutes[position.id] },
  { id: 'gap', title: 'Binding research gap', value: position => position.blocker },
];

function EvidenceCell({ position, row, onEvidence }: {
  position: Assessment; row: ComparisonEvidenceRow; onEvidence: CompareViewProps['onEvidence'];
}) {
  const cell = comparisonEvidenceCell(position, row);
  if (cell.kind === 'not-applicable') return <span className={styles.notApplicable}>N/A<span className="sr-only"> — {cell.reason}</span></span>;
  if (cell.kind === 'unrecorded') return <span className={styles.notApplicable}>Not recorded</span>;
  return <button
    className={styles.evidenceAction}
    onClick={() => onEvidence(position.id, row.id)}
    aria-label={`${position.symbol}: ${row.title}, ${cell.evidence.state}. Inspect evidence`}
    title={`Inspect ${position.symbol}: ${cell.evidence.title}`}
  ><EvidenceLabel state={cell.evidence.state} /><ArrowUpRight size={13} aria-hidden="true" /></button>;
}

export function CompareView({ onOpen, onEvidence }: CompareViewProps) {
  return <>
    <div className="page-context"><span>Coverage universe / Comparison</span><span>08 Sep 2026</span></div>
    <div className="view-header"><span className="eyebrow">Three positions · One shared underlying</span><h1>Same source.<br />Different dependencies.</h1><p>Compare what each holder owns, what can interrupt realization, and what evidence is still needed.</p></div>
    <div className="annotation"><Info size={18} aria-hidden="true" /><p>All three assessments are <strong>NO_RATE</strong>: no approved score, grade or confidence. Position size, custody and eligibility are unspecified. September PT maturities and USDC as the cash destination are comparison assumptions.</p></div>
    <div className={styles.positionLinks} aria-label="Open a full position assessment">{assessments.map(position => <button key={position.id} className="text-button" onClick={() => onOpen(position.id)}>Open {position.symbol}<ArrowUpRight size={14} aria-hidden="true" /></button>)}</div>

    <section className={styles.evidenceSection} aria-labelledby="comparison-evidence-heading">
      <div className="section-heading"><h2 id="comparison-evidence-heading">Evidence across the positions</h2></div>
      <p className={styles.intro}>Both PTs lack an executable exit quote. Partial evidence for the underlying ONyc exit does not resolve that additional requirement. Select a state to inspect its evidence and remaining gap.</p>
      <div className={styles.desktop} role="region" aria-label="Evidence comparison">
        <table className={styles.evidenceTable}>
          <caption>Shared and position-specific evidence states · N/A means the mechanism is not part of that position.</caption>
          <thead><tr><th scope="col">Required area</th>{assessments.map(position => <th key={position.id} scope="col">{position.symbol}</th>)}</tr></thead>
          {groups.map(group => <tbody key={group.id}>
            <tr className={styles.groupHeading}><th colSpan={4} scope="rowgroup">{group.title}</th></tr>
            {comparisonEvidenceRows.filter(row => row.group === group.id).map(row => <tr key={row.id} data-evidence-row={row.id}>
              <th scope="row">{row.title}</th>{assessments.map(position => <td key={position.id}><EvidenceCell position={position} row={row} onEvidence={onEvidence} /></td>)}
            </tr>)}
          </tbody>)}
        </table>
      </div>
      <div className={styles.mobile} aria-label="Evidence comparison">
        <p className="caption">N/A means the mechanism is not part of that position.</p>
        {groups.map(group => <section key={group.id} className={styles.mobileGroup} aria-labelledby={`mobile-evidence-${group.id}`}>
          <h3 id={`mobile-evidence-${group.id}`}>{group.title}</h3>
          {comparisonEvidenceRows.filter(row => row.group === group.id).map(row => <div className={styles.fieldGroup} key={row.id} data-evidence-row={row.id}>
            <h4>{row.title}</h4><dl>{assessments.map(position => <div key={position.id}><dt>{position.symbol}</dt><dd><EvidenceCell position={position} row={row} onEvidence={onEvidence} /></dd></div>)}</dl>
          </div>)}
        </section>)}
      </div>
      <p className={styles.footnote}>Shared ONyc evidence is reused. Evidence states describe individual requirements; they are not a completion percentage, confidence score or investment ranking.</p>
    </section>

    <section className={styles.structureSection} aria-labelledby="comparison-structure-heading">
      <div className="section-heading"><h2 id="comparison-structure-heading">Structure and realization</h2></div>
      <p className={styles.intro}>The two September PTs have distinct mints and exact maturity times. Maturity starts a conditional realization path.</p>
      <div className={styles.desktop} role="region" aria-label="Position comparison">
        <table className={styles.structureTable}>
          <caption>Research comparison · September PT series selected for the MVP</caption>
          <thead><tr><th scope="col">Assessment dimension</th>{assessments.map(position => <th scope="col" key={position.id}>{position.symbol}<small>{position.type}</small></th>)}</tr></thead>
          <tbody>{structureRows.map(row => <tr key={row.id}><th scope="row">{row.title}</th>{assessments.map(position => <td key={position.id}>{row.value(position)}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className={styles.mobile} aria-label="Position comparison">{structureRows.map(row => <div key={row.id} className={`${styles.fieldGroup} ${styles.structureField}`}><h3>{row.title}</h3><dl>{assessments.map(position => <div key={position.id}><dt>{position.symbol}</dt><dd>{row.value(position)}</dd></div>)}</dl></div>)}</div>
      <div className={styles.positionLinks} aria-label="Continue to a full position assessment">{assessments.map(position => <button key={position.id} className="text-button" onClick={() => onOpen(position.id)}>Open {position.symbol}<ArrowUpRight size={14} aria-hidden="true" /></button>)}</div>
    </section>
  </>;
}
