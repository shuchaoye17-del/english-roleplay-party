import { NextResponse } from 'next/server';
import { transcribeWithOpenAI } from '@/lib/server/openaiTranscription';

function mockResponse(transcript: string, durationMs = 0, message = '已收到录音。本阶段使用模拟转写结果。') {
  return {
    transcript,
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
    const fallbackTranscript = String(formData.get('fallbackTranscript') ?? "Sorry, I think this isn't what I ordered.");

    if (!(audio instanceof Blob)) {
      return NextResponse.json({
        ...mockResponse(fallbackTranscript, 0, '暂时没有收到录音，先用本轮示范台词继续。'),
        source: 'mock_fallback'
      });
    }

    if (audio.size === 0 || durationMs < 500) {
      return NextResponse.json({
        ...mockResponse(fallbackTranscript, durationMs, '录音太短或没有检测到声音，先用本轮示范台词继续。'),
        audioSize: audio.size,
        source: 'mock_fallback'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        ...mockResponse(fallbackTranscript, durationMs, '本地还没有配置 OPENAI_API_KEY，先用本轮示范台词继续。'),
        audioSize: audio.size
      });
    }

    const result = await transcribeWithOpenAI(audio, durationMs);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({
      ...mockResponse("Sorry, I think this isn't what I ordered.", 0, '剧场转写暂时卡住了，先用模拟台词继续。'),
      confidence: 0.7,
      source: 'mock_fallback'
    });
  }
}
