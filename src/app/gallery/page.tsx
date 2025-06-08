'use client';

import { useEffect, useState } from 'react';
import styles from './gallery.module.css';

interface GalleryMedia {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption: string;
  poster?: string;
}

export default function GalleryPage() {
  const [mediaItems, setMediaItems] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryMedia | null>(null);

  useEffect(() => {
    fetchGalleryMedia();
  }, []);

  const fetchGalleryMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/public/gallery?limit=100');
      const data = await response.json();

      if (data.success) {
        setMediaItems(data.data);
      } else {
        setError('Failed to load gallery media');
      }
    } catch (err) {
      setError('An error occurred while fetching the gallery');
      console.error('Gallery fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = activeFilter === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.type === activeFilter);

  const openLightbox = (item: GalleryMedia) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Gallery</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our collection of images and videos showcasing our work and events.
        </p>
        
        {/* Filter tabs */}
        <div className="flex justify-center mt-8 mb-8">
          <div className={styles.filterTabs}>
            <button 
              className={`${styles.filterTab} ${activeFilter === 'all' ? styles.active : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`${styles.filterTab} ${activeFilter === 'image' ? styles.active : ''}`}
              onClick={() => setActiveFilter('image')}
            >
              Images
            </button>
            <button 
              className={`${styles.filterTab} ${activeFilter === 'video' ? styles.active : ''}`}
              onClick={() => setActiveFilter('video')}
            >
              Videos
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className={styles.spinner}></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4">
          <p>{error}</p>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No media items found.</p>
        </div>
      ) : (
        <div className={styles.galleryGrid}>
          {filteredMedia.map((item) => (
            <div 
              key={item.id} 
              className={styles.galleryItem}
              onClick={() => openLightbox(item)}
            >
              {item.type === 'image' ? (
                <div className={styles.imageContainer}>
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className={styles.mediaItem} 
                  />
                  <div className={styles.caption}>
                    <p>{item.caption}</p>
                  </div>
                </div>
              ) : (
                <div className={styles.videoContainer}>
                  <div className={styles.videoOverlay}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.playIcon}>
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <img 
                    src={item.poster || item.src} 
                    alt={item.alt} 
                    className={styles.mediaItem} 
                  />
                  <div className={styles.caption}>
                    <p>{item.caption}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedItem && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeLightbox}>
              &times;
            </button>
            
            {selectedItem.type === 'image' ? (
              <img 
                src={selectedItem.src} 
                alt={selectedItem.alt} 
                className={styles.lightboxMedia} 
              />
            ) : (
              <video 
                src={selectedItem.src}
                poster={selectedItem.poster}
                controls
                autoPlay
                className={styles.lightboxMedia}
              >
                Your browser does not support the video tag.
              </video>
            )}
            
            <div className={styles.lightboxCaption}>
              <p>{selectedItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
