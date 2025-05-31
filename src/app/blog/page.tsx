'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faBookOpen, faClock, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

interface Author {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  createdAt: string;
  author: Author;
  tags: string[];
  readTime: number;
  coverImage: string;
}

const BLOG_IMAGES = {
  digitalTransformation: '/uploads/media/69d682d6-7c20-4d5a-858c-c8b27ae568ec.png',
  financial: '/uploads/media/0d051543-ac55-4a70-868d-0e0950e4bec9.png',
  corporate: '/uploads/media/05e26826-247f-42f7-85e3-b7f76d8a3faa.png',
  legal: '/uploads/media/a492b8c8-1b8d-4b14-bc1e-2bd1c010711c.png',
};

// Enhanced blog posts data
const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Legal Consulting in a Digital World',
    excerpt: 'Explore how digital transformation is reshaping the landscape of legal consulting and what it means for organizations seeking strategic guidance.',
    createdAt: '2023-05-15T12:00:00Z',
    author: {
      id: 1,
      name: 'Jane Doe',
      role: 'Senior Legal Consultant',
      image: '/team/attorney1.svg',
      bio: 'Expert in digital transformation and legal strategy',
      linkedin: 'https://linkedin.com/in/janedoe',
      twitter: 'https://twitter.com/janedoe'
    },
    tags: ['Legal Tech', 'Digital Transformation'],
    readTime: 8,
    coverImage: BLOG_IMAGES.digitalTransformation
  },
  {
    id: 2,
    title: '5 Financial Planning Strategies Every Business Should Consider',
    excerpt: 'Discover essential financial planning approaches that can help businesses of all sizes navigate economic uncertainty and build resilience.',
    createdAt: '2023-04-28T12:00:00Z',
    author: {
      id: 2,
      name: 'John Smith',
      role: 'Financial Advisor',
      image: '/team/attorney2.svg',
      bio: 'Specialist in corporate finance and investment strategies',
      linkedin: 'https://linkedin.com/in/johnsmith',
      twitter: 'https://twitter.com/johnsmith'
    },
    tags: ['Financial Advisory', 'Investment'],
    readTime: 10,
    coverImage: BLOG_IMAGES.financial
  },
  {
    id: 3,
    title: 'Building a Culture of Innovation: Lessons from Industry Leaders',
    excerpt: 'Learn how top organizations foster innovation within their teams and how you can implement similar practices in your business.',
    createdAt: '2023-04-10T12:00:00Z',
    author: {
      id: 3,
      name: 'Emily Chen',
      role: 'Organizational Development Expert',
      image: '/team/attorney3.svg',
      bio: 'Passionate about driving change and fostering inclusive workplaces',
      linkedin: 'https://linkedin.com/in/emilychen',
      twitter: 'https://twitter.com/emilychen'
    },
    tags: ['Organizational Development', 'Innovation'],
    readTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1581091870620-4b8e6f7f7f7f?auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    title: 'The Role of Data Analytics in Modern Strategic Planning',
    excerpt: 'Understand how data-driven decision making is revolutionizing strategic planning processes and creating competitive advantages.',
    createdAt: '2023-03-22T12:00:00Z',
    author: {
      id: 4,
      name: 'Michael Johnson',
      role: 'Data Analytics Consultant',
      image: '/team/attorney4.svg',
      bio: 'Expert in leveraging data for strategic business decisions',
      linkedin: 'https://linkedin.com/in/michaeljohnson',
      twitter: 'https://twitter.com/michaeljohnson'
    },
    tags: ['Strategic Planning', 'Data Analytics'],
    readTime: 9,
    coverImage: 'https://images.unsplash.com/photo-1581091870620-4b8e6f7f7f7f?auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    title: 'Navigating Digital Transformation: Common Challenges and Solutions',
    excerpt: 'Explore the obstacles organizations face during digital transformation journeys and practical approaches to overcome them.',
    createdAt: '2023-03-05T12:00:00Z',
    author: {
      id: 5,
      name: 'Sarah Williams',
      role: 'Digital Transformation Specialist',
      image: '/team/attorney5.svg',
      bio: 'Helping businesses adapt and thrive in the digital age',
      linkedin: 'https://linkedin.com/in/sarahwilliams',
      twitter: 'https://twitter.com/sarahwilliams'
    },
    tags: ['Digital Transformation', 'Change Management'],
    readTime: 8,
    coverImage: 'https://images.unsplash.com/photo-1581091870620-4b8e6f7f7f7f?auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    title: 'Sustainable Business Practices: A Competitive Necessity',
    excerpt: 'Discover why sustainability is becoming a strategic imperative and how businesses can integrate sustainable practices into their operations.',
    createdAt: '2023-02-18T12:00:00Z',
    author: {
      id: 6,
      name: 'David Kim',
      role: 'Sustainability Consultant',
      image: '/team/attorney6.svg',
      bio: 'Expert in sustainable business strategies and practices',
      linkedin: 'https://linkedin.com/in/davidkim',
      twitter: 'https://twitter.com/davidkim'
    },
    tags: ['Sustainability', 'Corporate Social Responsibility'],
    readTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1581091870620-4b8e6f7f7f7f?auto=format&fit=crop&q=80'
  },
];

const ParallaxHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  
  return (
    <div className="relative h-[75vh] overflow-hidden">
      {/* Background Layers */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        {/* Pattern Background */}
        <div className="absolute inset-0 bg-neutral-900">
          <Image
            src="/patterns/indian-pattern.svg"
            alt="Background Pattern"
            fill
            className="object-cover opacity-5"
          />
        </div>

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-black-700/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-gold-400/40 to-transparent" />
        
        {/* Accent Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gold-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-black-700/30 rounded-full blur-3xl" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative h-full flex items-center justify-center px-4 z-20"
      >
        <div className="max-w-4xl mx-auto pt-16 pb-20">
          {/* Legal Symbol */}
          <div className="flex justify-center mb-12">
            <div className="w-24 h-24 relative">
              <Image
                src="/legal-symbol.svg"
                alt="Legal Symbol"
                fill
                className="object-contain opacity-90"
              />
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
            Legal Insights & <span className="text-gold-400">Expertise</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-12">
            Stay informed with authoritative perspectives on legal consulting and industry trends
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
            <button className="px-8 py-4 bg-gold-400 hover:bg-gold-500 text-white rounded-md transition-all duration-200 transform hover:scale-105 font-medium shadow-lg">
              Latest Articles
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-md backdrop-blur-sm transition-all duration-200 transform hover:scale-105 border border-white/20 shadow-lg">
              Browse Topics
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-3xl mx-auto px-4">
            {[
              { number: '100+', label: 'Legal Articles' },
              { number: '50+', label: 'Expert Authors' },
              { number: '10K+', label: 'Monthly Readers' },
              { number: '15+', label: 'Practice Areas' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">{stat.number}</p>
                <p className="text-sm md:text-base text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};

const Sidebar = ({ tags, popularPosts }: { tags: string[], popularPosts: BlogPost[] }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Subscribe:', email);
  };

  return (
    <div className="space-y-8">
      {/* Newsletter Subscription */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-black-700"></div>
          <h3 className="text-xl font-semibold text-neutral-800">Subscribe to Our Newsletter</h3>
        </div>
        <p className="text-neutral-600 mb-4">Stay updated with our latest legal insights and industry analysis.</p>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-black-700 focus:border-black-700"
          />
          <button
            type="submit"
            className="w-full bg-black-700 hover:bg-black-600 text-white px-4 py-3 rounded-md transition-colors duration-200 font-medium"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Tag Cloud */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-gold-400"></div>
          <h3 className="text-xl font-semibold text-neutral-800">Practice Areas</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 bg-neutral-100 text-neutral-700 hover:bg-black-700 hover:text-white rounded-md text-sm transition-colors duration-200 border border-neutral-200 font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-black-700"></div>
          <h3 className="text-xl font-semibold text-neutral-800">Featured Insights</h3>
        </div>
        <div className="space-y-6">
          {popularPosts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block group"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black-700/20 to-transparent rounded-md"></div>
                </div>
                <div>
                  <h4 className="font-medium group-hover:text-maroon-800 transition-colors duration-200 line-clamp-2 text-neutral-800">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-2 text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, using fallback data
    setPosts(FALLBACK_BLOG_POSTS);
    setFilteredPosts(FALLBACK_BLOG_POSTS);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let filtered = posts;
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.tags.includes(selectedTag)
      );
    }
    
    setFilteredPosts(filtered);
  }, [searchTerm, selectedTag, posts]);

  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  );

  return (
    <main className="min-h-screen bg-neutral-50">
      <ParallaxHero />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-neutral-200">
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search insights and articles..."
                      className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-black-700 focus:border-black-700"
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-xl overflow-hidden group border border-neutral-200 transform hover:-translate-y-1 transition-all duration-200"
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative h-56">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Image Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-black-700/20 mix-blend-multiply"></div>
                      
                      {/* Tags */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                        <div className="flex gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span 
                              key={tag} 
                              className="px-3 py-1.5 bg-white/95 text-black-700 text-xs font-medium rounded-md shadow-sm backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1.5 text-white/90 text-sm backdrop-blur-sm px-3 py-1.5 rounded-md bg-black/20">
                          <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" />
                          {post.readTime} min read
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                        <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>

                      {/* Title & Excerpt */}
                      <h2 className="text-xl font-semibold mb-3 group-hover:text-black-700 transition-colors duration-200 text-neutral-800">
                        {post.title}
                      </h2>
                      <p className="text-neutral-600 mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-neutral-100">
                          <Image
                            src={post.author.image}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-neutral-800">{post.author.name}</p>
                          <p className="text-sm text-neutral-500">{post.author.role}</p>
                        </div>
                        <div className="flex gap-2">
                          {post.author.linkedin && (
                            <a
                              href={post.author.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-400 hover:text-black-700 transition-colors"
                            >
                              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                            </a>
                          )}
                          {post.author.twitter && (
                            <a
                              href={post.author.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-400 hover:text-black-700 transition-colors"
                            >
                              <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <Sidebar tags={allTags} popularPosts={posts} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
