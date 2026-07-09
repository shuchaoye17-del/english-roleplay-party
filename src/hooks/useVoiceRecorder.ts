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

const mimeTypeCandidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/aac', 'audio/ogg;codecs=opus'];

function getSupportedMimeType() {
  if (typeof MediaRecorder === 'undefined' || typeof MediaRecorder.isTypeSupported !== 'function') return undefined;
  return mimeTypeCandidates.find((type) => MediaRecorder.isTypeSupported(type));
}

export function useVoiceRecorder(): UseVoiceRecorderResult {
  const [state, setState] = useState<VoiceRecorderState>('idle');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [durationMs, setDurationMs] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const startedAtRef = useRef<number | null>(null);
  const mimeTypeRef = useRef('audio/webm');

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
      setErrorMessage('当前浏览器暂时不支持麦克风录音。可以先点“先体验模拟演绎”。');
      return false;
    }

    if (typeof MediaRecorder === 'undefined') {
      setState('error');
      setErrorMessage('当前浏览器不支持网页录音组件。建议换 Chrome / Safari，或先体验模拟演绎。');
      return false;
    }

    try {
      setState('permission_request');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      mediaStreamRef.current = stream;
      chunksRef.current = [];

      const supportedMimeType = getSupportedMimeType();
      mimeTypeRef.current = supportedMimeType ?? 'audio/webm';
      const recorder = supportedMimeType ? new MediaRecorder(stream, { mimeType: supportedMimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const nextDurationMs = startedAtRef.current ? Date.now() - startedAtRef.current : 0;
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || mimeTypeRef.current });
        setAudioBlob(blob);
        setDurationMs(nextDurationMs);
        cleanupStream();
        setState('stopped');

        if (blob.size === 0) {
          setErrorMessage('没有检测到有效录音，系统会用本轮示范台词继续。');
        }
      };

      recorder.onerror = () => {
        cleanupStream();
        setState('error');
        setErrorMessage('舞台麦克风出了点小状况，可以先体验模拟演绎。');
      };

      recorder.start(250);
      startedAtRef.current = Date.now();
      setState('recording');
      return true;
    } catch (error) {
      cleanupStream();
      setState('permission_denied');
      const message = error instanceof DOMException && error.name === 'NotAllowedError'
        ? '需要允许麦克风权限才能登场。也可以先体验模拟演绎。'
        : '暂时没有检测到可用麦克风，可以换浏览器或先体验模拟演绎。';
      setErrorMessage(message);
      return false;
    }
  }, [cleanupStream]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      try {
        mediaRecorderRef.current.requestData();
      } catch {
        // Some browsers do not allow requestData at this moment; stop still works.
      }
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
