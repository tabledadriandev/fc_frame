/**
 * Serve Farcaster manifest file
 */

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/18784346-5924-4276-8272-05fff42c5347',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/farcaster-manifest/route.ts:10',message:'API route GET called',data:{url:request.url,method:request.method,headers:Object.fromEntries(request.headers.entries())},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
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
  fetch('http://127.0.0.1:7242/ingest/18784346-5924-4276-8272-05fff42c5347',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/farcaster-manifest/route.ts:46',message:'Returning manifest JSON response',data:{manifestKeys:Object.keys(manifest),responseStatus:200},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
