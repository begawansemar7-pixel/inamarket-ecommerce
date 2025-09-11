import React from 'react';
import { VerificationStatus } from '../types';
import { ShieldCheckIcon } from './icons/Icons';

interface VerificationStatusBadgeProps {
  status: VerificationStatus;
}

const VerificationStatusBadge: React.FC<VerificationStatusBadgeProps> = ({ status }) => {
  if (status !== 'verified') {
    return null;
  }

  return (
    <div className="flex items-center ml-2" title="Penjual Terverifikasi">
      <ShieldCheckIcon className="w-4 h-4 text-green-500" />
    </div>
  );
};

export default VerificationStatusBadge;