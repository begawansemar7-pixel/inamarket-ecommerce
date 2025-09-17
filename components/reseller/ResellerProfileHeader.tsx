import React from 'react';
import { Seller } from '../../types';
import VerificationStatusBadge from '../VerificationStatusBadge';
import { MapPinIcon, CalendarDaysIcon, ArchiveBoxIcon } from '../icons/Icons';

interface ResellerProfileHeaderProps {
  seller: Seller;
  productCount: number;
}

const ResellerProfileHeader: React.FC<ResellerProfileHeaderProps> = ({ seller, productCount }) => {
  return (
    <header className="bg-white shadow-sm">
      {/* Cover Image */}
      <div className="h-48 bg-gray-200">
        <img src={seller.coverImageUrl} alt={`${seller.name} cover`} className="w-full h-full object-cover" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12 space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b">
          {/* Profile Picture */}
          <div className="flex-shrink-0 w-32 h-32 rounded-full border-4 border-white bg-gray-300 shadow-lg">
            <img src={seller.logoUrl} alt={`${seller.name} logo`} className="w-full h-full object-cover rounded-full" />
          </div>
          
          {/* Seller Info */}
          <div className="flex-grow text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{seller.name}</h1>
              <VerificationStatusBadge status={seller.verification} />
            </div>
            <p className="text-gray-500 mt-1">{seller.tagline}</p>
          </div>
          
          {/* Stats */}
          <div className="flex-shrink-0 flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-1.5 text-gray-400" />
              <span>{seller.location}</span>
            </div>
            <div className="flex items-center">
              <CalendarDaysIcon className="w-4 h-4 mr-1.5 text-gray-400" />
              <span>Bergabung {seller.joinedDate}</span>
            </div>
            <div className="flex items-center">
              <ArchiveBoxIcon className="w-4 h-4 mr-1.5 text-gray-400" />
              <span>{productCount} Produk</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ResellerProfileHeader;