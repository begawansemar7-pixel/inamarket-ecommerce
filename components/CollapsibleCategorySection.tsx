import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/Icons';

interface CollapsibleCategorySectionProps {
  title: string;
  children: React.ReactNode;
  bgColorClass?: string;
  defaultOpen?: boolean;
}

const CollapsibleCategorySection: React.FC<CollapsibleCategorySectionProps> = ({ title, children, bgColorClass = 'bg-white', defaultOpen = false }) => {
  // Di layar besar, selalu "terbuka". State hanya mengontrol tampilan mobile.
  const [isOpenOnMobile, setIsOpenOnMobile] = useState(defaultOpen);

  return (
    <section className={`py-8 ${bgColorClass}`}>
      <div className="container mx-auto px-4">
        {/* Mobile Toggle Header */}
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpenOnMobile(!isOpenOnMobile)}
                className="w-full flex justify-between items-center py-2"
                aria-expanded={isOpenOnMobile}
                aria-controls={`category-section-${title.replace(/\s+/g, '-')}`}
            >
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <ChevronDownIcon 
                    className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isOpenOnMobile ? 'transform rotate-180' : ''}`} 
                />
            </button>
        </div>

        {/* Desktop Title */}
        <h2 className="hidden lg:block text-2xl font-bold text-gray-800 mb-6">{title}</h2>
        
        {/* Content Wrapper for Mobile Collapse. `lg:block` ensures it's always visible on desktop. */}
        <div 
          id={`category-section-${title.replace(/\s+/g, '-')}`}
          className={`
            grid transition-all duration-500 ease-in-out lg:block
            ${isOpenOnMobile ? 'grid-rows-[1fr] opacity-100 mt-6 lg:mt-0' : 'grid-rows-[0fr] opacity-0'}
            lg:grid-rows-none lg:opacity-100
          `}
        >
          <div className="overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollapsibleCategorySection;