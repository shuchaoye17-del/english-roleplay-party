# Voice Gameplay Rules

## Core Rule

Voice is the main gameplay. Typing is backup only.

The user should feel they are acting in an English story scene.

## Per-turn Flow

1. Show current scene and dialogue.
2. Show the user's role, emotion, hidden mission, and intention hint.
3. User presses and holds the microphone.
4. User speaks one English line.
5. App shows recording state.
6. App shows mock transcript.
7. App shows short feedback.
8. Story advances.

## Timing

- Recommended speaking time: 8–12 seconds
- Maximum voice line: 15 seconds
- Feedback display: 3–5 seconds
- One turn should usually finish within 20–25 seconds

## Solo Story

- User speaks 5 lines
- AI plays all other roles
- Best for onboarding and daily play

## Duo Story

- 2 players
- Each player speaks 3 lines
- AI narrator inserts story beats

## Trio Story

- 3 players
- Each player speaks 3 lines
- AI narrator inserts story beats

## Difficulty Modes

### Repeat Mode

The app gives a full English line. The user reads it aloud.

### Guided Mode

The app gives a Chinese intention. The user says the English line.

### Free Performance Mode

The app gives only role, emotion, and mission. The user performs freely.

## MVP Implementation

First version uses mock recording:

- Click microphone
- Show recording animation
- Show mock transcript
- Show mock feedback
- Advance to next turn

Do not implement real microphone API in the first coding pass.
