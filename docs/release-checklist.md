# Release Checklist

Use this before merging a PR or deploying.

## Product checks

- The app still feels like an English roleplay party game.
- The main flow is voice-first.
- No main typing chat box is introduced.
- No traditional grammar quiz UI is introduced.
- Pages are mobile-first.
- The visual direction remains bright and playful.
- Feedback feels like a game result, not an exam report.

## Page checks

- `/onboarding` creates an avatar.
- `/lobby` shows story cards and locked social modes.
- `/room/cafe-chaos` shows room, players, roles, AI stand-in.
- `/play/cafe-chaos` completes a 5-turn voice scenario.
- `/result/cafe-chaos` shows score, title, rewards, expression cards.
- `/cards` shows expression cards and wardrobe items.

## Voice checks

Without `OPENAI_API_KEY`:

- `/play/cafe-chaos` still works.
- Recording can stop and continue with mock transcription.
- Turn scoring still returns mock game-like feedback.
- The game does not break if microphone permission is denied.

With `OPENAI_API_KEY`:

- `/api/transcribe` can return a real transcript.
- `/api/score-turn` can return structured scores.
- The browser never receives the API key.
- If OpenAI fails, the game continues with mock fallback.

Optional deployment variables:

```bash
OPENAI_TRANSCRIBE_MODEL=gpt-4o-mini-transcribe
OPENAI_SCORING_MODEL=gpt-4o-mini
```

## Persistence checks

Without Supabase env vars:

- onboarding profile still saves through localStorage.
- unlocked cards can stay local.
- latest run summary can stay local.
- no database request is required for CI or local development.

Before adding real Supabase writes:

- keep localStorage fallback.
- add RLS before public production writes.
- do not store raw audio in MVP.
- do not put service role keys in browser env vars.

## Deployment checks

- `.env.example` exists and does not contain secrets.
- `docs/deployment-guide.md` exists.
- `docs/supabase-schema-plan.md` exists.
- Vercel install command is `pnpm install --no-frozen-lockfile`.
- Vercel build command is `pnpm build`.
- `OPENAI_API_KEY` is configured only in server/deployment environment.

## Engineering checks

Run:

```bash
pnpm install --no-frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
```

## Mobile checks

Check at:

- 375px width
- 390px width
- 430px width

No horizontal scrolling.
Bottom nav does not cover important CTA buttons.
Buttons are easy to tap.

## Non-goal checks

Do not accidentally add:

- Payment
- Login
- Real database writes before Supabase is configured
- Real-time voice chat
- Large community features
