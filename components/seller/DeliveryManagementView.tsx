import React, { useState } from 'react';
import { DeliveryOptions } from '../../types';
import { TruckIcon } from '../icons/Icons';

interface DeliveryManagementViewProps {
  options: DeliveryOptions;
  onOptionsChange: (newOptions: DeliveryOptions) => void;
}

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
  <button
    type="button"
    className={`${
      enabled ? 'bg-primary' : 'bg-gray-200'
    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
    role="switch"
    aria-checked={enabled}
    onClick={() => onChange(!enabled)}
  >
    <span
      aria-hidden="true"
      className={`${
        enabled ? 'translate-x-5' : 'translate-x-0'
      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
    />
  </button>
);

const CourierToggle: React.FC<{
  logoUrl: string;
  name: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}> = ({ logoUrl, name, enabled, onToggle }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
    <div className="flex items-center space-x-4">
      <img src={logoUrl} alt={`${name} logo`} className="h-8 w-16 object-contain" />
      <span className="font-semibold text-gray-800">{name}</span>
    </div>
    <ToggleSwitch enabled={enabled} onChange={onToggle} />
  </div>
);

interface CostResult {
    distance: number;
    costs: { courier: 'gojek' | 'grab' | 'iter'; cost: number }[];
}

const DeliveryManagementView: React.FC<DeliveryManagementViewProps> = ({ options, onOptionsChange }) => {
    const [destination, setDestination] = useState('');
    const [calculating, setCalculating] = useState(false);
    const [result, setResult] = useState<CostResult | null>(null);

    const handleToggle = (
        type: 'sameDay' | 'interCity',
        courier: keyof DeliveryOptions['sameDay'] | keyof DeliveryOptions['interCity'],
        enabled: boolean
    ) => {
        const newOptions = { ...options };
        // @ts-ignore
        newOptions[type][courier] = enabled;
        onOptionsChange(newOptions);
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!destination.trim()) return;

        setCalculating(true);
        setResult(null);

        // Simulate API call to a maps/distance service
        setTimeout(() => {
            const distance = parseFloat((Math.random() * (25 - 3) + 3).toFixed(1)); // Random distance between 3km and 25km
            const costs = [];
            
            if (options.sameDay.gojek) {
                costs.push({ courier: 'gojek' as const, cost: 2500 * distance + 5000 });
            }
            if (options.sameDay.grab) {
                costs.push({ courier: 'grab' as const, cost: 2400 * distance + 5500 });
            }
            if (options.sameDay.iter) {
                costs.push({ courier: 'iter' as const, cost: 2300 * distance + 4500 });
            }

            setResult({ distance, costs });
            setCalculating(false);
        }, 1500);
    };
    
    const formatRupiah = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    
    const getCourierName = (courierKey: 'gojek' | 'grab' | 'iter') => {
        switch (courierKey) {
            case 'gojek': return 'GoSend';
            case 'grab': return 'GrabExpress';
            case 'iter': return 'ITER';
        }
    };


  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Pilihan Kurir</h2>
        
        {/* Same Day Couriers */}
        <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Kurir Dalam Kota (Instant & Same Day)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CourierToggle name="GoSend" logoUrl="https://picsum.photos/seed/gojek-logo/100/50" enabled={options.sameDay.gojek} onToggle={(val) => handleToggle('sameDay', 'gojek', val)} />
                <CourierToggle name="GrabExpress" logoUrl="https://picsum.photos/seed/grab-logo/100/50" enabled={options.sameDay.grab} onToggle={(val) => handleToggle('sameDay', 'grab', val)} />
                <CourierToggle name="ITER" logoUrl="https://picsum.photos/seed/iter-logo/100/50" enabled={options.sameDay.iter} onToggle={(val) => handleToggle('sameDay', 'iter', val)} />
            </div>
        </div>
        
        {/* Inter-City Couriers */}
        <div>
            <h3 className="font-semibold text-gray-700 mb-3">Kurir Antarkota (Reguler, Kargo, dll.)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <CourierToggle name="JNE Express" logoUrl="https://picsum.photos/seed/jne-logo/100/50" enabled={options.interCity.jne} onToggle={(val) => handleToggle('interCity', 'jne', val)} />
                 <CourierToggle name="J&T Express" logoUrl="https://picsum.photos/seed/jnt-logo/100/50" enabled={options.interCity.jnt} onToggle={(val) => handleToggle('interCity', 'jnt', val)} />
                 <CourierToggle name="TIKI" logoUrl="https://picsum.photos/seed/tiki-logo/100/50" enabled={options.interCity.tiki} onToggle={(val) => handleToggle('interCity', 'tiki', val)} />
                 <CourierToggle name="POS Indonesia" logoUrl="https://picsum.photos/seed/pos-logo/100/50" enabled={options.interCity.pos} onToggle={(val) => handleToggle('interCity', 'pos', val)} />
            </div>
        </div>
      </div>
      
       <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Kalkulator Ongkos Kirim Dalam Kota</h2>
        <form onSubmit={handleCalculate} className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="w-full">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Masukkan Alamat Tujuan</label>
                <input
                    type="text"
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Contoh: Jl. Asia Afrika No.8, Bandung"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
            </div>
            <button
                type="submit"
                disabled={calculating || !destination.trim()}
                className="w-full sm:w-auto flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2 rounded-md transition-colors shadow-sm disabled:bg-primary-light"
            >
                {calculating ? 'Menghitung...' : 'Hitung Biaya'}
            </button>
        </form>
        
        {result && (
            <div className="mt-6 pt-6 border-t animate-step-in">
                <h3 className="font-semibold text-gray-800 mb-3">Hasil Perhitungan untuk: <span className="font-normal">{destination}</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <img src="https://picsum.photos/seed/map-static/400/300" alt="Static map" className="rounded-lg object-cover w-full h-full" />
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-gray-600">Estimasi Jarak: <span className="font-bold text-lg text-gray-800">{result.distance} km</span></p>
                        <div className="mt-4 space-y-3">
                            {result.costs.length > 0 ? result.costs.map(({ courier, cost }) => (
                                <div key={courier} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                    <span className="font-medium text-gray-700 capitalize">{getCourierName(courier)}</span>
                                    <span className="font-bold text-primary-dark">{formatRupiah(cost)}</span>
                                </div>
                            )) : (
                                <p className="text-gray-500">Tidak ada kurir dalam kota yang aktif untuk menghitung biaya.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryManagementView;