# Codex Next Tasks

Use this document as the task queue after Phase 1 PR is merged.

## Task A: Validate Phase 1 MVP locally

Commands:

```bash
pnpm install --no-frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
pnpm dev
```

Manual check:

- `/onboarding` can create avatar and enter lobby.
- `/lobby` shows story cards and locked social modes.
- `/play/cafe-chaos` can simulate 5 voice turns and navigate to result.
- `/room/cafe-chaos` shows player slots and AI stand-in.
- `/result/cafe-chaos` shows game-like score and rewards.
- `/cards` shows expression cards and wardrobe preview.

## Task B: UI polish pass

Follow `docs/phase-2-ui-polish-plan.md` and `.agents/skills/bright-party-ui/SKILL.md`.

Do not add backend.
Do not add OpenAI API.
Do not add payment.

## Task C: Improve voice mock flow

Follow `.agents/skills/voice-first-roleplay/SKILL.md`.

Add:

- Voice state timeline
- Rescue line card
- AI NPC reply bubble
- Turn recap list
- More visible recording pulse

## Task D: Add multiplayer mock turns

Follow `.agents/skills/timeout-disconnect-handling/SKILL.md`.

Add:

- Duo 6-turn flow
- Trio 9-turn flow
- AI stand-in turn history
- Solo continuation mock state

## Task E: Prepare real voice integration plan

Do not implement API yet.
Create a technical plan for:

- Browser microphone recording
- Audio blob upload
- Server route for transcription
- Mock fallback
- Permission error handling
