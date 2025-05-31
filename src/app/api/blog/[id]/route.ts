import { NextRequest, NextResponse } from 'next/server';

// Static blog post data
const staticBlogPosts = [
  {
    id: '1',
    title: 'Understanding the New Corporate Tax Laws',
    excerpt: 'A guide to navigating the latest corporate tax regulations in India.',
    content: '<p>Corporate tax laws in India have undergone significant changes in recent years. This article explores the key modifications and their implications for businesses operating in the country.</p><p>The Finance Act of 2023 introduced several amendments to the corporate tax structure, including changes to tax rates, depreciation allowances, and exemptions available to different categories of companies.</p><p>One of the most notable changes is the reduced corporate tax rate of 22% for existing companies that forego certain exemptions and incentives. This has been implemented to simplify the tax code and enhance compliance.</p>',
    slug: 'understanding-corporate-tax-laws',
    imageUrl: '/images/blog/corporate-tax.jpg',
    author: {
      id: '1',
      name: 'Rajesh Kumar',
      role: 'Senior Partner, Taxation',
      imageUrl: '/team/attorney1.svg'
    },
    createdAt: new Date('2025-05-15'),
    updatedAt: new Date('2025-05-15'),
    tags: ['Corporate Law', 'Taxation', 'Finance']
  },
  {
    id: '2',
    title: 'Intellectual Property Rights for Startups',
    excerpt: 'Protecting your innovations in the early stages of your business.',
    content: '<p>For startups, intellectual property often constitutes the core asset of the business. Understanding how to protect these assets early on can be crucial for long-term success.</p><p>This article covers the essential IP protection strategies that every startup should consider, including patents, trademarks, copyrights, and trade secrets.</p><p>We also discuss common pitfalls to avoid and how to implement a cost-effective IP strategy when resources are limited.</p>',
    slug: 'intellectual-property-startups',
    imageUrl: '/images/blog/ip-rights.jpg',
    author: {
      id: '2',
      name: 'Priya Sharma',
      role: 'Head of IP Practice',
      imageUrl: '/team/attorney2.svg'
    },
    createdAt: new Date('2025-05-10'),
    updatedAt: new Date('2025-05-12'),
    tags: ['Intellectual Property', 'Startups', 'Business Law']
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    // Find the post with the matching ID
    const post = staticBlogPosts.find(post => post.id === id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Blog post updates are disabled' },
    { status: 403 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Blog post deletion is disabled' },
    { status: 403 }
  );
}
