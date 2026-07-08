import { getScenario } from '@/data/scenarios';
import { expressionCards } from '@/data/expressionCards';
import { rewards } from '@/data/rewards';
import { Badge, BottomNav, Button, Card, PhoneShell, ProgressBar } from '@/components/ui';

const scores = [
  { label: '入戏程度', value: 92 },
  { label: '情绪匹配', value: 88 },
  { label: '发音清晰', value: 81 },
  { label: '英文自然', value: 86 },
  { label: '剧情推进', value: 90 },
  { label: '团队配合', value: 84 }
];

export default function ResultPage({ params }: { params: { id: string } }) {
  const scenario = getScenario(params.id);
  const total = Math.round(scores.reduce((sum, item) => sum + item.value, 0) / scores.length);

  return (
    <PhoneShell className="pb-24">
      <section className="rounded-[2rem] bg-gradient-to-br from-sunshine/40 via-coral/20 to-sky/30 p-6 text-center">
        <div className="text-6xl">🏆</div>
        <Badge className="mt-4 bg-white/80">演绎完成！</Badge>
        <h1 className="mt-4 text-5xl font-black text-slate-900">A</h1>
        <p className="mt-2 text-sm font-bold text-slate-600">团队评级</p>
        <p className="mt-4 text-4xl font-black text-coral">{total}</p>
        <p className="text-sm font-bold text-slate-600">综合表现分</p>
      </section>

      <Card className="mt-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">本局称号</h2>
          <span className="text-3xl">🎭</span>
        </div>
        <div className="rounded-3xl bg-partyPurple/10 p-4 text-center">
          <p className="text-2xl font-black text-slate-900">气氛救场王</p>
          <p className="mt-2 text-sm text-slate-600">你用礼貌又自然的表达，把尴尬场面接住了。</p>
        </div>
      </Card>

      <Card className="mt-5 space-y-4">
        <h2 className="text-lg font-black text-slate-900">六维评分</h2>
        {scores.map((score) => (
          <div key={score.label}>
            <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-700">
              <span>{score.label}</span>
              <span>{score.value}</span>
            </div>
            <ProgressBar value={score.value} />
          </div>
        ))}
      </Card>

      <Card className="mt-5 space-y-3">
        <Badge className="bg-sky/20">本局高光台词</Badge>
        <p className="text-xl font-black text-slate-900">“Sorry, I think this isn't what I ordered.”</p>
        <p className="text-sm leading-6 text-slate-600">简单、自然，而且很符合“礼貌但有点不满”的角色状态。</p>
      </Card>

      <Card className="mt-5 space-y-4">
        <h2 className="text-lg font-black text-slate-900">获得表达卡</h2>
        {expressionCards.map((card) => (
          <div key={card.id} className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-sunshine/20 p-4">
            <Badge className="bg-white">{card.type}</Badge>
            <p className="mt-3 text-lg font-black text-slate-900">{card.expression}</p>
            <p className="mt-1 text-sm text-slate-600">{card.meaning}</p>
          </div>
        ))}
      </Card>

      <Card className="mt-5 bg-fresh/10">
        <h2 className="text-lg font-black text-slate-900">奖励</h2>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm font-black text-slate-700">
          <div className="rounded-2xl bg-white p-3">EXP<br />+{rewards.exp}</div>
          <div className="rounded-2xl bg-white p-3">金币<br />+{rewards.coins}</div>
          <div className="rounded-2xl bg-white p-3">宝石<br />+{rewards.gems}</div>
        </div>
      </Card>

      <Card className="mt-5 bg-sky/10 text-sm leading-6 text-slate-600">
        本局有 1 个回合可由剧场助演完成，剧情仍顺利通关。
      </Card>

      <div className="mt-5 grid gap-3">
        <Button href={`/play/${scenario.id}`}>再来一局</Button>
        <Button href="/lobby" className="bg-slate-900">返回大厅</Button>
      </div>
      <BottomNav />
    </PhoneShell>
  );
}
