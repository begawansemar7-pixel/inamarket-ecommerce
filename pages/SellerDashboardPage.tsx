import React, { useState, useEffect, useMemo } from 'react';
// Fix: Import the centralized 'Page' type to ensure type consistency for navigation.
import { Product, DeliveryOptions, BusinessService, PaymentOptions, Page } from '../types';
import { PRODUCTS, SERVICES } from '../constants'; // For dummy data
import AddProductModal from '../components/AddProductModal';
import { PlusCircleIcon, InformationCircleIcon, CloseIcon, ShoppingCartIcon, TruckIcon, WrenchScrewdriverIcon, CreditCardIcon, BanknotesIcon, DatabaseIcon, HomeIcon, ArrowLeftOnRectangleIcon } from '../components/icons/Icons';
import ProductManagementView from '../components/seller/ProductManagementView';
import DeliveryManagementView from '../components/seller/DeliveryManagementView';
import ServiceManagementView from '../components/seller/ServiceManagementView';
import PaymentManagementView from '../components/seller/PaymentManagementView';
import AccountingView from '../components/seller/AccountingView';
import DatabaseIntegrationView from '../components/seller/DatabaseIntegrationView';

type SellerView = 'products' | 'delivery' | 'services' | 'payment' | 'accounting' | 'database';
// Fix: Remove the local 'Page' type definition in favor of the centralized one from types.ts.

interface SellerDashboardPageProps {
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

const SellerDashboardPage: React.FC<SellerDashboardPageProps> = ({ onLogout, onNavigate }) => {
  const [activeView, setActiveView] = useState<SellerView>('database');
  const [myProducts, setMyProducts] = useState<Product[]>(
    PRODUCTS.filter(p => p.seller === 'Kopi Kita' || p.seller === 'Batik Indah' || p.seller === 'Kulit Asli')
  );
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptions>({
    sameDay: { gojek: true, grab: false, iter: false },
    interCity: { jne: true, jnt: true, tiki: false, pos: false },
  });
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptions>({
      qris: true,
      virtualAccounts: {
        bca: true,
        mandiri: true,
        bri: false,
        bni: false,
      },
      eWallets: {
        gopay: true,
        ovo: true,
        shopeePay: false,
        dana: false,
        linkAja: false,
      },
  });
  const [businessService, setBusinessService] = useState<BusinessService>({
    serviceOfferings: SERVICES.filter(s => s.seller === 'Kulit Asli' || s.seller === 'Kopi Kita'),
    operationalHours: {
      monday: { active: true, open: '09:00', close: '17:00' },
      tuesday: { active: true, open: '09:00', close: '17:00' },
      wednesday: { active: true, open: '09:00', close: '17:00' },
      thursday: { active: true, open: '09:00', close: '17:00' },
      friday: { active: true, open: '09:00', close: '17:00' },
      saturday: { active: false, open: '10:00', close: '15:00' },
      sunday: { active: false, open: '10:00', close: '15:00' },
    }
  });


  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showLowStockAlert, setShowLowStockAlert] = useState(false);

  const lowStockProducts = useMemo(() =>
    myProducts.filter(p => p.stock !== undefined && p.stock < 5),
    [myProducts]
  );

  useEffect(() => {
    setShowLowStockAlert(lowStockProducts.length > 0);
  }, [lowStockProducts]);

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const productToAdd: Product = {
      ...newProduct,
      id: Math.max(...PRODUCTS.map(p => p.id), 0) + 1,
      reviews: [],
    };
    setMyProducts(prev => [productToAdd, ...prev]);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setMyProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setMyProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setAddModalOpen(true);
  };
  
  const openAddModal = () => {
    setEditingProduct(null);
    setAddModalOpen(true);
  };
  
  const closeModal = () => {
    setAddModalOpen(false);
    setEditingProduct(null);
  };

  const SidebarItem: React.FC<{
    label: string;
    view: SellerView;
    icon: React.ElementType;
  }> = ({ label, view, icon: Icon }) => (
    <li>
      <button
        onClick={() => setActiveView(view)}
        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          activeView === view
            ? 'bg-primary text-white font-semibold'
            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
        }`}
      >
        <Icon className="w-6 h-6" />
        <span>{label}</span>
      </button>
    </li>
  );
  
  const renderContent = () => {
      switch(activeView) {
          case 'products':
              return (
                  <ProductManagementView
                      products={myProducts}
                      onAddProductClick={openAddModal}
                      onEditProduct={openEditModal}
                      onDeleteProduct={handleDeleteProduct}
                  />
              );
          case 'delivery':
              return (
                  <DeliveryManagementView
                    options={deliveryOptions}
                    onOptionsChange={setDeliveryOptions}
                  />
              );
          case 'services':
              return (
                  <ServiceManagementView
                      serviceData={businessService}
                      onUpdateServices={setBusinessService}
                  />
              );
          case 'payment':
              return (
                  <PaymentManagementView 
                    options={paymentOptions}
                    onOptionsChange={setPaymentOptions}
                  />
              );
          case 'accounting':
              return <AccountingView products={myProducts} />;
          case 'database':
              return <DatabaseIntegrationView />;
          default:
              return null;
      }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {showLowStockAlert && (
        <div className="fixed top-24 right-4 z-50 w-full max-w-sm bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-4 animate-step-in">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-bold text-yellow-800">Peringatan Stok Rendah</p>
              <p className="mt-1 text-sm text-yellow-700">
                Produk berikut perlu segera diisi ulang: {lowStockProducts.map(p => p.name).join(', ')}.
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => setShowLowStockAlert(false)}
                className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100"
                aria-label="Tutup notifikasi"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dasbor Penjual</h1>
          <p className="text-gray-500">Kelola produk, pesanan, dan pengiriman toko Anda.</p>
        </div>
        <div className="flex items-center space-x-2 self-start sm:self-center">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md transition-colors hover:bg-gray-100 shadow-sm"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Beranda
          </button>
          <button
            onClick={onLogout}
            className="flex items-center bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
            Keluar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <aside className="md:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md sticky top-24">
              <nav>
                  <ul className="space-y-2">
                      <SidebarItem label="Produk" view="products" icon={ShoppingCartIcon} />
                      <SidebarItem label="Pengiriman" view="delivery" icon={TruckIcon} />
                      <SidebarItem label="Jasa" view="services" icon={WrenchScrewdriverIcon} />
                      <SidebarItem label="Pembayaran" view="payment" icon={CreditCardIcon} />
                      <SidebarItem label="Akunting" view="accounting" icon={BanknotesIcon} />
                      <SidebarItem label="Integrasi DB" view="database" icon={DatabaseIcon} />
                  </ul>
              </nav>
          </div>
        </aside>

        <main className="md:col-span-3 lg:col-span-4">
          {renderContent()}
        </main>
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        onSave={editingProduct ? handleEditProduct : handleAddProduct}
        productToEdit={editingProduct}
      />
    </div>
  );
};

export default SellerDashboardPage;