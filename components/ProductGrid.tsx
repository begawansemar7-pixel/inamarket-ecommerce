import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product) => void;
  onViewSellerProfile: (sellerName: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onViewDetails, onAddToCart, onBuyNow, onViewSellerProfile }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} onAddToCart={onAddToCart} onBuyNow={onBuyNow} onViewSellerProfile={onViewSellerProfile} />
      ))}
    </div>
  );
};

export default ProductGrid;