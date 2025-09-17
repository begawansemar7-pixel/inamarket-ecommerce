import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCartIcon, DocumentTextIcon, ChevronRightIcon, TrashIcon, SparklesIcon } from '../components/icons/Icons';
import { Product, CartItem as CartItemType } from '../types';
import { PRODUCTS } from '../constants';


const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
};

const CartItemRow: React.FC<{
    item: CartItemType;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (id: number) => void;
    isRemoving: boolean;
}> = ({ item, onUpdateQuantity, onRemoveItem, isRemoving }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const prevQuantity = useRef(item.quantity);

    useEffect(() => {
        if (prevQuantity.current !== item.quantity) {
            setIsUpdating(true);
            const timer = setTimeout(() => setIsUpdating(false), 600);
            prevQuantity.current = item.quantity;
            return () => clearTimeout(timer);
        }
    }, [item.quantity]);

    return (
        <div className={`
            flex flex-col sm:grid sm:grid-cols-6 sm:gap-4 sm:items-center py-4 border-b
            transition-all duration-300 ease-in-out overflow-hidden
            ${isRemoving ? 'opacity-0 -translate-x-5 max-h-0 !py-0 !border-transparent' : 'max-h-40'}
            ${isUpdating ? 'animate-flash-bg' : ''}
        `}>
            {/* Product Info (Combined with mobile layout) */}
            <div className="col-span-3 flex items-center space-x-4">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-md object-cover flex-shrink-0" />
                <div className="flex-grow">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{formatRupiah(item.price)}</p>
                    {/* Mobile-only subtotal */}
                    <p className="sm:hidden text-base font-bold text-primary-dark mt-2">
                        {formatRupiah(item.price * item.quantity)}
                    </p>
                </div>
            </div>

            {/* Quantity Controls & Remove (Combined for mobile) */}
            <div className="col-span-3 flex sm:grid sm:grid-cols-3 sm:gap-4 items-center justify-between mt-4 sm:mt-0">
                {/* Quantity */}
                <div className="sm:col-span-1 flex items-center sm:justify-center">
                    <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="border rounded-l-md px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        aria-label="Decrease quantity"
                    >
                        &ndash;
                    </button>
                    <span className="border-t border-b px-3 py-1.5 text-center font-medium text-gray-800 w-12">{item.quantity}</span>
                    <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="border rounded-r-md px-3 py-1.5 text-gray-600 hover:bg-gray-100"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>

                {/* Subtotal (Desktop) */}
                <p className="hidden sm:block sm:col-span-1 text-lg font-bold text-primary-dark text-right">
                    {formatRupiah(item.price * item.quantity)}
                </p>

                {/* Remove Button */}
                <div className="sm:col-span-1 flex justify-end">
                    <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-600 p-1" aria-label={`Remove ${item.name}`}>
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};


const TransactionHistoryItem: React.FC<{item: Product & { date: string, status: 'Selesai' | 'Dikirim'}}> = ({ item }) => (
     <div className="flex items-center justify-between py-4 border-b">
        <div className="flex items-center space-x-4">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
            <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Tanggal: {item.date}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.status === 'Selesai' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {item.status}
                </span>
            </div>
        </div>
        <div className="flex items-center space-x-4">
             <p className="text-md font-semibold">{formatRupiah(item.price)}</p>
             <button className="text-primary hover:text-primary-dark flex items-center text-sm">
                Lihat Detail <ChevronRightIcon className="w-4 h-4 ml-1" />
            </button>
        </div>
    </div>
);

interface CartPageProps {
    items: CartItemType[];
    onUpdateQuantity: (id: number, newQuantity: number) => void;
    onRemoveItem: (id: number) => void;
    onCheckout: () => void;
    onStartShopping: () => void;
    isDirectSale: boolean;
    onToggleDirectSale: () => void;
    loyaltyPoints: number;
    onOpenRedemptionModal: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ 
    items, 
    onUpdateQuantity, 
    onRemoveItem, 
    onCheckout, 
    onStartShopping, 
    isDirectSale, 
    onToggleDirectSale, 
    loyaltyPoints, 
    onOpenRedemptionModal 
}) => {
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);

  // Dummy data for history
  const transactionHistory = [
      {...PRODUCTS[0], date: '1 Agu 2024', status: 'Selesai' as const},
      {...PRODUCTS[4], date: '28 Jul 2024', status: 'Selesai' as const},
      {...PRODUCTS[10], date: '15 Jul 2024', status: 'Selesai' as const},
  ];

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const platformFee = subtotal * 0.05;
  const promotionFee = isDirectSale ? subtotal * 0.10 : 0;
  const total = subtotal + platformFee + promotionFee;

  const marketMargin = subtotal * 0.05;
  const earnedPoints = Math.floor(marketMargin * 0.5); // 50% for points, 1 point = Rp 1
  const goldSavingsValue = marketMargin * 0.5; // 50% for gold savings
  
  const handleStartRemove = (itemId: number) => {
    setRemovingItemId(itemId);
    // Wait for animation to finish before removing from state
    setTimeout(() => {
        onRemoveItem(itemId);
    }, 300); 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Keranjang Saya</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Section */}
        <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-3 border-b pb-4 mb-4">
                    <ShoppingCartIcon className="w-6 h-6 text-primary-dark" />
                    <h2 className="text-xl font-bold text-gray-800">Produk di Keranjang ({items.length})</h2>
                </div>

                {items.length > 0 ? (
                    <div>
                        {/* Cart Header for Desktop */}
                        <div className="hidden sm:grid grid-cols-6 gap-4 items-center text-xs font-semibold text-gray-500 uppercase py-2 border-b">
                            <div className="col-span-3">Produk</div>
                            <div className="col-span-1 text-center">Jumlah</div>
                            <div className="col-span-1 text-right">Subtotal</div>
                            <div className="col-span-1 text-right pr-1">Hapus</div>
                        </div>

                        {items.map(item => <CartItemRow key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} onRemoveItem={() => handleStartRemove(item.id)} isRemoving={removingItemId === item.id} />)}
                        
                        <div className="mt-6 border-t pt-6">
                            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex-grow">
                                        <span className="font-semibold text-gray-800">Simulasikan Transaksi Langsung</span>
                                        <p className="text-sm text-gray-500">Aktifkan untuk menambahkan biaya promosi 10% (untuk tujuan demo).</p>
                                    </div>
                                     <div className={`${isDirectSale ? 'bg-primary' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}>
                                        <input type="checkbox" className="sr-only" checked={isDirectSale} onChange={onToggleDirectSale} />
                                        <span aria-hidden="true" className={`${isDirectSale ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
                                    </div>
                                </label>
                            </div>

                            <div className="max-w-sm ml-auto space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">{formatRupiah(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Biaya Layanan & Platform (5%)</span>
                                    <span className="font-medium">+ {formatRupiah(platformFee)}</span>
                                </div>
                                {isDirectSale && (
                                    <div className="flex justify-between text-gray-600 animate-step-in">
                                        <span>Biaya Promosi (10%)</span>
                                        <span className="font-medium">+ {formatRupiah(promotionFee)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xl font-bold text-gray-800 border-t pt-2 mt-2">
                                    <span>Total</span>
                                    <span>{formatRupiah(total)}</span>
                                </div>
                                <div className="pt-3 mt-3 border-t border-dashed">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Estimasi Keuntungan Loyalti</p>
                                    <div className="flex justify-between text-green-600 text-sm">
                                        <span>Poin Didapat</span>
                                        <span className="font-bold">{earnedPoints.toLocaleString('id-ID')} Poin</span>
                                    </div>
                                    <div className="flex justify-between text-yellow-600 text-sm mt-1">
                                        <span>Tabungan Emas</span>
                                        <span className="font-bold">{formatRupiah(goldSavingsValue)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button onClick={onCheckout} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-md text-lg transition-colors shadow-sm hover:shadow-md">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Keranjang belanja Anda masih kosong.</p>
                        <button onClick={onStartShopping} className="mt-4 text-primary hover:text-primary-dark font-semibold">
                            Mulai Belanja
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-3 border-b pb-4 mb-4">
                    <SparklesIcon className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-xl font-bold text-gray-800">Poin Loyalti Anda</h2>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-bold text-primary-dark">{loyaltyPoints} <span className="text-xl font-semibold text-gray-500">Poin</span></p>
                    <p className="text-sm text-gray-500 mt-1">Setara dengan {formatRupiah(loyaltyPoints * 1000)}</p>
                    <button
                        onClick={onOpenRedemptionModal}
                        className="mt-4 w-full bg-secondary hover:bg-secondary-dark text-yellow-900 font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm"
                    >
                        Tukarkan Poin
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                 <div className="flex items-center space-x-3 border-b pb-4 mb-4">
                    <DocumentTextIcon className="w-6 h-6 text-primary-dark" />
                    <h2 className="text-xl font-bold text-gray-800">Riwayat Transaksi</h2>
                </div>
                 {transactionHistory.length > 0 ? (
                    <div className="space-y-2">
                        {transactionHistory.map(item => <TransactionHistoryItem key={item.id} item={item} />)}
                        <div className="pt-4 text-center">
                            <button className="text-sm text-primary hover:text-primary-dark font-semibold">
                                Lihat Semua Transaksi
                            </button>
                        </div>
                    </div>
                 ) : (
                    <p className="text-center py-10 text-gray-500">Belum ada transaksi.</p>
                 )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;