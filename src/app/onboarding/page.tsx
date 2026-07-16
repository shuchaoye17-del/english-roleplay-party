'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { savePlayerProfile } from '@/lib/storage';

const partyCast = [
  { name: 'Lily', role: 'You', src: '/play-implementation-preview/avatar-lily.webp', color: '#ff5e58' },
  { name: 'Ethan', role: 'AI teammate', src: '/play-implementation-preview/avatar-ethan.webp', color: '#3f8cff' },
  { name: 'Mia', role: 'AI teammate', src: '/play-implementation-preview/avatar-mia.webp', color: '#8e63ff' }
];

const proofPills = ['3 分钟', '语音开演', 'AI 队友'];

const steps = [
  {
    title: '拿到你的角色',
    copy: 'Meet your character before the scene starts.',
    color: '#ff5e58'
  },
  {
    title: '点麦克风说一句',
    copy: 'Tap to speak one English line.',
    color: '#3f8cff'
  },
  {
    title: '拿到评级和表达卡',
    copy: 'Earn a rating and a collectible card.',
    color: '#28c269'
  }
];

function Pill({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <span
      className={`inline-flex h-8 items-center rounded-full px-3 text-[12px] font-black ${
        tone === 'dark' ? 'bg-[#111827] text-white' : 'bg-white text-[#5f6878] shadow-sm'
      }`}
    >
      {children}
    </span>
  );
}

function CastAvatar({ member, index }: { member: (typeof partyCast)[number]; index: number }) {
  return (
    <div className={`relative ${index === 0 ? '' : '-ml-3'}`} style={{ zIndex: partyCast.length - index }}>
      <div
        className="relative h-[58px] w-[58px] overflow-hidden rounded-full border-[4px] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.14)]"
        style={{ borderColor: member.color }}
      >
        <Image src={member.src} alt={member.name} fill sizes="58px" className="object-cover" />
      </div>
      {member.role === 'You' ? (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#ff5e58] px-2 py-0.5 text-[10px] font-black uppercase text-white">
          You
        </span>
      ) : null}
    </div>
  );
}

function MicCue() {
  return (
    <div className="relative mx-auto mt-5 grid h-[112px] w-[112px] place-items-center rounded-full bg-[#fff4ef] shadow-[0_16px_34px_rgba(255,94,88,0.22)]">
      <div className="absolute inset-3 rounded-full border border-[#ffb8ad]" />
      <div className="grid h-[78px] w-[78px] place-items-center rounded-full bg-[#ff5e58] text-white shadow-[0_10px_22px_rgba(255,94,88,0.32)]">
        <div className="relative h-11 w-7">
          <span className="absolute left-1/2 top-0 h-8 w-5 -translate-x-1/2 rounded-full bg-white" />
          <span className="absolute bottom-3 left-1/2 h-5 w-8 -translate-x-1/2 rounded-b-full border-b-[4px] border-l-[4px] border-r-[4px] border-white" />
          <span className="absolute bottom-0 left-1/2 h-4 w-1.5 -translate-x-1/2 rounded-full bg-white" />
        </div>
      </div>
      <span className="absolute -bottom-8 text-[14px] font-black text-[#ff5e58]">Tap to speak</span>
    </div>
  );
}

function StagePreview() {
  return (
    <section className="relative mt-5 overflow-hidden rounded-[28px] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.12)]">
      <div className="relative h-[226px]">
        <Image
          src="/play-implementation-preview/stage.webp"
          alt="Birthday cafe story stage"
          fill
          sizes="(max-width: 550px) 100vw, 550px"
          priority
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/72 to-transparent" />
        <div className="absolute left-4 top-4 rounded-[18px] bg-white/92 px-4 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.12)] backdrop-blur-sm">
          <p className="text-[11px] font-black uppercase text-[#ff5e58]">Mini scene</p>
          <p className="mt-1 text-[18px] font-black leading-none text-[#111827]">Cake Scene</p>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center">
          {partyCast.map((member, index) => (
            <CastAvatar key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
      <div className="px-5 pb-5">
        <div className="rounded-[22px] border border-[#ffe3c0] bg-[#fff8e9] px-4 py-3">
          <p className="text-[12px] font-black uppercase text-[#b0761d]">Your line is ready</p>
          <p className="mt-1 text-[18px] font-black leading-snug text-[#111827]">
            &ldquo;Wait, where did the cake go?&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  return (
    <div className="rounded-[22px] border border-[#e9edf3] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.07)]">
      <div className="flex items-start gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[14px] font-black text-white"
          style={{ backgroundColor: step.color }}
        >
          {index + 1}
        </span>
        <div className="min-w-0">
          <h2 className="text-[16px] font-black text-[#111827]">{step.title}</h2>
          <p className="mt-1 text-[13px] font-bold leading-snug text-[#6c7482]">{step.copy}</p>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();

  const startScene = () => {
    savePlayerProfile({
      name: 'Lily',
      avatarId: 'lily',
      level: 1,
      exp: 0
    });
    router.push('/play/cafe-chaos');
  };

  return (
    <main className="min-h-screen bg-[#edf5fb] px-3 py-4 text-[#111827]">
      <div className="mx-auto w-full max-w-[550px] overflow-hidden bg-[#f8f9fb] shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
        <section className="px-4 pb-6 pt-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] font-black tracking-normal text-[#ff5e58]">
              English Roleplay Party
            </p>
            <Pill tone="dark">Voice first</Pill>
          </div>
          <h1 className="mt-3 text-[38px] font-black leading-[1.02] tracking-normal text-[#111827]">
            英语角色派对
          </h1>

          <p className="mt-4 max-w-[430px] text-[22px] font-black leading-tight text-[#111827]">
            用英语演故事，边玩边练口语。
          </p>
          <p className="mt-3 max-w-[430px] text-[15px] font-bold leading-relaxed text-[#5f6878]">
            拿到一个角色，读一句台词，AI 队友会把故事接下去。
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {proofPills.map((pill) => (
              <Pill key={pill}>{pill}</Pill>
            ))}
          </div>

          <div className="mt-4 rounded-[24px] border border-[#ffd6cf] bg-white px-4 py-4 shadow-[0_12px_28px_rgba(255,94,88,0.12)]">
            <button
              type="button"
              onClick={startScene}
              className="flex h-[58px] w-full items-center justify-center gap-3 rounded-full bg-[#ff5e58] px-5 text-center text-[17px] font-black text-white shadow-[0_14px_26px_rgba(255,94,88,0.24)] transition active:scale-95"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
                <span className="h-5 w-3 rounded-full bg-white" />
              </span>
              开一局英语小剧场
            </button>
            <div className="mt-3 flex items-center justify-center gap-2 text-[13px] font-black text-[#ff5e58]">
              <span className="h-2 w-2 rounded-full bg-[#ff5e58]" />
              Start the scene · Then tap to speak
            </div>
            <a
              href="#how-it-works"
              className="mx-auto mt-2 block w-fit rounded-full px-4 py-2 text-[13px] font-black text-[#7c8493]"
            >
              先看看怎么玩
            </a>
          </div>

          <StagePreview />

          <div className="mt-4 rounded-[24px] border border-[#e9edf3] bg-white px-5 pb-5 pt-4 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
            <p className="text-center text-[15px] font-black text-[#111827]">
              不会说也没关系，有台词提示。
            </p>
            <p className="mt-1 text-center text-[13px] font-bold text-[#6c7482]">
              No pressure — your line is ready.
            </p>
            <MicCue />
          </div>
        </section>

        <section id="how-it-works" className="px-4 pb-7">
          <div className="rounded-[26px] bg-[#111827] p-5 text-white shadow-[0_14px_30px_rgba(17,24,39,0.15)]">
            <p className="text-[12px] font-black uppercase text-[#ffd65d]">How it works</p>
            <h2 className="mt-2 text-[24px] font-black leading-tight">3 分钟完成一场英文小剧场</h2>
            <p className="mt-2 text-[14px] font-bold leading-relaxed text-white/72">
              Finish a scene in 3 minutes. You only need one line to get started.
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            {steps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>

          <section className="mt-4 rounded-[22px] border-2 border-[#28c269] bg-white p-4 shadow-[0_12px_28px_rgba(40,194,105,0.12)]">
            <div className="flex items-center gap-4">
              <div className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-[16px]">
                <Image
                  src="/play-implementation-preview/reward-thumb.webp"
                  alt="Expression card preview"
                  fill
                  sizes="78px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-black text-[#18a655]">After the scene</p>
                <h2 className="mt-1 text-[22px] font-black leading-none text-[#111827]">Expression Card</h2>
                <p className="mt-2 text-[13px] font-bold leading-snug text-[#5f6878]">
                  拿到演出评级和表达卡，不是考试分数。
                </p>
              </div>
            </div>
          </section>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={startScene}
              className="flex h-[56px] flex-1 items-center justify-center rounded-full bg-[#ff5e58] px-5 text-center text-[15px] font-black text-white shadow-[0_12px_24px_rgba(255,94,88,0.22)] transition active:scale-95"
            >
              开一局
            </button>
            <Link
              href="/lobby"
              className="flex h-[56px] flex-1 items-center justify-center rounded-full bg-white px-5 text-center text-[15px] font-black text-[#111827] shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition active:scale-95"
            >
              故事大厅
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
