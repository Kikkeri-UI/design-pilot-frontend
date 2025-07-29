// src/app/test-by-screenshot/page.tsx
'use client'; // This is a client component

import InputFooterComponent from "../components/generic/input-footer/inputFooter.UI";
import InputHeaderComponent from "../components/generic/input-header-component/inputHeaderComponent.UI";
import React, { useState, useRef, useEffect } from "react"; // Import useRef and useEffect
import { useRouter } from "next/navigation";

export default function TestByImagePage() { // Renamed for clarity in App Router convention
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // State for loading indicator
    const fileInputRef = useRef<HTMLInputElement>(null); // Ref to clear file input

    // Effect to create and revoke object URL for image preview
    useEffect(() => {
        if(selectedFile){
            const objectUrl = URL.createObjectURL(selectedFile);
            setImagePreviewUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl)
        }
        else{
            setImagePreviewUrl(null)
        }
    },[selectedFile])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select an image to upload.");
            return;
        }

        setIsSubmitting(true);
        console.log("Submitting image:", selectedFile.name);

        // In a real application, you would create FormData and send it to your API:
        // const formData = new FormData();
        // formData.append("image", selectedFile);
        // formData.append("model", "GPT 4.0"); // Or get from InputHeaderComponent props if it becomes dynamic

        // try {
        //     const response = await fetch("/api/critique-image", { // Your API endpoint
        //         method: "POST",
        //         body: formData,
        //     });
        //     if (response.ok) {
        //         const data = await response.json();
        //         console.log("Image critique received:", data);
        //         // Redirect to results page or display data
        //         router.push('/critique-results'); // Example redirection
        //     } else {
        //         console.error("Image upload failed:", response.statusText);
        //         alert("Failed to get critique. Please try again.");
        //     }
        // } catch (error) {
        //     console.error("Error during image upload:", error);
        //     alert("An error occurred. Please try again.");
        // } finally {
        //     setIsSubmitting(false);
        // }

        // Simulate API call delay for demonstration
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        alert("Image submitted for critique! (Simulated)");
        // Optional: Clear the selected file after submission
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input visually
        }
    };

    // const handleGoBack = () => {
    //     router.push('/critique-method');
    // };

    return (
        <div className="flex flex-col items-center justify-center p-2 min-h-screen-minus-nav"> {/* Added min-h-screen-minus-nav */}
            <div className="text-container bg-neutral my-6 rounded-lg max-w-4xl w-full">
                <InputHeaderComponent
                    header="Image-Based Review"
                    description="Upload a screenshot or an image of your design to get insights on it. Suitable for low-fidelity prototypes."
                    model="GPT 4.0"
                />
            </div>

            <form onSubmit={handleFormSubmit} className="w-full max-w-4xl flex flex-col"> 
                {/* Image Upload Area */}
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center border border-dashed border-gray-600 rounded-lg w-full h-56 cursor-pointer hover:border-blue-500 transition-colors">
                    {imagePreviewUrl ? (
                        <img src={imagePreviewUrl} alt="Selected Preview" className="max-h-full max-w-full object-contain rounded-lg" />
                    ) : (
                        <div className="text-center text-gray-400">
                            <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L40 32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="mt-1 text-sm text-gray-400">Drag and drop or <span className="font-semibold text-blue-400">click to upload</span></p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    )}
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*" // Accept only image files
                        onChange={handleFileChange}
                        className="sr-only" // Visually hide the input but keep it accessible
                        ref={fileInputRef}
                    />
                </label>
                
                {/* File name display and clear button */}
                {selectedFile && (
                    <div className="mt-3 text-sm text-gray-400 flex items-center space-x-2">
                        <span>Selected: {selectedFile.name}</span>
                        <button
                            type="button"
                            onClick={() => { setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                            className="text-danger hover:text-red-500"
                            title="Clear selected image"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                )}

                <InputFooterComponent
                    onClickBack={() => router.push('/input-method')}
                    onClickGenerate={() => router.push('/generate-insights')}
                />
            </form>
        </div>
    );
}