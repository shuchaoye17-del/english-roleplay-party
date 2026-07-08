import type { TranscriptionResult } from '@/lib/transcription';

const OPENAI_TRANSCRIPTION_URL = 'https://api.openai.com/v1/audio/transcriptions';
const DEFAULT_TRANSCRIPTION_MODEL = 'gpt-4o-mini-transcribe';

function fallbackTranscription(durationMs = 0, message = '真实转写暂时不可用，先用模拟台词继续。'): TranscriptionResult {
  return {
    transcript: "Sorry, I think this isn't what I ordered.",
    durationMs,
    confidence: 0.7,
    source: 'mock_fallback',
    message
  };
}

type OpenAITranscriptionResponse = {
  text?: string;
};

export async function transcribeWithOpenAI(audio: Blob, durationMs = 0): Promise<TranscriptionResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return fallbackTranscription(durationMs, '本地还没有配置 OPENAI_API_KEY，先用模拟转写继续。');
  }

  try {
    const formData = new FormData();
    formData.append('file', audio, 'roleplay-turn.webm');
    formData.append('model', process.env.OPENAI_TRANSCRIBE_MODEL || DEFAULT_TRANSCRIPTION_MODEL);
    formData.append('language', 'en');
    formData.append('response_format', 'json');
    formData.append('prompt', 'Transcribe the speaker practicing natural English roleplay dialogue.');

    const response = await fetch(OPENAI_TRANSCRIPTION_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      body: formData
    });

    if (!response.ok) {
      return fallbackTranscription(durationMs, 'OpenAI 转写暂时没有接住，先用模拟台词继续。');
    }

    const result = (await response.json()) as OpenAITranscriptionResponse;
    const transcript = result.text?.trim();

    if (!transcript) {
      return fallbackTranscription(durationMs, '这次录音没有识别出清晰台词，先用模拟台词继续。');
    }

    return {
      transcript,
      durationMs,
      confidence: 0.9,
      source: 'openai',
      message: '已使用真实语音转写结果。',
      audioSize: audio.size
    };
  } catch {
    return fallbackTranscription(durationMs, '真实转写服务暂时卡住了，先用模拟台词继续。');
  }
}
