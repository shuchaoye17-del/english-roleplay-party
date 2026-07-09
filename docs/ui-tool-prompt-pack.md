# UI tool prompt pack

This document is a strict prompt/spec package for UI-specific design tools.

It should be used only with tools that can generate or edit real mobile app UI screens, not generic posters or social graphics.

## Purpose

Create a professional mobile app UI design source for English Roleplay Party before engineering implementation.

This prompt pack exists because:

- code-first styling failed
- Canva visual generation failed
- the product needs real app screens, not decorative graphics

## Non-negotiable rule

Do not implement UI code from these prompts directly.

The workflow is:

1. paste prompts into a UI-specific design tool
2. generate or design screens
3. product owner reviews screens
4. revise until approved
5. only then implement in code

## Master product prompt

```text
Design a high-fidelity mobile app UI system for 英语角色派对 / English Roleplay Party.

Product concept:
A voice-first English roleplay party game. Users enter short social scenes, receive a character role, read or improvise one English line, record their voice, get playful AI feedback, receive a game-like rating, and collect expression cards.

One-liner:
用英语演故事，边玩边练口语。

Core feeling:
A polished mobile social game for practicing spoken English through roleplay.

Target audience:
Young English learners who are shy about speaking, want a low-pressure practice environment, and like mobile social/game experiences.

Design style:
Youthful, bright, polished, social, character-forward, voice-first, game-like, premium consumer app.

Do not make it look like:
- classroom education app
- exam prep app
- SaaS dashboard
- random gradient template
- poster or ad graphic
- emoji-heavy prototype
- childish kindergarten cartoon
- dark dating app
- generic AI-generated landing page

Output requirement:
Create real mobile app screens, not marketing posters. Use iPhone-sized frames. Include reusable components, design tokens, and interaction states.
```

## Visual direction constraints

```text
Use a controlled bright palette. The UI can feel energetic, but must not look cheap or chaotic.

Use character/role visuals intentionally. Do not use emoji as primary artwork.

Use card-based mobile hierarchy with strong spacing discipline.

Use a visible microphone interaction as the main product action.

The result page should feel like a game achievement card, not a school report card.

Design for one-handed mobile use.

Every important action must be clear within 3 seconds.

Avoid decorative elements that do not support product understanding.
```

## Screen 1: Onboarding / landing prompt

```text
Create the onboarding / landing screen for 英语角色派对.

Goal:
The user must understand the product in under 10 seconds and feel safe enough to start speaking English.

Content:
- Product title: 英语角色派对
- One-liner: 用英语演故事，边玩边练口语
- CTA: 开一局英语小剧场
- Reassurance text: 不会说也有台词提示
- Small explanation: 3 分钟完成一场英文小剧场
- Character/avatar preview area
- Voice-first cue: microphone or speaking indicator

Layout requirements:
- mobile-first iPhone frame
- top hero area with character/story energy
- strong single primary CTA
- no signup/login emphasis
- no classroom or textbook visuals
- no generic marketing poster layout

States:
- default
- avatar selected
- CTA pressed
- loading into lobby

Acceptance bar:
A new user should know this is a speaking roleplay game, not an English course.
```

## Screen 2: Lobby / story hall prompt

```text
Create the lobby / story hall screen.

Goal:
Make the app feel like a mobile game lobby where the user chooses a short roleplay scene.

Content:
- Header: 故事大厅
- Featured scenario: Cafe Chaos / 咖啡店混乱夜
- Tags: 练口语, 角色扮演, 3 分钟, AI 队友
- Scenario card list
- Locked future scenarios
- User status / streak / today progress area
- Bottom navigation

Layout requirements:
- featured card should feel premium and playable
- scenario cards should be easy to scan
- locked content should feel intentional, not unfinished
- bottom nav should be clean and app-like
- no huge emoji theater icons
- no uncontrolled gradient blocks

States:
- featured scenario available
- locked scenario
- selected category
- loading into room/play

Acceptance bar:
The screen should feel like a real consumer mobile game/social app lobby.
```

## Screen 3: Room / team ready prompt

```text
Create the room / team ready screen.

Goal:
Prepare the user for a short roleplay session and explain the AI stand-in concept.

Content:
- Scenario title: 咖啡店混乱夜
- Scene description
- Player slots
- Role cards
- Current user role
- AI stand-in player slot
- Ready/start CTA
- Short rule: 读出台词，也可以自由发挥

Layout requirements:
- role lineup should be clear
- AI teammate should feel helpful, not like an error
- start action should be obvious
- keep screen lightweight

States:
- user not ready
- user ready
- AI stand-in active
- teammate disconnected / AI replacing

Acceptance bar:
The user should know who they are playing and why AI can keep the game going.
```

## Screen 4: Play / voice acting prompt

```text
Create the play / voice acting screen.

Goal:
Make the user focus on one English line and record voice confidently.

This is the most important screen.

Content:
- Current round indicator
- Current role
- Story prompt
- Large visible English line to speak
- Optional Chinese meaning/help text
- Main microphone button
- Recording timer
- Processing status
- AI feedback area
- Next turn CTA

Required English line treatment:
The English line must be directly visible. Do not hide it behind a tap.

Microphone states:
- idle: tap to record
- recording: active waveform/timer
- stopped: ready to submit/process
- processing: transcribing/scoring
- permission denied: clear recovery instruction
- short/empty audio: fallback line used

Layout requirements:
- microphone action is the visual center
- script line is highly readable
- no chat-input-first design
- no keyboard-first design
- feedback appears after speaking
- one action per state

Acceptance bar:
A shy user should know exactly what to say and where to tap.
```

## Screen 5: Result / rating prompt

```text
Create the result / rating screen.

Goal:
Make the user feel rewarded and want to screenshot/share or replay.

Content:
- Rating: S / A / B style
- Achievement title: 演绎完成
- Score dimensions: 表达力, 流利度, 角色感
- Highlight line: best spoken phrase or funny moment
- Earned expression cards
- Replay CTA
- Share CTA

Layout requirements:
- screenshot-worthy composition
- rating feels like a game achievement, not an exam grade
- score dimensions should be encouraging
- share action should be obvious
- expression cards should feel collectible

States:
- S rating
- A rating
- lower rating but still encouraging
- earned card reveal
- share ready

Acceptance bar:
The user should feel proud, not judged.
```

## Screen 6: Expression cards prompt

```text
Create the expression cards screen.

Goal:
Make useful English expressions feel collectible and game-like.

Content:
Each card includes:
- English phrase
- Chinese meaning
- scenario context
- category/rarity
- earned/locked state

Example phrases:
- Could you say that again?
- I am just trying to help.
- That was not what I ordered.
- Give me one second.

Layout requirements:
- cards should feel collectible
- English phrase should be primary
- Chinese meaning should support learning
- rarity should not make it childish

States:
- earned card
- locked card
- newly unlocked card
- detail view

Acceptance bar:
The user should want to collect more expressions by playing more scenes.
```

## Screen 7: Share handoff page prompt

```text
Create the share handoff page.

Goal:
Help testers understand the demo and enter the first play session.

Content:
- Product one-liner
- 3-minute demo explanation
- What testers should try
- Feedback questions
- Primary CTA into demo
- Copyable invitation text

Tester copy:
我做了一个 3 分钟英语小剧场 demo：用英语演故事，边玩边练口语。你不用准备，点麦克风说一句就行，不会说也有台词提示。

Layout requirements:
- clear and lightweight
- no marketing over-design
- easy to share
- mobile browser friendly

Acceptance bar:
A tester should understand what to do before entering the app.
```

## Component prompt

```text
Create reusable mobile UI components for this app:

Components:
- primary button
- secondary button
- scenario card
- role card
- player slot
- microphone button
- recording state indicator
- transcript/feedback card
- result rating card
- expression card
- badge/tag
- bottom navigation

For each component, include:
- default state
- pressed state
- disabled state
- loading state where relevant
- error/fallback state where relevant
- text overflow behavior
- mobile spacing rules
```

## Token prompt

```text
Define design tokens for the app:

Color tokens:
- primary
- primary pressed
- secondary
- accent
- success
- warning
- danger
- background
- surface
- muted surface
- text primary
- text secondary
- text muted
- border

Typography tokens:
- display title
- screen title
- section title
- card title
- body
- caption
- button label
- badge label

Spacing tokens:
- page horizontal padding
- section gap
- card padding
- card internal gap
- button padding
- badge padding
- bottom safe-area spacing

Shape tokens:
- small radius
- medium radius
- card radius
- pill radius
- avatar radius

Shadow tokens:
- card shadow
- floating action shadow
- overlay shadow

Keep tokens practical for Tailwind / React implementation.
```

## Product owner review checklist

Reject the design if:

- it looks like a poster instead of app UI
- it looks like a SaaS dashboard
- it looks like a classroom app
- the play screen hides the English line
- the mic action is unclear
- the result page feels like an exam report
- emoji are used as main visual identity
- gradients dominate the design
- there are no component states
- there is no inspectable/editable source

Approve only if:

- onboarding is understandable in 10 seconds
- lobby feels like a game/social app
- play screen is voice-first
- result screen is rewarding/shareable
- expression cards feel collectible
- visual system is consistent
- implementation handoff is clear
```

## Engineering handoff checklist

Before implementation, require:

- approved design source link
- screen list
- component list
- interaction states
- color tokens
- typography tokens
- spacing rules
- asset export notes
- responsive/mobile rules
- product owner approval

Engineering should implement screen by screen, not as one uncontrolled visual rewrite.

Recommended implementation order:

1. tokens and UI primitives
2. onboarding
3. lobby
4. play screen
5. result screen
6. room screen
7. expression cards
8. share page

## Final instruction for design tools

```text
Do not create a poster. Do not create a marketing page. Do not create generic pretty screens.

Create a real mobile app UI design system for a voice-first English roleplay party game.

Every screen must be usable by an engineer as a product UI reference.
```
