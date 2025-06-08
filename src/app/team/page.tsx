'use client';
import TeamGroup from '../components/team/teamGroup';
import TeamGallery from '../components/team/TeamGallery';
import TeamHeroSection from '../components/team/TeamHeroSection';


export default function TeamPage() {

  return (
    <>
      {/* Enhanced Hero section */}
      
      <TeamHeroSection />
      <TeamGroup />
      <TeamGallery />

      {/* Enhanced Join Our Team Section */}
      {/* <section className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('/patterns/indian-pattern.svg')" }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Growing Team</h2>
            <p className="text-xl text-gold-300 mb-10 max-w-2xl mx-auto">
              We're always looking for exceptional legal talent to join our team. If you're passionate about law and excellence, we'd love to hear from you.
            </p>
            <Link 
              href="/team/jobs" 
              className="inline-block px-8 py-4 bg-gold-500 hover:bg-gold-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explore Opportunities
            </Link>
          </div>
        </div>
      </section> */}
    </>
  );
}
