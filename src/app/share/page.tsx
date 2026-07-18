'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { getLatestRunSummary, type LatestRunSummary } from '@/lib/storage';

type ShareStatus = 'idle' | 'shared' | 'copied' | 'share-closed' | 'copy-help';

const fallbackRun: LatestRunSummary = {
  scenarioId: 'cafe-chaos',
  score: 93,
  title: 'S-Scene Saver',
  completedAt: '',
  expressionCards: ['Surprised']
};

const storyByScenario: Record<string, { zh: string; en: string }> = {
  'cafe-chaos': {
    zh: '消失的生日蛋糕',
    en: 'The Missing Birthday Cake'
  }
};

function useLatestRun() {
  const [latestRun, setLatestRun] = useState<LatestRunSummary | null>(null);
  const [shareUrl, setShareUrl] = useState('/onboarding');

  useEffect(() => {
    setLatestRun(getLatestRunSummary());

    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/onboarding`);
    }
  }, []);

  return { latestRun, shareUrl };
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

function ShareMark({ className = '' }: { className?: string }) {
  return (
    <span className={`relative inline-grid place-items-center rounded-[16px] bg-[#ff5e58] ${className}`}>
      <span className="absolute h-7 w-7 rounded-full border-[4px] border-white" />
      <span className="absolute -right-[2px] top-[10px] h-5 w-5 rounded-full border-[4px] border-white bg-[#ff5e58]" />
      <span className="absolute bottom-[11px] h-[4px] w-8 rotate-[-22deg] rounded-full bg-white" />
    </span>
  );
}

function CardMark({ className = '' }: { className?: string }) {
  return (
    <span className={`relative inline-grid place-items-center rounded-[14px] bg-[#28c269] ${className}`}>
      <span className="absolute h-[48%] w-[36%] rounded-[6px] border-[3px] border-white" />
      <span className="absolute bottom-[22%] h-[3px] w-[42%] rounded-full bg-white" />
    </span>
  );
}

function RatingSeal({ rating }: { rating: string }) {
  const letter = rating.trim().charAt(0) || 'S';
  const label = rating.replace(`${letter}-`, '') || 'Scene Saver';

  return (
    <div className="grid h-[116px] w-[116px] shrink-0 place-items-center rounded-full bg-white shadow-[0_14px_30px_rgba(255,94,88,0.22)]">
      <div className="grid h-[94px] w-[94px] place-items-center rounded-full border-[8px] border-[#ff6f67] bg-[#fffdf8]">
        <div className="text-center">
          <p className="text-[42px] font-black leading-none text-[#ff5e58]">{letter}</p>
          <p className="mt-1 max-w-[70px] text-[10px] font-black uppercase leading-none text-[#111827]">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

function PreviewCard({
  storyName,
  rating,
  expressionCard
}: {
  storyName: { zh: string; en: string };
  rating: string;
  expressionCard: string;
}) {
  return (
    <section className="mx-4 mt-4 overflow-hidden rounded-[30px] bg-white shadow-[0_16px_38px_rgba(15,23,42,0.12)]">
      <div className="relative h-[170px] overflow-hidden bg-[#fff4d9]">
        <Image
          src="/play-implementation-preview/stage.webp"
          alt="Birthday party scene"
          fill
          sizes="520px"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-white/84" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Pill tone="dark">English Roleplay Party</Pill>
          <Pill tone="yellow">3 分钟</Pill>
        </div>
        <div className="absolute bottom-4 right-4 flex items-end justify-end">
          <div className="flex -space-x-3">
            {[
              '/play-implementation-preview/avatar-lily.webp',
              '/play-implementation-preview/avatar-ethan.webp',
              '/play-implementation-preview/avatar-mia.webp'
            ].map((src, index) => (
              <span
                key={src}
                className="relative h-11 w-11 overflow-hidden rounded-full border-[3px] border-white shadow-[0_8px_16px_rgba(15,23,42,0.15)]"
                style={{ zIndex: 3 - index }}
              >
                <Image src={src} alt="" fill sizes="44px" className="object-cover" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-5">
        <div className="mb-5 rounded-[22px] bg-[#f5f7fb] px-4 py-3">
          <p className="text-[12px] font-black uppercase text-[#ff5e58]">Shared scene</p>
          <h2 className="mt-1 text-[25px] font-black leading-none text-[#111827]">{storyName.zh}</h2>
          <p className="mt-1 text-[14px] font-black leading-tight text-[#5f6878]">{storyName.en}</p>
        </div>

        <div className="flex items-center gap-4">
          <RatingSeal rating={rating} />
          <div className="min-w-0 flex-1">
            <Pill tone="green">Scene complete</Pill>
            <h3 className="mt-3 text-[25px] font-black leading-none text-[#111827]">{rating}</h3>
            <p className="mt-2 text-[14px] font-bold leading-relaxed text-[#5f6878]">
              我刚用英语演完了一个 3 分钟小剧场。
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[22px] border-2 border-[#28c269] bg-[#fffdf8] p-3">
          <div className="flex items-center gap-3">
            <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[18px] shadow-[0_12px_24px_rgba(15,23,42,0.14)]">
              <Image
                src="/play-implementation-preview/reward-thumb.webp"
                alt="Surprised expression card"
                fill
                sizes="88px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-black uppercase text-[#18a655]">Expression Card</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <h3 className="text-[24px] font-black leading-none text-[#111827]">{expressionCard}</h3>
                <Pill tone="green" className="min-h-7 px-2">Earned</Pill>
              </div>
              <p className="mt-2 text-[13px] font-bold leading-snug text-[#5f6878]">
                You sounded natural in a tense scene.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[22px] bg-[#fff4d9] px-4 py-4">
          <p className="text-[12px] font-black uppercase text-[#8a5f16]">Signature line</p>
          <p className="mt-2 text-[21px] font-black leading-tight text-[#111827]">
            &ldquo;Wait, where did the cake go? I was watching it!&rdquo;
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Pill tone="blue">台词已准备好</Pill>
          <Pill tone="yellow">AI 队友</Pill>
          <Pill tone="coral">Ready to say your line?</Pill>
        </div>
      </div>
    </section>
  );
}

function fallbackCopy(text: string) {
  if (typeof document === 'undefined') return false;

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

export default function SharePage() {
  const { latestRun, shareUrl } = useLatestRun();
  const [status, setStatus] = useState<ShareStatus>('idle');
  const run = latestRun ?? fallbackRun;
  const storyName = storyByScenario[run.scenarioId] ?? storyByScenario[fallbackRun.scenarioId];
  const rating = run.title || fallbackRun.title;
  const expressionCard = run.expressionCards[0] || fallbackRun.expressionCards[0];

  const inviteText = useMemo(
    () =>
      `我刚用英语演完了一个 3 分钟小剧场，拿到了 ${rating} 和 ${expressionCard} 表达卡。你也来演一句？不会说也没关系，台词已经准备好。\n\nI just finished a 3-minute English roleplay scene. Your line is ready - come try it.\n\n${shareUrl}`,
    [expressionCard, rating, shareUrl]
  );

  const shareTitle = `我刚完成了《${storyName.zh}》英语小剧场`;

  async function copyInvite() {
    const fallbackCopied = fallbackCopy(inviteText);

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(inviteText);
        return true;
      } catch {
        return fallbackCopied;
      }
    }

    return fallbackCopied;
  }

  async function handleCopyInvite() {
    const copied = await copyInvite();
    setStatus(copied ? 'copied' : 'copy-help');
  }

  async function handleShareScene() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: inviteText,
          url: shareUrl
        });
        setStatus('shared');
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          setStatus('share-closed');
          return;
        }
      }
    }

    const copied = await copyInvite();
    setStatus(copied ? 'copied' : 'copy-help');
  }

  const statusText = {
    idle: '分享链接会带朋友进入 /onboarding。',
    shared: '分享面板已打开，可以发给朋友了。Share sheet ready.',
    copied: '已复制，可以发给朋友了。Copied - ready to share.',
    'share-closed': '分享面板已关闭。你仍然可以复制邀请文案。Share closed - copy invite anytime.',
    'copy-help': '复制没有成功，可以手动选中文案发送给朋友。'
  }[status];

  return (
    <main className="min-h-screen bg-[#edf5fb] px-3 py-4 text-[#111827]">
      <div className="mx-auto w-full max-w-[550px] overflow-hidden bg-[#f8f9fb] pb-7 shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
        <header className="px-4 pt-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] font-black text-[#ff5e58]">English Roleplay Party</p>
            <Pill tone="dark">Share</Pill>
          </div>

          <section className="mt-4 rounded-[26px] bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-[34px] font-black leading-[1.04] text-[#111827]">分享这场演出</h1>
                <p className="mt-1 text-[17px] font-black text-[#5f6878]">Share Your Scene</p>
              </div>
              <div className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-[22px] bg-[#fff4ef] shadow-[0_12px_24px_rgba(255,94,88,0.16)]">
                <ShareMark className="h-11 w-11" />
              </div>
            </div>
            <p className="mt-4 text-[16px] font-black leading-snug text-[#111827]">
              我刚用英语演完了一个 3 分钟小剧场。
            </p>
            <p className="mt-2 text-[14px] font-bold leading-relaxed text-[#6c7482]">
              I just finished a 3-minute English roleplay scene.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill tone="green">S-Scene Saver</Pill>
              <Pill tone="yellow">Surprised</Pill>
              <Pill tone="blue">/onboarding invite</Pill>
            </div>
          </section>
        </header>

        <PreviewCard storyName={storyName} rating={rating} expressionCard={expressionCard} />

        <section className="mx-4 mt-5 rounded-[26px] bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.09)]">
          <button
            type="button"
            data-testid="share-scene-button"
            onClick={handleShareScene}
            className="flex min-h-[62px] w-full items-center justify-center gap-3 rounded-full bg-[#ff5e58] px-5 text-center text-[17px] font-black text-white shadow-[0_14px_26px_rgba(255,94,88,0.24)] transition active:scale-95"
          >
            <ShareMark className="h-8 w-8 bg-white/20" />
            <span>
              分享我的演出
              <span className="ml-2 text-white/85">Share my scene</span>
            </span>
          </button>

          <button
            type="button"
            data-testid="copy-invite-button"
            onClick={handleCopyInvite}
            className="mt-3 flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full border border-[#e9edf3] bg-white px-5 text-center text-[15px] font-black text-[#111827] shadow-sm transition active:scale-95"
          >
            <CardMark className="h-7 w-7 bg-[#28c269]" />
            <span>
              复制邀请文案
              <span className="ml-2 text-[#7c8493]">Copy invite</span>
            </span>
          </button>

          <p
            data-testid="share-status"
            aria-live="polite"
            className="mt-3 min-h-[44px] rounded-[18px] bg-[#f5f7fb] px-4 py-3 text-center text-[13px] font-bold leading-relaxed text-[#5f6878]"
          >
            {statusText}
          </p>

          <div className="mt-3 rounded-[20px] bg-[#fff4d9] px-4 py-3">
            <p className="text-[12px] font-black uppercase text-[#8a5f16]">Invite preview</p>
            <p className="mt-2 break-words text-[13px] font-bold leading-relaxed text-[#5f6878]">
              {inviteText}
            </p>
          </div>
        </section>

        <section className="mx-4 mt-5 grid gap-3 pb-1">
          <Link
            href="/lobby"
            className="flex min-h-[54px] items-center justify-center rounded-full bg-[#111827] px-5 text-center text-[15px] font-black text-white shadow-[0_12px_24px_rgba(17,24,39,0.13)] transition active:scale-95"
          >
            再演一场 Play another scene
          </Link>

          <Link
            href="/cards"
            className="mx-auto block w-fit rounded-full px-4 py-2 text-center text-[13px] font-black text-[#7c8493] transition active:scale-95"
          >
            查看表达卡 View Expression Cards
          </Link>
        </section>
      </div>
    </main>
  );
}
