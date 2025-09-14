import React from 'react';
import { Product } from '../../types';
import ProductManagementTable from '../ProductManagementTable';
import { PlusCircleIcon } from '../icons/Icons';

interface ProductManagementViewProps {
  products: Product[];
  onAddProductClick: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
}

const formatRupiah = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductManagementView: React.FC<ProductManagementViewProps> = ({
  products,
  onAddProductClick,
  onEditProduct,
  onDeleteProduct,
}) => {
  const totalSales = products.reduce((acc, p) => acc + (p.sales || 0), 0);
  const totalRevenue = products.reduce((acc, p) => acc + (p.sales || 0) * p.price, 0);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Total Pendapatan</h3>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {formatRupiah(totalRevenue)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Produk Terjual</h3>
          <p className="text-3xl font-bold text-gray-800 mt-1">{totalSales}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Jumlah Produk Aktif</h3>
          <p className="text-3xl font-bold text-gray-800 mt-1">{products.length}</p>
        </div>
      </div>

      {/* Product Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Manajemen Produk</h2>
          <button
            onClick={onAddProductClick}
            className="flex items-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Tambah Produk
          </button>
        </div>
        <ProductManagementTable
          products={products}
          onEdit={onEditProduct}
          onDelete={onDeleteProduct}
        />
      </div>
    </div>
  );
};

export default ProductManagementView;