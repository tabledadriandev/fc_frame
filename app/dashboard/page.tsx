/**
 * User Dashboard - View past scores and statistics
 */

'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface UserScore {
  score: number;
  tier: string;
  badge: string;
  timestamp: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [scores, setScores] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [rank, setRank] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.fid) {
      fetchUserScores();
      fetchUserRank();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [session, status]);

  async function fetchUserScores() {
    try {
      const response = await fetch('/api/user/scores');
      if (response.ok) {
        const data = await response.json();
        setScores(data.scores || []);
      }
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserRank() {
    try {
      const response = await fetch('/api/user/rank');
      if (response.ok) {
        const data = await response.json();
        setRank(data.rank);
      }
    } catch (error) {
      console.error('Error fetching rank:', error);
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6B8E23] via-[#4682B4] to-[#E07A5F] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6B8E23] via-[#4682B4] to-[#E07A5F] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h1>
          <p className="text-gray-700 mb-6">
            Please sign in to view your dashboard and score history.
          </p>
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-3 bg-[#4682B4] hover:bg-[#3a6a9a] text-white rounded-lg transition-colors"
          >
            Sign In with Farcaster
          </Link>
        </div>
      </div>
    );
  }

  const bestScore = scores.length > 0 ? Math.max(...scores.map((s) => s.score)) : 0;
  const averageScore = scores.length > 0
    ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6B8E23] via-[#4682B4] to-[#E07A5F] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🧬 Your Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {session?.user?.username || session?.user?.name}!
              </p>
            </div>
            <Link
              href="/api/frame"
              className="px-6 py-3 bg-[#4682B4] hover:bg-[#3a6a9a] text-white rounded-lg transition-colors"
            >
              Take Quiz
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-gray-900">{bestScore}</div>
              <div className="text-gray-600">Best Score</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-gray-900">{averageScore}</div>
              <div className="text-gray-600">Average Score</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-gray-900">
                {rank ? `#${rank}` : '—'}
              </div>
              <div className="text-gray-600">Leaderboard Rank</div>
            </div>
          </div>

          {/* Score History */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Score History</h2>
            {scores.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">No scores yet!</p>
                <Link
                  href="/api/frame"
                  className="inline-block px-6 py-3 bg-[#4682B4] hover:bg-[#3a6a9a] text-white rounded-lg transition-colors"
                >
                  Take Your First Quiz
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {scores.map((score, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 flex justify-between items-center"
                  >
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {score.score}/100
                      </div>
                      <div className="text-gray-600">
                        {score.badge} Tier • {new Date(score.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(score.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 flex gap-4">
            <Link
              href="/leaderboard"
              className="flex-1 text-center px-6 py-3 bg-[#6B8E23] hover:bg-[#5a7a1d] text-white rounded-lg transition-colors"
            >
              View Leaderboard
            </Link>
            <Link
              href="/api/frame"
              className="flex-1 text-center px-6 py-3 border-2 border-[#4682B4] text-[#4682B4] hover:bg-[#4682B4] hover:text-white rounded-lg transition-colors"
            >
              Retake Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
