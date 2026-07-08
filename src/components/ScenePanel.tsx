import { Badge } from './ui';
import type { Scenario } from '@/data/scenarios';

const sceneEmoji: Record<string, string> = {
  'cafe-chaos': '☕',
  'party-intro': '🎉',
  'campus-club': '🎒',
  'friend-cancel': '🚇',
  'mystery-room': '🔎',
  'wrong-delivery': '🥡'
};

export function ScenePanel({ scenario, label = '当前舞台' }: { scenario: Scenario; label?: string }) {
  return (
    <section className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${scenario.color} p-5 shadow-sm`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge className="bg-white/80">{label}</Badge>
          <h2 className="mt-3 text-2xl font-black text-slate-900">{scenario.location}</h2>
          <p className="mt-2 text-sm font-bold text-slate-600">{scenario.moodTags.join(' · ')}</p>
        </div>
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-4xl shadow-sm">
          {sceneEmoji[scenario.id] ?? '🎭'}
        </div>
      </div>
      <div className="mt-6 rounded-3xl bg-white/90 p-4 text-sm leading-6 text-slate-700 shadow-sm">
        <p className="font-black text-slate-900">剧情冲突</p>
        <p className="mt-1">{scenario.conflict}</p>
      </div>
      <div className="mt-3 rounded-3xl bg-white/80 p-4 text-sm leading-6 text-slate-700 shadow-sm">
        <p className="font-black text-slate-900">通关目标</p>
        <p className="mt-1">{scenario.teamGoal}</p>
      </div>
    </section>
  );
}
