import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants'; // For dummy data
import ProductManagementTable from '../components/ProductManagementTable';
import AddProductModal from '../components/AddProductModal';
import { PlusCircleIcon, InformationCircleIcon, CloseIcon } from '../components/icons/Icons';

const SellerDashboardPage: React.FC = () => {
  // For demonstration, we'll filter products for a specific seller
  const [myProducts, setMyProducts] = useState<Product[]>(
    PRODUCTS.filter(p => p.seller === 'Kopi Kita' || p.seller === 'Batik Indah' || p.seller === 'Kulit Asli')
  );
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // State for the low stock notification
  const [showLowStockAlert, setShowLowStockAlert] = useState(false);

  const lowStockProducts = useMemo(() =>
    myProducts.filter(p => p.stock !== undefined && p.stock < 5),
    [myProducts]
  );

  useEffect(() => {
    if (lowStockProducts.length > 0) {
      setShowLowStockAlert(true);
    } else {
      setShowLowStockAlert(false); // Hide if stock is replenished
    }
  }, [lowStockProducts]);


  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const productToAdd: Product = {
      ...newProduct,
      id: Math.max(...PRODUCTS.map(p => p.id), 0) + 1, // Generate a new unique ID
      reviews: [],
      // In a real app, seller info would come from logged-in user context
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

  const totalSales = myProducts.reduce((acc, p) => acc + (p.sales || 0), 0);
  const totalRevenue = myProducts.reduce((acc, p) => acc + (p.sales || 0) * p.price, 0);

  const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
       {/* Low Stock Notification */}
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
                className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                aria-label="Tutup notifikasi"
              >
                <span className="sr-only">Tutup</span>
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dasbor Penjual</h1>
        <p className="text-gray-500">Kelola produk, pesanan, dan lihat performa toko Anda.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Total Pendapatan</h3>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {formatRupiah(totalRevenue)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Total Produk Terjual</h3>
          <p className="text-3xl font-bold text-gray-800 mt-1">{totalSales}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Jumlah Produk Aktif</h3>
          <p className="text-3xl font-bold text-gray-800 mt-1">{myProducts.length}</p>
        </div>
      </div>

      {/* Product Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Manajemen Produk</h2>
          <button 
            onClick={openAddModal}
            className="flex items-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Tambah Produk Baru
          </button>
        </div>
        <ProductManagementTable
          products={myProducts}
          onEdit={openEditModal}
          onDelete={handleDeleteProduct}
        />
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