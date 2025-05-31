import { NextResponse } from 'next/server';

// Static blog post data
const staticBlogPosts = [
  {
    id: '1',
    title: 'Understanding the New Corporate Tax Laws',
    excerpt: 'A guide to navigating the latest corporate tax regulations in India.',
    content: '<p>Corporate tax laws in India have undergone significant changes in recent years...</p>',
    slug: 'understanding-corporate-tax-laws',
    imageUrl: '/images/blog/corporate-tax.jpg',
    authorId: '1',
    createdAt: new Date('2025-05-15'),
    updatedAt: new Date('2025-05-15'),
    tags: ['Corporate Law', 'Taxation', 'Finance']
  },
  {
    id: '2',
    title: 'Intellectual Property Rights for Startups',
    excerpt: 'Protecting your innovations in the early stages of your business.',
    content: '<p>For startups, intellectual property often constitutes the core asset of the business...</p>',
    slug: 'intellectual-property-startups',
    imageUrl: '/images/blog/ip-rights.jpg',
    authorId: '2',
    createdAt: new Date('2025-05-10'),
    updatedAt: new Date('2025-05-12'),
    tags: ['Intellectual Property', 'Startups', 'Business Law']
  }
];

export async function GET() {
  try {
    // Return static blog posts
    const formattedPosts = staticBlogPosts;
    
    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    return NextResponse.json(
      { error: 'Blog post creation is disabled' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
