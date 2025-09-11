import React, { useState } from 'react';
import { Address } from '../../types';

interface AddressStepProps {
  onAddressSubmit: (data: Address) => void;
}

const AddressStep: React.FC<AddressStepProps> = ({ onAddressSubmit }) => {
  const [formData, setFormData] = useState<Address>({
    name: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key as keyof Address] === '') {
        alert('Harap isi semua kolom.');
        return;
      }
    }
    onAddressSubmit(formData);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Alamat Pengiriman</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Penerima</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
        </div>
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
          <textarea name="street" id="street" placeholder="Nama jalan, nomor rumah, RT/RW" value={formData.street} onChange={handleChange} required rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"></textarea>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Kota/Kabupaten</label>
              <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
             <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700">Provinsi</label>
              <input type="text" name="province" id="province" value={formData.province} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
             <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Kode Pos</label>
                <input type="text" name="postalCode" id="postalCode" value={formData.postalCode} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
        </div>
        <div className="pt-4">
            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-all duration-200 shadow-sm hover:shadow-lg">Lanjut ke Pengiriman</button>
        </div>
      </form>
    </div>
  );
};

export default AddressStep;