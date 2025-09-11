import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import { CloseIcon, DocumentArrowUpIcon, ImageIcon, TrashIcon } from './icons/Icons';
import { fileToBase64 } from '../utils/fileUtils';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id' | 'seller' | 'reviews' | 'sellerVerification' | 'sales'>) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFormValid = name && category && price && description && imageFile;

  const resetForm = useCallback(() => {
    setName('');
    setCategory(CATEGORIES[0]);
    setPrice('');
    setDescription('');
    setError(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    setIsDragging(false);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }, [imagePreview]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    setError(null);

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Format file tidak didukung. Gunakan PNG, JPG, atau WEBP.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(`File terlalu besar. Ukuran maksimal adalah ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
      return;
    }
    
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files ? e.target.files[0] : null);
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files ? e.dataTransfer.files[0] : null);
  };
  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setError('Harap isi semua kolom dan unggah gambar.');
      return;
    }
    
    const base64Image = await fileToBase64(imageFile);
    
    onSave({
      name,
      price: Number(price),
      imageUrl: base64Image,
      location: 'Toko Saya', // Placeholder
      category,
      description,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-scale-in">
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">Tambah Produk Baru</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow contents">
          <div className="p-6 space-y-4 overflow-y-auto">
            {/* Form content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto Produk</label>
              {imagePreview ? (
                <div className="relative group">
                  <img src={imagePreview} alt="Pratinjau produk" className="w-full h-48 object-cover rounded-md border border-gray-200" />
                  <button onClick={removeImage} className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Hapus gambar"><TrashIcon className="w-5 h-5" /></button>
                </div>
              ) : (
                <>
                  <label htmlFor="file-upload" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary-light/10' : 'hover:border-gray-400'}`}>
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600"><span className="relative rounded-md font-medium text-primary hover:text-primary-dark">Unggah file</span><p className="pl-1">atau seret dan lepas</p></div>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP hingga 10MB</p>
                    </div>
                  </label>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept={ACCEPTED_IMAGE_TYPES.join(',')} ref={fileInputRef} />
                </>
              )}
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Contoh: 75000" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Produk</label>
              <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
          
          <div className="p-5 bg-gray-50 rounded-b-lg border-t">
            <button type="submit" disabled={!isFormValid} className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors disabled:bg-primary-light disabled:cursor-not-allowed shadow-sm hover:shadow-md">
              <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;