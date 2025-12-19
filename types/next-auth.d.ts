/**
 * Type definitions for NextAuth with Farcaster
 */

import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      fid?: number;
      username?: string;
    };
  }

  interface User {
    fid?: number;
    username?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    fid?: number;
    username?: string;
  }
}
