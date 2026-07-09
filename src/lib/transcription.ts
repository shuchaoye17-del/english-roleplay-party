export type TranscriptionSource = 'openai' | 'mock' | 'mock_fallback';

export type TranscriptionResult = {
  transcript: string;
  durationMs: number;
  confidence: number;
  source: TranscriptionSource;
  message?: string;
  audioSize?: number;
};

function localFallback(fallbackTranscript: string, durationMs = 0): TranscriptionResult {
  return {
    transcript: fallbackTranscript,
    durationMs,
    confidence: 0.7,
    source: 'mock_fallback',
    message: '转写服务暂时没有接住，先用本轮示范台词继续。'
  };
}

export async function transcribeAudio(audioBlob: Blob, durationMs = 0, fallbackTranscript = "Sorry, I think this isn't what I ordered."): Promise<TranscriptionResult> {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'roleplay-turn.webm');
    formData.append('durationMs', String(durationMs));
    formData.append('fallbackTranscript', fallbackTranscript);

    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      return localFallback(fallbackTranscript, durationMs);
    }

    const result = (await response.json()) as TranscriptionResult;
    return {
      transcript: result.transcript || fallbackTranscript,
      durationMs: result.durationMs ?? durationMs,
      confidence: result.confidence ?? 0.7,
      source: result.source ?? 'mock_fallback',
      message: result.message,
      audioSize: result.audioSize
    };
  } catch {
    return localFallback(fallbackTranscript, durationMs);
  }
}
