/**
 * Share handler - Generates shareable cast text
 */

import { NextRequest, NextResponse } from 'next/server';
import { getScoreResult, getTopInsight } from '@/lib/quiz-data';
import { generateShareImage } from '@/lib/image-generator';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const score = parseInt(searchParams.get('score') || '0');
  const tier = searchParams.get('tier') || 'needs-attention';

  const result = getScoreResult(score);
  const insight = getTopInsight(tier as any, score);

  // Generate share image
  const shareImageUrl = `${BASE_URL}/api/frame/image?type=share&score=${score}&tier=${tier}&badge=${encodeURIComponent(result.badge)}`;

  // Share text for cast
  const shareText = `🧬 My Longevity Score: ${score}/100
I'm in the ${result.badge} category!

${insight}

Can you beat my score? 👇
${BASE_URL}/api/frame

#Longevity #DeSci #TableDAdrian`;

  // Return frame with share image
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${shareImageUrl}" />
        <meta property="og:image" content="${shareImageUrl}" />
        <meta property="fc:frame:button:1" content="Retake Quiz" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:button:1:target" content="${BASE_URL}/api/frame?state=start" />
        <meta property="fc:frame:button:2" content="Buy $TABLEDADRIAN on Clanker" />
        <meta property="fc:frame:button:2:action" content="post_redirect" />
        <meta property="fc:frame:button:2:target" content="https://www.clanker.world/clanker/0xee47670a6ed7501aeeb9733efd0bf7d93ed3cb07" />
        <meta property="fc:frame:post_url" content="${BASE_URL}/api/frame/share" />
        <title>Share Your Score 🧬</title>
      </head>
      <body>
        <h1>Share Your Longevity Score</h1>
        <p>Copy this text to share in your cast:</p>
        <pre>${shareText}</pre>
      </body>
    </html>
  `;

  return new NextResponse(frameHtml, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export async function POST(request: NextRequest) {
  // Handle button clicks from share screen
  const body = await request.json();
  const { untrustedData } = body;

  if (!untrustedData) {
    return NextResponse.redirect(new URL('/api/frame?state=start', BASE_URL));
  }

  const buttonIndex = untrustedData.buttonIndex;

  if (buttonIndex === 1) {
    // Retake quiz
    return NextResponse.redirect(new URL('/api/frame?state=start', BASE_URL));
  }

  // Default: redirect to start
  return NextResponse.redirect(new URL('/api/frame?state=start', BASE_URL));
}
