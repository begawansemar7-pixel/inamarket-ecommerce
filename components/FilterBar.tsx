import React from 'react';

const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
};

interface FilterBarProps {
  filters: {
    category: string;
    price: number;
    location: string;
  };
  onFilterChange: (filterName: keyof FilterBarProps['filters'], value: string | number) => void;
  maxPrice: number;
  locations: string[];
  categories: string[];
  onReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, maxPrice, locations, categories, onReset }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-[81px] z-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">Kategori</label>
          <select
            id="category-filter"
            name="category"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="all">Semua Kategori</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        
        <div className="lg:col-span-1">
          <label htmlFor="price-filter" className="block text-sm font-medium text-gray-700">
            Harga Maksimal: <span className="font-bold text-primary-dark">{formatRupiah(filters.price)}</span>
          </label>
          <input
            id="price-filter"
            type="range"
            min="0"
            max={maxPrice}
            step={1000}
            value={filters.price}
            onChange={(e) => onFilterChange('price', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2 accent-primary"
          />
        </div>

        <div>
          <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700">Lokasi Penjual</label>
          <select
            id="location-filter"
            name="location"
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="all">Semua Lokasi</option>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>
        
        <button
            onClick={onReset}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition-colors w-full"
        >
            Reset Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
