# Design handoff checklist

This checklist defines what engineering needs before implementing the next major UI redesign.

## Rule

No large visual implementation should begin until the design handoff package is complete.

Small functional fixes may continue. Large UI changes must reference a professional design source.

## Required design source

Before implementation, provide:

- Figma file or equivalent design source
- mobile frame size used in design
- screen list
- component library or reusable component frames
- asset exports
- implementation notes

## Required core screens

The design source must include high-fidelity versions of:

- onboarding / landing
- lobby / story hall
- room / team ready page
- play / voice acting page
- result / rating card
- expression cards
- share handoff page

## Required states

### Onboarding

- default state
- avatar selected state
- empty name state
- CTA enabled / disabled state

### Lobby

- featured scenario
- scenario list item
- locked future section
- bottom navigation active state

### Room

- empty player slot
- ready player
- current user
- AI stand-in slot
- ready button state

### Play

- waiting to record
- permission request
- permission denied
- recording
- stopped
- transcribing / processing
- short or empty recording fallback
- feedback shown
- AI stand-in used
- final-turn CTA

### Result

- S rating
- A rating
- lower rating
- earned expression cards
- share CTA
- replay CTA

### Expression cards

- locked card
- earned card
- compact card
- detailed card

## Required tokens

The design handoff must define these tokens.

### Color tokens

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

### Typography tokens

- display title
- screen title
- section title
- card title
- body
- caption
- button label
- badge label

For each token, specify:

- font family
- font size
- line height
- font weight

### Spacing tokens

- page horizontal padding
- section gap
- card padding
- card internal gap
- button padding
- badge padding
- bottom navigation safe-area spacing

### Shape tokens

- small radius
- medium radius
- card radius
- pill radius
- avatar radius

### Shadow tokens

- card shadow
- floating button shadow
- modal / overlay shadow

Avoid excessive shadows. Shadows should support hierarchy, not decoration.

## Required assets

The handoff should include exports for:

- logo / wordmark if designed
- avatar illustrations
- scenario cover artwork
- microphone icons
- rating medal or badge artwork
- expression card visual elements
- sticker / badge decorations

Export requirements:

- SVG for icons and simple vector shapes
- PNG/WebP for illustrations
- 2x or 3x resolution for raster assets
- transparent background when needed
- named consistently

## Component implementation checklist

For every reusable component, the design should specify:

- default state
- pressed state
- disabled state
- loading state where relevant
- error state where relevant
- text overflow behavior
- min/max content examples

Components that need specs:

- primary button
- secondary button
- card
- badge
- sticker / label
- bottom nav
- scenario card
- role card
- player slot
- microphone button
- transcript card
- score card
- expression card

## Engineering acceptance criteria

A UI implementation PR can be accepted only if:

- it references the design source
- it lists which screens were implemented
- it keeps product flow unchanged unless explicitly requested
- it passes lint, typecheck, and build
- it does not introduce random emoji as primary visuals
- it does not add uncontrolled gradient-heavy styling
- it keeps mobile viewport readability
- it includes screenshots or preview notes when possible

## Design review checklist

Before coding, confirm:

- first screen is understandable in 10 seconds
- English speaking fear is reduced by visible script lines
- microphone action is visually clear
- result screen feels like a game achievement
- visual system is consistent across screens
- future social/multiplayer features can fit the system
- the style looks like a consumer app, not a template

## Implementation order after design is ready

Recommended order:

1. Design tokens and shared UI primitives
2. Onboarding / landing
3. Lobby / story hall
4. Play / voice acting page
5. Result / rating card
6. Room / team ready page
7. Expression cards
8. Share handoff page

Do not implement all screens in one uncontrolled PR. Use screen-by-screen PRs with CI validation.

## What is allowed before design is ready

Allowed:

- functional bug fixes
- recording compatibility fixes
- deployment documentation
- tester feedback documentation
- small copy edits
- emergency UI simplification hotfixes

Not allowed:

- large visual redesign
- new gradient style system
- emoji-heavy visual replacement
- new illustration placeholders pretending to be final design
- page-by-page restyling without design source
