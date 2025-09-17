import React from 'react';
import { Product } from '../types';
import StarRating from './StarRating';
import { BoltIcon, ShareIcon, ShoppingCartIcon, BuildingStorefrontIcon } from './icons/Icons';
import VerificationStatusBadge from './VerificationStatusBadge';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product) => void;
  onViewSellerProfile: (sellerName: string) => void;
}

const formatRupiah = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onAddToCart, onBuyNow, onViewSellerProfile }) => {
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  const isPromo = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = isPromo ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock !== undefined && product.stock > 0 && product.stock < 5;


  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm group relative overflow-hidden transition-all duration-300 ${isOutOfStock ? 'grayscale' : 'hover:shadow-lg hover:-translate-y-1'} flex flex-col`}>
      <div className="relative">
        <button onClick={() => onViewDetails(product)} className="w-full block">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </button>
        {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-bold text-base bg-red-600 px-4 py-2 rounded-md shadow-lg">STOK HABIS</span>
            </div>
        )}
        {isPromo && !isOutOfStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discountPercentage}%
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        {isLowStock && (
            <div className="my-1">
                <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    Stok Hampir Habis
                </span>
            </div>
        )}
        <h3 className="text-md font-bold text-gray-800 truncate mt-1">
           <button onClick={() => onViewDetails(product)} className="hover:text-primary transition-colors text-left">{product.name}</button>
        </h3>
        
        {isPromo ? (
            <div className="mt-1">
                <div className="flex items-baseline space-x-2">
                    <p className="text-sm text-gray-500 line-through">{formatRupiah(product.originalPrice!)}</p>
                    <span className="text-xs font-semibold text-red-600">-{discountPercentage}%</span>
                </div>
                <p className="text-lg font-extrabold text-red-600">{formatRupiah(product.price)}</p>
            </div>
        ) : (
            <p className="text-lg font-extrabold text-primary-dark mt-1">{formatRupiah(product.price)}</p>
        )}
        
        <div className="flex items-center mt-2 text-sm text-gray-600">
            <BuildingStorefrontIcon className="w-4 h-4 mr-1.5 flex-shrink-0 text-gray-400" />
            <button onClick={() => onViewSellerProfile(product.seller)} className="truncate hover:text-primary transition-colors">{product.seller}</button>
            <VerificationStatusBadge status={product.sellerVerification} />
        </div>

        <div className="flex items-center mt-2">
          <StarRating rating={averageRating} size="sm" />
          <span className="text-xs text-gray-400 ml-1.5">({product.reviews.length})</span>
        </div>

        {!isOutOfStock && (
            <div className="mt-auto pt-4 space-y-2">
                <button 
                    onClick={() => onAddToCart(product, 1)}
                    className="w-full flex items-center justify-center text-sm bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md"
                >
                    <ShoppingCartIcon className="w-4 h-4 mr-1.5" />
                    Tambah Keranjang
                </button>
                 <button 
                    onClick={() => onBuyNow(product)}
                    className="w-full flex items-center justify-center text-sm bg-white text-primary border border-primary font-semibold py-2 px-4 rounded-md hover:bg-teal-50 transition-colors shadow-sm hover:shadow-md"
                >
                    <BoltIcon className="w-4 h-4 mr-1.5" />
                    Beli Langsung
                </button>
            </div>
        )}
      </div>
      {/* Absolute positioned buttons for hover effect */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out">
          {!isOutOfStock && (
            <button onClick={() => onAddToCart(product, 1)} className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white text-gray-600 hover:text-primary" aria-label="Add to cart">
                <ShoppingCartIcon className="w-5 h-5" />
            </button>
          )}
          <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white text-gray-600 hover:text-primary" aria-label="Share product">
            <ShareIcon className="w-5 h-5" />
          </button>
      </div>
    </div>
  );
};

export default ProductCard;