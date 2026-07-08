'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { avatars, englishModes, personalityTags } from '@/data/avatars';
import { Badge, Button, Card, PhoneShell } from '@/components/ui';
import { savePlayerProfile } from '@/lib/storage';

const demoBenefits = ['3 分钟体验一局', '开口说就能玩', '不会说也有救场台词'];

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [name, setName] = useState(avatars[0].name);
  const [englishMode, setEnglishMode] = useState(englishModes[0]);
  const [tags, setTags] = useState<string[]>(['外向']);

  const canSubmit = useMemo(() => name.trim().length > 0, [name]);

  const toggleTag = (tag: string) => {
    setTags((current) => {
      if (current.includes(tag)) return current.filter((item) => item !== tag);
      if (current.length >= 3) return current;
      return [...current, tag];
    });
  };

  const save = () => {
    if (!canSubmit) return;
    savePlayerProfile({
      name: name.trim(),
      avatarId: selectedAvatar.id,
      level: 1,
      exp: 0
    });
    router.push('/lobby');
  };

  return (
    <PhoneShell className="pb-10">
      <div className="mb-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-coral/25 via-sunshine/30 to-sky/30 p-5">
        <Badge className="bg-white/80">英语角色派对 · v0.1 demo</Badge>
        <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900">用英语演故事，边玩边练口语</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">选一个角色，开一局咖啡馆小剧场。你只需要开口说一句，系统会帮你转写、评分、给表达卡。</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {demoBenefits.map((benefit) => (
            <div key={benefit} className="rounded-2xl bg-white/70 px-3 py-2 text-center text-xs font-black text-slate-700 shadow-sm">
              {benefit}
            </div>
          ))}
        </div>
      </div>

      <Card className="space-y-5">
        <div className="grid place-items-center rounded-[2rem] bg-gradient-to-br from-white to-sky/20 py-8">
          <div className={`grid h-32 w-32 place-items-center rounded-full ${selectedAvatar.color} text-6xl shadow-lg ring-8 ring-white`}>
            {selectedAvatar.emoji}
          </div>
          <p className="mt-4 text-xl font-black text-slate-900">{name || selectedAvatar.name}</p>
          <p className="text-sm font-bold text-slate-500">{selectedAvatar.style}</p>
        </div>

        <label className="block">
          <span className="text-sm font-extrabold text-slate-800">角色名</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-bold outline-none focus:border-coral"
            placeholder="输入你的角色名"
          />
        </label>

        <div>
          <p className="mb-2 text-sm font-extrabold text-slate-800">角色风格</p>
          <div className="grid grid-cols-3 gap-2">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                onClick={() => {
                  setSelectedAvatar(avatar);
                  setName(avatar.name);
                }}
                className={`rounded-2xl border p-3 text-center text-sm font-bold ${selectedAvatar.id === avatar.id ? 'border-coral bg-coral/10 text-coral' : 'border-slate-100 bg-white text-slate-600'}`}
              >
                <div className="text-2xl">{avatar.emoji}</div>
                {avatar.style}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-extrabold text-slate-800">英语状态</p>
          <div className="space-y-2">
            {englishModes.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setEnglishMode(mode)}
                className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-bold ${englishMode === mode ? 'border-sky bg-sky/10 text-slate-900' : 'border-slate-100 bg-white text-slate-600'}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-extrabold text-slate-800">性格标签，最多 3 个</p>
          <div className="flex flex-wrap gap-2">
            {personalityTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-4 py-2 text-sm font-bold ${tags.includes(tag) ? 'bg-partyPurple text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={save} disabled={!canSubmit}>开一局英语小剧场</Button>
        <p className="text-center text-xs font-bold text-slate-400">不用准备，不会卡关，AI 助演会帮你接住剧情。</p>
      </Card>
    </PhoneShell>
  );
}
