import React, { useState, useMemo, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import FilterBar from '../components/FilterBar';
import PromoBanner from '../components/PromoBanner';
import CollapsibleCategorySection from '../components/CollapsibleCategorySection';
import CategoryGrid from '../components/CategoryGrid';
import BottomCarousel from '../components/BottomCarousel';
// Fix: Import the centralized 'Page' type to ensure type consistency for navigation.
import { Product, PromoBannerData, HeroSlide, Page } from '../types';
import { ALL_CATEGORIES, LOCATIONS } from '../constants';
import ProductGridSkeleton from '../components/skeletons/ProductGridSkeleton';


// Fix: Remove the local 'Page' type definition in favor of the centralized one from types.ts.

interface HomePageProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigate: (page: Page) => void;
  onSellClick: () => void;
  promoBannerData: PromoBannerData;
  heroSlides: HeroSlide[];
  searchTerm: string;
  onBuyNow: (product: Product) => void;
  onViewSellerProfile: (sellerName: string) => void;
}

type CuratedFilter = 'all' | 'new' | 'featured' | 'promo' | 'recommended';

const HomePage: React.FC<HomePageProps> = ({ products, onViewDetails, onAddToCart, onNavigate, onSellClick, promoBannerData, heroSlides, searchTerm, onBuyNow, onViewSellerProfile }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    price: [0, 2000000],
    location: 'all',
  });
  const [curatedFilter, setCuratedFilter] = useState<CuratedFilter>('all');
  
  const [isLoading, setIsLoading] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  const maxPrice = useMemo(() => Math.ceil(Math.max(...products.map(p => p.price), 2000000) / 100000) * 100000, [products]);

  const handleFilterChange = (filterName: keyof typeof filters, value: string | number | number[]) => {
    if (filterName === 'price' && Array.isArray(value)) {
      setFilters(prev => ({ ...prev, price: value as number[] }));
    } else {
      setFilters(prev => ({ ...prev, [filterName]: value as string }));
    }
  };
  
  const handleCuratedFilterChange = (value: CuratedFilter) => {
    setCuratedFilter(value);
  };

  const handleCategorySelect = (categoryName: string) => {
    setFilters(prev => ({...prev, category: categoryName}));
  };
  
  const resetFilters = () => {
    setFilters({
        category: 'all',
        price: [0, maxPrice],
        location: 'all'
    });
    setCuratedFilter('all');
    // Note: searchTerm is controlled by App.tsx, so we don't reset it here.
    // The user might want to reset filters but keep their search term.
  };

  const filteredProducts = useMemo(() => {
    let productsToFilter = products.filter(product => {
      const matchCategory = filters.category === 'all' || product.category === filters.category;
      const matchPrice = product.price >= filters.price[0] && product.price <= filters.price[1];
      const matchLocation = filters.location === 'all' || product.location === filters.location;
      const matchSearch = searchTerm === '' || 
                          product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchPrice && matchLocation && matchSearch;
    });

    switch (curatedFilter) {
      case 'new':
        productsToFilter.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
        const getScore = (p: Product) => {
          const avgRating = p.reviews.length > 0 ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length : 3;
          return (p.sales || 0) * 0.7 + (avgRating * 20);
        };
        productsToFilter.sort((a, b) => getScore(b) - getScore(a));
        break;
      case 'promo':
        productsToFilter = productsToFilter.filter(p => (p.discount && p.discount > 0) || p.originalPrice);
        break;
      case 'recommended':
        productsToFilter = [...productsToFilter].sort(() => Math.random() - 0.5);
        break;
      case 'all':
      default:
        // No special sorting/filtering needed
        break;
    }

    return productsToFilter;
  }, [products, filters, searchTerm, curatedFilter]);
  
  const availableLocations = useMemo(() => {
      const allProductLocations = new Set(products.map(p => p.location));
      return LOCATIONS.filter(loc => allProductLocations.has(loc));
  }, [products]);

  const newProducts = useMemo(() => {
    return [...products].sort((a, b) => b.id - a.id).slice(0, 4);
  }, [products]);

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setDisplayedProducts(filteredProducts);
      setIsLoading(false);
    }, 500); // Simulate network delay

    return () => {
      clearTimeout(handler);
    };
  }, [filteredProducts]);

  return (
    <>
      <Hero onNavigate={onNavigate} slides={heroSlides} />
      
      <CollapsibleCategorySection title="Jelajahi Kategori" defaultOpen={true}>
        <CategoryGrid categories={ALL_CATEGORIES} onCategorySelect={handleCategorySelect} />
      </CollapsibleCategorySection>
      
      <PromoBanner data={promoBannerData} />
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Produk Baru</h2>
        {isLoading && searchTerm === '' ? <ProductGridSkeleton count={4} /> : <ProductGrid products={newProducts} onViewDetails={onViewDetails} onAddToCart={onAddToCart} onBuyNow={onBuyNow} onViewSellerProfile={onViewSellerProfile} />}
      </div>


      <main id="product-section" className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <aside className="lg:col-span-1 lg:sticky lg:top-24 hidden lg:block">
               <FilterBar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    maxPrice={maxPrice}
                    locations={LOCATIONS}
                    onReset={resetFilters}
                    availableLocations={availableLocations}
                    showPriceFilter={true}
                    categories={ALL_CATEGORIES.map(c => ({ name: c.name }))}
                />
            </aside>

            <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Jelajahi Produk Lainnya</h2>
                
                {/* Filters for mobile / curated filters for desktop */}
                <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                         <span className="text-sm font-semibold text-gray-600 mr-2 shrink-0">Urutkan:</span>
                         {Object.entries({
                            all: 'Semua Produk', new: 'Produk Baru', featured: 'Unggulan', promo: 'Promo', recommended: 'Untukmu'
                         }).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => handleCuratedFilterChange(key as CuratedFilter)}
                                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-colors ${
                                    curatedFilter === key
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {label}
                            </button>
                         ))}
                    </div>
                </div>

                {isLoading ? (
                    <ProductGridSkeleton count={9} />
                ) : (
                    <div className="animate-fade-in">
                        {displayedProducts.length > 0 ? (
                            <ProductGrid products={displayedProducts} onViewDetails={onViewDetails} onAddToCart={onAddToCart} onBuyNow={onBuyNow} onViewSellerProfile={onViewSellerProfile} />
                        ) : (
                            <div className="text-center py-16 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-700">Tidak ada produk yang cocok</h3>
                            <p className="text-gray-500 mt-2">Coba sesuaikan filter Anda atau reset untuk melihat semua produk.</p>
                            <button onClick={resetFilters} className="mt-4 bg-primary text-white font-semibold py-2 px-4 rounded-md">
                                Reset Filter
                            </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
      </main>

      <BottomCarousel onNavigate={onNavigate} onSellClick={onSellClick} />
    </>
  );
};

export default HomePage;