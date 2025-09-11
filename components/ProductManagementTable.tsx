import React from 'react';
import { Product } from '../types';
import { PencilIcon, TrashIcon, SearchIcon } from './icons/Icons';

interface ProductManagementTableProps {
  products: Product[];
}

const formatRupiah = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductManagementTable: React.FC<ProductManagementTableProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed">
        <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-semibold text-gray-800">Anda belum memiliki produk</h3>
        <p className="mt-1 text-sm text-gray-500">Klik "Tambah Produk Baru" untuk mulai menjual.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100 text-left text-gray-600 font-semibold">
          <tr>
            <th className="p-3">Produk</th>
            <th className="p-3">Harga</th>
            <th className="p-3">Penjualan</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="p-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
              </td>
              <td className="p-3 font-medium text-gray-700">{formatRupiah(product.price)}</td>
              <td className="p-3 font-medium text-gray-700">{product.sales || 0}</td>
              <td className="p-3">
                <div className="flex justify-center items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors" title="Edit Produk">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors" title="Hapus Produk">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagementTable;