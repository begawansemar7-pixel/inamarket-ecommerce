import React, { useState } from 'react';
import { AdminUser } from '../../types';
import AdminSection from './AdminSection';
import { PlusCircleIcon, PencilIcon, TrashIcon } from '../icons/Icons';
import AdminAccountModal from './AdminAccountModal';

interface SettingsViewProps {
  users: AdminUser[];
  onAddUser: (user: Omit<AdminUser, 'id'>) => void;
  onUpdateUser: (user: AdminUser) => void;
  onDeleteUser: (userId: number) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ users, onAddUser, onUpdateUser, onDeleteUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const handleOpenModal = (user: AdminUser | null = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = (user: Omit<AdminUser, 'id'> | AdminUser) => {
    if ('id' in user) {
      onUpdateUser(user);
    } else {
      onAddUser(user);
    }
    handleCloseModal();
  };

  const roleColors: { [key: string]: string } = {
    'Super Admin': 'bg-red-100 text-red-800',
    'Admin Blog': 'bg-blue-100 text-blue-800',
    'Admin Promosi': 'bg-yellow-100 text-yellow-800',
    'Admin Layanan': 'bg-green-100 text-green-800',
  };

  return (
    <>
      <AdminSection title="Pengaturan Akun & Hak Akses">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Tambah Akun Admin
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pengguna</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peran/Hak Akses</th>
                <th className="relative px-6 py-3"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleColors[user.role] || 'bg-gray-100 text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button onClick={() => handleOpenModal(user)} className="text-primary hover:text-primary-dark p-1" aria-label={`Edit ${user.name}`}>
                        <PencilIcon className="w-5 h-5"/>
                      </button>
                      <button onClick={() => onDeleteUser(user.id)} className="text-gray-400 hover:text-red-600 p-1" aria-label={`Hapus ${user.name}`}>
                        <TrashIcon className="w-5 h-5"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSection>

      <AdminAccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        userToEdit={editingUser}
      />
    </>
  );
};

export default SettingsView;