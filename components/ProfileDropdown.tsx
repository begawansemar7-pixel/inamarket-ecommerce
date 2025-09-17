
import React from 'react';
import { UserCircleIcon, BuildingStorefrontIcon, ArrowLeftOnRectangleIcon, WrenchScrewdriverIcon } from './icons/Icons';
// Fix: Import the centralized 'Page' type to ensure type consistency for navigation.
import { Page } from '../types';

// Fix: Remove the local 'Page' type definition in favor of the centralized one from types.ts.
type UserRole = 'Buyer' | 'Seller' | 'Admin' | 'Reseller';

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
      <div className="p-1" role="none">
        <div className="px-4 py-2 border-b mb-1">
            <p className="text-sm text-gray-700">Masuk sebagai</p>
            <p className="text-sm font-medium text-gray-900 truncate">{userRole || 'Pengguna'}</p>
        </div>
        <button
          onClick={() => handleNavigate('profile')}
          className="w-full text-left text-gray-700 group flex items-center px-4 py-2 text-sm rounded-md hover:bg-teal-50 hover:text-teal-800 transition-colors"
          role="menuitem"
          tabIndex={-1}
        >
          <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-teal-600" />
          Lihat Profil
        </button>
        {(userRole === 'Seller' || userRole === 'Reseller') && (
            <button
              onClick={() => handleNavigate('seller-dashboard')}
              className="w-full text-left text-gray-700 group flex items-center px-4 py-2 text-sm rounded-md hover:bg-teal-50 hover:text-teal-800 transition-colors"
              role="menuitem"
              tabIndex={-1}
            >
              <BuildingStorefrontIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-teal-600" />
              {userRole === 'Reseller' ? 'Dasbor Reseller' : 'Dasbor Penjual'}
            </button>
        )}
         {userRole === 'Admin' && (
            <button
              onClick={() => handleNavigate('admin-dashboard')}
              className="w-full text-left text-gray-700 group flex items-center px-4 py-2 text-sm rounded-md hover:bg-teal-50 hover:text-teal-800 transition-colors"
              role="menuitem"
              tabIndex={-1}
            >
              <WrenchScrewdriverIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-teal-600" />
              Dasbor Admin
            </button>
        )}
         <div className="border-t border-gray-100 my-1" />
        <button
          onClick={handleLogout}
          className="w-full text-left text-gray-700 group flex items-center px-4 py-2 text-sm rounded-md hover:bg-teal-50 hover:text-teal-800 transition-colors"
          role="menuitem"
          tabIndex={-1}
        >
          <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-teal-600" />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
