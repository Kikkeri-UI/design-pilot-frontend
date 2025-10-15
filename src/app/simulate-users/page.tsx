// src/app/simulate-user/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Import the shared Figma input component
import FigmaInputSection from '../components/generic/figma-input-component/figmaInputComponent';
// Import the corrected User Simulation Form
import UserSimulationForm from '../components/generic/user-simulation-form/userSimulationForm';
import InputHeaderComponent from '../components/generic/input-header-component/inputHeaderComponent.UI';
import InputFooterComponent from '../components/generic/input-footer/inputFooter.UI';

export default function SimulateUserPage() {
    const router = useRouter();

    // State for Figma Inputs (reused from the other page)
    const [figmaUrl, setFigmaUrl] = useState('');
    const [figmaPat, setFigmaPat] = useState('');
    const [figmaNodeId, setFigmaNodeId] = useState('');

    // State for the NEW User Persona Inputs
    const [digitalLiteracy, setDigitalLiteracy] = useState("Intermediate");
    const [ageRange, setAgeRange] = useState("26-45");
    const [visionImpairments, setVisionImpairments] = useState<string[]>([]); // Checkboxes
    const [deviceUsed, setDeviceUsed] = useState("Desktop");
    const [customContext, setCustomContext] = useState(""); // Additional text field

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [critiqueResult, setCritiqueResult] = useState<any>(null); // State for results/loading

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!figmaUrl || !figmaPat) {
            alert('Figma URL and Personal Access Token (PAT) are required.');
            return;
        }

        setIsSubmitting(true);
        setCritiqueResult(null);

        // 1. Construct the detailed user_context string for the AI model
        const userContext = `
      Critique the design from the perspective of a user with the following profile:
      - Age Range: ${ageRange}
      - Digital Literacy: ${digitalLiteracy}
      - Primary Device: ${deviceUsed}
      - Accessibility Needs: ${visionImpairments.length > 0 ? visionImpairments.join(', ') : 'None specified'}
      - **Specific Scenario/Goal:** ${customContext || 'No additional context provided.'}
    `.trim();

        // 2. Construct the combined payload for the backend
        const payload = {
            figma_url: figmaUrl,
            figma_pat: figmaPat,
            figma_node: figmaNodeId,
            user_context: userContext, // <-- The detailed context string
        };

        console.log('User Simulation Request Payload:', payload);

        // --- API Call Integration (Placeholder) ---
        /*
        try {
          // NOTE: Update this URL to your correct FastAPI endpoint for user simulation
          const response = await fetch('/api/simulate-user-critique', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
    
          if (response.ok) {
              const data = await response.json();
              localStorage.setItem('lastCritique', JSON.stringify(data));
              router.push('/results-dashboard'); // Navigate to results page
          } else {
              throw new Error('Critique failed to process.');
          }
        } catch (error) {
          console.error("Submission Error:", error);
          setCritiqueResult({ error: 'An error occurred during the critique.' });
        } finally {
          setIsSubmitting(false);
        }
        */

        // For now, simulating a successful submission:
        setTimeout(() => {
            setIsSubmitting(false);
            setCritiqueResult({ success: 'Simulated User Critique Initiated! Check console for detailed user_context payload.' });
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="text-container bg-gray-100 my-6 rounded-xl max-w-4xl w-full p-6 shadow-lg">
                <InputHeaderComponent
                    header="Simulate User Experience Critique"
                    description="Get an AI critique based on a specific user persona interacting with your design."
                    model="GPT 4.0"
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">


                {/* Section 2: Figma Design Details (Reusable Component) */}
                <FigmaInputSection
                    figmaUrl={figmaUrl}
                    setFigmaUrl={setFigmaUrl}
                    figmaPat={figmaPat}
                    setFigmaPat={setFigmaPat}
                    figmaNodeId={figmaNodeId}
                    setFigmaNodeId={setFigmaNodeId}
                // Assuming FigmaInputSection takes isSubmitting if you implemented it that way
                // isSubmitting={isSubmitting} 
                />

                {/* Section 1: User Persona Details (Modular Component) */}
                <UserSimulationForm
                    digitalLiteracy={digitalLiteracy} setDigitalLiteracy={setDigitalLiteracy}
                    ageRange={ageRange} setAgeRange={setAgeRange}
                    visionImpairments={visionImpairments} setVisionImpairments={setVisionImpairments}
                    deviceUsed={deviceUsed} setDeviceUsed={setDeviceUsed}
                    customContext={customContext} setCustomContext={setCustomContext}
                    isSubmitting={isSubmitting}
                />

                {/* Submit Button */}
                <InputFooterComponent
                    onClickBack={() => router.push('/critique-method')}
                    isSubmitting={isSubmitting}
                    onClickGenerate={handleSubmit}
                />
            </form>

            {/* Display Results or Loading */}
            {isSubmitting && <p className="text-center mt-6 text-accent">Processing critique...</p>}
            {critiqueResult && critiqueResult.success && (
                <p className="text-center mt-6 text-success font-medium">{critiqueResult.success}</p>
            )}
            {critiqueResult && critiqueResult.error && (
                <p className="text-center mt-6 text-danger font-medium">{critiqueResult.error}</p>
            )}
        </div>
    );
}