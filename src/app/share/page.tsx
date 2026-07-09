import { Badge, Button, Card, PhoneShell, Sticker } from '@/components/ui';

const testSteps = [
  '看 10 秒，判断你是否知道它是干嘛的',
  '进入 demo，读出每轮出现的英文台词',
  '玩到结果页，看评级和表达卡是否有成就感'
];

const feedbackQuestions = [
  '你 10 秒内看懂这是干嘛的吗？',
  '你敢不敢点麦克风说一句？',
  '结果页有没有让你想再玩一局？'
];

export default function SharePage() {
  return (
    <PhoneShell className="pb-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-partyPurple/35 via-coral/25 to-sunshine/45 p-6 shadow-[0_20px_60px_rgba(167,139,250,0.24)]">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/30 blur-2xl" />
        <div className="absolute bottom-5 right-5 text-4xl">🎤</div>
        <Badge className="bg-white/85">给朋友的试玩邀请</Badge>
        <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950">英语角色派对</h1>
        <p className="mt-2 text-lg font-black text-slate-800">用英语演故事，边玩边练口语</p>
        <p className="mt-3 text-sm font-bold leading-6 text-slate-700">这是一个 3 分钟英语小剧场 demo。你不用准备，进入后直接读出每轮给出的英文台词，系统会给你转写、评分和表达卡。</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Sticker>3 分钟一局</Sticker>
          <Sticker className="rotate-1 bg-sky">有台词提示</Sticker>
          <Sticker className="bg-coral text-white">不是考试</Sticker>
        </div>
        <div className="mt-6">
          <Button href="/onboarding">开始试玩</Button>
        </div>
      </section>

      <Card className="mt-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900">试玩时请做这 3 件事</h2>
          <span className="text-3xl">🧪</span>
        </div>
        <div className="grid gap-3">
          {testSteps.map((step, index) => (
            <div key={step} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-xs font-black text-coral">STEP {index + 1}</p>
              <p className="mt-1 text-sm font-black leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-5 space-y-4 bg-sky/10">
        <h2 className="text-xl font-black text-slate-900">玩完请反馈</h2>
        <div className="space-y-2">
          {feedbackQuestions.map((question, index) => (
            <p key={question} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">{index + 1}. {question}</p>
          ))}
        </div>
      </Card>

      <Card className="mt-5 space-y-3 bg-sunshine/20">
        <Badge className="bg-white">可直接复制的邀请文案</Badge>
        <p className="text-sm font-bold leading-6 text-slate-700">
          我做了一个 3 分钟英语小剧场 demo：用英语演故事，边玩边练口语。你不用准备，点麦克风说一句就行，不会说也有台词提示。
        </p>
      </Card>

      <div className="mt-5 grid gap-3">
        <Button href="/onboarding">进入角色创建</Button>
        <Button href="/lobby" className="from-slate-800 to-slate-950">先看故事大厅</Button>
      </div>
    </PhoneShell>
  );
}
