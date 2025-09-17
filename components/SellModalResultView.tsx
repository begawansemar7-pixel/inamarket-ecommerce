import React, { useState, useEffect } from 'react';
import { CopyIcon, ImageIcon, CheckIcon } from './icons/Icons';
import Spinner from './Spinner';

interface SellModalResultViewProps {
  generatedDescriptions: string[];
  finalDescription: string;
  onFinalDescriptionChange: (newDescription: string) => void;
  imagePreview: string | null;
  onGenerateImage: () => Promise<void>;
  isGeneratingImage: boolean;
}

const SellModalResultView: React.FC<SellModalResultViewProps> = ({ 
    generatedDescriptions,
    finalDescription,
    onFinalDescriptionChange,
    imagePreview,
    onGenerateImage,
    isGeneratingImage
}) => {
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // When new descriptions are generated, reset the selection to the first one.
    setSelectedVariationIndex(0);
    // Also update the parent's final description state to reflect this reset.
    if (generatedDescriptions.length > 0) {
        onFinalDescriptionChange(generatedDescriptions[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedDescriptions]); // Only run when descriptions change.

  const handleSelectVariation = (index: number) => {
    setSelectedVariationIndex(index);
    onFinalDescriptionChange(generatedDescriptions[index]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(finalDescription).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  if (generatedDescriptions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Hasil akan muncul di sini setelah dibuat.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {/* Image Column */}
       <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Gambar Produk:</h3>
            <div className="relative">
                {imagePreview ? (
                    <img src={imagePreview} alt="Product" className="w-full h-auto object-cover rounded-md border border-gray-200 aspect-square" />
                ) : (
                    <div className="w-full aspect-square bg-gray-100 rounded-md flex items-center justify-center border">
                        <p className="text-gray-500 text-sm p-4 text-center">Gambar belum ada. Buat dengan AI atau kembali untuk mengunggah.</p>
                    </div>
                )}
                {isGeneratingImage && (
                    <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10 rounded-md">
                        <Spinner />
                        <p className="mt-3 text-gray-600 font-medium text-sm">AI sedang melukis...</p>
                    </div>
                )}
            </div>
            <button
                type="button"
                onClick={onGenerateImage}
                disabled={isGeneratingImage}
                className="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-50"
            >
                <ImageIcon className="w-4 h-4 mr-2" />
                {isGeneratingImage ? 'Membuat...' : 'Buat Gambar Baru dengan AI'}
            </button>
        </div>

      {/* Description Column */}
       <div className="flex flex-col space-y-4">
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Pilih Variasi Deskripsi:</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto p-1 bg-gray-50 rounded-lg border">
                {generatedDescriptions.map((desc, index) => {
                    const isSelected = selectedVariationIndex === index;
                    return (
                        <div key={index} className={`p-3 border-2 rounded-lg transition-all ${isSelected ? 'border-primary bg-primary-light/10' : 'border-gray-200 bg-white shadow-sm'}`}>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{desc}</p>
                            <div className="text-right mt-2">
                                <button
                                    type="button"
                                    onClick={() => handleSelectVariation(index)}
                                    disabled={isSelected}
                                    className="inline-flex items-center justify-center text-xs font-semibold py-1.5 px-3 rounded-md transition-colors disabled:cursor-not-allowed disabled:bg-primary disabled:text-white bg-primary/20 text-primary-dark hover:bg-primary/30"
                                >
                                    {isSelected ? (
                                        <>
                                            <CheckIcon className="w-4 h-4 mr-1.5" />
                                            Terpilih
                                        </>
                                    ) : 'Gunakan Deskripsi Ini'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="flex-grow flex flex-col pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">Deskripsi Final (dapat disunting):</h3>
                 <button onClick={handleCopy} className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1.5 px-3 rounded-md transition-colors">
                    <CopyIcon className="w-4 h-4 mr-1.5"/>
                    {copySuccess ? 'Tersalin!' : 'Salin'}
                </button>
            </div>
            <textarea
              value={finalDescription}
              onChange={(e) => onFinalDescriptionChange(e.target.value)}
              rows={8}
              className="w-full p-3 bg-white border border-gray-300 rounded-md font-sans text-sm text-gray-800 focus:ring-primary focus:border-primary flex-grow"
              aria-label="Final editable product description"
            />
        </div>
      </div>
    </div>
  );
};

export default SellModalResultView;