# Real Voice Integration Plan

## Goal

Move from pure mock recording to real browser microphone capture, then later add server-side speech-to-text and structured AI scoring.

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

## Phase 4: Server transcription route

Add later:

- `POST /api/transcribe`
- Accept audio blob
- Call speech-to-text server-side
- Return transcript JSON

Never expose API keys to the client.

Suggested response:

```json
{
  "transcript": "Sorry, I think this isn't what I ordered.",
  "durationMs": 8420,
  "confidence": 0.91
}
```

## Phase 5: Structured scoring route

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
- network error
- transcription timeout
- AI scoring error

The game must continue.

## Non-goals for Phase 3

Do not add:

- OpenAI API
- server transcription route
- Supabase
- login
- payment
- real-time voice chat
- live multiplayer synchronization
