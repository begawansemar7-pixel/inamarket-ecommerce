import React, { useState } from 'react';
import StarRating from './StarRating';

interface ProductReviewFormProps {
  onSubmit: (review: { rating: number; comment: string }) => void;
}

const ProductReviewForm: React.FC<ProductReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Harap berikan peringkat bintang.');
      return;
    }
    if (comment.trim() === '') {
      setError('Harap isi ulasan Anda.');
      return;
    }
    onSubmit({ rating, comment });
    // Reset form
    setRating(0);
    setComment('');
    setError('');
  };

  return (
    <div className="mt-8 pt-6 border-t">
      <h3 className="text-lg font-bold text-gray-800 mb-3">Tulis Ulasan Anda</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Peringkat Anda</label>
          <StarRating rating={rating} onRatingChange={setRating} size="lg" interactive />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Ulasan</label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Bagikan pengalaman Anda tentang produk ini..."
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-md transition-colors shadow-sm hover:shadow-md"
          >
            Kirim Ulasan
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductReviewForm;