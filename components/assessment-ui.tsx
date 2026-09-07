'use client';

import { ArrowUpRight } from 'lucide-react';
import { sourceById, type EvidenceState } from '@/lib/assessments';

export function EvidenceLabel({ state }: { state: EvidenceState }) {
  return <span className={`evidence-label state-${state}`}><span aria-hidden="true" />{state.charAt(0).toUpperCase() + state.slice(1)}</span>;
}

export function SourceLinks({ ids, onSource }: { ids: string[]; onSource: (id: string) => void }) {
  return <div className="source-links">{ids.map(id => {
    const source = sourceById(id);
    return source ? <button key={id} onClick={() => onSource(id)} className="source-link">{source.title}<ArrowUpRight size={12} aria-hidden="true" /></button> : null;
  })}</div>;
}

export function SectionHeading({ number, title, children }: { number?: string; title: string; children?: React.ReactNode }) {
  return <div className="section-heading"><h2>{number && <span className="section-number">{number}</span>}{title}</h2>{children}</div>;
}
