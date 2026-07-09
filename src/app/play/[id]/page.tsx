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
import { mockTurnScore, scoreTurn, type TurnScoreResult } from '@/lib/scoring';

type TurnState = 'waiting_turn' | 'preparing' | 'recording' | 'transcribing' | 'feedback' | 'timeout_warning' | 'ai_stand_in';

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

function scoreItems(score: TurnScoreResult) {
  return [
    { label: '入戏', value: score.roleImmersion },
    { label: '情绪', value: score.emotionMatch },
    { label: '发音', value: score.pronunciationClarity },
    { label: '自然', value: score.englishNaturalness },
    { label: '推进', value: score.storyProgress },
    { label: '配合', value: score.teamwork }
  ];
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
  const progress = useMemo(() => ((turn + 1) / mockLines.length) * 100, [turn]);
  const isProcessingTurn = state === 'transcribing' && !lastTranscript;

  const completeTurn = (transcript: string, nextState: TurnState) => {
    setLastTranscript(transcript);
    setTurnHistory((history) => [...history, transcript]);
    setState(nextState);
  };

  useEffect(() => {
    const audioBlob = recorder.audioBlob;
    if (!pendingTranscription || !audioBlob) return;

    let cancelled = false;

    const runTranscriptionAndScoring = async () => {
      setState('transcribing');

      if (audioBlob.size < 200 || recorder.durationMs < 500) {
        setTranscriptionNote('录音太短或没有检测到声音，先用本轮示范台词继续。');
        setTurnScore(mockTurnScore);
        completeTurn(currentLine.rescueLine, 'feedback');
        setPendingTranscription(false);
        return;
      }

      setTranscriptionNote('录音已收到，剧场耳机正在听你的英文台词。');
      const transcription = await transcribeAudio(audioBlob, recorder.durationMs, currentLine.rescueLine);
      if (cancelled) return;

      const transcript = transcription.transcript || currentLine.rescueLine;
      setTranscriptionNote(transcription.message ?? '已完成本轮转写，AI 导演正在生成入戏评分。');

      const score = await scoreTurn({
        scenarioId: scenario.id,
        role: role?.name ?? 'Player character',
        emotionTarget: role?.emotion ?? 'natural and clear',
        hiddenMission: role?.hiddenMission ?? currentLine.prompt,
        transcript,
        turnHistory
      });

      if (cancelled) return;
      setTurnScore(score);
      setTranscriptionNote(transcription.message ?? '转写和入戏评分已完成。');
      completeTurn(transcript, 'feedback');
      setPendingTranscription(false);
    };

    void runTranscriptionAndScoring();

    return () => {
      cancelled = true;
    };
  }, [currentLine.prompt, currentLine.rescueLine, pendingTranscription, recorder.audioBlob, recorder.durationMs, role?.emotion, role?.hiddenMission, role?.name, scenario.id, turnHistory]);

  const simulateVoice = () => {
    setState('recording');
    setTranscriptionNote('模拟录音中，稍后会生成一轮示范结果。');
    window.setTimeout(() => setState('transcribing'), 700);
    window.setTimeout(() => {
      setTranscriptionNote('当前使用本地模拟演绎结果。');
      setTurnScore(mockTurnScore);
      completeTurn(currentLine.rescueLine, 'feedback');
    }, 1400);
  };

  const handleMicClick = async () => {
    if (recorder.state === 'recording') {
      setPendingTranscription(true);
      setTranscriptionNote('录音结束，正在进入转写和评分。');
      recorder.stopRecording();
      setState('transcribing');
      return;
    }

    setTranscriptionNote('');
    setTurnScore(null);
    const started = await recorder.startRecording();
    if (started) {
      setState('recording');
      setTranscriptionNote('录音中：直接读出上面的英文台词，也可以自由发挥。');
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
    setTranscriptionNote('下一轮已准备好，直接读出新的英文台词。');
    setTurnScore(null);
    setTurn((value) => value + 1);
    setState('preparing');
    setLastTranscript('');
  };

  const triggerStandIn = () => {
    recorder.resetRecording();
    setPendingTranscription(false);
    setTranscriptionNote('剧场助演已接替这一句，队伍不会卡住。');
    setTurnScore({ ...mockTurnScore, title: '临场救场王', feedback: '这一轮由剧场助演接住，剧情继续推进。' });
    completeTurn(currentLine.rescueLine, 'ai_stand_in');
  };

  const micLabel = recorder.state === 'recording' ? '停止录音' : recorder.state === 'permission_request' ? '请求权限中' : '开始录音';
  const micState = recorder.state === 'permission_request' ? 'permission_request' : state;
  const showPermissionTip = recorder.state === 'permission_denied' || recorder.state === 'error';

  return (
    <PhoneShell className="pb-24">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <Badge className="bg-white">单人剧场 · 3 分钟 demo</Badge>
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
          <h2 className="text-lg font-black text-slate-900">你的本轮台词</h2>
          <VoiceStatePill state={state} />
        </div>
        <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">{currentLine.prompt}</p>
        <div className="rounded-3xl bg-sunshine/25 p-4 shadow-sm">
          <p className="text-xs font-black text-slate-500">直接读这句，也可以自己改一点</p>
          <p className="mt-1 text-xl font-black leading-8 text-slate-900">{currentLine.rescueLine}</p>
        </div>
        <p className="text-xs font-bold text-slate-400">不用说得完美，先把剧情接下去就算成功。</p>
      </Card>

      <div className="mt-6 rounded-[2rem] bg-white p-6 text-center shadow-sm">
        <p className="mb-4 text-sm font-black text-slate-500">点击麦克风开始录音，读出上面的英文句子，再点一次结束。</p>
        <MicButton onClick={handleMicClick} state={micState} label={micLabel} />
        {recorder.durationMs > 0 ? (
          <p className="mt-3 text-xs font-bold text-slate-400">已录制约 {Math.ceil(recorder.durationMs / 1000)} 秒</p>
        ) : null}
        {recorder.audioBlob ? (
          <p className="mt-1 text-xs font-bold text-slate-400">录音大小约 {Math.ceil(recorder.audioBlob.size / 1024)} KB。录音只用于本轮转写与评分，不会持久化保存。</p>
        ) : null}
        {recorder.errorMessage && recorder.state === 'stopped' ? <p className="mt-3 rounded-2xl bg-sunshine/20 px-4 py-3 text-xs font-black text-slate-500">{recorder.errorMessage}</p> : null}
        {transcriptionNote && !lastTranscript ? <p className="mt-3 rounded-2xl bg-sky/10 px-4 py-3 text-xs font-black text-slate-500">{transcriptionNote}</p> : null}
        {isProcessingTurn ? (
          <div className="mt-4 rounded-3xl bg-gradient-to-br from-sky/10 to-sunshine/20 p-4 text-left text-sm font-bold leading-6 text-slate-700">
            <p className="font-black text-slate-900">剧场处理中…</p>
            <p className="mt-1">① 检查录音 ② 识别台词 ③ 生成入戏评分 ④ 发放表达卡</p>
          </div>
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
          <span>上方台词已直接显示</span>
          <button type="button" onClick={triggerStandIn}>AI 助演接替</button>
        </div>
      </div>

      {lastTranscript ? (
        <Card className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <Badge className="bg-sky/20">识别结果</Badge>
            {turnScore ? <Badge className="bg-sunshine/30">{turnScore.title}</Badge> : null}
          </div>
          <p className="text-lg font-black text-slate-900">“{lastTranscript}”</p>
          {transcriptionNote ? <p className="rounded-2xl bg-sky/10 px-4 py-3 text-xs font-bold text-slate-500">{transcriptionNote}</p> : null}
          {turnScore ? (
            <div className="rounded-3xl bg-fresh/10 p-4 text-sm leading-6 text-slate-700">
              <div className="grid grid-cols-3 gap-2">
                {scoreItems(turnScore).map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white p-3 text-center shadow-sm">
                    <p className="text-xs font-bold text-slate-400">{item.label}</p>
                    <p className="text-lg font-black text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4"><b>入戏反馈：</b>{turnScore.feedback}</p>
              <p><b>更自然表达：</b>{turnScore.betterExpression}</p>
              <p><b>获得表达卡：</b>{turnScore.expressionCards.join('、')}</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-fresh/10 p-4 text-sm leading-6 text-slate-700">
              <p><b>入戏反馈：</b>{state === 'ai_stand_in' ? '这一轮由剧场助演完成，剧情继续推进。' : currentLine.feedback}</p>
              <p><b>更自然表达：</b>{currentLine.rescueLine}</p>
              <p><b>剧情反应：</b>{currentLine.reaction}</p>
            </div>
          )}
          <div className="rounded-3xl bg-sky/10 p-4 text-sm leading-6 text-slate-700">
            <p className="font-black text-slate-900">AI 角色回应</p>
            <p className="mt-1">“Let me check that for you. Thanks for telling me so politely.”</p>
          </div>
          <Button onClick={nextTurn}>{turn >= mockLines.length - 1 ? '查看本局结果' : '继续下一轮'}</Button>
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
