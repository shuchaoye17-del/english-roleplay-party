export type TurnScoreInput = {
  scenarioId: string;
  role: string;
  emotionTarget: string;
  hiddenMission: string;
  transcript: string;
  turnHistory: string[];
};

export type TurnScoreSource = 'openai' | 'mock' | 'mock_fallback';

export type TurnScoreResult = {
  roleImmersion: number;
  emotionMatch: number;
  pronunciationClarity: number;
  englishNaturalness: number;
  storyProgress: number;
  teamwork: number;
  title: string;
  feedback: string;
  betterExpression: string;
  expressionCards: string[];
  source: TurnScoreSource;
};

export const mockTurnScore: TurnScoreResult = {
  roleImmersion: 88,
  emotionMatch: 91,
  pronunciationClarity: 82,
  englishNaturalness: 86,
  storyProgress: 90,
  teamwork: 84,
  title: '气氛救场王',
  feedback: '这句很符合礼貌但不满的情绪，像是在认真解决问题，而不是考试答题。',
  betterExpression: 'Could you check it for me?',
  expressionCards: ['No worries', 'Could you check it?'],
  source: 'mock_fallback'
};

export async function scoreTurn(input: TurnScoreInput): Promise<TurnScoreResult> {
  try {
    const response = await fetch('/api/score-turn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      return mockTurnScore;
    }

    const result = (await response.json()) as TurnScoreResult;
    return {
      roleImmersion: result.roleImmersion ?? mockTurnScore.roleImmersion,
      emotionMatch: result.emotionMatch ?? mockTurnScore.emotionMatch,
      pronunciationClarity: result.pronunciationClarity ?? mockTurnScore.pronunciationClarity,
      englishNaturalness: result.englishNaturalness ?? mockTurnScore.englishNaturalness,
      storyProgress: result.storyProgress ?? mockTurnScore.storyProgress,
      teamwork: result.teamwork ?? mockTurnScore.teamwork,
      title: result.title || mockTurnScore.title,
      feedback: result.feedback || mockTurnScore.feedback,
      betterExpression: result.betterExpression || mockTurnScore.betterExpression,
      expressionCards: result.expressionCards?.length ? result.expressionCards : mockTurnScore.expressionCards,
      source: result.source ?? 'mock_fallback'
    };
  } catch {
    return mockTurnScore;
  }
}
