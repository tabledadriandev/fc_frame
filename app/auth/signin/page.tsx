/**
 * Sign In page with Farcaster AuthKit
 */

'use client';

import { SignInButton } from '@/components/auth/SignInButton';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6B8E23] via-[#4682B4] to-[#E07A5F] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🧬 Sign In
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Connect with Farcaster
          </p>
          <p className="text-lg text-gray-600">
            Sign in to track your longevity scores and view your history
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <SignInButton />
          
          <p className="text-sm text-gray-600 text-center mt-4">
            By signing in, you'll be able to:
          </p>
          <ul className="text-sm text-gray-600 text-left space-y-2">
            <li>✓ Track your longevity scores over time</li>
            <li>✓ View your score history</li>
            <li>✓ Compare with others on the leaderboard</li>
            <li>✓ Get personalized recommendations</li>
          </ul>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            <a 
              href="/api/frame" 
              className="text-[#4682B4] hover:underline"
            >
              ← Back to Longevity Score Calculator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
