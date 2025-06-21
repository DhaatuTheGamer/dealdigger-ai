
import React, { useState, useCallback } from 'react';
import { UserPreferences } from '../types';
import { DEAL_CATEGORIES } from '../constants';
import { SearchIcon, TagIcon, MapPinIcon, SparklesIcon, ChevronDownIcon } from './icons';

interface SearchBarAndFiltersProps {
  onSearch: (preferences: UserPreferences, useSearchGrounding: boolean) => void;
  initialPreferences: UserPreferences;
  isLoading: boolean;
}

const SearchBarAndFilters: React.FC<SearchBarAndFiltersProps> = ({ onSearch, initialPreferences, isLoading }) => {
  const [keywords, setKeywords] = useState(initialPreferences.keywords);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialPreferences.categories);
  const [location, setLocation] = useState(initialPreferences.location);
  const [showCategories, setShowCategories] = useState(false);
  const [useSearchGrounding, setUseSearchGrounding] = useState(false);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleSubmit = useCallback((event?: React.FormEvent<HTMLFormElement>, searchGroundingOverride?: boolean) => {
    event?.preventDefault();
    const isGroundingSearch = typeof searchGroundingOverride === 'boolean' ? searchGroundingOverride : useSearchGrounding;
    onSearch({ keywords, categories: selectedCategories, location }, isGroundingSearch);
  }, [keywords, selectedCategories, location, onSearch, useSearchGrounding]);


  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keywords Search */}
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
            Search Deals (Keywords)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., 'laptop', 'running shoes'"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Location Search */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., 'New York', 'Online'"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
      
      {/* Categories Filter */}
      <div>
          <button
            type="button"
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center justify-between w-full text-left px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <TagIcon className="h-5 w-5 text-gray-400 mr-2" />
              Filter by Categories ({selectedCategories.length} selected)
            </span>
            <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
          </button>
          {showCategories && (
            <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50 max-h-60 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {DEAL_CATEGORIES.map(category => (
                  <label key={category} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

      {/* Search Grounding Toggle */}
      <div className="flex items-center justify-between mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <label htmlFor="searchGroundingToggle" className="flex items-center cursor-pointer">
          <SparklesIcon className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-sm font-medium text-blue-700">Use Google Search for latest deals (slower, more current)</span>
        </label>
        <div className="relative">
            <input 
                type="checkbox" 
                id="searchGroundingToggle" 
                className="sr-only peer"
                checked={useSearchGrounding}
                onChange={(e) => setUseSearchGrounding(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </div>
      </div>


      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4">
         <button
          type="button"
          onClick={() => handleSubmit(undefined, true)}
          disabled={isLoading}
          className={`w-full sm:w-auto flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white ${isLoading ? 'bg-yellow-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'} transition duration-150`}
        >
          <SparklesIcon className="h-5 w-5 mr-2" />
          {isLoading && useSearchGrounding ? 'Searching Web...' : 'Find Latest Deals (Web)'}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full sm:w-auto flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'} transition duration-150`}
        >
          <SearchIcon className="h-5 w-5 mr-2" />
          {isLoading && !useSearchGrounding ? 'Searching...' : 'Find Deals (AI Generated)'}
        </button>
      </div>
    </form>
  );
};

export default SearchBarAndFilters;
