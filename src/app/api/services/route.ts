// API route handler for services
import { NextRequest, NextResponse } from 'next/server';

// Static services data
const staticServices = [
  {
    id: '1',
    title: 'Corporate Law',
    description: 'Comprehensive corporate legal services for businesses of all sizes.',
    content: '<p>Our corporate law services cover all aspects of business operations, from formation to dissolution. We provide strategic advice on corporate governance, mergers and acquisitions, joint ventures, and regulatory compliance.</p><p>Our team of experienced corporate attorneys helps businesses navigate complex legal landscapes while minimizing risks and maximizing opportunities.</p>',
    icon: 'corporate',
    slug: 'corporate-law',
    featured: true,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-04-15')
  },
  {
    id: '2',
    title: 'Intellectual Property',
    description: 'Protection for your innovations, creative works, and brand identity.',
    content: '<p>Our intellectual property practice helps clients protect their valuable IP assets. We handle patent applications, trademark registrations, copyright filings, and trade secret protection strategies.</p><p>We also provide enforcement services, including litigation for infringement cases and negotiation of licensing agreements.</p>',
    icon: 'ip',
    slug: 'intellectual-property',
    featured: true,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-04-20')
  },
  {
    id: '3',
    title: 'Litigation',
    description: 'Robust representation in court proceedings and dispute resolution.',
    content: '<p>Our litigation team represents clients in a wide range of disputes across various forums. We handle civil litigation, commercial disputes, arbitration proceedings, and mediation services.</p><p>Our attorneys are known for their strategic approach, thorough preparation, and skilled advocacy in both trial and appellate courts.</p>',
    icon: 'litigation',
    slug: 'litigation',
    featured: true,
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-04-22')
  }
];

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    
    // If slug is provided, fetch a single service
    if (slug) {
      const service = staticServices.find(service => service.slug === slug);
      
      if (!service) {
        return NextResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(service);
    }
    
    // Otherwise, fetch all services
    const featuredOnly = searchParams.get('featured') === 'true';
    
    // Filter services based on featured flag if needed
    const services = featuredOnly 
      ? staticServices.filter(service => service.featured)
      : staticServices;
    
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Service creation is disabled' },
    { status: 403 }
  );
}
