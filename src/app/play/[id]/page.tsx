'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PlayImplementationScreen,
  type PlayImplementationReward,
  type PlayImplementationVoiceState
} from '@/components/play/PlayImplementationScreen';
import { getScenario } from '@/data/scenarios';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { mockTurnScore, scoreTurn, type TurnScoreResult } from '@/lib/scoring';
import { transcribeAudio } from '@/lib/transcription';

type TurnState =
  | 'preparing'
  | 'recording'
  | 'transcribing'
  | 'feedback'
  | 'too_short'
  | 'permission_denied'
  | 'ai_stand_in';

type MockLine = {
  prompt: string;
  rescueLine: string;
  feedback: string;
  reaction: string;
};

const mockLines: MockLine[] = [
  {
    prompt: 'React with surprise and ask where the birthday cake went.',
    rescueLine: 'Wait, where did the cake go? I was watching it!',
    feedback: 'Strong surprise. The line clearly moves the mystery forward.',
    reaction: 'The team looks toward the kitchen and starts searching for clues.'
  },
  {
    prompt: 'Share one clue you noticed near the kitchen door.',
    rescueLine: 'I saw someone walk toward the kitchen a minute ago.',
    feedback: 'Good clue delivery. The sentence sounds natural and useful.',
    reaction: 'Ethan writes the clue down and asks everyone to check the hallway.'
  },
  {
    prompt: 'Suggest a possible clue without sounding too certain.',
    rescueLine: 'Maybe the candles are the clue. They look different.',
    feedback: 'Nice use of maybe. It keeps the role playful and collaborative.',
    reaction: 'Mia notices one candle has frosting on the bottom.'
  },
  {
    prompt: 'Invite another player to help continue the scene.',
    rescueLine: "Jason, did you see anything when the lights went out?",
    feedback: 'Great teamwork. You pulled another character into the scene.',
    reaction: 'Jason remembers hearing a plate hit the table.'
  },
  {
    prompt: 'Celebrate solving the mystery with the group.',
    rescueLine: 'We found it! The cake was hiding behind the gift table.',
    feedback: 'Fun ending. Your line closes the scene with clear emotion.',
    reaction: 'The narrator gives the team a party bonus.'
  }
];

function buildVoiceStates(
  turnState: TurnState,
  recorderState: string,
  durationMs: number
): PlayImplementationVoiceState[] {
  const isIdle = turnState === 'preparing' && recorderState !== 'permission_denied';
  const isRecording = turnState === 'recording' || recorderState === 'recording';
  const isProcessing = turnState === 'transcribing';
  const isTooShort = turnState === 'too_short';
  const isPermissionDenied =
    turnState === 'permission_denied' || recorderState === 'permission_denied' || recorderState === 'error';
  const isStandIn = turnState === 'ai_stand_in';

  return [
    {
      title: 'Idle',
      note: 'Tap to speak',
      color: isIdle
        ? 'border-[#8b94a3] bg-white text-[#111827]'
        : 'border-[#e0e5ee] bg-white text-[#7c8493]',
      dot: 'bg-[#8b94a3]'
    },
    {
      title: 'Recording',
      note: isRecording ? `${Math.max(1, Math.ceil(durationMs / 1000))}:00` : '0:03',
      color: isRecording
        ? 'border-[#ff5e58] bg-white text-[#111827]'
        : 'border-[#e0e5ee] bg-white text-[#111827]',
      dot: 'bg-[#ff5e58]'
    },
    {
      title: 'Processing',
      note: 'Transcribing...',
      color: isProcessing
        ? 'border-[#3f8cff] bg-white text-[#111827]'
        : 'border-[#e0e5ee] bg-white text-[#111827]',
      dot: 'bg-[#3f8cff]'
    },
    {
      title: 'Too short',
      note: 'Please speak a bit longer',
      color: isTooShort
        ? 'border-[#f08a24] bg-white text-[#111827]'
        : 'border-[#e0e5ee] bg-white text-[#111827]',
      dot: 'bg-[#f08a24]'
    },
    {
      title: 'Permission denied',
      note: 'Mic access is blocked',
      color: isPermissionDenied
        ? 'border-[#8e63ff] bg-white text-[#111827]'
        : 'border-[#e0e5ee] bg-white text-[#111827]',
      dot: 'bg-[#8e63ff]'
    },
    {
      title: 'AI Stand-in Active',
      note: 'AI continues the scene',
      color: isStandIn
        ? 'border-[#3f8cff] bg-white text-[#111827]'
        : 'border-[#e0e5ee] bg-white text-[#111827]',
      dot: 'bg-[#3f8cff]'
    }
  ];
}

function buildReward(
  turnScore: TurnScoreResult | null,
  transcript: string,
  note: string,
  isLastTurn: boolean
): PlayImplementationReward {
  const earnedCard = turnScore?.expressionCards[0] || 'Surprised';

  return {
    imageSrc: '/play-implementation-preview/reward-thumb.webp',
    eyebrow: turnScore ? 'Expression Card Earned!' : 'Expression Card Preview',
    title: earnedCard,
    badge: turnScore ? 'New' : 'Ready',
    description: turnScore?.title || transcript || note || 'Speak the line to earn this card.',
    actionLabel: turnScore ? (isLastTurn ? 'View Results' : 'Next Line') : 'View Card'
  };
}

export default function PlayPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const scenario = getScenario(params.id);
  const recorder = useVoiceRecorder();
  const [turn, setTurn] = useState(0);
  const [state, setState] = useState<TurnState>('preparing');
  const [lastTranscript, setLastTranscript] = useState('');
  const [turnHistory, setTurnHistory] = useState<string[]>([]);
  const [pendingTranscription, setPendingTranscription] = useState(false);
  const [transcriptionNote, setTranscriptionNote] = useState('');
  const [turnScore, setTurnScore] = useState<TurnScoreResult | null>(null);

  const currentLine = mockLines[turn] ?? mockLines[mockLines.length - 1];
  const role = scenario.roles[0];
  const isLastTurn = turn >= mockLines.length - 1;

  const completeTurn = useCallback((transcript: string, nextState: TurnState) => {
    setLastTranscript(transcript);
    setTurnHistory((history) => [...history, transcript]);
    setState(nextState);
  }, []);

  useEffect(() => {
    const audioBlob = recorder.audioBlob;
    if (!pendingTranscription || !audioBlob) return;

    let cancelled = false;

    const runTranscriptionAndScoring = async () => {
      setState('transcribing');

      if (audioBlob.size < 200 || recorder.durationMs < 500) {
        setTranscriptionNote('Recording was too short, so the AI stand-in kept the scene moving.');
        setTurnScore(mockTurnScore);
        completeTurn(currentLine.rescueLine, 'too_short');
        setPendingTranscription(false);
        return;
      }

      setTranscriptionNote('Listening to your line and preparing roleplay feedback...');
      const transcription = await transcribeAudio(audioBlob, recorder.durationMs, currentLine.rescueLine);
      if (cancelled) return;

      const transcript = transcription.transcript || currentLine.rescueLine;
      setTranscriptionNote(transcription.message ?? 'Transcription complete. Scoring the roleplay turn...');

      const score = await scoreTurn({
        scenarioId: scenario.id,
        role: role?.name ?? 'Lily',
        emotionTarget: role?.emotion ?? 'surprised and curious',
        hiddenMission: role?.hiddenMission ?? currentLine.prompt,
        transcript,
        turnHistory
      });

      if (cancelled) return;
      setTurnScore(score);
      setTranscriptionNote(transcription.message ?? 'Turn scored. You earned a new expression card.');
      completeTurn(transcript, 'feedback');
      setPendingTranscription(false);
    };

    void runTranscriptionAndScoring();

    return () => {
      cancelled = true;
    };
  }, [
    completeTurn,
    currentLine.prompt,
    currentLine.rescueLine,
    pendingTranscription,
    recorder.audioBlob,
    recorder.durationMs,
    role?.emotion,
    role?.hiddenMission,
    role?.name,
    scenario.id,
    turnHistory
  ]);

  const handleMicClick = async () => {
    if (recorder.state === 'recording') {
      setPendingTranscription(true);
      setTranscriptionNote('Recording stopped. Transcribing and scoring this turn...');
      recorder.stopRecording();
      setState('transcribing');
      return;
    }

    setTranscriptionNote('');
    setTurnScore(null);
    setLastTranscript('');
    const started = await recorder.startRecording();
    if (started) {
      setState('recording');
      setTranscriptionNote('Recording. Say the English line clearly and naturally.');
      return;
    }

    setState('permission_denied');
  };

  const nextTurn = () => {
    if (!turnScore && !lastTranscript) return;

    if (isLastTurn) {
      router.push(`/result/${scenario.id}`);
      return;
    }

    recorder.resetRecording();
    setPendingTranscription(false);
    setTranscriptionNote('Next line is ready. Tap the mic when you are in character.');
    setTurnScore(null);
    setLastTranscript('');
    setTurn((value) => value + 1);
    setState('preparing');
  };

  const triggerStandIn = () => {
    recorder.resetRecording();
    setPendingTranscription(false);
    setTranscriptionNote('AI stand-in performed this line so the scene could continue.');
    setTurnScore({
      ...mockTurnScore,
      title: 'AI stand-in kept the story moving',
      feedback: 'This turn was handled by the AI stand-in. Try the next line when you are ready.',
      expressionCards: ['AI Stand-in Assist']
    });
    completeTurn(currentLine.rescueLine, 'ai_stand_in');
  };

  const voiceStates = useMemo(
    () => buildVoiceStates(state, recorder.state, recorder.durationMs),
    [recorder.durationMs, recorder.state, state]
  );

  const reward = useMemo(
    () => buildReward(turnScore, lastTranscript, transcriptionNote, isLastTurn),
    [isLastTurn, lastTranscript, transcriptionNote, turnScore]
  );

  const micLabel =
    recorder.state === 'recording'
      ? 'Stop speaking'
      : state === 'transcribing'
        ? 'Processing...'
        : 'Tap to speak';

  return (
    <PlayImplementationScreen
      title="The Missing Birthday Cake"
      sceneLabel={`Scene ${turn + 1}/${mockLines.length}`}
      progressSegments={mockLines.length}
      activeProgressSegments={turn + 1}
      lineText={currentLine.rescueLine}
      instructionText={
        state === 'recording'
          ? 'Recording now. Say the line above in character.'
          : transcriptionNote || "It's your turn! Tap the mic and say the line above."
      }
      micLabel={micLabel}
      isRecording={recorder.state === 'recording'}
      voiceStates={voiceStates}
      reward={reward}
      onBack={() => router.push('/lobby')}
      onMicClick={handleMicClick}
      onHints={triggerStandIn}
      onViewReward={nextTurn}
    />
  );
}
