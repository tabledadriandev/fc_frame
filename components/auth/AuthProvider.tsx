/**
 * AuthKit Provider for Farcaster authentication
 */

'use client';

import '@farcaster/auth-kit/styles.css';
import { AuthKitProvider } from '@farcaster/auth-kit';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const config = {
  // For production, use your domain
  // For development, use localhost
  domain: typeof window !== 'undefined' ? window.location.hostname : 'localhost',
  siweUri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  rpcUrl: 'https://mainnet.optimism.io', // Optimism RPC for Farcaster
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <AuthKitProvider config={config}>
        {children}
      </AuthKitProvider>
    </SessionProvider>
  );
}
