// src/app/test-by-text/page.tsx
'use client';

import InputHeaderComponent from "../components/generic/input-header-component/inputHeaderComponent.UI";
import { Button } from "../components/generic/button-component/Button.UI";
import React, { useState } from "react";

export default function TestByTextPage() {
    const [designIdea, setDesignIdea] = useState("");

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting design idea:", designIdea);
        // Here you would call your API route to get the critique
    };

    return (
        // The parent container centers everything
        <div className="flex flex-col items-center justify-center p-2">
            <div className="text-container bg-neutral my-6 rounded-lg max-w-4xl w-full">
                <InputHeaderComponent
                    header="Text-Based Review"
                    description="Describe your design idea as specifically as possible. For better results, break it into the smallest possible fragments and provide as much information as possible.
                    This is suitable when you are still in your ideation phase and need insights on rough thoughts before proceeding."
                    model="GPT 3.5"
                />
            </div>

            <form onSubmit={handleFormSubmit} className="w-full max-w-4xl">
                <textarea
                    placeholder="Please type your design idea here."
                    value={designIdea}
                    onChange={(e) => setDesignIdea(e.target.value)}
                    className="border border-gray-700 rounded-lg w-full max-h-64 h-56 p-6 overflow-y-auto resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <div className="flex justify-between mt-4">
                    <Button type="submit" variant="secondary" size="lg" title="Back">
                        Go Back
                    </Button>
                    <Button type="submit" variant="primary" size="lg" title="Get Insights">
                        Get Insights
                    </Button>
                </div>
            </form>
        </div>
    );
}