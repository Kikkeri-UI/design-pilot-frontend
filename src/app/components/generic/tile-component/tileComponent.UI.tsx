'use client';

import { TileProps } from "./tileComponent.types";
import React from "react";

const TileComponent: React.FC<TileProps> = ({ title, description, onClick, buttonTitle = "Get Started", isComingSoon = false }) => {
    return (
        <button
            className={`tile border ${isComingSoon ? `opacity-50 pointer-events-none cursor-not-allowed` : `opacity-100`} border-2 border-accent bg-transparent p-6 flex flex-col items-start text-left rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={onClick}
        >
            <div className="title font-heading text-xl font-semibold text-black mb-2">
                {title}
            </div>
            <div className="description font-sans text-base text-gray-400">
                {description}
            </div>
            <div className="mt-auto pt-4 w-full">
                <div className="bg-white text-primary border border-black font-medium py-2 px-4 rounded-lg text-center">
                    {isComingSoon ? "Coming Soon.." : `${buttonTitle}`}
                </div>
            </div>
        </button>
    );
};

export default TileComponent;