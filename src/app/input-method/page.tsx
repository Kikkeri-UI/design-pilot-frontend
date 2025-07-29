/**
 * This page provides users with 3 tiles to choose their preferred method for testing. 
 */

// src/app/page.tsx
'use client';

import TileComponent from "../components/generic/tile-component/tileComponent.UI";
import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="p-8">
            <div className="text-center my-16 max-w-2xl mx-auto">
                <p className="text-xl text-gray-700">
                    Choose the preferred way for your testing.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16 max-w-5xl mx-auto">
                {/** Text based tile */}
                <TileComponent
                    title="Text-Based"
                    description="Describe your idea precisely for a detailed response."
                    onClick={() => router.push('/test-by-text')}
                />

                {/** Image based tile */}
                <TileComponent
                    title="Image-Based"
                    description="Provide a screenshot of your design for a visual-based critique."
                    onClick={() => router.push('/test-by-image')}
                />

                {/** Figma tile */}
                <TileComponent
                    title="Figma link"
                    description="Connect your Figma file for an in-depth design system analysis."
                    onClick={() => router.push('/test-by-figma')}
                />
            </div>
        </div>
    );
}