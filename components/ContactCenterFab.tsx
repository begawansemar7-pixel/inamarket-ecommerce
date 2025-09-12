import React from 'react';
import { RobotIcon } from './icons/Icons';

interface ContactCenterFabProps {
  onClick: () => void;
}

const ContactCenterFab: React.FC<ContactCenterFabProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
      aria-label="Buka Pusat Bantuan AI"
    >
      <RobotIcon className="w-7 h-7" />
    </button>
  );
};

export default ContactCenterFab;