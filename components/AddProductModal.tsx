import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { CloseIcon, DocumentArrowUpIcon } from './icons/Icons';
import { CATEGORIES, LOCATIONS } from '../constants';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product | Omit<Product, 'id'>) => void;
  productToEdit?: Product | null;
}

const emptyProduct: Omit<Product, 'id'> = {
    name: '',
    price: 0,
    description: '',
    imageUrl: 'https://picsum.photos/seed/newproduct/400/400',
    category: CATEGORIES[0],
    seller: 'Current Seller', // This would come from user context
    sellerVerification: 'verified',
    location: LOCATIONS[0],
    reviews: [],
    stock: 0,
    sales: 0,
    originalPrice: undefined,
    discount: 0,
};

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [productData, setProductData] = useState<Product | Omit<Product, 'id'>>(
    productToEdit || emptyProduct
  );
  const [errors, setErrors] = useState<{ stock?: string; discount?: string }>({});
  
  useEffect(() => {
    // When the modal opens, set the form data
    if (isOpen) {
        if (productToEdit) {
            setProductData(productToEdit);
        } else {
            setProductData(emptyProduct);
        }
        setErrors({}); // Reset validation errors
    }
  }, [productToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    // Real-time validation
    if (name === 'stock') {
        if (numericValue < 0) {
            setErrors(prev => ({ ...prev, stock: 'Stok tidak boleh negatif.' }));
        } else {
            setErrors(prev => ({ ...prev, stock: undefined }));
        }
    }

    if (name === 'discount') {
        if (numericValue < 0 || numericValue > 100) {
            setErrors(prev => ({ ...prev, discount: 'Diskon harus antara 0 dan 100.' }));
        } else {
            setErrors(prev => ({ ...prev, discount: undefined }));
        }
    }
    
    const isNumber = ['price', 'stock', 'sales', 'discount', 'originalPrice'].includes(name);
    setProductData(prev => ({ ...prev, [name]: isNumber ? Number(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error)) {
        // Prevent submission if there are errors
        return;
    }
    onSave(productData);
    onClose();
  };

  if (!isOpen) return null;
  
  const hasErrors = Object.values(errors).some(error => !!error);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">
            {productToEdit ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col overflow-hidden">
            <div className="p-6 space-y-4 overflow-y-auto flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                  <input type="text" name="name" id="name" value={productData.name} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                  <input type="number" name="price" id="price" value={productData.price} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea name="description" id="description" value={productData.description} onChange={handleChange} required rows={4} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select name="category" id="category" value={productData.category} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                  <select name="location" id="location" value={productData.location} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Sisa Stok</label>
                  <input type="number" name="stock" id="stock" value={productData.stock || 0} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                  {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock}</p>}
                </div>
                <div>
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">Diskon (%)</label>
                  <input type="number" name="discount" id="discount" value={productData.discount || 0} onChange={handleChange} min="0" max="100" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                  {errors.discount && <p className="text-red-600 text-sm mt-1">{errors.discount}</p>}
                </div>
              </div>
               <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                  <input type="text" name="imageUrl" id="imageUrl" value={productData.imageUrl} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" placeholder="https://..."/>
                </div>
            </div>

            <div className="p-5 bg-gray-50 rounded-b-lg border-t flex-shrink-0">
              <button
                type="submit"
                disabled={hasErrors}
                className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors disabled:bg-primary-light disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                Simpan Produk
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;