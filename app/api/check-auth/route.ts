import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // Make sure this is correctly configured
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (session) {
      // User is authenticated
      return NextResponse.json({ isLoggedIn: true });
    } else {
      // User is not authenticated
      return NextResponse.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error('Error retrieving session:', error);
    // Return an error response
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
