Title: AI Design Pilot — Frontend Architecture
Description:
The frontend for an AI-driven design auditor that reviews Figma designs using UX heuristics. This application provides real-time, actionable feedback by bridging generative AI insights with a high-performance React interface.

Key Technical Features:

Modern Stack: Built with Next.js 14, TypeScript, and Tailwind CSS.

State Management: Optimized UI state for real-time AI streaming responses.

Visual Feedback Engine: Interactive UI components that visualize UX "scores" and heuristic violations.

API Integration: Seamlessly consumes FastAPI endpoints with robust error handling and loading states.

UX Focused: Implements a clean, "industrial-grade" dashboard design consistent with senior-level product thinking.

Core Workflow:

Input: User provides Figma design context or screenshots.

Processing: Frontend communicates with the Python/FastAPI backend to trigger the GPT-4 Vision/LLM analysis.

Visualization: Displays a detailed critique based on 10 Usability Heuristics.

Installation & Setup:

Bash
# Install dependencies
npm install

# Run the development server
npm run dev
Testing:
