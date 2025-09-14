import React, { useState, useEffect } from 'react';
import { CloseIcon, DocumentArrowUpIcon } from '../icons/Icons';

interface ServiceCategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { oldName?: string; newName: string }) => void;
  categoryToEdit: { name: string } | null;
  existingCategories: string[];
}

const ServiceCategoryEditModal: React.FC<ServiceCategoryEditModalProps> = ({ isOpen, onClose, onSave, categoryToEdit, existingCategories }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(categoryToEdit?.name || '');
      setError('');
    }
  }, [isOpen, categoryToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Nama kategori tidak boleh kosong.');
      return;
    }
    
    const isDuplicate = existingCategories
        .filter(cat => cat.toLowerCase() !== categoryToEdit?.name.toLowerCase())
        .some(cat => cat.toLowerCase() === name.trim().toLowerCase());

    if (isDuplicate) {
      setError('Nama kategori sudah ada.');
      return;
    }

    onSave({ oldName: categoryToEdit?.name, newName: name.trim() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">
            {categoryToEdit ? 'Edit Kategori Jasa' : 'Tambah Kategori Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
              <input
                type="text"
                id="category-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
               {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>
            <p className="text-xs text-gray-500">Ikon untuk kategori baru akan diatur ke ikon default.</p>
          </div>
          <div className="p-5 bg-gray-50 rounded-b-lg border-t">
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm"
            >
              <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
              Simpan Kategori
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCategoryEditModal;