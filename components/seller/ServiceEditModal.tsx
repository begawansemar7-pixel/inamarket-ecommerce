import React, { useState, useEffect } from 'react';
import { ServiceOffering } from '../../types';
import { CloseIcon, DocumentArrowUpIcon } from '../icons/Icons';
import { SERVICE_CATEGORIES_WITH_ICONS } from '../../constants';

interface ServiceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: ServiceOffering | Omit<ServiceOffering, 'id'>) => void;
  serviceToEdit?: ServiceOffering | null;
}

const defaultService: Omit<ServiceOffering, 'id'> = {
  name: '',
  description: '',
  category: SERVICE_CATEGORIES_WITH_ICONS[0]?.name || '',
  price: 0,
  imageUrl: 'https://picsum.photos/seed/newservice/400/400',
  seller: 'Current Seller', // Placeholder
  location: 'Jakarta', // Placeholder
};

const ServiceEditModal: React.FC<ServiceEditModalProps> = ({ isOpen, onClose, onSave, serviceToEdit }) => {
  const [formData, setFormData] = useState<Omit<ServiceOffering, 'id'>>(defaultService);

  useEffect(() => {
    if (isOpen) {
      setFormData(serviceToEdit || defaultService);
    }
  }, [isOpen, serviceToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = serviceToEdit ? { ...formData, id: serviceToEdit.id } : formData;
    onSave(dataToSave);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">
            {serviceToEdit ? 'Edit Jasa' : 'Tambah Jasa Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col overflow-hidden">
          <div className="p-6 space-y-4 overflow-y-auto flex-grow">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Jasa</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategori Jasa</label>
                <select name="category" id="category" value={formData.category} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                  {SERVICE_CATEGORIES_WITH_ICONS.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
              <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
          </div>
          <div className="p-5 bg-gray-50 rounded-b-lg border-t flex-shrink-0">
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm hover:shadow-md"
            >
              <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
              Simpan Jasa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceEditModal;
