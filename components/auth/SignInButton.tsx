/**
 * Sign In with Farcaster button component
 */

'use client';

import { SignInButton as AuthKitSignInButton, useProfile } from '@farcaster/auth-kit';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

export function SignInButton() {
  const { data: session, status } = useSession();
  const { isAuthenticated, profile } = useProfile();

  // Sync AuthKit authentication with NextAuth
  useEffect(() => {
    if (isAuthenticated && profile && !session) {
      // User is authenticated with AuthKit but not with NextAuth
      // Sign in to NextAuth with the profile data
      signIn('credentials', {
        fid: profile.fid?.toString(),
        username: profile.username?.value,
        message: '',
        signature: '',
        redirect: false,
      });
    }
  }, [isAuthenticated, profile, session]);

  if (status === 'loading') {
    return (
      <button
        disabled
        className="px-6 py-3 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  if (session || isAuthenticated) {
    const displayName = session?.user?.username || profile?.username?.value || session?.user?.name || 'User';
    
    return (
      <div className="flex items-center gap-4">
        <span className="text-gray-700">
          Signed in as {displayName}
        </span>
        <button
          onClick={() => {
            signOut();
            window.location.reload();
          }}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <AuthKitSignInButton
      onSuccess={async (message) => {
        // AuthKit handles the authentication
        // We'll sync with NextAuth in the useEffect
        window.location.reload();
      }}
    />
  );
}
