'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/app/components/layout/AdminLayout';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MediaHead from '@/app/admin/components/MediaHead';

interface Media {
  id: number;
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
  title: string | null;
  description: string | null;
  altText: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function EditMediaPage({ params }: { params: { id: string } }) {
  const [media, setMedia] = useState<Media | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const router = useRouter();
  const id = parseInt(params.id);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/media/${id}`, {
          cache: 'no-store',
          next: { revalidate: 0 }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch media');
        }

        const data = await response.json();
        setMedia(data);
        setTitle(data.title || '');
        setDescription(data.description || '');
        setAltText(data.altText || '');
      } catch (err) {
        console.error('Error fetching media:', err);
        setError('Failed to load media');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMedia();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      
      const response = await fetch(`/api/media/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          altText,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update media');
      }
      
      router.push('/admin/media');
      
    } catch (err) {
      console.error('Error updating media:', err);
      setError(err instanceof Error ? err.message : 'Failed to update media');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/media');
  };

  const copyToClipboard = () => {
    if (media) {
      navigator.clipboard.writeText(`${window.location.origin}${media.filepath}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    else return (bytes / 1073741824).toFixed(1) + ' GB';
  };

  const isImageFile = (mimetype: string) => {
    return mimetype && mimetype.startsWith('image/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !media) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'Failed to load media'}
          </div>
          <button
            onClick={() => router.push('/admin/media')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Media
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <MediaHead />
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Edit Media</h1>
          <p className="text-gray-500 mt-1">
            Update information for this media file
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="h-[250px] bg-gray-100 relative">
                {isImageFile(media.mimetype) ? (
                  <Image 
                    src={media.filepath}
                    alt={media.altText || media.title || media.filename}
                    className="object-contain"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <div className="flex flex-col items-center p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="mt-2 text-sm text-gray-500 truncate max-w-full">
                        {media.mimetype.split('/')[1].toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase">Filename</h3>
                  <p className="text-sm">{media.filename}</p>
                </div>
                
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase">Type</h3>
                  <p className="text-sm">{media.mimetype}</p>
                </div>
                
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase">Size</h3>
                  <p className="text-sm">{formatFileSize(media.size)}</p>
                </div>
                
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase">Uploaded</h3>
                  <p className="text-sm">{formatDate(media.createdAt)}</p>
                </div>
                
                <button
                  onClick={copyToClipboard}
                  className="w-full px-3 py-2 mt-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center justify-center transition-colors"
                >
                  {copied ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      URL Copied!
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Public URL
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <label htmlFor="altText" className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Text {isImageFile(media.mimetype) && '(for accessibility)'}
                </label>
                <input
                  type="text"
                  id="altText"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {isImageFile(media.mimetype) && (
                  <p className="mt-1 text-xs text-gray-500">
                    Describe the image for accessibility and SEO purposes
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={saving}
                >
                  {saving ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
