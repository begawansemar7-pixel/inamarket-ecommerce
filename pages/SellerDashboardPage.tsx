import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Product } from '../types';
import { ShieldCheckIcon, PlusCircleIcon } from '../components/icons/Icons';
import ProductManagementTable from '../components/ProductManagementTable';

type Page = 'home' | 'cart' | 'dashboard' | 'profile' | 'checkout' | 'admin-login';

interface SellerDashboardPageProps {
  onNavigate: (page: Page) => void;
  cartItemCount: number;
  onLogout: () => void;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  unreadMessageCount: number;
  onChatClick: () => void;
  sellerProducts: Product[];
  onOpenAddProductModal: () => void;
}

const SellerDashboardPage: React.FC<SellerDashboardPageProps> = ({
  onNavigate,
  cartItemCount,
  onLogout,
  isAuthenticated,
  onLoginClick,
  unreadMessageCount,
  onChatClick,
  sellerProducts,
  onOpenAddProductModal,
}) => {
  const verificationStatus = "verified"; // Dummy status

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        isAuthenticated={isAuthenticated}
        onLoginClick={onLoginClick}
        onSellClick={() => {}} // or link to add product modal
        onNavigate={onNavigate}
        activePage={'dashboard'}
        onProfileClick={() => {}}
        cartItemCount={cartItemCount}
        onLogout={onLogout}
        unreadMessageCount={unreadMessageCount}
        onChatClick={onChatClick}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dasbor Penjual</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column for Stats/Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Status Verifikasi</h2>
              {verificationStatus === 'verified' ? (
                <div className="flex items-center bg-green-100 text-green-800 p-4 rounded-lg">
                  <ShieldCheckIcon className="w-8 h-8 mr-4" />
                  <div>
                    <p className="font-bold text-lg">Toko Terverifikasi</p>
                    <p className="text-sm">Toko Anda telah diverifikasi oleh tim INAMarket.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 rounded-lg">
                  {/* Icon for pending/not-verified */}
                  <div>
                    <p className="font-bold text-lg">Verifikasi Tertunda</p>
                    <p className="text-sm">Tim kami sedang meninjau dokumen Anda.</p>
                  </div>
                </div>
              )}
            </div>
            {/* Other stats can go here */}
          </div>

          {/* Right Column for Product Management */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Manajemen Produk</h2>
                <button
                  onClick={onOpenAddProductModal}
                  className="flex items-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  <PlusCircleIcon className="w-5 h-5 mr-2" />
                  Tambah Produk Baru
                </button>
              </div>
              <ProductManagementTable products={sellerProducts} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboardPage;