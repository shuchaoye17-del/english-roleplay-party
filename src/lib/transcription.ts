export type TranscriptionSource = 'openai' | 'mock' | 'mock_fallback';

export type TranscriptionResult = {
  transcript: string;
  durationMs: number;
  confidence: number;
  source: TranscriptionSource;
  message?: string;
  audioSize?: number;
};

const localFallback: TranscriptionResult = {
  transcript: "Sorry, I think this isn't what I ordered.",
  durationMs: 0,
  confidence: 0.7,
  source: 'mock_fallback',
  message: '转写服务暂时没有接住，先用模拟台词继续。'
};

export async function transcribeAudio(audioBlob: Blob, durationMs = 0): Promise<TranscriptionResult> {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'roleplay-turn.webm');
    formData.append('durationMs', String(durationMs));

    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      return localFallback;
    }

    const result = (await response.json()) as TranscriptionResult;
    return {
      transcript: result.transcript || localFallback.transcript,
      durationMs: result.durationMs ?? durationMs,
      confidence: result.confidence ?? localFallback.confidence,
      source: result.source ?? 'mock_fallback',
      message: result.message,
      audioSize: result.audioSize
    };
  } catch {
    return localFallback;
  }
}
