import React from 'react';
import { ShippingOption, CartItem } from '../../types';

interface OrderSummaryProps {
  items: CartItem[];
  shippingOption: ShippingOption | null;
  isDirectSale: boolean;
}

const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
};


const OrderSummary: React.FC<OrderSummaryProps> = ({ items, shippingOption, isDirectSale }) => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = shippingOption?.price || 0;
    const platformFee = subtotal * 0.05;
    const promotionFee = isDirectSale ? subtotal * 0.10 : 0;
    const total = subtotal + shippingCost + platformFee + promotionFee;
    
    const marketMargin = subtotal * 0.05;
    const earnedPoints = Math.floor(marketMargin * 0.5);
    const goldSavingsValue = marketMargin * 0.5;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Ringkasan Pesanan</h3>
      <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
        {items.map(item => (
            <div key={item.id} className="flex items-start space-x-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                <div>
                    <p className="font-semibold text-gray-700 leading-tight">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.quantity} x {formatRupiah(item.price)}</p>
                </div>
            </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t space-y-2">
        <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">{formatRupiah(subtotal)}</span>
        </div>
         <div className="flex justify-between text-gray-600">
            <span>Pengiriman</span>
            <span className="font-medium">{shippingOption ? formatRupiah(shippingCost) : '-'}</span>
        </div>
        <div className="flex justify-between text-gray-600">
            <span>Biaya Layanan & Platform (5%)</span>
            <span className="font-medium">{formatRupiah(platformFee)}</span>
        </div>
        {isDirectSale && (
             <div className="flex justify-between text-gray-600 animate-step-in">
                <span>Biaya Promosi (10%)</span>
                <span className="font-medium">{formatRupiah(promotionFee)}</span>
            </div>
        )}
        <div className="flex justify-between text-gray-800 font-bold text-lg pt-2 border-t mt-2">
            <span>Total</span>
            <span>{formatRupiah(total)}</span>
        </div>
         <div className="pt-3 mt-3 border-t border-dashed">
            <p className="text-xs font-semibold text-gray-600 mb-2">Estimasi Keuntungan Loyalti:</p>
            <div className="flex justify-between text-green-700 text-sm">
                <span>Poin Didapat</span>
                <span className="font-bold">{earnedPoints.toLocaleString('id-ID')} Poin</span>
            </div>
            <div className="flex justify-between text-yellow-700 text-sm mt-1">
                <span>Tabungan Emas</span>
                <span className="font-bold">{formatRupiah(goldSavingsValue)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
