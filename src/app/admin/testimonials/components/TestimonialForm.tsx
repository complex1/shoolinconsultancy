'use client';

import React, { useState } from 'react';
import { TestimonialEntity } from '@/entities/testimonials.entities';

interface TestimonialFormProps {
  testimonial: Partial<TestimonialEntity>;
  formMode: 'create' | 'edit';
  onClose: () => void;
  onSubmit: (testimonialData: Partial<TestimonialEntity>) => Promise<void>;
}

const categories = [
  'All',
  'Corporate Law',
  'Real Estate',
  'IP Law',
  'Tax Advisory',
  'Employment Law',
  'International Trade'
];

const platforms = [
  'LinkedIn',
  'Google',
  'Trustpilot',
  'Chambers',
  'Legal500'
];

export default function TestimonialForm({
  testimonial,
  formMode,
  onClose,
  onSubmit
}: TestimonialFormProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<TestimonialEntity>>(testimonial);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCurrentTestimonial(prev => ({
        ...prev,
        [name]: checked
      }));
      return;
    }

    // Handle number inputs
    if (type === 'number') {
      setCurrentTestimonial(prev => ({
        ...prev,
        [name]: parseInt(value, 10)
      }));
      return;
    }

    // Handle text inputs
    setCurrentTestimonial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!currentTestimonial.name || !currentTestimonial.position || !currentTestimonial.text || !currentTestimonial.category) {
        setFormError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Submit form data to parent component
      await onSubmit(currentTestimonial);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {formMode === 'create' ? 'Add New Testimonial' : 'Edit Testimonial'}
            </h3>
            <button
              onClick={onClose}
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

        <form onSubmit={handleSubmit} className="p-6">
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {formError}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              value={currentTestimonial.name || ''}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
              Position <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="position"
              name="position"
              type="text"
              value={currentTestimonial.position || ''}
              onChange={handleInputChange}
              placeholder="CEO, Company Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
              Testimonial Text <span className="text-red-500">*</span>
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="text"
              name="text"
              rows={4}
              value={currentTestimonial.text || ''}
              onChange={handleInputChange}
              placeholder="Write the testimonial here..."
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="mb-4 md:mb-0 md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                name="category"
                value={currentTestimonial.category || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 md:mb-0 md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="platform">
                Platform
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="platform"
                name="platform"
                value={currentTestimonial.platform || ''}
                onChange={handleInputChange}
              >
                <option value="">Select a platform</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
          </div>


          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="mb-4 md:mb-0 md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
                Avatar URL
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="avatar"
                name="avatar"
                type="text"
                value={currentTestimonial.avatar || ''}
                onChange={handleInputChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div className="mb-4 md:mb-0 md:w-1/4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                Rating (1-5)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                value={currentTestimonial.rating || 5}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 md:mb-0 md:w-1/4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayOrder">
                Display Order
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="displayOrder"
                name="displayOrder"
                type="number"
                min="0"
                value={currentTestimonial.displayOrder || 0}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={currentTestimonial.isActive}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-gray-700 text-sm font-bold">Active</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isSubmitting ? 'Saving...' : (formMode === 'create' ? 'Create' : 'Update')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
