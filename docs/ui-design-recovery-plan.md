# UI design recovery plan

## Current status

The UI problem is not solved yet.

The project has tested two design paths:

1. code-first visual styling
2. Canva prompt-based visual generation

Both are not acceptable as the final UI process.

## Why code-first failed

The previous code-first UI attempt moved too quickly from product idea to CSS implementation.

Problems:

- visual style was invented directly in code
- gradients and decorations became excessive
- emoji-like visual treatment felt cheap
- there was no professional design source
- engineering changed appearance without a design decision gate

Conclusion:

> Do not solve major UI direction directly in code.

## Why Canva failed

Canva was useful for quick visual exploration, but the outputs were still too generic.

Problems:

- looked closer to posters or marketing graphics than real app screens
- did not produce enough screen-by-screen mobile UI structure
- did not strongly solve voice-first interaction states
- did not reach product-owner approval after two batches

Conclusion:

> Do not keep generating Canva batches blindly.

## New required route

The project needs a UI-specific design source before engineering implementation.

The source should support at least one of:

- editable mobile app screens
- reusable UI components
- component states
- design tokens
- prototype interactions
- developer handoff

## Recommended tool direction

### Preferred: Figma-style app UI workflow

Use this when available because the project needs:

- screen frames
- components
- variants
- design tokens
- prototyping
- developer handoff
- design-to-code traceability

### Alternative: app UI generator workflow

Use tools such as app/UI specific generators only if they can produce:

- real screen layouts
- not poster-like graphics
- multiple app states
- exportable or inspectable design source

### Fallback: product-owner supplied reference source

If no plugin is available, product owner can provide:

- Figma link
- app screenshots
- UI kit
- product reference board
- professional mockup file

Engineering should still wait for approval before implementation.

## Design target

The app should feel like:

> A polished mobile social game for practicing spoken English through roleplay.

It should not feel like:

- a SaaS dashboard
- a classroom app
- an exam tool
- a generic poster
- a cheap gradient template
- an emoji-heavy prototype
- a dark dating app
- a children's cartoon app

## Required screens

A valid UI design source must include these mobile screens.

### 1. Onboarding / landing

Purpose:

- explain product in 10 seconds
- reduce fear of speaking English
- make first play action obvious

Required elements:

- product title: 英语角色派对
- one-liner: 用英语演故事，边玩边练口语
- primary CTA: 开一局英语小剧场
- reassurance: 不会说也有台词提示
- role/avatar preview

### 2. Lobby / story hall

Purpose:

- feel like a mobile game lobby
- show the first playable scenario
- hint future social expansion

Required elements:

- featured scenario card
- scenario list
- tags
- user/player status
- bottom navigation
- locked future content state

### 3. Room / team ready

Purpose:

- show role lineup
- make AI stand-in understandable
- prepare user for performance

Required elements:

- scenario title
- role cards
- player slots
- ready state
- AI stand-in slot
- start CTA

### 4. Play / voice acting

Purpose:

- focus user on one English line
- make recording action safe and obvious
- keep voice as the main flow

Required elements:

- current role
- current story prompt
- visible English line
- microphone button
- recording state
- processing state
- short/empty recording fallback
- feedback card

### 5. Result / rating

Purpose:

- reward the user emotionally
- make the result screenshot-worthy
- avoid school-grade feeling

Required elements:

- S/A/B rating style
- achievement title
- score dimensions
- earned expression cards
- replay CTA
- share CTA

### 6. Expression cards

Purpose:

- make English expressions collectible
- connect phrases to scenario context

Required elements:

- phrase
- Chinese meaning
- usage context
- rarity/category style
- locked/earned states

### 7. Share page

Purpose:

- explain the demo to testers
- provide easy forwarding copy
- drive first play

Required elements:

- product one-liner
- demo explanation
- tester questions
- CTA

## UI-specific generation prompt

Use this prompt in a UI-specific design tool, not generic poster generation.

```text
Design a high-fidelity mobile app UI system for 英语角色派对 / English Roleplay Party.

Product:
A voice-first English roleplay party game. Users enter short social scenes, read or improvise one English line, record their voice, get playful feedback, receive a game-like rating, and collect expression cards.

Design feeling:
Polished youthful mobile social game. Bright but controlled. Character-forward. Party/social energy. Voice-first. Low-pressure for shy English speakers. Premium consumer app, not classroom education.

Avoid:
SaaS dashboard, exam app, generic education app, random gradients, emoji-heavy visuals, poster layout, childish cartoon, dark dating app, cheap template feeling.

Required output:
Create real mobile app screens, not marketing posters. Use iPhone-size frames. Include reusable components and states.

Screens:
1. Onboarding / landing
2. Lobby / story hall
3. Room / team ready
4. Play / voice acting
5. Result / rating card
6. Expression cards
7. Share handoff page

Critical interaction states:
- mic idle
- recording
- processing/transcribing
- permission denied
- short/empty recording fallback
- AI stand-in active
- earned expression card
- locked future scenario

Visual requirements:
- clear typography hierarchy
- strong card system
- bottom nav
- consistent badges
- clear microphone control
- screenshot-worthy result page
- consistent avatar/character direction
- mobile-safe spacing
- no random decoration

Handoff requirements:
- color tokens
- type scale
- spacing rules
- component variants
- asset export notes
- implementation notes
```

## Acceptance bar before engineering

A design source can enter engineering only if all are true:

- product owner approves the direction
- screens look like real mobile app UI
- play screen clearly prioritizes voice
- result page is rewarding and shareable
- design includes states, not only static hero screens
- visual style is consistent
- no random gradient/emoji-heavy template feeling
- implementation notes or inspectable design source exists

## Engineering rule

Until a design source passes the acceptance bar:

- no large UI implementation PR
- no page-by-page restyling
- no new visual system in code
- no emoji/gradient replacement attempt

Allowed work:

- functional bug fixes
- voice recording fixes
- API/scoring improvements
- deployment work
- tester feedback collection
- documentation

## Immediate next step

Find or connect a UI-specific design workflow.

Best next source types:

1. Figma file or Figma-style design source
2. UI app generator output with editable screens
3. product-owner supplied professional reference board
4. high-fidelity screen mockups with components and states

After a design source exists, open a new decision gate before engineering.
