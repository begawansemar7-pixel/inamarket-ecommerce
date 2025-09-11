import React, { useState } from 'react';
import { WrenchScrewdriverIcon } from '../components/icons/Icons';

type UserRole = 'Buyer' | 'Seller' | 'Admin';

interface AdminLoginPageProps {
  onLogin: (role: UserRole) => void;
  onBackToHome: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin, onBackToHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Simple validation for demonstration
    if (email === 'admin@inamarket.com' && password === 'admin123') {
      onLogin('Admin');
    } else {
      setError('Email atau password salah.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-light">INAMarket</h1>
            <h2 className="text-2xl font-semibold mt-2 text-gray-200">Panel Login Admin</h2>
        </div>
        
        <div className="bg-gray-700 p-8 rounded-lg shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Alamat Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-light focus:border-primary-light"
                  placeholder="admin@inamarket.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password"  className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-light focus:border-primary-light"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
            <button onClick={onBackToHome} className="text-sm text-gray-400 hover:text-gray-200 hover:underline">
                &larr; Kembali ke Beranda
            </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
