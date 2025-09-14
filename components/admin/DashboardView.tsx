import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import AdminSection from './AdminSection';
import { BuildingStorefrontIcon, UserGroupIcon, ShoppingCartIcon, BanknotesIcon } from '../icons/Icons';
import { PRODUCTS } from '../../constants';
import CategoryProductChart from './CategoryProductChart';

const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
};

const formatNumber = (num: number) => new Intl.NumberFormat('id-ID').format(Math.round(num));

type TimeFilter = 'daily' | 'weekly' | 'monthly' | 'yearly';

// --- Static Platform-wide Stats ---
// These stats represent the total size of the platform and don't change with the time filter.
const totalSellers = formatNumber(new Set(PRODUCTS.map(p => p.seller)).size);
const totalBuyers = formatNumber(15321); // A realistic dummy number for total registered buyers
const totalProducts = formatNumber(PRODUCTS.length);


const DashboardView: React.FC = () => {
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('daily');
    const [periodicStats, setPeriodicStats] = useState({
        transactions: '0',
        revenue: 0,
        avgTransaction: 0,
    });

    useEffect(() => {
        // --- Period-Specific Stats Simulation ---
        // Base figures for simulation, assuming they represent a monthly total activity.
        const baseTransactions = 4850;
        // Simulate a larger monthly revenue based on all products sales value.
        const baseRevenue = PRODUCTS.reduce((acc, p) => acc + (p.sales || 0) * p.price, 0) * 12; 

        let scale = 1;
        switch (timeFilter) {
            case 'daily': scale = 1 / 30; break;
            case 'weekly': scale = 7 / 30; break;
            case 'monthly': scale = 1; break;
            case 'yearly': scale = 12; break;
        }

        const randomFactor = (min = 0.9, max = 1.1) => min + Math.random() * (max - min);

        const newTransactions = Math.max(1, Math.round(baseTransactions * scale * randomFactor()));
        const newRevenue = baseRevenue * scale * randomFactor();
        
        setPeriodicStats({
            transactions: formatNumber(newTransactions),
            revenue: newRevenue,
            avgTransaction: newTransactions > 0 ? newRevenue / newTransactions : 0,
        });

    }, [timeFilter]);

    const categoryCounts = PRODUCTS.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });

    const filterOptions: { id: TimeFilter; label: string }[] = [
        { id: 'daily', label: 'Harian' },
        { id: 'weekly', label: 'Mingguan' },
        { id: 'monthly', label: 'Bulanan' },
        { id: 'yearly', label: 'Tahunan' },
    ];

  return (
    <div className="animate-step-in">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Dasbor Utama</h2>
                <p className="text-gray-500">Ringkasan aktivitas platform.</p>
            </div>
            <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-lg self-start sm:self-center">
               {filterOptions.map(option => (
                 <button
                    key={option.id}
                    onClick={() => setTimeFilter(option.id)}
                    className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                        timeFilter === option.id
                            ? 'bg-white text-primary shadow-sm'
                            : 'bg-transparent text-gray-600 hover:bg-gray-300'
                    }`}
                >
                    {option.label}
                </button>
               ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Penjual" value={totalSellers} icon={BuildingStorefrontIcon} />
            <StatCard title="Total Pembeli" value={totalBuyers} icon={UserGroupIcon} />
            <StatCard title="Total Produk" value={totalProducts} icon={ShoppingCartIcon} />
            <StatCard title="Transaksi" value={periodicStats.transactions} icon={BanknotesIcon} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
                <AdminSection title="Produk per Kategori">
                    <CategoryProductChart data={categoryCounts} />
                </AdminSection>
            </div>
            <div className="lg:col-span-2">
                 <AdminSection title="Ringkasan Finansial">
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-gray-500 text-sm font-medium">Total Pendapatan</h4>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{formatRupiah(periodicStats.revenue)}</p>
                        </div>
                         <div>
                            <h4 className="text-gray-500 text-sm font-medium">Transaksi Rata-rata</h4>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{formatRupiah(periodicStats.avgTransaction)}</p>
                        </div>
                    </div>
                 </AdminSection>
            </div>
        </div>
    </div>
  );
};

export default DashboardView;