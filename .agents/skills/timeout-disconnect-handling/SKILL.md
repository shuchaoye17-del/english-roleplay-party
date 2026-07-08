---
name: timeout-disconnect-handling
description: Use when implementing multiplayer room reliability, turn timers, player timeout, disconnect, leaving, host migration, AI stand-in, and continuation rules.
---

# Timeout and Disconnect Handling

Multiplayer roleplay must not break when a player times out, disconnects, or leaves.

Core principle:

Never punish remaining players for another player's timeout or exit.

## Turn Timeout

- If the player does not start after 10 seconds, show: “轮到你登场啦！”
- If the player does not start after 20 seconds, show a rescue line: “忘词了吗？可以读这句救场台词。”
- If the player does not act after 30 seconds, trigger AI stand-in.

## AI Stand-in

AI stand-in should:

- Act according to the player's assigned role.
- Respect the player's emotion target.
- Try to complete the hidden mission.
- Keep the story moving.
- Be clearly marked in the UI.

UI copy:

“剧场助演正在帮你接一句。”

## Scoring Impact

- Normal voice line: full scoring.
- Rescue line: max 80 score for that turn.
- AI stand-in: max 50 score for that turn.
- Player left: no full reward.

Do not reduce the remaining players' rewards because of another player's exit.

## Disconnect

- If disconnected for less than 30 seconds, allow reconnection.
- If disconnected for more than 60 seconds, AI stand-in takes over the role until the game ends.
- If the player returns, allow them to watch or resume at the next available turn depending on room state.

## Host Migration

If host leaves:

- Assign host to the earliest active player.
- If only one real player remains, convert to solo continuation mode.
- If no real players remain, end the room.

## Solo Continuation

If only one player remains:

- AI takes all other roles.
- The remaining player can finish the story.
- Award special titles such as:
  - 独自撑场王
  - 临场救场王

## Tone

Use theatrical language, not technical error language.

Say:

- “暂时离开舞台”
- “剧场助演接替”
- “轮到你登场”
- “救场台词”

Avoid:

- “user disconnected”
- “timeout error”
- “operation failed”
