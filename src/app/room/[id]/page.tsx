import { getScenario } from '@/data/scenarios';
import { mockRoomPlayers } from '@/data/rooms';
import { Badge, BottomNav, Button, Card, PhoneShell } from '@/components/ui';
import { RoleCard } from '@/components/RoleCard';
import { PlayerSlot } from '@/components/PlayerSlot';
import { ScenePanel } from '@/components/ScenePanel';

export default function RoomPage({ params }: { params: { id: string } }) {
  const scenario = getScenario(params.id);
  const mainRole = scenario.roles[0];

  return (
    <PhoneShell className="pb-24">
      <ScenePanel scenario={scenario} label="开演前后台" />

      <Card className="mb-4 mt-4 bg-white/90">
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

      <div className="mb-4 grid gap-3">
        {mockRoomPlayers.map((player) => (
          <PlayerSlot key={player.id} name={player.name} avatar={player.avatar} role={player.role} state={player.state} />
        ))}
      </div>

      {mainRole ? (
        <div className="mb-4">
          <RoleCard role={mainRole.name} emotion={mainRole.emotion} hiddenMission={mainRole.hiddenMission} />
        </div>
      ) : null}

      <Card className="mb-5 bg-sunshine/20">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">本局规则</h2>
          <Badge className="bg-white">回合制语音</Badge>
        </div>
        <ul className="mt-3 space-y-2 text-sm font-bold text-slate-600">
          <li>🎙️ 每人每轮说一句英文</li>
          <li>⏱️ 每句最长 15 秒</li>
          <li>✨ 超时由 AI 助演接替</li>
          <li>🎭 退出不影响其他玩家通关</li>
        </ul>
      </Card>

      <Button href={`/play/${scenario.id}`}>开始演绎</Button>
      <BottomNav />
    </PhoneShell>
  );
}
