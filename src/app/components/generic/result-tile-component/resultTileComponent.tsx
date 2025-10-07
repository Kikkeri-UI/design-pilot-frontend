import React from 'react';
import Accordion from '../accordion-component/accordionComponent';
import { CritiqueMetric } from './resultTileComponent.types';

interface ResultTileProps {
  critiqueMetric: CritiqueMetric;
  metricName: string;
}

const ResultTileComponent: React.FC<ResultTileProps> = ({ critiqueMetric, metricName }) => {
  // Use a simple function to map the score to a Tailwind color class
  const getScoreColor = (score: number): string => {
    if (score >= 4) {
      return 'text-green-500';
    } else if (score === 3) {
      return 'text-yellow-500';
    } else {
      return 'text-red-500';
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold capitalize">{metricName.replace(/_/g, ' ')}</h3>
        <span className={`text-2xl font-bold ${getScoreColor(critiqueMetric.score)}`}>
          {critiqueMetric.score}/5
        </span>
      </div>

      <Accordion header="Analysis" body={<p>{critiqueMetric.analysis}</p>} />
      
      <Accordion 
        header="Recommendations" 
        body={
          <ul>
            {critiqueMetric.recommendations.map((rec, index) => (
              <li key={index} className="list-disc ml-4 mb-1 text-gray-700">{rec}</li>
            ))}
          </ul>
        } 
      />
    </div>
  );
};

export default ResultTileComponent;