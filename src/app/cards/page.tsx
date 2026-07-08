import { expressionCards } from '@/data/expressionCards';
import { BottomNav, Badge, Card, PhoneShell } from '@/components/ui';

const outfits = [
  { name: '派对开场装', status: '已拥有', emoji: '🎉' },
  { name: '咖啡店店员风', status: '第 7 关解锁', emoji: '☕' },
  { name: '校园社团风', status: '第 14 关解锁', emoji: '🎒' },
  { name: '星光舞台装', status: '第 21 关后解锁商城', emoji: '✨' }
];

export default function CardsPage() {
  return (
    <PhoneShell className="pb-24">
      <header className="mb-5 rounded-[2rem] bg-gradient-to-br from-partyPurple/25 via-white to-sunshine/30 p-5">
        <Badge className="bg-white/80">我的收藏</Badge>
        <h1 className="mt-4 text-3xl font-black text-slate-900">表达卡与衣柜</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">把学到的英文表达，变成你的剧场道具。</p>
      </header>

      <Card className="mb-5 space-y-4">
        <h2 className="text-xl font-black text-slate-900">表达卡</h2>
        {expressionCards.map((card) => (
          <div key={card.id} className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-sky/10 p-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-sunshine/30">{card.type}</Badge>
              <Badge className="bg-white">{card.rarity}</Badge>
            </div>
            <h3 className="mt-4 text-xl font-black text-slate-900">{card.expression}</h3>
            <p className="mt-1 text-sm font-bold text-slate-600">{card.meaning}</p>
            <div className="mt-4 rounded-2xl bg-white p-3 text-sm leading-6 text-slate-600">
              <p><b>场景：</b>{card.scene}</p>
              <p><b>情绪：</b>{card.emotion}</p>
              <p><b>例句：</b>{card.example}</p>
            </div>
          </div>
        ))}
      </Card>

      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900">衣柜</h2>
          <div className="grid h-16 w-16 place-items-center rounded-full bg-coral text-3xl shadow-sm ring-4 ring-white">🎤</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {outfits.map((item) => (
            <div key={item.name} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-center">
              <div className="text-4xl">{item.emoji}</div>
              <p className="mt-3 text-sm font-black text-slate-900">{item.name}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{item.status}</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl bg-partyPurple/10 p-4 text-sm font-bold leading-6 text-slate-600">
          外观只用于展示，不影响分数。第 21 关后解锁商城。
        </div>
      </Card>

      <BottomNav />
    </PhoneShell>
  );
}
