'use client';

import { useEffect, useState } from 'react';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar' | 'inline';
  className?: string;
}

export default function AdBanner({ position, className = '' }: AdBannerProps) {
  const [isClient, setIsClient] = useState(false);
  const containerId = `ad-container-${position}`;

  useEffect(() => {
    setIsClient(true);
    
    // Create container div for the ad
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';
    
    // Add the Adsterra configuration script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.text = `
      atOptions = {
        'key' : '4e259cf268180e83111f4e227842d271',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    container.appendChild(configScript);

    // Add the Adsterra invoke script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.highperformanceformat.com/4e259cf268180e83111f4e227842d271/invoke.js';
    invokeScript.async = true;
    container.appendChild(invokeScript);

    return () => {
      // Cleanup
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [position, containerId]);

  if (!isClient) return null;

  const getAdStyle = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return 'max-w-[728px] h-[90px] mx-auto mb-6';
      case 'sidebar':
        return 'w-[300px] h-[600px]';
      case 'inline':
        return 'max-w-[728px] h-[90px] mx-auto my-6';
      default:
        return '';
    }
  };

  return (
    <div className={`${getAdStyle()} ${className}`}>
      <div id={containerId}></div>
    </div>
  );
} 