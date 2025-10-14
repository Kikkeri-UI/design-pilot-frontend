// test-by-figma page

/**
 * Page responsible for getting figma file link and PAT from the users. 
 */

'use client'

import InputHeaderComponent from "../components/generic/input-header-component/inputHeaderComponent.UI"
import InputFooterComponent from "../components/generic/input-footer/inputFooter.UI"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DesignCritiqueOutput } from "../result-dashboard/CriticqueTypes";
import FigmaInputSection from "../components/generic/figma-input-component/figmaInputComponent";

const TestByFigmaPage = () => {
    const [figmaFileUrl, setFigmaFileUrl] = useState("");
    const [figmaPat, setFigmaPat] = useState("");
    const [figmaNodeId, setFigmaNodeId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // NOTE: The InputFooterComponent is calling this function via onClickGenerate
        // If that button has type="submit", e.preventDefault() is still necessary
        e.preventDefault();

        // This is where the loader starts
        setIsSubmitting(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/figma-review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    figma_url: figmaFileUrl,
                    figma_pat: figmaPat,
                    figma_node: figmaNodeId,
                }),
            });

            if (response.ok) {
                const data: DesignCritiqueOutput = await response.json();
                console.log(data)

                localStorage.setItem('lastCritique', JSON.stringify(data));

                setFigmaFileUrl('');
                setFigmaPat('');
                setFigmaNodeId('');

                // Redirect to the dashboard
                router.push('/result-dashboard');
            } else {
                const errorDetail = await response.json().then(data => data.detail).catch(() => response.statusText);
                console.error('Figma critique failed:', errorDetail);
                alert(`Critique failed. Error: ${errorDetail}`);
            }
        } catch (error) {
            console.error('Error during Figma critique:', error);
            alert('A network error occurred. Ensure the FastAPI server is running at http://127.0.0.1:8000.');
        } finally {
            // This is where the loader stops
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-2 min-h-screen-minus-nav">
            <div className="text-container bg-gray-100 my-6 rounded-xl max-w-4xl w-full p-6 shadow-lg">
                <InputHeaderComponent
                    header="Figma-Based Review"
                    description="Enter your Figma file URL and Personal Access Token (PAT) to get an AI critique of your design. Suitable for high-fidelity prototypes."
                    model="GPT 4.0"
                />
            </div>

            <form onSubmit={handleFormSubmit} className="w-full max-w-4xl flex flex-col space-y-4 text-gray-100">

                <FigmaInputSection
                    figmaUrl={figmaFileUrl}
                    setFigmaUrl={setFigmaFileUrl}
                    figmaPat={figmaPat}
                    setFigmaPat={setFigmaPat}
                    figmaNodeId={figmaNodeId}
                    setFigmaNodeId={setFigmaNodeId}
                />


                {/* Footer Buttons */}
                <InputFooterComponent
                    onClickBack={() => router.push('/critique-method')}
                    isSubmitting={isSubmitting}
                    onClickGenerate={handleFormSubmit}
                />
            </form>
        </div>
    );
}

export default TestByFigmaPage;