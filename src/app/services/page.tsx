import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    id: 'business',
    title: 'Business Consulting',
    description: 'Strategic business consulting to optimize operations, enhance productivity, and drive sustainable growth.',
    icon: '/icons/business.svg',
    longDescription: `Our comprehensive business consulting services are designed to help organizations identify opportunities, 
    overcome challenges, and achieve their strategic objectives. We work closely with your team to understand your unique business 
    needs and develop tailored solutions that drive measurable results.
    
    Our approach combines industry expertise with innovative methodologies to optimize your operations, enhance productivity, 
    and foster sustainable growth. Whether you're looking to streamline processes, improve organizational effectiveness, or 
    explore new market opportunities, our business consultants provide the guidance and support you need to succeed.`
  },
  {
    id: 'financial',
    title: 'Financial Advisory',
    description: 'Expert financial guidance to help you make informed decisions, manage resources, and achieve financial stability.',
    icon: '/icons/finance.svg',
    longDescription: `Our financial advisory services provide expert guidance to help organizations navigate complex financial 
    landscapes and make informed decisions. From financial planning and analysis to risk management and investment strategies, 
    our advisors offer comprehensive support tailored to your specific needs.
    
    We help you optimize resource allocation, enhance financial performance, and build a strong foundation for long-term stability 
    and growth. Our team of experienced financial professionals delivers actionable insights and practical recommendations that 
    align with your business objectives and market conditions.`
  },
  {
    id: 'strategy',
    title: 'Strategic Planning',
    description: 'Comprehensive strategic planning services to align your vision with practical, actionable business initiatives.',
    icon: '/icons/strategy.svg',
    longDescription: `Our strategic planning services help organizations define their vision, establish clear objectives, and 
    develop actionable roadmaps for success. We facilitate collaborative planning processes that engage key stakeholders and 
    drive alignment across your organization.
    
    From market analysis and competitive positioning to implementation planning and performance measurement, our comprehensive 
    approach ensures that your strategic initiatives deliver tangible results. We help you anticipate future trends, adapt to 
    changing market conditions, and position your organization for sustainable growth and competitive advantage.`
  },
  {
    id: 'digital',
    title: 'Digital Transformation',
    description: 'Transform your business with cutting-edge digital solutions that enhance efficiency and customer experience.',
    icon: '/icons/digital.svg',
    longDescription: `Our digital transformation services help organizations leverage technology to reimagine their business models, 
    enhance operational efficiency, and deliver exceptional customer experiences. We guide you through every step of your digital 
    journey, from strategy development to implementation and optimization.
    
    Our team of digital experts combines technological know-how with business acumen to identify the right digital solutions for 
    your specific needs. Whether you're looking to automate processes, implement new systems, or create innovative digital products, 
    we provide the expertise and support you need to successfully navigate your digital transformation.`
  },
];

export default function Services() {
  return (
    <>
      {/* Hero section with gradient background */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-16 text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 animate-fadeIn">Our Services</h1>
            <p className="text-xl text-blue-100 animate-fadeIn" style={{ animationDelay: '100ms' }}>
              Comprehensive consulting solutions tailored to your business needs
            </p>
          </div>
        </div>
      </section>
      
      {/* Services navigation */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto py-4 space-x-6 justify-center">
            {services.map(service => (
              <a 
                key={service.id} 
                href={`#${service.id}`}
                className="text-blue-800 hover:text-blue-600 whitespace-nowrap text-sm md:text-base font-medium px-2 py-1 hover:bg-blue-50 rounded-md transition-colors"
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-0">
        {services.map((service, index) => (
          <section 
            key={service.id} 
            id={service.id} 
            className={`py-16 scroll-mt-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                <div className="md:col-span-1 flex justify-center">
                  <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center shadow-md animate-fadeIn" style={{ animationDelay: '100ms' }}>
                    <Image 
                      src={service.icon}
                      alt={service.title}
                      width={64}
                      height={64}
                      className="h-16 w-16"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold text-blue-800 mb-4 animate-fadeIn">{service.title}</h2>
                  <div className="text-gray-600 space-y-4">
                    {service.longDescription.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="animate-fadeIn" style={{ animationDelay: `${200 + idx * 100}ms` }}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-6 animate-fadeIn" style={{ animationDelay: '400ms' }}>
                    <Link 
                      href="/contact" 
                      className="inline-block bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 hover:scale-105 transform"
                    >
                      Discuss Your Needs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
