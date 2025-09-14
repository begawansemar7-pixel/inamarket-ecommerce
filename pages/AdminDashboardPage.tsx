import React, { useState } from 'react';
import { ChartPieIcon, UserGroupIcon, ImageIcon, Cog6ToothIcon, TagIcon } from '../components/icons/Icons';
import DashboardView from '../components/admin/DashboardView';
import SellerApprovalView from '../components/admin/SellerApprovalView';
import CarouselManagementView from '../components/admin/CarouselManagementView';
import PromoBannerManagementView from '../components/admin/PromoBannerManagementView';
import { PromoBannerData } from '../types';

type AdminView = 'dashboard' | 'sellers' | 'carousel' | 'promo-banner' | 'settings';

interface AdminDashboardPageProps {
  promoBannerData: PromoBannerData;
  onUpdatePromoBanner: (newData: PromoBannerData) => void;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ promoBannerData, onUpdatePromoBanner }) => {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dasbor', icon: ChartPieIcon },
    { id: 'sellers', label: 'Persetujuan Penjual', icon: UserGroupIcon },
    { id: 'carousel', label: 'Carousel Bawah', icon: ImageIcon },
    { id: 'promo-banner', label: 'Banner Promosi', icon: TagIcon },
    { id: 'settings', label: 'Pengaturan', icon: Cog6ToothIcon },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'sellers':
        return <SellerApprovalView />;
      case 'carousel':
        return <CarouselManagementView />;
      case 'promo-banner':
        return <PromoBannerManagementView 
                  initialData={promoBannerData} 
                  onSave={onUpdatePromoBanner} 
                />;
      case 'settings':
        return <div>Pengaturan Admin</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
          INAMarket Admin
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-2">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id as AdminView)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeView === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboardPage;
