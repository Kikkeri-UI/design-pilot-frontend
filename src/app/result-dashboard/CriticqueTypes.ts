// src/types/critique.ts

// The detailed breakdown for a single metric
export interface CritiqueMetric {
  score: number;
  analysis: string;
  recommendations: string[];
}

// The dictionary structure for all metrics
export interface MetricsCritique {
  usability_learnability: CritiqueMetric;
  usability_efficiency: CritiqueMetric;
  usability_memorability: CritiqueMetric;
  usability_errors: CritiqueMetric;
  usability_satisfaction: CritiqueMetric;
  accessibility: CritiqueMetric;
  information_architecture: CritiqueMetric;
  visual_design: CritiqueMetric;
}

// The complete data structure from the FastAPI endpoint
export interface DesignCritiqueOutput {
  overall_summary: string;
  metrics_critique: MetricsCritique;
  general_recommendations: string[];
}