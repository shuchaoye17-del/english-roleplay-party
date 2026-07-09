import { BottomNav, Badge, Card, PhoneShell, AvatarBubble, Button } from '@/components/ui';
import { ScenarioCard } from '@/components/ScenarioCard';
import { scenarios } from '@/data/scenarios';
import { expressionCards } from '@/data/expressionCards';

const categories = ['推荐', '咖啡店', '校园', '派对', '日常'];
const partyTags = ['组队开黑', '练口语', '实时互动'];

export default function LobbyPage() {
  const featured = scenarios[0];

  return (
    <PhoneShell className="pb-24">
      <header className="mb-4 flex items-center justify-between">
        <AvatarBubble emoji="🎤" name="Mia" />
        <div className="flex gap-2">
          <Badge>Lv.1</Badge>
          <Badge>🪙 80</Badge>
          <Badge>🃏 {expressionCards.length}</Badge>
        </div>
      </header>

      <section className="mb-5 overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-sm">
        <div className="bg-gradient-to-br from-coral/70 via-partyPurple/70 to-sky/60 p-5">
          <Badge className="bg-white text-slate-900">故事大厅 · 今日热演</Badge>
          <h1 className="mt-4 text-2xl font-black leading-tight">夏日混对之夜</h1>
          <p className="mt-2 max-w-[18rem] text-sm font-bold leading-6 text-white/85">AI 扮演店员和朋友，你用语音说台词，完成第一场英文小剧场。</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {partyTags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/18 px-3 py-1 text-xs font-black text-white ring-1 ring-white/20">{tag}</span>
            ))}
          </div>
        </div>
        <div className="p-4">
          <Button href={`/play/${featured.id}`}>立即开演</Button>
        </div>
      </section>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => <Badge key={category} className="shrink-0">{category}</Badge>)}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900">热门剧本</h2>
        <Badge className="bg-coral/10 text-coral ring-coral/20">NEW</Badge>
      </div>

      <div className="mb-5 grid gap-4">
        {scenarios.map((scenario) => <ScenarioCard key={scenario.id} scenario={scenario} />)}
      </div>

      <Card className="mb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge>好友社交</Badge>
            <h2 className="mt-2 text-lg font-black text-slate-900">好友剧场</h2>
            <p className="mt-1 text-sm text-slate-600">完成 7 关后解锁好友剧场。</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">未解锁</span>
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge>多人派对</Badge>
            <h2 className="mt-2 text-lg font-black text-slate-900">多人派对副本</h2>
            <p className="mt-1 text-sm text-slate-600">完成 14 关后解锁多人派对副本。</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">未解锁</span>
        </div>
      </Card>

      <BottomNav />
    </PhoneShell>
  );
}
