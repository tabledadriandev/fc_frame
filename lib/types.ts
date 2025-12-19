/**
 * Type definitions for Longevity Score Calculator
 */

export interface QuizAnswer {
  questionId: number;
  answerIndex: number;
  points: number;
}

export interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  score?: number;
  tier?: ScoreTier;
}

export type ScoreTier = 'needs-attention' | 'good-foundation' | 'thriving' | 'longevity-champion';

export interface Question {
  id: number;
  text: string;
  emoji: string;
  options: {
    text: string;
    points: number;
  }[];
}

export interface ScoreResult {
  score: number;
  tier: ScoreTier;
  message: string;
  tips: string[];
  badge: string;
  badgeColor: string;
}

export interface ShareData {
  score: number;
  tier: ScoreTier;
  badge: string;
  topInsight: string;
}
