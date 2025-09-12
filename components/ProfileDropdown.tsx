
import React from 'react';
import { UserCircleIcon, BuildingStorefrontIcon, ArrowLeftOnRectangleIcon } from './icons/Icons';

// Fix: Expanded Page type to include all possible navigation routes.
type Page = 'home' | 'cart' | 'dashboard' | 'profile' | 'checkout' | 'admin-login' | 'about' | 'careers' | 'blog' | 'contact' | 'help-center' | 'privacy-policy' | 'terms';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onClose, onNavigate, onLogout }) => {
  if (!isOpen) {
    return null;
  }

  const handleProfileClick = () => {
    onNavigate('profile');
    onClose();
  };

  const handleSellerDashboardClick = () => {
    onNavigate('dashboard');
    onClose();
  }

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div
      className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-dropdown-enter"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabIndex={-1}
    >
      <div className="py-1" role="none">
        <div className="px-4 py-2 border-b">
            <p className="text-sm text-gray-700">Masuk sebagai</p>
            <p className="text-sm font-medium text-gray-900 truncate">pengguna_inamarket</p>
        </div>
        <button
          onClick={handleProfileClick}
          className="w-full text-left text-gray-700 group flex items-center px-4 py-2 text-sm hover:bg-gray-100"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-0"
        >
          <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Lihat Profil
        </button>
        <button
          onClick={handleSellerDashboardClick}
          className="w-full text-left text-gray-700 group flex items-center px-4 py-2 text-sm hover:bg-gray-100"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-1"
        >
          <BuildingStorefrontIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Dasbor Penjual
        </button>
         <div className="border-t border-gray-100 my-1" />
        <button
          onClick={handleLogout}
          className="w-full text-left text-gray-700 group flex items-center px-4 py-2 text-sm hover:bg-gray-100"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-2"
        >
          <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
