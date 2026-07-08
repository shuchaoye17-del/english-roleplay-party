import { getScenario } from '@/data/scenarios';
import { mockRoomPlayers } from '@/data/rooms';
import { AvatarBubble, Badge, BottomNav, Button, Card, PhoneShell } from '@/components/ui';

export default function RoomPage({ params }: { params: { id: string } }) {
  const scenario = getScenario(params.id);

  return (
    <PhoneShell className="pb-24">
      <header className="mb-5 rounded-[2rem] bg-gradient-to-br from-sky/30 via-white to-partyPurple/20 p-5">
        <Badge className="bg-white/80">开演前后台</Badge>
        <h1 className="mt-4 text-3xl font-black text-slate-900">{scenario.title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{scenario.conflict}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{scenario.players}</Badge>
          <Badge>{scenario.duration}</Badge>
          <Badge>{scenario.difficulty}</Badge>
        </div>
      </header>

      <Card className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400">房间号</p>
            <p className="text-2xl font-black text-slate-900">PARTY-317</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-coral/10 text-coral">邀请好友</Badge>
            <Badge className="bg-sky/10 text-slate-700">复制链接</Badge>
          </div>
        </div>
      </Card>

      <div className="mb-4 space-y-3">
        {mockRoomPlayers.map((player) => (
          <Card key={player.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <AvatarBubble emoji={player.avatar} name={player.name} />
              <Badge className={player.state === 'ai_stand_in' ? 'bg-partyPurple/20 text-slate-700' : 'bg-fresh/20 text-slate-700'}>
                {player.state === 'ready' ? '已准备' : player.state === 'ai_stand_in' ? 'AI 助演' : '准备中'}
              </Badge>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <p><b className="text-slate-900">角色：</b>{player.role}</p>
              <p><b className="text-slate-900">情绪：</b>{player.emotion}</p>
              <p><b className="text-slate-900">隐藏任务：</b>{player.hiddenMission}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mb-5 bg-sunshine/20">
        <h2 className="text-lg font-black text-slate-900">本局规则</h2>
        <ul className="mt-3 space-y-2 text-sm font-bold text-slate-600">
          <li>🎙️ 每人每轮说一句英文</li>
          <li>⏱️ 每句最长 15 秒</li>
          <li>✨ 超时由 AI 助演接替</li>
          <li>🎭 本局预计 5 分钟</li>
        </ul>
      </Card>

      <Button href={`/play/${scenario.id}`}>开始演绎</Button>
      <BottomNav />
    </PhoneShell>
  );
}
