'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Search } from 'lucide-react';
import sheltersData from './data/shelters.json';
import ShelterStatistics from './components/ShelterStatistics';
import SearchBar from './components/SearchBar';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShelters = sheltersData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sheltersData.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            Find Animal Shelters Near You
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect with trusted animal shelters across North America and help animals find their forever homes.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Featured Shelters Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Featured Shelters</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
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
              onClick={handleNextPage}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentShelters.map((shelter) => (
            <Link
              key={shelter.id}
              href={`/shelter/${shelter.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {shelter.name}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    <span>{shelter.address}, {shelter.city}</span>
                  </div>
                  {shelter.phone && (
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-green-600" />
                      <span>{shelter.phone}</span>
                    </div>
                  )}
                  {shelter.email && (
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-green-600" />
                      <span className="truncate">{shelter.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Pagination */}
        <div className="mt-6 flex justify-center md:hidden">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
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
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
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
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Shelter Network Overview
          </h2>
          <ShelterStatistics />
        </div>
      </section>
    </main>
  );
}

