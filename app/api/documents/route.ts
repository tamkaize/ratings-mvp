import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const documents = {
  methodology: { path: 'Token Risk Rating Methodology V0.3 alpha.md', filename: 'kurtosis-token-risk-methodology-v0.3-alpha.md' },
  research: { path: 'docs/research/README.md', filename: 'kurtosis-research-summary.md' },
  onyc: { path: 'docs/research/onyc-evidence.md', filename: 'kurtosis-onyc-evidence.md' },
  exponent: { path: 'docs/research/exponent-evidence.md', filename: 'kurtosis-exponent-evidence.md' },
  visualization: { path: 'docs/research/visualization-and-rating-rules.md', filename: 'kurtosis-visualization-and-rating-rules.md' },
  plan: { path: 'docs/mvp-design-plan.md', filename: 'kurtosis-mvp-design-plan.md' },
} as const;

function error(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message, supportedNames: Object.keys(documents) }), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const name = params.get('name');
  if (name === null || name === '') return error('Choose a document using the name parameter.', 400);
  if (!Object.hasOwn(documents, name)) return error('Research document not found.', 404);
  const document = documents[name as keyof typeof documents];

  try {
    // The user-supplied name only selects an allowlisted constant; it never forms a file path.
    const text = await readFile(path.resolve(process.cwd(), document.path), 'utf8');
    return new Response(text, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `${params.get('download') === '1' ? 'attachment' : 'inline'}; filename="${document.filename}"`,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return error('The selected research document is unavailable in this deployment.', 503);
  }
}
