# Discord OAuth Configuration for Electron

This guide explains how to configure Discord OAuth2 authentication to work with the Electron desktop application.

## The Problem

When running the app in Electron development mode (`npm run electron:dev`), Discord OAuth authentication may fail after the user authorizes the app. This happens because:

1. The Electron app runs on `http://localhost:3222` (configured in your `.env.local`)
2. Discord redirects back to the callback URL after authorization
3. If the callback URL isn't configured in Discord's Developer Portal, the authentication fails

## Solution: Configure Discord Developer Portal

### Step 1: Access Discord Developer Portal

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Sign in with your Discord account
3. Select your application (or create a new one)

### Step 2: Add Redirect URLs

1. Navigate to **OAuth2** → **General** in the left sidebar
2. Scroll down to **Redirects** section
3. Add the following redirect URLs (click "+ Add Redirect"):

   ```
   http://localhost:3222/api/auth/callback/discord
   ```

   If you use different ports for development or production, add those as well:

   ```
   http://localhost:3000/api/auth/callback/discord
   http://localhost:3412/api/auth/callback/discord
   https://darkfloor.art/api/auth/callback/discord
   ```

4. Click **Save Changes** at the bottom of the page

### Step 3: Verify Environment Variables

Ensure your `.env.local` file has the correct Discord OAuth credentials:

```bash
# Discord OAuth (from Discord Developer Portal)
AUTH_DISCORD_ID=your_client_id_here
AUTH_DISCORD_SECRET=your_client_secret_here

# NextAuth configuration
AUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:3222

# Port configuration (must match NEXTAUTH_URL)
PORT=3222
```

**Important:** The `PORT` in your `.env.local` must match the port in `NEXTAUTH_URL` and the Discord redirect URL.

### Step 4: Test Authentication

1. Start the Electron app in development mode:
   ```bash
   npm run electron:dev
   ```

2. Click the "Sign In" button
3. Authorize the app on Discord
4. You should be redirected back to the app and logged in successfully

## Troubleshooting

### "Redirect URI Mismatch" Error

**Symptom:** After authorizing on Discord, you see an error about redirect URI mismatch.

**Solution:**
- Double-check that the redirect URL in Discord Developer Portal exactly matches: `http://localhost:3222/api/auth/callback/discord`
- Ensure the port number matches your `PORT` environment variable
- Make sure you clicked "Save Changes" in the Discord Developer Portal

### Authentication Works in Browser but Not in Electron

**Symptom:** Web version works, but Electron fails after OAuth redirect.

**Solution:**
- Verify `ELECTRON_BUILD=true` is set in your `.env.local`
- Check that cookies are being persisted (see [electron/main.cjs](./main.cjs) lines 398-418)
- Ensure the `partition: "persist:darkfloor-art"` is set in BrowserWindow webPreferences

### Cookies Not Persisting Between Sessions

**Symptom:** You have to log in every time you restart the app.

**Solution:**
- The app uses a persistent session partition (`persist:darkfloor-art`)
- Cookies are stored in: `%APPDATA%/Starchild/` (Windows) or `~/Library/Application Support/Starchild/` (macOS)
- Check that the app has write permissions to this directory
- Verify cookies are being flushed on quit (see [electron/main.cjs](./main.cjs) lines 476-482)

### Session Cleared on App Update

**Symptom:** After updating the Electron app, users are logged out.

**Solution:**
- This is normal behavior if the `userData` path changes
- To preserve sessions across updates, ensure:
  - The app name (`productName` in package.json) stays consistent
  - Don't change the `partition` name in webPreferences
  - Consider implementing a session migration script if needed

## Development vs Production

### Development Mode (`electron:dev`)
- Uses `.env.local` from project root
- Connects to dev server on `localhost:3222`
- DevTools enabled by default
- Hot reload enabled

### Production Mode (Packaged App)
- Uses `.env.local` copied to `.next/standalone/` directory
- Runs bundled Next.js server
- DevTools disabled (unless `ELECTRON_DEV_TOOLS=true`)
- No hot reload

**Important:** Both modes need the same Discord OAuth configuration in the Developer Portal.

## Security Notes

1. **Never commit** `.env.local` to version control
2. **Rotate secrets** regularly, especially `AUTH_SECRET`
3. **Use HTTPS** for production deployments (Discord requires HTTPS for production OAuth)
4. **Validate redirect URLs** - Discord only allows pre-configured URLs for security
5. **Enable rate limiting** on your authentication endpoints

## Related Files

- [electron/main.cjs](./main.cjs) - Session and cookie persistence
- [electron/preload.cjs](./preload.cjs) - IPC bridge
- [src/server/auth/index.ts](../src/server/auth/index.ts) - NextAuth configuration
- [.env.local](./.env.local) - Environment variables (not in git)

## Support

If you continue to experience issues:

1. Check the Electron console (DevTools) for error messages
2. Verify Discord Developer Portal configuration
3. Review the [NextAuth Discord Provider docs](https://next-auth.js.org/providers/discord)
4. Check the main process logs (run app from terminal to see logs)
