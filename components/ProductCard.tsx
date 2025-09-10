import React from 'react';
import { Product } from '../types';
import { LocationIcon } from './icons/Icons';

interface ProductCardProps {
  product: Product;
}

const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="p-4">
        <h3 className="text-md font-semibold text-gray-800 truncate h-6">{product.name}</h3>
        <p className="text-lg font-bold text-primary-dark mt-2">{formatRupiah(product.price)}</p>
        <div className="mt-3 text-sm text-gray-500">
          <p className="truncate">{product.seller}</p>
          <div className="flex items-center mt-1">
            <LocationIcon className="h-4 w-4 mr-1 text-gray-400" />
            <span>{product.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;