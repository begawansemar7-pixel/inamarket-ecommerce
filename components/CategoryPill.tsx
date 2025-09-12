import React from 'react';

interface CategoryCardProps {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-4 bg-white rounded-xl text-center transition-all duration-300 ease-in-out hover:bg-teal-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{ minHeight: '130px' }} // Ensure uniform height
    >
      <div className="flex items-center justify-center w-16 h-16 mb-3 bg-gray-100 rounded-full transition-colors duration-300 group-hover:bg-primary-light/30">
        <Icon className="w-8 h-8 text-gray-600 transition-colors duration-300 group-hover:text-primary-dark" />
      </div>
      <span className="text-sm font-semibold text-gray-700 leading-tight transition-colors duration-300 group-hover:text-primary-dark">{name}</span>
    </button>
  );
};

export default CategoryCard;