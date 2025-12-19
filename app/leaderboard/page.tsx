/**
 * Leaderboard page - Top scores
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LeaderboardEntry {
  fid: number;
  username?: string;
  score: number;
  tier: string;
  badge: string;
  timestamp: string;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  async function fetchLeaderboard() {
    try {
      const response = await fetch('/api/leaderboard');
      if (response.ok) {
        const data = await response.json();
        setEntries(data.leaderboard || []);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6B8E23] via-[#4682B4] to-[#E07A5F] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6B8E23] via-[#4682B4] to-[#E07A5F] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">🏆 Leaderboard</h1>
            <Link
              href="/api/frame"
              className="px-6 py-3 bg-[#4682B4] hover:bg-[#3a6a9a] text-white rounded-lg transition-colors"
            >
              Take Quiz
            </Link>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">No scores yet!</p>
              <Link
                href="/api/frame"
                className="inline-block px-6 py-3 bg-[#4682B4] hover:bg-[#3a6a9a] text-white rounded-lg transition-colors"
              >
                Be the First
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <div
                  key={entry.fid}
                  className={`bg-gray-50 rounded-lg p-6 flex items-center gap-6 ${
                    index < 3 ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  <div className="text-3xl font-bold text-gray-400 w-12 text-center">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-bold text-gray-900">
                      {entry.username || `User ${entry.fid}`}
                    </div>
                    <div className="text-gray-600">
                      {entry.badge} Tier
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      {entry.score}/100
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/api/frame"
              className="text-[#4682B4] hover:underline"
            >
              ← Back to Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
