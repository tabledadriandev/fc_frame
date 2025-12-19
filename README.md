# Longevity Score Calculator - Farcaster Frame v2

A Farcaster Frame v2 mini app that calculates users' longevity scores through an interactive 8-question quiz, provides personalized recommendations, and includes a buy CTA for $TABLEDADRIAN token.

## Features

- 🧬 **Interactive Quiz**: 8 science-backed questions about lifestyle, diet, sleep, and exercise
- 📊 **Real-time Scoring**: Calculates 0-100 longevity score with personalized tier classification
- 🎯 **Personalized Recommendations**: Actionable tips based on score ranges
- 🏆 **Tier System**: Bronze, Silver, Gold, and Platinum badges
- 📱 **Share Functionality**: Generate shareable images and pre-populated cast text
- 💰 **Buy CTA**: Direct link to purchase $TABLEDADRIAN on Clanker (Base chain)
- 🌐 **Landing Page**: Browser-friendly buy page when opened outside Farcaster
- 🔐 **User Authentication**: Farcaster AuthKit integration for user tracking
- 📈 **Dashboard**: View your score history and statistics
- 🏅 **Leaderboard**: See top performers

## Token Information

- **Name**: $TABLEDADRIAN
- **Chain**: Base
- **Contract**: `0xee47670a6ed7501aeeb9733efd0bf7d93ed3cb07`
- **Trading**: [Clanker](https://www.clanker.world/clanker/0xee47670a6ed7501aeeb9733efd0bf7d93ed3cb07)
- **Explorer**: [BaseScan](https://basescan.org/token/0xee47670a6ed7501aeeb9733efd0bf7d93ed3cb07)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Image Generation**: @vercel/og (Vercel Optimized)
- **Authentication**: Farcaster AuthKit + NextAuth.js
- **Styling**: Tailwind CSS
- **Frame Protocol**: Farcaster Frames v2

## Installation

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local and set:
# NEXT_PUBLIC_BASE_URL=https://your-domain.com
# NEXTAUTH_URL=https://your-domain.com
# NEXTAUTH_SECRET=your_secret_here (generate with: openssl rand -base64 32)
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_BASE_URL`: Your Vercel domain
   - `NEXTAUTH_URL`: Your Vercel domain
   - `NEXTAUTH_SECRET`: Generate a secret (use Vercel's environment variable generator)
4. Deploy

### Cloudflare Pages

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Add environment variables
5. Deploy

**Note**: For image generation, this project uses `@vercel/og` which works best on Vercel. For Cloudflare Pages, you may need to use an alternative.

## Frame URL

Once deployed, your frame URL will be:
```
https://your-domain.com/api/frame
```

Use this URL when creating a cast with your frame.

## Authentication Setup

This project uses Farcaster AuthKit for authentication. Users can sign in with their Farcaster account to:
- Track their score history
- View personalized dashboard
- See their leaderboard rank
- Get recommendations based on past scores

### AuthKit Configuration

The AuthKit is configured in `components/auth/AuthProvider.tsx`. Update the `config` object with your domain and RPC URL.

## Testing

### Frame Validator

Use the [Farcaster Frame Validator](https://warpcast.com/~/developers/frames) to test your frame:

1. Enter your frame URL: `https://your-domain.com/api/frame`
2. Check for validation errors
3. Test button interactions
4. Verify image generation

### Manual Testing

1. Create a cast with your frame URL
2. Test the quiz flow:
   - Start quiz
   - Answer all 8 questions
   - View results
   - Test share functionality
   - Test buy button (should redirect to Clanker)
3. Test authentication:
   - Visit `/auth/signin`
   - Sign in with Farcaster
   - View dashboard at `/dashboard`
   - Check leaderboard at `/leaderboard`
4. Test in browser:
   - Open frame URL in regular browser
   - Navigate to `/buy` page
   - Verify links work correctly

## Project Structure

```
ta_farcaster/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts          # NextAuth API route
│   │   ├── frame/
│   │   │   ├── route.tsx              # Main frame handler
│   │   │   ├── image/route.ts        # Image generation endpoint
│   │   │   └── share/route.ts        # Share functionality
│   │   ├── user/
│   │   │   ├── scores/route.ts       # User score history API
│   │   │   └── rank/route.ts         # User rank API
│   │   ├── leaderboard/route.ts      # Leaderboard API
│   │   └── webhook/route.ts          # Webhook endpoint
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx              # Sign in page
│   ├── dashboard/
│   │   └── page.tsx                  # User dashboard
│   ├── leaderboard/
│   │   └── page.tsx                  # Leaderboard page
│   ├── buy/
│   │   └── page.tsx                  # Buy landing page
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles
├── components/
│   └── auth/
│       ├── AuthProvider.tsx          # AuthKit provider
│       └── SignInButton.tsx          # Sign in button
├── lib/
│   ├── auth.ts                       # NextAuth configuration
│   ├── storage.ts                    # Score storage (in-memory)
│   ├── types.ts                      # TypeScript types
│   ├── quiz-data.ts                  # Quiz questions and scoring
│   └── image-generator.ts            # Image generation
├── types/
│   └── next-auth.d.ts                # NextAuth type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Customization

### Quiz Questions

Edit `lib/quiz-data.ts` to modify questions, options, or scoring:

```typescript
export const QUIZ_QUESTIONS: Question[] = [
  // Add or modify questions here
];
```

### Scoring Logic

Adjust point values and tier thresholds in `lib/quiz-data.ts`:

```typescript
export function getScoreResult(score: number): ScoreResult {
  // Modify tier thresholds and messages
}
```

### Storage

The current implementation uses in-memory storage. For production, replace `lib/storage.ts` with a database:

- PostgreSQL with Prisma
- MongoDB
- Vercel KV (Redis)
- Supabase

### Styling

- Colors: Edit `tailwind.config.ts` for Mediterranean color scheme
- Images: Modify `lib/image-generator.ts` for visual changes
- Landing Page: Edit `app/buy/page.tsx` for buy page styling

### Token Information

Update token details in:
- `app/api/frame/route.tsx` (CLANKER_URL, TOKEN_CONTRACT)
- `app/buy/page.tsx` (TOKEN_CONTRACT, CLANKER_URL, BASESCAN_URL)

## Frame Actions

The frame supports the following actions:

1. **post**: Standard frame interaction (quiz navigation, sharing)
2. **post_redirect**: Redirects to external URL (buy button)
3. **link**: Opens link in new tab (community link)

## Environment Variables

- `NEXT_PUBLIC_BASE_URL`: Your deployed domain (required)
  - Example: `https://longevity-frame.vercel.app`
  - Used for generating frame image URLs
- `NEXTAUTH_URL`: Your deployed domain (required)
  - Example: `https://longevity-frame.vercel.app`
- `NEXTAUTH_SECRET`: Random secret for NextAuth (required)
  - Generate with: `openssl rand -base64 32`

## Troubleshooting

### Image Generation Errors

- Check that image URLs are accessible
- Verify `NEXT_PUBLIC_BASE_URL` is set correctly
- Check server logs for errors

### Authentication Issues

- Verify `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are set
- Check that AuthKit config matches your domain
- Ensure RPC URL is correct (Optimism mainnet)

### Frame Not Loading

- Verify frame URL is accessible
- Check Frame Validator for errors
- Ensure all meta tags are present
- Verify HTTPS is enabled (required for frames)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact the Table d'Adrian team.
