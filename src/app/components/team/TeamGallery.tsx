'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './TeamGallery.module.css';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryMedia {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption: string;
  poster?: string;
}


export default function TeamGallery() {
  const [galleryMedia, setGalleryMedia] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchGalleryMedia = async () => {
      try {
        const response = await fetch('/api/public/gallery');
        if (!response.ok) {
          throw new Error('Failed to fetch gallery media');
        }
        const data = await response.json();
        setGalleryMedia(data.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryMedia();
  }, []); 

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (galleryMedia.length === 0) {
    return null;
  }

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev || 0) + 1 % galleryMedia.length);
      setSelectedMedia(galleryMedia[(selectedIndex + 1) % galleryMedia.length]);
    }
  };
  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => ((prev || 0) - 1 + galleryMedia.length) % galleryMedia.length);
      setSelectedMedia(galleryMedia[(selectedIndex - 1 + galleryMedia.length) % galleryMedia.length]);
    }
  };

  return (
    <>
      {/* Gallery Section with Masonry Grid */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">Life at Shoolin Consultancy</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Experience the professional and collaborative environment that defines our legal practice
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
              {galleryMedia.map((media, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300
                    ${index === 0 || index === 3 || index === 8 ? 'md:col-span-2 md:row-span-2' : ''}
                    ${index === 4 ? 'md:col-span-2' : ''}
                  `}
                  onClick={() => {
                    setSelectedIndex(index);
                    setSelectedMedia(galleryMedia[index]);
                  }}
                >
                  {media.type === 'image' ? (
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full">
                      <video
                        className="w-full h-full object-cover"
                        poster={media.poster}
                        playsInline
                        muted
                        loop
                        onMouseOver={(e) => e.currentTarget.play()}
                        onMouseOut={(e) => e.currentTarget.pause()}
                      >
                        <source src={media.src} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-semibold text-lg mb-2">{media.alt}</h3>
                      <p className="text-gold-200 text-sm">{media.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Media Modal with Carousel */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedMedia(null)}
          >
            <div className="relative max-w-7xl w-full">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative"
              >
                {selectedMedia.type === 'image' ? (
                  <Image
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    width={1920}
                    height={1080}
                    className="object-contain rounded-lg"
                    priority
                  />
                ) : (
                  <video
                    className="w-full rounded-lg"
                    controls
                    autoPlay
                    poster={selectedMedia.poster}
                  >
                    <source src={selectedMedia.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMedia(null);
                    }}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
                  </button>
                </div>
                <div className="absolute left-0 right-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <h3 className="text-white font-semibold text-xl mb-2">{selectedMedia.alt}</h3>
                  <p className="text-gold-200">{selectedMedia.caption}</p>
                </div>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-white text-xl" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-white text-xl" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
