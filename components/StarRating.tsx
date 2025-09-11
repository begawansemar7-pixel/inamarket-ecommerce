import React from 'react';
import { StarIcon } from './icons/Icons';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'md', onRatingChange, interactive = false }) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleMouseEnter = (index: number) => {
    if (!interactive) return;
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    if (!interactive || !onRatingChange) return;
    onRatingChange(index);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((index) => {
        const fillPercentage = interactive
          ? (hoverRating || rating) >= index ? 100 : 0
          : Math.max(0, Math.min(1, rating - (index - 1))) * 100;
        
        return (
          <button
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
            className={`relative ${sizeClasses[size]} ${interactive ? 'cursor-pointer' : ''} text-gray-300`}
            disabled={!interactive}
            aria-label={`Rate ${index} star${index > 1 ? 's' : ''}`}
          >
            <StarIcon className="w-full h-full" />
            <div
              style={{ width: `${fillPercentage}%` }}
              className="absolute top-0 left-0 h-full overflow-hidden"
            >
              <StarIcon className="w-full h-full text-yellow-400" />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;