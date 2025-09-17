

import React, { useState, useEffect, useRef } from 'react';
import { generateProductDescription, generateProductImage } from '../services/geminiService';
import Spinner from './Spinner';
import { SparklesIcon, CloseIcon, MagicWandIcon, DocumentTextIcon, ImageIcon, TrashIcon, DocumentArrowUpIcon, CheckCircleIcon } from './icons/Icons';
import { fileToBase64 } from '../utils/fileUtils';
import SellModalResultView from './SellModalResultView';
import { Product } from '../types';
import { CATEGORIES } from '../constants';

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (productData: Partial<Product>) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const SellModal: React.FC<SellModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [features, setFeatures] = useState('');
  const [targetAudience, setTargetAudience] = useState('Umum');
  const [writingStyle, setWritingStyle] = useState('Santai & Ramah');

  const [generatedDescriptions, setGeneratedDescriptions] = useState<string[]>([]);
  const [finalDescription, setFinalDescription] = useState('');
  
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'result'>('details');
  
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    // Reset state when modal is closed
    if (!isOpen) {
      setProductName('');
      setPrice('');
      setStock('');
      setCategory(CATEGORIES[0]);
      setFeatures('');
      setTargetAudience('Umum');
      setWritingStyle('Santai & Ramah');
      setGeneratedDescriptions([]);
      setFinalDescription('');
      setError(null);
      setActiveTab('details');
      setIsGeneratingDesc(false);
      setIsGeneratingImage(false);
      setIsUploading(false);
      setUploadSuccess(false);
      
      // Cleanup image state
      if (imagePreview && imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview);
      }
      setImage(null);
      setImagePreview(null);
      setIsDragging(false);
    }
  }, [isOpen]);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    setError(null); // Clear previous errors

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Format file tidak didukung. Gunakan PNG, JPG, atau WEBP.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(`File terlalu besar. Ukuran maksimal adalah ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    
    if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
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
      if (imagePreview && imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview);
      }
      setImage(null);
      setImagePreview(null);
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
  };
  
  const handleGenerateDescription = async () => {
    if (!productName || !price || !features || !stock || !category) {
      setError('Semua field detail produk harus diisi.');
      return;
    }
    setIsGeneratingDesc(true);
    setError(null);
    setGeneratedDescriptions([]);
    setFinalDescription('');

    try {
      let imageData;
      if (image) {
        const base64String = await fileToBase64(image);
        const parts = base64String.split(';base64,');
        const mimeType = parts[0].split(':')[1];
        const data = parts[1];
        imageData = { mimeType, data };
      }

      const descriptions = await generateProductDescription(productName, features, targetAudience, writingStyle, imageData);
      setGeneratedDescriptions(descriptions);
      setFinalDescription(descriptions[0] || '');
      setActiveTab('result');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsGeneratingDesc(false);
    }
  };
  
  const handleSave = () => {
    if (!productName || !price || !features || !stock || !category) {
        setError('Nama, harga, stok, kategori dan fitur harus diisi untuk menyimpan.');
        return;
    }
    setError(null);

    const newProductData: Partial<Product> = {
        name: productName,
        price: Number(price),
        stock: Number(stock),
        category: category,
        description: features, // Use 'features' as the description when saving directly
        imageUrl: imagePreview,
    };
    
    onAddProduct(newProductData);
    onClose(); // Close after saving
  };

  const handleGenerateImage = async () => {
    if (!productName) {
      setError('Nama produk harus diisi untuk membuat gambar.');
      return;
    }
    setIsGeneratingImage(true);
    setError(null);
    try {
      const imagePrompt = `A professional, clean, high-quality e-commerce product photo of '${productName}'. Features: ${features}. Product description for context: "${finalDescription}". The product should be on a white or light gray background with studio lighting.`;
      const generatedDataUrl = await generateProductImage(imagePrompt);

      if (imagePreview && imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(generatedDataUrl);
      setImage(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSaveAndUpload = () => {
    setIsUploading(true);
    setError(null);

    const newProductData: Partial<Product> = {
        name: productName,
        price: Number(price),
        stock: Number(stock),
        category: category,
        description: finalDescription,
        imageUrl: imagePreview
    };
    
    onAddProduct(newProductData);
    
    setTimeout(() => {
        setIsUploading(false);
        setUploadSuccess(true);
        setTimeout(() => {
            onClose();
        }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  const TabButton: React.FC<{ tab: 'details' | 'result'; label: string; icon: React.ReactNode }> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      disabled={tab === 'result' && generatedDescriptions.length === 0}
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
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up">
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-light/20 p-2 rounded-full">
                <MagicWandIcon className="w-6 h-6 text-primary-dark" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Buat Produk dengan AI</h2>
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

        <div className="p-6 overflow-y-auto flex-grow relative">
          {(isGeneratingDesc || isUploading || uploadSuccess) && (
            <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-20 p-6 text-center">
              {isGeneratingDesc && (<><Spinner /><p className="mt-3 text-gray-600 font-medium">AI sedang meracik kata-kata terbaik...</p></>)}
              {isUploading && (<><Spinner /><p className="mt-3 text-gray-600 font-medium">Mengunggah produk Anda...</p></>)}
              {uploadSuccess && (<div className="animate-scale-in"><CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" /><p className="mt-3 text-lg text-gray-700 font-semibold">Produk Berhasil Ditambahkan!</p></div>)}
            </div>
          )}

          <div className={activeTab === 'details' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Nama Produk*</label>
                  <input type="text" id="productName" value={productName} onChange={e => setProductName(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Harga (Rp)*</label>
                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                     <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stok*</label>
                        <input type="number" id="stock" value={stock} onChange={e => setStock(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                 </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori*</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                  <label htmlFor="features" className="block text-sm font-medium text-gray-700">Fitur / Keunggulan Utama*</label>
                  <textarea id="features" value={features} onChange={e => setFeatures(e.target.value)} rows={3} placeholder="Contoh: 100% Kopi Arabika, Tahan air, Jahitan kuat" className="mt-1 w-full border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
              </div>
              {/* Right Column: Image Upload */}
              <div>
                 <label className="block text-sm font-medium text-gray-700">Gambar Produk (Opsional)</label>
                 <p className="text-xs text-gray-500 mb-2">Sertakan gambar agar deskripsi AI lebih akurat.</p>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept={ACCEPTED_IMAGE_TYPES.join(',')} className="hidden" />
                {imagePreview ? (
                    <div className="relative group">
                        <img src={imagePreview} alt="Pratinjau Produk" className="w-full h-48 object-cover rounded-md border" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                            <button onClick={removeImage} className="text-white opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-600 rounded-full shadow-lg"><TrashIcon className="w-5 h-5"/></button>
                        </div>
                    </div>
                ) : (
                     <label onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
                        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary-light/10' : 'border-gray-300 hover:border-primary'}`}>
                        <div className="space-y-1 text-center">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400"/>
                            <p className="text-sm text-gray-600">Seret & lepas file, atau klik untuk memilih</p>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP hingga 10MB</p>
                        </div>
                    </label>
                )}
              </div>
            </div>

             <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-semibold text-gray-800 mb-3">Pandu AI</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">Target Audiens</label>
                        <select id="targetAudience" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                            <option>Umum</option>
                            <option>Anak Muda</option>
                            <option>Keluarga</option>
                            <option>Profesional</option>
                             <option>Pecinta Alam</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="writingStyle" className="block text-sm font-medium text-gray-700">Gaya Penulisan</label>
                        <select id="writingStyle" value={writingStyle} onChange={e => setWritingStyle(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                            <option>Santai & Ramah</option>
                            <option>Profesional & Informatif</option>
                            <option>Mewah & Eksklusif</option>
                            <option>Lucu & Menghibur</option>
                        </select>
                    </div>
                </div>
            </div>
            
            {error && <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          </div>

          <div className={activeTab === 'result' ? 'block' : 'hidden'}>
            <SellModalResultView
                generatedDescriptions={generatedDescriptions}
                finalDescription={finalDescription}
                onFinalDescriptionChange={setFinalDescription}
                imagePreview={imagePreview}
                onGenerateImage={handleGenerateImage}
                isGeneratingImage={isGeneratingImage}
            />
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-b-lg border-t flex-shrink-0">
           {activeTab === 'details' && (
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="w-full sm:w-auto flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm"
                    >
                        <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                        Simpan
                    </button>
                    <button
                        type="button"
                        onClick={handleGenerateDescription}
                        disabled={isGeneratingDesc}
                        className="w-full flex-grow flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm hover:shadow-md disabled:bg-primary-light"
                    >
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isGeneratingDesc ? 'Membuat Deskripsi...' : 'Buat Deskripsi dengan AI'}
                    </button>
                </div>
           )}
           {activeTab === 'result' && (
               <button
                    type="button"
                    onClick={handleSaveAndUpload}
                    disabled={isUploading || uploadSuccess || !finalDescription || !imagePreview}
                    className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-md transition-colors shadow-sm hover:shadow-md disabled:bg-green-300 disabled:cursor-not-allowed"
                >
                    <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                    Simpan & Unggah Produk
               </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default SellModal;
