import Link from 'next/link';
import Image from 'next/image';
import AttorneysSection from '../components/ui/AttorneysSection';

export default function About() {
  return (
    <>
      {/* Hero section with gradient background similar to homepage */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-16 text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">About Shoolin Consultancy</h1>
            <p className="text-xl text-blue-100">
              Learn about our journey, mission, and the values that drive us to excellence.
            </p>
          </div>
        </div>
      </section>
      
      {/* Content section with alternating backgrounds */}
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Shoolin Consultancy was founded in 2010 with a vision to empower businesses through strategic guidance and innovative solutions. 
                Over the years, we have grown from a small team of experts to a renowned consultancy trusted by businesses worldwide.
              </p>
              
              <p className="text-gray-600 mb-6">
                Our journey began with a simple belief: that every business, regardless of size or industry, deserves access to top-tier 
                consulting services. This belief continues to drive our approach as we partner with clients to navigate challenges and 
                seize opportunities in an ever-evolving business landscape.
              </p>
              
              <p className="text-gray-600">
                Today, Shoolin Consultancy stands as a beacon of excellence in the consulting world, known for our commitment to 
                delivering measurable results and fostering long-term success for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>
    
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl shadow-md bg-white p-8 mb-12">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Mission & Values</h2>
              
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Mission</h3>
              <p className="text-gray-600 mb-6">
                To empower organizations through strategic guidance, innovative solutions, and unwavering commitment to excellence, 
                enabling them to achieve sustainable growth and lasting impact.
              </p>
              
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Values</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li><span className="font-medium">Integrity:</span> We uphold the highest standards of honesty and ethical conduct in all our interactions.</li>
                <li><span className="font-medium">Excellence:</span> We strive for exceptional quality in every aspect of our work.</li>
                <li><span className="font-medium">Innovation:</span> We embrace creative thinking and innovative approaches to solve complex challenges.</li>
                <li><span className="font-medium">Collaboration:</span> We believe in the power of teamwork and partnership to achieve remarkable results.</li>
                <li><span className="font-medium">Client-Centricity:</span> We place our clients&apos; needs and success at the heart of everything we do.</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">Our Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Team member cards would go here */}
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <h3 className="text-lg font-bold">Jane Doe</h3>
                  <p className="text-blue-800">Founder & CEO</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <h3 className="text-lg font-bold">John Smith</h3>
                  <p className="text-blue-800">Chief Strategy Officer</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <h3 className="text-lg font-bold">Emily Chen</h3>
                  <p className="text-blue-800">Financial Director</p>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <Link href="/contact" className="btn btn-primary">
                  Work With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Expert Attorneys section - Now using a reusable component */}
      <AttorneysSection 
        attorneys={[
          {
            name: "Michael Richardson",
            title: "Managing Partner",
            specialization: "Specializing in corporate law, mergers & acquisitions, and business strategy",
            image: "/team/attorney1.svg",
          },
          {
            name: "Sophia Martinez",
            title: "Senior Legal Counsel",
            specialization: "Expertise in intellectual property, patent law, and technology regulations",
            image: "/team/attorney2.svg",
          },
          {
            name: "David Johnson",
            title: "International Legal Advisor",
            specialization: "Focused on international business law, trade compliance, and global regulations",
          },
          {
            name: "Rebecca Wong",
            title: "Compliance Specialist",
            specialization: "Specialized in financial regulations, compliance, and corporate governance",
          }
        ]}
        showContact={true}
        showViewMore={false}
        contactText="Schedule a Consultation"
      />
    </>
  );
}
