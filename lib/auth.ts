import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Custom logic to authenticate the user
        const user = { id: '1', name: 'John Doe', email: credentials?.email }; // ID is a string
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Assign the user's ID to the JWT token
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure session.user exists before trying to assign the id
      if (session.user) {
        session.user.id = token.id as string; // Assign the id from the token to the session user
      }
      return session;
    },
  },
};

// Add a declaration file for NextAuth to extend the user type
// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
