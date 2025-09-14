import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';
import { HeroSlide } from '../types';

type Page = 'home' | 'cart' | 'dashboard' | 'profile' | 'checkout' | 'admin-login' | 'admin-dashboard' | 'about' | 'careers' | 'blog' | 'contact' | 'help-center' | 'privacy-policy' | 'terms';

interface HeroProps {
    onNavigate: (page: Page) => void;
    slides: HeroSlide[];
}

const Hero: React.FC<HeroProps> = ({ onNavigate, slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const handleButtonClick = (slide: HeroSlide) => {
      if (slide.actionType === 'scroll' && slide.actionPayload) {
          document.getElementById(slide.actionPayload)?.scrollIntoView({ behavior: 'smooth' });
      } else if (slide.actionType === 'navigate') {
          onNavigate(slide.actionPayload as Page);
      }
  };


  useEffect(() => {
    const slider = setTimeout(() => goToNext(), 5000); // Auto-play every 5 seconds
    return () => clearTimeout(slider);
  }, [currentIndex, goToNext]);

  return (
    <div className="relative h-96 w-full overflow-hidden group">
      {/* Slides */}
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            slideIndex === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div key={slide.id} className="relative z-10 text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight animate-fade-in-down">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {slide.subtitle}
              </p>
              <button
                onClick={() => handleButtonClick(slide)}
                className="mt-8 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
              >
                  {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === slideIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>
       <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-fade-in-down, .animate-fade-in-up {
           animation-fill-mode: backwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;