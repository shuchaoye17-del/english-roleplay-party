# Product Spec: English Roleplay Party

## One-line Concept

A mobile-first, voice-first English roleplay party game where users speak English lines in short story scenes and receive playful performance feedback.

## Core Promise

Users practice spoken English by acting in fun story scenes, not by doing homework.

## Target Users

- English learners who want to speak but feel shy
- Students who want more fun speaking practice
- Young users who like avatars, stories, rewards, and social games
- Friends who want lightweight English interaction

## Core Modes

### Solo Story

The user plays alone. AI acts as narrator and other characters.

Rules:

- 5 user voice lines
- 3–5 minutes
- Best for onboarding and daily retention

### Duo Story

Two users act together. AI acts as narrator.

Rules:

- 2 players
- 3 voice lines per player
- 6 player turns total

### Trio Story

Three users act together. AI acts as narrator.

Rules:

- 3 players
- 3 voice lines per player
- 9 player turns total

## MVP Loop

1. Create avatar
2. Enter story lobby
3. Choose solo story
4. Speak English lines by voice
5. Receive short feedback
6. Complete result page
7. Earn expression cards and rewards
8. Return to lobby

## Key Differentiation

- Voice-first, not typing-first
- Roleplay-first, not quiz-first
- Emotion and performance matter
- AI stand-in prevents multiplayer failure
- Expression cards turn learning content into collectible game items

## MVP Pages

- `/onboarding`: avatar creation
- `/lobby`: story lobby
- `/room/[id]`: team room
- `/play/[id]`: voice roleplay screen
- `/result/[id]`: game result screen
- `/cards`: expression cards and wardrobe

## Non-goals for MVP

- Real-time voice chat
- Payment
- Native mobile app
- Large public community
- Complex 3D avatar editor
- Advanced matchmaking
- Real user login
- Supabase database
- Real OpenAI API calls

## Success Criteria

The MVP succeeds if a user can complete this path:

Create avatar → start solo story → speak 5 mock voice lines → receive feedback → get score/title/cards → return to lobby.
