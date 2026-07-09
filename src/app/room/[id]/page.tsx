import { getScenario } from '@/data/scenarios';
import { mockRoomPlayers } from '@/data/rooms';
import { Badge, BottomNav, Button, Card, PhoneShell, Sticker } from '@/components/ui';
import { RoleCard } from '@/components/RoleCard';
import { PlayerSlot } from '@/components/PlayerSlot';
import { ScenePanel } from '@/components/ScenePanel';

export default function RoomPage({ params }: { params: { id: string } }) {
  const scenario = getScenario(params.id);
  const mainRole = scenario.roles[0];

  return (
    <PhoneShell className="pb-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-slate-950 via-partyPurple to-coral p-5 text-white shadow-[0_20px_60px_rgba(15,23,42,0.25)]">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sunshine/30 blur-2xl" />
        <Badge className="bg-white/90 text-slate-900">团队房间 · 准备开黑</Badge>
        <h1 className="mt-4 text-3xl font-black">{scenario.title}</h1>
        <p className="mt-2 text-sm font-bold leading-6 text-white/80">每人一句英文，把剧情接下去。不会说也有 AI 助演接场。</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Sticker>5/6 已就位</Sticker>
          <Sticker className="rotate-1 bg-sky">实时互动</Sticker>
          <Sticker className="bg-sunshine">语音开演</Sticker>
        </div>
      </div>

      <div className="mt-4">
        <ScenePanel scenario={scenario} label="开演前后台" />
      </div>

      <Card className="mb-4 mt-4 bg-white/90">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-slate-400">房间号</p>
            <p className="text-2xl font-black text-slate-900">PARTY-317</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-coral/10 text-coral">邀请好友</Badge>
            <Badge className="bg-sky/10 text-slate-700">复制链接</Badge>
          </div>
        </div>
      </Card>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900">角色阵容</h2>
        <Badge className="bg-fresh/20">准备中</Badge>
      </div>

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

      <Card className="mb-5 bg-sunshine/25">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">本局规则</h2>
          <Badge className="bg-white">回合制语音</Badge>
        </div>
        <ul className="mt-3 space-y-2 text-sm font-black text-slate-600">
          <li>🎙️ 每人每轮说一句英文</li>
          <li>⏱️ 每句最长 15 秒</li>
          <li>✨ 超时由 AI 助演接替</li>
          <li>🎭 退出不影响其他玩家通关</li>
        </ul>
      </Card>

      <Button href={`/play/${scenario.id}`}>准备开演</Button>
      <BottomNav />
    </PhoneShell>
  );
}
