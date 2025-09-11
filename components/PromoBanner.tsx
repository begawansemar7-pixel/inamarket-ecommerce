import React from 'react';

const PromoBanner: React.FC = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="relative bg-gray-800 rounded-lg overflow-hidden group">
          <img
            src="https://picsum.photos/seed/promo-banner/1200/300"
            alt="Promotional banner"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
          />
          <div className="relative p-12 lg:p-16 text-white flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-secondary-light tracking-tight">
                Diskon Kilat Akhir Pekan!
              </h2>
              <p className="mt-3 text-lg text-gray-200 max-w-2xl">
                Nikmati potongan harga spesial untuk produk pilihan. Jangan sampai ketinggalan!
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="bg-secondary hover:bg-secondary-dark text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg">
                Belanja Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;