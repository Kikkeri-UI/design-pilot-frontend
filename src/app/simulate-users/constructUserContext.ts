/**
 * This is a helper function to construct the user context to be supplied to
 * the backend. 
 */

type UserContext = {
    gender: "male" | "female" | string; // Allow string if you're not strictly enforcing 'male'/'female'
    ageRange: string;
    // CRITICAL: Change this from the single-choice to a string that holds the joined array
    vision: string; 
    digitalLiteracy: "beginner" | "advanced" | "intermediate" | string;
    extra_context: string;
}

export function  ConstructUserContext(userContext: UserContext) : string {
    return `The user is a ${userContext.gender} in the age range of ${userContext.ageRange}
        of ${userContext.digitalLiteracy} digital literacy and visually ${userContext.vision}. 
        The additional context and pain points to consider is ${userContext.extra_context}
    `
}