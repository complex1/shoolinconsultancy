'use client';

import { useState, useEffect } from 'react';

const stats = [
  { id: 1, value: 250, label: 'Clients', suffix: '+' },
  { id: 2, value: 15, label: 'Years Experience', suffix: '+' },
  { id: 3, value: 50, label: 'Team Members', suffix: '+' },
  { id: 4, value: 30, label: 'Countries Served', suffix: '+' },
];

const StatsSection = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000; // ms
    const frameRate = 30; // fps
    const totalFrames = duration / 1000 * frameRate;
    
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      
      const progress = frame / totalFrames;
      
      if (frame === totalFrames) {
        clearInterval(timer);
        setCounters(stats.map(stat => stat.value));
      } else {
        setCounters(
          stats.map(stat => Math.floor(progress * stat.value))
        );
      }
    }, 1000 / frameRate);
  };

  return (
    <section id="stats-section" className="py-16 bg-blue-800 text-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Impact by the Numbers</h2>
          <p className="text-blue-100 text-lg">
            We take pride in the trust our clients place in us and the results we've delivered over the years.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={stat.id} className="p-6 bg-blue-700/50 rounded-xl">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {counters[index]}
                {stat.suffix}
              </div>
              <div className="text-xl text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
