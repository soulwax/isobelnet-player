# 🌟 darkfloor.art

![darkfloor.art Icon](.github/assets/emily-the-strange-icon.png)

*An attempt at amodern full-stack music search & streaming interface.*

---

## ✨ Project Status

**Development Stage**: A mature, full-featured music streaming and discovery platform with advanced audio features, intelligent recommendations, and comprehensive user management. The application is production-ready with support for both web and desktop (Electron) deployment.

## 📋 Core Features

### Music Discovery & Search

- **Type-Safe Search**: Integrated search for tracks, albums, and artists via tRPC API
- **Real-Time Results**: Debounced search with instant results
- **Context Menus**: Right-click (or long-press) tracks for quick actions (play, queue, favorite, add to playlist)
- **Search History**: Track search queries for authenticated users
- **Deezer API Format**: Compatible with Deezer API response structure

### Audio Playback System

**Core Playback:**
- **HTML5 Audio API**: Primary playback engine with Web Audio API for advanced processing
- **Spotify-Style Queue**: Queue structure where `queue[0]` is the current track, `queue[1+]` are upcoming tracks
- **Playback Controls**:
  - Play/pause, skip forward/backward (10 seconds)
  - Variable playback speed (0.5x - 2.0x)
  - Volume control with mute
  - Repeat modes: none, one, all
  - Shuffle mode with original order restoration

**Queue Management:**
- **Multi-Select**: Keyboard and mouse selection for bulk operations
- **Drag & Drop**: Reorder tracks in queue
- **Queue Persistence**: Save and restore queue state (authenticated users)
- **Smart Queue**: Similarity-based recommendations (light mode available)
- **Queue History**: Track playback history
- **Save as Playlist**: Convert queue to playlist

### Audio Enhancement

**9-Band Equalizer:**
- Frequency bands: 31Hz, 62Hz, 125Hz, 250Hz, 500Hz, 1kHz, 2kHz, 4kHz, 8kHz, 16kHz
- 8 built-in presets (Rock, Pop, Jazz, Classical, Electronic, Hip-Hop, Vocal, Flat)
- Custom band adjustment with real-time processing
- Preset persistence for authenticated users
- Web Audio API integration for hardware-accelerated processing

**Audio Visualizers:**
- Multiple visualization types: Spectrum Analyzer, Waveform, Circular, Frequency Bands, Radial Spectrum, Spectral Waves, Particle System, Frequency Rings
- FlowFieldRenderer with 80+ visualization patterns
- KaleidoscopeRenderer for mirrored effects
- LightweightParticleBackground for performance
- Real-time audio-reactive visuals

### User Management

**Authentication:**
- **NextAuth.js**: Discord OAuth 2.0 authentication
- **Session Management**: Database-backed sessions (30-day expiry)
- **User Profiles**: Public/private profile settings with user hash URLs
- **Profile Pages**: Shareable user profiles at `/[userhash]`

**User Data:**
- **Playlists**: Create, edit, delete, and share playlists
- **Favorites**: Track favorite songs with auto-sync based on play count
- **Listening History**: Complete playback history with analytics
- **Equalizer Presets**: Save and manage custom equalizer configurations
- **User Preferences**: Smart queue settings, UI preferences, and more

### Responsive Design

**Mobile (<768px):**
- MobileHeader with hamburger menu and search
- Bottom navigation bar with swipeable panes
- MiniPlayer (bottom-stuck compact player)
- MobilePlayer (full-screen modal with gesture controls)
- Swipe gestures for navigation and seeking
- Pull-to-refresh functionality
- Touch-optimized controls with haptic feedback

**Desktop (≥768px):**
- Traditional header navigation
- Desktop player at bottom
- Keyboard shortcuts (Space, Arrow keys, M for mute, etc.)
- Drag-and-drop interactions
- Multi-select with Shift+Arrow keys

### Smart Features

- **Smart Queue**: Similarity-based track recommendations using Songbird API
- **Smart Mix**: Generate personalized mixes from seed tracks
- **Audio Analysis**: Spotify audio features integration
- **Similarity Filtering**: Adjustable similarity levels (strict, balanced, diverse)
- **Recommendation Caching**: Optimized recommendation fetching

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | Server-side rendering & routing |
| **Language** | TypeScript 5.9 | Type-safe development with strict mode |
| **UI Framework** | React 19 | Component library |
| **Styling** | TailwindCSS v4 | Utility-first CSS framework |
| **API Layer** | tRPC 11 | End-to-end type-safe API calls |
| **State Management** | TanStack Query 5 | Server state & caching |
| **State (Client)** | React Context | Global player & UI state |
| **Environment** | @t3-oss/env-nextjs | Type-safe environment configuration |
| **Authentication** | NextAuth.js 5 | OAuth 2.0 / Session management |
| **Database ORM** | Drizzle ORM 0.41 | PostgreSQL schema & queries |
| **Database** | PostgreSQL | Primary data store |
| **Audio Playback** | HTML5 Audio API | Native playback control |
| **Audio Processing** | Web Audio API | Equalizer & real-time effects |
| **Animation** | Framer Motion 12 | UI animations & transitions |
| **Desktop** | Electron 39 | Cross-platform desktop app |
| **Process Manager** | PM2 | Production deployment |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (for production use)

### Installation

1. **Clone & Install**

    ```bash
    git clone https://github.com/soulwax/starchild-music-frontend.git
    cd darkfloor-art
    npm install
    ```

2. **Environment Configuration**

    Create a `.env.local` file with required variables:

    ```yaml
    # NextAuth Configuration
    AUTH_SECRET=generate-with->npx auth secret
    AUTH_DISCORD_ID="your-discord-app-id"
    AUTH_DISCORD_SECRET="your-discord-app-secret"
    NEXTAUTH_URL="http://localhost:3222"  # Optional, auto-detected

    # Database Configuration
    DATABASE_URL="postgres://user:password@host:port/dbname?sslmode=require"
    DB_HOST="localhost"
    DB_PORT="5432"
    DB_ADMIN_USER="postgres"
    DB_ADMIN_PASSWORD="your-password"
    DB_NAME="songbird"
    DB_SSL_CA=""  # Optional: Path to SSL certificate (PEM format)

    # API Configuration
    NEXT_PUBLIC_API_URL="https://api.darkfloor.art/"  # Darkfloor API for search/streaming
    STREAMING_KEY="your-secure-stream-key"  # Optional: For authenticated streaming
    SONGBIRD_API_KEY=""  # Optional: For Songbird API recommendations
    NEXT_PUBLIC_SONGBIRD_API_URL="https://songbird.darkfloor.art/"  # Optional: Songbird API

    # Environment
    NODE_ENV="development"
    ```

    **Generate NextAuth Secret:**

    ```bash
    npx auth secret
    ```

3. **Database Setup**

    The application uses Drizzle ORM with PostgreSQL. Database configuration is handled via `drizzle.env.ts` (auto-generated from environment variables).

    **Initialize Database:**

    ```bash
    # Generate migration files
    npm run db:generate

    # Apply migrations
    npm run db:migrate

    # Or push schema directly (development)
    npm run db:push

    # Open Drizzle Studio (database GUI)
    npm run db:studio
    ```

4. **Run Development Server**

    ```bash
    # Standard development server (port 3222)
    npm run dev

    # Next.js dev server only
    npm run dev:next

    # Electron desktop app (development)
    npm run electron:dev
    ```

    Visit `http://localhost:3222` to see the application.

## 📁 Project Structure

```shell
src/
├── app/                    # Next.js App Router pages
│   ├── [userhash]/        # User profile pages
│   ├── album/             # Album detail pages
│   ├── artist/            # Artist detail pages
│   ├── library/           # User library (playlists, favorites)
│   ├── playlists/         # Playlist management
│   ├── api/               # API routes (NextAuth, health checks)
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
│
├── components/            # React components
│   ├── Player.tsx         # Basic audio player
│   ├── EnhancedPlayer.tsx # Advanced player with equalizer
│   ├── MobilePlayer.tsx   # Mobile-optimized player
│   ├── MiniPlayer.tsx     # Compact player bar
│   ├── Queue.tsx          # Queue management
│   ├── EnhancedQueue.tsx # Advanced queue with multi-select
│   ├── TrackCard.tsx      # Track display component
│   ├── AudioVisualizer.tsx # Audio visualization
│   ├── Equalizer.tsx      # 9-band equalizer
│   ├── Header.tsx         # Desktop header
│   ├── MobileHeader.tsx    # Mobile header
│   ├── MobileNavigation.tsx # Bottom navigation
│   └── visualizers/       # Visualization components
│
├── contexts/              # React Context providers
│   ├── AudioPlayerContext.tsx  # Global player state
│   ├── ToastContext.tsx        # Toast notifications
│   ├── MenuContext.tsx         # Menu state
│   └── TrackContextMenuContext.tsx # Context menu state
│
├── hooks/                 # Custom React hooks
│   ├── useAudioPlayer.ts  # Core audio player logic
│   ├── useEqualizer.ts    # Equalizer processing
│   ├── useMediaQuery.ts   # Responsive breakpoints
│   └── ...
│
├── server/                # Server-side code
│   ├── api/               # tRPC API layer
│   │   ├── routers/       # API route handlers
│   │   │   ├── music.ts   # Music search, playlists, recommendations
│   │   │   ├── equalizer.ts # Equalizer presets
│   │   │   ├── preferences.ts # User preferences
│   │   │   └── post.ts    # Example post router
│   │   ├── root.ts        # Root router
│   │   └── trpc.ts        # tRPC configuration
│   ├── auth/              # NextAuth configuration
│   ├── db/                # Database layer
│   │   ├── schema.ts      # Drizzle ORM schema
│   │   └── index.ts       # Database connection
│   └── services/          # Business logic
│
├── trpc/                  # tRPC client setup
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── config/                # Configuration files
├── constants/             # App constants
├── services/              # Client-side services
└── styles/                # Global styles
    └── globals.css        # TailwindCSS + custom styles
```

## 🎨 Design System

| Element | Description |
|---------|-------------|
| **Cards & Buttons** | Rounded corners, flat surfaces with accent borders/text |
| **Background** | Dark gradient with animated flow field patterns |
| **Typography** | Geist Sans font stack for crisp, accessible typography |
| **Animations** | Framer Motion with spring presets, CSS-based transitions |
| **Color Palette** | Orange and teal accents on dark backgrounds |

### Design Tokens

Available in `src/styles/globals.css`:

```css
:root {
  --color-text: #f5f1e8;          /* Off-white */
  --color-subtext: #a5afbf;       /* Light gray */
  --color-accent: #f4b266;        /* Orange */
  --color-secondary-accent: #58c6b1; /* Teal */
  --color-background: #0b1118;     /* Dark */
}
```

### Responsive Breakpoints

- **Mobile**: <768px
- **Tablet**: 768-1024px
- **Desktop**: ≥1024px

### Z-Index Hierarchy

- Content: 1-29
- MobileHeader, MiniPlayer: 50
- HamburgerMenu (backdrop + drawer): 60-61
- Full MobilePlayer modal: 98-99

## 🔌 API Architecture

### Backend APIs

The application uses two backend APIs for music operations:

#### 1. Darkfloor API (`https://api.darkfloor.art/`)

Primary API for music search and streaming.

**Endpoints:**
- `GET /music/search?q={query}` - Search for music tracks
- `GET /music/stream?trackId={id}&kbps={bitrate}` - Stream a music track

**Documentation:**
- Swagger UI available at [https://api.darkfloor.art/](https://api.darkfloor.art/)
- OpenAPI specification (JSON/YAML) available for download

#### 2. Songbird API (`https://songbird.darkfloor.art/`)

Advanced API that orchestrates Spotify, Last.fm, and Deezer for comprehensive music discovery, recommendations, playlist experimentation, and streaming.

**Features:**
- Music discovery across multiple sources
- Intelligent recommendations
- Playlist experimentation
- Streaming capabilities

**Documentation:**
- Swagger UI available at [https://songbird.darkfloor.art/](https://songbird.darkfloor.art/)
- OpenAPI specification (JSON/YAML) available for download
- Environment: Production
- Host: `https://songbird.darkfloor.art`
- Port: `3333`

### tRPC Type-Safe API

The application uses **tRPC** for end-to-end type safety from server to client. All API calls are type-safe with automatic TypeScript inference. The tRPC layer acts as a proxy to the backend APIs.

**Main Routers:**

1. **music.ts** - Music operations:
   - `search` - Search tracks, albums, artists (proxies to Darkfloor/Songbird API)
   - `getTrackById`, `getAlbumById`, `getArtistById` - Get details
   - `createPlaylist`, `addToPlaylist`, `removeFromPlaylist` - Playlist management
   - `getPlaylists`, `getPlaylistById` - Retrieve playlists
   - `addToFavorites`, `removeFromFavorites`, `getFavorites` - Favorites
   - `addToHistory`, `getHistory` - Listening history
   - `getRecommendations` - Track recommendations (uses Songbird API)
   - `saveQueueState`, `getQueueState` - Queue persistence
   - `getSmartQueueSettings` - Smart queue configuration

2. **equalizer.ts** - Equalizer presets:
   - `getPresets`, `savePreset`, `deletePreset`, `updatePreset`

3. **preferences.ts** - User preferences

**Usage Example:**

```typescript
import { api } from "@/trpc/react";

// In a React component
const { data: tracks } = api.music.search.useQuery({ query: "artist name" });
const addToPlaylist = api.music.addToPlaylist.useMutation();

// Call mutation
addToPlaylist.mutate({ playlistId: "123", trackId: 456 });
```

### API Integration Flow

**Search Flow:**
```
Frontend → tRPC (music.search) → Backend API (Darkfloor/Songbird) → Response
```

**Streaming Flow:**
```
Frontend → getStreamUrlById() → Backend API (/music/stream) → Audio Stream
```

**Stream URL Generation:**

Stream URLs are generated via `getStreamUrlById()` function:
```typescript
const streamUrl = getStreamUrlById(trackId.toString());
// Returns: `${NEXT_PUBLIC_API_URL}/music/stream?trackId=${trackId}&kbps=320`
// Or with key: `${NEXT_PUBLIC_API_URL}/music/stream?key=${STREAMING_KEY}&trackId=${trackId}`
```

**Supported Formats:**

The application expects JSON responses compatible with **Deezer API format**:

```json
{
  "data": [
    {
      "id": 123456,
      "title": "Track Name",
      "artist": {
        "id": 789,
        "name": "Artist Name"
      },
      "album": {
        "id": 456,
        "title": "Album Name",
        "cover": "https://..."
      },
      "preview": "https://...",
      "duration": 240
    }
  ]
}
```

## ⚖️ Legal & Licensing

### Important Notice

This project does **not** include or distribute copyrighted music. It is a frontend interface designed to work with legitimate, licensed music APIs.

**Backend APIs in Use:**

The application connects to two production backend APIs:

1. **Darkfloor API** ([https://api.darkfloor.art/](https://api.darkfloor.art/))
   - Provides music search and streaming endpoints
   - Handles track search and audio streaming

2. **Songbird API** ([https://songbird.darkfloor.art/](https://songbird.darkfloor.art/))
   - Orchestrates Spotify, Last.fm, and Deezer APIs
   - Provides music discovery, recommendations, and playlist features
   - Handles intelligent recommendations and multi-source data aggregation

Both APIs are production-ready and handle licensing compliance. The frontend communicates with these APIs through the tRPC layer for type-safe integration.

**Do not use this with unauthorized music sources.**

### License

This project is licensed under the **GPL-3.0 License**. See the LICENSE file for details.

## 🛠️ Development

### Available Scripts

**Development:**
```bash
npm run dev          # Development server (port 3222)
npm run dev:next     # Next.js dev server only
npm run electron:dev # Electron + Next.js dev
```

**Database:**
```bash
npm run db:generate  # Generate migration files
npm run db:migrate   # Apply migrations
npm run db:push      # Push schema directly (dev)
npm run db:studio    # Open Drizzle Studio GUI
```

**Build & Production:**
```bash
npm run build        # Production build
npm run start        # Start production server
npm run preview      # Build + start (test production)
```

**Electron:**
```bash
npm run electron:build       # Build for current platform
npm run electron:build:win   # Build Windows installer
npm run electron:build:mac   # Build macOS DMG
npm run electron:build:linux # Build Linux AppImage/DEB
```

**Code Quality:**
```bash
npm run typecheck    # TypeScript type checking
npm run lint         # ESLint
npm run lint:fix     # Fix linting errors
npm run format:check # Prettier check
npm run format:write # Prettier format
npm run check        # Lint + typecheck
```

**PM2 (Production):**
```bash
npm run pm2:start    # Start production server
npm run pm2:dev      # Start development server
npm run pm2:reload   # Graceful reload
npm run pm2:restart  # Hard restart
npm run pm2:stop     # Stop server
npm run pm2:logs     # View logs
npm run pm2:status   # Check status
npm run deploy       # Build + reload
```

## 🚀 Production Deployment & Server Management

### PM2 Process Manager

This project uses **PM2** for production process management, providing automatic restarts, logging, and monitoring capabilities.

### Server Startup & Shutdown

#### Starting the Server

**Production Mode:**
```bash
# Build and start production server
npm run pm2:start

# Or manually:
npm run build
pm2 start ecosystem.config.cjs --env production
```

**Development Mode:**
```bash
# Start development server with PM2
npm run pm2:dev

# Or manually:
pm2 start ecosystem.config.cjs --only darkfloor-art-dev --env development
```

#### Stopping the Server

```bash
# Stop all processes
npm run pm2:stop

# Stop specific process
pm2 stop darkfloor-art-prod
pm2 stop darkfloor-art-dev

# Delete processes from PM2
npm run pm2:delete
```

#### Restarting the Server

```bash
# Reload with zero-downtime (graceful restart)
npm run pm2:reload

# Hard restart (kills and starts)
npm run pm2:restart

# Or manually:
pm2 reload ecosystem.config.cjs --env production --update-env
pm2 restart darkfloor-art-prod --update-env
```

### Server Startup Mechanism

The production server uses a **multi-layer startup process** to ensure reliability:

#### 1. **PM2 Pre-Start Hook**
Before starting the server, PM2 runs:
```bash
node scripts/ensure-build.js
```

This script:
- Checks if `.next/BUILD_ID` file exists
- Automatically runs `npm run build` if build is missing
- Prevents crash loops by ensuring build exists before startup
- Logs build process for debugging

#### 2. **Server Script Validation**
The `scripts/server.js` wrapper performs additional validation:
- Verifies `.next` directory exists
- Checks for `BUILD_ID` file (required by Next.js)
- Validates `.next/server` directory
- Exits immediately with clear error if build is invalid
- Prevents infinite restart loops

#### 3. **Next.js Production Server**
Once validation passes:
- Next.js starts in production mode (`next start`)
- Binds to configured port (uses PORT from .env, default: 3222)
- Health check endpoint becomes available at `/api/health`
- PM2 monitors the process and performs health checks

### Server Shutdown Mechanism

#### Graceful Shutdown
PM2 handles graceful shutdown through:
- **SIGTERM/SIGINT signals**: PM2 sends these to the process
- **Kill timeout**: 5 seconds grace period before force kill
- **Next.js cleanup**: Next.js handles cleanup automatically
- **Database pool closure**: Database connections are closed gracefully

#### Force Shutdown
If graceful shutdown fails:
```bash
pm2 delete darkfloor-art-prod  # Force remove
pm2 kill  # Kill PM2 daemon (use with caution)
```

### Monitoring & Logs

#### View Logs
```bash
# Production logs
npm run pm2:logs

# Development logs
npm run pm2:logs:dev

# Error logs only
npm run pm2:logs:error

# Real-time monitoring
npm run pm2:monit

# View last N lines
pm2 logs darkfloor-art-prod --lines 100
```

#### Check Status
```bash
# List all processes
npm run pm2:status

# Detailed process info
pm2 describe darkfloor-art-prod

# Process metrics
pm2 show darkfloor-art-prod
```

#### Log Files
Logs are stored in `logs/pm2/`:
- `error.log` - Error output only
- `out.log` - Standard output only
- `combined.log` - All logs combined
- `dev-*.log` - Development-specific logs

### Health Checks

The server includes a health check endpoint for monitoring:

```bash
# Check server health
curl http://localhost:3222/api/health

# Expected response:
{
  "status": "ok",
  "timestamp": "2025-12-09T...",
  "uptime": 3600,
  "memory": {
    "heapUsed": 150,
    "heapTotal": 200,
    "rss": 300
  },
  "checks": {
    "database": "ok"
  },
  "responseTime": 5
}
```

PM2 is configured to:
- Check health endpoint every few seconds
- Restart process if health check fails
- Grace period of 5 seconds after startup before health checks begin

### Automatic Restart Behavior

PM2 automatically restarts the process when:
- Process crashes (exit code != 0)
- Memory exceeds 2GB (`max_memory_restart: "2G"`)
- Health check fails (if configured)
- Manual restart command issued

**Restart Limits:**
- Maximum 10 restarts within restart delay window
- Exponential backoff prevents crash loops
- Minimum uptime of 30 seconds before considered stable
- Restart delay of 5 seconds between attempts

### Build Management

#### Automatic Build Recovery
If the production build is missing:
1. PM2 pre-start hook detects missing BUILD_ID
2. Automatically runs `npm run build`
3. Server starts only if build succeeds
4. Process exits cleanly if build fails (no crash loop)

#### Manual Build
```bash
# Build for production
npm run build

# Verify build exists
test -f .next/BUILD_ID && echo "Build OK" || echo "Build missing"

# Build and deploy
npm run deploy
```

### Environment Configuration

The server loads environment variables in this order:
1. `.env` - Base configuration
2. `.env.production` or `.env.development` - Environment-specific
3. `.env.local` - Local overrides (never committed)

**Production Environment Variables:**
```bash
NODE_ENV=production
PORT=3222
HOSTNAME=localhost
```

**Development Environment Variables:**
```bash
NODE_ENV=development
PORT=3222  # Single port configuration - set in .env
HOSTNAME=0.0.0.0
```

### Troubleshooting Server Issues

#### Process Won't Start
1. Check if build exists: `test -f .next/BUILD_ID`
2. Build manually: `npm run build`
3. Check logs: `pm2 logs darkfloor-art-prod --err`
4. Verify port is available: `netstat -tlnp | grep 3222`

#### Process Keeps Restarting
1. Check error logs: `pm2 logs --err`
2. Verify build is complete: Check `.next/BUILD_ID` exists
3. Check memory usage: `pm2 monit`
4. Review restart count: `pm2 describe darkfloor-art-prod`

#### Health Check Failing
1. Test endpoint manually: `curl http://localhost:3222/api/health`
2. Check database connection in health endpoint
3. Verify server is actually running: `pm2 status`
4. Check for port conflicts

#### Build Issues
1. Clear build cache: `rm -rf .next`
2. Rebuild: `npm run build`
3. Check for TypeScript errors: `npm run typecheck`
4. Verify all dependencies: `npm install`

### TypeScript Configuration

The project enforces strict TypeScript settings:

- Full type checking enabled
- No implicit `any` types
- Required explicit null/undefined handling
- Strict property initialization

### Working with TailwindCSS v4

This project uses **TailwindCSS v4** with pure CSS Variables (no `@apply` directives):

```css
/* globals.css */
@import "tailwindcss";

:root {
  --primary: #6366f1;
}

@layer components {
  .btn-primary {
    @apply px-4 py-2 rounded bg-[rgb(var(--primary))];
  }
}
```

## 🚨 Common Issues & Solutions

### Issue: "Missing required env var"

**Solution**: Ensure all required environment variables in `.env.local` are set and valid.

### Issue: NextAuth not working

**Solution**:

1. Generate secret: `npx auth secret`
2. Verify Discord OAuth app credentials
3. Check callback URL matches your domain

### Issue: Audio not playing / Web Audio Context errors

**Solution**:
1. Web Audio API requires user gesture - click/tap to initialize
2. Check browser console for autoplay policy errors
3. Ensure user interaction before calling `play()`
4. Equalizer initializes on first user interaction automatically

### Issue: Queue not persisting

**Solution**:
1. Check localStorage is enabled in browser
2. For authenticated users, check database connection
3. Verify `saveQueueState` mutation is working
4. Check browser console for errors

### Issue: Routing conflicts

**Solution**: Ensure `src/pages/` directory is removed if using App Router (`src/app/`).

### Issue: Database connection fails

**Solution**:

1. Verify DATABASE_URL format includes `?sslmode=require`
2. Check PostgreSQL is running and accessible
3. Confirm database exists and credentials are correct

### Issue: 502 Bad Gateway / Process crash loop

**Solution**:

1. **Check if build exists**: `test -f .next/BUILD_ID && echo "OK" || echo "Missing"`
2. **Build the application**: `npm run build`
3. **Check PM2 status**: `pm2 list` - look for processes with high restart count
4. **View error logs**: `pm2 logs darkfloor-art-prod --err`
5. **Restart with new config**: `pm2 reload ecosystem.config.cjs --env production --update-env`

**Root Cause**: Missing production build causes Next.js to crash immediately on startup, creating an infinite restart loop.

**Prevention**: The server now automatically builds if BUILD_ID is missing via PM2 pre-start hook.

### Issue: Process shows as "online" but not responding

**Solution**:

1. **Test health endpoint**: `curl http://localhost:3222/api/health`
2. **Check if port is listening**: `netstat -tlnp | grep 3222`
3. **Verify process is actually running**: `ps aux | grep "next start"`
4. **Check PM2 logs for startup errors**: `pm2 logs --lines 50`
5. **Restart the process**: `pm2 restart darkfloor-art-prod`

### Issue: Build fails during deployment

**Solution**:

1. **Check TypeScript errors**: `npm run typecheck`
2. **Clear build cache**: `rm -rf .next`
3. **Reinstall dependencies**: `rm -rf node_modules && npm install`
4. **Check disk space**: `df -h`
5. **Review build logs**: Check for specific error messages
6. **Build manually to see errors**: `npm run build`

## 🎵 How It Works

### Audio Player Architecture

**State Management:**
- Global `AudioPlayerContext` provides centralized player state across all components
- `useAudioPlayer` hook contains core playback logic (1,800+ lines)
- Queue structure: `queue[0]` is current track, `queue[1+]` are upcoming tracks

**Audio Chain:**
```
Track → getStreamUrlById() → Darkfloor API (/music/stream) → HTMLAudioElement → Web Audio API → Equalizer → Speakers
                                      ↓
                              Visualizer (canvas/WebGL)
```

**Key Features:**
- **Queue Persistence**: Queue state saved to localStorage and database (authenticated users)
- **Playback History**: Tracks added to history on completion
- **Smart Queue**: Similarity-based recommendations (optional)
- **Error Handling**: Automatic retry with exponential backoff
- **User Gesture Requirement**: Web Audio Context requires user interaction (browser policy)

### Authentication Flow

**NextAuth.js Integration:**
1. User clicks "Sign in with Discord"
2. Redirects to Discord OAuth
3. Discord callback returns to `/api/auth/callback/discord`
4. NextAuth creates/updates user in database
5. Session stored in database (30-day expiry)
6. User profile accessible at `/[userhash]`

**Session Management:**
- Database-backed sessions (not JWT)
- Automatic session refresh (24-hour update age)
- Secure cookies in production (HTTP-only, SameSite=Lax)
- Electron-compatible (non-secure cookies for localhost)

### Queue System

**Spotify-Style Queue:**
- Current track is always `queue[0]`
- Upcoming tracks are `queue[1]`, `queue[2]`, etc.
- History tracks are stored separately
- Queue can be shuffled (original order preserved for restoration)

**Queue Operations:**
- `play(track)` - Play track immediately (replaces current)
- `addToQueue(tracks)` - Add tracks to end of queue
- `addToPlayNext(tracks)` - Add tracks after current track
- `playNext()` - Skip to next track
- `playPrevious()` - Go back to previous track
- `removeFromQueue(index)` - Remove track at index
- `reorderQueue(oldIndex, newIndex)` - Move track position

**Queue Persistence:**
- LocalStorage: Queue state saved automatically (all users)
- Database: Queue state synced to database (authenticated users)
- Restore: Queue automatically restored on app load

### Database Schema

**Key Tables:**
- `users` - User accounts with profile data
- `sessions` - Active user sessions (NextAuth)
- `accounts` - OAuth account links
- `playlists` - User-created playlists
- `playlist_tracks` - Playlist → Track mapping
- `favorites` - User favorite tracks
- `listening_history` - Track play history
- `listening_analytics` - Detailed playback analytics
- `equalizer_presets` - Saved equalizer configurations
- `user_preferences` - Smart queue settings, UI preferences
- `recommendation_cache` - Cached recommendations

**Table Prefix:** `hexmusic-stream_` (configurable)

## 📈 Future Roadmap

Planned enhancements:

- **WebGL Migration** - Migrate Canvas2D visualizations to WebGL for better performance
- **Offline Mode** - Cache downloaded tracks for offline playback
- **Social Features** - Share playlists, follow users, collaborative playlists
- **Advanced Analytics** - Listening insights, genre preferences, time-based stats
- **Theme System** - Dark/light theme toggle with user preference saving
- **Mobile App** - Native mobile apps (React Native or PWA enhancements)

## 📝 Configuration Examples

### Minimal Setup (Search Only)

For a basic search-only interface without authentication:

```yaml
# Required
AUTH_SECRET="your-secret"  # Still required by NextAuth
NEXT_PUBLIC_API_URL="https://api.darkfloor.art/"  # Darkfloor API
STREAMING_KEY="your-stream-key"  # Optional: For authenticated streaming

# Database (minimal - for NextAuth sessions)
DATABASE_URL="postgres://user:pass@host:5432/db?sslmode=require"
DB_HOST="localhost"
DB_PORT="5432"
DB_ADMIN_USER="postgres"
DB_ADMIN_PASSWORD="password"
DB_NAME="songbird"
```

### Full Production Setup

```yaml
# Authentication
AUTH_SECRET="your-secret-min-32-chars"
AUTH_DISCORD_ID="discord-app-id"
AUTH_DISCORD_SECRET="discord-app-secret"
NEXTAUTH_URL="https://your-domain.com"

# Database
DATABASE_URL="postgres://prod_user:prod_pass@prod-host:5432/starchild?sslmode=require"
DB_HOST="prod-host"
DB_PORT="5432"
DB_ADMIN_USER="prod_user"
DB_ADMIN_PASSWORD="prod_pass"
DB_NAME="starchild"
DB_SSL_CA="/path/to/ca.pem"  # Optional: SSL certificate

# API Configuration
NEXT_PUBLIC_API_URL="https://api.darkfloor.art/"  # Darkfloor API (search & streaming)
STREAMING_KEY="your-secure-stream-key"  # Optional: For authenticated streaming
SONGBIRD_API_KEY="optional-songbird-key"  # Optional: For Songbird API features
NEXT_PUBLIC_SONGBIRD_API_URL="https://songbird.darkfloor.art/"  # Songbird API (recommendations)

# Environment
NODE_ENV="production"
```

### Electron Setup

For Electron builds, add:

```yaml
ELECTRON_BUILD="true"  # Disables secure cookies, optimizes build
```

## 🤝 Contributing

Contributions are welcome! Please ensure:

1. **TypeScript**: All code is TypeScript with strict mode enabled
2. **Type Safety**: Components properly typed with interfaces
3. **Styling**: Follow TailwindCSS v4 conventions
4. **Environment**: Add new variables to `src/env.js` validation
5. **tRPC**: Use tRPC procedures for all API calls (no direct fetch)
6. **Testing**: Test on both mobile and desktop views
7. **Code Style**: Run `npm run format:write` before committing

### Development Workflow

1. Create feature branch from `main`
2. Implement feature with type safety
3. Test on mobile (<768px) and desktop (≥768px)
4. Run `npm run check` to verify linting and types
5. Submit pull request with clear description

## 📜 Acknowledgments

Built with the **T3 Stack** - a modern, type-safe full-stack framework for Next.js applications.

**Key Technologies:**
- [Next.js](https://nextjs.org/) - React framework
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Electron](https://www.electronjs.org/) - Desktop framework

## 📚 Additional Documentation

- **REPOSITORY_ANALYSIS.md** - Comprehensive codebase analysis
- **CHANGELOG.md** - Version history and changes
- **ROADMAP.md** - WebGL migration plan
- **CLAUDE.md** - Architecture documentation

---

## © 2025 soulwax @ GitHub

*All music data, streaming rights, and trademarks remain the property of their respective owners.*
