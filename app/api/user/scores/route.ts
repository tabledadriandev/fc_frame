/**
 * Get user's score history
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserScores } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.fid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const scores = await getUserScores(session.user.fid);

    return NextResponse.json({
      scores: scores.map((s) => ({
        score: s.score,
        tier: s.tier,
        badge: s.badge,
        timestamp: s.timestamp.toISOString(),
      })),
    });
  } catch (error: any) {
    console.error('Error fetching user scores:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
