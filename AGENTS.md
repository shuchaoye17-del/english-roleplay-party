# AGENTS.md

## Project

This project is a mobile-first, voice-first English roleplay party game.

Users create an avatar, enter story scenarios, speak English lines by voice, and receive feedback based on role immersion, emotion match, pronunciation clarity, English naturalness, story progress, and teamwork.

## Product Identity

This product is:

- A voice-first English roleplay game
- A mobile-first social party experience
- A story dungeon product for English practice
- A lightweight game where learning is hidden inside performance

This product is not:

- A traditional English learning app
- A Duolingo clone
- A vocabulary memorization app
- A grammar quiz app
- A typing chat app
- An AI copywriting SaaS
- A serious business learning platform

The user should feel: “I am acting in a story,” not “I am doing English homework.”

## Core Gameplay

- Voice is the main interaction.
- Typing is backup only and must not appear as the main flow.
- Solo story: user speaks 5 lines, AI plays other roles.
- Duo story: 2 players, each speaks 3 lines.
- Trio story: 3 players, each speaks 3 lines.
- Each voice line should be 8–12 seconds, max 15 seconds.
- Multiplayer is turn-based voice roleplay, not real-time voice chat.
- AI can act as narrator, NPC, teammate substitute, and scoring judge.

## Visual Direction

Use a bright, youthful party-game style.

Preferred:

- White or warm off-white backgrounds
- Coral pink
- Bright yellow
- Sky blue
- Soft purple
- Fresh green
- Rounded cards
- Big buttons
- Playful badges
- Character avatars
- Confetti and celebration moments
- Stage, microphone, chat bubble, mask, star, trophy, card icons

Avoid:

- Dark cinematic UI
- Serious business style
- Traditional education UI
- Dense text
- Desktop-first layouts
- Overly childish kindergarten UI
- SaaS dashboard feeling

## Reliability Rules

Multiplayer cannot break when someone times out, disconnects, or leaves.

Use AI stand-in:

- If player does not act after 30 seconds, AI stand-in speaks for them.
- If player disconnects for more than 60 seconds, AI stand-in takes over their role.
- If host leaves, transfer host to another active player.
- If only one real player remains, convert to solo continuation mode.
- Remaining players should still receive normal rewards.

Use theatrical language:

- “轮到你登场啦”
- “忘词了吗？可以读这句救场台词”
- “剧场助演正在帮你接一句”
- “玩家暂时离开舞台”

Avoid cold system language such as “timeout error” or “user disconnected.”

## Scoring Rules

Do not score only grammar.

Score:

1. Role immersion
2. Emotion match
3. Pronunciation clarity
4. English naturalness
5. Story progress
6. Teamwork

Simple, clear, emotionally correct English should score high.

## MVP Scope

Build first:

- Avatar creation
- Story lobby
- Solo story voice mock
- Duo/trio room mock
- Turn-based voice roleplay mock
- Timeout / disconnect / AI stand-in mock
- Result scoring page
- Expression card collection
- Wardrobe preview

Do not build yet:

- Real payment
- Real-time voice chat
- Complex marketplace
- Large community feed
- Native mobile app
- Advanced matchmaking
- Complex 3D avatars

## Tech Direction

Initial MVP:

- Next.js App Router
- TypeScript
- Tailwind CSS
- pnpm
- localStorage
- mock data

Later:

- OpenAI speech-to-text
- OpenAI structured scoring API
- Supabase
- Vercel

## Validation

Before finishing a coding task, run:

- pnpm lint
- pnpm typecheck
- pnpm build

If a command does not exist, add it.
