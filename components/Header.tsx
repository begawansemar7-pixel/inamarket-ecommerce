
import React from 'react';
import { SearchIcon, ShoppingCartIcon, UserIcon } from './icons/Icons';

interface HeaderProps {
  onSellClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSellClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-2xl font-bold text-primary-dark">
              INAMarket
            </a>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari produk lokal favoritmu..."
                className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-primary transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-primary transition-colors">
              <UserIcon className="h-6 w-6" />
            </button>
            <button
              onClick={onSellClick}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-full transition-colors shadow-sm hover:shadow-md"
            >
              Jual di INAMarket
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
