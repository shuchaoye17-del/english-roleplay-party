import { Badge, Card, Button } from './ui';
import type { Scenario } from '@/data/scenarios';

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const href = scenario.mode === 'solo' ? `/play/${scenario.id}` : `/room/${scenario.id}`;
  return (
    <Card className="space-y-4">
      <div className={`h-24 rounded-[1.5rem] bg-gradient-to-br ${scenario.color} p-4`}>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Scenario</p>
        <p className="mt-5 text-sm font-black text-slate-900">{scenario.location}</p>
      </div>
      <div>
        <h3 className="text-lg font-black text-slate-900">{scenario.title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{scenario.conflict}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge>{scenario.players}</Badge>
        <Badge>{scenario.duration}</Badge>
        <Badge>{scenario.difficulty}</Badge>
        {scenario.moodTags.map((tag) => <Badge key={tag} className="bg-sky/10 text-slate-700 ring-sky/20">{tag}</Badge>)}
      </div>
      <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">奖励：{scenario.reward}</p>
      <Button href={href}>{scenario.mode === 'solo' ? '立即开演' : '进入房间'}</Button>
    </Card>
  );
}
