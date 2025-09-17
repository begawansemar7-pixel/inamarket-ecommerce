import React, { useState } from 'react';
import Spinner from '../Spinner';
import { InformationCircleIcon, CheckCircleIcon, XCircleIcon } from '../icons/Icons';

const DatabaseIntegrationView: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
    const [lastSync, setLastSync] = useState<Date | null>(null);

    const [creds, setCreds] = useState({
        host: 'localhost',
        port: '5432',
        user: 'seller_user',
        password: '',
        dbname: 'inamarket_db',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCreds(prev => ({ ...prev, [name]: value }));
        setTestResult(null); // Reset test result on change
    };

    const handleTestConnection = () => {
        setIsTesting(true);
        setTestResult(null);
        setTimeout(() => {
            // Simulate success/failure
            if (creds.password === 'postgres') {
                setTestResult('success');
            } else {
                setTestResult('error');
            }
            setIsTesting(false);
        }, 1500);
    };

    const handleConnect = () => {
        setIsConnecting(true);
        setTimeout(() => {
            setIsConnected(true);
            setIsConnecting(false);
            setLastSync(new Date());
        }, 2000);
    };

    const handleDisconnect = () => {
        setIsConnected(false);
        setCreds(prev => ({ ...prev, password: '' })); // Clear password on disconnect
        setTestResult(null);
    };
    
    const handleSyncNow = () => {
        // Simple sync simulation
        alert("Sinkronisasi data dimulai...");
        setTimeout(() => {
            setLastSync(new Date());
            alert("Sinkronisasi data selesai.");
        }, 2500);
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md animate-step-in space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Integrasi Database PostgreSQL</h2>
                    <p className="text-sm text-gray-500 mt-1">Sinkronisasikan produk, stok, dan pesanan dengan database eksternal Anda.</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center ${isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    <span className={`w-2.5 h-2.5 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {isConnected ? 'Terhubung' : 'Terputus'}
                </div>
            </div>
            
             <div className="flex items-start p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
                <InformationCircleIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                <div>
                    <p className="font-semibold">Ini adalah lingkungan simulasi.</p>
                    <p className="text-sm">Jangan gunakan kredensial database asli Anda. Untuk tujuan demo, gunakan password <strong className="font-mono">postgres</strong> untuk tes koneksi yang berhasil.</p>
                </div>
            </div>

            {/* Connection Form */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t">
                <div>
                    <label htmlFor="host" className="block text-sm font-medium text-gray-700">Host</label>
                    <input type="text" id="host" name="host" value={creds.host} onChange={handleInputChange} disabled={isConnected} className="mt-1 w-full border-gray-300 rounded-md shadow-sm disabled:bg-gray-100"/>
                </div>
                 <div>
                    <label htmlFor="port" className="block text-sm font-medium text-gray-700">Port</label>
                    <input type="text" id="port" name="port" value={creds.port} onChange={handleInputChange} disabled={isConnected} className="mt-1 w-full border-gray-300 rounded-md shadow-sm disabled:bg-gray-100"/>
                </div>
                 <div>
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700">User</label>
                    <input type="text" id="user" name="user" value={creds.user} onChange={handleInputChange} disabled={isConnected} className="mt-1 w-full border-gray-300 rounded-md shadow-sm disabled:bg-gray-100"/>
                </div>
                 <div>
                    <label htmlFor="dbname" className="block text-sm font-medium text-gray-700">Nama Database</label>
                    <input type="text" id="dbname" name="dbname" value={creds.dbname} onChange={handleInputChange} disabled={isConnected} className="mt-1 w-full border-gray-300 rounded-md shadow-sm disabled:bg-gray-100"/>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" value={creds.password} onChange={handleInputChange} disabled={isConnected} className="mt-1 w-full border-gray-300 rounded-md shadow-sm disabled:bg-gray-100"/>
                </div>
            </form>
            
            {/* Test Connection Result */}
            {testResult && (
                <div className={`flex items-center p-3 rounded-md text-sm font-medium ${testResult === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {testResult === 'success' ? <CheckCircleIcon className="w-5 h-5 mr-2"/> : <XCircleIcon className="w-5 h-5 mr-2"/>}
                    {testResult === 'success' ? 'Tes koneksi berhasil!' : 'Tes koneksi gagal. Periksa kembali kredensial Anda.'}
                </div>
            )}
            
            {/* Action Buttons */}
            <div className="pt-4 border-t flex flex-col sm:flex-row gap-3">
                {!isConnected ? (
                    <>
                        <button onClick={handleTestConnection} disabled={isTesting || isConnecting} className="w-full sm:w-auto flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm disabled:bg-gray-400">
                           {isTesting && <Spinner className="w-5 h-5 mr-2"/>}
                           {isTesting ? 'Menguji...' : 'Tes Koneksi'}
                        </button>
                        <button onClick={handleConnect} disabled={isConnecting || testResult !== 'success'} className="w-full sm:w-auto flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm disabled:bg-primary-light disabled:cursor-not-allowed">
                            {isConnecting && <Spinner className="w-5 h-5 mr-2"/>}
                            {isConnecting ? 'Menyambungkan...' : 'Sambungkan'}
                        </button>
                    </>
                ) : (
                     <button onClick={handleDisconnect} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm">
                        Putuskan Koneksi
                    </button>
                )}
            </div>

            {/* Sync Status */}
            {isConnected && (
                <div className="pt-4 border-t space-y-3">
                    <h3 className="font-semibold text-gray-800">Status Sinkronisasi</h3>
                    <div className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                        <p className="text-sm text-gray-600">
                           Sinkronisasi terakhir pada: <span className="font-semibold text-gray-800">{lastSync?.toLocaleString('id-ID')}</span>
                        </p>
                        <button onClick={handleSyncNow} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors shadow-sm">
                            Sinkronkan Sekarang
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatabaseIntegrationView;
