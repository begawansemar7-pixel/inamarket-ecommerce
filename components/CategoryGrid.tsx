import React from 'react';
import CategoryCard from './CategoryPill';
import { CATEGORIES_WITH_ICONS } from '../constants';

interface CategoryGridProps {
  onCategorySelect: (categoryName: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Kategori Pilihan</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4">
          {CATEGORIES_WITH_ICONS.map(category => (
            <CategoryCard 
              key={category.name} 
              name={category.name} 
              icon={category.icon}
              onClick={() => onCategorySelect(category.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
