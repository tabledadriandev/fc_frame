/**
 * Image generation for Farcaster Frame using @vercel/og
 * Generates frame images and shareable result images
 */

import { ImageResponse } from '@vercel/og';
import { ScoreResult } from './types';

/**
 * Generate initial frame image
 */
export async function generateInitialFrameImage(): Promise<Response> {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #6B8E23, #4682B4, #E07A5F)',
          fontSize: 60,
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>🧬</div>
        <div>What's Your Longevity Score?</div>
        <div style={{ fontSize: 32, fontWeight: 'normal', marginTop: 20, opacity: 0.9 }}>
          Take the 2-minute science-backed assessment
        </div>
        <div style={{ fontSize: 28, fontWeight: 'normal', marginTop: 40, opacity: 0.8 }}>
          Tap to start →
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

/**
 * Generate question frame image
 */
export async function generateQuestionImage(
  questionNumber: number,
  totalQuestions: number,
  questionText: string,
  emoji: string
): Promise<Response> {
  const progress = (questionNumber / totalQuestions) * 100;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #6B8E23, #4682B4)',
          padding: '40px',
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 4,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: 'white',
              borderRadius: 4,
            }}
          />
        </div>

        {/* Question number */}
        <div style={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.7)', marginBottom: 40 }}>
          Question {questionNumber} of {totalQuestions}
        </div>

        {/* Emoji */}
        <div style={{ fontSize: 80, textAlign: 'center', marginBottom: 40 }}>{emoji}</div>

        {/* Question text */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          {questionText}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

/**
 * Generate results frame image
 */
export async function generateResultsImage(result: ScoreResult): Promise<Response> {
  // Determine gradient colors based on tier
  let gradientColors: string;
  if (result.tier === 'longevity-champion') {
    gradientColors = 'linear-gradient(to bottom right, #E5E4E2, #C0C0C0)';
  } else if (result.tier === 'thriving') {
    gradientColors = 'linear-gradient(to bottom right, #FFD700, #FFA500)';
  } else if (result.tier === 'good-foundation') {
    gradientColors = 'linear-gradient(to bottom right, #C0C0C0, #808080)';
  } else {
    gradientColors = 'linear-gradient(to bottom right, #CD7F32, #8B4513)';
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: gradientColors,
          padding: '40px',
        }}
      >
        {/* Badge */}
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            backgroundColor: result.badgeColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 40,
          }}
        >
          {result.badge}
        </div>

        {/* Score */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 30,
          }}
        >
          {result.score}/100
        </div>

        {/* Message */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.95)',
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: 1000,
          }}
        >
          {result.message}
        </div>

        {/* Buy CTA */}
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.85)',
            marginTop: 60,
          }}
        >
          Buy $TABLEDADRIAN on Clanker
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

/**
 * Generate shareable result image with score overlay
 */
export async function generateShareImage(
  score: number,
  tier: string,
  badge: string
): Promise<Response> {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #6B8E23, #4682B4, #E07A5F)',
          padding: '40px',
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 'bold', color: 'white', marginBottom: 40 }}>
          🧬 My Longevity Score
        </div>

        <div style={{ fontSize: 120, fontWeight: 'bold', color: 'white', marginBottom: 30 }}>
          {score}/100
        </div>

        <div style={{ fontSize: 36, color: 'white', marginBottom: 60 }}>{badge} Tier</div>

        <div style={{ fontSize: 28, color: 'rgba(255, 255, 255, 0.9)', marginBottom: 20 }}>
          Can you beat my score?
        </div>

        <div style={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.9)' }}>
          #Longevity #DeSci #TableDAdrian
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
