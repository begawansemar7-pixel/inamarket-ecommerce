
import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCartIcon, SparklesIcon, UserCircleIcon, SearchIcon, ChatBubbleLeftRightIcon } from './icons/Icons';
import ProfileDropdown from './ProfileDropdown';

// Fix: Expanded Page type to include all possible navigation routes.
type Page = 'home' | 'cart' | 'dashboard' | 'profile' | 'checkout' | 'admin-login' | 'about' | 'careers' | 'blog' | 'contact' | 'help-center' | 'privacy-policy' | 'terms';

interface HeaderProps {
    isAuthenticated: boolean;
    onLoginClick: () => void;
    onSellClick: () => void;
    onNavigate: (page: Page) => void;
    activePage: Page;
    cartItemCount: number;
    onLogout: () => void;
    unreadMessageCount: number;
    onChatClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    isAuthenticated, 
    onLoginClick, 
    onSellClick, 
    onNavigate, 
    activePage, 
    cartItemCount, 
    onLogout,
    unreadMessageCount,
    onChatClick
}) => {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div onClick={() => onNavigate('home')} className="cursor-pointer">
                        <h1 className="text-2xl font-bold text-primary">INAMarket</h1>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Cari Kopi Gayo di INAMarket..."
                                className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-primary-light focus:border-primary"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onSellClick}
                            className="flex items-center bg-primary-light/20 text-primary-dark font-semibold px-4 py-2 rounded-full hover:bg-primary-light/40 transition-colors"
                        >
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            Jual
                        </button>

                        <div className="h-6 w-px bg-gray-200"></div>

                        <button onClick={onChatClick} className="relative text-gray-600 hover:text-primary-dark transition-colors" aria-label="Buka obrolan">
                            <ChatBubbleLeftRightIcon className="w-6 h-6" />
                            {unreadMessageCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                                    {unreadMessageCount}
                                </span>
                            )}
                        </button>

                        <button onClick={() => onNavigate('cart')} className="relative text-gray-600 hover:text-primary-dark transition-colors" aria-label="Buka keranjang">
                            <ShoppingCartIcon className="w-6 h-6" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                        
                        {isAuthenticated ? (
                             <div className="relative" ref={profileRef}>
                                <button onClick={() => setProfileOpen(prev => !prev)} className="text-gray-600 hover:text-primary-dark transition-colors">
                                    <UserCircleIcon className="w-8 h-8" />
                                </button>
                                <ProfileDropdown
                                    isOpen={isProfileOpen}
                                    onClose={() => setProfileOpen(false)}
                                    onNavigate={onNavigate}
                                    onLogout={onLogout}
                                />
                             </div>
                        ) : (
                            <button onClick={onLoginClick} className="bg-primary text-white font-semibold px-5 py-2 rounded-full hover:bg-primary-dark transition-colors">
                                Masuk
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
