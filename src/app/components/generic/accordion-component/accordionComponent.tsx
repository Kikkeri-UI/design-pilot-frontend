import React, { useState, ReactNode } from 'react';

// Define the shape of the props using TypeScript
interface AccordionProps {
  header: string;
  body: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ header, body }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-black rounded-md mb-2 bg-white overflow-hidden">
      <div
        className="flex justify-between items-center p-3 cursor-pointer select-none"
        onClick={toggleAccordion}
      >
        <div className="font-bold">{header}</div>
        <div className="text-2xl font-bold transition-transform duration-300 transform">
          {isExpanded ? '−' : '+'}
        </div>
      </div>
      {isExpanded && (
        <div className="p-3 border-t border-black animate-accordion-down">
          {body}
        </div>
      )}
    </div>
  );
};

export default Accordion;