'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import sheltersData from '../../../app/data/shelters.json';
import { 
  MapPin, Phone, Mail, Globe, Clock, Info, Heart, Share2, 
  ExternalLink, Navigation, Sparkles, Calendar, Users, PawPrint,
  Clock3, AlertCircle, CheckCircle, Building, ImageOff
} from 'lucide-react';
import dynamic from 'next/dynamic';

const ShelterMap = dynamic(() => import('../../components/ShelterMap'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-200 animate-pulse rounded-lg"></div>
});

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

interface ShelterDetails {
  establishedYear: string;
  capacity: {
    dogs: number;
    cats: number;
    other: number;
  };
  adoptionRate: string;
  volunteerCount: number;
  operatingHours: {
    weekday: string;
    weekend: string;
  };
  services: string[];
  requirements: string[];
}

export default function ShelterDetailsPage({ params }: { params: { id: string } }) {
  const [shelterDescription, setShelterDescription] = useState<string>('');
  const [isLoadingDescription, setIsLoadingDescription] = useState(true);
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [shelterDetails, setShelterDetails] = useState<ShelterDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const shelter = sheltersData.find(s => s.id === params.id);

  useEffect(() => {
    if (shelter) {
      fetchShelterDescription();
      fetchShelterImages();
      fetchShelterDetails();
    }
  }, [shelter]);

  const fetchShelterImages = async () => {
    try {
      const searchTerms = [
        'animal shelter interior',
        'pet shelter facility',
        shelter?.name,
        `${shelter?.city} animal shelter`
      ].filter(Boolean).join(' ');

      const response = await fetch(`/api/unsplash?query=${encodeURIComponent(searchTerms)}`);
      const data = await response.json();
      setImages(data.results || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoadingImages(false);
    }
  };

  const fetchShelterDescription = async () => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shelterInfo: {
            name: shelter?.name,
            city: shelter?.city,
            state: shelter?.state,
          }
        }),
      });

      const data = await response.json();
      if (data.description) {
        localStorage.setItem(`shelter_description_${shelter!.id}`, data.description);
        setShelterDescription(data.description);
      }
    } catch (error) {
      console.error('Error fetching shelter description:', error);
    } finally {
      setIsLoadingDescription(false);
    }
  };

  const fetchShelterDetails = async () => {
    try {
      const response = await fetch(`/api/shelter-details?id=${shelter?.id}`);
      const data = await response.json();
      setShelterDetails(data);
    } catch (error) {
      console.error('Error fetching shelter details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  if (!shelter) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Shelter Not Found</h1>
        <Link href="/search" className="text-green-600 hover:underline">
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{shelter.name}</h1>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{shelter.city}, {shelter.state}</span>
          </div>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={() => window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${shelter.latitude},${shelter.longitude}`,
              '_blank'
            )}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Get Directions
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        {isLoadingImages ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.slice(0, 3).map((image) => (
              <div key={image.id} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={image.urls.regular}
                  alt={image.alt_description || 'Shelter image'}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <ImageOff className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No images available</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* AI Description */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 mr-2 text-green-600" />
              <h2 className="text-xl font-semibold">About This Shelter</h2>
            </div>
            {isLoadingDescription ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ) : (
              <p className="text-gray-600">{shelterDescription}</p>
            )}
          </div>

          {/* Quick Overview */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Overview</h2>
            {isLoadingDetails ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Established</p>
                    <p className="font-semibold">{shelterDetails?.establishedYear || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Volunteers</p>
                    <p className="font-semibold">{shelterDetails?.volunteerCount || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <PawPrint className="w-5 h-5 mr-2 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Adoption Rate</p>
                    <p className="font-semibold">{shelterDetails?.adoptionRate || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-semibold">
                      {shelterDetails ? 
                        `${shelterDetails.capacity.dogs + shelterDetails.capacity.cats} pets` : 
                        'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Operating Hours */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Clock3 className="w-5 h-5 mr-2 text-green-600" />
              <h2 className="text-xl font-semibold">Operating Hours</h2>
            </div>
            {isLoadingDetails ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Weekdays</span>
                  <span className="font-semibold">{shelterDetails?.operatingHours.weekday || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Weekends</span>
                  <span className="font-semibold">{shelterDetails?.operatingHours.weekend || 'N/A'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-green-600" />
                <span>{shelter.address}, {shelter.city}, {shelter.state} {shelter.zip}</span>
              </div>
              {shelter.phone && (
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-green-600" />
                  <a href={`tel:${shelter.phone}`} className="hover:text-green-600 transition">
                    {shelter.phone}
                  </a>
                </div>
              )}
              {shelter.email && (
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-green-600" />
                  <a href={`mailto:${shelter.email}`} className="hover:text-green-600 transition">
                    {shelter.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Map */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="h-[400px]">
              <ShelterMap 
                shelters={[shelter]} 
                center={[shelter.latitude, shelter.longitude]}
                zoom={13}
              />
            </div>
          </div>

          {/* Services Offered */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
            {isLoadingDetails ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {(shelterDetails?.services || ['Pet Adoption']).map((service, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-gray-600">{service}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Adoption Requirements */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Adoption Requirements</h2>
            {isLoadingDetails ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {(shelterDetails?.requirements || ['Valid ID Required']).map((requirement, index) => (
                  <div key={index} className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-gray-600">{requirement}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
