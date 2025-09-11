import React, { useState } from 'react';
import { ShippingOption } from '../../types';
import { SHIPPING_OPTIONS } from '../../constants';

interface ShippingStepProps {
  onShippingSubmit: (option: ShippingOption) => void;
  onBack: () => void;
}

const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
};

const ShippingStep: React.FC<ShippingStepProps> = ({ onShippingSubmit, onBack }) => {
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(null);

  const handleSubmit = () => {
    if (selectedOption) {
      onShippingSubmit(selectedOption);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Pilih Metode Pengiriman</h2>
      <div className="space-y-4">
        {SHIPPING_OPTIONS.map(option => (
          <label key={option.id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${selectedOption?.id === option.id ? 'border-primary-dark ring-2 ring-primary bg-primary-light/10 shadow-md' : 'border-gray-300 hover:border-primary hover:shadow'}`}>
            <input type="radio" name="shipping" value={option.id} onChange={() => setSelectedOption(option)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
            <div className="ml-4 flex-grow flex justify-between items-center">
                <div>
                    <p className="font-semibold text-gray-800">{option.name}</p>
                    <p className="text-sm text-gray-500">Estimasi tiba: {option.estimatedDelivery}</p>
                </div>
                <p className="font-bold text-gray-800">{formatRupiah(option.price)}</p>
            </div>
          </label>
        ))}
      </div>
       <div className="pt-8 flex justify-between">
            <button onClick={onBack} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-5 rounded-md transition-colors">Kembali</button>
            <button onClick={handleSubmit} disabled={!selectedOption} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-5 rounded-md transition-all duration-200 shadow-sm hover:shadow-lg disabled:bg-primary-light disabled:cursor-not-allowed disabled:shadow-none">
                Lanjut ke Pembayaran
            </button>
        </div>
    </div>
  );
};

export default ShippingStep;