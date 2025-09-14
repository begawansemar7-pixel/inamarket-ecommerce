import React, { useState, useMemo } from 'react';
import { Address, ShippingOption, CartItem } from '../../types';
import { CheckCircleIcon } from '../icons/Icons';
import Spinner from '../Spinner';

interface ConfirmationStepProps {
  items: CartItem[];
  address: Address;
  shippingOption: ShippingOption;
  paymentMethod: string;
  onBackToHome: () => void;
  isDirectSale: boolean;
}

const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
};

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  items,
  address,
  shippingOption,
  paymentMethod,
  onBackToHome,
  isDirectSale,
}) => {
  const [paymentStatus, setPaymentStatus] = useState<'awaiting_payment' | 'confirming' | 'confirmed'>(
    paymentMethod === 'qris' ? 'awaiting_payment' : 'confirmed'
  );
  
  const { subtotal, platformFee, promotionFee, total } = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const platformFee = subtotal * 0.05;
    const promotionFee = isDirectSale ? subtotal * 0.10 : 0;
    const total = subtotal + shippingOption.price + platformFee + promotionFee;
    return { subtotal, platformFee, promotionFee, total };
  }, [items, shippingOption, isDirectSale]);

  const orderId = useMemo(() => `INAMarket-${Date.now()}`, []);

  const handleConfirmQrisPayment = () => {
    setPaymentStatus('confirming');
    setTimeout(() => {
      setPaymentStatus('confirmed');
    }, 3000);
  };

  const renderPaymentDetails = () => {
    if (paymentMethod === 'bank_transfer') {
      return (
        <div>
            <h3 className="font-semibold text-lg text-gray-800">Instruksi Pembayaran Bank Transfer</h3>
            <p className="text-sm text-gray-500 mb-3">Selesaikan pembayaran Anda melalui transfer ke Virtual Account berikut:</p>
            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm"><span>Bank Tujuan:</span> <span className="font-bold">BCA Virtual Account</span></div>
                <div className="flex justify-between text-sm"><span>Nomor VA:</span> <span className="font-bold text-lg text-primary-dark">8808{orderId.slice(-10)}</span></div>
                <div className="flex justify-between text-sm"><span>Total Bayar:</span> <span className="font-bold">{formatRupiah(total)}</span></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Harap selesaikan pembayaran dalam 1x24 jam.</p>
        </div>
      );
    }
    if (paymentMethod === 'qris') {
      switch (paymentStatus) {
        case 'awaiting_payment':
          return (
             <div>
                <h3 className="font-semibold text-lg text-gray-800">Instruksi Pembayaran QRIS</h3>
                <p className="text-sm text-gray-500 mb-3">Pindai kode QR di bawah ini dengan aplikasi e-wallet Anda.</p>
                <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`order_id=${orderId}&total=${total}`)}`} 
                        alt="QR Code Pembayaran" 
                        className="w-48 h-48 rounded-md" 
                    />
                    <p className="font-bold mt-2">Total Bayar: {formatRupiah(total)}</p>
                </div>
                <button
                    onClick={handleConfirmQrisPayment}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md transition-colors"
                >
                    Saya Sudah Bayar
                </button>
            </div>
          );
        case 'confirming':
            return (
                <div className="text-center py-10 flex flex-col items-center justify-center min-h-[200px]">
                    <Spinner />
                    <p className="mt-4 text-gray-700 font-medium">Mengkonfirmasi pembayaran...</p>
                </div>
            );
        case 'confirmed':
            // This case is handled by the top-level confirmation message
            return null;
      }
    }
    return null;
  };

  const isPaymentComplete = paymentStatus === 'confirmed';

  return (
    <div>
      <div className="text-center mb-6">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4 animate-scale-in" />
        <h2 className="text-2xl font-bold text-gray-800">
            {isPaymentComplete ? 'Pembayaran Selesai!' : 'Pesanan Berhasil Dibuat!'}
        </h2>
        <p className="text-gray-600 mt-2">
            {isPaymentComplete ? 'Terima kasih! Pesanan Anda telah kami konfirmasi.' : 'Segera selesaikan pembayaran Anda untuk melanjutkan.'}
        </p>
         <div className="mt-4 bg-gray-100 inline-block px-4 py-2 rounded-lg border">
            <p className="text-sm text-gray-600">ID Pesanan: <span className="font-bold text-gray-800">{orderId}</span></p>
        </div>
      </div>
      
      <div className="text-left bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        {renderPaymentDetails()}

        {isPaymentComplete && paymentMethod === 'qris' && (
             <div className="text-center py-4">
                <h3 className="font-semibold text-lg text-gray-800">Pembayaran Berhasil!</h3>
                <p className="text-sm text-gray-500">Pesanan Anda akan segera diproses.</p>
            </div>
        )}
        
        <div className="pt-6 border-t">
            <h3 className="font-semibold text-lg text-gray-800 mb-3">Rincian Tagihan</h3>
            <div className="text-sm text-gray-600 space-y-1.5">
                <div className="flex justify-between"><span>Subtotal Produk</span> <span className="font-medium text-gray-800">{formatRupiah(subtotal)}</span></div>
                <div className="flex justify-between"><span>Biaya Pengiriman ({shippingOption.name})</span> <span className="font-medium text-gray-800">{formatRupiah(shippingOption.price)}</span></div>
                <div className="flex justify-between"><span>Biaya Layanan & Platform (5%)</span> <span className="font-medium text-gray-800">{formatRupiah(platformFee)}</span></div>
                {isDirectSale && (
                    <div className="flex justify-between"><span>Biaya Promosi (10%)</span> <span className="font-medium text-gray-800">{formatRupiah(promotionFee)}</span></div>
                )}
                 <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t mt-2"><span>Total Tagihan</span> <span>{formatRupiah(total)}</span></div>
            </div>
        </div>

        <div className="pt-6 border-t">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Detail Pengiriman</h3>
            <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-800">{address.name} ({address.phone})</p>
                <p>{address.street}, {address.city}</p>
                <p>{address.province} {address.postalCode}</p>
                <p className="pt-2">Kurir: <span className="font-medium text-gray-800">{shippingOption.name}</span></p>
            </div>
        </div>
      </div>
      
      <div className="mt-8">
        <button onClick={onBackToHome} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-all shadow-sm hover:shadow-lg">
          {isPaymentComplete ? 'Lanjut Belanja' : 'Kembali ke Halaman Utama'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;