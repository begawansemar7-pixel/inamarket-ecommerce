

import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCartIcon, UserCircleIcon, SearchIcon, ChatBubbleLeftRightIcon, ChevronDownIcon, MenuIcon, CloseIcon, ArrowLeftOnRectangleIcon } from './icons/Icons';
import ProfileDropdown from './ProfileDropdown';
// Fix: Import the centralized 'Page' type to ensure type consistency for navigation.
import { Page } from '../types';

// Fix: Remove the local 'Page' type definition in favor of the centralized one from types.ts.
type UserRole = 'Buyer' | 'Seller' | 'Admin' | 'Reseller';

interface HeaderProps {
    isAuthenticated: boolean;
    userRole: UserRole | null;
    onLoginClick: () => void;
    onNavigate: (page: Page) => void;
    activePage: Page;
    cartItemCount: number;
    onLogout: () => void;
    unreadMessageCount: number;
    onChatClick: () => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const NavLink: React.FC<{
    page: Page;
    activePage: Page;
    onNavigate: (page: Page) => void;
    children: React.ReactNode;
    className?: string;
}> = ({ page, activePage, onNavigate, children, className }) => (
    <button
        onClick={() => onNavigate(page)}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activePage === page
                ? 'bg-primary-light/20 text-primary-dark'
                : 'text-gray-600 hover:bg-gray-100'
        } ${className}`}
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ 
    isAuthenticated,
    userRole,
    onLoginClick, 
    onNavigate, 
    activePage, 
    cartItemCount, 
    onLogout,
    unreadMessageCount,
    onChatClick,
    searchTerm,
    onSearchChange
}) => {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const moreMenuRef = useRef<HTMLDivElement>(null);
    const [isCartAnimating, setIsCartAnimating] = useState(false);
    const prevCartItemCount = useRef(cartItemCount);

    useEffect(() => {
        // Animate only when items are added (count increases), not removed.
        if (cartItemCount > prevCartItemCount.current) {
            setIsCartAnimating(true);
            const timer = setTimeout(() => {
                setIsCartAnimating(false);
            }, 600); // Must match animation duration

            return () => clearTimeout(timer);
        }
        // Update the ref for the next render.
        prevCartItemCount.current = cartItemCount;
    }, [cartItemCount]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
             if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
                setMoreMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDropdownNavigate = (page: Page) => {
        onNavigate(page);
        setMoreMenuOpen(false);
    };

    const handleMobileLinkClick = (page: Page) => {
        onNavigate(page);
        setMobileMenuOpen(false);
    };

    const MobileNavLink: React.FC<{ page: Page; children: React.ReactNode }> = ({ page, children }) => (
      <button onClick={() => handleMobileLinkClick(page)} className="w-full text-left py-3 px-4 text-base text-gray-700 hover:bg-gray-100 rounded-md">
        {children}
      </button>
    );

    return (
        <>
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4">
                {/* Desktop Header */}
                <div className="hidden md:flex justify-between items-center py-3">
                    {/* Left Side: Logo & Nav */}
                    <div className="flex items-center space-x-6">
                        {/* Logo */}
                        <div onClick={() => onNavigate('home')} className="cursor-pointer flex items-center flex-shrink-0">
                            <svg height="38" viewBox="0 0 175 38" xmlns="http://www.w3.org/2000/svg" aria-labelledby="logoTitle" role="img">
                                <title id="logoTitle">INAMarket Logo</title>
                                <defs><linearGradient id="logoIconGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2dd4bf" /><stop offset="100%" stop-color="#0f766e" /></linearGradient></defs>
                                <g transform="translate(2, 2)"><path d="M34,17 A17,17 0 1,1 17,0 L17,6 A11,11 0 1,0 28,17 Z" fill="url(#logoIconGradient)" /><circle cx="17" cy="17" r="5" fill="url(#logoIconGradient)" /></g>
                                <text x="48" y="29" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="800" fill="#1e293b">INAMarket</text>
                            </svg>
                        </div>
                        <nav className="hidden md:flex items-center space-x-1">
                            <NavLink page="about" activePage={activePage} onNavigate={onNavigate}>Tentang Kami</NavLink>
                            <NavLink page="blog" activePage={activePage} onNavigate={onNavigate}>Blog</NavLink>
                            <NavLink page="contact" activePage={activePage} onNavigate={onNavigate}>Kontak</NavLink>
                            <div className="relative" ref={moreMenuRef}>
                                <button onClick={() => setMoreMenuOpen(prev => !prev)} className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                                    Lainnya
                                    <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isMoreMenuOpen && (
                                    <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-dropdown-enter">
                                        <div className="p-1" role="menu">
                                            <button onClick={() => handleDropdownNavigate('careers')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-800 transition-colors" role="menuitem">Karir</button>
                                            <button onClick={() => handleDropdownNavigate('help-center')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-800 transition-colors" role="menuitem">Pusat Bantuan</button>
                                            <div className="border-t my-1"></div>
                                            <button onClick={() => handleDropdownNavigate('privacy-policy')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-800 transition-colors" role="menuitem">Kebijakan Privasi</button>
                                            <button onClick={() => handleDropdownNavigate('terms')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-800 transition-colors" role="menuitem">Syarat & Ketentuan</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                    
                    <div className="flex flex-1 max-w-xl mx-6">
                        <div className="relative w-full">
                            <input
                              type="text"
                              placeholder="Cari Kopi Gayo di INAMarket..."
                              className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-primary-light focus:border-primary"
                              value={searchTerm}
                              onChange={(e) => onSearchChange(e.target.value)}
                            />
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 flex-shrink-0">
                        <button onClick={onChatClick} className="relative text-gray-600 hover:text-primary-dark transition-colors" aria-label="Buka obrolan">
                            <ChatBubbleLeftRightIcon className="w-6 h-6" />
                            {unreadMessageCount > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">{unreadMessageCount}</span>)}
                        </button>
                        <button onClick={() => onNavigate('cart')} className={`relative text-gray-600 hover:text-primary-dark transition-colors ${isCartAnimating ? 'animate-cart-bounce' : ''}`} aria-label="Buka keranjang">
                            <ShoppingCartIcon className="w-6 h-6" />
                            {cartItemCount > 0 && (<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">{cartItemCount}</span>)}
                        </button>
                        {isAuthenticated ? (
                             <div className="relative" ref={profileRef}>
                                <button onClick={() => setProfileOpen(prev => !prev)} className="text-gray-600 hover:text-primary-dark transition-colors"><UserCircleIcon className="w-8 h-8" /></button>
                                <ProfileDropdown isOpen={isProfileOpen} userRole={userRole} onClose={() => setProfileOpen(false)} onNavigate={onNavigate} onLogout={onLogout} />
                             </div>
                        ) : (
                            <button onClick={onLoginClick} className="bg-primary text-white font-semibold px-5 py-2 rounded-full hover:bg-primary-dark transition-colors">Masuk</button>
                        )}
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden">
                    <div className="flex justify-between items-center py-3">
                        <button onClick={() => setMobileMenuOpen(true)} className="text-gray-600 p-2 -ml-2"><MenuIcon className="w-6 h-6" /></button>
                        <div onClick={() => onNavigate('home')} className="cursor-pointer">
                           <svg height="32" viewBox="0 0 175 38" xmlns="http://www.w3.org/2000/svg" aria-labelledby="logoTitleMobile" role="img">
                                <title id="logoTitleMobile">INAMarket Logo</title>
                                <g transform="translate(2, 2) scale(0.85)"><path d="M34,17 A17,17 0 1,1 17,0 L17,6 A11,11 0 1,0 28,17 Z" fill="url(#logoIconGradient)" /><circle cx="17" cy="17" r="5" fill="url(#logoIconGradient)" /></g>
                                <text x="40" y="26" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="800" fill="#1e293b">INAMarket</text>
                            </svg>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button onClick={onChatClick} className="relative text-gray-600 p-1" aria-label="Buka obrolan">
                                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                                {unreadMessageCount > 0 && (<span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">{unreadMessageCount}</span>)}
                            </button>
                            <button onClick={() => onNavigate('cart')} className={`relative text-gray-600 p-1 ${isCartAnimating ? 'animate-cart-bounce' : ''}`} aria-label="Buka keranjang">
                                <ShoppingCartIcon className="w-6 h-6" />
                                {cartItemCount > 0 && (<span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">{cartItemCount}</span>)}
                            </button>
                        </div>
                    </div>
                    <div className="pb-3">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Cari di INAMarket..."
                                className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-primary-light focus:border-primary bg-gray-100"
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-black bg-opacity-50 animate-fade-in-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
                <div className="relative bg-white w-4/5 max-w-sm h-full shadow-xl flex flex-col animate-slide-in-left">
                    <div className="p-4 flex justify-between items-center border-b">
                        <h2 className="font-bold text-lg text-gray-800">Menu</h2>
                        <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 p-2 -mr-2"><CloseIcon className="w-6 h-6"/></button>
                    </div>
                    <nav className="flex-grow p-4 space-y-2">
                        <MobileNavLink page="about">Tentang Kami</MobileNavLink>
                        <MobileNavLink page="blog">Blog</MobileNavLink>
                        <MobileNavLink page="contact">Kontak</MobileNavLink>
                        <MobileNavLink page="careers">Karir</MobileNavLink>
                        <MobileNavLink page="help-center">Pusat Bantuan</MobileNavLink>
                        <div className="pt-2 border-t"></div>
                        <MobileNavLink page="privacy-policy">Kebijakan Privasi</MobileNavLink>
                        <MobileNavLink page="terms">Syarat & Ketentuan</MobileNavLink>
                    </nav>
                    <div className="p-4 border-t bg-gray-50">
                        {isAuthenticated ? (
                            <div className="space-y-2">
                                <button onClick={() => handleMobileLinkClick('profile')} className="w-full text-left flex items-center py-2 px-3 text-gray-700 hover:bg-gray-200 rounded-md"><UserCircleIcon className="w-5 h-5 mr-3 text-gray-500"/>Profil Saya</button>
                                <button onClick={onLogout} className="w-full text-left flex items-center py-2 px-3 text-gray-700 hover:bg-gray-200 rounded-md"><ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3 text-gray-500"/>Keluar</button>
                            </div>
                        ) : (
                            <button onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} className="w-full bg-primary text-white font-semibold py-2.5 rounded-md hover:bg-primary-dark transition-colors">
                                Masuk / Daftar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default Header;