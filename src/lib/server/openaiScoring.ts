import type { TurnScoreInput, TurnScoreResult } from '@/lib/scoring';
import { mockTurnScore } from '@/lib/scoring';

const OPENAI_CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_SCORING_MODEL = 'gpt-4o-mini';

function clampScore(value: unknown, fallback: number) {
  if (typeof value !== 'number' || Number.isNaN(value)) return fallback;
  return Math.min(100, Math.max(0, Math.round(value)));
}

function normalizeScore(value: Partial<TurnScoreResult>, source: TurnScoreResult['source']): TurnScoreResult {
  return {
    roleImmersion: clampScore(value.roleImmersion, mockTurnScore.roleImmersion),
    emotionMatch: clampScore(value.emotionMatch, mockTurnScore.emotionMatch),
    pronunciationClarity: clampScore(value.pronunciationClarity, mockTurnScore.pronunciationClarity),
    englishNaturalness: clampScore(value.englishNaturalness, mockTurnScore.englishNaturalness),
    storyProgress: clampScore(value.storyProgress, mockTurnScore.storyProgress),
    teamwork: clampScore(value.teamwork, mockTurnScore.teamwork),
    title: value.title || mockTurnScore.title,
    feedback: value.feedback || mockTurnScore.feedback,
    betterExpression: value.betterExpression || mockTurnScore.betterExpression,
    expressionCards: value.expressionCards?.length ? value.expressionCards.slice(0, 3) : mockTurnScore.expressionCards,
    source
  };
}

function fallbackScore(source: TurnScoreResult['source'] = 'mock_fallback'): TurnScoreResult {
  return normalizeScore(mockTurnScore, source);
}

type OpenAIChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function scoreTurnWithOpenAI(input: TurnScoreInput): Promise<TurnScoreResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return fallbackScore('mock_fallback');
  }

  try {
    const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_SCORING_MODEL || DEFAULT_SCORING_MODEL,
        temperature: 0.3,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: [
              'You score a mobile English roleplay party game.',
              'Return strict JSON only.',
              'Do not sound like a school exam.',
              'Score simple, natural, role-appropriate English highly.',
              'Scores must be integers from 0 to 100.',
              'Required keys: roleImmersion, emotionMatch, pronunciationClarity, englishNaturalness, storyProgress, teamwork, title, feedback, betterExpression, expressionCards.'
            ].join(' ')
          },
          {
            role: 'user',
            content: JSON.stringify({
              scenarioId: input.scenarioId,
              role: input.role,
              emotionTarget: input.emotionTarget,
              hiddenMission: input.hiddenMission,
              transcript: input.transcript,
              turnHistory: input.turnHistory,
              rubric: {
                roleImmersion: 'Did the player sound like the assigned character?',
                emotionMatch: 'Did the line match the target emotion?',
                pronunciationClarity: 'Estimate clarity from transcript quality only; do not overclaim audio analysis.',
                englishNaturalness: 'Is the English natural and useful?',
                storyProgress: 'Did the line move the story forward?',
                teamwork: 'Would this line help other players continue?'
              },
              tone: 'Chinese feedback, game-like, encouraging, concise.'
            })
          }
        ]
      })
    });

    if (!response.ok) {
      return fallbackScore('mock_fallback');
    }

    const payload = (await response.json()) as OpenAIChatResponse;
    const content = payload.choices?.[0]?.message?.content;
    if (!content) {
      return fallbackScore('mock_fallback');
    }

    const parsed = JSON.parse(content) as Partial<TurnScoreResult>;
    return normalizeScore(parsed, 'openai');
  } catch {
    return fallbackScore('mock_fallback');
  }
}
