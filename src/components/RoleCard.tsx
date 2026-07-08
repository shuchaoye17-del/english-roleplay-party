import { Badge, Card } from './ui';

export function RoleCard({ role, emotion, hiddenMission }: { role: string; emotion: string; hiddenMission: string }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-slate-900">{role}</h3>
        <Badge className="bg-partyPurple/15 text-slate-700">角色卡</Badge>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
        <p><b className="text-slate-900">情绪目标：</b>{emotion}</p>
        <p><b className="text-slate-900">隐藏任务：</b>{hiddenMission}</p>
      </div>
    </Card>
  );
}
