# Scenario Template

Use this template for every story scenario.

## Scenario Fields

```ts
export type Scenario = {
  id: string;
  title: string;
  location: string;
  mood: string[];
  recommendedPlayers: 1 | 2 | 3;
  estimatedMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  conflict: string;
  teamGoal: string;
  roles: ScenarioRole[];
  turns: ScenarioTurn[];
  expressionCards: string[];
  rewards: string[];
};
```

## Role Fields

```ts
export type ScenarioRole = {
  id: string;
  name: string;
  identity: string;
  emotionTarget: string;
  hiddenMission: string;
};
```

## Turn Fields

```ts
export type ScenarioTurn = {
  id: string;
  speaker: 'user' | 'ai' | 'player_1' | 'player_2' | 'player_3';
  roleId: string;
  sceneBeat: string;
  intentionHint: string;
  rescueLine: string;
  mockTranscript: string;
  feedback: string;
};
```

## Example Scenario: Cafe Chaos

Title: 咖啡店混乱日

Location: Bright modern cafe

Mood: polite tension, light awkwardness, friendly solution

Recommended players: 1 to 3

Conflict: The customer ordered an iced latte, but the staff brought a hot Americano.

Team goal: Solve the issue politely before the line gets longer.

Key expressions:

- I think this isn't what I ordered.
- Could you check it?
- No worries.

Roles:

Customer:

- Emotion: a little annoyed but polite
- Hidden mission: explain the issue clearly

Staff:

- Emotion: nervous but professional
- Hidden mission: apologize and offer a solution

Friend:

- Emotion: relaxed and humorous
- Hidden mission: reduce awkwardness
