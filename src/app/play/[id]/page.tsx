'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getScenario } from '@/data/scenarios';
import { Badge, BottomNav, Button, Card, PhoneShell, ProgressBar } from '@/components/ui';
import { MicButton } from '@/components/MicButton';
import { RoleCard } from '@/components/RoleCard';
import { VoiceStatePill } from '@/components/VoiceStatePill';

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
  const [turn, setTurn] = useState(0);
  const [state, setState] = useState<TurnState>('preparing');
  const [lastTranscript, setLastTranscript] = useState('');
  const [turnHistory, setTurnHistory] = useState<string[]>([]);
  const currentLine = mockLines[turn] ?? mockLines[mockLines.length - 1];
  const role = scenario.roles[0];
  const progress = useMemo(() => ((turn + 1) / mockLines.length) * 100, [turn]);

  const completeTurn = (transcript: string, nextState: TurnState) => {
    setLastTranscript(transcript);
    setTurnHistory((history) => [...history, transcript]);
    setState(nextState);
  };

  const simulateVoice = () => {
    setState('recording');
    window.setTimeout(() => setState('transcribing'), 700);
    window.setTimeout(() => completeTurn(currentLine.transcript, 'feedback'), 1400);
  };

  const nextTurn = () => {
    if (turn >= mockLines.length - 1) {
      router.push(`/result/${scenario.id}`);
      return;
    }
    setTurn((value) => value + 1);
    setState('preparing');
    setLastTranscript('');
  };

  const showRescueLine = () => {
    setState('rescue_line_shown');
  };

  const triggerStandIn = () => {
    completeTurn('Sorry, I need a second to think.', 'ai_stand_in');
  };

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

      <section className={`mt-5 rounded-[2rem] bg-gradient-to-br ${scenario.color} p-5 shadow-sm`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-black text-slate-500">当前舞台</p>
            <h2 className="mt-1 text-2xl font-black text-slate-900">{scenario.location}</h2>
          </div>
          <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-4xl shadow-sm">☕</div>
        </div>
        <div className="mt-6 rounded-3xl bg-white/90 p-4 text-sm leading-6 text-slate-700 shadow-sm">
          <p className="font-black text-slate-900">AI 旁白</p>
          <p className="mt-1">{scenario.conflict}</p>
        </div>
      </section>

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
        <p className="mb-4 text-sm font-black text-slate-500">按住麦克风，说一句英文推进剧情</p>
        <MicButton onClick={simulateVoice} state={state} />
        <div className="mt-4 flex justify-center gap-3 text-xs font-bold text-slate-400">
          <button type="button" onClick={showRescueLine}>显示救场台词</button>
          <button type="button" onClick={triggerStandIn}>AI 助演接替</button>
        </div>
      </div>

      {lastTranscript ? (
        <Card className="mt-5 space-y-3">
          <Badge className="bg-sky/20">识别结果</Badge>
          <p className="text-lg font-black text-slate-900">“{lastTranscript}”</p>
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
