/**
 * Quiz questions and scoring logic
 */

import { Question, ScoreResult, ScoreTier } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How many servings of vegetables do you eat daily?",
    emoji: "🥗",
    options: [
      { text: "0 servings", points: 0 },
      { text: "1-3 servings", points: 6 },
      { text: "4-6 servings", points: 10 },
      { text: "7+ servings", points: 13 },
    ],
  },
  {
    id: 2,
    text: "Hours of sleep per night?",
    emoji: "💤",
    options: [
      { text: "< 5 hours", points: 0 },
      { text: "5-6 hours", points: 4 },
      { text: "7-8 hours", points: 12 },
      { text: "9+ hours", points: 8 },
    ],
  },
  {
    id: 3,
    text: "Exercise frequency?",
    emoji: "🏃",
    options: [
      { text: "Never", points: 0 },
      { text: "1-2x/week", points: 6 },
      { text: "3-4x/week", points: 10 },
      { text: "Daily", points: 13 },
    ],
  },
  {
    id: 4,
    text: "Do you follow Mediterranean diet principles?",
    emoji: "🍇",
    options: [
      { text: "Never", points: 0 },
      { text: "Sometimes", points: 6 },
      { text: "Often", points: 10 },
      { text: "Always", points: 13 },
    ],
  },
  {
    id: 5,
    text: "Stress management practice?",
    emoji: "🧘",
    options: [
      { text: "None", points: 0 },
      { text: "Occasional", points: 4 },
      { text: "Regular", points: 10 },
      { text: "Daily", points: 13 },
    ],
  },
  {
    id: 6,
    text: "Social connections?",
    emoji: "👥",
    options: [
      { text: "Isolated", points: 0 },
      { text: "Few friends", points: 4 },
      { text: "Active social life", points: 10 },
      { text: "Strong community", points: 13 },
    ],
  },
  {
    id: 7,
    text: "Fasting habits?",
    emoji: "⏰",
    options: [
      { text: "Never", points: 0 },
      { text: "Occasional", points: 6 },
      { text: "Regular IF", points: 10 },
      { text: "Extended fasts", points: 12 },
    ],
  },
  {
    id: 8,
    text: "Supplement routine?",
    emoji: "💊",
    options: [
      { text: "None", points: 2 },
      { text: "Basic vitamins", points: 6 },
      { text: "Targeted stack", points: 10 },
      { text: "Biohacker protocol", points: 12 },
    ],
  },
];

/**
 * Calculate longevity score from answers
 */
export function calculateScore(answers: { questionId: number; answerIndex: number }[]): number {
  let totalPoints = 0;
  
  answers.forEach((answer) => {
    const question = QUIZ_QUESTIONS.find((q) => q.id === answer.questionId);
    if (question && question.options[answer.answerIndex]) {
      totalPoints += question.options[answer.answerIndex].points;
    }
  });

  // Convert to 0-100 scale (max possible points = 104)
  const maxPoints = QUIZ_QUESTIONS.reduce((sum, q) => {
    return sum + Math.max(...q.options.map((o) => o.points));
  }, 0);

  return Math.round((totalPoints / maxPoints) * 100);
}

/**
 * Get score tier and result details
 */
export function getScoreResult(score: number): ScoreResult {
  let tier: ScoreTier;
  let message: string;
  let tips: string[];
  let badge: string;
  let badgeColor: string;

  if (score >= 86) {
    tier = 'longevity-champion';
    message = "🏆 Longevity Champion! You're optimizing your health at the highest level.";
    tips = [
      "Maintain your current routine - you're doing exceptional!",
      "Consider sharing your strategies with the community",
      "Explore advanced biohacking protocols if interested",
    ];
    badge = "Platinum";
    badgeColor = "#E5E4E2";
  } else if (score >= 66) {
    tier = 'thriving';
    message = "✨ Thriving! You're on an excellent path to longevity.";
    tips = [
      "Focus on consistency in your current habits",
      "Add 1-2 more servings of vegetables daily",
      "Prioritize 7-8 hours of quality sleep",
    ];
    badge = "Gold";
    badgeColor = "#FFD700";
  } else if (score >= 41) {
    tier = 'good-foundation';
    message = "🌱 Good Foundation! You have solid habits to build upon.";
    tips = [
      "Aim for 5+ servings of vegetables daily",
      "Establish a regular exercise routine (3-4x/week)",
      "Practice stress management techniques daily",
    ];
    badge = "Silver";
    badgeColor = "#C0C0C0";
  } else {
    tier = 'needs-attention';
    message = "💪 Needs Attention - but every journey starts with awareness!";
    tips = [
      "Start with 2-3 servings of vegetables daily",
      "Aim for 7-8 hours of sleep consistently",
      "Begin with 2-3 exercise sessions per week",
    ];
    badge = "Bronze";
    badgeColor = "#CD7F32";
  }

  return {
    score,
    tier,
    message,
    tips,
    badge,
    badgeColor,
  };
}

/**
 * Get top insight for sharing
 */
export function getTopInsight(tier: ScoreTier, score: number): string {
  const insights = {
    'longevity-champion': `Scoring ${score}/100 puts you in the top tier of longevity optimization!`,
    'thriving': `With ${score}/100, you're thriving on your longevity journey!`,
    'good-foundation': `Your ${score}/100 score shows a solid foundation for longevity.`,
    'needs-attention': `Your ${score}/100 score is a great starting point for improvement!`,
  };

  return insights[tier];
}
