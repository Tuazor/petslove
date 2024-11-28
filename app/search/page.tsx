'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Shelter } from '../../types/shelter';
import sheltersData from '../data/shelters.json'; // Adjust the path as necessary
// eslint-disable-next-line no-unused-vars
import { MapPin, Search, MapIcon, Filter, X } from 'lucide-react';
import Pagination from '../components/Pagination';
// Dynamically import ShelterMap to avoid SSR issues
const ShelterMap = dynamic(() => import('../components/ShelterMap'), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-gray-200 animate-pulse"></div>
});

export default function ShelterSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debugging: Check the shelters data
  console.log('Shelters Data:', sheltersData);

  // Get unique states for dropdown
  const states = useMemo(() => {
    return Array.from(new Set(sheltersData.map(shelter => shelter.state)))
      .filter(state => state)
      .sort();
  }, []);

  // Filter shelters based on search criteria
  const filteredShelters = useMemo(() => {
    return sheltersData.filter(shelter => {
      const matchesSearch = shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shelter.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesState = !selectedState || shelter.state === selectedState;

      return matchesSearch && matchesState;
    });
  }, [searchTerm, selectedState]);

  // Error handling for no results
  const renderContent = () => {
    if (filteredShelters.length === 0) {
      return (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">No Shelters Found</h2>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters to find more results.
          </p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedState('');
            }}
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
          >
            Reset Filters
          </button>
        </div>
      );
    }

    // Paginate filtered shelters
    const indexOfLastShelter = currentPage * itemsPerPage;
    const indexOfFirstShelter = indexOfLastShelter - itemsPerPage;
    const currentShelters = filteredShelters.slice(indexOfFirstShelter, indexOfLastShelter);
    const totalPages = Math.ceil(filteredShelters.length / itemsPerPage);

    return (
      <>
        <div className="max-w-4xl mx-auto">
          {currentShelters.map((shelter) => (
            <div 
              key={shelter.id} 
              className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{shelter.name}</h2>
                  <p className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-2 text-green-600" />
                    <span>{shelter.city}, {shelter.state}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile and Desktop Pagination */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Search and Filter Section */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex space-x-4">
          <div className="flex-grow relative">
            <input 
              type="text" 
              placeholder="Search shelters by name or city" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <select 
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}

