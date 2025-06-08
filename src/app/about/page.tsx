'use client';
import LuxuryAttorneysSection from '../components/about/LuxuryAttorneysSection';
import JourneyTimeline from '../components/about/JourneyTimeline';
import AboutPageHeroSection from '../components/about/aboutPageHeroSection';
import MissionAndValue from '../components/about/MissonAndValue';
import LeagelBg from '../components/common/LeagelBg';

export default function About() {
 
  return (
    <>
      {/* Hero section with gradient background matching homepage */}
      <AboutPageHeroSection />

      {/* Replace the old timeline section with the new JourneyTimeline component */}
      <JourneyTimeline />
      
      {/* Mission & Values Section - Styled to match theme */}
      <MissionAndValue />


      {/* Legal Excellence Section */}
      <LeagelBg />

      <LuxuryAttorneysSection />
    </>
  );
}
