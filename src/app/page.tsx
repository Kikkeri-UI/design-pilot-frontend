// src/app/page.tsx
'use client';

import TileComponent from "./components/generic/tile-component/tileComponent.UI";
import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="p-8">
      <div className="text-center my-16 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-success mb-4">
          AI-Powered UX Testing
        </h1>
        <p className="text-lg text-gray-400">
          Get meaningful and immediate design feedback from simulated users and AI, saving time and money on traditional user testing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16 max-w-5xl mx-auto">
        
        <TileComponent
          title="Get Generic Insights"
          description="Use this to leverage Chat gpt's powerful models to get generic insights broken down by key UX metrics."
          buttonTitle="Get Started"
          onClick={() => router.push('/input-method')}
          isComingSoon={false}
        />

        <TileComponent
          title="Simulate Your Users"
          description="Use this to simulate your target audiance and get insights from them"
          onClick={() => router.push('/simulate-user')}
          isComingSoon={true}
        />
      </div>
    </div>
  );
}