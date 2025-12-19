/**
 * Image generation endpoint for frame images
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  generateInitialFrameImage,
  generateQuestionImage,
  generateResultsImage,
} from '@/lib/image-generator';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    let imageResponse: Response;

    if (type === 'initial') {
      imageResponse = await generateInitialFrameImage();
    } else if (type === 'question') {
      const num = parseInt(searchParams.get('num') || '1');
      const total = parseInt(searchParams.get('total') || '8');
      const text = searchParams.get('text') || '';
      const emoji = searchParams.get('emoji') || '🧬';
      
      imageResponse = await generateQuestionImage(num, total, text, emoji);
    } else if (type === 'results') {
      const score = parseInt(searchParams.get('score') || '0');
      const tier = searchParams.get('tier') || 'needs-attention';
      const badge = decodeURIComponent(searchParams.get('badge') || 'Bronze');
      
      const result = {
        score,
        tier: tier as any,
        message: '', // Will be set by getScoreResult
        tips: [],
        badge,
        badgeColor: tier === 'longevity-champion' ? '#E5E4E2' : 
                    tier === 'thriving' ? '#FFD700' :
                    tier === 'good-foundation' ? '#C0C0C0' : '#CD7F32',
      };
      
      imageResponse = await generateResultsImage(result);
    } else if (type === 'share') {
      const score = parseInt(searchParams.get('score') || '0');
      const tier = searchParams.get('tier') || 'needs-attention';
      const badge = decodeURIComponent(searchParams.get('badge') || 'Bronze');
      
      imageResponse = await generateShareImage(score, tier, badge);
    } else {
      // Default to initial
      imageResponse = await generateInitialFrameImage();
    }

    // Convert ImageResponse to NextResponse with proper headers
    const imageBuffer = await imageResponse.arrayBuffer();
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error: any) {
    console.error('Image generation error:', error);
    // Return a simple error image
    const errorImage = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    return new NextResponse(errorImage, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }
}
