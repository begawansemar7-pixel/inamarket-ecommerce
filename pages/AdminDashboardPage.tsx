import React, { useState } from 'react';
import { ChartPieIcon, UserGroupIcon, ImageIcon, Cog6ToothIcon, TagIcon, NewspaperIcon } from '../components/icons/Icons';
import DashboardView from '../components/admin/DashboardView';
import SellerApprovalView from '../components/admin/SellerApprovalView';
import CarouselManagementView from '../components/admin/CarouselManagementView';
import PromoBannerManagementView from '../components/admin/PromoBannerManagementView';
import { PromoBannerData, HeroSlide, AdminUser, BlogPost } from '../types';
import HeroCarouselManagementView from '../components/admin/HeroCarouselManagementView';
import SettingsView from '../components/admin/SettingsView';
import BlogManagementView from '../components/admin/BlogManagementView';
import { BLOG_POSTS } from '../constants';

type AdminView = 'dashboard' | 'sellers' | 'carousel' | 'promo-banner' | 'settings' | 'hero-carousel' | 'blog';

interface AdminDashboardPageProps {
  promoBannerData: PromoBannerData;
  onUpdatePromoBanner: (newData: PromoBannerData) => void;
  heroSlides: HeroSlide[];
  onUpdateHeroSlides: (newSlides: HeroSlide[]) => void;
}

const initialAdminUsers: AdminUser[] = [
  { id: 1, name: 'Admin Utama', email: 'superadmin@inamarket.com', role: 'Super Admin' },
  { id: 2, name: 'Budi Konten', email: 'budi.blog@inamarket.com', role: 'Admin Blog' },
  { id: 3, name: 'Citra Promo', email: 'citra.promo@inamarket.com', role: 'Admin Promosi' },
  { id: 4, name: 'Dedi Layanan', email: 'dedi.cs@inamarket.com', role: 'Admin Layanan' },
];

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ promoBannerData, onUpdatePromoBanner, heroSlides, onUpdateHeroSlides }) => {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(initialAdminUsers);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);

  const navItems = [
    { id: 'dashboard', label: 'Dasbor', icon: ChartPieIcon },
    { id: 'sellers', label: 'Persetujuan Penjual', icon: UserGroupIcon },
    { id: 'blog', label: 'Manajemen Blog', icon: NewspaperIcon },
    { id: 'hero-carousel', label: 'Carousel Atas', icon: ImageIcon },
    { id: 'carousel', label: 'Carousel Bawah', icon: ImageIcon },
    { id: 'promo-banner', label: 'Banner Promosi', icon: TagIcon },
    { id: 'settings', label: 'Pengaturan', icon: Cog6ToothIcon },
  ];

  const handleAddUser = (user: Omit<AdminUser, 'id'>) => {
    const newUser: AdminUser = { ...user, id: Date.now() };
    setAdminUsers(prev => [newUser, ...prev]);
  };

  const handleUpdateUser = (updatedUser: AdminUser) => {
    setAdminUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus akun admin ini?')) {
      setAdminUsers(prev => prev.filter(u => u.id !== userId));
    }
  };
  
  const handleAddPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = { ...post, id: Date.now() };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const handleUpdatePost = (updatedPost: BlogPost) => {
    setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const handleDeletePost = (postId: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus postingan blog ini?')) {
      setBlogPosts(prev => prev.filter(p => p.id !== postId));
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'sellers':
        return <SellerApprovalView />;
      case 'blog':
        return <BlogManagementView 
                  posts={blogPosts}
                  onAddPost={handleAddPost}
                  onUpdatePost={handleUpdatePost}
                  onDeletePost={handleDeletePost}
                />;
      case 'hero-carousel':
        return <HeroCarouselManagementView slides={heroSlides} onSave={onUpdateHeroSlides} />;
      case 'carousel':
        return <CarouselManagementView />;
      case 'promo-banner':
        return <PromoBannerManagementView 
                  initialData={promoBannerData} 
                  onSave={onUpdatePromoBanner} 
                />;
      case 'settings':
        return <SettingsView 
                  users={adminUsers}
                  onAddUser={handleAddUser}
                  onUpdateUser={handleUpdateUser}
                  onDeleteUser={handleDeleteUser}
                />;
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