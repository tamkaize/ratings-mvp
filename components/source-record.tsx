import { ExternalLink } from 'lucide-react';
import type { Assessment } from '@/lib/assessments';
import { getSourceCapture } from '@/lib/source-observations';
import styles from './source-record.module.css';

export function SourceRecord({ sourceId, position }: { sourceId: string; position?: Assessment }) {
  const capture = getSourceCapture(sourceId);
  const isExcerpt = capture?.kind === 'document_excerpt';
  const selectedGroup = position && capture?.groups.find(group => group.fields?.some(field =>
    field.valueText === JSON.stringify(position.mint) || (position.market !== null && field.valueText === JSON.stringify(position.market))
  ));
  const groups = selectedGroup ? [selectedGroup, ...capture!.groups.filter(group => group !== selectedGroup)] : capture?.groups ?? [];
  return <section className={styles.record} aria-label="Preserved source support">
    <div className={styles.heading}>
      <h3>{isExcerpt ? 'Captured source passage' : 'Captured source observations'}</h3>
      <a className={styles.recordLink} href={`/api/source-records?id=${encodeURIComponent(sourceId)}`} target="_blank" rel="noreferrer">Open preserved source record (JSON)<ExternalLink size={14} aria-hidden="true" /></a>
    </div>
    {capture ? <>
      <p className={styles.context}>{isExcerpt
        ? 'Exact excerpt from the captured publisher document. It supports the publisher’s stated position; verification remains subject to the limitations above.'
        : 'Exact retained publisher fields. JSON pointers identify their location in the captured response. Null is a reported empty field. Values are historical observations, without independent deployment or execution verification.'}</p>
      {capture.kind === 'api_scalar' && <p className={styles.context}>The response supplied no state timestamp. Unit, period and interpretation limits remain in the preserved record.</p>}
      {sourceId === 'EXP-API-POOLS' && <p className={styles.context}>Reported pool liquidity is not a size-specific executable exit quote.</p>}
      {groups.map((group, index) => isExcerpt ? <div key={group.label} className={styles.passage}>
        <blockquote>{group.quote}</blockquote>
        <p className={styles.location}>{group.label} · {group.location}</p>
      </div> : <details key={`${sourceId}-${position?.id ?? 'research'}-${group.label}`} className={styles.group} open={index === 0}>
        <summary>{group.label}{group === selectedGroup && ' · Assessed position'}</summary>
        <p className={styles.location}>{group.location}</p>
        <dl className={styles.fields}>{group.fields?.map(field => <div key={field.path}>
          <dt><code>{field.path}</code></dt><dd><code>{field.valueText}</code></dd>
        </div>)}</dl>
      </details>)}
      <details className={styles.provenance}><summary>Capture provenance</summary><p>{capture.provenance}</p><p>Original response SHA-256</p><code>{capture.sourceResponseSha256}</code></details>
    </> : <p className={styles.context}>No exact source passage or API extract is retained here. Open the preserved record for source metadata, attributed research notes and retrieval limitations. The assessment synthesis below is analyst interpretation.</p>}
  </section>;
}
