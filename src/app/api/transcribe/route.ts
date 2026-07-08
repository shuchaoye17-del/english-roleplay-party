import { NextResponse } from 'next/server';
import { transcribeWithOpenAI } from '@/lib/server/openaiTranscription';

function mockResponse(durationMs = 0, message = '已收到录音。本阶段使用模拟转写结果。') {
  return {
    transcript: "Sorry, I think this isn't what I ordered.",
    durationMs,
    confidence: 0.91,
    source: 'mock',
    message
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audio = formData.get('audio');
    const durationMs = Number(formData.get('durationMs') ?? 0);

    if (!(audio instanceof Blob)) {
      return NextResponse.json({
        ...mockResponse(0, '暂时没有收到录音，先用剧场助演台词继续。'),
        source: 'mock_fallback'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        ...mockResponse(durationMs, '本地还没有配置 OPENAI_API_KEY，先用模拟转写继续。'),
        audioSize: audio.size
      });
    }

    const result = await transcribeWithOpenAI(audio, durationMs);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({
      ...mockResponse(0, '剧场转写暂时卡住了，先用模拟台词继续。'),
      confidence: 0.7,
      source: 'mock_fallback'
    });
  }
}
