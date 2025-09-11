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
      className="group flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:border-primary hover:-translate-y-1"
    >
      <div className="mb-2 p-3 bg-primary-light/20 rounded-full transition-colors group-hover:bg-primary-light/40">
        <Icon className="w-8 h-8 text-primary-dark transition-transform group-hover:scale-110" />
      </div>
      <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-dark">{name}</span>
    </button>
  );
};

export default CategoryCard;