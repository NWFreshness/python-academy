import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Python Academy',
  description: 'A browser-based Python learning lab with runnable lessons.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
