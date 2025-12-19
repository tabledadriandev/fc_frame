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

## Token Information

- **Name**: $TABLEDADRIAN
- **Chain**: Base
- **Contract**: `0xee47670a6ed7501aeeb9733efd0bf7d93ed3cb07`
- **Trading**: [Clanker](https://www.clanker.world/clanker/0xee47670a6ed7501aeeb9733efd0bf7d93ed3cb07)
- **Explorer**: [BaseScan](https://basescan.org/token/0xee47670a6ed7501aeeb9733efd0bf7d93ed3cb07)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Image Generation**: Canvas API (node-canvas)
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
3. Set environment variable `NEXT_PUBLIC_BASE_URL` to your Vercel domain
4. Deploy

### Cloudflare Pages

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Add environment variable `NEXT_PUBLIC_BASE_URL`
5. Deploy

**Note**: Cloudflare Pages may require additional configuration for Canvas API. Consider using a Node.js runtime or alternative image generation service.

## Frame URL

Once deployed, your frame URL will be:
```
https://your-domain.com/api/frame
```

Use this URL when creating a cast with your frame.

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
3. Test in browser:
   - Open frame URL in regular browser
   - Navigate to `/buy` page
   - Verify links work correctly

## Project Structure

```
ta_farcaster/
├── app/
│   ├── api/
│   │   └── frame/
│   │       ├── route.tsx          # Main frame handler
│   │       ├── image/route.ts     # Image generation endpoint
│   │       └── share/route.ts     # Share functionality
│   ├── buy/
│   │   └── page.tsx               # Buy landing page
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── lib/
│   ├── types.ts                   # TypeScript types
│   ├── quiz-data.ts               # Quiz questions and scoring
│   └── image-generator.ts         # Canvas image generation
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

## Troubleshooting

### Canvas API Issues

If you encounter Canvas API errors:

1. **Vercel**: Should work out of the box
2. **Cloudflare Pages**: May need Node.js runtime or alternative service
3. **Local Development**: Ensure `canvas` package is installed correctly

### Image Generation Errors

- Check that image URLs are accessible
- Verify `NEXT_PUBLIC_BASE_URL` is set correctly
- Check server logs for Canvas errors

### Frame Not Loading

- Verify frame URL is accessible
- Check Frame Validator for errors
- Ensure all meta tags are present
- Verify HTTPS is enabled (required for frames)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact the Table d'Adrian team.
