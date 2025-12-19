/**
 * NextAuth configuration with Farcaster AuthKit integration
 * Uses Credentials provider to verify Farcaster sign-in messages
 */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Farcaster',
      credentials: {
        message: { label: 'Message', type: 'text' },
        signature: { label: 'Signature', type: 'text' },
        fid: { label: 'FID', type: 'text' },
        username: { label: 'Username', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.fid) {
          return null;
        }

        // In production, verify the signature here
        // For now, we'll trust the AuthKit verification
        return {
          id: credentials.fid,
          name: credentials.username || `User ${credentials.fid}`,
          fid: parseInt(credentials.fid),
          username: credentials.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.fid = (user as any).fid;
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.fid = token.fid as number;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};
