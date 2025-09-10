
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gray-800 h-96 flex items-center justify-center text-white overflow-hidden">
      <img 
        src="https://picsum.photos/seed/market/1600/600" 
        alt="Hero background" 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Temukan Produk Lokal Terbaik</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Jelajahi ribuan produk unik dan berkualitas dari para pelaku UMKM di seluruh Indonesia.
        </p>
        <button className="mt-8 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
          Mulai Berbelanja
        </button>
      </div>
    </div>
  );
};

export default Hero;
