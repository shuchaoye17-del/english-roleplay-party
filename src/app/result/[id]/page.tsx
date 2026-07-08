import { getScenario } from '@/data/scenarios';
import { expressionCards } from '@/data/expressionCards';
import { rewards } from '@/data/rewards';
import { Badge, BottomNav, Button, Card, PhoneShell, ProgressBar } from '@/components/ui';
import { RewardBadge } from '@/components/RewardBadge';
import { ExpressionCardView } from '@/components/ExpressionCardView';

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
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-sunshine/40 via-coral/20 to-sky/30 p-6 text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white text-6xl shadow-sm">🏆</div>
        <Badge className="mt-4 bg-white/80">演绎完成！</Badge>
        <h1 className="mt-4 text-6xl font-black text-slate-900">A</h1>
        <p className="mt-2 text-sm font-bold text-slate-600">团队评级</p>
        <p className="mt-4 text-4xl font-black text-coral">{total}</p>
        <p className="text-sm font-bold text-slate-600">综合表现分</p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <RewardBadge icon="⭐" label="EXP" value={`+${rewards.exp}`} />
          <RewardBadge icon="🪙" label="金币" value={`+${rewards.coins}`} />
          <RewardBadge icon="💎" label="宝石" value={`+${rewards.gems}`} />
        </div>
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
        <p className="text-xl font-black text-slate-900">“Sorry, I think this isn&apos;t what I ordered.”</p>
        <p className="text-sm leading-6 text-slate-600">简单、自然，而且很符合“礼貌但有点不满”的角色状态。</p>
      </Card>

      <Card className="mt-5 space-y-4">
        <h2 className="text-lg font-black text-slate-900">获得表达卡</h2>
        {expressionCards.map((card) => (
          <ExpressionCardView key={card.id} card={card} compact />
        ))}
      </Card>

      <Card className="mt-5 bg-sky/10 text-sm leading-6 text-slate-600">
        本局有 1 个回合可由剧场助演完成，剧情仍顺利通关。其他玩家不会受到惩罚。
      </Card>

      <div className="mt-5 grid gap-3">
        <Button href={`/play/${scenario.id}`}>再来一局</Button>
        <Button href="/lobby" className="bg-slate-900">返回大厅</Button>
      </div>
      <BottomNav />
    </PhoneShell>
  );
}
