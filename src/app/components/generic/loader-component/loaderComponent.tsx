/**
 * Loader component to keep users notified.
 */

// src/components/common/Loader.tsx
'use client'; // This component will be rendered conditionally in client components

import React from 'react';
import { LoaderTypes } from './loaderTypes';

const Loader: React.FC<LoaderTypes> = ({ message = "Loading...", fullScreen = false }) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
    : "flex flex-col items-center justify-center"; 

  return (
    <div className={containerClasses}>
      {/* Spinner Icon (Simple Tailwind CSS spinner) */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      
      {/* Optional Message */}
      <p className="mt-4 text-white text-lg">{message}</p>
    </div>
  );
};

export default Loader;