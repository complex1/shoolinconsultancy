import React, { useState } from 'react';
import { ServiceEntity } from '@/entities/services.entities';

interface ServiceFormModalProps {
  service: Partial<ServiceEntity>;
  formMode: 'create' | 'edit';
  onClose: () => void;
  onSubmit: (serviceData: Partial<ServiceEntity>) => Promise<void>;
}

export default function ServiceFormModal({
  service,
  formMode,
  onClose,
  onSubmit
}: ServiceFormModalProps) {
  const [currentService, setCurrentService] = useState<Partial<ServiceEntity>>(service);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCurrentService(prev => ({
        ...prev,
        [name]: checked
      }));
      return;
    }

    // Handle number inputs
    if (type === 'number') {
      setCurrentService(prev => ({
        ...prev,
        [name]: parseInt(value, 10)
      }));
      return;
    }

    // Handle text inputs
    setCurrentService(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug when title changes if slug is empty
    if (name === 'title' && (!currentService.slug || currentService.slug === '')) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setCurrentService(prev => ({ ...prev, slug }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!currentService.title || !currentService.description) {
        setFormError('Please fill in all required fields (Title, Description, Icon URL)');
        setIsSubmitting(false);
        return;
      }

      // Submit form data to parent component
      await onSubmit(currentService);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {formMode === 'create' ? 'Create New Service' : 'Edit Service'}
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              value={currentService.title || ''}
              onChange={handleInputChange}
              placeholder="Service title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              rows={3}
              value={currentService.description || ''}
              onChange={handleInputChange}
              placeholder="Brief description of the service"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longDescription">
              Long Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="longDescription"
              name="longDescription"
              rows={8}
              value={currentService.longDescription || ''}
              onChange={handleInputChange}
              placeholder="Detailed description of the service"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="iconUrl">
              Icon URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="iconUrl"
              name="iconUrl"
              type="text"
              value={currentService.iconUrl || ''}
              onChange={handleInputChange}
              placeholder="https://example.com/icon.svg"
            />
          </div>

          <div className="flex gap-4 mb-4 align-items-center" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="mb-4 md:flex-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayOrder">
                Display Order
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="displayOrder"
                name="displayOrder"
                type="number"
                min="0"
                value={currentService.displayOrder || 0}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500 mt-1">
                Lower numbers appear first
              </p>
            </div>

            <div className="mb-4 md:flex-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={currentService.featured || false}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-gray-700">Featured Service</span>
              </label>
            </div>

            <div className="mb-4 md:flex-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={currentService.isActive !== false}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-gray-700">Active</span>
              </label>
            </div>
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
              {isSubmitting ? 'Saving...' : (formMode === 'create' ? 'Create Service' : 'Update Service')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
