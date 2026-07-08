import { AvatarBubble, Badge, Card } from './ui';

export function PlayerSlot({ name, avatar, role, state }: { name: string; avatar: string; role: string; state: string }) {
  const label = state === 'ai_stand_in' ? 'AI 助演' : state === 'ready' ? '已准备' : state === 'disconnected' ? '暂时离开舞台' : '准备中';
  const tone = state === 'ai_stand_in' ? 'bg-partyPurple/20' : state === 'ready' ? 'bg-fresh/20' : 'bg-slate-100';

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-3">
        <AvatarBubble emoji={avatar} name={name} />
        <Badge className={`${tone} text-slate-700`}>{label}</Badge>
      </div>
      <p className="mt-3 rounded-2xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600">{role}</p>
    </Card>
  );
}
