#!/usr/bin/env ts-node
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

// Parse command-line arguments
const args = process.argv.slice(2);
let username = '';
let name = '';
let password = '';
let role = 'admin';

// Extract values from arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith('--username=')) {
    username = arg.split('=')[1];
  } else if (arg.startsWith('--name=')) {
    name = arg.split('=')[1];
  } else if (arg.startsWith('--password=')) {
    password = arg.split('=')[1];
  } else if (arg.startsWith('--role=')) {
    role = arg.split('=')[1];
  }
}

// Create a readline interface for user input if needed
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt for input if not provided via command line
const prompt = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Main function to create a new admin user
async function createAdminUser() {
  try {
    // Prompt for any missing arguments
    if (!username) {
      username = await prompt('Username: ');
    }
    
    if (!name) {
      name = await prompt('Display Name: ');
    }
    
    if (!password) {
      password = await prompt('Password: ');
    }
    
    // Check if user already exists
    const existingUser = await prisma.adminUser.findUnique({
      where: { username }
    });
    
    if (existingUser) {
      console.error(`Error: User with username "${username}" already exists.`);
      process.exit(1);
    }
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create the user
    const newUser = await prisma.adminUser.create({
      data: {
        username,
        password: hashedPassword,
        name,
        role
      }
    });
    
    console.log(`Admin user ${username} created successfully!`);
    console.log(`ID: ${newUser.id}`);
    console.log(`Name: ${newUser.name}`);
    console.log(`Role: ${newUser.role}`);
  } catch (error) {
    console.error('Failed to create admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

// Create a password reset function
async function resetPassword() {
  try {
    // Check if the user exists
    if (!username) {
      username = await prompt('Username to reset password for: ');
    }
    
    const user = await prisma.adminUser.findUnique({
      where: { username }
    });
    
    if (!user) {
      console.error(`Error: User with username "${username}" not found.`);
      process.exit(1);
    }
    
    // Get the new password
    if (!password) {
      password = await prompt('New password: ');
    }
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Update the user's password
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });
    
    console.log(`Password for user ${username} reset successfully!`);
  } catch (error) {
    console.error('Failed to reset password:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

// Determine which operation to perform
const operation = args.find(arg => arg.startsWith('--operation='))?.split('=')[1] || 'create';

if (operation === 'reset-password') {
  resetPassword();
} else {
  createAdminUser();
}
