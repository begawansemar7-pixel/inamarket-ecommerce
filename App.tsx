import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import SellModal from './components/SellModal';
import CategoryPill from './components/CategoryPill';
import FilterBar from './components/FilterBar';
import { PRODUCTS, CATEGORIES } from './constants';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { uniqueLocations, maxPrice } = useMemo(() => {
    return {
      uniqueLocations: [...new Set(PRODUCTS.map(p => p.location))].sort(),
      maxPrice: Math.max(...PRODUCTS.map(p => p.price)),
    };
  }, []);

  const [filters, setFilters] = useState({
    category: 'all',
    price: maxPrice,
    location: 'all',
  });

  const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      price: maxPrice,
      location: 'all',
    });
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      const priceMatch = product.price <= filters.price;
      const locationMatch = filters.location === 'all' || product.location === filters.location;
      return categoryMatch && priceMatch && locationMatch;
    });
  }, [filters, PRODUCTS]);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header onSellClick={() => setIsModalOpen(true)} />
      <main className="flex-grow">
        <Hero />
        
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Kategori Pilihan</h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <CategoryPill key={category} name={category} />
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 mt-8">
            <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                maxPrice={maxPrice}
                locations={uniqueLocations}
                categories={CATEGORIES}
                onReset={resetFilters}
            />
            <ProductGrid 
              title={filteredProducts.length > 0 ? `Menampilkan ${filteredProducts.length} Produk` : 'Tidak Ada Produk Ditemukan'} 
              products={filteredProducts} 
            />
        </div>

      </main>
      <Footer />
      <SellModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
