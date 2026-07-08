import { BottomNav, Badge, Card, PhoneShell, AvatarBubble, Button } from '@/components/ui';
import { ScenarioCard } from '@/components/ScenarioCard';
import { scenarios } from '@/data/scenarios';
import { expressionCards } from '@/data/expressionCards';

const categories = ['推荐', '咖啡店', '校园', '派对', '奇幻', '日常', '职场'];

export default function LobbyPage() {
  const featured = scenarios[0];

  return (
    <PhoneShell className="pb-24">
      <header className="mb-5 flex items-center justify-between">
        <AvatarBubble emoji="🎤" name="Mia" />
        <div className="flex gap-2">
          <Badge className="bg-sunshine/40">Lv.1</Badge>
          <Badge className="bg-white">🪙 80</Badge>
          <Badge className="bg-white">🃏 {expressionCards.length}</Badge>
        </div>
      </header>

      <section className="mb-5 rounded-[2rem] bg-gradient-to-br from-coral/25 via-sunshine/30 to-sky/30 p-5">
        <Badge className="bg-white/80">今日单人剧场</Badge>
        <h1 className="mt-4 text-3xl font-black text-slate-900">3 分钟，一个人也能演一集</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">AI 扮演店员和朋友，你用语音说台词，完成第一场英文小剧场。</p>
        <div className="mt-5">
          <Button href={`/play/${featured.id}`}>立即开演</Button>
        </div>
      </section>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => <Badge key={category} className="shrink-0 bg-white">{category}</Badge>)}
      </div>

      <div className="mb-5 grid gap-4">
        {scenarios.map((scenario) => <ScenarioCard key={scenario.id} scenario={scenario} />)}
      </div>

      <Card className="mb-4 bg-sky/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">好友剧场</h2>
            <p className="mt-1 text-sm text-slate-600">完成 7 关后解锁好友剧场。</p>
          </div>
          <span className="text-3xl">🔒</span>
        </div>
      </Card>

      <Card className="bg-partyPurple/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">多人派对副本</h2>
            <p className="mt-1 text-sm text-slate-600">完成 14 关后解锁多人派对副本。</p>
          </div>
          <span className="text-3xl">🎭</span>
        </div>
      </Card>

      <BottomNav />
    </PhoneShell>
  );
}
