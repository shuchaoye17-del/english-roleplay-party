import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audio = formData.get('audio');

    if (!(audio instanceof Blob)) {
      return NextResponse.json(
        {
          transcript: "Sorry, I think this isn't what I ordered.",
          durationMs: 0,
          confidence: 0.78,
          source: 'mock_fallback',
          message: '暂时没有收到录音，先用剧场助演台词继续。'
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      transcript: "Sorry, I think this isn't what I ordered.",
      durationMs: Number(formData.get('durationMs') ?? 8420),
      confidence: 0.91,
      source: 'mock',
      audioSize: audio.size,
      message: '已收到录音。本阶段仍使用模拟转写结果。'
    });
  } catch {
    return NextResponse.json(
      {
        transcript: "Sorry, I think this isn't what I ordered.",
        durationMs: 0,
        confidence: 0.7,
        source: 'mock_fallback',
        message: '剧场转写暂时卡住了，先用模拟台词继续。'
      },
      { status: 200 }
    );
  }
}
