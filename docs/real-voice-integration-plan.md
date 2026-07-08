# Real Voice Integration Plan

Do not implement this until the frontend MVP and voice mock flow are stable.

## Goal

Replace the mock recording flow with real microphone recording, audio upload, speech-to-text, and structured roleplay feedback.

## Phase 1: Browser recording

Use browser APIs:

- `navigator.mediaDevices.getUserMedia`
- `MediaRecorder`
- audio blob generation

UX states:

- permission_request
- permission_denied
- ready_to_record
- recording
- uploading
- transcribing
- transcript_ready
- fallback_mock

## Phase 2: Server transcription route

Add:

- `POST /api/transcribe`
- Accept audio blob
- Call speech-to-text server-side
- Return transcript JSON

Never expose API key to client.

## Phase 3: Structured scoring route

Add:

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

## Phase 4: Fallbacks

Always keep mock fallback:

- microphone permission denied
- network error
- transcription timeout
- AI scoring error

The game must continue.

## Non-goals

Do not build real-time voice chat in this phase.
Do not build live multiplayer synchronization yet.
