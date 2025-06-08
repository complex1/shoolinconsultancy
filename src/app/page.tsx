import Hero from './components/homepage/Hero';
import Stats from './components/homepage/Stats';
import ServicesSection from './components/homepage/ServicesSection';
import GlobalPresence from './components/homepage/GlobalPresence';
import Testimonials from './components/homepage/Testimonials';
import Newsletter from './components/homepage/Newsletter';
import ContactSection from './components/homepage/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <ServicesSection />
      <GlobalPresence />
      <Testimonials />
      <Newsletter />
      <ContactSection />
    </main>
  );
}