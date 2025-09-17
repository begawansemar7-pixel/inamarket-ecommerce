import React, { useMemo, useState } from 'react';
import { Seller, Product, Page, SellerReview } from '../types';
import ResellerProfileHeader from '../components/reseller/ResellerProfileHeader';
import ProductGrid from '../components/ProductGrid';
import ProductReviews from '../components/ProductReviews';
import ProductReviewForm from '../components/ProductReviewForm';
import { ArrowLeftIcon } from '../components/icons/Icons';

interface ResellerProfilePageProps {
  seller: Seller;
  allProducts: Product[];
  onNavigate: (page: Page) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product) => void;
  onViewSellerProfile: (sellerName: string) => void;
}

const ResellerProfilePage: React.FC<ResellerProfilePageProps> = ({
  seller,
  allProducts,
  onNavigate,
  onViewDetails,
  onAddToCart,
  onBuyNow,
  onViewSellerProfile,
}) => {
  const sellerProducts = useMemo(
    () => allProducts.filter(p => p.seller === seller.name),
    [allProducts, seller.name]
  );
  
  const [sellerReviews, setSellerReviews] = useState<SellerReview[]>(seller.reviews);

  const averageRating = useMemo(() => {
    if (!sellerReviews || sellerReviews.length === 0) return 0;
    return sellerReviews.reduce((acc, review) => acc + review.rating, 0) / sellerReviews.length;
  }, [sellerReviews]);

  const handleAddSellerReview = (review: { rating: number; comment: string }) => {
    const newReview: SellerReview = {
        id: Math.random(), // Simple ID for demo
        user: 'Anda', // Placeholder for logged in user
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric'}),
        ...review
    };
    setSellerReviews(prev => [newReview, ...prev]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ResellerProfileHeader seller={seller} productCount={sellerProducts.length} />
      
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center text-sm font-semibold text-primary hover:text-primary-dark mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Kembali ke semua produk
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Products */}
          <main className="lg:col-span-3 space-y-8">
            <div id="about-section" className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Tentang Toko</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{seller.description}</p>
            </div>
            
            <div id="products-section" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Semua Produk dari {seller.name}</h2>
              {sellerProducts.length > 0 ? (
                <ProductGrid
                  products={sellerProducts}
                  onViewDetails={onViewDetails}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                  onViewSellerProfile={onViewSellerProfile}
                />
              ) : (
                <p className="text-center text-gray-500 py-10">Penjual ini belum memiliki produk.</p>
              )}
            </div>

            <div id="reviews-section" className="bg-white p-6 rounded-lg shadow-md">
                <ProductReviews reviews={sellerReviews} averageRating={averageRating} />
                <ProductReviewForm onSubmit={handleAddSellerReview} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResellerProfilePage;