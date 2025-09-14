import React from 'react';

interface AdminSectionProps {
  title: string;
  children: React.ReactNode;
}

const AdminSection: React.FC<AdminSectionProps> = ({ title, children }) => {
  return (
    <div className="animate-step-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AdminSection;
