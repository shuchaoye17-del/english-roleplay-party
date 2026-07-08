'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { avatars, englishModes, personalityTags } from '@/data/avatars';
import { Badge, Button, Card, PhoneShell } from '@/components/ui';

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
    localStorage.setItem('erp-avatar', JSON.stringify({ avatar: selectedAvatar, name, englishMode, tags, level: 1 }));
    router.push('/lobby');
  };

  return (
    <PhoneShell className="pb-10">
      <div className="mb-6 rounded-[2rem] bg-gradient-to-br from-coral/25 via-sunshine/30 to-sky/30 p-5">
        <Badge className="bg-white/80">英语角色派对</Badge>
        <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900">创建你的英语角色</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">选一个角色，准备进入你的第一场英文小剧场。</p>
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

        <Button onClick={save} disabled={!canSubmit}>进入英语派对</Button>
      </Card>
    </PhoneShell>
  );
}
