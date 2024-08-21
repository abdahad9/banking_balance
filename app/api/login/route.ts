import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import your Prisma client

export async function POST(request: Request) {
    try {
    const { cardNumber } = await request.json();

    // Check if cardNumber exists in the database
    const user = await prisma.user.findUnique({
      where: { cardNumber },
    });

    if (user) {
      // Assuming successful login, create session or set a cookie here.
      // Example: You could return the user info or a success flag
      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          balance: user.balance
        }
      });
    } else {
      // If the card number is not found, send a 401 unauthorized response
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
