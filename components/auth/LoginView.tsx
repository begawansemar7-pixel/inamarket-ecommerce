import React from 'react';
import { GoogleIcon } from '../icons/Icons';

interface LoginViewProps {
    onLoginSuccess: () => void;
    onForgotPasswordClick: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onForgotPasswordClick }) => {
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for actual login logic
        console.log("Logging in...");
        onLoginSuccess();
    };

    const handleGoogleLogin = () => {
        // Placeholder for Google login logic
        console.log("Logging in with Google...");
        onLoginSuccess();
    };

    const handleForgotPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        onForgotPasswordClick();
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email-login" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                 <div>
                    <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" id="password-login" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                 <div className="text-right">
                    <a href="#" onClick={handleForgotPassword} className="text-sm text-primary hover:underline">Lupa password?</a>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm hover:shadow-md">
                    Masuk
                </button>
            </form>

            <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">ATAU</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button onClick={handleGoogleLogin} className="w-full flex justify-center items-center bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-md transition-colors hover:bg-gray-50 shadow-sm">
                <GoogleIcon className="w-5 h-5 mr-3" />
                Lanjutkan dengan Google
            </button>
        </div>
    );
};

export default LoginView;