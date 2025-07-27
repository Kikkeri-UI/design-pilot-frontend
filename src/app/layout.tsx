// src/app/layout.tsx
import Navbar from './components/generic/navbar-component/navBar.UI';
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}