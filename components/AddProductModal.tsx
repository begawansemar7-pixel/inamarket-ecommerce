
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import { CloseIcon, DocumentArrowUpIcon } from './icons/Icons';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product | Omit<Product, 'id' | 'reviews' | 'sellerVerification' | 'seller' | 'imageUrl' | 'location'>) => void;
  productToEdit?: Product | null;
}

const emptyProductForm = {
    name: '',
    price: '',
    category: CATEGORIES[0],
    description: '',
};

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '' as number | string,
    category: CATEGORIES[0],
    description: '',
  });

  useEffect(() => {
    if (isOpen) {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                price: productToEdit.price,
                category: productToEdit.category,
                description: productToEdit.description,
            });
        } else {
            setFormData({
                name: '',
                price: '',
                category: CATEGORIES[0],
                description: '',
            });
        }
    }
  }, [productToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description) {
        alert("Harap isi semua kolom.");
        return;
    }
    
    if(productToEdit) {
        onSave({ id: productToEdit.id, ...formData, price: Number(formData.price) } as Product);
    } else {
        onSave({ ...formData, price: Number(formData.price) });
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transform transition-all">
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">{productToEdit ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
            <div className="p-6 space-y-4 overflow-y-auto">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      />
                    </div>
                     <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                </div>
                {/* Image upload could be added here */}
            </div>
            <div className="p-5 bg-gray-50 rounded-b-lg border-t mt-auto">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm hover:shadow-md"
                >
                  <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                  {productToEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
