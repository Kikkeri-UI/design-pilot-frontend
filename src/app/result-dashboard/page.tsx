// src/app/results-dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResultTileComponent from '../components/generic/result-tile-component/resultTileComponent';
import { DesignCritiqueOutput, MetricsCritique } from './CriticqueTypes';
import { ChevronLeftIcon } from 'lucide-react';
import { mockCritiqueData } from './MockCriticqueData';

export default function ResultsDashboardPage() {
  const router = useRouter();
  
  // 2. INITIALIZE STATE WITH MOCK DATA
  const [critique, setCritique] = useState<DesignCritiqueOutput | null>(mockCritiqueData);
  const [loading, setLoading] = useState(false); // Set to false since data is local

  // 3. REMOVE useEffect FOR LOCAL STORAGE LOGIC
  /*
  useEffect(() => {
    // OLD: Local storage logic removed for mocking
  }, []);
  */

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-lg text-white">Loading results...</div>;
  }

  // Error handling is simplified since mock data is always present
  if (!critique) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-red-400 p-8">
        <p className="text-xl mb-6">Error: Mock data is missing.</p>
        {/* ... */}
      </div>
    );
  }

  return (
    // ... Rest of the component uses 'critique' state as before ...
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-12">
      <div className="max-w-7xl mx-auto py-8">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 flex items-center"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" /> Back to Input
        </button>

        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-blue-400">Design Critique Dashboard</h1>
        {/* ... */}

        {/* Overall Summary */}
        <div className="bg-gray-800 rounded-xl p-8 mb-10 shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">Overall Assessment</h2>
          <p className="text-gray-300 italic leading-relaxed">{critique.overall_summary}</p>
        </div>

        {/* Metrics Grid - Loops over the MetricsCritique object */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
          {Object.entries(critique.metrics_critique).map(([key, metric]) => (
            <ResultTileComponent 
              key={key} 
              metricName={key} 
              critiqueMetric={metric} 
            />
          ))}
        </div>

        {/* General Recommendations */}
        {critique.general_recommendations && critique.general_recommendations.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">General Recommendations</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-3">
              {critique.general_recommendations.map((rec, i) => (
                <li key={i} className="text-lg">{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}