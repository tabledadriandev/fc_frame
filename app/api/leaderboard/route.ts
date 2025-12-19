/**
 * Get leaderboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');

    const leaderboard = await getLeaderboard(limit);

    return NextResponse.json({
      leaderboard: leaderboard.map((entry) => ({
        fid: entry.fid,
        username: entry.username,
        score: entry.score,
        tier: entry.tier,
        badge: entry.badge,
        timestamp: entry.timestamp.toISOString(),
      })),
    });
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
