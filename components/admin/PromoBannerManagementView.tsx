import React, { useState } from 'react';
import { PromoBannerData } from '../../types';
import AdminSection from './AdminSection';
import PromoBanner from '../PromoBanner';

// A toggle switch component for better UX
const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button
        type="button"
        className={`${
        enabled ? 'bg-primary' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
    >
        <span
        aria-hidden="true"
        className={`${
            enabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
    </button>
);

interface PromoBannerManagementViewProps {
  initialData: PromoBannerData;
  onSave: (newData: PromoBannerData) => void;
}

const PromoBannerManagementView: React.FC<PromoBannerManagementViewProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<PromoBannerData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (enabled: boolean) => {
    setFormData(prev => ({ ...prev, enabled }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
  };

  return (
    <AdminSection title="Pengelolaan Banner Promosi">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Fields */}
            <div className="space-y-5">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <label htmlFor="enabled" className="block text-sm font-bold text-gray-700">
                        Tampilkan Banner di Halaman Utama
                    </label>
                    <ToggleSwitch enabled={formData.enabled} onChange={handleToggle} />
                </div>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                <div>
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Subjudul</label>
                    <textarea name="subtitle" id="subtitle" value={formData.subtitle} onChange={handleChange} required rows={3} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                 <div>
                    <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-1">Teks Tombol</label>
                    <input type="text" name="buttonText" id="buttonText" value={formData.buttonText} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL Gambar Latar</label>
                    <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                <div className="pt-2">
                    <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm hover:shadow-md">
                        Simpan Perubahan
                    </button>
                </div>
            </div>

            {/* Live Preview */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Pratinjau Langsung</h3>
                <div className="transform scale-95 origin-top-left">
                    <PromoBanner data={formData} />
                </div>
                {!formData.enabled && (
                    <div className="text-center p-4 bg-gray-100 rounded-md text-gray-600">
                        Banner saat ini dinonaktifkan dan tidak akan muncul di halaman utama.
                    </div>
                )}
            </div>
        </form>
    </AdminSection>
  );
};

export default PromoBannerManagementView;
