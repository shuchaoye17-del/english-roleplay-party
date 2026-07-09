'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { avatars, englishModes, personalityTags } from '@/data/avatars';
import { Badge, Button, Card, PhoneShell, Sticker } from '@/components/ui';
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
      <div className="relative mb-6 overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-coral/30 via-sunshine/35 to-sky/35 p-5 shadow-[0_20px_60px_rgba(167,139,250,0.22)]">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-partyPurple/25 blur-xl" />
        <div className="absolute bottom-4 right-5 text-3xl">🎉</div>
        <Badge className="bg-white/85">英语角色派对 · Party Demo</Badge>
        <div className="mt-4 flex flex-wrap gap-2">
          <Sticker>练口语</Sticker>
          <Sticker className="rotate-1 bg-sky">角色扮演</Sticker>
          <Sticker className="bg-coral text-white">组队开黑</Sticker>
        </div>
        <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950">英语角色派对</h1>
        <p className="mt-2 text-lg font-black text-slate-800">用英语演故事，边玩边练口语</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">选一个角色，开一局咖啡馆小剧场。你只需要开口说一句，系统会帮你转写、评分、给表达卡。</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {demoBenefits.map((benefit) => (
            <div key={benefit} className="rounded-2xl bg-white/75 px-3 py-2 text-center text-xs font-black text-slate-700 shadow-sm ring-1 ring-black/5">
              {benefit}
            </div>
          ))}
        </div>
        <a href="/share" className="mt-4 inline-flex text-xs font-black text-slate-600 underline decoration-coral/60 underline-offset-4">
          先看给朋友的试玩说明 →
        </a>
      </div>

      <Card className="space-y-5">
        <div className="grid place-items-center rounded-[2rem] bg-gradient-to-br from-white via-sky/20 to-partyPurple/15 py-8">
          <div className={`grid h-32 w-32 place-items-center rounded-full ${selectedAvatar.color} text-6xl shadow-[0_18px_40px_rgba(15,23,42,0.16)] ring-8 ring-white`}>
            {selectedAvatar.emoji}
          </div>
          <p className="mt-4 text-xl font-black text-slate-900">{name || selectedAvatar.name}</p>
          <p className="text-sm font-black text-slate-500">{selectedAvatar.style}</p>
        </div>

        <label className="block">
          <span className="text-sm font-black text-slate-800">角色名</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-black outline-none focus:border-coral"
            placeholder="输入你的角色名"
          />
        </label>

        <div>
          <p className="mb-2 text-sm font-black text-slate-800">角色风格</p>
          <div className="grid grid-cols-3 gap-2">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                onClick={() => {
                  setSelectedAvatar(avatar);
                  setName(avatar.name);
                }}
                className={`rounded-2xl border p-3 text-center text-sm font-black transition active:scale-95 ${selectedAvatar.id === avatar.id ? 'border-coral bg-coral/10 text-coral shadow-sm ring-2 ring-coral/20' : 'border-slate-100 bg-white text-slate-600'}`}
              >
                <div className="text-2xl">{avatar.emoji}</div>
                {avatar.style}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-black text-slate-800">英语状态</p>
          <div className="space-y-2">
            {englishModes.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setEnglishMode(mode)}
                className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-black transition active:scale-95 ${englishMode === mode ? 'border-sky bg-sky/10 text-slate-900 ring-2 ring-sky/20' : 'border-slate-100 bg-white text-slate-600'}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-black text-slate-800">性格标签，最多 3 个</p>
          <div className="flex flex-wrap gap-2">
            {personalityTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-4 py-2 text-sm font-black transition active:scale-95 ${tags.includes(tag) ? 'bg-partyPurple text-white shadow-sm' : 'bg-slate-100 text-slate-600'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={save} disabled={!canSubmit}>开一局英语小剧场</Button>
        <p className="text-center text-xs font-black text-slate-400">不用准备，不会卡关，AI 助演会帮你接住剧情。</p>
      </Card>
    </PhoneShell>
  );
}
