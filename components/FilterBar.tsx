import React from 'react';
import FilterAccordion from './FilterAccordion';
import { CloseIcon } from './icons/Icons';

interface FilterSidebarProps {
  filters: {
    category: string;
    price: number[];
    location: string;
  };
  onFilterChange: (filterName: keyof FilterSidebarProps['filters'], value: string | number | number[]) => void;
  maxPrice: number;
  locations: string[];
  onReset: () => void;
}

const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
};

const FilterPill: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
    <div className="flex items-center bg-primary-light/20 text-primary-dark text-sm font-medium pl-3 pr-2 py-1 rounded-full animate-scale-in">
        <span>{label}</span>
        <button onClick={onRemove} className="ml-1.5 p-0.5 rounded-full hover:bg-primary/20" aria-label={`Remove ${label} filter`}>
            <CloseIcon className="w-3 h-3" />
        </button>
    </div>
);


const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, maxPrice, locations, onReset }) => {
  const isCategoryActive = filters.category !== 'all';
  const isLocationActive = filters.location !== 'all';
  const isPriceActive = filters.price[0] > 0 || filters.price[1] < maxPrice;
  const anyFilterActive = isCategoryActive || isLocationActive || isPriceActive;
  
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Math.min(Number(e.target.value), filters.price[1] - 1000); // Prevent crossing with a gap
      onFilterChange('price', [newMin, filters.price[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Math.max(Number(e.target.value), filters.price[0] + 1000); // Prevent crossing with a gap
      onFilterChange('price', [filters.price[0], newMax]);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md lg:shadow-md">
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Filter</h2>
        <button onClick={onReset} className="text-sm font-medium text-primary hover:text-primary-dark">
          Reset Semua
        </button>
      </div>

      {anyFilterActive && (
          <div className="py-4 border-b">
              <h3 className="text-md font-semibold text-gray-800 mb-3">Filter Aktif</h3>
              <div className="flex flex-wrap gap-2">
                  {isCategoryActive && (
                      <FilterPill label={filters.category} onRemove={() => onFilterChange('category', 'all')} />
                  )}
                  {isLocationActive && (
                      <FilterPill label={filters.location} onRemove={() => onFilterChange('location', 'all')} />
                  )}
                  {isPriceActive && (
                      <FilterPill label={`${formatRupiah(filters.price[0])} - ${formatRupiah(filters.price[1])}`} onRemove={() => onFilterChange('price', [0, maxPrice])} />
                  )}
              </div>
          </div>
      )}

      <div className="mt-4">
        <FilterAccordion title="Harga" defaultOpen={true}>
            <div className="pt-4 px-1">
                <div className="relative h-5">
                    {/* Track */}
                    <div className="absolute w-full h-1 bg-gray-200 rounded-full top-1/2 -translate-y-1/2" />
                    {/* Selected Range */}
                    <div
                        className="absolute h-1 bg-primary rounded-full top-1/2 -translate-y-1/2"
                        style={{
                            left: `${(filters.price[0] / maxPrice) * 100}%`,
                            right: `${100 - (filters.price[1] / maxPrice) * 100}%`,
                        }}
                    />
                    
                    {/* Min Slider */}
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={filters.price[0]}
                        onChange={handleMinPriceChange}
                        className="absolute w-full h-5 appearance-none bg-transparent pointer-events-none range-slider-thumb"
                        aria-label="Minimum price"
                    />
                    {/* Max Slider */}
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={filters.price[1]}
                        onChange={handleMaxPriceChange}
                        className="absolute w-full h-5 appearance-none bg-transparent pointer-events-none range-slider-thumb"
                        aria-label="Maximum price"
                    />
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-3">
                <span>{formatRupiah(filters.price[0])}</span>
                <span>{formatRupiah(filters.price[1])}</span>
                </div>
          </div>
        </FilterAccordion>

        <FilterAccordion title="Lokasi" defaultOpen={true}>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            <button
                onClick={() => onFilterChange('location', 'all')}
                className={`w-full text-left p-2 rounded-md text-sm transition-colors ${filters.location === 'all' ? 'font-bold text-primary bg-primary-light/10' : 'text-gray-700 hover:bg-gray-100'}`}
            >
                Semua Lokasi
            </button>
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => onFilterChange('location', location)}
                className={`w-full text-left p-2 rounded-md text-sm transition-colors ${filters.location === location ? 'font-bold text-primary bg-primary-light/10' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {location}
              </button>
            ))}
          </div>
        </FilterAccordion>
      </div>
    </div>
  );
};

export default FilterSidebar;