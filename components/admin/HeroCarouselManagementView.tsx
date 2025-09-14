import React, { useState } from 'react';
import AdminSection from './AdminSection';
import { HeroSlide } from '../../types';
import HeroCarouselEditModal from './HeroCarouselEditModal';

interface HeroCarouselManagementViewProps {
  slides: HeroSlide[];
  onSave: (newSlides: HeroSlide[]) => void;
}

const HeroCarouselManagementView: React.FC<HeroCarouselManagementViewProps> = ({ slides, onSave }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

    const handleOpenModal = (slide: HeroSlide | null = null) => {
        setEditingSlide(slide);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSlide(null);
    };

    const handleSaveSlide = (slideData: Omit<HeroSlide, 'id'> & { id?: number }) => {
        let newSlides: HeroSlide[];
        if (slideData.id) {
            // Editing existing slide
            newSlides = slides.map(s => s.id === slideData.id ? { ...s, ...slideData } as HeroSlide : s);
        } else {
            // Adding new slide
            const newSlide: HeroSlide = {
                ...(slideData as Omit<HeroSlide, 'id'>),
                id: Date.now(), // Use timestamp for a simple unique ID
            };
            newSlides = [newSlide, ...slides];
        }
        onSave(newSlides);
        handleCloseModal();
    };

    const handleDeleteSlide = (slideId: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus slide ini?')) {
            const newSlides = slides.filter(s => s.id !== slideId);
            onSave(newSlides);
        }
    };

  return (
    <>
        <AdminSection title="Pengelolaan Carousel Atas (Hero)">
          <div className="space-y-6">
            {slides.map(slide => (
                <div key={slide.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg">
                    <img src={slide.imageUrl} alt={slide.title} className="w-full sm:w-40 sm:h-20 object-cover rounded-md flex-shrink-0" />
                    <div className="flex-grow">
                        <h4 className="font-bold text-gray-800">{slide.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{slide.subtitle}</p>
                    </div>
                    <div className="flex space-x-2 flex-shrink-0 self-start sm:self-center">
                        <button onClick={() => handleOpenModal(slide)} className="text-primary hover:text-primary-dark font-semibold text-sm">Edit</button>
                        <button onClick={() => handleDeleteSlide(slide.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm">Hapus</button>
                    </div>
                </div>
            ))}
          </div>
           <div className="mt-6">
            <button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-md">
              + Tambah Slide Baru
            </button>
          </div>
        </AdminSection>

        <HeroCarouselEditModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveSlide}
            slideData={editingSlide}
        />
    </>
  );
};

export default HeroCarouselManagementView;
