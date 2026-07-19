'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { expressionCards, type ExpressionCard } from '@/data/expressionCards';
import { getLatestRunSummary, type LatestRunSummary } from '@/lib/storage';

type LockedCard = {
  title: string;
  note: string;
  accent: string;
};

const fallbackLatestRun: LatestRunSummary = {
  scenarioId: 'cafe-chaos',
  score: 93,
  title: 'S-Scene Saver',
  completedAt: '',
  expressionCards: ['Surprised']
};

const lockedCards: LockedCard[] = [
  {
    title: 'Curious',
    note: '完成更多故事后获得',
    accent: '#3f8cff'
  },
  {
    title: 'Relieved',
    note: '完成更多故事后获得',
    accent: '#8e63ff'
  },
  {
    title: 'Confident',
    note: '完成更多故事后获得',
    accent: '#28c269'
  }
];

function useLatestRun() {
  const [latestRun, setLatestRun] = useState<LatestRunSummary | null>(null);

  useEffect(() => {
    setLatestRun(getLatestRunSummary());
  }, []);

  return latestRun;
}

function Pill({
  children,
  tone = 'light',
  className = ''
}: {
  children: ReactNode;
  tone?: 'light' | 'dark' | 'green' | 'yellow' | 'coral' | 'blue';
  className?: string;
}) {
  const toneClass = {
    light: 'bg-white text-[#5f6878] shadow-sm',
    dark: 'bg-[#111827] text-white',
    green: 'bg-[#e9fff1] text-[#18a655]',
    yellow: 'bg-[#fff4d9] text-[#8a5f16]',
    coral: 'bg-[#fff0ee] text-[#ff5e58]',
    blue: 'bg-[#eef6ff] text-[#2563eb]'
  }[tone];

  return (
    <span className={`inline-flex min-h-8 items-center whitespace-nowrap rounded-full px-3 text-[12px] font-black ${toneClass} ${className}`}>
      {children}
    </span>
  );
}

function CardMark({ className = '' }: { className?: string }) {
  return (
    <span className={`relative inline-grid place-items-center rounded-[14px] bg-[#ff5e58] ${className}`}>
      <span className="absolute h-[48%] w-[36%] rounded-[6px] border-[3px] border-white" />
      <span className="absolute bottom-[22%] h-[3px] w-[42%] rounded-full bg-white" />
    </span>
  );
}

function LatestEarnedCard({ latestRun }: { latestRun: LatestRunSummary | null }) {
  const run = latestRun ?? fallbackLatestRun;
  const isFallback = latestRun == null;
  const earnedTitle = run.expressionCards[0] || fallbackLatestRun.expressionCards[0];

  return (
    <section className="mx-4 mt-4 overflow-hidden rounded-[28px] border-2 border-[#28c269] bg-white shadow-[0_16px_36px_rgba(40,194,105,0.14)]">
      <div className="relative min-h-[246px] bg-[#fffdf8] px-5 pb-5 pt-5">
        <div className="flex items-start gap-4">
          <div className="relative h-[124px] w-[124px] shrink-0 overflow-hidden rounded-[24px] shadow-[0_14px_28px_rgba(15,23,42,0.16)]">
            <Image
              src="/play-implementation-preview/reward-thumb.webp"
              alt={`${earnedTitle} expression card`}
              fill
              sizes="124px"
              priority
              className="object-cover"
            />
            <span className="absolute left-2 top-2 rounded-full bg-[#ff5e58] px-2 py-0.5 text-[10px] font-black uppercase text-white">
              Latest
            </span>
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <div className="flex flex-wrap gap-2">
              <Pill tone="coral">Latest earned</Pill>
              <Pill tone="green">Collected</Pill>
            </div>
            <h2 className="mt-3 text-[34px] font-black leading-none text-[#111827]">{earnedTitle}</h2>
            <p className="mt-2 text-[14px] font-black leading-tight text-[#5f6878]">
              The Missing Birthday Cake
            </p>
            <p className="mt-1 text-[13px] font-bold leading-tight text-[#7c8493]">
              消失的生日蛋糕
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[22px] bg-[#fff4d9] px-4 py-4">
          <p className="text-[12px] font-black uppercase text-[#8a5f16]">Signature line</p>
          <p className="mt-2 text-[22px] font-black leading-tight text-[#111827]">
            &ldquo;Wait, where did the cake go? I was watching it!&rdquo;
          </p>
        </div>

        <div className="mt-4 grid gap-3 min-[520px]:grid-cols-2">
          <div className="rounded-[18px] bg-[#f5f7fb] px-4 py-3">
            <p className="text-[12px] font-black text-[#ff5e58]">Use it when</p>
            <p className="mt-1 text-[13px] font-bold leading-relaxed text-[#5f6878]">
              适合突然发现意外情况时，用惊讶的语气表达。
            </p>
          </div>
          <div className="rounded-[18px] bg-[#f5f7fb] px-4 py-3">
            <p className="text-[12px] font-black text-[#2563eb]">Performance note</p>
            <p className="mt-1 text-[13px] font-bold leading-relaxed text-[#5f6878]">
              Use it when something unexpected happens.
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-[12px] font-bold text-[#7c8493]">
          {isFallback ? 'Fallback preview from Cafe Chaos.' : `Saved from your latest scene: ${run.title}.`}
        </p>
      </div>
    </section>
  );
}

function SmallExpressionCard({ card }: { card: ExpressionCard }) {
  return (
    <article className="rounded-[22px] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.07)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <Pill tone={card.rarity === 'common' ? 'light' : card.rarity === 'rare' ? 'blue' : 'yellow'}>
          {card.type}
        </Pill>
        <span className="h-2 w-8 rounded-full bg-[#28c269]" />
      </div>
      <h3 className="text-[19px] font-black leading-tight text-[#111827]">{card.expression}</h3>
      <p className="mt-2 text-[13px] font-bold leading-relaxed text-[#5f6878]">{card.scene}</p>
      <p className="mt-3 rounded-[16px] bg-[#f5f7fb] px-3 py-2 text-[12px] font-bold leading-relaxed text-[#6c7482]">
        {card.emotion}
      </p>
    </article>
  );
}

function LockedExpressionCard({ card }: { card: LockedCard }) {
  return (
    <article className="rounded-[22px] border border-[#e9edf3] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-3">
        <div
          className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] opacity-65"
          style={{ backgroundColor: card.accent }}
        >
          <span className="h-6 w-5 rounded-[6px] border-[3px] border-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[18px] font-black leading-tight text-[#111827]">{card.title}</h3>
          <p className="mt-1 text-[12px] font-bold leading-snug text-[#7c8493]">{card.note}</p>
        </div>
        <Pill>Locked</Pill>
      </div>
    </article>
  );
}

export default function CardsPage() {
  const latestRun = useLatestRun();
  const supportingCards = useMemo(() => expressionCards.slice(0, 2), []);

  return (
    <main className="min-h-screen bg-[#edf5fb] px-3 py-4 text-[#111827]">
      <div className="mx-auto w-full max-w-[550px] overflow-hidden bg-[#f8f9fb] pb-7 shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
        <header className="px-4 pt-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] font-black text-[#ff5e58]">English Roleplay Party</p>
            <Pill tone="dark">Expression Cards</Pill>
          </div>

          <section className="mt-4 rounded-[26px] bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-[34px] font-black leading-[1.04] text-[#111827]">表达卡收藏</h1>
                <p className="mt-1 text-[17px] font-black text-[#5f6878]">Expression Cards</p>
              </div>
              <div className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-[22px] bg-[#fff4ef] shadow-[0_12px_24px_rgba(255,94,88,0.16)]">
                <CardMark className="h-11 w-11" />
              </div>
            </div>
            <p className="mt-4 text-[16px] font-black leading-snug text-[#111827]">
              每演完一个故事，就把最出彩的表达收进卡组。
            </p>
            <p className="mt-2 text-[14px] font-bold leading-relaxed text-[#6c7482]">
              Finish a scene and keep its best expression.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill tone="green">1 latest earned</Pill>
              <Pill tone="yellow">4-card starter set</Pill>
            </div>
          </section>
        </header>

        <LatestEarnedCard latestRun={latestRun} />

        <section className="mx-4 mt-5 rounded-[24px] bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e9fff1]">
              <span className="h-3 w-3 rounded-full bg-[#28c269]" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-[18px] font-black leading-tight text-[#111827]">
                这是演出奖励，不是考试分数。
              </h2>
              <p className="mt-2 text-[14px] font-bold leading-relaxed text-[#5f6878]">
                A performance reward, not a test score.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-4 mt-5">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[22px] font-black leading-tight text-[#111827]">Roleplay examples</h2>
              <p className="mt-1 text-[13px] font-bold text-[#7c8493]">
                Small cards from earlier roleplay moments.
              </p>
            </div>
            <Pill>{supportingCards.length} samples</Pill>
          </div>

          <div className="grid gap-3">
            {supportingCards.map((card) => (
              <SmallExpressionCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        <section className="mx-4 mt-5">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[22px] font-black leading-tight text-[#111827]">Next cards</h2>
              <p className="mt-1 text-[13px] font-bold text-[#7c8493]">
                完成更多故事后获得。
              </p>
            </div>
            <Pill tone="green">Earn by acting</Pill>
          </div>

          <div className="grid gap-3">
            {lockedCards.map((card) => (
              <LockedExpressionCard key={card.title} card={card} />
            ))}
          </div>
        </section>

        <section className="mx-4 mt-5">
          <Link
            href="/lobby"
            className="flex h-[60px] w-full items-center justify-center gap-3 rounded-full bg-[#ff5e58] px-5 text-center text-[17px] font-black text-white shadow-[0_14px_26px_rgba(255,94,88,0.24)] transition active:scale-95"
          >
            <CardMark className="h-8 w-8 bg-white/20" />
            <span>
              去演下一场
              <span className="ml-2 text-white/82">Play for another card</span>
            </span>
          </Link>

          <Link
            href="/play/cafe-chaos"
            className="mx-auto mt-4 block w-fit rounded-full px-4 py-2 text-center text-[13px] font-black text-[#7c8493] transition active:scale-95"
          >
            重演生日蛋糕 Replay the birthday scene
          </Link>

          <Link
            href="/share"
            className="mx-auto mt-1 block w-fit rounded-full px-4 py-2 text-center text-[13px] font-black text-[#7c8493] transition active:scale-95"
          >
            分享这场演出 Share this scene
          </Link>
        </section>
      </div>
    </main>
  );
}
