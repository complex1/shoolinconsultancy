// API route handler for statistics
import { NextResponse } from 'next/server';

// Static data instead of database
const staticStatistics = [
  {
    id: '1',
    title: 'Successful Cases',
    value: '1000+',
    icon: 'check-circle',
    order: 1
  },
  {
    id: '2',
    title: 'Client Satisfaction',
    value: '98%',
    icon: 'star',
    order: 2
  },
  {
    id: '3',
    title: 'Years of Experience',
    value: '25+',
    icon: 'calendar',
    order: 3
  },
  {
    id: '4',
    title: 'Expert Attorneys',
    value: '35+',
    icon: 'users',
    order: 4
  }
];

export async function GET() {
  try {
    return NextResponse.json(staticStatistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
