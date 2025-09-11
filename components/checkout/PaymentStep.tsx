import React, { useState } from 'react';
import { BanknotesIcon, QrCodeIcon } from '../icons/Icons';

interface PaymentStepProps {
  onPaymentSubmit: (method: string) => void;
  onBack: () => void;
}

const paymentMethods = [
    { id: 'bank_transfer', name: 'Bank Transfer', icon: BanknotesIcon, description: 'Bayar melalui Virtual Account.' },
    { id: 'qris', name: 'QRIS', icon: QrCodeIcon, description: 'Bayar dengan memindai kode QR.' }
]

const PaymentStep: React.FC<PaymentStepProps> = ({ onPaymentSubmit, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedMethod) {
      onPaymentSubmit(selectedMethod);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Pilih Metode Pembayaran</h2>
       <div className="space-y-4">
        {paymentMethods.map(method => (
          <label key={method.id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${selectedMethod === method.id ? 'border-primary-dark ring-2 ring-primary bg-primary-light/10 shadow-md' : 'border-gray-300 hover:border-primary hover:shadow'}`}>
            <input type="radio" name="payment" value={method.id} onChange={() => setSelectedMethod(method.id)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
            <div className="ml-4 flex-grow flex items-center">
                <method.icon className="w-8 h-8 text-primary-dark mr-4" />
                <div>
                    <p className="font-semibold text-gray-800">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.description}</p>
                </div>
            </div>
          </label>
        ))}
      </div>
      <div className="pt-8 flex justify-between">
            <button onClick={onBack} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-5 rounded-md transition-colors">Kembali</button>
            <button onClick={handleSubmit} disabled={!selectedMethod} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-5 rounded-md transition-all duration-200 shadow-sm hover:shadow-lg disabled:bg-primary-light disabled:cursor-not-allowed disabled:shadow-none">
                Selesaikan Pesanan
            </button>
        </div>
    </div>
  );
};

export default PaymentStep;