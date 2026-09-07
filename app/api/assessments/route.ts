import { assessments, getAssessment, sources } from '../../../lib/assessments';
import { validateResearchData } from '../../../lib/assessment-rules';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const disclaimer = 'This is an assessment research read model, not a complete canonical rating record or an approved investment rating. All three assessments remain NO_RATE. No indicated or approved scores have been calculated. The evidence is a dated snapshot, not live market data.';

function json(body: unknown, status = 200, filename?: string): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...(filename ? { 'Content-Disposition': `attachment; filename="${filename}"` } : {}),
    },
  });
}

export function GET(request: Request): Response {
  try {
    const errors = validateResearchData();
    if (errors.length > 0) {
      return json({ error: 'Assessment research validation failed. The snapshot cannot be served as valid research data.', details: errors }, 500);
    }

    const params = new URL(request.url).searchParams;
    const download = params.get('download') === '1';
    const metadata = {
      researchDate: '2026-09-08',
      researchTimezone: 'Asia/Singapore',
      methodologyVersion: 'v0.3-alpha',
      methodologyApproval: 'pending',
      approvalDisposition: 'NO_RATE',
      live: false,
      sourceObservationDates: [...new Set(sources.map((source) => source.observedAt))],
      observationNote: 'Source dates identify retrieval or observation, not a verified market-state timestamp. Consult each source limitation.',
      disclaimer,
    };
    const envelope = {
      schemaVersion: 'kurtosis.assessment-read-model.v1',
      dataKind: 'assessment_read_model',
      metadata,
    };

    if (params.has('id')) {
      const assessment = getAssessment(params.get('id') ?? '');
      if (!assessment) return json({ error: 'Assessment not found.', supportedIds: assessments.map((item) => item.id) }, 404);
      const usedSources = new Set(assessment.sourceIds);
      const selectedSources = sources.filter((source) => usedSources.has(source.id));
      return json({
        ...envelope,
        metadata: { ...metadata, sourceObservationDates: [...new Set(selectedSources.map((source) => source.observedAt))] },
        assessment,
        sources: selectedSources,
      }, 200, download ? `kurtosis-${assessment.id}-assessment-research.json` : undefined);
    }

    return json({ ...envelope, assessments, sources }, 200, download ? 'kurtosis-assessments-research.json' : undefined);
  } catch {
    return json({ error: 'Assessment research could not be validated or loaded. No rating result is available.' }, 500);
  }
}
