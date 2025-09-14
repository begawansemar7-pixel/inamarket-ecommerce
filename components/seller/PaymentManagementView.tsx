import React from 'react';
import { PaymentOptions } from '../../types';

interface PaymentManagementViewProps {
  options: PaymentOptions;
  onOptionsChange: (newOptions: PaymentOptions) => void;
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

const PaymentMethodToggle: React.FC<{
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

const PaymentManagementView: React.FC<PaymentManagementViewProps> = ({ options, onOptionsChange }) => {

    const handleToggle = (
        category: 'qris' | 'virtualAccounts' | 'eWallets',
        method: keyof PaymentOptions['virtualAccounts'] | keyof PaymentOptions['eWallets'] | null,
        enabled: boolean
    ) => {
        const newOptions = JSON.parse(JSON.stringify(options)); // Deep copy
        if (category === 'qris') {
            newOptions.qris = enabled;
        } else if (method) {
            // @ts-ignore
            newOptions[category][method] = enabled;
        }
        onOptionsChange(newOptions);
    };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-step-in">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Manajemen Metode Pembayaran</h2>
      
      {/* QRIS */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Pembayaran QR</h3>
        <PaymentMethodToggle 
            name="QRIS" 
            logoUrl="https://picsum.photos/seed/qris-logo/100/50" 
            enabled={options.qris} 
            onToggle={(val) => handleToggle('qris', null, val)} 
        />
      </div>

      {/* Virtual Accounts */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Virtual Account Bank</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PaymentMethodToggle name="BCA" logoUrl="https://picsum.photos/seed/bca-logo/100/50" enabled={options.virtualAccounts.bca} onToggle={(val) => handleToggle('virtualAccounts', 'bca', val)} />
            <PaymentMethodToggle name="Mandiri" logoUrl="https://picsum.photos/seed/mandiri-logo/100/50" enabled={options.virtualAccounts.mandiri} onToggle={(val) => handleToggle('virtualAccounts', 'mandiri', val)} />
            <PaymentMethodToggle name="BRI" logoUrl="https://picsum.photos/seed/bri-logo/100/50" enabled={options.virtualAccounts.bri} onToggle={(val) => handleToggle('virtualAccounts', 'bri', val)} />
            <PaymentMethodToggle name="BNI" logoUrl="https://picsum.photos/seed/bni-logo/100/50" enabled={options.virtualAccounts.bni} onToggle={(val) => handleToggle('virtualAccounts', 'bni', val)} />
        </div>
      </div>
      
      {/* E-Wallets */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">E-Wallet</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PaymentMethodToggle name="GoPay" logoUrl="https://picsum.photos/seed/gopay-logo/100/50" enabled={options.eWallets.gopay} onToggle={(val) => handleToggle('eWallets', 'gopay', val)} />
            <PaymentMethodToggle name="OVO" logoUrl="https://picsum.photos/seed/ovo-logo/100/50" enabled={options.eWallets.ovo} onToggle={(val) => handleToggle('eWallets', 'ovo', val)} />
            <PaymentMethodToggle name="ShopeePay" logoUrl="https://picsum.photos/seed/shopeepay-logo/100/50" enabled={options.eWallets.shopeePay} onToggle={(val) => handleToggle('eWallets', 'shopeePay', val)} />
            <PaymentMethodToggle name="DANA" logoUrl="https://picsum.photos/seed/dana-logo/100/50" enabled={options.eWallets.dana} onToggle={(val) => handleToggle('eWallets', 'dana', val)} />
            <PaymentMethodToggle name="LinkAja" logoUrl="https://picsum.photos/seed/linkaja-logo/100/50" enabled={options.eWallets.linkAja} onToggle={(val) => handleToggle('eWallets', 'linkAja', val)} />
        </div>
      </div>
    </div>
  );
};

export default PaymentManagementView;