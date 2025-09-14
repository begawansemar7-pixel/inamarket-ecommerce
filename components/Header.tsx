import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCartIcon, SparklesIcon, UserCircleIcon, SearchIcon, ChatBubbleLeftRightIcon, ChevronDownIcon } from './icons/Icons';
import ProfileDropdown from './ProfileDropdown';

type Page = 'home' | 'cart' | 'dashboard' | 'profile' | 'checkout' | 'admin-login' | 'admin-dashboard' | 'about' | 'careers' | 'blog' | 'contact' | 'help-center' | 'privacy-policy' | 'terms';
type UserRole = 'Buyer' | 'Seller' | 'Admin';

interface HeaderProps {
    isAuthenticated: boolean;
    userRole: UserRole | null;
    onLoginClick: () => void;
    onSellClick: () => void;
    onNavigate: (page: Page) => void;
    activePage: Page;
    cartItemCount: number;
    onLogout: () => void;
    unreadMessageCount: number;
    onChatClick: () => void;
}

const NavLink: React.FC<{
    page: Page;
    activePage: Page;
    onNavigate: (page: Page) => void;
    children: React.ReactNode;
}> = ({ page, activePage, onNavigate, children }) => (
    <button
        onClick={() => onNavigate(page)}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activePage === page
                ? 'bg-primary-light/20 text-primary-dark'
                : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ 
    isAuthenticated,
    userRole,
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
    const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const moreMenuRef = useRef<HTMLDivElement>(null);

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
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    {/* Left Side: Logo & Nav */}
                    <div className="flex items-center space-x-6">
                        {/* Logo */}
                        <div onClick={() => onNavigate('home')} className="cursor-pointer flex items-center flex-shrink-0">
                            <svg
                                height="38"
                                viewBox="0 0 175 38"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-labelledby="logoTitle"
                                role="img"
                            >
                                <title id="logoTitle">INAMarket Logo</title>
                                <defs>
                                    <linearGradient id="logoIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#2dd4bf" />
                                        <stop offset="100%" stop-color="#0f766e" />
                                    </linearGradient>
                                </defs>
                                <g transform="translate(2, 2)">
                                    <path d="M34,17 A17,17 0 1,1 17,0 L17,6 A11,11 0 1,0 28,17 Z" fill="url(#logoIconGradient)" />
                                    <circle cx="17" cy="17" r="5" fill="url(#logoIconGradient)" />
                                </g>
                                <text x="48" y="29" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="800" fill="#1e293b">
                                    INAMarket
                                </text>
                            </svg>
                        </div>
                         {/* Navigation Links - Desktop */}
                        <nav className="hidden md:flex items-center space-x-1">
                            <NavLink page="about" activePage={activePage} onNavigate={onNavigate}>Tentang Kami</NavLink>
                            <NavLink page="blog" activePage={activePage} onNavigate={onNavigate}>Blog</NavLink>
                            <NavLink page="contact" activePage={activePage} onNavigate={onNavigate}>Kontak</NavLink>
                             {/* "Lainnya" Dropdown */}
                            <div className="relative" ref={moreMenuRef}>
                                <button
                                    onClick={() => setMoreMenuOpen(prev => !prev)}
                                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    Lainnya
                                    <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isMoreMenuOpen && (
                                    <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-dropdown-enter">
                                        <div className="py-1" role="menu">
                                            <button onClick={() => handleDropdownNavigate('careers')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Karir</button>
                                            <button onClick={() => handleDropdownNavigate('help-center')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Pusat Bantuan</button>
                                            <div className="border-t my-1"></div>
                                            <button onClick={() => handleDropdownNavigate('privacy-policy')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Kebijakan Privasi</button>
                                            <button onClick={() => handleDropdownNavigate('terms')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Syarat & Ketentuan</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                    
                    {/* Middle: Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-6">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Cari Kopi Gayo di INAMarket..."
                                className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-primary-light focus:border-primary"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Right Side: Actions */}
                    <div className="flex items-center space-x-4 flex-shrink-0">
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
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
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
                                    userRole={userRole}
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