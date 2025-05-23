import Hero from './components/ui/Hero';
import ServicesSection from './components/ui/ServicesSection';
import IconSection from './components/ui/IconSection';
import StatsSection from './components/ui/StatsSection';
import Testimonials from './components/ui/Testimonials';
import ContactSection from './components/ui/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <IconSection />
      <StatsSection />
      <Testimonials />
      <ContactSection />
    </>
  );
}