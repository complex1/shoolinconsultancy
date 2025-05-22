// This file is used to instantiate the Prisma client with logging and connection management
import { PrismaClient } from '../generated/prisma'

// Global declarations to avoid multiple client instances in dev
declare global {
  // Using var here is intentional for global scope
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Create a singleton Prisma client instance
export const prisma = 
  global.prisma || 
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

// In development, we want to avoid multiple instances during hot reloading
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma
