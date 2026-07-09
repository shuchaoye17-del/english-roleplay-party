import { BottomNav, Badge, Card, PhoneShell, AvatarBubble, Button, Sticker } from '@/components/ui';
import { ScenarioCard } from '@/components/ScenarioCard';
import { scenarios } from '@/data/scenarios';
import { expressionCards } from '@/data/expressionCards';

const categories = ['推荐', '咖啡店', '校园', '派对', '奇幻', '日常', '职场'];
const partyTags = ['组队开黑', '练口语', '实时互动'];

export default function LobbyPage() {
  const featured = scenarios[0];

  return (
    <PhoneShell className="pb-24">
      <header className="mb-5 flex items-center justify-between">
        <AvatarBubble emoji="🎤" name="Mia" />
        <div className="flex gap-2">
          <Badge className="bg-sunshine/60">Lv.1</Badge>
          <Badge className="bg-white">🪙 80</Badge>
          <Badge className="bg-white">🃏 {expressionCards.length}</Badge>
        </div>
      </header>

      <section className="relative mb-5 overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-partyPurple/30 via-coral/25 to-sunshine/40 p-5 shadow-[0_20px_60px_rgba(167,139,250,0.22)]">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/35 blur-xl" />
        <div className="absolute bottom-4 right-4 text-4xl">🎭</div>
        <Badge className="bg-white/85">故事大厅 · 今日热演</Badge>
        <h1 className="mt-4 text-3xl font-black leading-tight text-slate-950">夏日混对之夜</h1>
        <p className="mt-2 text-sm leading-6 text-slate-700">AI 扮演店员和朋友，你用语音说台词，完成第一场英文小剧场。</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {partyTags.map((tag, index) => (
            <Sticker key={tag} className={index === 1 ? 'rotate-1 bg-sky' : index === 2 ? 'bg-coral text-white' : ''}>{tag}</Sticker>
          ))}
        </div>
        <div className="mt-5">
          <Button href={`/play/${featured.id}`}>立即开演</Button>
        </div>
      </section>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => <Badge key={category} className="shrink-0 bg-white/90">{category}</Badge>)}
      </div>

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900">热门剧本</h2>
        <Badge className="bg-coral/10 text-coral">NEW</Badge>
      </div>

      <div className="mb-5 grid gap-4">
        {scenarios.map((scenario) => <ScenarioCard key={scenario.id} scenario={scenario} />)}
      </div>

      <Card className="mb-4 bg-sky/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge className="bg-white">好友社交</Badge>
            <h2 className="mt-2 text-lg font-black text-slate-900">好友剧场</h2>
            <p className="mt-1 text-sm text-slate-600">完成 7 关后解锁好友剧场。</p>
          </div>
          <span className="text-3xl">🔒</span>
        </div>
      </Card>

      <Card className="bg-partyPurple/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge className="bg-white">多人派对</Badge>
            <h2 className="mt-2 text-lg font-black text-slate-900">多人派对副本</h2>
            <p className="mt-1 text-sm text-slate-600">完成 14 关后解锁多人派对副本。</p>
          </div>
          <span className="text-3xl">🎭</span>
        </div>
      </Card>

      <BottomNav />
    </PhoneShell>
  );
}
