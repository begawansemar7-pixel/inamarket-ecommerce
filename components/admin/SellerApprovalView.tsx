import React, { useState } from 'react';
import AdminSection from './AdminSection';
import { SELLER_APPLICATIONS } from '../../constants';
import { SellerApplication } from '../../types';

const SellerApprovalView: React.FC = () => {
  const [applications, setApplications] = useState<SellerApplication[]>(SELLER_APPLICATIONS);

  const handleUpdateStatus = (id: number, status: 'approved' | 'rejected') => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status } : app))
    );
  };
  
  const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
  };

  return (
    <AdminSection title="Persetujuan Penjual">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Toko</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pemilik</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map(app => (
              <tr key={app.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{app.storeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>{app.ownerName}</div>
                  <div className="text-gray-500">{app.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{app.submittedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {app.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button onClick={() => handleUpdateStatus(app.id, 'approved')} className="text-green-600 hover:text-green-900 font-semibold">Setujui</button>
                      <button onClick={() => handleUpdateStatus(app.id, 'rejected')} className="text-red-600 hover:text-red-900 font-semibold">Tolak</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminSection>
  );
};

export default SellerApprovalView;
