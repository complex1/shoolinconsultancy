'use client';

import React, { useEffect, useState } from 'react';
import { BlogEntity, generateSlug, calculateReadTime } from '@/entities/blog.entity';
import { useRouter } from 'next/navigation';
import BlogFormModal from './components/BlogFormModal';
import AdminLayout from '../adminLayout';

type ModalMode = 'create' | 'edit' | null;

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<BlogEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogEntity>>({});
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogs(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const openCreateModal = () => {
    setCurrentBlog({
      title: '',
      excerpt: '',
      content: '',
      tags: [],
      status: 'draft',
      coverImage: '',
      metaDescription: '',
    });
    setModalMode('create');
  };

  const openEditModal = (blog: BlogEntity) => {
    setCurrentBlog({ ...blog });
    setModalMode('edit');
  };

  const closeModal = () => {
    setModalMode(null);
    setCurrentBlog({});
  };

  // Form submission handler
  const handleFormSubmit = async (blogData: Partial<BlogEntity>) => {
    try {
      const url = modalMode === 'create'
        ? '/api/admin/blog'
        : `/api/admin/blog/${blogData.id}`;

      const method = modalMode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save blog post');
      }

      // Refresh blog list
      await fetchBlogs();

      // Close modal
      closeModal();

    } catch (err) {
      // Re-throw the error to be caught by the form component
      throw err;
    }
  };

  // Updated handleDelete function to work with string IDs
  function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    const deleteBlog = async () => {
      try {
        const response = await fetch(`/api/admin/blog/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete blog post');
        }

        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete blog post');
      }
    };

    deleteBlog();
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Blog Management</h1>
          <div className="text-center py-10">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Blog Management</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <button
            onClick={openCreateModal}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Create New Blog
          </button>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded">
            No blog posts found. Create your first blog post!
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map(blog => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{blog.title}</div>
                      <div className="text-sm text-gray-500">{blog.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${blog.status === 'published' ? 'bg-green-100 text-green-800' :
                          blog.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {blog.author?.image && (
                          <div className="flex-shrink-0 h-8 w-8 mr-2">
                            <img className="h-8 w-8 rounded-full" src={blog.author.image} alt="" />
                          </div>
                        )}
                        <div className="text-sm font-medium text-gray-900">
                          {blog.author?.name || 'Unknown'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(blog)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => blog.id && handleDelete(blog.id)}
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
        )}

        {/* Use the extracted BlogFormModal component */}
        {modalMode && (
          <BlogFormModal
            blog={currentBlog}
            modalMode={modalMode}
            onClose={closeModal}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </AdminLayout>
  );
}
