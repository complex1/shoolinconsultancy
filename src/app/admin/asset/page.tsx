'use client';

import React, { useEffect, useState } from 'react';
import { AssetEntity } from '@/entities/assets.entity';
import AdminLayout from '../adminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrash,
  faSearch,
  faFilter,
  faLink,
  faChevronLeft,
  faChevronRight,
  faCopy,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import AssetUploadModal from './components/AssetUploadModal';

// Define pagination metadata interface
interface PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export default function AssetManagementPage() {
  // State management
  const [assets, setAssets] = useState<AssetEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSvg, setFilterSvg] = useState('all');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetEntity | null>(null);
  
  // Pagination state
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 1
  });

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Load assets on component mount and when filters or pagination change
  useEffect(() => {
    fetchAssets();
  }, [paginationMeta.page, filterType, filterSvg, searchTerm]);

  // Fetch assets with pagination and filters
  const fetchAssets = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: paginationMeta.page.toString(),
        limit: paginationMeta.limit.toString()
      });
      
      // Add filters if applicable
      if (filterType !== 'all') {
        params.append('type', filterType);
      }
      
      if (filterSvg !== 'all') {
        params.append('isSvg', filterSvg === 'svg' ? 'true' : 'false');
      }
      
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }
      
      const response = await fetch(`/api/admin/asset?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch assets');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setAssets(data.data || []);
        setPaginationMeta(prev => ({
          ...prev,
          totalCount: data.meta?.totalCount || 0,
          totalPages: data.meta?.totalPages || 1
        }));
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch assets');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle asset selection for bulk actions
  const handleAssetSelection = (id: string) => {
    setSelectedAssets(prev => {
      if (prev.includes(id)) {
        return prev.filter(assetId => assetId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle select all assets
  const handleSelectAll = () => {
    if (selectedAssets.length === assets.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(assets.map(asset => asset.id));
    }
  };

  // Handle delete selected assets
  const handleDeleteSelected = async () => {
    if (selectedAssets.length === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedAssets.length} selected assets?`)) {
      return;
    }
    
    try {
      const response = await fetch('/api/admin/asset', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedAssets }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete assets');
      }
      
      // Refresh assets list
      await fetchAssets();
      
      // Clear selection
      setSelectedAssets([]);
      
      // Show success toast
      setToast({
        message: `Successfully deleted ${selectedAssets.length} assets`,
        type: 'success'
      });
      
      // Auto-dismiss the toast after 3 seconds
      setTimeout(() => {
        setToast(null);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete assets');
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    // Reset to first page when changing filters
    setPaginationMeta(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterSvgChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterSvg(e.target.value);
    // Reset to first page when changing filters
    setPaginationMeta(prev => ({ ...prev, page: 1 }));
  };

  // Handle page change for pagination
  const handlePageChange = (newPage: number) => {
    setPaginationMeta(prev => ({
      ...prev,
      page: Math.max(1, Math.min(newPage, prev.totalPages))
    }));
  };

  // Format file size for display
  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle opening asset details modal
  const handleViewAssetDetails = (asset: AssetEntity) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  // Handle copy asset URL to clipboard
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setToast({ message: 'URL copied to clipboard', type: 'success' });
    
    // Auto-dismiss the toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Handle copy SVG code to clipboard
  const handleCopySvgCode = (code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setToast({ message: 'SVG code copied to clipboard', type: 'success' });
    
    // Auto-dismiss the toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Asset details modal component
  const AssetDetailsModal = () => {
    if (!isDetailsModalOpen || !selectedAsset) return null;
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Asset Details
              </h3>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Preview */}
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-center bg-gray-50 min-h-[300px]">
                {selectedAsset.isSvg ? (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: selectedAsset.svgCode || '' }}
                  />
                ) : (
                  <div className="relative w-full h-[300px]">
                    <Image
                      src={selectedAsset.url.startsWith('http') ? selectedAsset.url : `${process.env.NEXT_PUBLIC_BASE_URL || ''}${selectedAsset.url}`}
                      alt={selectedAsset.alt || selectedAsset.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
              
              {/* Details */}
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{selectedAsset.name}</h3>
                  <p className="text-gray-500">{selectedAsset.alt}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{selectedAsset.type || (selectedAsset.isSvg ? 'SVG Image' : 'Image')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-medium">{formatFileSize(selectedAsset.size)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium">{new Date(selectedAsset.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID</p>
                    <p className="font-medium truncate">{selectedAsset.id}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Asset URL
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        readOnly
                        className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight bg-gray-50"
                        value={selectedAsset.url.startsWith('http') 
                          ? selectedAsset.url 
                          : `${process.env.NEXT_PUBLIC_BASE_URL || ''}${selectedAsset.url}`}
                      />
                      <button
                        onClick={() => handleCopyUrl(selectedAsset.url.startsWith('http') 
                          ? selectedAsset.url 
                          : `${process.env.NEXT_PUBLIC_BASE_URL || ''}${selectedAsset.url}`)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-r"
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                    </div>
                  </div>
                  
                  {selectedAsset.isSvg && selectedAsset.svgCode && (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        SVG Code
                      </label>
                      <div className="relative">
                        <textarea
                          readOnly
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-50 font-mono text-sm"
                          rows={5}
                          value={selectedAsset.svgCode}
                        />
                        <button
                          onClick={() => handleCopySvgCode(selectedAsset.svgCode)}
                          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-2 rounded"
                        >
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-between">
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete "${selectedAsset.name}"?`)) {
                  fetch('/api/admin/asset', {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ids: [selectedAsset.id] }),
                  })
                  .then(response => {
                    if (response.ok) {
                      setIsDetailsModalOpen(false);
                      fetchAssets();
                    }
                  });
                }
              }}
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Delete Asset
            </button>
            
            <button
              onClick={() => setIsDetailsModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Toast Notification Component
  const ToastNotification = () => {
    if (!toast) return null;
    
    const bgColor = toast.type === 'success' ? 'bg-green-500' : 
                    toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}>
          <span>{toast.message}</span>
          <button 
            onClick={() => setToast(null)} 
            className="ml-4 text-white hover:text-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Asset Management</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New Asset
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}
        
        {/* Filters and Search */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search assets..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full appearance-none"
              value={filterType}
              onChange={handleFilterTypeChange}
            >
              <option value="all">All Types</option>
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPEG</option>
              <option value="image/svg+xml">SVG</option>
              <option value="image/gif">GIF</option>
            </select>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full appearance-none"
              value={filterSvg}
              onChange={handleFilterSvgChange}
            >
              <option value="all">All Assets</option>
              <option value="svg">SVG Only</option>
              <option value="non-svg">Non-SVG</option>
            </select>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedAssets.length > 0 && (
          <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
            <div>
              <span className="font-medium">{selectedAssets.length}</span> assets selected
            </div>
            <button
              onClick={handleDeleteSelected}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete Selected
            </button>
          </div>
        )}
        
        {/* Assets Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4">Loading assets...</p>
          </div>
        ) : (
          <>
            {assets.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <p className="text-lg text-gray-600 mb-2">No assets found</p>
                <p className="text-gray-500 mb-4">
                  {searchTerm || filterType !== 'all' || filterSvg !== 'all'
                    ? 'Try changing your search or filters to see more results.'
                    : 'Upload your first asset to get started.'}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-flex items-center"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add New Asset
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 flex items-center">
                    <div className="w-8">
                      <input
                        type="checkbox"
                        checked={selectedAssets.length === assets.length && assets.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex-1 font-medium text-gray-700">Asset Name</div>
                    <div className="w-24 text-center text-sm font-medium text-gray-700">Type</div>
                    <div className="w-24 text-center text-sm font-medium text-gray-700">Size</div>
                    <div className="w-32 text-center text-sm font-medium text-gray-700">Date Added</div>
                    <div className="w-20 text-center text-sm font-medium text-gray-700">Actions</div>
                  </div>
                  
                  {assets.map(asset => (
                    <div key={asset.id} className="border-t border-gray-100 px-4 py-3 flex items-center hover:bg-gray-50">
                      <div className="w-8">
                        <input
                          type="checkbox"
                          checked={selectedAssets.includes(asset.id)}
                          onChange={() => handleAssetSelection(asset.id)}
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="flex-1 flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center mr-3">
                          {asset.isSvg && asset.svgCode ? (
                            <div dangerouslySetInnerHTML={{ __html: asset.svgCode }} />
                          ) : (
                            <img
                              src={asset.url.startsWith('http') ? asset.url : `${process.env.NEXT_PUBLIC_BASE_URL || ''}${asset.url}`}
                              alt={asset.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 truncate max-w-xs">{asset.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{asset.alt || asset.url}</div>
                        </div>
                      </div>
                      <div className="w-24 text-center text-sm text-gray-500">
                        {asset.isSvg ? 'SVG' : (asset.type?.split('/')[1] || 'Image')}
                      </div>
                      <div className="w-24 text-center text-sm text-gray-500">
                        {formatFileSize(asset.size)}
                      </div>
                      <div className="w-32 text-center text-sm text-gray-500">
                        {new Date(asset.createdAt).toLocaleDateString()}
                      </div>
                      <div className="w-20 text-right space-x-2">
                        <button
                          onClick={() => handleCopyUrl(asset.url.startsWith('http') ? asset.url : `${process.env.NEXT_PUBLIC_BASE_URL || ''}${asset.url}`)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Copy URL"
                        >
                          <FontAwesomeIcon icon={faLink} />
                        </button>
                        <button
                          onClick={() => handleViewAssetDetails(asset)}
                          className="text-gray-600 hover:text-gray-800"
                          title="View Details"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${asset.name}"?`)) {
                              fetch('/api/admin/asset', {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ ids: [asset.id] }),
                              })
                              .then(response => {
                                if (response.ok) {
                                  fetchAssets();
                                  setToast({ message: 'Asset deleted successfully', type: 'success' });
                                } else {
                                  setToast({ message: 'Failed to delete asset', type: 'error' });
                                }
                              });
                            }
                          }}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              
                {/* Pagination */}
                {paginationMeta.totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => handlePageChange(paginationMeta.page - 1)}
                        disabled={paginationMeta.page === 1}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md
                          ${paginationMeta.page === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(paginationMeta.page + 1)}
                        disabled={paginationMeta.page === paginationMeta.totalPages}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md
                          ${paginationMeta.page === paginationMeta.totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{((paginationMeta.page - 1) * paginationMeta.limit) + 1}</span> to{' '}
                          <span className="font-medium">
                            {Math.min(paginationMeta.page * paginationMeta.limit, paginationMeta.totalCount)}
                          </span> of{' '}
                          <span className="font-medium">{paginationMeta.totalCount}</span> assets
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => handlePageChange(paginationMeta.page - 1)}
                            disabled={paginationMeta.page === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium
                              ${paginationMeta.page === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                          >
                            <span className="sr-only">Previous</span>
                            <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
                          </button>
                          
                          {/* Page numbers */}
                          {Array.from({ length: paginationMeta.totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                ${page === paginationMeta.page
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                            >
                              {page}
                            </button>
                          ))}
                          
                          <button
                            onClick={() => handlePageChange(paginationMeta.page + 1)}
                            disabled={paginationMeta.page === paginationMeta.totalPages}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium
                              ${paginationMeta.page === paginationMeta.totalPages
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                          >
                            <span className="sr-only">Next</span>
                            <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
        
        {/* Modals */}
        <AssetUploadModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onUploadSuccess={fetchAssets} 
          setToast={setToast}
        />
        <AssetDetailsModal />
        
        {/* Toast Notification */}
        <ToastNotification />
      </div>
    </AdminLayout>
  );
}
