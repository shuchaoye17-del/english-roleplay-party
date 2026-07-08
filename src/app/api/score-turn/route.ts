import { NextResponse } from 'next/server';
import type { TurnScoreInput } from '@/lib/scoring';
import { mockTurnScore } from '@/lib/scoring';
import { scoreTurnWithOpenAI } from '@/lib/server/openaiScoring';

function isValidInput(value: Partial<TurnScoreInput>): value is TurnScoreInput {
  return Boolean(
    value.scenarioId &&
    value.role &&
    value.emotionTarget &&
    value.hiddenMission &&
    value.transcript &&
    Array.isArray(value.turnHistory)
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<TurnScoreInput>;

    if (!isValidInput(body)) {
      return NextResponse.json({
        ...mockTurnScore,
        source: 'mock_fallback',
        feedback: '这一轮信息不完整，剧场助演先给你一个安全评分，剧情继续。'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        ...mockTurnScore,
        source: 'mock_fallback',
        feedback: '本地还没有配置 OPENAI_API_KEY，先用模拟评分继续。'
      });
    }

    const result = await scoreTurnWithOpenAI(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({
      ...mockTurnScore,
      source: 'mock_fallback',
      feedback: '评分剧场暂时卡住了，先用模拟评分继续。'
    });
  }
}
