// src/app/results-dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResultTileComponent from '../components/generic/result-tile-component/resultTileComponent'; 
import { DesignCritiqueOutput, MetricsCritique } from './CriticqueTypes'; 
import { ChevronLeftIcon } from 'lucide-react'; 

export default function ResultsDashboardPage() {
  const router = useRouter();
  
  // 1. INITIALIZE STATE TO NULL and LOADING TO TRUE
  const [critique, setCritique] = useState<DesignCritiqueOutput | null>(null);
  const [loading, setLoading] = useState(true); // Start as loading
  const [error, setError] = useState<string | null>(null);

  // 2. RE-INTRODUCE useEffect FOR LOCAL STORAGE LOGIC
  useEffect(() => {
    // Attempt to retrieve critique data from local storage
    const storedCritique = localStorage.getItem('lastCritique');
    
    if (storedCritique) {
      try {
        const parsedCritique: DesignCritiqueOutput = JSON.parse(storedCritique);
        setCritique(parsedCritique);
      } catch (e) {
        console.error("Failed to parse stored critique:", e);
        setError("Failed to load critique data. The saved data may be corrupted.");
      }
    } else {
      // If nothing is found in local storage
      setError("No recent critique found. Please run a critique from the input page first.");
    }
    
    // Once we've checked local storage, set loading to false
    setLoading(false);
  }, []);

  // 3. Update Loading State UI
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-black bg-white">
        Loading critique results...
      </div>
    );
  }

  // 4. Update Error Handling for Missing/Corrupt Data
  if (error || !critique) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-error bg-white p-8">
        <p className="text-xl mb-6">{error || "Critique data is missing."}</p>
        <button
          onClick={() => router.push('/critique-method')} // Route back to selection page
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" /> Start New Critique
        </button>
      </div>
    );
  }

  // 5. Final Render with Real Data
  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-12">
      <div className="max-w-7xl mx-auto py-8">
        
        {/* Back Button (Re-enabled for good UX)
        <button
          onClick={() => router.back()}
          className="mb-8 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200 flex items-center text-gray-800"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" /> Back to Input
        </button> */}

        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-green-600">Design Critique Dashboard</h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Review the AI's breakdown across all key UX and Usability metrics.
        </p>

        {/* Overall Summary */}
        <div className="bg-gray-100 rounded-xl p-8 mb-10 shadow-lg border border-gray-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Overall Assessment</h2>
          <p className="text-gray-600 italic leading-relaxed">{critique.overall_summary}</p>
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
          <div className="bg-gray-100 rounded-xl p-8 shadow-lg border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">General Recommendations</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-3">
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