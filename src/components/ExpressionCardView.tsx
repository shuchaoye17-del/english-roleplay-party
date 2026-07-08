import { Badge } from './ui';
import type { ExpressionCard } from '@/data/expressionCards';

const rarityCopy: Record<ExpressionCard['rarity'], string> = {
  common: '普通',
  rare: '稀有',
  epic: '史诗'
};

export function ExpressionCardView({ card, compact = false }: { card: ExpressionCard; compact?: boolean }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-white to-sunshine/20 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Badge className="bg-sky/15 text-slate-700">{card.type}</Badge>
        <Badge className="bg-white">{rarityCopy[card.rarity]}</Badge>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-slate-900">{card.expression}</h3>
          <p className="mt-1 text-sm font-bold text-slate-600">{card.meaning}</p>
        </div>
        <span className="text-3xl">🃏</span>
      </div>
      {!compact ? (
        <div className="mt-4 rounded-2xl bg-white px-3 py-3 text-sm leading-6 text-slate-600 shadow-sm">
          <p><b className="text-slate-900">场景：</b>{card.scene}</p>
          <p><b className="text-slate-900">情绪：</b>{card.emotion}</p>
          <p><b className="text-slate-900">例句：</b>{card.example}</p>
        </div>
      ) : null}
    </div>
  );
}
