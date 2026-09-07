import type { Assessment } from './assessments';

/** Display priority only; this does not change the assessment or its evidence states. */
const priorities: Record<Assessment['id'], string[]> = {
  onyc: ['claim', 'valuation', 'substance'],
  'pt-onyc': ['pt-settlement', 'valuation', 'pt-exit'],
  'pt-sronyc': ['waterfall', 'valuation', 'recovery'],
};

export const factorEvidence: Record<string, string> = {
  claim: 'legal', substance: 'portfolio', valuation: 'nav', exit: 'liquidity', controls: 'control', assurance: 'attestation',
  waterfall: 'tranche', recovery: 'tranche', 'pt-settlement': 'conversion', 'pt-exit': 'pt-liquidity', 'pt-control': 'exponent-control',
};

export const approvalSummary: Record<Assessment['id'], string> = {
  onyc: 'Holder rights, current reserves, NAV pricing and executable cash exit need verification.',
  'pt-onyc': 'Exact PT settlement, underlying loss transmission and size-specific cash exit need verification.',
  'pt-sronyc': 'Senior loss allocation, withdrawal availability and underlying NAV pricing need verification.',
};

export function prioritizedFactors(position: Assessment) {
  const ids = priorities[position.id];
  return [...ids.map(id => position.factors.find(factor => factor.id === id)!), ...position.factors.filter(factor => !ids.includes(factor.id))];
}
