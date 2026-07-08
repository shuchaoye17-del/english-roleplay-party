---
name: voice-first-roleplay
description: Use when implementing gameplay, recording UI, voice turns, speech-to-text flow, and roleplay interaction.
---

# Voice-First Roleplay Rules

This app is voice-first.

Users should speak English lines aloud. Typing is not the main gameplay.

## Core Turn

1. Show the story situation.
2. Show the player's role, emotion, and hidden mission.
3. Ask the player to press and hold the microphone.
4. Player speaks one English line.
5. System transcribes the audio.
6. System gives short feedback.
7. Story advances to the next player or AI character.

## Timing

- Suggested speaking time: 8–12 seconds.
- Maximum speaking time: 15 seconds.
- If the player is silent, show a friendly prompt.
- If the player times out, offer a rescue line they can read aloud.

## Turn Counts

Solo story:

- User speaks 5 lines.
- AI plays other roles.

Duo story:

- 2 players.
- Each player speaks 3 lines.
- Total 6 player turns.

Trio story:

- 3 players.
- Each player speaks 3 lines.
- Total 9 player turns.

Avoid 4–5 player rooms in the MVP unless using very short turns.

## Voice Difficulty Modes

1. Repeat Mode: the app gives a full English line, user reads it aloud.
2. Guided Mode: the app gives Chinese intention, user says the English line.
3. Free Performance Mode: the app gives only role, emotion, and mission.

## UX

The play screen must not look like a typing chat.

Use a large microphone button.

Use recording states:

- Your turn
- Recording
- Transcribing
- AI feedback
- Waiting for teammate
- AI stand-in

The experience should feel like acting in an English scene, not filling out homework.
