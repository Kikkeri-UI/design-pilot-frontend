// src/app/layout.tsx
import './globals.css';
import React from 'react';

export const metadata = {
  title: 'AI-Powered UX Testing',
  description: 'Simulate user testing with AI to get instant design feedback.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 min-h-screen text-white">
        {children}
      </body>
    </html>
  );
}