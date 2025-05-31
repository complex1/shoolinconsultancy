'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faClock,
  faShareNodes,
  faLink
} from '@fortawesome/free-solid-svg-icons';
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
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  tags: string[];
  readTime: number;
  coverImage: string;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

const ShareButtons = ({ url, title }: { url: string, title: string }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank')}
        className="text-neutral-600 hover:text-black-700 transition"
        aria-label="Share on Twitter"
      >
        <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
      </button>
      <button
        onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, '_blank')}
        className="text-neutral-600 hover:text-black-700 transition"
        aria-label="Share on LinkedIn"
      >
        <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          // TODO: Show a toast notification
        }}
        className="text-neutral-600 hover:text-gold-400 transition"
        aria-label="Copy link"
      >
        <FontAwesomeIcon icon={faLink} className="w-5 h-5" />
      </button>
    </div>
  );
};

const TableOfContents = ({ items, activeId }: { items: TableOfContentsItem[], activeId: string }) => {
  return (
    <nav className="space-y-2">
      <h3 className="text-xl font-semibold text-neutral-800 mb-4">Table of Contents</h3>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block text-sm py-1.5 pl-${(item.level - 1) * 4} ${
            activeId === item.id
              ? 'text-black-700 font-medium bg-neutral-50 rounded-md pl-3'
              : 'text-neutral-600 hover:text-black-700 hover:bg-neutral-50 rounded-md pl-3'
          } transition-all duration-200`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
};

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 z-50">
      <motion.div
        className="h-full bg-black-700"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default function BlogPostClient({ postId }: { postId: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeHeading, setActiveHeading] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // For demo purposes, using mock data
    const mockPost = {
      id: parseInt(postId),
      title: "The Future of Legal Consulting in a Digital World",
      content: `
        <h2>Introduction</h2>
        <p>The legal consulting landscape is undergoing a dramatic transformation in the digital age. As organizations across industries grapple with technological disruption, the role of legal consultants has evolved significantly.</p>

        <h2>Digital Transformation Impact</h2>
        <p>As organizations navigate the complexities of digital transformation, legal consultants must adapt their approaches and methodologies. The integration of digital technologies has become central to strategic planning and implementation.</p>

        <h3>Key Areas of Focus</h3>
        <ul>
          <li>Legal Tech Integration</li>
          <li>Digital Compliance</li>
          <li>Client Experience Enhancement</li>
          <li>Technology Risk Management</li>
        </ul>

        <h2>Emerging Trends in Legal Consulting</h2>
        <p>The consulting industry is witnessing several transformative trends that are reshaping how services are delivered and value is created for clients.</p>

        <h2>Conclusion</h2>
        <p>The future of legal consulting is intrinsically linked to digital innovation and transformation. Successful consultants will be those who can effectively blend traditional legal expertise with digital capabilities.</p>
      `,
      excerpt: "Explore how digital transformation is reshaping the landscape of legal consulting...",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        id: 1,
        name: "Jane Doe",
        role: "Senior Legal Consultant",
        image: "/team/attorney1.svg",
        bio: "Expert in legal technology and digital transformation with over 15 years of experience.",
        linkedin: "https://linkedin.com/in/janedoe",
        twitter: "https://twitter.com/janedoe"
      },
      tags: ["Legal Tech", "Digital Transformation", "Legal Innovation"],
      readTime: 8,
      coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
    };

    const mockRelatedPosts = [
      {
        id: 2,
        title: "The Evolution of Legal Tech",
        excerpt: "Understanding how technology is reshaping legal services...",
        content: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        coverImage: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80",
        author: {
          id: 2,
          name: "John Smith",
          role: "Legal Tech Specialist",
          image: "/team/attorney2.svg",
          bio: "Technology expert specializing in legal innovations"
        },
        readTime: 6,
        tags: ["Legal Tech", "Innovation"]
      },
      {
        id: 3,
        title: "Digital Transformation in Law",
        excerpt: "How digital transformation is changing legal practices...",
        content: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80",
        author: {
          id: 3,
          name: "Sarah Williams",
          role: "Digital Law Expert",
          image: "/team/attorney1.svg",
          bio: "Expert in digital legal transformation"
        },
        readTime: 7,
        tags: ["Digital Law", "Legal Tech"]
      }
    ];

    setPost(mockPost);
    setRelatedPosts(mockRelatedPosts);
    setIsLoading(false);
  }, [postId]);

  // Extract table of contents from content
  useEffect(() => {
    if (post?.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, 'text/html');
      const headings = Array.from(doc.querySelectorAll('h2, h3, h4'));
      
      const toc = headings.map(heading => ({
        id: heading.textContent?.toLowerCase().replace(/\s+/g, '-') ?? '',
        text: heading.textContent ?? '',
        level: parseInt(heading.tagName[1])
      }));

      setTableOfContents(toc);
    }
  }, [post?.content]);

  useEffect(() => {
    // Setup intersection observer for headings
    if (contentRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeading(entry.target.id);
            }
          });
        },
        { rootMargin: '-20% 0px -80% 0px' }
      );

      const headings = contentRef.current.querySelectorAll('h2, h3, h4');
      headings.forEach(heading => observer.observe(heading));

      return () => observer.disconnect();
    }
  }, [post?.content]);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black-700"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-20">
        <div className="text-center text-red-600 mb-6">{error || 'Blog post not found'}</div>
        <Link href="/blog" className="text-black-700 hover:text-black-600 font-medium">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-neutral-50">
      <ReadingProgress />
      
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-black-700/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 text-white/90 text-sm rounded-full backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Author Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-neutral-200">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-neutral-100">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-lg text-neutral-800">{post.author.name}</h2>
                  <p className="text-neutral-600 mb-2">{post.author.role}</p>
                  <div className="flex gap-4">
                    {post.author.twitter && (
                      <a
                        href={post.author.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-black-700 transition"
                      >
                        <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
                      </a>
                    )}
                    {post.author.linkedin && (
                      <a
                        href={post.author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-black-700 transition"
                      >
                        <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              ref={contentRef}
              className="bg-white rounded-lg shadow-lg p-8 prose prose-lg max-w-none border border-neutral-200
                prose-headings:text-neutral-800 
                prose-p:text-neutral-600 
                prose-a:text-black-700 prose-a:no-underline hover:prose-a:text-black-600
                prose-strong:text-neutral-800
                prose-ul:text-neutral-600
                prose-ol:text-neutral-600
                prose-li:marker:text-black-700
                prose-blockquote:border-l-black-700 prose-blockquote:text-neutral-700
                prose-hr:border-neutral-200"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-4 py-2 bg-neutral-100 text-neutral-700 hover:bg-black-700 hover:text-white rounded-md text-sm transition-colors duration-200 border border-neutral-200"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Share */}
            <div className="mt-8 flex items-center gap-4 bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
              <span className="font-medium text-neutral-800">Share this article:</span>
              <ShareButtons
                url={`${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${post.id}`}
                title={post.title}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-8">
              {/* Table of Contents */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
                <TableOfContents items={tableOfContents} activeId={activeHeading} />
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-black-700"></div>
                  <h3 className="text-xl font-semibold text-neutral-800">Related Articles</h3>
                </div>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.id}`}
                      className="block group"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={relatedPost.coverImage}
                            alt={relatedPost.title}
                            fill
                            className="object-cover rounded-md"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black-700/20 to-transparent rounded-md"></div>
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-black-700 transition-colors duration-200 line-clamp-2 text-neutral-800">
                            {relatedPost.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-2 text-sm text-neutral-500">
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                              {relatedPost.readTime} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
