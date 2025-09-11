
import React, { useState } from 'react';
import { Product } from '../types';
import { CloseIcon, ShoppingCartIcon, PlusIcon, MinusIcon, ChatBubbleLeftRightIcon } from './icons/Icons';
import VerificationStatusBadge from './VerificationStatusBadge';
import ProductReviews from './ProductReviews';
import ProductReviewForm from './ProductReviewForm';
import StarRating from './StarRating';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onStartChat: (product: Product) => void;
}

const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
};

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart, onStartChat }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  if (!product) return null;

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };
  
  const handleAddToCartClick = () => {
      onAddToCart(product, quantity);
      onClose();
  };

  const handleStartChatClick = () => {
      onStartChat(product);
      onClose();
  };
  
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-all animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 truncate pr-4">{product.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="p-4">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg aspect-square" />
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                    <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-500">dari</span>
                        <p className="text-sm font-semibold text-primary ml-1.5">{product.seller}</p>
                        <VerificationStatusBadge status={product.sellerVerification} />
                    </div>

                    <div className="flex items-center my-3">
                      <StarRating rating={averageRating} />
                      <span className="text-sm text-gray-500 ml-2">({product.reviews.length} ulasan)</span>
                    </div>

                    <p className="text-3xl font-extrabold text-primary-dark my-2">{formatRupiah(product.price)}</p>

                    <div className="mt-4 flex-grow">
                      <p className="text-sm text-gray-600 leading-relaxed">{product.description.split('\n')[0]}</p>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center space-x-4 mb-4">
                            <p className="font-semibold">Jumlah:</p>
                            <div className="flex items-center border rounded-md">
                                <button onClick={() => handleQuantityChange(-1)} className="p-2 text-gray-600 hover:bg-gray-100"><MinusIcon className="w-5 h-5" /></button>
                                <span className="px-4 font-semibold">{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className="p-2 text-gray-600 hover:bg-gray-100"><PlusIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                        <div className="space-y-3">
                          <button onClick={handleAddToCartClick} className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-colors shadow-sm hover:shadow-md">
                              <ShoppingCartIcon className="w-5 h-5 mr-2" />
                              Tambah ke Keranjang
                          </button>
                          <button 
                              onClick={handleStartChatClick}
                              className="w-full flex items-center justify-center bg-teal-50 hover:bg-teal-100 text-primary-dark font-bold py-3 px-4 rounded-md transition-colors border border-teal-200"
                          >
                              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                              Chat Penjual
                          </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs for Description/Reviews */}
            <div className="px-6 py-4 border-t">
                 <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button onClick={() => setActiveTab('description')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                            Deskripsi Lengkap
                        </button>
                        <button onClick={() => setActiveTab('reviews')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                            Ulasan ({product.reviews.length})
                        </button>
                    </nav>
                </div>
                <div className="py-6">
                    {activeTab === 'description' && (
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{product.description}</p>
                    )}
                    {activeTab === 'reviews' && (
                       <div>
                         <ProductReviews reviews={product.reviews} averageRating={averageRating} />
                         <ProductReviewForm onSubmit={(review) => console.log('New review:', review)} />
                       </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
