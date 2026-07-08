'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getScenario } from '@/data/scenarios';
import { Badge, BottomNav, Button, Card, PhoneShell, ProgressBar } from '@/components/ui';
import { MicButton } from '@/components/MicButton';

type TurnState = 'waiting_turn' | 'preparing' | 'recording' | 'transcribing' | 'feedback' | 'timeout_warning' | 'rescue_line_shown' | 'ai_stand_in';

const stateCopy: Record<TurnState, string> = {
  waiting_turn: '等待登场',
  preparing: '轮到你登场啦',
  recording: '正在录音',
  transcribing: '正在识别',
  feedback: 'AI 反馈中',
  timeout_warning: '轮到你登场啦！',
  rescue_line_shown: '忘词了吗？可以读这句救场台词。',
  ai_stand_in: '剧场助演正在帮你接一句'
};

const mockLines = [
  {
    prompt: '表达你想点一杯冰拿铁。',
    transcript: "I'd like an iced latte, please.",
    feedback: '开场自然，语气轻松。',
    reaction: '店员微笑确认订单。'
  },
  {
    prompt: '表达这不是你点的饮品，但不要太冲。',
    transcript: "Sorry, I think this isn't what I ordered.",
    feedback: '这句很符合“礼貌但不满”的情绪。',
    reaction: '店员意识到问题，准备道歉。'
  },
  {
    prompt: '请店员帮你确认订单。',
    transcript: 'Could you check it for me?',
    feedback: '表达很自然，也推动了剧情。',
    reaction: '店员开始查看订单记录。'
  },
  {
    prompt: '回应店员的道歉，缓和气氛。',
    transcript: 'No worries. It happens.',
    feedback: '很好地降低了尴尬值。',
    reaction: '朋友也放松地笑了。'
  },
  {
    prompt: '感谢店员帮你重新制作饮品。',
    transcript: 'Thank you. I appreciate it.',
    feedback: '收尾清楚、礼貌，角色完成度高。',
    reaction: '剧情顺利完成。'
  }
];

export default function PlayPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const scenario = getScenario(params.id);
  const [turn, setTurn] = useState(0);
  const [state, setState] = useState<TurnState>('preparing');
  const [lastTranscript, setLastTranscript] = useState('');
  const currentLine = mockLines[turn] ?? mockLines[mockLines.length - 1];
  const role = scenario.roles[0];
  const progress = useMemo(() => ((turn + 1) / mockLines.length) * 100, [turn]);

  const simulateVoice = () => {
    setState('recording');
    window.setTimeout(() => setState('transcribing'), 700);
    window.setTimeout(() => {
      setLastTranscript(currentLine.transcript);
      setState('feedback');
    }, 1400);
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

  const triggerStandIn = () => {
    setState('ai_stand_in');
    setLastTranscript('Sorry, I need a second to think.');
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
        <div className="mb-12 text-5xl">☕</div>
        <div className="rounded-3xl bg-white/90 p-4 text-sm leading-6 text-slate-700 shadow-sm">
          <p className="font-black text-slate-900">AI 旁白</p>
          <p className="mt-1">{scenario.conflict}</p>
        </div>
      </section>

      <Card className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">你的本轮任务</h2>
          <Badge className="bg-coral/10 text-coral">{stateCopy[state]}</Badge>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          <p><b className="text-slate-900">角色：</b>{role?.name}</p>
          <p><b className="text-slate-900">情绪：</b>{role?.emotion}</p>
          <p><b className="text-slate-900">隐藏任务：</b>{role?.hiddenMission}</p>
          <p><b className="text-slate-900">本轮目标：</b>{currentLine.prompt}</p>
        </div>
      </Card>

      <div className="mt-6">
        <MicButton onClick={simulateVoice} state={state} />
        <button type="button" onClick={triggerStandIn} className="mx-auto mt-3 block text-xs font-bold text-slate-400">模拟超时：让 AI 助演接替</button>
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
          <Button onClick={nextTurn}>继续下一轮</Button>
        </Card>
      ) : null}

      <BottomNav />
    </PhoneShell>
  );
}
