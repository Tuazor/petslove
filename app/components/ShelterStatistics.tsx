'use client';

import React, { useMemo } from 'react';
import { Globe, MapPin, Building2 } from 'lucide-react';
import type { Shelter } from '../../types/shelter';
import sheltersData from '../data/shelters.json';

const ShelterStatistics = () => {
  const statistics = useMemo(() => {
    // Get unique states
    const states = [...new Set(sheltersData.map(shelter => shelter.state))];
    
    // Calculate state counts
    const stateCounts = states.map(state => ({
      state,
      count: sheltersData.filter(shelter => shelter.state === state).length
    }));

    // Sort states by count in descending order
    const sortedStates = stateCounts.sort((a, b) => b.count - a.count);

    return {
      totalShelters: sheltersData.length,
      totalStates: states.length,
      topStates: sortedStates.slice(0, 5) // Get top 5 states
    };
  }, []);

  return (
    <div className="bg-green-50 rounded-lg p-8 grid md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg p-6 text-center shadow-md">
        <Globe size={48} className="mx-auto mb-4 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-800">
          {statistics.totalShelters.toLocaleString()}
        </h3>
        <p className="text-gray-600">Total Shelters</p>
      </div>
      
      <div className="bg-white rounded-lg p-6 text-center shadow-md">
        <MapPin size={48} className="mx-auto mb-4 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-800">
          {statistics.totalStates.toLocaleString()}
        </h3>
        <p className="text-gray-600">States Covered</p>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-md">
        <Building2 size={48} className="mx-auto mb-4 text-green-600" />
        <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
          Top States
        </h3>
        <ul className="space-y-2">
          {statistics.topStates.map((stateData) => (
            <li key={stateData.state} className="flex justify-between items-center py-1 px-2 rounded hover:bg-gray-50">
              <span className="font-medium">{stateData.state}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                {stateData.count.toLocaleString()} shelters
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShelterStatistics; 