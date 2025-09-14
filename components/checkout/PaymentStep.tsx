import React, { useState, useMemo } from 'react';
import { PaymentOptions } from '../../types';
import { QrCodeIcon } from '../icons/Icons';

interface PaymentStepProps {
  onPaymentSubmit: (method: string) => void;
  onBack: () => void;
  availableOptions: PaymentOptions;
}

const paymentMethodDetails = {
    qris: { name: 'QRIS', logo: 'https://picsum.photos/seed/qris-logo/100/50', description: 'Bayar dengan memindai kode QR.' },
    bca: { name: 'BCA Virtual Account', logo: 'https://picsum.photos/seed/bca-logo/100/50', description: 'Bayar melalui transfer BCA VA.' },
    mandiri: { name: 'Mandiri Virtual Account', logo: 'https://picsum.photos/seed/mandiri-logo/100/50', description: 'Bayar melalui transfer Mandiri VA.' },
    bri: { name: 'BRI Virtual Account', logo: 'https://picsum.photos/seed/bri-logo/100/50', description: 'Bayar melalui transfer BRI VA.' },
    bni: { name: 'BNI Virtual Account', logo: 'https://picsum.photos/seed/bni-logo/100/50', description: 'Bayar melalui transfer BNI VA.' },
    gopay: { name: 'GoPay', logo: 'https://picsum.photos/seed/gopay-logo/100/50', description: 'Bayar menggunakan saldo GoPay Anda.' },
    ovo: { name: 'OVO', logo: 'https://picsum.photos/seed/ovo-logo/100/50', description: 'Bayar menggunakan saldo OVO Anda.' },
    shopeePay: { name: 'ShopeePay', logo: 'https://picsum.photos/seed/shopeepay-logo/100/50', description: 'Bayar menggunakan saldo ShopeePay.' },
    dana: { name: 'DANA', logo: 'https://picsum.photos/seed/dana-logo/100/50', description: 'Bayar menggunakan saldo DANA.' },
    linkAja: { name: 'LinkAja', logo: 'https://picsum.photos/seed/linkaja-logo/100/50', description: 'Bayar menggunakan saldo LinkAja.' },
};

type PaymentMethodKey = keyof typeof paymentMethodDetails;

const PaymentMethodCard: React.FC<{
  id: string;
  details: { name: string; logo: string; description: string };
  isSelected: boolean;
  onSelect: () => void;
}> = ({ id, details, isSelected, onSelect }) => (
    <label htmlFor={id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${isSelected ? 'border-primary-dark ring-2 ring-primary bg-primary-light/10 shadow-md' : 'border-gray-300 hover:border-primary hover:shadow'}`}>
        <input type="radio" id={id} name="payment" value={id} checked={isSelected} onChange={onSelect} className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
        <div className="ml-4 flex-grow flex items-center">
            <img src={details.logo} alt={details.name} className="w-16 h-8 object-contain mr-4" />
            <div>
                <p className="font-semibold text-gray-800">{details.name}</p>
                <p className="text-sm text-gray-500">{details.description}</p>
            </div>
        </div>
    </label>
);

const PaymentStep: React.FC<PaymentStepProps> = ({ onPaymentSubmit, onBack, availableOptions }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedMethod) {
      onPaymentSubmit(selectedMethod);
    }
  };

  const { availableVa, availableEWallets, hasAnyOption } = useMemo(() => {
    const vaKeys = Object.keys(availableOptions.virtualAccounts) as Array<keyof typeof availableOptions.virtualAccounts>;
    const eWalletKeys = Object.keys(availableOptions.eWallets) as Array<keyof typeof availableOptions.eWallets>;
    
    const availableVa = vaKeys.filter(key => availableOptions.virtualAccounts[key]);
    const availableEWallets = eWalletKeys.filter(key => availableOptions.eWallets[key]);
    
    const hasAnyOption = availableOptions.qris || availableVa.length > 0 || availableEWallets.length > 0;

    return { availableVa, availableEWallets, hasAnyOption };
  }, [availableOptions]);


  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Pilih Metode Pembayaran</h2>
      
      {!hasAnyOption ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-700">Tidak ada metode pembayaran yang sama</p>
            <p className="text-sm text-gray-500 mt-2">Produk di keranjang Anda berasal dari penjual yang berbeda dengan pilihan pembayaran yang tidak cocok. Silakan checkout secara terpisah.</p>
        </div>
      ) : (
        <div className="space-y-6">
            {/* QRIS Section */}
            {availableOptions.qris && (
                <div>
                    <h3 className="font-semibold text-gray-700 mb-3 text-lg">Pembayaran QR</h3>
                    <PaymentMethodCard
                        id="qris"
                        details={paymentMethodDetails.qris}
                        isSelected={selectedMethod === 'qris'}
                        onSelect={() => setSelectedMethod('qris')}
                    />
                </div>
            )}

            {/* Virtual Account Section */}
            {availableVa.length > 0 && (
                 <div>
                    <h3 className="font-semibold text-gray-700 mb-3 text-lg">Virtual Account Bank</h3>
                    <div className="space-y-3">
                    {availableVa.map(key => (
                        <PaymentMethodCard
                            key={key}
                            id={key}
                            details={paymentMethodDetails[key as PaymentMethodKey]}
                            isSelected={selectedMethod === key}
                            onSelect={() => setSelectedMethod(key)}
                        />
                    ))}
                    </div>
                </div>
            )}

             {/* E-Wallet Section */}
            {availableEWallets.length > 0 && (
                 <div>
                    <h3 className="font-semibold text-gray-700 mb-3 text-lg">E-Wallet</h3>
                    <div className="space-y-3">
                    {availableEWallets.map(key => (
                        <PaymentMethodCard
                            key={key}
                            id={key}
                            details={paymentMethodDetails[key as PaymentMethodKey]}
                            isSelected={selectedMethod === key}
                            onSelect={() => setSelectedMethod(key)}
                        />
                    ))}
                    </div>
                </div>
            )}
        </div>
      )}

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
