'use client';

import React, { useState, useEffect } from 'react';
import { BlogEntity, generateSlug, calculateReadTime } from '@/entities/blog.entity';
import { UserEntity } from '@/entities/user.entities';

interface BlogFormModalProps {
  blog: Partial<BlogEntity>;
  modalMode: 'create' | 'edit' | null;
  onClose: () => void;
  onSubmit: (blogData: Partial<BlogEntity>) => Promise<void>;
}

export default function BlogFormModal({
  blog,
  modalMode,
  onClose,
  onSubmit
}: BlogFormModalProps) {
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogEntity>>(blog);
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [authors, setAuthors] = useState<UserEntity[]>([]);
  const [loadingAuthors, setLoadingAuthors] = useState(false);

  // Load authors when the modal opens
  useEffect(() => {
    if (modalMode) {
      fetchAuthors();
    }
  }, [modalMode]);

  // Fetch authors from the API
  const fetchAuthors = async () => {
    try {
      setLoadingAuthors(true);
      const response = await fetch('/api/admin/user');

      if (!response.ok) {
        throw new Error('Failed to load authors');
      }

      const data = await response.json();
      setAuthors(data.data || []);
    } catch (error) {
      console.error('Error loading authors:', error);
      setFormError('Failed to load author list. Please try again.');
    } finally {
      setLoadingAuthors(false);
    }
  };

  if (!modalMode) return null;

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Special handling for author selection
    if (name === 'authorId') {
      const selectedAuthor = authors.find(author => author.id.toString() === value);

      if (selectedAuthor) {
        setCurrentBlog(prev => ({
          ...prev,
          author: selectedAuthor
        }));
      }
      return;
    }

    setCurrentBlog({ ...currentBlog, [name]: value });

    // Auto-generate slug when title changes if slug is empty or not edited
    if (name === 'title' && (!currentBlog.slug || currentBlog.slug === generateSlug(currentBlog.title || ''))) {
      setCurrentBlog(prev => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Validate and process field on blur
    switch (name) {
      case 'title':
        // Ensure title isn't empty
        if (!value.trim()) {
          setFormError('Title cannot be empty');
        } else {
          setFormError(null);
        }
        break;

      case 'slug':
        // Ensure slug is URL-friendly
        if (value.trim()) {
          const cleanSlug = generateSlug(value);
          if (cleanSlug !== value) {
            setCurrentBlog(prev => ({ ...prev, slug: cleanSlug }));
          }
        }
        break;

      case 'excerpt':
        // Trim extra whitespace
        if (value !== value.trim()) {
          setCurrentBlog(prev => ({ ...prev, excerpt: value.trim() }));
        }
        break;

      case 'content':
        // Update read time on content blur
        if (value) {
          const newReadTime = calculateReadTime(value);
          setCurrentBlog(prev => ({ ...prev, readTime: newReadTime }));
        }
        break;

      case 'coverImage':
        // Basic URL validation
        if (value && !value.match(/^https?:\/\/.+/i)) {
          setFormError('Cover image should be a valid URL starting with http:// or https://');
        } else {
          setFormError(null);
        }
        break;
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setCurrentBlog({ ...currentBlog, tags: tagsArray });
  };

  const handleTagsBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Format tags properly on blur
    const formattedTags = Array.isArray(currentBlog.tags) ?
      currentBlog.tags.map(tag => tag.toLowerCase()).filter((tag, index, self) =>
        self.indexOf(tag) === index // Remove duplicates
      ) : [];

    setCurrentBlog(prev => ({ ...prev, tags: formattedTags }));

    // Update the input field with formatted tags
    e.target.value = formattedTags.join(', ');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      // Validate required fields
      if (!currentBlog.author?.id) {
        throw new Error('Please select an author');
      }

      // Calculate read time if content is provided
      if (currentBlog.content) {
        currentBlog.readTime = calculateReadTime(currentBlog.content);
      }

      // Pass the data back to parent for submission
      await onSubmit(currentBlog);

    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An error occurred');
      setFormLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {modalMode === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}
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

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
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
              value={currentBlog.title || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Blog title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="excerpt">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="excerpt"
              name="excerpt"
              value={currentBlog.excerpt || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="A short summary of the blog post"
              rows={3}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              name="content"
              value={currentBlog.content || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Blog content"
              rows={10}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="mb-4 md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                Tags (comma separated)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tags"
                name="tags"
                type="text"
                value={Array.isArray(currentBlog.tags) ? currentBlog.tags.join(', ') : ''}
                onChange={handleTagsChange}
                onBlur={handleTagsBlur}
                placeholder="technology, programming, design"
              />
            </div>

            <div className="mb-4 md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
                Cover Image URL <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="coverImage"
                name="coverImage"
                type="text"
                value={currentBlog.coverImage || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="mb-4 md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authorId">
                Author <span className="text-red-500">*</span>
              </label>
              {loadingAuthors ? (
                <div className="py-2">Loading authors...</div>
              ) : (
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="authorId"
                  name="authorId"
                  value={currentBlog.author?.id || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an author</option>
                  {authors.map(author => (
                    <option key={author.id} value={author.id}>
                      {author.name} ({author.role})
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="mb-4 md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="status"
                name="status"
                value={currentBlog.status || 'draft'}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>



          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaDescription">
              Meta Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="metaDescription"
              name="metaDescription"
              value={currentBlog.metaDescription || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="SEO meta description"
              rows={2}
            />
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
              disabled={formLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {formLoading ? 'Saving...' : (modalMode === 'create' ? 'Create' : 'Update')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
