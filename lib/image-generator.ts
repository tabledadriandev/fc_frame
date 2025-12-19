/**
 * Image generation for Farcaster Frame
 * Generates frame images and shareable result images
 */

import { createCanvas, loadImage, registerFont } from 'canvas';
import { ScoreResult } from './types';

// For production, you'd want to load custom fonts
// registerFont('./fonts/Inter-Bold.ttf', { family: 'Inter' });

/**
 * Generate initial frame image
 */
export async function generateInitialFrameImage(): Promise<Buffer> {
  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#6B8E23'); // Olive green
  gradient.addColorStop(0.5, '#4682B4'); // Ocean blue
  gradient.addColorStop(1, '#E07A5F'); // Terracotta

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 64px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🧬 What\'s Your Longevity Score?', width / 2, height / 2 - 80);

  // Subtitle
  ctx.font = '32px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('Take the 2-minute science-backed assessment', width / 2, height / 2 + 20);

  // CTA
  ctx.font = '28px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText('Tap to start →', width / 2, height / 2 + 100);

  return canvas.toBuffer('image/png');
}

/**
 * Generate question frame image
 */
export async function generateQuestionImage(
  questionNumber: number,
  totalQuestions: number,
  questionText: string,
  emoji: string
): Promise<Buffer> {
  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#6B8E23');
  gradient.addColorStop(1, '#4682B4');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Progress indicator
  const progress = questionNumber / totalQuestions;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0, 0, width * progress, 8);

  // Question number
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '24px Inter, system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`Question ${questionNumber} of ${totalQuestions}`, 60, 50);

  // Emoji
  ctx.font = '80px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(emoji, width / 2, height / 2 - 100);

  // Question text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 42px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  const maxWidth = width - 120;
  const words = questionText.split(' ');
  let line = '';
  let y = height / 2 + 20;

  words.forEach((word) => {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line, width / 2, y);
      line = word + ' ';
      y += 50;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line, width / 2, y);

  return canvas.toBuffer('image/png');
}

/**
 * Generate results frame image
 */
export async function generateResultsImage(result: ScoreResult): Promise<Buffer> {
  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Gradient background based on tier
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  
  if (result.tier === 'longevity-champion') {
    gradient.addColorStop(0, '#E5E4E2');
    gradient.addColorStop(1, '#C0C0C0');
  } else if (result.tier === 'thriving') {
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(1, '#FFA500');
  } else if (result.tier === 'good-foundation') {
    gradient.addColorStop(0, '#C0C0C0');
    gradient.addColorStop(1, '#808080');
  } else {
    gradient.addColorStop(0, '#CD7F32');
    gradient.addColorStop(1, '#8B4513');
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Badge
  ctx.fillStyle = result.badgeColor;
  ctx.beginPath();
  ctx.arc(width / 2, 150, 80, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(result.badge, width / 2, 160);

  // Score
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 96px Inter, system-ui, sans-serif';
  ctx.fillText(`${result.score}/100`, width / 2, 280);

  // Message
  ctx.font = '32px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  
  const messageWords = result.message.split(' ');
  let line = '';
  let y = 350;
  const maxWidth = width - 120;

  messageWords.forEach((word) => {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line, width / 2, y);
      line = word + ' ';
      y += 40;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line, width / 2, y);

  // Buy CTA text
  ctx.font = '24px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillText('Buy $TABLEDADRIAN on Clanker', width / 2, y + 60);

  return canvas.toBuffer('image/png');
}

/**
 * Generate shareable result image with score overlay
 */
export async function generateShareImage(
  score: number,
  tier: string,
  badge: string
): Promise<Buffer> {
  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#6B8E23');
  gradient.addColorStop(0.5, '#4682B4');
  gradient.addColorStop(1, '#E07A5F');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 56px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🧬 My Longevity Score', width / 2, 180);

  // Score
  ctx.font = 'bold 120px Inter, system-ui, sans-serif';
  ctx.fillText(`${score}/100`, width / 2, 320);

  // Tier
  ctx.font = '36px Inter, system-ui, sans-serif';
  ctx.fillText(`${badge} Tier`, width / 2, 400);

  // CTA
  ctx.font = '28px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('Can you beat my score?', width / 2, 480);
  ctx.fillText('#Longevity #DeSci #TableDAdrian', width / 2, 530);

  return canvas.toBuffer('image/png');
}
