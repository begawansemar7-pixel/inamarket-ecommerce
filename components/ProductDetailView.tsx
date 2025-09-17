import React, { useState } from 'react';
import { Product, Review } from '../types';
import StarRating from './StarRating';
import VerificationStatusBadge from './VerificationStatusBadge';
import { MinusIcon, PlusIcon, ShoppingCartIcon, PaperAirplaneIcon } from './icons/Icons';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onSendMessage: (product: Product, text: string) => void;
  reviews: Review[];
  averageRating: number;
  onViewSellerProfile: (sellerName: string) => void;
}

const formatRupiah = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onAddToCart,
  onSendMessage,
  reviews,
  averageRating,
  onViewSellerProfile,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [messageText, setMessageText] = useState('');

  const isOutOfStock = product.stock === 0;
  const isPromo = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = isPromo ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;

  const handleSendMessageClick = () => {
    if (!product || !messageText.trim()) return;
    onSendMessage(product, messageText.trim());
    setMessageText(''); // Clear input after sending
  };
  
  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Image Section */}
      <div className="p-6">
        <div className="relative aspect-square">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" />
          {isPromo && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-md shadow-lg">
              -{discountPercentage}%
            </div>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">{product.category}</p>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <StarRating rating={averageRating} />
            <span className="text-sm text-gray-500">({reviews.length} ulasan)</span>
          </div>

          {isPromo ? (
            <div className="mt-1">
              <div className="flex items-baseline space-x-3">
                <p className="text-xl text-gray-500 line-through">{formatRupiah(product.originalPrice!)}</p>
                <span className="text-lg font-bold text-red-600">-{discountPercentage}%</span>
              </div>
              <p className="text-3xl font-extrabold text-red-600">{formatRupiah(product.price)}</p>
            </div>
          ) : (
            <p className="text-3xl font-extrabold text-primary-dark">{formatRupiah(product.price)}</p>
          )}

          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-1">Dijual oleh</span>
            <button onClick={() => onViewSellerProfile(product.seller)} className="font-semibold text-primary-dark hover:underline">{product.seller}</button>
            <VerificationStatusBadge status={product.sellerVerification} />
          </div>
          
          <div className="prose prose-sm text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }} />

          <div className="mt-4 pt-4 border-t">
              <h3 className="text-md font-semibold text-gray-800 mb-3">Kontak Penjual</h3>
              <div className="space-y-3">
                  <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      rows={4}
                      placeholder={`Tanyakan sesuatu tentang "${product?.name}"...`}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm transition-colors focus:ring-primary focus:border-primary"
                      aria-label="Pesan untuk penjual"
                  />
                  <button
                      onClick={handleSendMessageClick}
                      disabled={!messageText.trim()}
                      className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white font-bold py-2.5 px-4 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                      <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                      Kirim Pesan
                  </button>
              </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="pt-4 border-t space-y-4">
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700">Jumlah:</label>
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isOutOfStock}
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="px-4 py-1.5 text-center font-semibold text-gray-800 w-16">{isOutOfStock ? 0 : quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isOutOfStock}
                >
                  <PlusIcon className="w-4 h-4"/>
                </button>
              </div>
            </div>

            {isOutOfStock && (
              <div className="p-3 text-center bg-red-50 border border-red-200 rounded-md text-red-700 font-semibold">
                Stok produk ini telah habis.
              </div>
            )}
            
            <button 
              onClick={handleAddToCartClick}
              disabled={isOutOfStock}
              className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-colors shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              {isOutOfStock ? 'Stok Habis' : 'Tambah ke Keranjang'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
