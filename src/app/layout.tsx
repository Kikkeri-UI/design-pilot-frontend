// src/app/layout.tsx
import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Design Pilot',
  description: 'Simulate user testing with AI to get instant design feedback.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white min-h-scree">
        {children}
      </body>
    </html>
  );
}