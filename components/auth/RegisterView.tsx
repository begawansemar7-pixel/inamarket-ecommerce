import React, { useState } from 'react';
import { GoogleIcon } from '../icons/Icons';

interface RegisterViewProps {
    onRegisterSuccess: () => void;
    role: 'Buyer' | 'Seller' | null;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onRegisterSuccess, role }) => {

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for actual registration logic
        console.log("Registering...");
        onRegisterSuccess();
    };

    const handleGoogleRegister = () => {
        // Placeholder for Google registration logic
        console.log("Registering with Google...");
        onRegisterSuccess();
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
                 <div>
                    <label htmlFor="name-register" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input type="text" id="name-register" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                <div>
                    <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email-register" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                 <div>
                    <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" id="password-register" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>

                {role === 'Buyer' && (
                    <>
                        <div>
                            <label htmlFor="phone-register" className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                            <input type="tel" id="phone-register" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label htmlFor="address-register" className="block text-sm font-medium text-gray-700 mb-1">Alamat Pengiriman</label>
                            <textarea id="address-register" required rows={3} placeholder="Alamat lengkap untuk pengiriman" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"></textarea>
                        </div>
                    </>
                )}
                
                <p className="text-xs text-gray-500">
                    Dengan mendaftar, Anda menyetujui <a href="#" className="text-primary hover:underline">Syarat & Ketentuan</a> kami.
                </p>
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm hover:shadow-md">
                    Buat Akun
                </button>
            </form>

            <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">ATAU</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button onClick={handleGoogleRegister} className="w-full flex justify-center items-center bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-md transition-colors hover:bg-gray-50 shadow-sm">
                <GoogleIcon className="w-5 h-5 mr-3" />
                Daftar dengan Google
            </button>
        </div>
    );
};

export default RegisterView;