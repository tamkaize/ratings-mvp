import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kurtosis Ratings — Position research',
  description: 'Source-backed assessments of ONyc, PT-ONyc and PT-srONyc. Inspect the position, its dependencies and the evidence behind it.',
  icons: { icon: '/kurtosis-mark.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
