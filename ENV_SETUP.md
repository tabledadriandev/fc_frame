# Environment Variables Setup

Create a `.env.local` file in the root of `ta_farcaster` directory with the following variables:

## ⚠️ Important: Different Values for Local vs Production

**You need TWO sets of environment variables:**
1. **Local (`.env.local` file)**: For development on your machine
2. **Production (Vercel Dashboard)**: For your deployed app

**They MUST have different values**, especially:
- Different URLs (localhost vs your domain)
- **Different secrets** (security best practice)

## Required Environment Variables

```env
# Base URL for your deployed application
# For local development: http://localhost:3000
# For production: https://fc-frame-gamma.vercel.app
NEXT_PUBLIC_BASE_URL=https://fc-frame-gamma.vercel.app

# NextAuth Configuration
# Must match your deployed domain (same as NEXT_PUBLIC_BASE_URL)
NEXTAUTH_URL=https://fc-frame-gamma.vercel.app

# NextAuth Secret - Generate a random secret
# Generate with: openssl rand -base64 32
# Or use: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
NEXTAUTH_SECRET=your_generated_secret_here
```

## Local vs Production - Side by Side Comparison

**IMPORTANT: These values MUST differ between local and production!**

### Local Development (`.env.local` file)

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_local_dev_secret_here
```

### Production (Vercel Environment Variables)

```env
NEXT_PUBLIC_BASE_URL=https://fc-frame-gamma.vercel.app
NEXTAUTH_URL=https://fc-frame-gamma.vercel.app
NEXTAUTH_SECRET=your_production_secret_here
```

**Key Differences:**
- **URLs**: Local uses `http://localhost:3000`, Production uses `https://fc-frame-gamma.vercel.app`
- **Secrets**: **MUST be different** - Generate separate secrets for security
- **Protocol**: Local uses `http://`, Production uses `https://`

## Generating NEXTAUTH_SECRET

### Option 1: Using OpenSSL (Recommended)
```bash
openssl rand -base64 32
```

### Option 2: Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Option 3: Using PowerShell (Windows)
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

## Production Deployment (Vercel)

When deploying to Vercel, add these environment variables in your Vercel project settings:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings → Environment Variables**
3. Add each variable (use **Production** environment):
   - `NEXT_PUBLIC_BASE_URL` = `https://fc-frame-gamma.vercel.app`
   - `NEXTAUTH_URL` = `https://fc-frame-gamma.vercel.app`
   - `NEXTAUTH_SECRET` = **(Generate a NEW secret - different from local!)**

### Quick Reference Table

| Variable | Local (`.env.local`) | Production (Vercel) |
|----------|---------------------|---------------------|
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | `https://fc-frame-gamma.vercel.app` |
| `NEXTAUTH_URL` | `http://localhost:3000` | `https://fc-frame-gamma.vercel.app` |
| `NEXTAUTH_SECRET` | Generate one secret | Generate a **different** secret |

## Important Notes

1. **Never commit `.env.local` to git** - It's already in `.gitignore`
2. **Use different secrets for development and production**
3. **NEXTAUTH_URL must match your actual domain** - This is critical for authentication to work
4. **For local development**, you can use `http://localhost:3000`
5. **For production**, always use `https://` URLs

## Verification

After setting up your environment variables:

1. Restart your development server: `npm run dev`
2. Check that the app loads without errors
3. Try visiting `/auth/signin` to test authentication
4. Check browser console for any environment variable errors

## Troubleshooting

### "NEXTAUTH_SECRET is not set"
- Make sure `.env.local` exists in the root directory
- Restart your dev server after creating/modifying `.env.local`
- Verify the variable name is exactly `NEXTAUTH_SECRET` (case-sensitive)

### "NEXTAUTH_URL mismatch"
- Ensure `NEXTAUTH_URL` matches your actual domain
- For Vercel, use the exact domain from your deployment
- Don't include trailing slashes

### Authentication not working
- Verify all three variables are set
- Check that `NEXTAUTH_URL` uses `https://` in production
- Ensure the domain matches exactly (no www vs non-www mismatch)
