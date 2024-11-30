'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import sheltersData from '../../data/shelters.json';

export default function StateSheltersPage({ params }: { params: { location: string } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter shelters by location (state)
  const stateShelters = sheltersData.filter(
    shelter => shelter.state.toLowerCase() === params.location.toLowerCase()
  );

  const totalPages = Math.ceil(stateShelters.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShelters = stateShelters.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (stateShelters.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">No shelters found in {params.location}</h1>
        <Link href="/" className="text-green-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Animal Shelters in {params.location.toUpperCase()}
      </h1>

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

