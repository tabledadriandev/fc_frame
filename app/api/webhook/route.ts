/**
 * Webhook endpoint for Farcaster Frame
 * Handles frame interactions and analytics
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log webhook data for analytics/debugging
    console.log('Frame webhook received:', {
      timestamp: new Date().toISOString(),
      data: body,
    });

    // Handle different webhook events
    // You can extend this to track analytics, update databases, etc.
    
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
