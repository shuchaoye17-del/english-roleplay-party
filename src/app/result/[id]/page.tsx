'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getScenario } from '@/data/scenarios';
import { mockTurnScore } from '@/lib/scoring';
import { getLatestRunSummary, type LatestRunSummary } from '@/lib/storage';

type Dimension = {
  label: string;
  value: number;
  color: string;
};

const playerAvatars = [
  { name: 'Lily', src: '/play-implementation-preview/avatar-lily.webp', color: '#ff5e58' },
  { name: 'Ethan', src: '/play-implementation-preview/avatar-ethan.webp', color: '#3f8cff' },
  { name: 'Mia', src: '/play-implementation-preview/avatar-mia.webp', color: '#8e63ff' },
  { name: 'Jason', src: '/play-implementation-preview/avatar-jason.webp', color: '#28c269' }
];

const fallbackResult: LatestRunSummary = {
  scenarioId: 'cafe-chaos',
  score: 93,
  title: 'S-Scene Saver',
  completedAt: '',
  expressionCards: ['Surprised']
};

function clampScore(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function getRating(score: number) {
  if (score >= 92) {
    return { letter: 'S', title: 'Scene Saver', fullTitle: 'S-Scene Saver' };
  }

  if (score >= 84) {
    return { letter: 'A', title: 'Role Energy', fullTitle: 'A-Role Energy' };
  }

  return { letter: 'B', title: 'Story Spark', fullTitle: 'B-Story Spark' };
}

function buildDimensions(score: number): Dimension[] {
  const expression = clampScore(Math.max(mockTurnScore.emotionMatch, score));
  const flow = clampScore(Math.round((mockTurnScore.englishNaturalness + mockTurnScore.pronunciationClarity) / 2));
  const acting = clampScore(Math.round((mockTurnScore.roleImmersion + mockTurnScore.storyProgress) / 2));

  return [
    { label: 'Expression 表达力', value: expression, color: '#ff5e58' },
    { label: 'Flow 流利度', value: Math.max(flow, score - 6), color: '#3f8cff' },
    { label: 'Acting 角色感', value: Math.max(acting, score - 3), color: '#8e63ff' }
  ];
}

function useResultSummary(scenarioId: string) {
  const [latestRun, setLatestRun] = useState<LatestRunSummary | null>(null);

  useEffect(() => {
    setLatestRun(getLatestRunSummary());
  }, []);

  return latestRun?.scenarioId === scenarioId ? latestRun : null;
}

function Confetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute left-7 top-20 h-3 w-8 rotate-[-18deg] rounded-full bg-[#ffd65d]" />
      <span className="absolute right-9 top-28 h-3 w-3 rounded-full bg-[#3f8cff]" />
      <span className="absolute left-12 top-[270px] h-3 w-3 rotate-12 rounded-sm bg-[#28c269]" />
      <span className="absolute right-14 top-[238px] h-2 w-7 rotate-12 rounded-full bg-[#ff5e58]" />
      <span className="absolute left-1/2 top-14 h-2 w-2 rounded-sm bg-[#8e63ff]" />
    </div>
  );
}

function AvatarStack() {
  return (
    <div className="flex items-center justify-center">
      {playerAvatars.map((avatar, index) => (
        <div
          key={avatar.name}
          className="-ml-3 first:ml-0"
          style={{ zIndex: playerAvatars.length - index }}
        >
          <div
            className="relative h-[58px] w-[58px] overflow-hidden rounded-full border-[4px] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.14)]"
            style={{ borderColor: avatar.color }}
          >
            <Image src={avatar.src} alt={avatar.name} fill sizes="58px" className="object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ScoreBadge({ score, letter, title }: { score: number; letter: string; title: string }) {
  return (
    <div className="relative mx-auto mt-6 grid h-[154px] w-[154px] place-items-center rounded-full bg-white shadow-[0_18px_34px_rgba(255,94,88,0.20)]">
      <div className="absolute inset-2 rounded-full border-[10px] border-[#ff6f67]" />
      <div className="absolute inset-[22px] rounded-full border-[6px] border-[#ffd65d]" />
      <div className="relative text-center">
        <p className="text-[50px] font-black leading-none text-[#ff5e58]">{letter}</p>
        <p className="mt-1 text-[13px] font-black uppercase tracking-normal text-[#111827]">{title}</p>
        <p className="mt-1 text-[18px] font-black text-[#111827]">{score}</p>
      </div>
    </div>
  );
}

function DimensionCard({ dimension }: { dimension: Dimension }) {
  return (
    <section className="rounded-[20px] border border-[#e9edf3] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.07)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[14px] font-black leading-tight text-[#111827]">{dimension.label}</h3>
        <span className="text-[20px] font-black text-[#111827]">{dimension.value}</span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#eef2f8]">
        <div
          className="h-full rounded-full"
          style={{ width: `${dimension.value}%`, backgroundColor: dimension.color }}
        />
      </div>
    </section>
  );
}

function EarnedCard({ title }: { title: string }) {
  return (
    <section className="mx-4 mt-4 rounded-[22px] border-2 border-[#28c269] bg-white p-3 shadow-[0_12px_28px_rgba(40,194,105,0.13)]">
      <div className="flex items-center gap-4">
        <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[16px]">
          <Image
            src="/play-implementation-preview/reward-thumb.webp"
            alt="Earned expression card"
            fill
            sizes="92px"
            className="object-cover"
          />
          <div className="absolute left-2 top-2 rounded-full bg-[#ff5e58] px-2 py-0.5 text-[10px] font-black uppercase text-white">
            New
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-black text-[#18a655]">Expression Card Earned</p>
          <div className="mt-1 flex items-center gap-2">
            <h2 className="truncate text-[25px] font-black leading-none text-[#111827]">{title}</h2>
            <span className="rounded-full bg-[#28c269] px-2 py-0.5 text-[11px] font-black text-white">
              New
            </span>
          </div>
          <p className="mt-2 text-[13px] font-bold leading-snug text-[#5f6878]">
            You sounded natural in a tense scene.
          </p>
        </div>
      </div>
    </section>
  );
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex h-[58px] flex-1 items-center justify-center rounded-full bg-[#ff5e58] px-5 text-center text-[16px] font-black text-white shadow-[0_12px_24px_rgba(255,94,88,0.22)] transition active:scale-95"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex h-[58px] flex-1 items-center justify-center rounded-full bg-[#111827] px-5 text-center text-[16px] font-black text-white shadow-[0_12px_24px_rgba(17,24,39,0.13)] transition active:scale-95"
    >
      {children}
    </Link>
  );
}

export default function ResultPage({ params }: { params: { id: string } }) {
  const scenario = getScenario(params.id);
  const latestRun = useResultSummary(scenario.id);
  const result = latestRun ?? fallbackResult;

  const score = clampScore(result.score || fallbackResult.score);
  const rating = getRating(score);
  const dimensions = useMemo(() => buildDimensions(score), [score]);
  const earnedCard = result.expressionCards[0] || fallbackResult.expressionCards[0];

  return (
    <main className="min-h-screen bg-[#edf5fb] px-3 py-4 text-[#111827]">
      <div className="relative mx-auto w-full max-w-[550px] overflow-hidden bg-[#f8f9fb] shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
        <Confetti />

        <header className="relative z-10 flex h-[58px] items-center gap-3 px-3">
          <Link
            href="/lobby"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-2xl font-black text-[#111827] shadow-[0_5px_14px_rgba(15,23,42,0.16)]"
            aria-label="Back to story hall"
          >
            &lt;
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-[18px] font-black leading-none text-[#111827]">Scene Complete</p>
            <p className="mt-1 text-[13px] font-bold text-[#6c7482]">The Missing Birthday Cake</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#8e63ff] shadow-sm">
            Result
          </span>
        </header>

        <section className="relative z-10 mx-4 mt-1 overflow-hidden rounded-[28px] bg-white px-5 pb-5 pt-6 shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
          <div className="absolute left-0 top-0 h-2 w-full bg-[#ff5e58]" />
          <div className="text-center">
            <p className="text-[22px] font-black leading-none text-[#111827]">演出完成</p>
            <p className="mt-1 text-[13px] font-black uppercase tracking-normal text-[#7c8493]">
              Scene Complete
            </p>
          </div>
          <div className="mt-5">
            <AvatarStack />
          </div>
          <ScoreBadge score={score} letter={rating.letter} title={rating.title} />
          <p className="mt-4 text-center text-[20px] font-black text-[#111827]">{rating.fullTitle}</p>
          <p className="mx-auto mt-2 max-w-[340px] text-center text-[14px] font-bold leading-relaxed text-[#5f6878]">
            你把故事接住了，也把角色演出来了。
          </p>
          <div className="mt-5 rounded-[18px] bg-[#fff4d9] px-4 py-3 text-center">
            <p className="text-[12px] font-black uppercase tracking-normal text-[#b0761d]">Party recap</p>
            <p className="mt-1 text-[14px] font-black text-[#111827]">
              Lily helped the team save the birthday scene.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-4 mt-4 grid gap-3">
          {dimensions.map((dimension) => (
            <DimensionCard key={dimension.label} dimension={dimension} />
          ))}
        </section>

        <section className="relative z-10 mx-4 mt-4 rounded-[22px] bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.09)]">
          <div className="mb-3 inline-flex rounded-full bg-[#eef6ff] px-3 py-1 text-[12px] font-black text-[#2563eb]">
            Best line
          </div>
          <p className="text-[24px] font-black leading-tight text-[#111827]">
            &ldquo;Wait, where did the cake go? I was watching it!&rdquo;
          </p>
          <p className="mt-3 text-[13px] font-bold leading-relaxed text-[#5f6878]">
            The line lands fast, sounds surprised, and gives the team a clear next move.
          </p>
        </section>

        <EarnedCard title={earnedCard} />

        <section className="relative z-10 mx-4 mt-4 rounded-[22px] border border-[#e9edf3] bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[15px] font-black text-[#111827]">Share snapshot</p>
              <p className="mt-1 text-[13px] font-bold leading-snug text-[#6c7482]">
                A bright replay card for your English roleplay moment.
              </p>
            </div>
            <div className="rounded-[18px] bg-[#eef6ff] px-4 py-3 text-center">
              <p className="text-[30px] font-black leading-none text-[#ff5e58]">{rating.letter}</p>
              <p className="mt-1 text-[10px] font-black uppercase text-[#111827]">Party score</p>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-4 mt-5 pb-8">
          <div className="flex gap-3">
            <PrimaryLink href={`/play/${scenario.id}`}>再演一局 Play Again</PrimaryLink>
            <SecondaryLink href="/share">分享战绩 Share Result</SecondaryLink>
          </div>
          <Link
            href="/lobby"
            className="mx-auto mt-4 block w-fit rounded-full px-4 py-2 text-[13px] font-black text-[#7c8493]"
          >
            回到故事大厅 Back to Story Hall
          </Link>
        </section>
      </div>
    </main>
  );
}
