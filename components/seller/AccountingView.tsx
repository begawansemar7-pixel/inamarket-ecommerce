import React, { useState, useMemo } from 'react';
import { Product } from '../../types';
// Fix: Corrected the icon import from DocumentArrowDownIcon to the existing DocumentArrowUpIcon as suggested by the error.
import { DocumentArrowUpIcon } from '../icons/Icons';

interface AccountingViewProps {
  products: Product[];
}

interface Transaction {
    id: string;
    date: Date;
    productId: number;
    productName: string;
    quantity: number;
    pricePerItem: number;
    totalRevenue: number;
    cogs: number; // Cost of Goods Sold
    profit: number;
}

const StatCard: React.FC<{ title: string; value: string; description: string }> = ({ title, value, description }) => (
    <div className="bg-white p-5 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
);

const formatRupiah = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

// Simulate transaction data based on product sales
const generateSimulatedTransactions = (products: Product[]): Transaction[] => {
    const transactions: Transaction[] = [];
    const COGS_PERCENTAGE = 0.60; // Assume 60% Cost of Goods Sold

    products.forEach(product => {
        const totalSales = product.sales || 0;
        if (totalSales > 0) {
            // Distribute sales over the last 6 months
            for (let i = 0; i < totalSales; i++) {
                const saleDate = new Date();
                saleDate.setDate(1); // Start of month
                saleDate.setMonth(saleDate.getMonth() - Math.floor(Math.random() * 6)); // Random month in the last 6
                saleDate.setDate(Math.floor(Math.random() * 28) + 1); // Random day

                const quantity = 1; // Simplify to 1 item per transaction for simulation
                const totalRevenue = product.price * quantity;
                const cogs = totalRevenue * COGS_PERCENTAGE;
                const profit = totalRevenue - cogs;

                transactions.push({
                    id: `${product.id}-${i}`,
                    date: saleDate,
                    productId: product.id,
                    productName: product.name,
                    quantity,
                    pricePerItem: product.price,
                    totalRevenue,
                    cogs,
                    profit
                });
            }
        }
    });
    return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};


const AccountingView: React.FC<AccountingViewProps> = ({ products }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const allTransactions = useMemo(() => generateSimulatedTransactions(products), [products]);

    const filteredTransactions = useMemo(() => {
        return allTransactions.filter(t => 
            t.date.getFullYear() === selectedDate.getFullYear() &&
            t.date.getMonth() === selectedDate.getMonth()
        );
    }, [allTransactions, selectedDate]);
    
    const stats = useMemo(() => {
        const grossRevenue = filteredTransactions.reduce((acc, t) => acc + t.totalRevenue, 0);
        const totalCogs = filteredTransactions.reduce((acc, t) => acc + t.cogs, 0);
        const grossProfit = grossRevenue - totalCogs;
        const tax = grossRevenue * 0.005; // PPh Final 0.5% for UMKM
        const netProfit = grossProfit - tax;

        return { grossRevenue, totalCogs, grossProfit, tax, netProfit };
    }, [filteredTransactions]);
    
    const monthlyTrendData = useMemo(() => {
        const data: { [key: string]: { grossRevenue: number; netProfit: number } } = {};
        const today = new Date();

        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${d.getMonth()}`;
            data[key] = { grossRevenue: 0, netProfit: 0 };
        }

        // Populate data from transactions
        allTransactions.forEach(t => {
            const key = `${t.date.getFullYear()}-${t.date.getMonth()}`;
            if (data[key]) {
                const tax = t.totalRevenue * 0.005;
                data[key].grossRevenue += t.totalRevenue;
                data[key].netProfit += (t.profit - tax);
            }
        });

        // Format for chart
        return Object.keys(data).map(key => {
            const [year, month] = key.split('-').map(Number);
            const date = new Date(year, month);
            const monthName = date.toLocaleString('id-ID', { month: 'short' });
            const yearShort = date.getFullYear().toString().slice(-2);
            return {
                label: `${monthName} '${yearShort}`,
                ...data[key]
            };
        });
    }, [allTransactions]);

    const maxTrendValue = useMemo(() => {
        return Math.max(...monthlyTrendData.flatMap(d => [d.grossRevenue, d.netProfit]), 1);
    }, [monthlyTrendData]);


    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [year, month] = e.target.value.split('-').map(Number);
        const newDate = new Date(year, month - 1, 15); // Use day 15 to avoid timezone issues
        setSelectedDate(newDate);
    };

    const handleExportCSV = () => {
        const headers = ["Tanggal", "Nama Produk", "Jumlah", "Harga Satuan", "Total Pendapatan", "HPP", "Laba"];
        const rows = filteredTransactions.map(t => [
            t.date.toLocaleDateString('id-ID'),
            `"${t.productName.replace(/"/g, '""')}"`, // Handle commas in name
            t.quantity,
            t.pricePerItem,
            t.totalRevenue,
            t.cogs,
            t.profit
        ].join(','));

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `laporan_akunting_${selectedDate.getFullYear()}_${String(selectedDate.getMonth() + 1).padStart(2, '0')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const maxChartValue = Math.max(stats.grossRevenue, stats.netProfit, 1);

    return (
        <div className="space-y-8 animate-step-in">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-800">Laporan Akunting Bulanan</h2>
                    <div className="flex items-center gap-4">
                         <input
                            type="month"
                            value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`}
                            onChange={handleDateChange}
                            className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        />
                         <button
                            onClick={handleExportCSV}
                            disabled={filteredTransactions.length === 0}
                            className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm disabled:bg-green-300"
                        >
                            <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                            Ekspor CSV
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <StatCard title="Pendapatan Kotor" value={formatRupiah(stats.grossRevenue)} description="Total penjualan sebelum potongan." />
                    <StatCard title="Biaya (HPP)" value={formatRupiah(stats.totalCogs)} description="Estimasi biaya produk terjual." />
                    <StatCard title="Laba Kotor" value={formatRupiah(stats.grossProfit)} description="Pendapatan - Biaya (HPP)." />
                    <StatCard title="Pajak PPh Final" value={formatRupiah(stats.tax)} description="0.5% dari Pendapatan Kotor." />
                    <StatCard title="Laba Bersih" value={formatRupiah(stats.netProfit)} description="Laba setelah dipotong pajak." />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h3 className="text-lg font-bold text-gray-800 mb-4">Visualisasi Laporan - {selectedDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}</h3>
                 <div className="space-y-4">
                    {/* Gross Revenue Bar */}
                    <div className="group">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Pendapatan Kotor</span>
                            <span className="text-sm font-bold text-gray-800">{formatRupiah(stats.grossRevenue)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-5">
                            <div
                                className="bg-blue-500 h-5 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(stats.grossRevenue / maxChartValue) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                     {/* Net Profit Bar */}
                    <div className="group">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Laba Bersih</span>
                            <span className="text-sm font-bold text-gray-800">{formatRupiah(stats.netProfit)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-5">
                            <div
                                className="bg-primary h-5 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(stats.netProfit / maxChartValue) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                 </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Tren Pendapatan (6 Bulan Terakhir)</h3>
                {monthlyTrendData.length > 0 ? (
                    <div>
                        <div className="flex items-end justify-around h-64 border-l border-b border-gray-200 pl-4 pb-4">
                            {monthlyTrendData.map(monthData => (
                                <div key={monthData.label} className="flex flex-col items-center w-1/6 h-full pt-4">
                                    <div className="flex items-end h-full gap-2">
                                        <div className="group relative w-6 bg-blue-300 rounded-t-md hover:bg-blue-400 transition-all"
                                             style={{ height: `${(monthData.grossRevenue / maxTrendValue) * 100}%` }}>
                                            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                {formatRupiah(monthData.grossRevenue)}
                                            </div>
                                        </div>
                                        <div className="group relative w-6 bg-primary rounded-t-md hover:bg-primary-dark transition-all"
                                             style={{ height: `${(monthData.netProfit / maxTrendValue) * 100}%` }}>
                                            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                {formatRupiah(monthData.netProfit)}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-2">{monthData.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-center space-x-6 mt-4 text-sm">
                            <div className="flex items-center">
                                <span className="w-3 h-3 bg-blue-300 rounded-sm mr-2"></span>
                                <span>Pendapatan Kotor</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 bg-primary rounded-sm mr-2"></span>
                                <span>Laba Bersih</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-10">Data tidak cukup untuk menampilkan tren.</p>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Rincian Transaksi - {selectedDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}</h3>
                <div className="overflow-x-auto max-h-96">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-500">Tanggal</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-500">Produk</th>
                                <th className="px-4 py-2 text-right font-medium text-gray-500">Jumlah</th>
                                <th className="px-4 py-2 text-right font-medium text-gray-500">Pendapatan</th>
                                <th className="px-4 py-2 text-right font-medium text-gray-500">Laba</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map(t => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 whitespace-nowrap">{t.date.toLocaleDateString('id-ID')}</td>
                                        <td className="px-4 py-2 font-medium text-gray-800">{t.productName}</td>
                                        <td className="px-4 py-2 text-right">{t.quantity}</td>
                                        <td className="px-4 py-2 text-right">{formatRupiah(t.totalRevenue)}</td>
                                        <td className="px-4 py-2 text-right font-semibold text-green-600">{formatRupiah(t.profit)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 text-gray-500">Tidak ada transaksi pada periode ini.</td>
                                </tr>
                            )}
                        </tbody>
                        {filteredTransactions.length > 0 && (
                             <tfoot className="bg-gray-100 font-bold sticky bottom-0">
                                <tr>
                                    <td colSpan={3} className="px-4 py-2 text-right">Total</td>
                                    <td className="px-4 py-2 text-right">{formatRupiah(stats.grossRevenue)}</td>
                                    <td className="px-4 py-2 text-right">{formatRupiah(stats.grossProfit)}</td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AccountingView;