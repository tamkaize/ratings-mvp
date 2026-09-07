'use client';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="loading-state"><p>Kurtosis Ratings</p><h1>Assessment data could not be loaded.</h1><p>The research record failed to load or validate. No rating is being inferred from the unavailable data.</p><button className="button primary" onClick={reset}>Try loading again</button></main>;
}
