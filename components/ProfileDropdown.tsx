
import React from 'react';
import { UserCircleIcon, BuildingStorefrontIcon, ArrowLeftOnRectangleIcon, WrenchScrewdriverIcon } from './icons/Icons';

type Page = 'home' | 'cart' | 'dashboard' | 'profile' | 'checkout' | 'admin-login' | 'admin-dashboard' | 'about' | 'careers' | 'blog' | 'contact' | 'help-center' | 'privacy-policy' | 'terms';
type UserRole = 'Buyer' | 'Seller' | 'Admin';

interface ProfileDropdownProps {
  isOpen: boolean;
  userRole: UserRole | null;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, userRole, onClose, onNavigate, onLogout }) => {
  if (!isOpen) {
    return null;
  }

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    onClose();
  };

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
            <p className="text-sm font-medium text-gray-900 truncate">{userRole || 'Pengguna'}</p>
        </div>
        <button
          onClick={() => handleNavigate('profile')}
          className="w-full text-left text-gray-700 group flex items-center px-4 py-2 text-sm hover:bg-gray-100"
          role="menuitem"
          tabIndex={-1}
        >
          <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Lihat Profil
        </button>
        {userRole === 'Seller' && (
            <button
              onClick={() => handleNavigate('dashboard')}
              className="w-full text-left text-gray-700 group flex items-center px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
            >
              <BuildingStorefrontIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Dasbor Penjual
            </button>
        )}
         {userRole === 'Admin' && (
            <button
              onClick={() => handleNavigate('admin-dashboard')}
              className="w-full text-left text-gray-700 group flex items-center px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
            >
              <WrenchScrewdriverIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Dasbor Admin
            </button>
        )}
         <div className="border-t border-gray-100 my-1" />
        <button
          onClick={handleLogout}
          className="w-full text-left text-gray-700 group flex items-center px-4 py-2 text-sm hover:bg-gray-100"
          role="menuitem"
          tabIndex={-1}
        >
          <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
