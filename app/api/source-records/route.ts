import { getSourceRecord } from '../../../lib/source-observations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET(request: Request): Response {
  const params = new URL(request.url).searchParams;
  const id = params.get('id');
  const record = id ? getSourceRecord(id) : undefined;
  const status = !id ? 400 : record ? 200 : 404;
  const body = record ?? { error: id ? 'Source record not found.' : 'A source ID is required.' };
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...(record && params.get('download') === '1' ? { 'Content-Disposition': `attachment; filename="kurtosis-source-${record.source.id}.json"` } : {}),
    },
  });
}
