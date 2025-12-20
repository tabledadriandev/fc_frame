# How to Generate NEXTAUTH_SECRET

The `NEXTAUTH_SECRET` is a random string used to encrypt JWT tokens and session data. Here are several ways to generate it:

## Method 1: Using Node.js (Recommended - Works on all platforms)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

This will output a random base64-encoded string like:
```
cg3+slnSgdHQ0nkyQQoCZcKU3GJ2eUQf7oGykS4AvzM=
```

## Method 2: Using OpenSSL (Linux/Mac/Git Bash)

```bash
openssl rand -base64 32
```

## Method 3: Using PowerShell (Windows)

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

## Method 4: Online Generator

You can also use an online tool like:
- https://generate-secret.vercel.app/32
- Or any secure random string generator

## Quick Copy-Paste for .env.local

After generating your secret, add it to your `.env.local` file:

```env
NEXTAUTH_SECRET=your_generated_secret_here
```

## Important Notes

1. **Never share your secret** - Keep it private
2. **Use different secrets for development and production**
3. **The secret should be at least 32 characters** (base64 encoded)
4. **If you lose your secret**, users will need to sign in again (sessions will be invalidated)

## Example .env.local

```env
NEXT_PUBLIC_BASE_URL=https://tabledadrian.xyz
NEXTAUTH_URL=https://tabledadrian.xyz
NEXTAUTH_SECRET=cg3+slnSgdHQ0nkyQQoCZcKU3GJ2eUQf7oGykS4AvzM=
```

Replace the secret above with your own generated secret!
