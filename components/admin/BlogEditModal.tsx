import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import { CloseIcon, DocumentArrowUpIcon } from '../icons/Icons';

interface BlogEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Omit<BlogPost, 'id'> | BlogPost) => void;
  postToEdit: BlogPost | null;
}

const defaultPost: Omit<BlogPost, 'id'> = {
  title: '',
  href: '#',
  description: '',
  imageUrl: 'https://picsum.photos/seed/newblog/600/400',
  date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric'}),
  datetime: new Date().toISOString(),
  category: { title: 'Marketing', href: '#' },
  author: {
    name: 'Admin',
    role: 'Content Creator',
    href: '#',
    imageUrl: 'https://picsum.photos/seed/admin-author/40/40',
  },
};

const BlogEditModal: React.FC<BlogEditModalProps> = ({ isOpen, onClose, onSave, postToEdit }) => {
  const [formData, setFormData] = useState(defaultPost);

  useEffect(() => {
    if (isOpen) {
      setFormData(postToEdit || defaultPost);
    }
  }, [isOpen, postToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, category: { ...prev.category, title: value } }));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const authorField = name.split('.')[1]; // e.g., 'author.name' -> 'name'
    setFormData(prev => ({ ...prev, author: { ...prev.author, [authorField]: value } }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = postToEdit ? { ...formData, id: postToEdit.id } : formData;
    onSave(dataToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up">
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">
            {postToEdit ? 'Edit Postingan Blog' : 'Tambah Postingan Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col overflow-hidden">
          <div className="p-6 space-y-4 overflow-y-auto">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul Postingan</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Konten / Deskripsi</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={6} className="w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category.title" className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <input type="text" name="category.title" id="category.title" value={formData.category.title} onChange={handleCategoryChange} required className="w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL Gambar Utama</label>
                    <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm" />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="author.name" className="block text-sm font-medium text-gray-700 mb-1">Nama Penulis</label>
                    <input type="text" name="author.name" id="author.name" value={formData.author.name} onChange={handleAuthorChange} required className="w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                 <div>
                    <label htmlFor="author.imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL Foto Penulis</label>
                    <input type="url" name="author.imageUrl" id="author.imageUrl" value={formData.author.imageUrl} onChange={handleAuthorChange} required className="w-full border-gray-300 rounded-md shadow-sm" />
                </div>
            </div>
          </div>
          <div className="p-5 bg-gray-50 rounded-b-lg border-t">
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm"
            >
              <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
              Simpan Postingan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditModal;