import Hero from './components/ui/Hero';
import Stats from './components/ui/Stats';
import PracticeAreas from './components/ui/PracticeAreas';
import ServicesSection from './components/ui/ServicesSection';
import GlobalPresence from './components/ui/GlobalPresence';
import Testimonials from './components/ui/Testimonials';
import Newsletter from './components/ui/Newsletter';
import ContactSection from './components/ui/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <PracticeAreas />
      <ServicesSection />
      <GlobalPresence />
      <Testimonials />
      <Newsletter />
      <ContactSection />
    </main>
  );
}