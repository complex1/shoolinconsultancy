'use client';

import { useEffect } from 'react';

/**
 * MediaHead component to add necessary meta tags for media pages
 * This helps prevent browser timeouts during file uploads
 */
export function MediaHead() {
  useEffect(() => {
    // Set a long cache expiration time for media files
    const metaCacheControl = document.createElement('meta');
    metaCacheControl.httpEquiv = 'Cache-Control';
    metaCacheControl.content = 'public, max-age=31536000';
    document.head.appendChild(metaCacheControl);
    
    // Set CSP to allow media upload processing
    const metaCSP = document.createElement('meta');
    metaCSP.httpEquiv = 'Content-Security-Policy';
    metaCSP.content = "img-src 'self' blob: data:; media-src 'self' blob: data:";
    document.head.appendChild(metaCSP);
    
    return () => {
      // Clean up when component unmounts
      document.head.removeChild(metaCacheControl);
      document.head.removeChild(metaCSP);
    };
  }, []);
  
  return null;
}

export default MediaHead;
