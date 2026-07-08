# Engineering Plan

## Phase 0: Governance Package

Create:

- AGENTS.md
- .agents/skills/*
- docs/product-spec.md
- docs/voice-gameplay-rules.md
- docs/scenario-template.md
- docs/scoring-rubric.md
- docs/unlock-roadmap.md
- docs/ui-style-guide.md

## Phase 1: Frontend MVP

Stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- pnpm
- localStorage
- mock data

Routes:

- /onboarding
- /lobby
- /room/[id]
- /play/[id]
- /result/[id]
- /cards

## Phase 2: Voice Mock

Build a fake recording loop first:

- Press microphone
- Show recording state
- Show mock transcript
- Show mock feedback
- Advance turn
- Finish result

## Phase 3: Real Recording

Add browser microphone recording.

Still do not add real-time voice chat.

## Phase 4: Speech-to-text

Add server-side audio transcription with fallback to mock transcript.

## Phase 5: AI Scoring

Use structured JSON output for scoring and feedback.

## Phase 6: Supabase

Store:

- profiles
- avatars
- scenarios
- rooms
- room_players
- roleplay_turns
- results
- expression_cards
- user_expression_cards
- wardrobe_items
- user_wardrobe_items

## Phase 7: Deployment

Deploy with Vercel.

Use environment variables and do not expose API keys to the client.
