
import React from 'react';

interface CategoryPillProps {
  name: string;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ name }) => {
  return (
    <button className="bg-primary-light/20 text-primary-dark font-semibold px-4 py-2 rounded-full text-sm hover:bg-primary-light/40 hover:text-primary-darker transition-colors">
      {name}
    </button>
  );
};

export default CategoryPill;
