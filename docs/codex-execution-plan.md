# Codex Execution Plan

## Rule

Do not start coding before reading:

- `AGENTS.md`
- `.agents/skills/product-principles/SKILL.md`
- `.agents/skills/bright-party-ui/SKILL.md`
- `.agents/skills/voice-first-roleplay/SKILL.md`
- `.agents/skills/scenario-dungeon/SKILL.md`
- `.agents/skills/roleplay-scoring/SKILL.md`
- `.agents/skills/timeout-disconnect-handling/SKILL.md`
- `.agents/skills/expression-cards/SKILL.md`
- `.agents/skills/wardrobe-monetization/SKILL.md`
- `docs/product-spec.md`
- `docs/voice-gameplay-rules.md`
- `docs/ui-style-guide.md`

## MVP Task 1: Initialize Frontend

Create a Next.js App Router project with:

- TypeScript
- Tailwind CSS
- pnpm
- ESLint
- mobile-first layout

Routes:

- `/onboarding`
- `/lobby`
- `/room/[id]`
- `/play/[id]`
- `/result/[id]`
- `/cards`

Components:

- Button
- Card
- Avatar
- Badge
- ProgressBar
- BottomNav
- PhoneShell
- MicButton
- RoleCard
- ExpressionCard
- ScoreRing
- SceneCard
- PlayerSlot
- RewardBadge

Mock data:

- `src/data/scenarios.ts`
- `src/data/avatars.ts`
- `src/data/expressionCards.ts`
- `src/data/rooms.ts`
- `src/data/rewards.ts`

Validation:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

Do not implement:

- OpenAI API
- real microphone API
- Supabase
- payment
- real-time multiplayer

## MVP Task 2: Avatar Creation

Build `/onboarding`.

Goal: User creates an English roleplay avatar in 30 seconds.

Must include:

- Character preview
- Role name
- Style selection
- English state selection
- Personality tags
- Save to localStorage
- Continue to `/lobby`

## MVP Task 3: Story Lobby

Build `/lobby`.

Must include:

- User avatar and level
- Today solo story as main CTA
- Scenario categories
- Six mock scenarios
- Locked duo mode at stage 7
- Locked party mode at stage 14

## MVP Task 4: Voice Play Screen

Build `/play/[id]`.

Must include:

- Scene area
- AI dialogue bubble
- User role/emotion/mission card
- Big microphone button
- Mock recording flow
- Mock transcript
- Mock feedback
- 5 solo turns
- route to result page

## MVP Task 5: Team Room and Multiplayer Mock

Build `/room/[id]` and extend `/play/[id]`.

Must include:

- Room code
- Invite button
- Player slots
- AI stand-in slot
- Role cards
- Duo and trio turn rules
- Timeout states
- Disconnect states
- Solo continuation mode

## MVP Task 6: Result and Rewards

Build `/result/[id]`.

Must include:

- Team rating
- Total score
- Six scoring dimensions
- Title badge
- Highlight line
- Expression cards
- Rewards
- AI stand-in notice if applicable

## MVP Task 7: Cards and Wardrobe

Build `/cards`.

Must include:

- Expression card tab
- Wardrobe tab
- Free items
- Locked items
- No payment

## PR Requirement

Each PR must explain:

1. What was built
2. Which pages changed
3. How voice-first rules were protected
4. How mobile layout was checked
5. Validation results
