'use client';

import { useState, useEffect } from 'react';

// Define the Statistic type
type Statistic = {
  id: number;
  label: string;
  value: string;
  icon: string | null;
  order: number;
};

const StatsSection = () => {
  const [stats, setStats] = useState<Statistic[]>([]);
  const [counters, setCounters] = useState<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        
        const data = await response.json();
        setStats(data);
        // Initialize counters to zero
        setCounters(data.map(() => 0));
        setError(null);
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError('Unable to load statistics. Please try again later.');
        // Use fallback data if API fails
        const fallbackStats = [
          { id: 1, label: 'Clients Served', value: '250+', icon: 'users', order: 1 },
          { id: 2, label: 'Years Experience', value: '15+', icon: 'calendar', order: 2 },
          { id: 3, label: 'Success Rate', value: '98%', icon: 'chart', order: 3 },
          { id: 4, label: 'Countries Served', value: '30+', icon: 'globe', order: 4 },
        ];
        setStats(fallbackStats);
        setCounters(fallbackStats.map(() => 0));
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  useEffect(() => {
    if (hasAnimated || loading || stats.length === 0) return;

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
  }, [hasAnimated, loading, stats]);

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
        setCounters(stats.map(stat => {
          // Extract numeric part from values like "250+" or "98%"
          const numericValue = parseInt(stat.value.replace(/\D/g, ''), 10);
          return isNaN(numericValue) ? 0 : numericValue;
        }));
      } else {
        setCounters(
          stats.map(stat => {
            const numericValue = parseInt(stat.value.replace(/\D/g, ''), 10);
            return isNaN(numericValue) ? 0 : Math.floor(progress * numericValue);
          })
        );
      }
    }, 1000 / frameRate);
  };

  // Helper function to get the suffix from the value
  const getSuffix = (value: string) => {
    return value.replace(/[0-9]/g, '');
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

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-300 p-4">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={stat.id} className="p-6 bg-blue-700/50 rounded-xl">
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  {counters[index]}
                  {getSuffix(stat.value)}
                </div>
                <div className="text-xl text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
