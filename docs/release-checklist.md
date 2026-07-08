# Release Checklist

Use this before merging a PR or deploying.

## Product checks

- The app still feels like an English roleplay party game.
- The main flow is voice-first.
- No main typing chat box is introduced.
- No traditional grammar quiz UI is introduced.
- Pages are mobile-first.
- The visual direction remains bright and playful.

## Page checks

- `/onboarding` creates an avatar.
- `/lobby` shows story cards and locked social modes.
- `/room/cafe-chaos` shows room, players, roles, AI stand-in.
- `/play/cafe-chaos` completes a mock 5-turn voice scenario.
- `/result/cafe-chaos` shows score, title, rewards, expression cards.
- `/cards` shows expression cards and wardrobe items.

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
- Database
- Real OpenAI API
- Real-time voice chat
- Large community features
