'use client';

import React, { useEffect, useState } from 'react';
import { EnquiryEntity } from '@/entities/enquiry.entities';
import AdminLayout from '../adminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faCheckCircle,
  faTimesCircle,
  faSort,
  faEye,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';

// Define pagination metadata interface
interface PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export default function EnquiriesManagementPage() {
  // State management
  const [enquiries, setEnquiries] = useState<EnquiryEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryEntity | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Pagination state
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 1
  });

  // Load enquiries on component mount and when pagination or filters change
  useEffect(() => {
    fetchEnquiries();
  }, [paginationMeta.page, paginationMeta.limit, filterStatus]);

  // Fetch enquiries with pagination and filters
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: paginationMeta.page.toString(),
        limit: paginationMeta.limit.toString()
      });
      
      // Add status filter if not "all"
      if (filterStatus !== 'all') {
        params.append('status', filterStatus);
      }
      
      const response = await fetch(`/api/admin/enquiry?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch enquiries');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setEnquiries(data.data || []);
        setPaginationMeta(prev => ({
          ...prev,
          totalCount: data.meta?.totalCount || 0,
          totalPages: data.meta?.totalPages || 1
        }));
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch enquiries');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // View enquiry details
  const handleViewDetails = (enquiry: EnquiryEntity) => {
    setSelectedEnquiry(enquiry);
    setIsDetailModalOpen(true);
  };

  // Close detail modal
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  // Update enquiry status
  const handleUpdateStatus = async (enquiryId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/enquiry/${enquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update enquiry status');
      }
      
      // Refresh enquiries list
      await fetchEnquiries();
      
      // If updating the currently selected enquiry, refresh the selected enquiry data
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        const updatedData = await response.json();
        setSelectedEnquiry(updatedData.data);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  // Mark enquiry as resolved/unresolved
  const handleToggleResolved = async (enquiryId: number, isResolved: boolean) => {
    try {
      const response = await fetch(`/api/admin/enquiry/${enquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isResolved }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update resolution status');
      }
      
      // Refresh enquiries list
      await fetchEnquiries();
      
      // If updating the currently selected enquiry, refresh the selected enquiry data
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        const updatedData = await response.json();
        setSelectedEnquiry(updatedData.data);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update resolution status');
    }
  };

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    setPaginationMeta(prev => ({
      ...prev,
      page: Math.max(1, Math.min(page, prev.totalPages))
    }));
  };

  // Handle status filter change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    setPaginationMeta(prev => ({
      ...prev,
      page: 1 // Reset to first page when changing filters
    }));
  };

  // Get status badge styling based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Enquiry detail modal component
  const EnquiryDetailModal = () => {
    if (!isDetailModalOpen || !selectedEnquiry) return null;
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Enquiry Details
              </h3>
              <button
                onClick={handleCloseDetailModal}
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
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{selectedEnquiry.name}</h4>
                  <p className="text-gray-600 mb-4">
                    Submitted on {formatDate(selectedEnquiry.createdAt.toString())}
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex space-x-2">
                    <select
                      value={selectedEnquiry.status}
                      onChange={(e) => handleUpdateStatus(selectedEnquiry.id, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    
                    <button
                      onClick={() => handleToggleResolved(selectedEnquiry.id, !selectedEnquiry.isResolved)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedEnquiry.isResolved
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {selectedEnquiry.isResolved ? 'Resolved' : 'Mark as Resolved'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-600 hover:text-blue-800">
                    {selectedEnquiry.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-blue-600 hover:text-blue-800">
                    {selectedEnquiry.phone}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-500 mb-2">Service Requested</h5>
              <div className="bg-gray-50 px-4 py-2 rounded">
                {selectedEnquiry.service || 'General Enquiry'}
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-500 mb-2">Message</h5>
              <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={handleCloseDetailModal}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Enquiries Management</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={handleStatusFilterChange}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <FontAwesomeIcon 
                icon={faFilter} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            
            <button
              onClick={() => fetchEnquiries()}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Refresh
            </button>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4">Loading enquiries...</p>
          </div>
        ) : (
          <>
            {enquiries.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <p className="text-lg text-gray-600 mb-2">No enquiries found</p>
                <p className="text-gray-500">
                  {filterStatus !== 'all' 
                    ? 'Try changing your filter to see more results.' 
                    : 'When users submit enquiries through your contact form, they will appear here.'}
                </p>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            Name & Contact
                            <FontAwesomeIcon icon={faSort} className="ml-1 text-gray-400" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {enquiries.map((enquiry) => (
                        <tr key={enquiry.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col">
                              <div className="text-sm font-medium text-gray-900">
                                {enquiry.name}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                <div className="flex items-center">
                                  <FontAwesomeIcon icon={faEnvelope} className="mr-1 text-xs" />
                                  <span className="truncate max-w-[150px]">{enquiry.email}</span>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                <div className="flex items-center">
                                  <FontAwesomeIcon icon={faPhone} className="mr-1 text-xs" />
                                  <span>{enquiry.phone}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {enquiry.service || 'General Enquiry'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 line-clamp-2">
                              {enquiry.message}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(enquiry.createdAt.toString())}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadge(enquiry.status)}`}>
                              {enquiry.status}
                            </span>
                            {enquiry.isResolved && (
                              <div className="mt-1 flex items-center justify-center text-xs text-green-600">
                                <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                                Resolved
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => handleViewDetails(enquiry)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                              title="View Details"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </button>
                            
                            <div className="relative inline-block text-left ml-2">
                              <div className="group">
                                <button 
                                  className="p-1 text-gray-500 hover:text-gray-700"
                                  title="More Actions"
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </button>
                                
                                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 border border-gray-200">
                                  <div className="py-1">
                                    <button 
                                      onClick={() => handleUpdateStatus(enquiry.id, 'contacted')} 
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      Mark as Contacted
                                    </button>
                                    <button 
                                      onClick={() => handleToggleResolved(enquiry.id, !enquiry.isResolved)}
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      {enquiry.isResolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
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
              </div>
            )}
          </>
        )}
        
        {/* Enquiry Detail Modal */}
        <EnquiryDetailModal />
      </div>
    </AdminLayout>
  );
}
