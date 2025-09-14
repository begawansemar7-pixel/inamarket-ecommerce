import React, { useState } from 'react';
import { BlogPost } from '../../types';
import AdminSection from './AdminSection';
import { PlusCircleIcon, PencilIcon, TrashIcon } from '../icons/Icons';
import BlogEditModal from './BlogEditModal';

interface BlogManagementViewProps {
  posts: BlogPost[];
  onAddPost: (post: Omit<BlogPost, 'id'>) => void;
  onUpdatePost: (post: BlogPost) => void;
  onDeletePost: (postId: number) => void;
}

const BlogManagementView: React.FC<BlogManagementViewProps> = ({ posts, onAddPost, onUpdatePost, onDeletePost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleOpenModal = (post: BlogPost | null = null) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const handleSave = (post: Omit<BlogPost, 'id'> | BlogPost) => {
    if ('id' in post) {
      onUpdatePost(post);
    } else {
      onAddPost(post);
    }
    handleCloseModal();
  };

  return (
    <>
      <AdminSection title="Manajemen Postingan Blog">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Tambah Postingan Baru
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penulis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Publikasi</th>
                <th className="relative px-6 py-3"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map(post => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-md object-cover mr-4" src={post.imageUrl} alt={post.title} />
                        <span className="font-medium text-gray-900">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {post.category.title}
                     </span>
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-gray-600">{post.author.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{post.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button onClick={() => handleOpenModal(post)} className="text-primary hover:text-primary-dark p-1" aria-label={`Edit ${post.title}`}>
                        <PencilIcon className="w-5 h-5"/>
                      </button>
                      <button onClick={() => onDeletePost(post.id)} className="text-gray-400 hover:text-red-600 p-1" aria-label={`Hapus ${post.title}`}>
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

      <BlogEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        postToEdit={editingPost}
      />
    </>
  );
};

export default BlogManagementView;