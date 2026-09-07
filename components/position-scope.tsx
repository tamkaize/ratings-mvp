'use client';

import { Copy } from 'lucide-react';
import type { Assessment } from '@/lib/assessments';
import { SectionHeading } from './assessment-ui';

const maturity = (value: string) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', timeZone: 'UTC' }).format(new Date(value)) + ' UTC';

export function ScopeSummary({ position, onInspect }: { position: Assessment; onInspect: () => void }) {
  return <div className="scope-summary" aria-label="Research scope">
    <p><strong>Research scope</strong> {position.maturity ? '10 Sep 2026 PT series · MVP assumption' : 'Unlevered ONyc · horizon unspecified'}</p>
    <p>Position size, wallet custody and investor eligibility are unspecified.</p>
    <button className="text-button" onClick={onInspect}>Inspect scope &amp; sources</button>
  </div>;
}

export function PositionScope({ position, onCopy }: { position: Assessment; onCopy: (value: string) => void }) {
  return <section className="scope-section" id="position-scope">
    <SectionHeading title="Position scope" />
    <p className="section-intro">Confirm these assumptions against your holding before relying on the assessment.</p>
    <dl className="identity-table">
      <div><dt>Token mint</dt><dd><code>{position.mint}</code><button className="icon-button" onClick={() => onCopy(position.mint)} aria-label="Copy full mint address"><Copy size={15} /></button></dd></div>
      <div><dt>Yield-stripping vault</dt><dd>{position.market ? <code>{position.market}</code> : 'Not applicable to the spot holding'}</dd></div>
      <div><dt>Maturity</dt><dd>{position.maturity ? maturity(position.maturity) : 'No contractual PT maturity'}</dd></div>
      <div><dt>Identity basis</dt><dd>{position.identityBasis}</dd></div>
      <div><dt>Primary loss object</dt><dd>{position.lossObject}</dd></div>
    </dl>
    <h3>Assumptions and unresolved mandate</h3>
    <ul className="assumptions">{position.scopeAssumptions.map(assumption => <li key={assumption}>{assumption}</li>)}</ul>
  </section>;
}
