import { Badge, Card, Button } from './ui';
import type { Scenario } from '@/data/scenarios';

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const href = scenario.mode === 'solo' ? `/play/${scenario.id}` : `/room/${scenario.id}`;
  return (
    <Card className="space-y-4">
      <div className={`h-28 rounded-3xl bg-gradient-to-br ${scenario.color} p-4`}>
        <div className="text-4xl">🎭</div>
        <p className="mt-3 text-sm font-extrabold text-slate-800">{scenario.location}</p>
      </div>
      <div>
        <h3 className="text-lg font-extrabold text-slate-900">{scenario.title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{scenario.conflict}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge>{scenario.players}</Badge>
        <Badge>{scenario.duration}</Badge>
        <Badge>{scenario.difficulty}</Badge>
        {scenario.moodTags.map((tag) => <Badge key={tag} className="bg-sky/20 text-slate-700">{tag}</Badge>)}
      </div>
      <p className="rounded-2xl bg-sunshine/30 px-4 py-3 text-sm font-bold text-slate-700">奖励：{scenario.reward}</p>
      <Button href={href}>{scenario.mode === 'solo' ? '立即开演' : '进入房间'}</Button>
    </Card>
  );
}
