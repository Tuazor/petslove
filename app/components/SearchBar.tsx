'use client';

import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchFilters {
  state?: string;
  services?: string[];
  animalTypes?: string[];
}

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    state: '',
    services: [],
    animalTypes: [],
  });

  const states = [
    'All States',
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ];

  const services = [
    'Adoption',
    'Foster Care',
    'Veterinary Services',
    'Pet Training',
    'Emergency Shelter'
  ];

  const animalTypes = [
    'Dogs',
    'Cats',
    'Birds',
    'Small Animals',
    'Reptiles'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.set('q', searchTerm);
    if (filters.state && filters.state !== 'All States') queryParams.set('state', filters.state);
    if (filters.services?.length) queryParams.set('services', filters.services.join(','));
    if (filters.animalTypes?.length) queryParams.set('animals', filters.animalTypes.join(','));

    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for animal shelters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-12 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="p-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Show filters"
          >
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors"
          >
            Search
          </button>
        </div>

        {showFilters && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={filters.state}
                  onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-md"
                >
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
                <div className="space-y-2">
                  {services.map((service) => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.services?.includes(service)}
                        onChange={(e) => {
                          const updatedServices = e.target.checked
                            ? [...(filters.services || []), service]
                            : filters.services?.filter(s => s !== service);
                          setFilters({ ...filters, services: updatedServices });
                        }}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Animal Types</label>
                <div className="space-y-2">
                  {animalTypes.map((animal) => (
                    <label key={animal} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.animalTypes?.includes(animal)}
                        onChange={(e) => {
                          const updatedTypes = e.target.checked
                            ? [...(filters.animalTypes || []), animal]
                            : filters.animalTypes?.filter(a => a !== animal);
                          setFilters({ ...filters, animalTypes: updatedTypes });
                        }}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{animal}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 