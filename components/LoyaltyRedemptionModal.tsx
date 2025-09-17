import React from 'react';
import { RedemptionOption } from '../types';
import { REDEMPTION_OPTIONS } from '../constants';
import { CloseIcon, SparklesIcon } from './icons/Icons';

interface LoyaltyRedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPoints: number;
  onRedeem: (pointsToDeduct: number, itemName: string) => void;
}

const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
};

const RedemptionCard: React.FC<{
  option: RedemptionOption;
  userPoints: number;
  onRedeem: (pointsToDeduct: number, itemName: string) => void;
}> = ({ option, userPoints, onRedeem }) => {
  const canRedeem = userPoints >= option.pointsRequired;
  
  return (
    <div className="flex flex-col items-center p-4 border rounded-lg bg-white text-center shadow-sm">
      <div className="flex items-center justify-center w-16 h-16 mb-3 bg-primary-light/20 rounded-full">
        <option.icon className="w-8 h-8 text-primary-dark" />
      </div>
      <h4 className="font-bold text-gray-800">{option.name}</h4>
      <p className="text-xs text-gray-500 mt-1 flex-grow">{option.description}</p>
      <div className="mt-3 w-full">
        <p className="text-sm font-semibold text-primary">{option.pointsRequired} Poin</p>
        <button
          onClick={() => onRedeem(option.pointsRequired, option.name)}
          disabled={!canRedeem}
          className="w-full mt-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
        >
          Tukarkan
        </button>
      </div>
    </div>
  );
};

const LoyaltyRedemptionModal: React.FC<LoyaltyRedemptionModalProps> = ({ isOpen, onClose, userPoints, onRedeem }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-gray-50 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b flex justify-between items-center bg-white rounded-t-lg">
          <div className="flex items-center space-x-3">
             <div className="bg-secondary/20 p-2 rounded-full">
                <SparklesIcon className="w-6 h-6 text-secondary-dark" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Tukarkan Poin Loyalti Anda</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
            <div className="mb-6 p-4 bg-primary text-white rounded-lg text-center">
                <p className="text-sm opacity-80">Poin Anda Saat Ini</p>
                <p className="text-4xl font-bold">{userPoints}</p>
                <p className="text-sm opacity-80 font-medium">Setara dengan {formatRupiah(userPoints * 1000)}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {REDEMPTION_OPTIONS.map(option => (
                    <RedemptionCard key={option.id} option={option} userPoints={userPoints} onRedeem={onRedeem} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyRedemptionModal;