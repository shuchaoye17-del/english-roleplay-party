'use client';

import { useCallback, useRef, useState } from 'react';

export type VoiceRecorderState =
  | 'idle'
  | 'permission_request'
  | 'permission_denied'
  | 'ready'
  | 'recording'
  | 'stopped'
  | 'error';

type UseVoiceRecorderResult = {
  state: VoiceRecorderState;
  audioBlob: Blob | null;
  durationMs: number;
  errorMessage: string;
  startRecording: () => Promise<boolean>;
  stopRecording: () => void;
  resetRecording: () => void;
};

export function useVoiceRecorder(): UseVoiceRecorderResult {
  const [state, setState] = useState<VoiceRecorderState>('idle');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [durationMs, setDurationMs] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const startedAtRef = useRef<number | null>(null);

  const cleanupStream = useCallback(() => {
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
  }, []);

  const resetRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    cleanupStream();
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    startedAtRef.current = null;
    setAudioBlob(null);
    setDurationMs(0);
    setErrorMessage('');
    setState('idle');
  }, [cleanupStream]);

  const startRecording = useCallback(async () => {
    setErrorMessage('');
    setAudioBlob(null);
    setDurationMs(0);

    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setState('error');
      setErrorMessage('当前浏览器暂时不支持录音，可以先体验模拟演绎。');
      return false;
    }

    try {
      setState('permission_request');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        setAudioBlob(blob);
        setDurationMs(startedAtRef.current ? Date.now() - startedAtRef.current : 0);
        cleanupStream();
        setState('stopped');
      };

      recorder.onerror = () => {
        cleanupStream();
        setState('error');
        setErrorMessage('舞台麦克风出了点小状况，可以先体验模拟演绎。');
      };

      recorder.start();
      startedAtRef.current = Date.now();
      setState('recording');
      return true;
    } catch {
      cleanupStream();
      setState('permission_denied');
      setErrorMessage('需要麦克风权限才能登场。如果暂时不想授权，也可以先体验模拟演绎。');
      return false;
    }
  }, [cleanupStream]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      return;
    }

    if (state === 'recording') {
      cleanupStream();
      setState('stopped');
    }
  }, [cleanupStream, state]);

  return {
    state,
    audioBlob,
    durationMs,
    errorMessage,
    startRecording,
    stopRecording,
    resetRecording
  };
}
