import React, { useState } from 'react';
import { ToastMessage } from '../types';
import { PaperAirplaneIcon } from './icons/Icons';


type Page = 'home' | 'cart' | 'dashboard' | 'profile' | 'checkout' | 'admin-login' | 'about' | 'careers' | 'blog' | 'contact' | 'help-center' | 'privacy-policy' | 'terms';

interface FooterProps {
    onNavigate: (page: Page) => void;
    addToast: (type: ToastMessage['type'], message: string) => void;
}

const FooterLink: React.FC<{ page: Page; onNavigate: (page: Page) => void; children: React.ReactNode }> = ({ page, onNavigate, children }) => (
    <li>
        <button onClick={() => onNavigate(page)} className="hover:text-white transition-colors duration-200">
            {children}
        </button>
    </li>
);


const Footer: React.FC<FooterProps> = ({ onNavigate, addToast }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        addToast('success', 'Terima kasih! Anda telah berlangganan.');
        setEmail('');
    } else {
        addToast('error', 'Silakan masukkan alamat email yang valid.');
    }
  };


  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">INAMarket</h3>
            <p className="text-gray-400 text-sm">Platform untuk memajukan UMKM Indonesia ke panggung dunia.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Jelajahi</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
                <FooterLink page="about" onNavigate={onNavigate}>Tentang Kami</FooterLink>
                <FooterLink page="careers" onNavigate={onNavigate}>Karir</FooterLink>
                <FooterLink page="blog" onNavigate={onNavigate}>Blog</FooterLink>
                <FooterLink page="contact" onNavigate={onNavigate}>Kontak</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Bantuan</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
                <FooterLink page="help-center" onNavigate={onNavigate}>Pusat Bantuan</FooterLink>
                <FooterLink page="privacy-policy" onNavigate={onNavigate}>Kebijakan Privasi</FooterLink>
                <FooterLink page="terms" onNavigate={onNavigate}>Syarat & Ketentuan</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Ikuti Kami</h3>
            <p className="text-gray-400 text-sm mb-3">Dapatkan info terbaru tentang produk dan promo spesial.</p>
            <form onSubmit={handleSubscribe} className="flex items-center">
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email Anda"
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-light border-gray-600"
                    aria-label="Email untuk berlangganan"
                />
                <button type="submit" className="bg-primary hover:bg-primary-dark p-2.5 rounded-r-md" aria-label="Daftar newsletter">
                    <PaperAirplaneIcon className="w-5 h-5" />
                </button>
            </form>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">FB</a>
              <a href="#" className="text-gray-400 hover:text-white">IG</a>
              <a href="#" className="text-gray-400 hover:text-white">TW</a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} INAMarket. All rights reserved. Dibuat dengan ❤️ untuk Indonesia.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;