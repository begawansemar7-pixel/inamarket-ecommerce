import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { ShoppingCartIcon, StarIcon, ShareIcon, FacebookIcon, TwitterIcon, WhatsAppIcon } from './icons/Icons';
import VerificationStatusBadge from './VerificationStatusBadge';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  const [sharePopoverOpen, setSharePopoverOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
            setSharePopoverOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // Prevent click event from firing when action buttons are clicked
      if ((e.target as HTMLElement).closest('.action-btn')) {
          return;
      }
      onClick(product);
  }
  
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Prevent card click
      onAddToCart(product, 1);
  };
  
  const handleShareIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSharePopoverOpen(prev => !prev);
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const productUrl = window.location.href; // In a real app, this would be a direct link to the product.
    const text = encodeURIComponent(`Lihat produk keren ini: ${product.name}`);
    let shareUrl = '';

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${text}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${text}%20${encodeURIComponent(productUrl)}`;
            break;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    setSharePopoverOpen(false);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full">{product.category}</div>
      </div>
      <div className="p-4">
        <h3 className="text-md font-semibold text-gray-800 truncate group-hover:text-primary-dark transition-colors">{product.name}</h3>
        <div className="flex items-center mt-1">
          <p className="text-sm text-gray-500">{product.seller}</p>
          <VerificationStatusBadge status={product.sellerVerification} />
        </div>
        
        <div className="flex items-center mt-2">
          {averageRating > 0 && (
            <>
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-600 ml-1 font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-xs text-gray-400 mx-1.5">|</span>
            </>
          )}
          <span className="text-xs text-gray-500">Terjual {product.sales || 0}</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-lg font-bold text-primary">{formatRupiah(product.price)}</p>
          <div className="flex items-center space-x-1">
              <button
                onClick={handleAddToCartClick}
                className="action-btn bg-primary-light/20 text-primary-dark p-2 rounded-full transition-colors hover:bg-primary hover:text-white"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCartIcon className="w-5 h-5" />
              </button>
              <div className="relative">
                <button
                  onClick={handleShareIconClick}
                  className="action-btn bg-gray-100 text-gray-600 p-2 rounded-full transition-colors hover:bg-gray-200"
                  aria-label={`Share ${product.name}`}
                >
                  <ShareIcon className="w-5 h-5" />
                </button>
                {sharePopoverOpen && (
                    <div
                        ref={shareRef}
                        className="absolute bottom-full right-0 mb-2 w-auto bg-white rounded-md shadow-lg p-1 z-10 flex items-center space-x-1 animate-scale-in"
                        style={{ transformOrigin: 'bottom right' }}
                    >
                        <button onClick={() => handleShare('facebook')} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"><FacebookIcon className="w-5 h-5" /></button>
                        <button onClick={() => handleShare('twitter')} className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full"><TwitterIcon className="w-5 h-5" /></button>
                        <button onClick={() => handleShare('whatsapp')} className="p-2 text-gray-500 hover:text-green-500 hover:bg-gray-100 rounded-full"><WhatsAppIcon className="w-5 h-5" /></button>
                    </div>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;