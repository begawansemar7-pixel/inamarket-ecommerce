import React, { useMemo } from 'react';
import { Review, Product } from '../types';
import StarRating from './StarRating';
import { UserCircleIcon } from './icons/Icons';

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
}

const RatingBar: React.FC<{ star: number; percentage: number; count: number }> = ({ star, percentage, count }) => (
  <div className="flex items-center text-sm">
    <span className="text-gray-600 w-8">{star} ★</span>
    <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
    <span className="text-gray-500 w-8 text-right">{count}</span>
  </div>
);

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, averageRating }) => {
  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  }, [reviews]);

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Belum ada ulasan untuk produk ini.</p>
        <p className="text-sm text-gray-400 mt-1">Jadilah yang pertama memberikan ulasan!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Ulasan Pembeli</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center pr-6 border-b sm:border-b-0 sm:border-r border-gray-200 pb-4 sm:pb-0 mb-4 sm:mb-0">
            <p className="text-4xl font-bold text-gray-800">{averageRating.toFixed(1)}<span className="text-2xl text-gray-400">/5</span></p>
            <StarRating rating={averageRating} />
            <p className="text-sm text-gray-500 mt-1">{reviews.length} ulasan</p>
          </div>
          <div className="w-full sm:pl-6 space-y-1">
            {Object.entries(ratingDistribution).reverse().map(([star, count]) => (
              <RatingBar
                key={star}
                star={parseInt(star)}
                count={count}
                percentage={(count / reviews.length) * 100}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Review List */}
      <div className="space-y-5">
        {reviews.map(review => (
          <div key={review.id} className="border-t pt-5">
            <div className="flex items-center mb-2">
                <UserCircleIcon className="w-8 h-8 text-gray-400 mr-3" />
                <div>
                    <p className="font-semibold text-sm text-gray-800">{review.user}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                </div>
            </div>
            <div className="flex items-center mb-2">
              <StarRating rating={review.rating} size="sm" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;