import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle .well-known/farcaster.json requests
  if (request.nextUrl.pathname === '/.well-known/farcaster.json') {
    const manifest = {
      miniapp: {
        version: "1",
        name: "Table d'Adrian BETA",
        homeUrl: "https://tabledadrian.xyz",
        iconUrl: "https://ibb.co/bgCPPncL",
        splashImageUrl: "https://ibb.co/bgCPPncL",
        splashBackgroundColor: "#6B8E23",
        webhookUrl: "https://tabledadrian.xyz/api/webhook",
        subtitle: "Discover longevity potential",
        description: "Take a science-backed assessment combining diet principles, biohacking protocols, and lifestyle factors to calculate your personalized longevity score.",
        primaryCategory: "health-fitness",
        screenshotUrls: [
          "https://ibb.co/PGftg2ty"
        ],
        heroImageUrl: "https://ibb.co/nqFdCGXj",
        tags: [
          "longevity",
          "health",
          "wellness",
          "biohacking",
          "desci"
        ],
        tagline: "Calculate your longevity score",
        ogTitle: "My Longevity Score Result",
        ogDescription: "Check your Table d'Adrian Longevity Score. Ticker is : tabledadrian",
        ogImageUrl: "https://ibb.co/nqFdCGXj",
        imageUrl: "https://tabledadrian.xyz/image.png",
        buttonTitle: "Take Assessment",
        requiredChains: [
          "eip155:8453"
        ],
        canonicalDomain: "tabledadrian.xyz"
      }
    };

    return NextResponse.json(manifest, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/.well-known/farcaster.json',
};
