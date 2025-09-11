import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { SearchIcon } from './icons/Icons';

interface ProductGridProps {
  title: string;
  products: Product[];
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  onResetFilters?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products, onProductClick = () => {}, onAddToCart = () => {}, onResetFilters }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={onProductClick}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed">
            <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">Tidak ada produk ditemukan</h3>
            <p className="mt-1 text-sm text-gray-500">Coba ubah atau atur ulang filter Anda.</p>
            {onResetFilters && (
                <button
                    onClick={onResetFilters}
                    className="mt-6 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-full transition-colors shadow-sm hover:shadow-md"
                >
                    Reset Filter
                </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;