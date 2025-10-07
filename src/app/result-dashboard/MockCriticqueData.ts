// src/data/mockCritique.ts
import { DesignCritiqueOutput } from "./CriticqueTypes";

export const mockCritiqueData: DesignCritiqueOutput = {
    "overall_summary": "The design presents a clean and modern aesthetic but lacks certain usability and accessibility considerations. While the visual design is appealing, improvements in navigation, error handling, and accessibility are needed to ensure a comprehensive user experience for all users.",
    "metrics_critique": {
        "usability_learnability": {
            "score": 3,
            "analysis": "The interface appears intuitive with clear labels, but first-time users might struggle with understanding some icons without accompanying text descriptions.",
            "recommendations": [
                "Add tooltips to icons to explain their function.",
                "Consider adding a brief tutorial or onboarding process for new users."
            ]
        },
        "usability_efficiency": {
            "score": 3,
            "analysis": "Experienced users might find the interface efficient due to its minimalist design, but the lack of shortcuts could hinder quick task performance.",
            "recommendations": [
                "Introduce keyboard shortcuts for power users.",
                "Streamline common task flows to reduce the number of actions required."
            ]
        },
        "usability_memorability": {
            "score": 4,
            "analysis": "Consistent design patterns and a straightforward layout aid in memorability, allowing users to quickly re-establish proficiency.",
            "recommendations": [
                "Ensure that updates to the interface maintain core patterns to preserve memorability."
            ]
        },
        "usability_errors": {
            "score": 2,
            "analysis": "The design lacks clear error prevention mechanisms and does not provide sufficient feedback for error states, which could confuse users.",
            "recommendations": [
                "Implement clear and concise error messages with guidance on recovery.",
                "Use visual indicators to prevent errors, such as real-time validation."
            ]
        },
        "usability_satisfaction": {
            "score": 4,
            "analysis": "The design is visually appealing and likely to evoke positive emotions, contributing to a satisfying user experience.",
            "recommendations": [
                "Maintain visual aesthetics while ensuring functional elements are not compromised."
            ]
        },
        "accessibility": {
            "score": 2,
            "analysis": "The current design does not adequately address accessibility needs, such as color contrast and text size.",
            "recommendations": [
                "Increase color contrast to meet WCAG standards.",
                "Ensure all text is resizable and legible.",
                "Provide alternative text for images and ensure focus states are visible."
            ]
        },
        "information_architecture": {
            "score": 3,
            "analysis": "Information is generally well-organized, but navigation could be clearer and more intuitive for users.",
            "recommendations": [
                "Simplify navigation by grouping similar functions together.",
                "Add a search function to improve findability."
            ]
        },
        "visual_design": {
            "score": 4,
            "analysis": "The design is aesthetically pleasing with a strong visual hierarchy, though consistency in spacing and alignment could be improved.",
            "recommendations": [
                "Ensure consistent spacing and alignment across all elements.",
                "Use typography to enhance readability and hierarchy."
            ]
        }
    },
    "general_recommendations": [
        "Conduct user testing to gather feedback on the design's usability and accessibility.",
        "Regularly update the design to align with best practices in UX and accessibility.",
        "Consider implementing a feedback mechanism for users to report issues or suggest improvements."
    ]
};