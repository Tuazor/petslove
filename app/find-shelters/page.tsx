import React from 'react';
import Link from 'next/link';
import { MapPin, Search, Filter } from 'lucide-react';

export default function FindSheltersPage() {
  // Mock locations - in a real app, this would come from a backend
  const popularLocations = [
    { name: 'Austin, TX', shelterCount: 25 },
    { name: 'Los Angeles, CA', shelterCount: 40 },
    { name: 'New York, NY', shelterCount: 35 },
    { name: 'Chicago, IL', shelterCount: 30 },
    { name: 'Seattle, WA', shelterCount: 20 },
    { name: 'Miami, FL', shelterCount: 22 },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Find Animal Shelters Near You</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover compassionate shelters dedicated to rescuing and rehoming animals across North America.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden">
          <div className="pl-6">
            <MapPin className="text-gray-400" size={24} />
          </div>
          <input 
            type="text" 
            placeholder="Enter city, state, or zip code" 
            className="flex-grow px-4 py-3 outline-none"
          />
          <button className="bg-green-600 text-white px-6 py-3 flex items-center hover:bg-green-700 transition duration-300">
            <Search size={20} className="mr-2" />
            Search
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button className="flex items-center text-gray-600 hover:text-green-600">
            <Filter size={20} className="mr-2" />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Popular Locations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Popular Shelter Locations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {popularLocations.map((location) => (
            <Link 
              key={location.name} 
              href={`/shelters/${location.name.split(',')[1].trim().toLowerCase()}`}
              className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">
                <MapPin size={40} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
              <p className="text-gray-600">{location.shelterCount} Shelters</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-50 rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Can't Find Your Location?</h2>
        <p className="text-xl text-gray-600 mb-8">
          We're constantly expanding our network of animal shelters.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/contact" 
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition duration-300"
          >
            Contact Us
          </Link>
          <Link 
            href="/suggest-shelter" 
            className="bg-white border border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-50 transition duration-300"
          >
            Suggest a Shelter
          </Link>
        </div>
      </section>
    </div>
  );
} 