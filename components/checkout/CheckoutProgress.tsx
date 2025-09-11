import React from 'react';
import { MapPinIcon, TruckIcon, CreditCardIcon, CheckCircleIcon } from '../icons/Icons';

type CheckoutStep = 'address' | 'shipping' | 'payment' | 'confirmation';

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}

const steps: { id: CheckoutStep; name: string; icon: React.ElementType }[] = [
  { id: 'address', name: 'Alamat', icon: MapPinIcon },
  { id: 'shipping', name: 'Pengiriman', icon: TruckIcon },
  { id: 'payment', name: 'Pembayaran', icon: CreditCardIcon },
  { id: 'confirmation', name: 'Selesai', icon: CheckCircleIcon },
];

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStep }) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} flex-1`}>
            {/* Connector line */}
            <div className="absolute left-4 top-4 -ml-px mt-0.5 h-0.5 w-full bg-gray-300" aria-hidden="true" />
             <div 
                className="absolute left-4 top-4 -ml-px mt-0.5 h-0.5 w-full bg-primary transition-all duration-500 ease-in-out" 
                style={{ width: `calc(${stepIdx < currentStepIndex ? '100%' : '0%'})` }}
                aria-hidden="true" 
            />
            
            {stepIdx <= currentStepIndex ? (
                // Current or Completed Step
                <div className="relative flex items-center justify-center">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-primary rounded-full transition-all duration-300">
                      <step.icon className="w-5 h-5 text-white" aria-hidden="true" />
                    </span>
                    {stepIdx === currentStepIndex && (
                        <span className="absolute -bottom-7 text-sm font-semibold text-primary transition-opacity duration-300">{step.name}</span>
                    )}
                </div>
            ) : (
                // Upcoming Step
                <div className="relative flex items-center justify-center">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full">
                       <step.icon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </span>
                </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutProgress;