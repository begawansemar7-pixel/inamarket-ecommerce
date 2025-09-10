import React, { useState, useEffect, useRef } from 'react';
import { generateProductDescription } from '../services/geminiService';
import Spinner from './Spinner';
import { SparklesIcon, CopyIcon, CloseIcon, MagicWandIcon, DocumentTextIcon, CheckCircleIcon, ImageIcon, TrashIcon } from './icons/Icons';

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SellModal: React.FC<SellModalProps> = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'result'>('details');
  
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset state when modal is closed
    if (!isOpen) {
      setProductName('');
      setPrice('');
      setFeatures('');
      setGeneratedDescription('');
      setError(null);
      setCopySuccess('');
      setActiveTab('details');
      setIsLoading(false);
      
      // Cleanup image state
      if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
      }
      setImage(null);
      setImagePreview(null);
      setIsDragging(false);
    }
  }, [isOpen]);

  const handleFileSelect = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setError(null);
    } else if (file) {
        setError("Silakan pilih file gambar (PNG, JPG, WEBP).");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files ? e.target.files[0] : null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileSelect(e.dataTransfer.files ? e.dataTransfer.files[0] : null);
  };

  const removeImage = () => {
      if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
      }
      setImage(null);
      setImagePreview(null);
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
  };

  const handleGenerate = async () => {
    if (!productName || !price || !features) {
      setError('Nama produk, harga, dan fitur utama harus diisi.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedDescription('');
    try {
      const description = await generateProductDescription(productName, features);
      setGeneratedDescription(description);
      setActiveTab('result'); // Switch to result tab on success
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDescription).then(() => {
        setCopySuccess('Deskripsi berhasil disalin!');
        setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
        setCopySuccess('Gagal menyalin.');
    });
  };

  if (!isOpen) return null;

  const TabButton: React.FC<{ tab: 'details' | 'result'; label: string; icon: React.ReactNode }> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      disabled={tab === 'result' && !generatedDescription}
      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
        activeTab === tab
          ? 'border-primary text-primary'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      } disabled:text-gray-300 disabled:cursor-not-allowed`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up">
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-light/20 p-2 rounded-full">
                <MagicWandIcon className="w-6 h-6 text-primary-dark" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Buat Deskripsi Produk dengan AI</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-5">
            <TabButton tab="details" label="1. Detail Produk" icon={<DocumentTextIcon className="w-5 h-5"/>} />
            <TabButton tab="result" label="2. Hasil AI" icon={<SparklesIcon className="w-5 h-5"/>} />
          </nav>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-grow relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10">
              <Spinner />
              <p className="mt-3 text-gray-600 font-medium">AI sedang meracik kata-kata terbaik...</p>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto Produk</label>
                {imagePreview ? (
                  <div className="relative group">
                    <img src={imagePreview} alt="Product preview" className="w-full h-48 object-cover rounded-md border border-gray-200" />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none"
                      aria-label="Remove image"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="file-upload"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer transition-colors
                        ${isDragging ? 'border-primary bg-primary-light/10' : 'hover:border-gray-400'}`}
                    >
                      <div className="space-y-1 text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                           <span className="relative rounded-md font-medium text-primary hover:text-primary-dark">
                              Unggah file
                            </span>
                          <p className="pl-1">atau seret dan lepas</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP hingga 10MB</p>
                      </div>
                    </label>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" ref={fileInputRef} />
                  </>
                )}
              </div>
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Contoh: Kopi Gayo Asli Aceh"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">Harga Produk (Rp)</label>
                <input
                  type="number"
                  id="productPrice"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Contoh: 75000"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">Fitur / Keunggulan Utama</label>
                <textarea
                  id="features"
                  rows={4}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Contoh: 100% Arabika, aroma kuat, sedikit asam, ditanam organik"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
          )}

          {activeTab === 'result' && (
            <div>
              {generatedDescription ? (
                <div className="space-y-3">
                   <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Hasil Deskripsi AI:</h3>
                    <button onClick={handleCopy} className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1.5 px-3 rounded-md transition-colors">
                        <CopyIcon className="w-4 h-4 mr-1.5"/>
                        Salin
                    </button>
                  </div>
                  <textarea
                    value={generatedDescription}
                    onChange={(e) => setGeneratedDescription(e.target.value)}
                    rows={10}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md font-sans text-sm text-gray-800 focus:ring-primary focus:border-primary"
                    aria-label="Generated product description"
                  />
                  <p className="text-xs text-gray-500 mt-1">Anda dapat menyunting teks di atas sebelum menyalinnya.</p>
                  {copySuccess && (
                      <div className="flex items-center text-green-600 text-sm font-medium">
                          <CheckCircleIcon className="w-5 h-5 mr-1.5" />
                          {copySuccess}
                      </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">Deskripsi akan muncul di sini setelah dibuat.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {activeTab === 'details' && (
          <div className="p-5 bg-gray-50 rounded-b-lg border-t">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors disabled:bg-primary-light disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Buat Deskripsi
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SellModal;