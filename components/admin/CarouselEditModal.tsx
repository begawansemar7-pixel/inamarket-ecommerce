import React, { useState, useEffect } from 'react';
import { CloseIcon, DocumentArrowUpIcon } from '../icons/Icons';
import { CarouselSlide } from './CarouselManagementView';

interface CarouselEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (slideData: Omit<CarouselSlide, 'id'> & { id?: number }) => void;
  slideData: CarouselSlide | null;
}

const defaultSlide: Omit<CarouselSlide, 'id'> = {
  title: '',
  subtitle: '',
  imageUrl: 'https://picsum.photos/seed/newslide/1600/600',
  buttonText: '',
  actionType: 'scroll',
  actionPayload: 'product-section',
};

// A curated list of public-facing pages for navigation options
const navigationPages = [
    { value: 'about', label: 'Tentang Kami' },
    { value: 'careers', label: 'Karir' },
    { value: 'blog', label: 'Blog' },
    { value: 'contact', label: 'Kontak' },
    { value: 'help-center', label: 'Pusat Bantuan' },
];

const CarouselEditModal: React.FC<CarouselEditModalProps> = ({ isOpen, onClose, onSave, slideData }) => {
  const [formData, setFormData] = useState(defaultSlide);

  useEffect(() => {
    if (isOpen) {
      setFormData(slideData || defaultSlide);
    }
  }, [isOpen, slideData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // If actionType is changed, reset actionPayload accordingly
    if (name === 'actionType') {
        if (value === 'scroll') {
            setFormData(prev => ({...prev, actionPayload: 'product-section'}));
        } else if (value === 'navigate') {
            setFormData(prev => ({...prev, actionPayload: navigationPages[0].value}));
        } else {
             setFormData(prev => ({...prev, actionPayload: null}));
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = slideData ? { ...formData, id: slideData.id } : formData;
    onSave(dataToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">
            {slideData ? 'Edit Slide Carousel' : 'Tambah Slide Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col overflow-hidden">
            <div className="p-6 space-y-4 overflow-y-auto flex-grow">
              
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                  <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>

                <div>
                  <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Subjudul</label>
                  <textarea name="subtitle" id="subtitle" value={formData.subtitle} onChange={handleChange} required rows={2} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>

                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                  <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                        <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-1">Teks Tombol</label>
                        <input type="text" name="buttonText" id="buttonText" value={formData.buttonText} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label htmlFor="actionType" className="block text-sm font-medium text-gray-700 mb-1">Aksi Tombol</label>
                        <select name="actionType" id="actionType" value={formData.actionType} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                            <option value="scroll">Scroll ke Produk</option>
                            <option value="navigate">Navigasi ke Halaman</option>
                            <option value="sell">Buka Modal Jual</option>
                        </select>
                    </div>
                </div>

                {formData.actionType === 'navigate' && (
                    <div>
                        <label htmlFor="actionPayload" className="block text-sm font-medium text-gray-700 mb-1">Halaman Tujuan</label>
                        <select name="actionPayload" id="actionPayload" value={formData.actionPayload || ''} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                            {navigationPages.map(page => (
                                <option key={page.value} value={page.value}>{page.label}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="p-5 bg-gray-50 rounded-b-lg border-t flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm hover:shadow-md"
              >
                <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                Simpan Perubahan
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CarouselEditModal;