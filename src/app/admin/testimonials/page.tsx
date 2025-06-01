'use client';

import React, { useEffect, useState } from 'react';
import { TestimonialEntity } from '@/entities/testimonials.entities';
import AdminLayout from '../adminLayout';
import TestimonialForm from './components/TestimonialForm';

export default function TestimonialsManagementPage() {
  // State management
  const [testimonials, setTestimonials] = useState<TestimonialEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Modal and form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<TestimonialEntity>>({});

  // Load testimonials and categories on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Fetch testimonials with optional category filter
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const url = selectedCategory
        ? `/api/admin/testimonials?category=${encodeURIComponent(selectedCategory)}`
        : '/api/admin/testimonials';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }

      const data = await response.json();
      setTestimonials(data.data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle category filter change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    // Re-fetch testimonials when category changes
    fetchTestimonials();
  };

  // Open the create testimonial modal
  const handleCreateNew = () => {
    setCurrentTestimonial({
      name: '',
      position: '',
      text: '',
      category: selectedCategory || '',
      rating: 5,
      isActive: true
    });
    setFormMode('create');
    setIsModalOpen(true);
  };

  // Open the edit testimonial modal
  const handleEdit = (testimonial: TestimonialEntity) => {
    setCurrentTestimonial({ ...testimonial });
    setFormMode('edit');
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle form submission from the TestimonialForm component
  const handleFormSubmit = async (testimonialData: Partial<TestimonialEntity>) => {
    try {
      const url = formMode === 'create'
        ? '/api/admin/testimonials'
        : `/api/admin/testimonials/${testimonialData.id}`;

      const method = formMode === 'create' ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save testimonial');
      }

      // Refresh testimonials list
      await fetchTestimonials();

      // Close modal
      setIsModalOpen(false);

    } catch (err) {
      // Re-throw so the form can handle the error
      throw err;
    }
  };

  // Handle testimonial deletion
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete testimonial');
      }

      // Refresh testimonials list
      await fetchTestimonials();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete testimonial');
    }
  };

  // Handle toggling testimonial active state
  const handleToggleActive = async (testimonial: TestimonialEntity) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !testimonial.isActive
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update testimonial status');
      }

      // Refresh testimonials list
      await fetchTestimonials();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update testimonial status');
    }
  };

  // Loading state
  if (loading && testimonials.length === 0) {
    return (
      <AdminLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Testimonials Management</h1>
          <div className="text-center py-10">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Testimonials Management</h1>
          <button
            onClick={handleCreateNew}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add New Testimonial
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryFilter">
            Filter by Category:
          </label>
          <div className="flex">
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <button
              onClick={fetchTestimonials}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            >
              Refresh
            </button>
          </div>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded">
            No testimonials found. Add your first testimonial!
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name & Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testimonials.map(testimonial => (
                    <tr key={testimonial.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {testimonial.avatar && (
                            <div className="flex-shrink-0 h-10 w-10 mr-4">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={testimonial.avatar}
                                alt={testimonial.name}
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{testimonial.name}</div>
                            <div className="text-sm text-gray-500">{testimonial.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {testimonial.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${testimonial.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                        >
                          {testimonial.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {testimonial.displayOrder}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleToggleActive(testimonial)}
                          className={`mr-3 ${testimonial.isActive ? 'text-yellow-600' : 'text-green-600'}`}
                        >
                          {testimonial.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => testimonial.id && handleDelete(testimonial.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {/* Use the extracted TestimonialForm component */}
        {isModalOpen && (
          <TestimonialForm
            testimonial={currentTestimonial}
            formMode={formMode}
            onClose={handleCloseModal}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </AdminLayout>
  );
}
