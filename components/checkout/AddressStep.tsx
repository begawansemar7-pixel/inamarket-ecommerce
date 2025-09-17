
import React from 'react';
import { Address } from '../../types';

interface AddressStepProps {
  address: Address;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAddressSubmit: (e: React.FormEvent) => void;
}

const AddressStep: React.FC<AddressStepProps> = ({ address, onAddressChange, onAddressSubmit }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Alamat Pengiriman</h2>
      <form onSubmit={onAddressSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Penerima</label>
              <input type="text" name="name" id="name" value={address.name} onChange={onAddressChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
              <input type="tel" name="phone" id="phone" value={address.phone} onChange={onAddressChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
        </div>
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
          <textarea name="street" id="street" placeholder="Nama jalan, nomor rumah, RT/RW" value={address.street} onChange={onAddressChange} required rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"></textarea>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Kota/Kabupaten</label>
              <input type="text" name="city" id="city" value={address.city} onChange={onAddressChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
             <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700">Provinsi</label>
              <input type="text" name="province" id="province" value={address.province} onChange={onAddressChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
             <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Kode Pos</label>
                <input type="text" name="postalCode" id="postalCode" value={address.postalCode} onChange={onAddressChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
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
