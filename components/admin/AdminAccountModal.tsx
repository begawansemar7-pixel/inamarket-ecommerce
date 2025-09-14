import React, { useState, useEffect } from 'react';
import { AdminUser, AdminRole } from '../../types';
import { CloseIcon, DocumentArrowUpIcon } from '../icons/Icons';

interface AdminAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<AdminUser, 'id'> | AdminUser) => void;
  userToEdit: AdminUser | null;
}

const roles: AdminRole[] = ['Super Admin', 'Admin Blog', 'Admin Promosi', 'Admin Layanan'];

const AdminAccountModal: React.FC<AdminAccountModalProps> = ({ isOpen, onClose, onSave, userToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Admin Blog' as AdminRole,
  });
  const [errors, setErrors] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isOpen) {
      if (userToEdit) {
        setFormData({
          name: userToEdit.name,
          email: userToEdit.email,
          password: '', // Password is not shown for editing
          role: userToEdit.role,
        });
      } else {
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'Admin Blog',
        });
      }
      setErrors({ email: '', password: '' });
    }
  }, [isOpen, userToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid.';
      isValid = false;
    }

    if (!userToEdit && formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter.';
      isValid = false;
    }
    
    if (userToEdit && formData.password && formData.password.length < 6) {
        newErrors.password = 'Password minimal 6 karakter.';
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    const userPayload: Omit<AdminUser, 'id'> = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
    };

    if (userToEdit) {
      onSave({ ...userPayload, id: userToEdit.id });
    } else {
      onSave(userPayload);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up">
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">
            {userToEdit ? 'Edit Akun Admin' : 'Tambah Akun Admin'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col overflow-hidden">
          <div className="p-6 space-y-4 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Pengguna</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Peran / Hak Akses</label>
                <select name="role" id="role" value={formData.role} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                  {roles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required={!userToEdit} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
              {userToEdit && <p className="text-xs text-gray-500 mt-1">Kosongkan jika tidak ingin mengubah password.</p>}
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>
          </div>
          <div className="p-5 bg-gray-50 rounded-b-lg border-t">
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm"
            >
              <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
              Simpan Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAccountModal;