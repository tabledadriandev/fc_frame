/**
 * Farcaster Frame v2 - Longevity Score Calculator
 * Main frame route handler
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { QUIZ_QUESTIONS, calculateScore, getScoreResult } from '@/lib/quiz-data';
import { saveUserScore } from '@/lib/storage';
import {
  generateInitialFrameImage,
  generateQuestionImage,
  generateResultsImage,
} from '@/lib/image-generator';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tabledadrian.xyz';
const CLANKER_URL = 'https://www.clanker.world/clanker/0xee47670a6ed7501aeeb9733efd0bf7d93ed3cb07';
const TOKEN_CONTRACT = '0xee47670a6ed7501aeeb9733efd0bf7d93ed3cb07';

export const dynamic = 'force-dynamic';

/**
 * GET handler - Returns frame HTML
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get('state') || 'start';

  // Parse state
  let currentQuestion = 0;
  let answers: { questionId: number; answerIndex: number }[] = [];

  if (state !== 'start' && state !== 'results') {
    try {
      const decoded = JSON.parse(Buffer.from(state, 'base64').toString());
      currentQuestion = decoded.currentQuestion || 0;
      answers = decoded.answers || [];
    } catch (e) {
      // Invalid state, start over
      currentQuestion = 0;
      answers = [];
    }
  }

  // Determine which image to show
  let imageUrl: string;
  let buttons: Array<{ label: string; action: string; target?: string }> = [];

  if (state === 'start' || state === 'results') {
    // Initial frame or results
    if (state === 'results') {
      // Get score from state data or calculate from answers
      let score = 0;
      const stateData = searchParams.get('stateData');
      if (stateData) {
        try {
          const decoded = JSON.parse(Buffer.from(stateData, 'base64').toString());
          score = decoded.score || calculateScore(decoded.answers || []);
          answers = decoded.answers || [];
        } catch (e) {
          score = calculateScore(answers);
        }
      } else {
        score = calculateScore(answers);
      }
      
      const result = getScoreResult(score);
      imageUrl = `${BASE_URL}/api/frame/image?type=results&score=${score}&tier=${result.tier}&badge=${encodeURIComponent(result.badge)}`;
      
      buttons = [
        { label: 'Buy $TABLEDADRIAN on Clanker', action: 'post_redirect', target: CLANKER_URL },
        { label: 'Share My Score', action: 'post', target: `${BASE_URL}/api/frame/share?score=${score}&tier=${result.tier}&badge=${encodeURIComponent(result.badge)}` },
        { label: 'Retake Quiz', action: 'post', target: `${BASE_URL}/api/frame?state=start` },
      ];
    } else {
      imageUrl = `${BASE_URL}/api/frame/image?type=initial`;
      buttons = [
        { label: 'Start Quiz', action: 'post', target: `${BASE_URL}/api/frame?state=q1` },
      ];
    }
  } else {
    // Question frame
    const questionNum = parseInt(state.replace('q', '')) || 1;
    const question = QUIZ_QUESTIONS[questionNum - 1];
    
    if (question) {
      imageUrl = `${BASE_URL}/api/frame/image?type=question&num=${questionNum}&total=${QUIZ_QUESTIONS.length}&text=${encodeURIComponent(question.text)}&emoji=${encodeURIComponent(question.emoji)}`;
      
      buttons = question.options.map((option, idx) => ({
        label: option.text,
        action: 'post',
        target: `${BASE_URL}/api/frame/answer?question=${questionNum}&answer=${idx}&state=${encodeURIComponent(state)}`,
      }));
    } else {
      // Quiz complete, show results
      const score = calculateScore(answers);
      const result = getScoreResult(score);
      imageUrl = `${BASE_URL}/api/frame/image?type=results&score=${score}&tier=${result.tier}&badge=${encodeURIComponent(result.badge)}`;
      
      buttons = [
        { label: 'Buy $TABLEDADRIAN on Clanker', action: 'post_redirect', target: CLANKER_URL },
        { label: 'Share My Score', action: 'post', target: `${BASE_URL}/api/frame/share?score=${score}&tier=${result.tier}&badge=${encodeURIComponent(result.badge)}` },
        { label: 'Retake Quiz', action: 'post', target: `${BASE_URL}/api/frame?state=start` },
      ];
    }
  }

  // Build frame HTML
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="og:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="${buttons[0]?.label || ''}" />
        ${buttons[0]?.action === 'link' ? `<meta property="fc:frame:button:1:action" content="link" />` : ''}
        ${buttons[0]?.action === 'post_redirect' ? `<meta property="fc:frame:button:1:action" content="post_redirect" />` : ''}
        ${buttons[0]?.target ? `<meta property="fc:frame:button:1:target" content="${buttons[0].target}" />` : ''}
        ${buttons[1] ? `<meta property="fc:frame:button:2" content="${buttons[1].label}" />` : ''}
        ${buttons[1]?.action === 'link' ? `<meta property="fc:frame:button:2:action" content="link" />` : ''}
        ${buttons[1]?.action === 'post_redirect' ? `<meta property="fc:frame:button:2:action" content="post_redirect" />` : ''}
        ${buttons[1]?.target ? `<meta property="fc:frame:button:2:target" content="${buttons[1].target}" />` : ''}
        ${buttons[2] ? `<meta property="fc:frame:button:3" content="${buttons[2].label}" />` : ''}
        ${buttons[2]?.action === 'link' ? `<meta property="fc:frame:button:3:action" content="link" />` : ''}
        ${buttons[2]?.action === 'post_redirect' ? `<meta property="fc:frame:button:3:action" content="post_redirect" />` : ''}
        ${buttons[2]?.target ? `<meta property="fc:frame:button:3:target" content="${buttons[2].target}" />` : ''}
        <meta property="fc:frame:post_url" content="${BASE_URL}/api/frame" />
        <title>Longevity Score Calculator 🧬</title>
      </head>
      <body>
        <h1>Longevity Score Calculator</h1>
        <p>Take the 2-minute science-backed longevity assessment</p>
        <p><a href="/buy" style="color: #4682B4; text-decoration: underline;">Buy $TABLEDADRIAN</a></p>
      </body>
    </html>
  `;

  return new NextResponse(frameHtml, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

/**
 * POST handler - Processes frame interactions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData) {
      return NextResponse.redirect(new URL('/api/frame?state=start', BASE_URL));
    }

    const buttonIndex = untrustedData.buttonIndex;
    const url = new URL(untrustedData.url || `${BASE_URL}/api/frame`);

    // Handle answer submission
    if (url.searchParams.has('answer')) {
      const questionNum = parseInt(url.searchParams.get('question') || '0');
      const answerIndex = parseInt(url.searchParams.get('answer') || '0');
      const prevState = url.searchParams.get('state') || '';

      // Parse previous state
      let currentQuestion = 0;
      let answers: { questionId: number; answerIndex: number }[] = [];

      if (prevState && prevState !== 'start') {
        try {
          const decoded = JSON.parse(Buffer.from(prevState, 'base64').toString());
          currentQuestion = decoded.currentQuestion || 0;
          answers = decoded.answers || [];
        } catch (e) {
          // Invalid state
        }
      }

      // Add new answer
      answers.push({
        questionId: questionNum,
        answerIndex: answerIndex,
      });

      // Move to next question or show results
      const nextQuestion = questionNum + 1;
      
      if (nextQuestion > QUIZ_QUESTIONS.length) {
        // Quiz complete - show results
        const score = calculateScore(answers);
        const result = getScoreResult(score);
        
        // Save score if user is authenticated
        try {
          const session = await getServerSession(authOptions);
          if (session?.user?.fid) {
            await saveUserScore(
              session.user.fid,
              session.user.username,
              score,
              result.tier,
              result.badge,
              answers
            );
          }
        } catch (error) {
          // Don't fail if saving score fails
          console.error('Error saving user score:', error);
        }
        
        // Store answers in state for results screen
        const resultsState = Buffer.from(JSON.stringify({
          answers,
          score,
        })).toString('base64');
        
        const resultsUrl = new URL(`${BASE_URL}/api/frame`);
        resultsUrl.searchParams.set('state', 'results');
        resultsUrl.searchParams.set('stateData', resultsState);
        
        return NextResponse.redirect(resultsUrl);
      } else {
        // Next question
        const newState = Buffer.from(JSON.stringify({
          currentQuestion: nextQuestion,
          answers,
        })).toString('base64');

        const nextUrl = new URL(`${BASE_URL}/api/frame`);
        nextUrl.searchParams.set('state', `q${nextQuestion}`);
        nextUrl.searchParams.set('stateData', newState);

        return NextResponse.redirect(nextUrl);
      }
    }

    // Handle start quiz
    if (url.searchParams.get('state') === 'start' || buttonIndex === 1) {
      const nextUrl = new URL(`${BASE_URL}/api/frame`);
      nextUrl.searchParams.set('state', 'q1');
      return NextResponse.redirect(nextUrl);
    }

    // Default: redirect to start
    return NextResponse.redirect(new URL('/api/frame?state=start', BASE_URL));
  } catch (error: any) {
    console.error('Frame POST error:', error);
    return NextResponse.redirect(new URL('/api/frame?state=start', BASE_URL));
  }
}
