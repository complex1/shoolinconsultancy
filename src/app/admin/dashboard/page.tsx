"use client";

import { useEffect, useState } from 'react';
import AdminLayout from '../adminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNewspaper,
  faLayerGroup,
  faQuoteRight,
  faEnvelope,
  faImage,
  faUser,
  faCalendarAlt,
  faExclamationTriangle,
  faSpinner,
  faCheck,
  faStar,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface DashboardData {
  counts: {
    blogs: { total: number; published: number; drafts: number };
    services: { total: number; active: number; featured: number };
    testimonials: { total: number; active: number };
    enquiries: { total: number; pending: number; resolved: number; responseRate: number };
    assets: { total: number; svg: number; images: number };
    users: { total: number };
  };
  latest: {
    blogs: any[];
    services: any[];
    testimonials: any[];
    enquiries: any[];
    assets: any[];
  };
  system: {
    timestamp: string;
    environment: string;
  };
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/dashboard');
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setDashboardData(data.data);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to load dashboard data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // DashCard component for displaying metric cards
  const DashCard = ({ 
    title, 
    value, 
    subtitle, 
    icon, 
    color = 'blue',
    link
  }: { 
    title: string; 
    value: number | string;
    subtitle?: string; 
    icon: any;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
    link?: string;
  }) => {
    const colorClasses = {
      blue: 'bg-blue-500 text-blue-100',
      green: 'bg-green-500 text-green-100',
      yellow: 'bg-yellow-500 text-yellow-100',
      red: 'bg-red-500 text-red-100',
      purple: 'bg-purple-500 text-purple-100',
      indigo: 'bg-indigo-500 text-indigo-100',
    };
    
    const Card = () => (
      <div className="bg-white rounded-lg shadow p-6 flex items-start">
        <div className={`rounded-full ${colorClasses[color]} p-3 mr-4`}>
          <FontAwesomeIcon icon={icon} className="h-6 w-6" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-sm font-medium text-gray-500">{title}</div>
          {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
        </div>
      </div>
    );
    
    return link ? (
      <Link href={link} className="block hover:opacity-90 transition-opacity">
        <Card />
      </Link>
    ) : (
      <Card />
    );
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button 
            onClick={fetchDashboardData}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Refresh Data
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-start">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 mt-0.5" />
            <div>
              <p className="font-bold">Error loading dashboard data</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {loading && !dashboardData ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        ) : dashboardData && (
          <>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashCard 
                  title="Total Blogs" 
                  value={dashboardData.counts.blogs.total}
                  subtitle={`${dashboardData.counts.blogs.published} published, ${dashboardData.counts.blogs.drafts} drafts`} 
                  icon={faNewspaper} 
                  color="blue"
                  link="/admin/blog"
                />
                <DashCard 
                  title="Services" 
                  value={dashboardData.counts.services.total}
                  subtitle={`${dashboardData.counts.services.featured} featured`} 
                  icon={faLayerGroup}
                  color="green"
                  link="/admin/services"
                />
                <DashCard 
                  title="Testimonials" 
                  value={dashboardData.counts.testimonials.total}
                  subtitle={`${dashboardData.counts.testimonials.active} active`} 
                  icon={faQuoteRight}
                  color="indigo"
                  link="/admin/testimonials"
                />
                <DashCard 
                  title="Enquiries" 
                  value={dashboardData.counts.enquiries.total}
                  subtitle={`${dashboardData.counts.enquiries.pending} pending`} 
                  icon={faEnvelope}
                  color="yellow"
                  link="/admin/enquiry"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Recent Enquiries</h3>
                    <Link href="/admin/enquiry" className="text-blue-500 hover:text-blue-700 text-sm">
                      View All
                    </Link>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200 text-left">
                          <th className="pb-3 font-medium text-gray-600">Name</th>
                          <th className="pb-3 font-medium text-gray-600">Service</th>
                          <th className="pb-3 font-medium text-gray-600">Date</th>
                          <th className="pb-3 font-medium text-gray-600">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.latest.enquiries.map((enquiry) => (
                          <tr key={enquiry.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 text-gray-800">{enquiry.name}</td>
                            <td className="py-3 text-gray-600">{enquiry.service || 'General'}</td>
                            <td className="py-3 text-gray-500 text-sm">{formatDate(enquiry.createdAt)}</td>
                            <td className="py-3">
                              <span className={`
                                px-2 py-1 rounded-full text-xs
                                ${enquiry.isResolved 
                                  ? 'bg-green-100 text-green-800' 
                                  : enquiry.status === 'pending' 
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-blue-100 text-blue-800'
                                }
                              `}>
                                {enquiry.isResolved ? 'Resolved' : enquiry.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Media</h3>
                    <Link href="/admin/asset" className="text-blue-500 hover:text-blue-700 text-sm">
                      View All
                    </Link>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <FontAwesomeIcon icon={faImage} className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-xl font-bold text-gray-800">{dashboardData.counts.assets.total}</div>
                      <div className="text-sm text-gray-500">Total Assets</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-gray-800">{dashboardData.counts.assets.images}</div>
                      <div className="text-sm text-gray-500">Images</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-gray-800">{dashboardData.counts.assets.svg}</div>
                      <div className="text-sm text-gray-500">SVGs</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-2">Recent Uploads</h4>
                    <div className="space-y-3">
                      {dashboardData.latest.assets.slice(0, 3).map((asset) => (
                        <div key={asset.id} className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                            {asset.isSvg ? (
                              <FontAwesomeIcon icon={faFileAlt} className="text-gray-400" />
                            ) : (
                              <FontAwesomeIcon icon={faImage} className="text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 truncate">
                            <div className="text-sm font-medium text-gray-800 truncate">{asset.name}</div>
                            <div className="text-xs text-gray-500">{formatDate(asset.createdAt)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Recent Blog Posts</h3>
                  <Link href="/admin/blog" className="text-blue-500 hover:text-blue-700 text-sm">
                    View All
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {dashboardData.latest.blogs.map((blog) => (
                    <div key={blog.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <h4 className="font-medium text-gray-800 mb-1">{blog.title}</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          {formatDate(blog.createdAt)}
                        </span>
                        <span className={`
                          px-2 rounded-full text-xs
                          ${blog.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                          }
                        `}>
                          {blog.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Services & Testimonials</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <FontAwesomeIcon icon={faLayerGroup} className="text-green-500 mr-2" />
                    Featured Services
                  </h4>
                  <div className="space-y-2">
                    {dashboardData.latest.services.filter(s => s.featured).slice(0, 3).map((service) => (
                      <div key={service.id} className="flex items-center">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2 text-sm" />
                        <span className="text-gray-800">{service.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <FontAwesomeIcon icon={faQuoteRight} className="text-indigo-500 mr-2" />
                    Recent Testimonials
                  </h4>
                  <div className="space-y-3">
                    {dashboardData.latest.testimonials.slice(0, 3).map((testimonial) => (
                      <div key={testimonial.id} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-800">{testimonial.name}</span>
                          <span className="text-gray-500 text-sm">{testimonial.rating}/5</span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                          "{testimonial.text.substring(0, 100)}..."
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>
                Last updated: {formatDate(dashboardData.system.timestamp)} • 
                Environment: {dashboardData.system.environment}
              </p>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
