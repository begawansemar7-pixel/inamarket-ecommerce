import React, { useState } from 'react';
import { Product } from '../types';
import { PencilIcon, TrashIcon } from './icons/Icons';

interface ProductManagementTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const formatRupiah = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductManagementTable: React.FC<ProductManagementTableProps> = ({ products, onEdit, onDelete }) => {
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);

  const productToDelete = products.find(p => p.id === deletingProductId);

  const handleConfirmDelete = () => {
      if (deletingProductId) {
          onDelete(deletingProductId);
      }
      setDeletingProductId(null);
  };

  const handleCancelDelete = () => {
      setDeletingProductId(null);
  };

  if (products.length === 0) {
    return (
        <div className="text-center py-10 border-t mt-4">
            <p className="text-gray-500">Anda belum memiliki produk.</p>
            <p className="text-sm text-gray-400 mt-1">Klik "Tambah Produk Baru" untuk memulai.</p>
        </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-scale-in">
                <h3 className="text-lg font-bold text-gray-900">Konfirmasi Hapus Produk</h3>
                <p className="mt-2 text-sm text-gray-600">
                    Apakah Anda yakin ingin menghapus produk "<strong>{productToDelete.name}</strong>"? Tindakan ini tidak dapat diurungkan.
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={handleCancelDelete}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold text-sm"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleConfirmDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-semibold text-sm"
                    >
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
      )}
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produk
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Harga
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sisa Stok
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Terjual
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Disc %
            </th>
             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kategori
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Aksi</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map(product => {
            const isLowStock = product.stock !== undefined && product.stock < 5;
            return (
                <tr key={product.id} className={`${isLowStock ? 'bg-red-50' : ''} hover:bg-gray-50 transition-colors`}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="ml-4">
                        <div className="font-medium text-gray-900">{product.name}</div>
                    </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 font-semibold">{formatRupiah(product.price)}</div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap font-medium ${isLowStock ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
                    {product.stock ?? 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">
                    {product.sales || 0}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.discount ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                    {product.discount || 0}%
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {product.category}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                    <div className="flex items-center justify-end space-x-3">
                    <button onClick={() => onEdit(product)} className="text-primary hover:text-primary-dark p-1" aria-label={`Edit ${product.name}`}>
                        <PencilIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={() => setDeletingProductId(product.id)} className="text-gray-400 hover:text-red-600 p-1" aria-label={`Delete ${product.name}`}>
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                    </div>
                </td>
                </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagementTable;