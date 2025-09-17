import React, { useState, useEffect } from 'react';
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
  availableLocations: string[];
  showPriceFilter: boolean;
  categories: { name: string }[];
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


const FilterSidebar: React.FC<FilterSidebarProps> = ({
    filters,
    onFilterChange,
    maxPrice,
    locations,
    onReset,
    availableLocations,
    showPriceFilter,
    categories
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleLocalFilterChange = (filterName: keyof typeof filters, value: any) => {
    setLocalFilters(prev => ({ ...prev, [filterName]: value }));
    onFilterChange(filterName, value);
  };
  
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Math.min(Number(e.target.value), localFilters.price[1] - 1000);
      handleLocalFilterChange('price', [newMin, localFilters.price[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Math.max(Number(e.target.value), localFilters.price[0] + 1000);
      handleLocalFilterChange('price', [localFilters.price[0], newMax]);
  };
  
  const isCategoryActive = localFilters.category !== 'all';
  const isLocationActive = localFilters.location !== 'all';
  const isPriceActive = localFilters.price[0] > 0 || localFilters.price[1] < maxPrice;
  const anyFilterActive = isCategoryActive || isLocationActive || isPriceActive;
  const showLocationFilter = availableLocations.length > 1;
  
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
                      <FilterPill label={localFilters.category} onRemove={() => handleLocalFilterChange('category', 'all')} />
                  )}
                  {isLocationActive && (
                      <FilterPill label={localFilters.location} onRemove={() => handleLocalFilterChange('location', 'all')} />
                  )}
                  {isPriceActive && (
                      <FilterPill label={`${formatRupiah(localFilters.price[0])} - ${formatRupiah(localFilters.price[1])}`} onRemove={() => handleLocalFilterChange('price', [0, maxPrice])} />
                  )}
              </div>
          </div>
      )}

      <div className="mt-4">
        <FilterAccordion title="Kategori" defaultOpen={true} isActive={isCategoryActive}>
            <div className="flex flex-col space-y-1 pt-2 max-h-60 overflow-y-auto">
                <button
                  onClick={() => handleLocalFilterChange('category', 'all')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    localFilters.category === 'all'
                      ? 'bg-primary text-white font-semibold shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Semua Kategori
                </button>
                {categories.map((category) => {
                  const isSelected = localFilters.category === category.name;
                  return (
                    <button
                      key={category.name}
                      onClick={() => handleLocalFilterChange('category', category.name)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        isSelected
                          ? 'bg-primary text-white font-semibold shadow-sm'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  );
                })}
            </div>
        </FilterAccordion>

        {showPriceFilter && (
            <FilterAccordion title="Harga" defaultOpen={true} isActive={isPriceActive}>
                <div className="pt-4 px-1">
                    <div className="relative h-5">
                        {/* Track */}
                        <div className="absolute w-full h-1 bg-gray-200 rounded-full top-1/2 -translate-y-1/2" />
                        {/* Selected Range */}
                        <div
                            className="absolute h-1 bg-primary rounded-full top-1/2 -translate-y-1/2"
                            style={{
                                left: `${(localFilters.price[0] / maxPrice) * 100}%`,
                                right: `${100 - (localFilters.price[1] / maxPrice) * 100}%`,
                            }}
                        />
                        
                        {/* Min Slider */}
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            value={localFilters.price[0]}
                            onChange={handleMinPriceChange}
                            className="absolute w-full h-5 appearance-none bg-transparent pointer-events-none range-slider-thumb"
                            aria-label="Minimum price"
                        />
                        {/* Max Slider */}
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            value={localFilters.price[1]}
                            onChange={handleMaxPriceChange}
                            className="absolute w-full h-5 appearance-none bg-transparent pointer-events-none range-slider-thumb"
                            aria-label="Maximum price"
                        />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-3">
                    <span>{formatRupiah(localFilters.price[0])}</span>
                    <span>{formatRupiah(localFilters.price[1])}</span>
                    </div>
              </div>
            </FilterAccordion>
        )}

        {showLocationFilter && (
            <FilterAccordion title="Lokasi" defaultOpen={true} isActive={isLocationActive}>
              <div className="flex flex-col space-y-2 pt-2">
                <button
                  onClick={() => handleLocalFilterChange('location', 'all')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    localFilters.location === 'all'
                      ? 'bg-primary text-white font-semibold shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Semua Lokasi
                </button>
                {locations.map((location) => {
                  const isSelected = localFilters.location === location;
                  const isAvailable = availableLocations.includes(location);
                  return (
                    <button
                      key={location}
                      onClick={() => handleLocalFilterChange('location', location)}
                      disabled={!isAvailable}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        isSelected
                          ? 'bg-primary text-white font-semibold shadow-sm'
                          : isAvailable
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {location}
                    </button>
                  );
                })}
              </div>
            </FilterAccordion>
        )}
        
        {!showPriceFilter && !showLocationFilter && (
            <div className="pt-4 text-center text-sm text-gray-500">
                Tidak ada filter lain yang tersedia untuk pilihan Anda saat ini.
            </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;