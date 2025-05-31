import { NextResponse } from 'next/server';

// Static testimonials data
const staticTestimonials = [
  {
    id: '1',
    name: 'Vikram Mehta',
    company: 'TechSolutions India',
    position: 'CEO',
    quote: 'Shoolin Consultancy provided exceptional legal guidance for our company during our expansion phase. Their expertise in corporate law was invaluable.',
    rating: 5,
    imageUrl: '/testimonials/person1.svg',
    featured: true,
    order: 1,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: '2',
    name: 'Anjali Desai',
    company: 'Global Innovations',
    position: 'Director',
    quote: "Working with Shoolin Consultancy on our intellectual property strategy has been a game-changer. Their team's knowledge and dedication is outstanding.",
    rating: 5,
    imageUrl: '/testimonials/person2.svg',
    featured: true,
    order: 2,
    createdAt: new Date('2025-02-10'),
    updatedAt: new Date('2025-02-10')
  },
  {
    id: '3',
    name: 'Rajeev Kumar',
    company: 'Pinnacle Enterprises',
    position: 'Managing Director',
    quote: 'Their litigation team delivered exceptional results in a complex commercial dispute. Professional, thorough, and strategic in their approach.',
    rating: 5,
    imageUrl: '/testimonials/person3.svg',
    featured: true,
    order: 3,
    createdAt: new Date('2025-03-05'),
    updatedAt: new Date('2025-03-05')
  }
];

export async function GET() {
  try {
    // Return static testimonials
    return NextResponse.json(staticTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Testimonial creation is disabled' },
    { status: 403 }
  );
}
