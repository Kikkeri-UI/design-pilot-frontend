// This component should be a Client Component since it handles state/input changes
'use client';

import React, { ChangeEvent } from 'react';

// Define the interface for the props it will receive
interface FigmaInputSectionProps {
    figmaUrl: string;
    setFigmaUrl: (value: string) => void;
    figmaPat: string;
    setFigmaPat: (value: string) => void;
    figmaNodeId: string;
    setFigmaNodeId: (value: string) => void;
}

const FigmaInputSection: React.FC<FigmaInputSectionProps> = ({
    figmaUrl,
    setFigmaUrl,
    figmaPat,
    setFigmaPat,
    figmaNodeId,
    setFigmaNodeId,
}) => {
    const inputClassName =
        'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out text-gray-600';

    const labelClassName = 'block text-sm font-medium text-gray-700 mb-1 mt-4';

    const handleInputChange = (
        setter: (value: string) => void
    ) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setter(e.target.value);
    };

    return (
        <>
            {/* Figma File URL Input */}
            <div className="w-full border-2 p-4 rounded-lg shadow-md">
                <label htmlFor="figma-url" className={labelClassName}>
                    Figma File URL
                </label>
                <input
                    id="figma-url"
                    type="url"
                    placeholder="e.g., https://www.figma.com/file/..."
                    value={figmaUrl}
                    onChange={handleInputChange(setFigmaUrl)}
                    required
                    //disabled={isSubmitting} // <-- DISABLED when submitting
                    className={inputClassName}
                />
                <p className="mt-1 text-xs text-gray-400">
                    Paste the full URL of your Figma file. Ensure it's accessible by your PAT (e.g., not restricted).
                </p>
            </div>

            {/* Figma Personal Access Token (PAT) Input */}
            <div className="w-full border-2 p-4 rounded-lg shadow-md">
                <label htmlFor="figma-pat" className={labelClassName}>
                    Figma Personal Access Token (PAT)
                </label>
                <input
                    id="figma-pat"
                    type="password"
                    placeholder="e.g., figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={figmaPat}
                    onChange={handleInputChange(setFigmaPat)}
                    required
                    //disabled={isSubmitting} // <-- DISABLED when submitting
                    className={inputClassName}
                />
                <p className="mt-1 text-xs text-gray-400">
                    Generate a PAT in Figma: <a href="https://www.figma.com/developers/api#access-tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Settings &gt; Personal Access Tokens</a>. Your PAT is used only for this critique and is not stored.
                </p>
            </div>

            {/* Optional Figma Node ID Input */}
            <div className="w-full border-2 p-4 rounded-lg shadow-md">
                <label htmlFor="figma-node-id" className={labelClassName}>
                    Specific Frame/Node ID (Optional)
                </label>
                <input
                    id="figma-node-id"
                    type="text"
                    placeholder="e.g., 123:456"
                    value={figmaNodeId}
                    onChange={handleInputChange(setFigmaNodeId)}
                    //disabled={isSubmitting} // <-- DISABLED when submitting
                   className={inputClassName}
                />
                <p className="mt-1 text-xs text-gray-400">
                    (Optional) The ID of a specific frame, group, or component. Find it in the Figma URL after `node-id=`. If left blank, the AI will attempt to critique the selection or entire page.
                </p>
            </div>
        </>
    );
};

export default FigmaInputSection;