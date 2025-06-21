
import React from 'react';
import { Deal } from '../types';
import { TagIcon, CheckBadgeIcon, ChartBarIcon } from './icons';

interface DealCardProps {
  deal: Deal;
  onVerify: (deal: Deal) => void;
  onShowPriceHistory: (deal: Deal) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onVerify, onShowPriceHistory }) => {
  const discountPercentage = () => {
    const original = parseFloat(deal.originalPrice?.replace('$', ''));
    const discounted = parseFloat(deal.discountedPrice?.replace('$', ''));
    if (isNaN(original) || isNaN(discounted) || original <= 0 || discounted >= original) {
      return null;
    }
    return Math.round(((original - discounted) / original) * 100);
  };

  const currentDiscount = discountPercentage();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
      <img 
        src={deal.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(deal.id)}/400/250`} 
        alt={deal.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 h-14 line-clamp-2">{deal.title}</h3>
        <p className="text-sm text-gray-600 mb-3 flex-grow h-16 line-clamp-3">{deal.description}</p>
        
        <div className="mb-3">
          <p className="text-2xl font-bold text-blue-600">
            {deal.discountedPrice}
            {deal.originalPrice && <span className="text-sm text-gray-500 line-through ml-2">{deal.originalPrice}</span>}
          </p>
          {currentDiscount && (
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full ml-2">
              {currentDiscount}% OFF
            </span>
          )}
        </div>

        <div className="text-sm text-gray-500 mb-3">
          <span className="font-medium">Merchant:</span> {deal.merchant}
        </div>
        <div className="text-sm text-gray-500 mb-4 flex items-center">
          <TagIcon className="w-4 h-4 mr-1 text-blue-500" />
          <span className="font-medium">Category:</span> {deal.category}
        </div>
        
        <div className="mt-auto grid grid-cols-2 gap-3">
          <button
            onClick={() => onVerify(deal)}
            className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm"
          >
            <CheckBadgeIcon className="w-5 h-5 mr-2" />
            Verify Deal
          </button>
          <button
            onClick={() => onShowPriceHistory(deal)}
            className="flex items-center justify-center w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm"
          >
            <ChartBarIcon className="w-5 h-5 mr-2" />
            Price History
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;