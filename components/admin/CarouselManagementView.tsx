import React from 'react';
import AdminSection from './AdminSection';

const CarouselManagementView: React.FC = () => {
    // Dummy data - in a real app this would come from a database
    const slides = [
        {
            id: 1,
            imageUrl: "https://picsum.photos/seed/carousel1/1600/600",
            title: "Produk Unggulan Minggu Ini",
            subtitle: "Dapatkan kerajinan tangan dan kuliner terbaik yang dipilih khusus untuk Anda.",
        },
        {
            id: 2,
            imageUrl: "https://picsum.photos/seed/carousel2/1600/600",
            title: "Promo Spesial Kemerdekaan",
            subtitle: "Diskon hingga 79% untuk produk fashion dan aksesoris lokal. Rayakan Indonesia!",
        },
    ];

  return (
    <AdminSection title="Pengelolaan Carousel">
      <div className="space-y-6">
        {slides.map(slide => (
            <div key={slide.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <img src={slide.imageUrl} alt={slide.title} className="w-40 h-20 object-cover rounded-md flex-shrink-0" />
                <div className="flex-grow">
                    <h4 className="font-bold text-gray-800">{slide.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{slide.subtitle}</p>
                </div>
                <div className="flex space-x-2">
                    <button className="text-primary hover:text-primary-dark font-semibold text-sm">Edit</button>
                    <button className="text-red-500 hover:text-red-700 font-semibold text-sm">Hapus</button>
                </div>
            </div>
        ))}
      </div>
       <div className="mt-6">
        <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-md">
          + Tambah Slide Baru
        </button>
      </div>
    </AdminSection>
  );
};

export default CarouselManagementView;
