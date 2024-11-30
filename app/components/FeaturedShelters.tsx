'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, MapPin, Heart, Building2, Phone, Mail, Info, Share, Navigation,
  ArrowUpDown, Filter, X
} from 'lucide-react';
import Link from 'next/link';
import { getStateColor } from '../utils/stateColors';
import type { Shelter } from '../../types/shelter';

interface FeaturedSheltersProps {
  shelters: Shelter[];
}

export default function FeaturedShelters({ shelters }: FeaturedSheltersProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'state' | 'city'>('state');
  const [filterRegion, setFilterRegion] = useState<string>('');
  const [filterHasEmail, setFilterHasEmail] = useState(false);
  const [filterHasPhone, setFilterHasPhone] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  // Convert input to array if needed
  const shelterArray = Array.isArray(shelters) ? shelters : [];

  // Get unique regions
  const regions = useMemo(() => {
    const allRegions = shelterArray.map(s => getStateColor(s.state).region);
    return [...new Set(allRegions)].sort();
  }, [shelterArray]);

  // Sort and filter shelters
  const filteredShelters = useMemo(() => {
    return shelterArray
      .filter(shelter => {
        const stateColor = getStateColor(shelter.state);
        const matchesRegion = !filterRegion || stateColor.region === filterRegion;
        const matchesEmail = !filterHasEmail || shelter.email;
        const matchesPhone = !filterHasPhone || shelter.phone;
        return matchesRegion && matchesEmail && matchesPhone;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'city':
            return a.city.localeCompare(b.city);
          case 'state':
            return a.state.localeCompare(b.state);
          default:
            return 0;
        }
      });
  }, [shelterArray, sortBy, filterRegion, filterHasEmail, filterHasPhone]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredShelters.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShelters = filteredShelters.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      {/* Sort and Filter Controls */}
      <div className="mb-8 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'state' | 'city')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="state">Sort by State</option>
            <option value="name">Sort by Name</option>
            <option value="city">Sort by City</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter size={16} className="mr-2" />
            Filters
          </button>
        </div>

        {/* Filter counts */}
        <div className="text-sm text-gray-600">
          Showing {currentShelters.length} of {filteredShelters.length} shelters
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filter Shelters</h3>
            <button onClick={() => setShowFilters(false)}>
              <X size={20} className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Contact Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filterHasEmail}
                    onChange={(e) => setFilterHasEmail(e.target.checked)}
                    className="mr-2"
                  />
                  Has Email
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filterHasPhone}
                    onChange={(e) => setFilterHasPhone(e.target.checked)}
                    className="mr-2"
                  />
                  Has Phone
                </label>
              </div>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterRegion('');
                  setFilterHasEmail(false);
                  setFilterHasPhone(false);
                }}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shelter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentShelters.map((shelter) => {
          const stateColor = getStateColor(shelter.state);
          return (
            <div 
              key={shelter.id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className={`${stateColor.bg} p-4 border-b`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{shelter.name}</h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{shelter.city}, {shelter.state}</span>
                    </div>
                  </div>
                  <div className={`${stateColor.bg} rounded-full p-2`}>
                    <Building2 className={`w-6 h-6 ${stateColor.text}`} />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  {shelter.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className={`w-4 h-4 mr-2 ${stateColor.text}`} />
                      <span className="text-sm">{shelter.phone}</span>
                    </div>
                  )}
                  {shelter.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className={`w-4 h-4 mr-2 ${stateColor.text}`} />
                      <span className="text-sm truncate">{shelter.email}</span>
                    </div>
                  )}
                  {shelter.address && (
                    <div className="flex items-start text-gray-600">
                      <MapPin className={`w-4 h-4 mr-2 mt-1 ${stateColor.text}`} />
                      <span className="text-sm">{shelter.address}</span>
                    </div>
                  )}
                </div>

                {/* Interactive Features */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Save to favorites"
                    >
                      <Heart size={16} className="text-gray-400 hover:text-red-500" />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Share shelter"
                    >
                      <Share size={16} className="text-gray-400 hover:text-blue-500" />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Get directions"
                      onClick={() => window.open(`https://maps.google.com/?q=${shelter.latitude},${shelter.longitude}`)}
                    >
                      <Navigation size={16} className="text-gray-400 hover:text-green-500" />
                    </button>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link 
                    href={`/shelter/${shelter.id}`}
                    className={`inline-flex items-center ${stateColor.text} hover:opacity-80 font-semibold text-sm`}
                  >
                    View Details
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 w-full max-w-sm">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg text-sm ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            Previous
          </button>
          <span className="text-gray-600 text-sm whitespace-nowrap">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg text-sm ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 