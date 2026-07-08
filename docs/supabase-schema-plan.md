# Supabase Schema Plan

This is a future persistence plan. Phase 7 does not add the Supabase SDK or real database writes yet.

## Principles

- The game must continue to work with localStorage fallback.
- Do not block gameplay if persistence fails.
- Do not store raw audio in the MVP.
- Keep user-facing feedback game-like, not exam-like.

## Tables

### profiles

Stores the player's public game profile.

Suggested columns:

- `id uuid primary key`
- `display_name text not null`
- `avatar_id text not null`
- `level integer default 1`
- `exp integer default 0`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

### runs

Stores one completed scenario run.

Suggested columns:

- `id uuid primary key`
- `profile_id uuid references profiles(id)`
- `scenario_id text not null`
- `mode text not null`
- `team_score integer`
- `title text`
- `started_at timestamptz`
- `completed_at timestamptz`

### turns

Stores each spoken turn summary. Do not store raw audio in MVP.

Suggested columns:

- `id uuid primary key`
- `run_id uuid references runs(id)`
- `turn_index integer not null`
- `role text not null`
- `emotion_target text`
- `hidden_mission text`
- `transcript text`
- `role_immersion integer`
- `emotion_match integer`
- `pronunciation_clarity integer`
- `english_naturalness integer`
- `story_progress integer`
- `teamwork integer`
- `feedback text`
- `better_expression text`
- `source text`
- `created_at timestamptz default now()`

### expression_cards

Catalog of expression cards.

Suggested columns:

- `id text primary key`
- `expression text not null`
- `meaning text not null`
- `scene text`
- `emotion text`
- `rarity text`
- `created_at timestamptz default now()`

### user_expression_cards

Unlocked expression cards per user.

Suggested columns:

- `profile_id uuid references profiles(id)`
- `card_id text references expression_cards(id)`
- `unlocked_at timestamptz default now()`
- primary key: `(profile_id, card_id)`

### wardrobe_items

Catalog of cosmetic-only wardrobe items.

Suggested columns:

- `id text primary key`
- `name text not null`
- `type text not null`
- `rarity text`
- `unlock_rule text`
- `is_paid boolean default false`

### user_wardrobe_items

Unlocked cosmetics per user.

Suggested columns:

- `profile_id uuid references profiles(id)`
- `item_id text references wardrobe_items(id)`
- `unlocked_at timestamptz default now()`
- primary key: `(profile_id, item_id)`

## Row Level Security plan

Enable RLS before production writes.

Initial policy direction:

- Public catalog tables can be readable by everyone.
- User-owned tables should only be readable and writable by the owning authenticated user.
- Admin content management should use service role keys only on the server, never in the browser.

## Migration order

1. Keep localStorage as fallback.
2. Add Supabase SDK only after env vars are configured.
3. Create catalog tables first.
4. Add profile persistence.
5. Add run and turn persistence.
6. Add expression card unlock persistence.
7. Add wardrobe persistence.
