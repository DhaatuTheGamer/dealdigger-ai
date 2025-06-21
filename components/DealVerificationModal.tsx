
import React from 'react';
import { Deal, DealVerification } from '../types';
import { XCircleIcon, CheckBadgeIcon } from './icons';
import LoadingSpinner from './LoadingSpinner';

interface DealVerificationModalProps {
  deal: Deal | null;
  verification: DealVerification | null;
  isLoading: boolean;
  onClose: () => void;
}

const ScoreDisplay: React.FC<{ score: number }> = ({ score }) => {
  const scoreColor = score >= 4 ? 'text-green-500' : score >= 2 ? 'text-yellow-500' : 'text-red-500';
  const scoreText = score >= 4 ? 'Excellent' : score >=3 ? 'Good' : score >= 2 ? 'Fair' : 'Poor/Risky';

  return (
    <div className="text-center my-3">
      <p className={`text-3xl font-bold ${scoreColor}`}>{score}/5</p>
      <p className={`text-sm font-medium ${scoreColor}`}>{scoreText}</p>
    </div>
  );
};

const DealVerificationModal: React.FC<DealVerificationModalProps> = ({ deal, verification, isLoading, onClose }) => {
  if (!deal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <CheckBadgeIcon className="w-7 h-7 mr-2 text-green-600" /> AI Deal Verification
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircleIcon className="w-7 h-7" />
          </button>
        </div>

        <div className="mb-3">
          <h3 className="text-lg font-medium text-gray-700">{deal.title}</h3>
          <p className="text-sm text-gray-500">Merchant: {deal.merchant}</p>
          <p className="text-sm text-gray-500">Price: {deal.discountedPrice} (Original: {deal.originalPrice})</p>
        </div>

        {isLoading && <LoadingSpinner />}
        
        {!isLoading && verification && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <ScoreDisplay score={verification.score} />
            <p className="text-sm text-gray-700 leading-relaxed">{verification.summary}</p>
            {verification.score === 0 && <p className="text-xs text-red-500 mt-2">AI verification encountered an issue. Please try again or assess manually.</p>}
          </div>
        )}
        
        {!isLoading && !verification && (
            <p className="text-red-500 text-center">Could not retrieve verification at this time.</p>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DealVerificationModal;