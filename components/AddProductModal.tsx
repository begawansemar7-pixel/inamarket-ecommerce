import React, { useState, useEffect } from 'react';
import { Product, PriceSuggestion } from '../types';
import { CloseIcon, DocumentArrowUpIcon, SparklesIcon } from './icons/Icons';
import { CATEGORIES, LOCATIONS } from '../constants';
import { generateProductDescription, generateProductImage, suggestProductPrice } from '../services/geminiService';
import Spinner from './Spinner';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product | Omit<Product, 'id'>) => void;
  productToEdit?: Product | null;
}

const emptyProduct: Omit<Product, 'id'> = {
    name: '',
    price: 0,
    description: '',
    imageUrl: 'https://picsum.photos/seed/newproduct/400/400',
    category: CATEGORIES[0],
    seller: 'Current Seller', // This would come from user context
    sellerVerification: 'verified',
    location: LOCATIONS[0],
    reviews: [],
    stock: 0,
    sales: 0,
    originalPrice: undefined,
    discount: 0,
};

const formatRupiah = (price: number): string => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [productData, setProductData] = useState<Product | Omit<Product, 'id'>>(
    productToEdit || emptyProduct
  );
  const [errors, setErrors] = useState<{ stock?: string; discount?: string }>({});

  // AI-related state
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isSuggestingPrice, setIsSuggestingPrice] = useState(false);
  const [priceSuggestion, setPriceSuggestion] = useState<PriceSuggestion | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isOpen) {
        if (productToEdit) {
            setProductData(productToEdit);
        } else {
            setProductData(emptyProduct);
        }
        setErrors({});
        setAiError(null);
        setPriceSuggestion(null);
    }
  }, [productToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'stock') {
      const stockValue = Number(value);
      // Prevent non-positive values (0 or negative) from being set,
      // but allow the field to be cleared (value becomes '').
      // An empty string is parsed as 0, so we check for that explicitly.
      if (stockValue <= 0 && value !== '') {
        return; // Ignore the input change, the field will snap back to the previous valid value.
      }
      setProductData(prev => ({ ...prev, stock: Math.floor(stockValue) }));
      return;
    }

    const isNumber = ['price', 'sales', 'discount', 'originalPrice'].includes(name);
    setProductData(prev => ({ ...prev, [name]: isNumber ? Number(value) || 0 : value }));
  };
  
  const handleGenerateDescription = async () => {
    if (!productData.name) {
        setAiError('Harap isi nama produk terlebih dahulu.');
        return;
    }
    setIsGeneratingDesc(true);
    setAiError(null);
    try {
        // FIX: The original call had incorrect arguments and didn't handle the array response.
        // The service expects productName, features, targetAudience, and writingStyle. We'll use defaults as this modal is simpler.
        const descriptions = await generateProductDescription(productData.name, productData.description, 'Umum', 'Persuasif dan profesional');
        
        // The service returns multiple variations; we'll use the first one for simplicity in this modal.
        if (descriptions && descriptions.length > 0) {
            setProductData(prev => ({ ...prev, description: descriptions[0] }));
        } else {
            setAiError("Gagal menghasilkan deskripsi. Silakan coba lagi.");
        }
    } catch (err) {
        setAiError((err as Error).message);
    } finally {
        setIsGeneratingDesc(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!productData.name) {
        setAiError('Harap isi nama produk terlebih dahulu.');
        return;
    }
    setIsGeneratingImage(true);
    setAiError(null);
    try {
        const prompt = `Foto produk e-commerce profesional dan bersih dari '${productData.name}', kategori '${productData.category}'. Latar belakang putih atau abu-abu terang, pencahayaan studio.`;
        const imageUrl = await generateProductImage(prompt);
        setProductData(prev => ({ ...prev, imageUrl }));
    } catch (err) {
        setAiError((err as Error).message);
    } finally {
        setIsGeneratingImage(false);
    }
  };

  const handleSuggestPrice = async () => {
    if (!productData.name || !productData.category || !productData.description) {
        setAiError('Harap isi nama produk, kategori, dan deskripsi terlebih dahulu.');
        return;
    }
    setIsSuggestingPrice(true);
    setAiError(null);
    setPriceSuggestion(null);
    try {
        const suggestion = await suggestProductPrice(productData.name, productData.category, productData.description);
        setPriceSuggestion(suggestion);
    } catch (err) {
        setAiError((err as Error).message);
    } finally {
        setIsSuggestingPrice(false);
    }
  };

  const handleApplyPrice = (price: number) => {
    setProductData(prev => ({ ...prev, price }));
    setPriceSuggestion(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error)) return;
    onSave(productData);
    onClose();
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">
            {productToEdit ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col overflow-hidden">
            <div className="p-6 space-y-4 overflow-y-auto flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                  <input type="text" name="name" id="name" value={productData.name} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                  <div className="relative">
                    <input type="number" name="price" id="price" value={productData.price} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                     <button type="button" onClick={handleSuggestPrice} disabled={isSuggestingPrice || !productData.name || !productData.category || !productData.description} className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-2 py-1 rounded disabled:opacity-50">
                        {isSuggestingPrice ? <Spinner className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4 mr-1"/>}
                        Saran
                    </button>
                  </div>
                   {priceSuggestion && (
                        <div className="mt-2 p-2 bg-teal-50 border border-teal-200 rounded-md text-sm animate-step-in">
                            <p className="font-semibold text-teal-800">Saran AI: {formatRupiah(priceSuggestion.suggested_price)}</p>
                            <p className="text-xs text-teal-700 mt-1">{priceSuggestion.reasoning}</p>
                            <button type="button" onClick={() => handleApplyPrice(priceSuggestion.suggested_price)} className="mt-2 text-xs font-bold text-white bg-primary hover:bg-primary-dark px-2 py-1 rounded">Terapkan Harga</button>
                        </div>
                   )}
                </div>
              </div>
              <div>
                <label htmlFor="description" className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
                    <span>Deskripsi</span>
                    <button type="button" onClick={handleGenerateDescription} disabled={isGeneratingDesc || !productData.name} className="flex items-center text-xs text-primary hover:text-primary-dark font-semibold disabled:text-gray-400 disabled:cursor-not-allowed">
                        {isGeneratingDesc ? <Spinner className="w-4 h-4 mr-1" /> : <SparklesIcon className="w-4 h-4 mr-1" />}
                        Buat dengan AI
                    </button>
                </label>
                <textarea name="description" id="description" value={productData.description} onChange={handleChange} required rows={4} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select name="category" id="category" value={productData.category} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                  <select name="location" id="location" value={productData.location} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Sisa Stok</label>
                  <input type="number" name="stock" id="stock" value={productData.stock || ''} onChange={handleChange} required min="1" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">Diskon (%)</label>
                  <input type="number" name="discount" id="discount" value={productData.discount || 0} onChange={handleChange} min="0" max="100" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
              </div>
               <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                  <div className="flex items-center space-x-2">
                    <input type="text" name="imageUrl" id="imageUrl" value={productData.imageUrl} onChange={handleChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" placeholder="https://..."/>
                    <button type="button" onClick={handleGenerateImage} disabled={isGeneratingImage || !productData.name} className="flex-shrink-0 flex items-center bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md text-sm disabled:opacity-50">
                        {isGeneratingImage ? <Spinner className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4 mr-1"/>}
                        Buat
                    </button>
                  </div>
                  {productData.imageUrl && (
                      <div className="mt-2 border rounded-md p-2 inline-block">
                          <img src={productData.imageUrl} alt="Pratinjau Produk" className="w-24 h-24 object-cover rounded"/>
                      </div>
                  )}
                </div>

                {aiError && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{aiError}</p>}
            </div>

            <div className="p-5 bg-gray-50 rounded-b-lg border-t flex-shrink-0">
              <button
                type="submit"
                disabled={Object.values(errors).some(e => e)}
                className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-md transition-colors disabled:bg-primary-light disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
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