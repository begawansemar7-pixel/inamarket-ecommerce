import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon, DocumentArrowUpIcon } from '../icons/Icons';
import { HeroSlide } from '../../types';
import { fileToBase64 } from '../../utils/fileUtils';

interface HeroCarouselEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (slideData: Omit<HeroSlide, 'id'> & { id?: number }) => void;
  slideData: HeroSlide | null;
}

const defaultSlide: Omit<HeroSlide, 'id'> = {
  title: '',
  subtitle: '',
  imageUrl: 'https://picsum.photos/seed/newheroslide/1600/600',
  buttonText: '',
  actionType: 'scroll',
  actionPayload: 'product-section',
};

const navigationPages = [
    { value: 'about', label: 'Tentang Kami' },
    { value: 'careers', label: 'Karir' },
    { value: 'blog', label: 'Blog' },
    { value: 'contact', label: 'Kontak' },
    { value: 'help-center', label: 'Pusat Bantuan' },
];

const HeroCarouselEditModal: React.FC<HeroCarouselEditModalProps> = ({ isOpen, onClose, onSave, slideData }) => {
  const [formData, setFormData] = useState(defaultSlide);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64String = await fileToBase64(file);
        setFormData(prev => ({ ...prev, imageUrl: base64String }));
      } catch (error) {
        console.error("Error converting file to Base64", error);
        alert("Gagal memuat gambar. Silakan coba lagi.");
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
            {slideData ? 'Edit Slide Hero' : 'Tambah Slide Hero Baru'}
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
                    <div className="flex items-center space-x-2">
                        <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/webp" />
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-shrink-0 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md text-sm">
                            Upload
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Ukuran yang disarankan: 1600x600 piksel.</p>
                </div>
                {formData.imageUrl && (
                    <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700 mb-1">Pratinjau Gambar:</p>
                        <img src={formData.imageUrl} alt="Pratinjau Slide" className="w-full h-auto object-cover rounded-md border" />
                    </div>
                )}
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
                 {formData.actionType === 'scroll' && (
                    <div>
                        <label htmlFor="actionPayloadScroll" className="block text-sm font-medium text-gray-700 mb-1">ID Elemen Tujuan</label>
                        <input type="text" name="actionPayload" id="actionPayloadScroll" value={formData.actionPayload || ''} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" placeholder="contoh: product-section"/>
                    </div>
                )}
            </div>
            <div className="p-5 bg-gray-50 rounded-b-lg border-t flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm hover:shadow-md"
              >
                <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                Simpan Slide
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};
export default HeroCarouselEditModal;