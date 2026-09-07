import { RatingsWorkspace } from '@/components/ratings-workspace';
import { validateResearchData } from '@/lib/assessment-rules';

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const errors = validateResearchData();
  if (errors.length) throw new Error(`Research data validation failed: ${errors.join('; ')}`);
  const params = await searchParams;
  return <RatingsWorkspace initialPosition={typeof params.position === 'string' ? params.position : 'pt-sronyc'} initialView={typeof params.view === 'string' ? params.view : 'ratings'} initialTab={typeof params.tab === 'string' ? params.tab : 'overview'} />;
}
