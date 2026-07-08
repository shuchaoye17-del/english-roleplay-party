# Deployment Guide

This guide prepares the MVP for Vercel deployment.

## Current deployment target

- Next.js App Router
- Vercel
- GitHub repository: `shuchaoye17-del/english-roleplay-party`
- Package manager: pnpm

## Vercel setup

1. Import the GitHub repository into Vercel.
2. Use the default Next.js framework preset.
3. Build command:

```bash
pnpm build
```

4. Install command:

```bash
pnpm install --no-frozen-lockfile
```

5. Output directory: leave default for Next.js.

## Required env vars

The app can run without these keys because fallback behavior is built in.

For real transcription and scoring:

```bash
OPENAI_API_KEY=...
```

Optional model overrides:

```bash
OPENAI_TRANSCRIBE_MODEL=gpt-4o-mini-transcribe
OPENAI_SCORING_MODEL=gpt-4o-mini
```

Future Supabase values:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Do not add a Supabase service role key to the browser. Service role keys must only be used server-side.

## Fallback behavior

Without `OPENAI_API_KEY`:

- `/api/transcribe` returns mock transcription.
- `/api/score-turn` returns mock scoring.
- `/play/cafe-chaos` still completes the flow.

Without Supabase env vars:

- localStorage remains the current persistence layer.
- onboarding profile still saves locally.
- no database write is attempted.

## Manual smoke test

After deployment, test on mobile width:

1. Open `/onboarding`.
2. Create a role.
3. Enter `/lobby`.
4. Open the cafe scenario.
5. Start the room.
6. Start a recording in `/play/cafe-chaos`.
7. Stop the recording.
8. Confirm transcription appears.
9. Confirm six scoring values appear.
10. Continue until result page.
11. Open `/cards` and confirm expression cards and wardrobe render.

## Production readiness notes

Before public launch:

- Add real Supabase persistence.
- Add auth only when needed for cross-device persistence.
- Add rate limiting for AI routes.
- Add abuse protection around audio upload size and request frequency.
- Add privacy copy explaining that audio is used for transcription and not stored in MVP.

## Known MVP limitations

- No login.
- No cross-device persistence.
- No real multiplayer synchronization.
- No payment.
- No raw audio storage.
