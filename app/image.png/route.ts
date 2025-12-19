/**
 * Default image endpoint for frame manifest
 * Returns the initial frame image
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateInitialFrameImage } from '@/lib/image-generator';

export async function GET(request: NextRequest) {
  try {
    const imageBuffer = await generateInitialFrameImage();
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
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
