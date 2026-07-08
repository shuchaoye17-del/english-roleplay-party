'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getScenario } from '@/data/scenarios';
import { Badge, BottomNav, Button, Card, PhoneShell, ProgressBar } from '@/components/ui';
import { MicButton } from '@/components/MicButton';
import { RoleCard } from '@/components/RoleCard';
import { VoiceStatePill } from '@/components/VoiceStatePill';
import { ScenePanel } from '@/components/ScenePanel';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { transcribeAudio } from '@/lib/transcription';

type TurnState = 'waiting_turn' | 'preparing' | 'recording' | 'transcribing' | 'feedback' | 'timeout_warning' | 'rescue_line_shown' | 'ai_stand_in';

const mockLines = [
  {
    prompt: '表达你想点一杯冰拿铁。',
    transcript: "I'd like an iced latte, please.",
    feedback: '开场自然，语气轻松。',
    reaction: '店员微笑确认订单。',
    rescueLine: "I'd like an iced latte, please."
  },
  {
    prompt: '表达这不是你点的饮品，但不要太冲。',
    transcript: "Sorry, I think this isn't what I ordered.",
    feedback: '这句很符合“礼貌但不满”的情绪。',
    reaction: '店员意识到问题，准备道歉。',
    rescueLine: "Sorry, I think this isn't what I ordered."
  },
  {
    prompt: '请店员帮你确认订单。',
    transcript: 'Could you check it for me?',
    feedback: '表达很自然，也推动了剧情。',
    reaction: '店员开始查看订单记录。',
    rescueLine: 'Could you check it for me?'
  },
  {
    prompt: '回应店员的道歉，缓和气氛。',
    transcript: 'No worries. It happens.',
    feedback: '很好地降低了尴尬值。',
    reaction: '朋友也放松地笑了。',
    rescueLine: 'No worries. It happens.'
  },
  {
    prompt: '感谢店员帮你重新制作饮品。',
    transcript: 'Thank you. I appreciate it.',
    feedback: '收尾清楚、礼貌，角色完成度高。',
    reaction: '剧情顺利完成。',
    rescueLine: 'Thank you. I appreciate it.'
  }
];

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
  const currentLine = mockLines[turn] ?? mockLines[mockLines.length - 1];
  const role = scenario.roles[0];
  const progress = useMemo(() => ((turn + 1) / mockLines.length) * 100, [turn]);

  const completeTurn = (transcript: string, nextState: TurnState) => {
    setLastTranscript(transcript);
    setTurnHistory((history) => [...history, transcript]);
    setState(nextState);
  };

  useEffect(() => {
    if (!pendingTranscription || !recorder.audioBlob) return;

    let cancelled = false;

    const runTranscription = async () => {
      setState('transcribing');
      const result = await transcribeAudio(recorder.audioBlob, recorder.durationMs);
      if (cancelled) return;
      setTranscriptionNote(result.message ?? '已完成本轮转写。');
      completeTurn(result.transcript || currentLine.transcript, 'feedback');
      setPendingTranscription(false);
    };

    void runTranscription();

    return () => {
      cancelled = true;
    };
  }, [currentLine.transcript, pendingTranscription, recorder.audioBlob, recorder.durationMs]);

  const simulateVoice = () => {
    setState('recording');
    window.setTimeout(() => setState('transcribing'), 700);
    window.setTimeout(() => {
      setTranscriptionNote('当前使用本地模拟演绎结果。');
      completeTurn(currentLine.transcript, 'feedback');
    }, 1400);
  };

  const handleMicClick = async () => {
    if (recorder.state === 'recording') {
      setPendingTranscription(true);
      recorder.stopRecording();
      setState('transcribing');
      return;
    }

    setTranscriptionNote('');
    const started = await recorder.startRecording();
    if (started) {
      setState('recording');
      return;
    }

    setState('preparing');
  };

  const nextTurn = () => {
    if (turn >= mockLines.length - 1) {
      router.push(`/result/${scenario.id}`);
      return;
    }
    recorder.resetRecording();
    setPendingTranscription(false);
    setTranscriptionNote('');
    setTurn((value) => value + 1);
    setState('preparing');
    setLastTranscript('');
  };

  const showRescueLine = () => {
    setState('rescue_line_shown');
  };

  const triggerStandIn = () => {
    recorder.resetRecording();
    setPendingTranscription(false);
    setTranscriptionNote('');
    completeTurn('Sorry, I need a second to think.', 'ai_stand_in');
  };

  const micLabel = recorder.state === 'recording' ? '停止录音' : recorder.state === 'permission_request' ? '请求权限中' : '开始录音';
  const micState = recorder.state === 'permission_request' ? 'permission_request' : state;
  const showPermissionTip = recorder.state === 'permission_denied' || recorder.state === 'error';

  return (
    <PhoneShell className="pb-24">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <Badge className="bg-white">单人剧场</Badge>
          <h1 className="mt-2 text-2xl font-black text-slate-900">{scenario.title}</h1>
        </div>
        <Badge className="bg-sunshine/40">{turn + 1}/{mockLines.length}</Badge>
      </header>

      <ProgressBar value={progress} />

      <div className="mt-5">
        <ScenePanel scenario={scenario} />
      </div>

      {role ? (
        <div className="mt-4">
          <RoleCard role={role.name} emotion={role.emotion} hiddenMission={role.hiddenMission} />
        </div>
      ) : null}

      <Card className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">你的本轮台词目标</h2>
          <VoiceStatePill state={state} />
        </div>
        <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">{currentLine.prompt}</p>
        {state === 'rescue_line_shown' ? (
          <div className="rounded-3xl bg-sunshine/25 p-4">
            <p className="text-xs font-black text-slate-500">救场台词</p>
            <p className="mt-1 text-lg font-black text-slate-900">{currentLine.rescueLine}</p>
          </div>
        ) : null}
      </Card>

      <div className="mt-6 rounded-[2rem] bg-white p-6 text-center shadow-sm">
        <p className="mb-4 text-sm font-black text-slate-500">点击麦克风开始录音，再点一次结束。本阶段会走 mock 转写接口。</p>
        <MicButton onClick={handleMicClick} state={micState} label={micLabel} />
        {recorder.durationMs > 0 ? (
          <p className="mt-3 text-xs font-bold text-slate-400">已录制约 {Math.ceil(recorder.durationMs / 1000)} 秒</p>
        ) : null}
        {recorder.audioBlob ? (
          <p className="mt-1 text-xs font-bold text-slate-400">录音已发送给本地 mock 转写接口，不会持久化保存。</p>
        ) : null}
        {showPermissionTip ? (
          <div className="mt-4 rounded-3xl bg-sunshine/25 p-4 text-left text-sm font-bold leading-6 text-slate-700">
            <p>{recorder.errorMessage}</p>
            <button type="button" onClick={simulateVoice} className="mt-3 rounded-full bg-coral px-4 py-2 text-xs font-black text-white">
              先体验模拟演绎
            </button>
          </div>
        ) : null}
        <div className="mt-4 flex justify-center gap-3 text-xs font-bold text-slate-400">
          <button type="button" onClick={showRescueLine}>显示救场台词</button>
          <button type="button" onClick={triggerStandIn}>AI 助演接替</button>
        </div>
      </div>

      {lastTranscript ? (
        <Card className="mt-5 space-y-3">
          <Badge className="bg-sky/20">识别结果</Badge>
          <p className="text-lg font-black text-slate-900">“{lastTranscript}”</p>
          {transcriptionNote ? <p className="rounded-2xl bg-sky/10 px-4 py-3 text-xs font-bold text-slate-500">{transcriptionNote}</p> : null}
          <div className="rounded-2xl bg-fresh/10 p-4 text-sm leading-6 text-slate-700">
            <p><b>入戏反馈：</b>{state === 'ai_stand_in' ? '这一轮由剧场助演完成，剧情继续推进。' : currentLine.feedback}</p>
            <p><b>更自然表达：</b>Could you check it for me?</p>
            <p><b>剧情反应：</b>{currentLine.reaction}</p>
          </div>
          <div className="rounded-3xl bg-sky/10 p-4 text-sm leading-6 text-slate-700">
            <p className="font-black text-slate-900">AI 角色回应</p>
            <p className="mt-1">“Let me check that for you. Thanks for telling me so politely.”</p>
          </div>
          <Button onClick={nextTurn}>继续下一轮</Button>
        </Card>
      ) : null}

      {turnHistory.length > 0 ? (
        <Card className="mt-5 space-y-3">
          <h2 className="text-lg font-black text-slate-900">本局台词记录</h2>
          {turnHistory.map((line, index) => (
            <p key={`${line}-${index}`} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">{index + 1}. {line}</p>
          ))}
        </Card>
      ) : null}

      <BottomNav />
    </PhoneShell>
  );
}
