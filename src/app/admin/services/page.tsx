'use client';

import React, { useEffect, useState } from 'react';
import { ServiceEntity } from '@/entities/services.entities';
import AdminLayout from '../adminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faPlus, 
  faStar, 
  faCheck, 
  faTimes,
  faChevronLeft,
  faChevronRight,
  faSort
} from '@fortawesome/free-solid-svg-icons';
import ServiceFormModal from './components/ServiceFormModal';

// Define pagination metadata interface
interface PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export default function ServicesManagementPage() {
  // State management
  const [services, setServices] = useState<ServiceEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal and form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [currentService, setCurrentService] = useState<Partial<ServiceEntity>>({});
  
  // Pagination state
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 1
  });

  // Load services on component mount and when pagination changes
  useEffect(() => {
    fetchServices();
  }, [paginationMeta.page, paginationMeta.limit]);

  // Fetch services with pagination
  const fetchServices = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: paginationMeta.page.toString(),
        limit: paginationMeta.limit.toString()
      });
      
      const response = await fetch(`/api/admin/services?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data || []);
        setPaginationMeta(prev => ({
          ...prev,
          totalCount: data.meta.totalCount || 0,
          totalPages: data.meta.totalPages || 1
        }));
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch services');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Open create service modal
  const handleCreateNew = () => {
    setCurrentService({
      title: '',
      description: '',
      longDescription: '',
      iconUrl: '',
      slug: '',
      featured: false,
      displayOrder: 0,
      isActive: true
    });
    setFormMode('create');
    setIsModalOpen(true);
  };

  // Open edit service modal
  const handleEdit = (service: ServiceEntity) => {
    setCurrentService({ ...service });
    setFormMode('edit');
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle form submission from the ServiceFormModal component
  const handleFormSubmit = async (serviceData: Partial<ServiceEntity>) => {
    try {
      const url = formMode === 'create' 
        ? '/api/admin/services' 
        : '/api/admin/services';
        
      const method = formMode === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save service');
      }
      
      // Refresh services list
      await fetchServices();
      
      // Close modal
      setIsModalOpen(false);
    } catch (err) {
      // Re-throw the error to be handled by the form component
      throw err;
    }
  };

  // Handle service deletion
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) {
      return;
    }
    
    try {
      const response = await fetch('/api/admin/services', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete service');
      }
      
      // Refresh services list
      await fetchServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete service');
    }
  };

  // Handle toggling service active state
  const handleToggleActive = async (service: ServiceEntity) => {
    try {
      const response = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...service,
          isActive: !service.isActive
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update service');
      }
      
      // Refresh services list
      await fetchServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update service');
    }
  };

  // Handle toggling featured status
  const handleToggleFeatured = async (service: ServiceEntity) => {
    try {
      const response = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...service,
          featured: !service.featured
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update service');
      }
      
      // Refresh services list
      await fetchServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update service');
    }
  };

  // Pagination controls
  const handlePageChange = (page: number) => {
    setPaginationMeta(prev => ({
      ...prev,
      page: Math.max(1, Math.min(page, prev.totalPages))
    }));
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Services Management</h1>
          <button 
            onClick={handleCreateNew}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New Service
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            <p className="mt-2">Loading services...</p>
          </div>
        ) : (
          <>
            {services.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded">
                <p className="text-lg text-gray-600 mb-4">No services found</p>
                <button 
                  onClick={handleCreateNew}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Create Your First Service
                </button>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            Service 
                            <FontAwesomeIcon icon={faSort} className="ml-1 text-gray-400" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Featured
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {services.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {service.iconUrl && (
                                  <img 
                                    src={service.iconUrl} 
                                    alt={service.title} 
                                    className="h-10 w-10 rounded-full object-cover bg-gray-100 p-1"
                                  />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{service.title}</div>
                                <div className="text-sm text-gray-500">{service.slug}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 line-clamp-2">
                              {service.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => handleToggleFeatured(service)}
                              className={`w-6 h-6 rounded-full flex items-center justify-center
                                ${service.featured 
                                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                              title={service.featured ? 'Featured' : 'Not Featured'}
                            >
                              <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => handleToggleActive(service)}
                              className={`px-3 py-1 rounded-full text-xs
                                ${service.isActive 
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                  : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                            >
                              <FontAwesomeIcon 
                                icon={service.isActive ? faCheck : faTimes} 
                                className="mr-1" 
                              />
                              {service.isActive ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {service.displayOrder}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEdit(service)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              <FontAwesomeIcon icon={faEdit} className="mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(service.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FontAwesomeIcon icon={faTrash} className="mr-1" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {paginationMeta.totalPages > 1 && (
                  <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
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
                          <span className="font-medium">{paginationMeta.totalCount}</span> results
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
                                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
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
              </div>
            )}
          </>
        )}
        
        {/* Use the extracted ServiceFormModal component */}
        {isModalOpen && (
          <ServiceFormModal
            service={currentService}
            formMode={formMode}
            onClose={handleCloseModal}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </AdminLayout>
  );
}
