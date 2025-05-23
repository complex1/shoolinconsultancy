// This file provides pre-configured imports for API routes using Prisma
// It ensures consistent runtime configuration and error handling

import { PrismaClient } from '../generated/prisma';
import { NextResponse } from 'next/server';

// Create a singleton Prisma client instance
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// In development, we want to avoid multiple instances during hot reloading
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const runtime = 'nodejs';

// Helper function for handling API errors
export function handleApiError(error: unknown, customMessage = 'API Error') {
  console.error(`${customMessage}:`, error);
  
  return NextResponse.json(
    { error: 'Something went wrong, please try again' },
    { status: 500 }
  );
}

export default prisma;
