'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  imageUrl: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: TeamMember | null;
  tags: string[];
  image?: string;
  imageUrl?: string;
}

export default function BlogPostClient({ postId }: { postId: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/blog/${postId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error('Failed to fetch blog post');
        }
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError((err as Error).message || 'Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogPost();
  }, [postId]);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-20">
        <div className="text-center text-red-500 mb-6">{error || 'Blog post not found'}</div>
        <Link href="/blog" className="text-blue-800 hover:text-blue-600">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero section with gradient background */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-16 text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 flex justify-center gap-2">
              {post.tags && post.tags.map((tag) => (
                <span key={tag} className="inline-block bg-blue-800 bg-opacity-50 px-3 py-1 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-center gap-4 text-blue-100">
              <span>By {post.author ? post.author.name : 'Anonymous'}</span>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            {/* Featured image */}
            {(post.image || post.imageUrl) && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <Image 
                  src={post.image || post.imageUrl || ''}
                  alt={post.title} 
                  width={800} 
                  height={400} 
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Blog excerpt/intro */}
            {post.excerpt && (
              <div className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
                {post.excerpt}
              </div>
            )}
            
            {/* Main content */}
            <div className="prose prose-lg max-w-none">
              {/* Render content as HTML with proper sanitization in a real app */}
              <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
            </div>
            
            {/* Author info and share section */}
            <div className="mt-12 border-t border-b border-gray-200 py-6">
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                  <p className="font-bold">Written by {post.author ? post.author.name : 'Anonymous'}</p>
                  <p className="text-gray-500 text-sm">
                    Published on {formatDate(post.createdAt)}
                    {post.updatedAt !== post.createdAt && 
                      ` • Updated on ${formatDate(post.updatedAt)}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Back to blog button */}
            <div className="mt-10 text-center">
              <Link 
                href="/blog" 
                className="btn btn-secondary inline-block border border-blue-800 text-blue-800 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
