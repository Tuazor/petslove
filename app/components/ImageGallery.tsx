'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageData {
  id: string;
  url: string;
  thumb: string;
  alt: string;
  credit: {
    name: string;
    link: string;
  };
}

interface ImageGalleryProps {
  query?: string;
  count?: number;
  shelterName?: string;
  shelterCity?: string;
  animalTypes?: string[];
}

export default function ImageGallery({ 
  query,
  count = 3,
  shelterName,
  shelterCity,
  animalTypes = []
}: ImageGalleryProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const searchQuery = query || [
          shelterName,
          shelterCity,
          ...animalTypes,
          'animal shelter'
        ]
          .filter(Boolean)
          .join(' ');

        // Create a cache key based on the search parameters
        const cacheKey = `shelter_images_${searchQuery}_${count}`;
        
        // Try to get cached images first
        const cachedImages = localStorage.getItem(cacheKey);
        if (cachedImages) {
          setImages(JSON.parse(cachedImages));
          setLoading(false);
          return;
        }

        // If no cache, fetch from API
        const response = await fetch(`/api/images?query=${encodeURIComponent(searchQuery)}&count=${count}`);
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        
        // Cache the results
        localStorage.setItem(cacheKey, JSON.stringify(data));
        setImages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, count, shelterName, shelterCity, animalTypes]);

  // Add cache cleanup to prevent localStorage from getting too full
  useEffect(() => {
    const cleanupCache = () => {
      const maxCacheAge = 24 * 60 * 60 * 1000; // 24 hours
      const cachePrefix = 'shelter_images_';
      
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(cachePrefix)) {
          try {
            const item = localStorage.getItem(key);
            if (item) {
              const data = JSON.parse(item);
              if (Date.now() - data.timestamp > maxCacheAge) {
                localStorage.removeItem(key);
              }
            }
          } catch (error) {
            console.error('Cache cleanup error:', error);
            localStorage.removeItem(key);
          }
        }
      });
    };

    cleanupCache();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="aspect-video bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <Image
            src={image.url}
            alt={image.alt}
            width={400}
            height={300}
            className="rounded-lg object-cover w-full aspect-video"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Photo by{' '}
            <a
              href={image.credit.link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {image.credit.name}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
} 