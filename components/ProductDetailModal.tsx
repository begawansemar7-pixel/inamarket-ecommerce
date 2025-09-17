import React, { useState, useMemo, useEffect } from 'react';
import { Product, Review } from '../types';
import ProductReviews from './ProductReviews';
import ProductReviewForm from './ProductReviewForm';
import { CloseIcon } from './icons/Icons';
import ProductCard from './ProductCard';
import ProductDetailView from './ProductDetailView';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
  onSendMessage: (product: Product, text: string) => void;
  onBuyNow: (product: Product) => void;
  onViewSellerProfile: (sellerName: string) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, product, products, onAddToCart, onViewDetails, onSendMessage, onBuyNow, onViewSellerProfile }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (product) {
        setReviews(product.reviews || []);
    }
  }, [isOpen, product]);
  
  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  }, [reviews]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id)
                   .sort((a, b) => (b.sales || 0) - (a.sales || 0))
                   .slice(0, 4);
  }, [product, products]);

  const handleAddReview = (review: { rating: number; comment: string }) => {
    const newReview: Review = {
        id: Math.random(),
        user: 'Anda', // Placeholder for logged in user
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric'}),
        ...review
    };
    setReviews(prev => [newReview, ...prev]);
  };

  if (!isOpen || !product) return null;
  
  const handleAddToCartAndClose = (product: Product, quantity: number) => {
      onAddToCart(product, quantity);
      onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-800 truncate">{product.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
            <ProductDetailView
                product={product}
                onAddToCart={handleAddToCartAndClose}
                onSendMessage={onSendMessage}
                reviews={reviews}
                averageRating={averageRating}
                onViewSellerProfile={onViewSellerProfile}
            />

            {/* Reviews Section */}
            <div className="p-6 border-t">
                <ProductReviews reviews={reviews} averageRating={averageRating} />
                <ProductReviewForm onSubmit={handleAddReview} />
            </div>
            
            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className="p-6 bg-gray-50 border-t">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Produk Terkait</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {relatedProducts.map(relatedProduct => (
                            <ProductCard 
                                key={relatedProduct.id}
                                product={relatedProduct}
                                onViewDetails={onViewDetails}
                                onAddToCart={onAddToCart}
                                onBuyNow={onBuyNow}
                                onViewSellerProfile={onViewSellerProfile}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;