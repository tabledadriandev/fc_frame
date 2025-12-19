/**
 * Simple in-memory storage for user scores
 * In production, replace with a database (PostgreSQL, MongoDB, etc.)
 */

interface UserScore {
  fid: number;
  username?: string;
  score: number;
  tier: string;
  badge: string;
  answers: { questionId: number; answerIndex: number }[];
  timestamp: Date;
}

// In-memory storage (replace with database in production)
const scores: UserScore[] = [];

export async function saveUserScore(
  fid: number,
  username: string | undefined,
  score: number,
  tier: string,
  badge: string,
  answers: { questionId: number; answerIndex: number }[]
): Promise<void> {
  scores.push({
    fid,
    username,
    score,
    tier,
    badge,
    answers,
    timestamp: new Date(),
  });
}

export async function getUserScores(fid: number): Promise<UserScore[]> {
  return scores.filter((s) => s.fid === fid).sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );
}

export async function getLeaderboard(limit: number = 10): Promise<UserScore[]> {
  // Get the highest score for each user
  const userBestScores = new Map<number, UserScore>();
  
  scores.forEach((score) => {
    const existing = userBestScores.get(score.fid);
    if (!existing || score.score > existing.score) {
      userBestScores.set(score.fid, score);
    }
  });

  return Array.from(userBestScores.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export async function getUserRank(fid: number): Promise<number> {
  const leaderboard = await getLeaderboard(1000);
  const userIndex = leaderboard.findIndex((s) => s.fid === fid);
  return userIndex >= 0 ? userIndex + 1 : -1;
}
