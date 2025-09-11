import React, { useState } from 'react';
import { Address, ShippingOption, CartItem } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutProgress from '../components/checkout/CheckoutProgress';
import AddressStep from '../components/checkout/AddressStep';
import ShippingStep from '../components/checkout/ShippingStep';
import PaymentStep from '../components/checkout/PaymentStep';
import ConfirmationStep from '../components/checkout/ConfirmationStep';
import OrderSummary from '../components/checkout/OrderSummary';

type CheckoutStep = 'address' | 'shipping' | 'payment' | 'confirmation';
type Page = 'home' | 'cart' | 'dashboard' | 'profile' | 'checkout' | 'admin-login';

interface CheckoutPageProps {
  items: CartItem[];
  onBackToHome: () => void;
  cartItemCount: number;
  onLogout: () => void;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onNavigate: (page: Page) => void;
  unreadMessageCount: number;
  onChatClick: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ 
    items, 
    onBackToHome, 
    cartItemCount, 
    onLogout, 
    isAuthenticated, 
    onLoginClick,
    onNavigate,
    unreadMessageCount,
    onChatClick
}) => {
  const [step, setStep] = useState<CheckoutStep>('address');
  const [address, setAddress] = useState<Address | null>(null);
  const [shippingOption, setShippingOption] = useState<ShippingOption | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const handleAddressSubmit = (data: Address) => {
    setAddress(data);
    setStep('shipping');
  };

  const handleShippingSubmit = (option: ShippingOption) => {
    setShippingOption(option);
    setStep('payment');
  };

  const handlePaymentSubmit = (method: string) => {
    setPaymentMethod(method);
    setStep('confirmation');
  };
  
  const handleBack = () => {
    if (step === 'shipping') setStep('address');
    if (step === 'payment') setStep('shipping');
    if (step === 'confirmation') setStep('payment');
  };


  const renderStep = () => {
    switch (step) {
      case 'address':
        return <AddressStep onAddressSubmit={handleAddressSubmit} />;
      case 'shipping':
        return <ShippingStep onShippingSubmit={handleShippingSubmit} onBack={handleBack} />;
      case 'payment':
        return <PaymentStep onPaymentSubmit={handlePaymentSubmit} onBack={handleBack} />;
      case 'confirmation':
        if(address && shippingOption && paymentMethod) {
            return <ConfirmationStep 
                items={items}
                address={address}
                shippingOption={shippingOption}
                paymentMethod={paymentMethod}
                onBackToHome={onBackToHome}
            />;
        }
        return <div>Error: Missing order details.</div>
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Fix: Removed non-existent 'onProfileClick' prop from Header component. */}
      <Header 
        isAuthenticated={isAuthenticated}
        onLoginClick={onLoginClick}
        onSellClick={() => {}} 
        onNavigate={onNavigate} 
        activePage={'checkout'} 
        cartItemCount={cartItemCount} 
        onLogout={onLogout} 
        unreadMessageCount={unreadMessageCount}
        onChatClick={onChatClick}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
            <p className="text-gray-500 mb-8">Selesaikan pesanan Anda dalam beberapa langkah mudah.</p>

            <CheckoutProgress currentStep={step} />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-lg shadow-md relative min-h-[400px]">
                   <div key={step} className="animate-step-in">
                        {renderStep()}
                   </div>
                </div>
                <aside className="md:col-span-1">
                    <OrderSummary items={items} shippingOption={shippingOption} />
                </aside>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;