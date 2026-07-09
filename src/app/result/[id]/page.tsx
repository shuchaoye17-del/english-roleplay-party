import { getScenario } from '@/data/scenarios';
import { expressionCards } from '@/data/expressionCards';
import { rewards } from '@/data/rewards';
import { Badge, BottomNav, Button, Card, PhoneShell, ProgressBar, Sticker } from '@/components/ui';
import { RewardBadge } from '@/components/RewardBadge';
import { ExpressionCardView } from '@/components/ExpressionCardView';

const scores = [
  { label: '入戏程度', value: 92, hint: '像角色本人在说话' },
  { label: '情绪匹配', value: 88, hint: '礼貌但有点不满' },
  { label: '发音清晰', value: 81, hint: '听感清楚，可继续提升' },
  { label: '英文自然', value: 86, hint: '表达像真实场景' },
  { label: '剧情推进', value: 90, hint: '把故事往前推了' },
  { label: '团队配合', value: 84, hint: '别人容易接下一句' }
];

export default function ResultPage({ params }: { params: { id: string } }) {
  const scenario = getScenario(params.id);
  const total = Math.round(scores.reduce((sum, item) => sum + item.value, 0) / scores.length);

  return (
    <PhoneShell className="pb-24">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-sunshine/55 via-coral/35 to-partyPurple/45 p-6 text-center shadow-[0_20px_60px_rgba(167,139,250,0.25)]">
        <div className="absolute -left-10 top-8 h-24 w-24 rounded-full bg-white/35 blur-xl" />
        <div className="absolute right-5 top-5 text-3xl">🎊</div>
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white text-6xl shadow-md ring-8 ring-white/60">🏆</div>
        <Badge className="mt-4 bg-white/85">演绎结束 · 派对评级</Badge>
        <h1 className="mt-4 text-7xl font-black leading-none text-slate-950">S</h1>
        <p className="mt-2 text-sm font-black text-slate-700">派对之星！</p>
        <p className="mt-4 text-4xl font-black text-coral">{total}</p>
        <p className="text-sm font-black text-slate-600">综合表现分 · 你把咖啡馆尴尬场面接住了</p>
        <div className="mt-4 flex justify-center gap-2">
          <Sticker>截图分享</Sticker>
          <Sticker className="rotate-1 bg-sky">挑战好友</Sticker>
        </div>
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
        <div className="rounded-3xl bg-partyPurple/10 p-4 text-center ring-1 ring-partyPurple/10">
          <p className="text-2xl font-black text-slate-900">气氛救场王</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">你用礼貌又自然的表达，把“拿错饮品”的尴尬场面接住了。适合发给朋友挑战同一局。</p>
        </div>
      </Card>

      <Card className="mt-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">六维评分</h2>
          <Badge className="bg-fresh/20">不是考试，是入戏值</Badge>
        </div>
        {scores.map((score) => (
          <div key={score.label}>
            <div className="mb-2 flex items-center justify-between text-sm font-black text-slate-700">
              <span>{score.label}</span>
              <span>{score.value}</span>
            </div>
            <ProgressBar value={score.value} />
            <p className="mt-1 text-xs font-bold text-slate-400">{score.hint}</p>
          </div>
        ))}
      </Card>

      <Card className="mt-5 space-y-3">
        <Badge className="bg-sky/20">本局高光台词</Badge>
        <p className="text-xl font-black text-slate-900">“Sorry, I think this isn&apos;t what I ordered.”</p>
        <p className="text-sm leading-6 text-slate-600">简单、自然，而且很符合“礼貌但有点不满”的角色状态。下一次可以试试更委婉的升级版：Could you check it for me?</p>
      </Card>

      <Card className="mt-5 space-y-4">
        <h2 className="text-lg font-black text-slate-900">获得表达卡</h2>
        {expressionCards.map((card) => (
          <ExpressionCardView key={card.id} card={card} compact />
        ))}
      </Card>

      <Card className="mt-5 bg-sky/10 text-sm leading-6 text-slate-600">
        <p className="font-black text-slate-900">分享文案</p>
        <p className="mt-1">我刚用英语演完一局咖啡馆小剧场，拿到“气氛救场王”。你也来试试：3 分钟一局，不会说也有台词提示。</p>
        <a href="/share" className="mt-3 inline-flex text-xs font-black text-coral underline decoration-coral/60 underline-offset-4">
          打开试玩邀请页 →
        </a>
      </Card>

      <div className="mt-5 grid gap-3">
        <Button href={`/play/${scenario.id}`}>再来一局</Button>
        <Button href="/share" className="from-coral to-sunshine text-slate-950">分享给朋友试玩</Button>
        <Button href="/cards" className="from-partyPurple to-sky">查看我的表达卡</Button>
        <Button href="/lobby" className="from-slate-800 to-slate-950">返回大厅</Button>
      </div>
      <BottomNav />
    </PhoneShell>
  );
}
