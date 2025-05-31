'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faBriefcase, 
  faClock, 
  faChevronDown, 
  faChevronUp,
  faSearch,
  faFilter,
  faBuilding,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Job, jobListings } from '../job-data';

export default function JobListings() {
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Extract unique departments, locations, and job types for filters
  const departments: string[] = Array.from(new Set(jobListings.map(job => job.department)));
  const locations: string[] = Array.from(new Set(jobListings.map(job => job.location)));
  const jobTypes: string[] = Array.from(new Set(jobListings.map(job => job.type)));

  // Handle expanding/collapsing job details
  const toggleJobExpansion = (jobId: number) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment ? job.department === selectedDepartment : true;
    const matchesLocation = selectedLocation ? job.location === selectedLocation : true;
    const matchesType = selectedType ? job.type === selectedType : true;
    
    return matchesSearch && matchesDepartment && matchesLocation && matchesType;
  });

  // Calculate time since posting (e.g., "3 days ago")
  const getTimeSincePosting = (dateString: string): string => {
    const postedDate = new Date(dateString);
    const currentDate = new Date();
    
    // Check if date is in the future (for job postings with future dates)
    if (postedDate > currentDate) {
      return 'Coming soon';
    }
    
    const diffTime = Math.abs(currentDate.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) === 1 ? '' : 's'} ago`;
    return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) === 1 ? '' : 's'} ago`;
  };
  
  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <>
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('/patterns/indian-pattern.svg')" }}></div>
        </div>
        
        {/* Enhanced Decorative Elements */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-gold-400/30 via-gold-500/20 to-transparent rounded-br-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-gold-400/30 via-gold-500/20 to-transparent rounded-tl-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-neutral-100 mb-6"
            >
              Career Opportunities
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-secondary-light mb-6 max-w-2xl mx-auto"
            >
              Join our growing team of legal professionals and make an impact on the future of law
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link 
                href="/team" 
                className="inline-flex items-center text-gold-300 hover:text-gold-200 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Team Page
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <FontAwesomeIcon icon={faSearch} className="text-neutral-500" />
              </span>
              <input
                type="text"
                placeholder="Search job titles or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {/* Filter Options */}
            <div className="flex flex-1 gap-2 flex-wrap md:flex-nowrap">
              <div className="w-full md:w-auto flex-1">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full py-3 px-4 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none bg-white"
                  style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')", backgroundPosition: 'right 8px center', backgroundRepeat: 'no-repeat' }}
                >
                  <option value="">All Departments</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>{department}</option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-auto flex-1">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full py-3 px-4 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none bg-white"
                  style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')", backgroundPosition: 'right 8px center', backgroundRepeat: 'no-repeat' }}
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-auto flex-1">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full py-3 px-4 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none bg-white"
                  style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')", backgroundPosition: 'right 8px center', backgroundRepeat: 'no-repeat' }}
                >
                  <option value="">All Types</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="job-listings" className="py-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Results summary */}
            <div className="mb-8 pb-3 border-b border-neutral-200">
              <h2 className="text-2xl font-bold text-black-700">{filteredJobs.length} Openings</h2>
              <p className="text-neutral-600">Discover your next opportunity at Shoolin Consultancy</p>
            </div>

            {/* Job cards */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {currentJobs.map((job) => (
                  <motion.div 
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200"
                  >
                    {/* Job header */}
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between md:items-center">
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900">{job.title}</h3>
                          <div className="flex flex-wrap gap-4 mt-3">
                            <div className="flex items-center text-neutral-600">
                              <FontAwesomeIcon icon={faBuilding} className="w-4 h-4 mr-2 text-gold-500" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center text-neutral-600">
                              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2 text-gold-500" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center text-neutral-600">
                              <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4 mr-2 text-gold-500" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center text-neutral-600">
                              <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2 text-gold-500" />
                              <span>{getTimeSincePosting(job.postedDate)}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleJobExpansion(job.id)}
                          className="mt-4 md:mt-0 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 hover:bg-gold-100 transition-colors"
                        >
                          <FontAwesomeIcon 
                            icon={expandedJobId === job.id ? faChevronUp : faChevronDown} 
                            className="text-neutral-700"
                          />
                        </button>
                      </div>
                      
                      {/* Brief description */}
                      <p className="mt-4 text-neutral-600">{job.description}</p>
                      
                      {/* Experience level */}
                      <div className="mt-4">
                        <span className="inline-block px-3 py-1 bg-gold-100 text-gold-800 text-sm font-medium rounded-full">
                          {job.experience} experience
                        </span>
                      </div>

                      {/* "View Details" / "Hide Details" button */}
                      <div className="mt-4">
                        <button
                          onClick={() => toggleJobExpansion(job.id)}
                          className="text-gold-600 hover:text-gold-700 font-medium flex items-center"
                        >
                          {expandedJobId === job.id ? 'Hide Details' : 'View Details'}
                          <FontAwesomeIcon 
                            icon={expandedJobId === job.id ? faChevronUp : faChevronDown} 
                            className="ml-2 w-3 h-3"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Job details (expanded) */}
                    {expandedJobId === job.id && (
                      <div className="p-6 bg-neutral-50 border-t border-neutral-200">
                        {/* Responsibilities */}
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-neutral-900 mb-3">Responsibilities</h4>
                          <ul className="list-disc pl-5 space-y-2">
                            {job.responsibilities.map((item, index) => (
                              <li key={index} className="text-neutral-700">{item}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Qualifications */}
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-neutral-900 mb-3">Qualifications</h4>
                          <ul className="list-disc pl-5 space-y-2">
                            {job.qualifications.map((item, index) => (
                              <li key={index} className="text-neutral-700">{item}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefits */}
                        {job.benefits && (
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-neutral-900 mb-3">Benefits</h4>
                            <ul className="list-disc pl-5 space-y-2">
                              {job.benefits.map((item, index) => (
                                <li key={index} className="text-neutral-700">{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Apply button */}
                        <div className="mt-8">
                          <Link 
                            href={`/contact?job=${encodeURIComponent(job.title)}&department=${encodeURIComponent(job.department)}&ref=careers`}
                            className="inline-block px-6 py-3 bg-gold-500 hover:bg-gold-400 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                          >
                            Apply for this Position
                          </Link>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Pagination */}
                {filteredJobs.length > jobsPerPage && (
                  <div className="mt-8">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 mr-2" />
                        Previous
                      </button>
                      <span className="text-lg font-medium text-neutral-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50"
                      >
                        Next
                        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="text-neutral-400 text-6xl mb-4">
                  <FontAwesomeIcon icon={faFilter} />
                </div>
                <h3 className="text-xl font-bold text-neutral-700 mb-2">No jobs match your search</h3>
                <p className="text-neutral-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('/patterns/indian-pattern.svg')" }}></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-gold-300 mb-8">
              We're always interested in connecting with exceptional legal talent. Send us your resume for future opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-gold-500 hover:bg-gold-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Submit Your Resume
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
