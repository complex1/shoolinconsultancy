'use client';

import { useEffect, useState } from 'react';
import AttorneyCard from '../components/ui/AttorneyCard';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  specialization: string;
  image?: string;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/team');
        
        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }
        
        const data = await response.json();
        setTeamMembers(data);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, []);

  return (
    <>
      {/* Hero section for team page */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-16 text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Our Team</h1>
            <p className="text-xl text-blue-100">
              Meet our talented team of professionals dedicated to your success
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : (
              <>
                {/* Leadership Team */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-blue-800 mb-2 text-center">Leadership</h2>
                  <p className="text-gray-600 text-lg mb-10 max-w-3xl mx-auto text-center">
                    Our leadership team brings decades of experience from diverse industries to provide strategic vision and guidance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers
                      .filter(member => member.title.toLowerCase().includes('partner') || 
                                        member.title.toLowerCase().includes('chief') || 
                                        member.title.toLowerCase().includes('director'))
                      .map((member, index) => (
                        <AttorneyCard
                          key={member.id}
                          name={member.name}
                          title={member.title}
                          specialization={member.specialization}
                          image={member.image}
                          animationDelay={`${index * 150}ms`}
                        />
                      ))}
                  </div>
                </div>
                
                {/* Consultants */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-blue-800 mb-2 text-center">Consultants</h2>
                  <p className="text-gray-600 text-lg mb-10 max-w-3xl mx-auto text-center">
                    Our consultants are industry experts ready to tackle your most complex business challenges.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers
                      .filter(member => member.title.toLowerCase().includes('consultant') || 
                                        member.title.toLowerCase().includes('specialist') || 
                                        member.title.toLowerCase().includes('advisor'))
                      .map((member, index) => (
                        <AttorneyCard
                          key={member.id}
                          name={member.name}
                          title={member.title}
                          specialization={member.specialization}
                          image={member.image}
                          animationDelay={`${index * 150}ms`}
                        />
                      ))}
                  </div>
                </div>
                
                {/* Support Staff */}
                <div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-2 text-center">Support Staff</h2>
                  <p className="text-gray-600 text-lg mb-10 max-w-3xl mx-auto text-center">
                    Our dedicated support staff ensures smooth operations and exceptional client service.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers
                      .filter(member => !member.title.toLowerCase().includes('partner') && 
                                        !member.title.toLowerCase().includes('chief') && 
                                        !member.title.toLowerCase().includes('director') &&
                                        !member.title.toLowerCase().includes('consultant') && 
                                        !member.title.toLowerCase().includes('specialist') && 
                                        !member.title.toLowerCase().includes('advisor'))
                      .map((member, index) => (
                        <AttorneyCard
                          key={member.id}
                          name={member.name}
                          title={member.title}
                          specialization={member.specialization}
                          image={member.image}
                          animationDelay={`${index * 150}ms`}
                        />
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Join Our Team</h2>
            <p className="text-gray-600 text-lg mb-8">
              We're always looking for talented individuals to join our growing team. If you're passionate about making a difference for clients, we'd love to hear from you.
            </p>
            <a 
              href="/contact" 
              className="btn btn-primary inline-block bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
