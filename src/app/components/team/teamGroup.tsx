import React, { useEffect, useState } from 'react';
import LuxuryAttorneyCard from '../about/LuxuryAttorneyCard';
interface TeamMember {
  id: number;
  name: string;
  title: string;
  role: string; // Required by the Attorney interface in LuxuryAttorneyCard
  specialization: string;
  image?: string;
  email?: string;
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
}
const TeamGroup: React.FC = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/public/user?page=1&limit=100'); // Adjust the API endpoint as needed
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await response.json();
      const members = data.data.map((member: any) => ({
        id: member.id,
        name: member.name,
        title: member.title,
        role: member.role, // Ensure this matches the Attorney interface in LuxuryAttorneyCard
        specialization: member.specialization,
        image: member.image || '/default-avatar.png', // Fallback image
        email: member.email,
        linkedIn: member.linkedIn,
        twitter: member.twitter,
        instagram: member.instagram
      }));
      setTeamMembers(members);
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  // Fetch team members on component mount

  useEffect(() => {
      fetchTeamMembers();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading team members...</div>;
  }
  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">Our Legal Experts</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Each member of our team brings unique expertise and a commitment to excellence in their respective areas of practice.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <LuxuryAttorneyCard
                  key={member.id}
                  attorney={member}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default TeamGroup;