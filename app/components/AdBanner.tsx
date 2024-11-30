'use client';

import { useEffect, useState } from 'react';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar' | 'inline';
  className?: string;
}

export default function AdBanner({ position, className = '' }: AdBannerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Initialize Adsterra options
    if (typeof window !== 'undefined') {
      (window as any).atOptions = {
        'key': '4e259cf268180e83111f4e227842d271',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };
    }

    // Load Adsterra script
    const script = document.createElement('script');
    script.src = "//www.highperformanceformat.com/4e259cf268180e83111f4e227842d271/invoke.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  if (!isClient) return null;

  const getAdStyle = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return 'max-w-[728px] h-[90px] mx-auto';
      case 'sidebar':
        return 'w-[300px] h-[600px]';
      case 'inline':
        return 'max-w-[728px] h-[90px] mx-auto';
      default:
        return '';
    }
  };

  return (
    <div className={`${getAdStyle()} ${className}`}>
      {/* Container for Adsterra ad */}
      <div id={`ad-${position}`}></div>
    </div>
  );
} 