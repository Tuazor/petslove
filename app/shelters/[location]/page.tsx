'use client';
import React, { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import type { Shelter } from '../../../types/shelter';

export default function ShelterCategoryPage({ params }: { params: { location: string } }) {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('/api/shelters')
      .then(res => res.json())
      .then(data => {
        setShelters(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching shelters:', error);
        setLoading(false);
      });
  }, []);

  // Filter shelters by location (state)
  const allShelters = shelters.filter(
    shelter => shelter.state.toLowerCase() === params.location.toLowerCase()
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShelters = allShelters.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allShelters.length / itemsPerPage);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading shelters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Animal Shelters in {params.location.toUpperCase()}
      </h1>
      
      {allShelters.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No shelters found in {params.location.toUpperCase()}.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentShelters.map((shelter) => (
              <Link 
                href={`/shelter/${shelter.id}`} 
                key={shelter.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">{shelter.name}</h2>
                  
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

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

