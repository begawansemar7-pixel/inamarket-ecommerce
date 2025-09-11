
import React, { useState } from 'react';
import { Product } from '../types';
import { PlusCircleIcon } from '../components/icons/Icons';
import ProductManagementTable from '../components/ProductManagementTable';
import AddProductModal from '../components/AddProductModal';
import { PRODUCTS } from '../constants'; // Using constants for dummy data

const SellerDashboardPage: React.FC = () => {
  // Filter some products to simulate them belonging to the logged-in seller
  const [sellerProducts, setSellerProducts] = useState<Product[]>(() => 
    PRODUCTS.filter(p => p.seller === 'Kopi Kita' || p.seller === 'Batik Indah' || p.seller === 'Kulit Asli')
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = (productData: Product | Omit<Product, 'id' | 'reviews' | 'sellerVerification'>) => {
    if ('id' in productData) {
      // Editing existing product
      setSellerProducts(prevProducts =>
        prevProducts.map(p => (p.id === productData.id ? { ...p, ...productData } : p))
      );
    } else {
      // Adding new product
      const newProduct: Product = {
        ...productData,
        id: Date.now(), // Generate a simple unique ID
        seller: "Toko Saya", // Assume current seller
        sellerVerification: 'verified',
        reviews: [],
        imageUrl: `https://picsum.photos/seed/${Date.now()}/400/400`, // Placeholder image
      };
      setSellerProducts(prevProducts => [newProduct, ...prevProducts]);
    }
    handleCloseModal();
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setSellerProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dasbor Penjual</h1>
      
      {/* Some stats cards could go here */}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-bold text-gray-800">Produk Saya ({sellerProducts.length})</h2>
          <button 
            onClick={handleOpenAddModal} 
            className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Tambah Produk Baru
          </button>
        </div>
        <ProductManagementTable
          products={sellerProducts}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteProduct}
        />
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        productToEdit={editingProduct}
      />
    </div>
  );
};

export default SellerDashboardPage;
