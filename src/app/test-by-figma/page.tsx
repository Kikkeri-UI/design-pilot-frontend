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

const TestByFigmaPage = () => {
    const [figmaFileUrl, setFigmaFileUrl] = useState("");
    const [figmaPat, setFigmaPat] = useState("");
    const [figmaNodeId, setFigmaNodeId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    const handleFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
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
                
                {/* Figma File URL Input */}
                <div className="w-full border-2 p-4 rounded-lg shadow-md">
                    <label htmlFor="figma-url" className="block text-sm font-medium text-gray-600 mb-1">
                        Figma File URL
                    </label>
                    <input
                        id="figma-url"
                        type="url"
                        placeholder="e.g., https://www.figma.com/file/..."
                        value={figmaFileUrl}
                        onChange={(e) => setFigmaFileUrl(e.target.value)}
                        required
                        disabled={isSubmitting} // <-- DISABLED when submitting
                        className={`border border-border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-600'}`}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Paste the full URL of your Figma file. Ensure it's accessible by your PAT (e.g., not restricted).
                    </p>
                </div>

                {/* Figma Personal Access Token (PAT) Input */}
                <div className="w-full border-2 p-4 rounded-lg shadow-md">
                    <label htmlFor="figma-pat" className="block text-sm font-medium text-gray-600 mb-1">
                        Figma Personal Access Token (PAT)
                    </label>
                    <input
                        id="figma-pat"
                        type="password"
                        placeholder="e.g., figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        value={figmaPat}
                        onChange={(e) => setFigmaPat(e.target.value)}
                        required
                        disabled={isSubmitting} // <-- DISABLED when submitting
                        className={`border border-border text-gray-600 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-600'}`}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Generate a PAT in Figma: <a href="https://www.figma.com/developers/api#access-tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Settings &gt; Personal Access Tokens</a>. Your PAT is used only for this critique and is not stored.
                    </p>
                </div>

                {/* Optional Figma Node ID Input */}
                <div className="w-full border-2 p-4 rounded-lg shadow-md">
                    <label htmlFor="figma-node-id" className="block text-sm font-medium text-gray-600 mb-1">
                        Specific Frame/Node ID (Optional)
                    </label>
                    <input
                        id="figma-node-id"
                        type="text"
                        placeholder="e.g., 123:456"
                        value={figmaNodeId}
                        onChange={(e) => setFigmaNodeId(e.target.value)}
                        disabled={isSubmitting} // <-- DISABLED when submitting
                        className={`border border-border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-600'}`}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        (Optional) The ID of a specific frame, group, or component. Find it in the Figma URL after `node-id=`. If left blank, the AI will attempt to critique the selection or entire page.
                    </p>
                </div>

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