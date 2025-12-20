import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/18784346-5924-4276-8272-05fff42c5347',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'middleware.ts:8',message:'Middleware called',data:{pathname,url:request.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  // Handle .well-known/farcaster.json requests
  if (pathname === '/.well-known/farcaster.json') {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/18784346-5924-4276-8272-05fff42c5347',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'middleware.ts:14',message:'Handling .well-known/farcaster.json request',data:{pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
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

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/18784346-5924-4276-8272-05fff42c5347',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'middleware.ts:48',message:'Returning manifest JSON from middleware',data:{manifestKeys:Object.keys(manifest)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

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
  matcher: [
    '/.well-known/:path*',
  ],
};
