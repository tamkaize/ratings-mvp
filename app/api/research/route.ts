import onyc from '../../../data/research/onyc-evidence.json';
import exponent from '../../../data/research/exponent-evidence.json';
import { validateResearchData } from '../../../lib/assessment-rules';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function json(body: unknown, status = 200, download = false): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...(download ? { 'Content-Disposition': 'attachment; filename="kurtosis-source-research-packets.json"' } : {}),
    },
  });
}

export function GET(request: Request): Response {
  try {
    const errors = validateResearchData();
    if (errors.length > 0) return json({ error: 'Research-data validation failed. The combined research packet is unavailable.', details: errors }, 500);
    if (onyc.schema_version !== 'research-packet-1.0' || exponent.schema_version !== 'research-evidence.v1') {
      return json({ error: 'Unsupported source packet version. A reviewed research-data migration is required.' }, 500);
    }
    const download = new URL(request.url).searchParams.get('download') === '1';
    return json({
      schemaVersion: 'kurtosis.research-bundle.v1',
      dataKind: 'research_evidence_bundle',
      metadata: {
        researchDate: '2026-09-08',
        researchTimezone: 'Asia/Singapore',
        methodologyVersion: 'v0.3-alpha',
        methodologyApproval: 'pending',
        approvalDisposition: 'NO_RATE',
        live: false,
        sourceObservationDates: [onyc.observed_at, exponent.observed_at],
        disclaimer: 'These source research packets are not complete canonical rating records or approved investment ratings. They retain publisher claims, unverified observations, assumptions and evidence gaps. All three MVP assessments remain NO_RATE. Raw APY, NAV, liquidity and protection observations must be interpreted using their stated basis and limitations; they are not independently verified current prices, executable quotes or promised returns.',
      },
      packets: { onyc, exponent },
    }, 200, download);
  } catch {
    return json({ error: 'Source research could not be validated or loaded. No approved rating is available.' }, 500);
  }
}
