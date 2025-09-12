import React, { useState, ReactNode } from 'react';
import { ChevronDownIcon } from './icons/Icons';

interface FilterAccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  isActive?: boolean;
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({ title, children, defaultOpen = false, isActive = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <h3 className="text-md font-semibold text-gray-800">{title}</h3>
          {isActive && (
            <span className="w-2 h-2 bg-primary rounded-full ml-2 animate-scale-in"></span>
          )}
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FilterAccordion;