# Phase 2 UI Polish Plan

## Goal

Move the MVP from a functional prototype to a product that feels like a bright mobile social game.

## Priority

The app should feel:

- Bright
- Young
- Playful
- Social
- Voice-first
- Character-driven
- Game-like

It should not feel:

- Like a SaaS dashboard
- Like a classroom
- Like a grammar quiz
- Like a dark cinematic story app

## Screens to polish

1. `/onboarding`
   - Make avatar creation feel more like starting a game.
   - Add clearer avatar cards and stronger selected state.
   - Reduce form feeling.

2. `/lobby`
   - Make it feel like a story arcade.
   - Add stronger featured story card.
   - Add visible locked friend / party modes.
   - Add daily streak / character progress preview.

3. `/room/[id]`
   - Make it feel like backstage before a show.
   - Improve player slots.
   - Make AI stand-in visually clear.
   - Add ready state and room status.

4. `/play/[id]`
   - Make microphone the visual center.
   - Add stronger recording animation.
   - Add voice turn state chips.
   - Add rescue-line UI.
   - Add AI response bubble.

5. `/result/[id]`
   - Make it feel more celebratory.
   - Add trophy / confetti feeling.
   - Make scores more game-like.
   - Make expression card rewards more collectible.

6. `/cards`
   - Make expression cards feel like game item cards.
   - Improve wardrobe preview.
   - Add locked cosmetics and titles.

## Component improvements

- Create dedicated `RoleCard`
- Create dedicated `PlayerSlot`
- Create dedicated `ExpressionCardView`
- Create dedicated `RewardBadge`
- Create dedicated `VoiceStatePill`
- Create dedicated `ScenePanel`

## Interaction improvements

- Keep typing out of the main flow.
- Keep button sizes large for mobile.
- Use short Chinese labels.
- Add playful empty states.
- Add mock animations with CSS only.

## Validation

Run:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Do not add real OpenAI API, Supabase, login, payment, or real-time multiplayer in this phase.
