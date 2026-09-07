'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { Assessment } from '@/lib/assessments';
import { factorEvidence, prioritizedFactors } from '@/lib/assessment-guidance';
import { EvidenceLabel, SectionHeading, SourceLinks } from './assessment-ui';

export function RiskFactors({ position, onSource, onEvidence }: { position: Assessment; onSource: (id: string) => void; onEvidence: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const factors = prioritizedFactors(position);
  return <section className="risk-section" id="risk-factors">
    <SectionHeading number="01" title="What needs resolution" />
    <p className="section-intro">Three priorities for this position. Underlying ONyc uncertainty remains relevant through every wrapper.</p>
    <div className="priority-factors" id="risk-factor-list">{(expanded ? factors : factors.slice(0, 3)).map((factor, index) => {
      const evidence = position.evidence.find(item => item.id === factorEvidence[factor.id]);
      return <article className="priority-factor" key={factor.id} data-factor-id={factor.id}>
        <div className="priority-factor-heading"><span className="factor-number">{String(index + 1).padStart(2, '0')}</span><h3>{factor.title}</h3><EvidenceLabel state={factor.state} /></div>
        <p>{factor.detail}</p>
        <div className="factor-actions">{evidence && <button className="text-button" onClick={() => onEvidence(evidence.id)}>Review {evidence.title}<ArrowRight size={14} /></button>}<details className="factor-sources"><summary>Supporting sources<ChevronDown size={13} aria-hidden="true" /></summary><SourceLinks ids={factor.sourceIds} onSource={onSource} /></details></div>
      </article>;
    })}</div>
    <button className="text-button show-factors" aria-expanded={expanded} aria-controls="risk-factor-list" onClick={() => setExpanded(value => !value)}>{expanded ? 'Show the three priorities' : `Show all ${factors.length} risk factors`}<ChevronDown size={14} className={expanded ? 'rotate' : ''} /></button>
    <p className="caption">Research priorities are not severity scores. Resolving these questions still requires methodology review and independent approval.</p>
  </section>;
}
