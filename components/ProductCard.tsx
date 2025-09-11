
import React from 'react';
import { Product } from '../types';
import StarRating from './StarRating';
import { ShareIcon, ShoppingCartIcon } from './icons/Icons';
import VerificationStatusBadge from './VerificationStatusBadge';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const formatRupiah = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  const isPromo = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = isPromo ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <button onClick={() => onViewDetails(product)} className="w-full block">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </button>
        {isPromo && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discountPercentage}%
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-md font-bold text-gray-800 truncate">
           <button onClick={() => onViewDetails(product)} className="hover:text-primary transition-colors text-left">{product.name}</button>
        </h3>
        
        {isPromo ? (
            <div className="mt-1">
                <p className="text-sm text-gray-500 line-through">{formatRupiah(product.originalPrice!)}</p>
                <p className="text-lg font-extrabold text-red-600">{formatRupiah(product.price)}</p>
            </div>
        ) : (
            <p className="text-lg font-extrabold text-primary-dark mt-1">{formatRupiah(product.price)}</p>
        )}
        
        <div className="flex items-center mt-2 text-sm">
            <p className="text-gray-600 truncate">{product.seller}</p>
            <VerificationStatusBadge status={product.sellerVerification} />
        </div>

        <div className="flex items-center mt-2">
          <StarRating rating={averageRating} size="sm" />
          <span className="text-xs text-gray-400 ml-1.5">({product.reviews.length})</span>
        </div>
      </div>
      {/* Absolute positioned buttons for hover effect */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white text-gray-600 hover:text-primary" aria-label="Add to cart">
            <ShoppingCartIcon className="w-5 h-5" />
          </button>
          <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white text-gray-600 hover:text-primary" aria-label="Share product">
            <ShareIcon className="w-5 h-5" />
          </button>
      </div>
    </div>
  );
};

export default ProductCard;
