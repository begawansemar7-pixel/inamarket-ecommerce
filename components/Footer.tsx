
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">INAMarket</h3>
            <p className="text-gray-400 text-sm">Platform untuk memajukan UMKM Indonesia ke panggung dunia.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Jelajahi</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white">Karir</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Bantuan</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-white">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white">Syarat & Ketentuan</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Ikuti Kami</h3>
            <div className="flex space-x-4">
              {/* Placeholder for social icons */}
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
