import React, { useState } from 'react';
import AdminSection from './AdminSection';
import { BOTTOM_CAROUSEL_SLIDES } from '../../constants';
import CarouselEditModal from './CarouselEditModal';

// Define a more specific type for the slides within this component
export interface CarouselSlide {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  actionType: 'sell' | 'navigate' | 'scroll';
  actionPayload: string | null;
}

const CarouselManagementView: React.FC = () => {
    const [slides, setSlides] = useState<CarouselSlide[]>(BOTTOM_CAROUSEL_SLIDES.map(s => ({
        ...s,
        // Ensure type compatibility
        actionType: s.actionType as CarouselSlide['actionType'],
        actionPayload: s.actionPayload as string | null
    })));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlide, setEditingSlide] = useState<CarouselSlide | null>(null);

    const handleOpenModal = (slide: CarouselSlide | null = null) => {
        setEditingSlide(slide);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSlide(null);
    };

    const handleSaveSlide = (slideData: Omit<CarouselSlide, 'id'> & { id?: number }) => {
        if (slideData.id) {
            // Editing existing slide
            setSlides(slides.map(s => s.id === slideData.id ? { ...s, ...slideData } as CarouselSlide : s));
        } else {
            // Adding new slide
            const newSlide: CarouselSlide = {
                ...slideData,
                id: Date.now(), // Use timestamp for a simple unique ID
            };
            setSlides([newSlide, ...slides]);
        }
        handleCloseModal();
    };

    const handleDeleteSlide = (slideId: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus slide ini?')) {
            setSlides(slides.filter(s => s.id !== slideId));
        }
    };

  return (
    <>
        <AdminSection title="Pengelolaan Carousel">
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

        <CarouselEditModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveSlide}
            slideData={editingSlide}
        />
    </>
  );
};

export default CarouselManagementView;