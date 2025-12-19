import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Longevity Score Calculator | Table d\'Adrian',
  description: 'Take the 2-minute science-backed longevity assessment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
