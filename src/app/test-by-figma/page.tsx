/**
 * Page responsible for getting figma file link and PAT from the users. 
 */

'use client'

import InputHeaderComponent from "../components/generic/input-header-component/inputHeaderComponent.UI"
import InputFooterComponent from "../components/generic/input-footer/inputFooter.UI"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TestByFigmaPage = () => {
    const [figmaFileUrl, setFigmaFileUrl] = useState("");
    const [figmaPat, setFigmaPat] = useState("");
    const [figmaNodeId, setFigmaNodeId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    const handleFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // --- Your API call to the backend will go here ---
        // This is where you'll send figmaFileUrl, figmaPat, and figmaNodeId to your Next.js API route
        // Example (this is a placeholder for actual API call):
        // try {
        //     const response = await fetch('/api/critique-figma', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             figmaFileUrl,
        //             figmaPat,
        //             figmaNodeId,
        //         }),
        //     });
        //     if (response.ok) {
        //         const data = await response.json();
        //         console.log('Figma critique received:', data);
        //         router.push('/critique-results'); // Redirect to results page
        //     } else {
        //         console.error('Figma critique failed:', response.statusText);
        //         alert('Failed to get critique. Please check your URL and PAT.');
        //     }
        // } catch (error) {
        //     console.error('Error during Figma critique:', error);
        //     alert('An error occurred. Please try again.');
        // } finally {
        //     setIsSubmitting(false);
        // }

        // Simulate API call delay for demonstration
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        alert("Figma details submitted! (Simulated)");
        // Optional: Clear form after submission
        // setFigmaFileUrl('');
        // setFigmaPat('');
        // setFigmaNodeId('');
    }

    return (
        <div className="flex flex-col items-center justify-center p-2 min-h-screen-minus-nav">
            <div className="text-container bg-neutral my-6 rounded-lg max-w-4xl w-full p-6">
                <InputHeaderComponent
                    header="Figma-Based Review"
                    description="Enter your Figma file URL and Personal Access Token (PAT) to get an AI critique of your design. Suitable for high-fidelity prototypes."
                    model="GPT 4.0"
                />
            </div>

            <form onSubmit={handleFormSubmit} className="w-full max-w-4xl flex flex-col space-y-4">
                {/* Figma File URL Input */}
                <div className="w-full">
                    <label htmlFor="figma-url" className="block text-sm font-medium text-gray-800 mb-1">
                        Figma File URL
                    </label>
                    <input
                        id="figma-url"
                        type="url"
                        placeholder="e.g., https://www.figma.com/file/..."
                        value={figmaFileUrl!}
                        onChange={(e) => setFigmaFileUrl(e.target.value)}
                        required
                        className="border border-gray-700 bg-white rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Paste the full URL of your Figma file. Ensure it's accessible by your PAT (e.g., not restricted).
                    </p>
                </div>

                {/* Figma Personal Access Token (PAT) Input */}
                <div className="w-full">
                    <label htmlFor="figma-pat" className="block text-sm font-medium text-gray-800 mb-1">
                        Figma Personal Access Token (PAT)
                    </label>
                    <input
                        id="figma-pat"
                        type="password"
                        placeholder="e.g., figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        value={figmaPat!}
                        onChange={(e) => setFigmaPat(e.target.value)}
                        required
                        className="border border-gray-700 bg-white rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Generate a PAT in Figma: <a href="https://www.figma.com/developers/api#access-tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Settings &gt; Personal Access Tokens</a>. Your PAT is used only for this critique and is not stored.
                    </p>
                </div>

                {/* Optional Figma Node ID Input */}
                <div className="w-full">
                    <label htmlFor="figma-node-id" className="block text-sm font-medium text-gray-800 mb-1">
                        Specific Frame/Node ID (Optional)
                    </label>
                    <input
                        id="figma-node-id"
                        type="text"
                        placeholder="e.g., 123:456"
                        value={figmaNodeId!}
                        onChange={(e) => setFigmaNodeId(e.target.value)}
                        className="border border-gray-700 bg-white rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        (Optional) The ID of a specific frame, group, or component. Find it in the Figma URL after `node-id=`. If left blank, the AI will attempt to critique the entire canvas or first page.
                    </p>
                </div>

                {/* Footer Buttons */}
                <InputFooterComponent
                    onClickBack={() => router.push('/input-method')}
                    onClickGenerate={() => console.log("submitted")}
                />
            </form>
        </div>
    );
}

export default TestByFigmaPage;