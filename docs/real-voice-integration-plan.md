# Real Voice Integration Plan

## Goal

Move from pure mock recording to real browser microphone capture, then server-side speech-to-text and structured AI scoring.

The app must remain voice-first, mobile-first, and game-like.

## Current Implementation: Phase 3

Implemented in `phase-3-voice-recording`:

- Added `src/hooks/useVoiceRecorder.ts`.
- Uses `navigator.mediaDevices.getUserMedia`.
- Uses `MediaRecorder`.
- Captures an in-memory `audioBlob`.
- Tracks approximate recording duration.
- Supports friendly permission failure copy.
- Keeps existing mock transcript and mock scoring.
- Does not upload audio.
- Does not call OpenAI API.

Recorder states:

- `idle`
- `permission_request`
- `permission_denied`
- `ready`
- `recording`
- `stopped`
- `error`

## Current Implementation: Phase 4

Implemented in `phase-4-mock-transcription-api`:

- Added `src/app/api/transcribe/route.ts`.
- Added `src/lib/transcription.ts`.
- `/play/[id]` now calls the mock transcription API after recording stops.
- The API accepts `FormData` with an `audio` blob and `durationMs`.
- The API returns mock transcript JSON.
- The client helper falls back to local mock transcript if the request fails.
- Audio is not persisted.
- OpenAI API is still not connected.

Mock response:

```json
{
  "transcript": "Sorry, I think this isn't what I ordered.",
  "durationMs": 8420,
  "confidence": 0.91,
  "source": "mock"
}
```

## Current Implementation: Phase 5

Implemented in `phase-5-openai-stt`:

- Added `src/lib/server/openaiTranscription.ts`.
- Updated `src/app/api/transcribe/route.ts`.
- `POST /api/transcribe` now uses real OpenAI speech-to-text only when `OPENAI_API_KEY` exists.
- Without `OPENAI_API_KEY`, local development keeps using mock transcription.
- If OpenAI fails, the route returns mock fallback instead of breaking the game.
- Client code remains unchanged and still calls `/api/transcribe`.
- API keys are never exposed to the browser.

Environment variables:

```bash
OPENAI_API_KEY=...
OPENAI_TRANSCRIBE_MODEL=gpt-4o-mini-transcribe
```

`OPENAI_TRANSCRIBE_MODEL` is optional. The default is `gpt-4o-mini-transcribe`.

## Phase 6: Structured scoring route

Add later:

- `POST /api/score-turn`

Input:

- scenario id
- role
- emotion target
- hidden mission
- user transcript
- turn history

Output JSON:

```json
{
  "roleImmersion": 86,
  "emotionMatch": 91,
  "pronunciationClarity": 78,
  "englishNaturalness": 84,
  "storyProgress": 88,
  "teamwork": 82,
  "title": "气氛救场王",
  "feedback": "这句很符合礼貌但不满的情绪。",
  "betterExpression": "Could you check it for me?",
  "expressionCards": ["No worries", "Could you check it?"]
}
```

## Fallbacks

Always keep mock fallback:

- microphone permission denied
- unsupported browser
- missing `OPENAI_API_KEY`
- OpenAI network error
- transcription timeout
- AI scoring error

The game must continue.

## Non-goals for Phase 5

Do not add:

- AI scoring
- Supabase
- login
- payment
- real-time voice chat
- live multiplayer synchronization
- audio persistence
