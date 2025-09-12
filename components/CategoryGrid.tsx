import React, { useState } from 'react';
import CategoryCard from './CategoryPill';
import { EllipsisHorizontalIcon } from './icons/Icons';

interface Category {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect: (categoryName: string) => void;
}

const INITIAL_VISIBLE_COUNT = 7; // Menampilkan 7 kategori + 1 tombol "Lainnya"

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategorySelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleCategories = isExpanded ? categories : categories.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-7">
      {visibleCategories.map(category => (
        <CategoryCard 
          key={category.name} 
          name={category.name} 
          icon={category.icon}
          onClick={() => onCategorySelect(category.name)}
        />
      ))}

      {!isExpanded && categories.length > INITIAL_VISIBLE_COUNT && (
        <CategoryCard
          name="Lainnya"
          icon={EllipsisHorizontalIcon}
          onClick={() => setIsExpanded(true)}
        />
      )}
    </div>
  );
};

export default CategoryGrid;