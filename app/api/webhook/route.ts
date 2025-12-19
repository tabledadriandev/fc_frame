/**
 * Webhook endpoint for Farcaster Frame
 * Handles frame interactions and analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { saveUserScore } from '@/lib/storage';
import { calculateScore, getScoreResult } from '@/lib/quiz-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log webhook data for analytics/debugging
    console.log('Frame webhook received:', {
      timestamp: new Date().toISOString(),
      data: body,
    });

    // If webhook contains quiz completion data, save the score
    if (body.type === 'quiz_complete' && body.fid && body.answers) {
      const score = calculateScore(body.answers);
      const result = getScoreResult(score);
      
      await saveUserScore(
        body.fid,
        body.username,
        score,
        result.tier,
        result.badge,
        body.answers
      );
    }
    
    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Webhook received',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Webhook error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Invalid webhook payload',
      },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Health check endpoint
  return NextResponse.json(
    { 
      status: 'ok',
      service: 'Farcaster Frame Webhook',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
