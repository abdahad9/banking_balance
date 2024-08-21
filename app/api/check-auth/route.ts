import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // You need to configure your auth options here
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    return NextResponse.json({ isLoggedIn: true });
  } else {
    return NextResponse.json({ isLoggedIn: false });
  }
}
1