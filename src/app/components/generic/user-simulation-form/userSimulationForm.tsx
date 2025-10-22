'use client';

import React, { Dispatch, SetStateAction } from 'react';

interface UserSimulationFormProps {
    digitalLiteracy: string;
    setDigitalLiteracy: (value: string) => void;
    ageRange: string;
    setAgeRange: (value: string) => void;
    visionImpairments: string[];
    setVisionImpairments: Dispatch<SetStateAction<string[]>>;
    deviceUsed: string;
    setDeviceUsed: (value: string) => void;
    customContext: string;
    setCustomContext: (value: string) => void;
    isSubmitting: boolean;
}

const DIGITAL_LITERACY_OPTIONS = ["Beginner", "Intermediate", "Advanced"];
const AGE_RANGE_OPTIONS = ["18-25", "26-45", "46-64", "65+"];
const GENDER = ["Male", "Female"];
const VISION_IMPAIRMENT_OPTIONS = ["Color Blindness (General)", "Low Vision", "No Issues"];

const UserSimulationForm: React.FC<UserSimulationFormProps> = ({
    digitalLiteracy, setDigitalLiteracy,
    ageRange, setAgeRange,
    visionImpairments, setVisionImpairments,
    deviceUsed, setDeviceUsed,
    customContext, setCustomContext,
    isSubmitting
}) => {

    // Helper function for checkbox changes
    const handleVisionChange = (impairment: string, isChecked: boolean) => {
        setVisionImpairments(prev =>
            isChecked ? [...prev, impairment] : prev.filter(v => v !== impairment)
        );
    };

    const inputClass = isSubmitting
        ? 'border border-gray-300 rounded-lg w-full p-3 bg-gray-100 text-gray-500 cursor-not-allowed'
        : 'border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent transition duration-150 ease-in-out';

    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="w-full p-6 rounded-xl shadow-lg border-2 border-border space-y-6 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Target Audience Profile</h2>
            <p className="text-sm text-gray-600">
                Define the user persona for the most relevant AI critique.
            </p>

            {/* Grid for Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Gender */}
                <div>
                    <label htmlFor="device" className={labelClass}>Gender</label>
                    <select
                        id="device"
                        value={deviceUsed}
                        onChange={(e) => setDeviceUsed(e.target.value)}
                        disabled={isSubmitting}
                        className={inputClass}
                    >
                        {GENDER.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* Age Range */}
                <div>
                    <label htmlFor="age" className={labelClass}>Age Range</label>
                    <select
                        id="age"
                        value={ageRange}
                        onChange={(e) => setAgeRange(e.target.value)}
                        disabled={isSubmitting}
                        className={inputClass}
                    >
                        {AGE_RANGE_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* Digital Literacy */}
                <div>
                    <label htmlFor="literacy" className={labelClass}>Digital Literacy</label>
                    <select
                        id="literacy"
                        value={digitalLiteracy}
                        onChange={(e) => setDigitalLiteracy(e.target.value)}
                        disabled={isSubmitting}
                        className={inputClass}
                    >
                        {DIGITAL_LITERACY_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Vision Impairment Checkboxes */}
            <div className="pt-4 border-t">
                <p className={labelClass}>Accessibility Focus (Vision)</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                    {VISION_IMPAIRMENT_OPTIONS.map(opt => (
                        <label key={opt} className={`flex items-center text-sm ${isSubmitting ? 'text-gray-500 cursor-not-allowed' : 'text-gray-700'}`}>
                            <input
                                type="checkbox"
                                value={opt}
                                checked={visionImpairments.includes(opt)}
                                onChange={(e) => handleVisionChange(opt, e.target.checked)}
                                disabled={isSubmitting}
                                className="mr-2 h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            </div>

            {/* Additional Context (Textarea) */}
            <div className="pt-4 border-t">
                <label htmlFor="context" className={labelClass}>Additional Scenario Context (Optional)</label>
                <textarea
                    id="context"
                    placeholder="e.g., The user is a busy marketing manager trying to check analytics on a mobile device while commuting. Their primary goal is to find KPI data quickly."
                    rows={4}
                    value={customContext}
                    onChange={(e) => setCustomContext(e.target.value)}
                    disabled={isSubmitting}
                    className={`${inputClass} resize-y`}
                />
            </div>
        </div>
    );
};

export default UserSimulationForm;