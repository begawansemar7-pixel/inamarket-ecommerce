import React from 'react';

interface ForgotPasswordViewProps {
    onBackToLogin: () => void;
}

const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ onBackToLogin }) => {
    
    const handleResetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // UI indication only, as requested by the user.
        alert("Jika akun dengan email tersebut ada, tautan reset kata sandi telah dikirim.");
        onBackToLogin();
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-center text-gray-600">
                Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
            </p>
            <form onSubmit={handleResetSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email-reset" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        type="email" 
                        id="email-reset" 
                        required 
                        placeholder="email@contoh.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" 
                    />
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm hover:shadow-md">
                    Kirim Tautan Reset
                </button>
            </form>

            <div className="text-center pt-2">
                 <button onClick={onBackToLogin} className="font-semibold text-sm text-primary hover:underline">
                    Kembali untuk Masuk
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordView;