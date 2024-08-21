import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  // Example logic to get balance for the logged-in user
  const user = await prisma.user.findUnique({
    where: { email: 'example@example.com' }, // Replace with actual user identification logic
  });

  return NextResponse.json({ balance: user?.balance || 0 });
}
