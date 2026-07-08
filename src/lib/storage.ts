export type PlayerProfile = {
  name: string;
  avatarId: string;
  level: number;
  exp: number;
};

export type LatestRunSummary = {
  scenarioId: string;
  score: number;
  title: string;
  completedAt: string;
  expressionCards: string[];
};

const keys = {
  profile: 'english-roleplay-party:profile',
  expressionCards: 'english-roleplay-party:expression-cards',
  latestRun: 'english-roleplay-party:latest-run'
};

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const value = window.localStorage.getItem(key);
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage must never break the game flow.
  }
}

export function getPlayerProfile(): PlayerProfile | null {
  return readJson<PlayerProfile | null>(keys.profile, null);
}

export function savePlayerProfile(profile: PlayerProfile) {
  writeJson(keys.profile, profile);
}

export function getUnlockedExpressionCards(): string[] {
  return readJson<string[]>(keys.expressionCards, []);
}

export function saveUnlockedExpressionCards(cardIds: string[]) {
  writeJson(keys.expressionCards, Array.from(new Set(cardIds)));
}

export function addUnlockedExpressionCards(cardIds: string[]) {
  const existing = getUnlockedExpressionCards();
  saveUnlockedExpressionCards([...existing, ...cardIds]);
}

export function getLatestRunSummary(): LatestRunSummary | null {
  return readJson<LatestRunSummary | null>(keys.latestRun, null);
}

export function saveLatestRunSummary(summary: LatestRunSummary) {
  writeJson(keys.latestRun, summary);
}
