'use client';

import { Heart, PawPrint } from 'lucide-react';
import Link from 'next/link';

export default function AwarenessBanner() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center md:justify-start">
              <Heart className="mr-2" /> Make a Difference Today
            </h2>
            <p className="text-lg mb-6 text-green-50">
              Every pet deserves a loving home. Join our mission to support animal shelters 
              and help pets find their forever families.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/adopt"
                className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center"
              >
                <PawPrint className="mr-2" /> Adopt a Pet
              </Link>
              <Link
                href="/volunteer"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition-colors inline-flex items-center justify-center"
              >
                Volunteer Now
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative w-64 h-64">
              {/* Add an illustration or image here */}
              <div className="absolute inset-0 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                <PawPrint size={80} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 