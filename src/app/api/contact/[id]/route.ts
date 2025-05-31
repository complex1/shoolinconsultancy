import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { error: 'Access restricted' },
    { status: 403 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Contact submission updates are disabled' },
    { status: 403 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Contact submission deletion is disabled' },
    { status: 403 }
  );
}
