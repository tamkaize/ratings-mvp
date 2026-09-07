'use client';

import { useId, useState } from 'react';
import { ArrowDown, ChevronDown, ChevronRight, GitBranch } from 'lucide-react';
import type { Assessment, Layer } from '@/lib/assessments';
import { SectionHeading, SourceLinks } from './assessment-ui';
import styles from './dependency-view.module.css';

const inlineInspectorQuery = '(max-width: 1023px)';
const accountBranchIds = new Set(['reinsurance', 'collateral']);

function roleName(layer: Layer) {
  if (layer.id === 'junior') return 'Protection dependency';
  return { held: 'Position held', D: 'Economic dependency', S: 'Shared control dependency', R: 'Exit route dependency' }[layer.role];
}

function relationship(layer: Layer, position: Assessment) {
  const parent = position.layers.find(item => item.id === layer.parentId)?.title;
  switch (layer.id) {
    case 'sy': return `${parent} uses this wrapper and vault`;
    case 'senior': return 'The wrapper has senior ONyc exposure';
    case 'onyc-token': return parent === 'srONyc' ? 'srONyc has exposure to the ONyc pool' : 'The wrapper has ONyc exposure';
    case 'onre-account': return 'ONyc represents an account interest';
    case 'reinsurance': return 'Account exposure: underwriting';
    case 'collateral': return 'Account assets: collateral and liquidity';
    default: return parent ? `${parent} depends on this layer` : 'Economic dependency';
  }
}

function LayerDetail({ layer, onSource }: { layer: Layer; onSource: (id: string) => void }) {
  return <>
    <span className={styles.detailRole}>{roleName(layer)}</span>
    <h3>{layer.title}</h3>
    <p>{layer.description}</p>
    <div className={styles.risk}>
      <h4>What needs scrutiny</h4>
      <p>{layer.risk}</p>
    </div>
    <div className={styles.sources}>
      <h4>Evidence</h4>
      <SourceLinks ids={layer.sourceIds} onSource={onSource} />
    </div>
    <p className={styles.limit}>{layer.id === 'junior'
      ? 'Protection is finite. Junior capital is not another asset owned by this holder.'
      : layer.role === 'S'
        ? 'This shared control condition may affect several layers together.'
        : layer.role === 'R'
          ? 'This route is an alternative means of exit; it is not an underlying asset.'
          : 'Economic relationships are proposed analytical treatments.'} No layer score is issued.</p>
  </>;
}

export function DependencyView({ position, onSource, compact = false, number = '02' }: {
  position: Assessment; onSource: (id: string) => void; compact?: boolean; number?: string;
}) {
  const instanceId = useId();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(!compact);
  const primaryLayers = position.layers.filter(layer => layer.role === 'held' || layer.role === 'D');
  const visible = expanded ? primaryLayers : primaryLayers.filter(layer => !accountBranchIds.has(layer.id));
  const support = position.layers.filter(layer => (layer.role === 'S' || layer.role === 'R') && layer.id !== 'junior');
  const junior = position.layers.find(layer => layer.id === 'junior');
  const selected = position.layers.find(layer => layer.id === selectedId);
  const inspectorId = `${instanceId}-inspector`;

  function select(layer: Layer, button: HTMLButtonElement) {
    const opening = selectedId !== layer.id;
    setSelectedId(opening ? layer.id : null);
    // Keep the requested explanation next to the visible selection on narrow screens.
    // Focus stays on the disclosure button; the next Tab reaches its source links.
    if (opening && window.matchMedia(inlineInspectorQuery).matches) {
      requestAnimationFrame(() => button.scrollIntoView({ block: 'start', behavior: 'instant' }));
    }
  }

  function node(layer: Layer, index?: number) {
    const isSelected = layer.id === selectedId;
    const detailId = `${instanceId}-detail-${layer.id}`;
    return <>
      <button
        className={`layer-node ${styles.node} ${isSelected ? `selected ${styles.selected}` : ''}`}
        onClick={event => select(layer, event.currentTarget)}
        aria-expanded={isSelected}
        aria-controls={isSelected ? `${detailId} ${inspectorId}` : undefined}
      >
        {index !== undefined && <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>}
        <span className={styles.nodeCopy}>
          <strong>{layer.title}</strong>
          {(layer.role === 'held' || layer.role === 'D' || layer.id === 'junior') && <span>{layer.subtitle}</span>}
          {layer.id !== 'junior' && <small>{roleName(layer)}</small>}
        </span>
        <ChevronRight className={styles.desktopChevron} size={15} aria-hidden="true" />
        <ChevronDown className={`${styles.mobileChevron} ${isSelected ? styles.rotated : ''}`} size={15} aria-hidden="true" />
      </button>
      {isSelected && <div className={`${styles.detail} ${styles.inlineDetail}`} id={detailId}>
        <LayerDetail layer={layer} onSource={onSource} />
      </div>}
    </>;
  }

  function toggleBranches() {
    if (expanded && selectedId && accountBranchIds.has(selectedId)) setSelectedId(null);
    setExpanded(!expanded);
  }

  return <section className={`dependency-section ${styles.section}`}>
    <SectionHeading number={number} title="What you actually own">
      <button className="text-button" onClick={toggleBranches} aria-expanded={expanded} aria-controls={`${instanceId}-chain`}>
        {expanded ? 'Collapse account branches' : 'Show account branches'}
        <ChevronDown size={14} className={expanded ? styles.rotated : ''} aria-hidden="true" />
      </button>
    </SectionHeading>
    <p className="section-intro">Follow the held position down to its economic exposure. Select a layer for its role, risks and evidence.</p>
    <div className={styles.layout}>
      <div className={styles.stack} aria-label="Economic dependency layers" id={`${instanceId}-chain`}>
        {visible.map((layer, index) => <div key={layer.id} className={accountBranchIds.has(layer.id) ? styles.accountBranch : undefined}>
          {index > 0 && <div className={styles.connector}>
            {accountBranchIds.has(layer.id) ? <GitBranch size={13} aria-hidden="true" /> : <ArrowDown size={13} aria-hidden="true" />}
            <span>{relationship(layer, position)}</span>
          </div>}
          {node(layer, index)}
          {layer.id === 'senior' && junior && <div className={styles.protectionBranch}>
            <div className={styles.connector}><GitBranch size={13} aria-hidden="true" /><span>Supports srONyc: absorbs losses first</span></div>
            {node(junior)}
          </div>}
        </div>)}
        {!expanded && <p className={styles.branchSummary}>Account branches: reinsurance exposures and collateral assets. Current holdings and weights remain incomplete.</p>}
        {support.length > 0 && <div className={styles.support}>
          <h3>Controls and exit dependencies</h3>
          {support.map(layer => <div key={layer.id} className={styles.supportItem}>
            <p>{layer.role === 'R' ? 'Alternative exit for' : 'Shared controls affecting'} {position.layers.find(item => item.id === layer.parentId)?.title}</p>
            {node(layer)}
          </div>)}
        </div>}
      </div>
      <aside id={inspectorId} className={`${styles.detail} ${styles.desktopDetail}`} aria-label="Layer inspection" aria-live="polite">
        {selected ? <LayerDetail layer={selected} onSource={onSource} /> : <>
          <span className={styles.detailRole}>Layer inspection</span>
          <h3>Select a layer</h3>
          <p>Inspect what it contributes to this position, where uncertainty remains and which sources support the assessment.</p>
          <p className={styles.limit}>The main chain traces economic exposure. Separate branches identify first-loss support, shared controls and alternative exits.</p>
        </>}
      </aside>
    </div>
  </section>;
}
