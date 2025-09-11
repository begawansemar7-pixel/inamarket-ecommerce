
import React, { useState, useEffect } from 'react';
import LoginView from '../components/auth/LoginView';
import RegisterView from '../components/auth/RegisterView';
import ForgotPasswordView from '../components/auth/ForgotPasswordView';
import { UserGroupIcon, BuildingStorefrontIcon, WrenchScrewdriverIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '../components/icons/Icons';

type AuthView = 'select-role' | 'login' | 'register' | 'forgot-password';
type UserRole = 'Buyer' | 'Seller' | 'Admin';

interface AuthPageProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (role: UserRole) => void;
    onAdminLoginClick: () => void; // New prop for navigating to admin login
}

const RoleButton: React.FC<{
    icon: React.ElementType;
    label: string;
    onClick: () => void;
}> = ({ icon: Icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center p-4 border border-gray-200 rounded-lg text-left transition-all duration-300 hover:shadow-md hover:border-primary hover:-translate-y-0.5 group"
    >
        <div className="mr-4 p-3 bg-primary-light/20 rounded-full transition-colors group-hover:bg-primary-light/40">
            <Icon className="w-6 h-6 text-primary-dark transition-transform group-hover:scale-110" />
        </div>
        <div className="flex-grow">
            <span className="text-md font-semibold text-gray-800 group-hover:text-primary-dark">{label}</span>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-dark" />
    </button>
);


const AuthPage: React.FC<AuthPageProps> = ({ isOpen, onClose, onLoginSuccess, onAdminLoginClick }) => {
    const [view, setView] = useState<AuthView>('select-role');
    const [role, setRole] = useState<UserRole | null>(null);

    useEffect(() => {
        if (!isOpen) {
            // Reset state when modal closes
            setTimeout(() => {
                setView('select-role');
                setRole(null);
            }, 200); // Delay to allow for closing animation
        }
    }, [isOpen]);

    const handleRoleSelect = (selectedRole: UserRole) => {
        if (selectedRole === 'Admin') {
            onAdminLoginClick(); // Use the new handler for admin
        } else {
            setRole(selectedRole);
            setView('login');
        }
    };
    
    const handleBackToRoleSelect = () => {
        setView('select-role');
        setRole(null);
    };
    
    const handleAuthSuccess = () => {
        if (role) {
            onLoginSuccess(role);
        }
    };

    const handleTabClick = (selectedView: 'login' | 'register') => {
        if (view !== 'forgot-password') {
            setView(selectedView);
        }
    };
    
    const renderCoreView = () => {
        switch (view) {
            case 'select-role':
                return (
                    <div className="space-y-4">
                        <RoleButton icon={UserGroupIcon} label="Masuk sebagai Pembeli" onClick={() => handleRoleSelect('Buyer')} />
                        <RoleButton icon={BuildingStorefrontIcon} label="Masuk sebagai Penjual" onClick={() => handleRoleSelect('Seller')} />
                        <RoleButton icon={WrenchScrewdriverIcon} label="Masuk sebagai Admin" onClick={() => handleRoleSelect('Admin')} />
                    </div>
                );
            case 'login':
                return <LoginView onLoginSuccess={handleAuthSuccess} onForgotPasswordClick={() => setView('forgot-password')} />;
            case 'register':
                return <RegisterView onRegisterSuccess={handleAuthSuccess} />;
            case 'forgot-password':
                return <ForgotPasswordView onBackToLogin={() => setView('login')} />;
            default:
                return null;
        }
    };
    
    let title = "Selamat Datang";
    if (view === 'select-role') title = 'Pilih Peran Anda';
    if (view === 'login' && role) title = `Masuk sebagai ${role}`;
    if (view === 'register' && role) title = `Daftar sebagai ${role}`;
    if (view === 'forgot-password') title = "Reset Password";

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-auth-modal-enter">
                <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
                    <div className="flex items-center">
                        {view !== 'select-role' && (
                            <button onClick={handleBackToRoleSelect} className="mr-3 text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200 transition-colors">
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                        )}
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                
                {(view === 'login' || view === 'register') && (
                    <div className="flex border-b">
                        <button
                            onClick={() => handleTabClick('login')}
                            className={`flex-1 py-3 text-center font-semibold transition-colors ${view === 'login' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Masuk
                        </button>
                        {role !== 'Admin' && (
                             <button
                                onClick={() => handleTabClick('register')}
                                className={`flex-1 py-3 text-center font-semibold transition-colors ${view === 'register' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                Daftar
                            </button>
                        )}
                    </div>
                )}
                
                <div className="p-6">
                    {renderCoreView()}
                </div>

                 {(view === 'login' || view === 'register') && (role !== 'Admin') && (
                     <div className="p-4 bg-gray-50 rounded-b-lg text-center">
                        <p className="text-sm text-gray-600">
                            {view === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                            <button onClick={() => setView(view === 'login' ? 'register' : 'login')} className="font-semibold text-primary hover:underline">
                                {view === 'login' ? 'Daftar di sini' : 'Masuk di sini'}
                            </button>
                        </p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default AuthPage;
