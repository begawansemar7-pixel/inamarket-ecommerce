import React, { useState } from 'react';
import { CopyIcon, CheckCircleIcon } from './icons/Icons';

interface SellModalResultViewProps {
  description: string;
  onDescriptionChange: (newDescription: string) => void;
}

const SellModalResultView: React.FC<SellModalResultViewProps> = ({ description, onDescriptionChange }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(description).then(() => {
        setCopySuccess('Deskripsi berhasil disalin!');
        setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
        setCopySuccess('Gagal menyalin.');
    });
  };

  if (!description) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Deskripsi akan muncul di sini setelah dibuat.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
       <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Hasil Deskripsi AI:</h3>
        <button onClick={handleCopy} className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1.5 px-3 rounded-md transition-colors">
            <CopyIcon className="w-4 h-4 mr-1.5"/>
            Salin
        </button>
      </div>
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
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
  );
};

export default SellModalResultView;
