import { NextRequest, NextResponse } from 'next/server';

// Static SEO data
const staticSeoData = {
  '/': {
    id: '1',
    page: '/',
    title: 'Shoolin Legal Consultancy | Premier Legal Services',
    description: 'Leading legal consultancy firm providing expert advice on corporate, litigation, intellectual property, and more.',
    keywords: 'legal consultancy, corporate law, litigation, IP law',
    image: '/images/home-hero.jpg'
  },
  '/about': {
    id: '2',
    page: '/about',
    title: 'About Us | Shoolin Legal Consultancy',
    description: 'Learn about our firm, our values, and our approach to legal services.',
    keywords: 'about us, legal team, law firm history, shoolin consultancy',
    image: '/images/about-hero.jpg'
  },
  '/services': {
    id: '3',
    page: '/services',
    title: 'Our Services | Shoolin Legal Consultancy',
    description: 'Comprehensive legal services for businesses and individuals.',
    keywords: 'legal services, corporate law, IP protection, litigation services',
    image: '/images/services-hero.jpg'
  }
};

// GET /api/seo?page=/about
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  if (!page) return NextResponse.json({ error: 'Missing page param' }, { status: 400 });
  
  // Return the SEO data for the requested page or a default
  const seoData = staticSeoData[page as keyof typeof staticSeoData] || {
    page: page,
    title: 'Shoolin Legal Consultancy',
    description: 'Expert legal services for all your needs',
    keywords: 'legal, consultancy, law firm',
    image: '/images/default.jpg'
  };
  
  return NextResponse.json(seoData, { status: 200 });
}

// POST /api/seo
export async function POST() {
  return NextResponse.json(
    { error: 'SEO updates are disabled' },
    { status: 403 }
  );
}
