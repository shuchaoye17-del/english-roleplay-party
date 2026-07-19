import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type CastMember = {
  name: string;
  role: string;
  src: string;
  color: string;
};

const aiCast: CastMember[] = [
  {
    name: 'Ethan',
    role: 'AI teammate',
    src: '/play-implementation-preview/avatar-ethan.webp',
    color: '#3f8cff'
  },
  {
    name: 'Mia',
    role: 'AI teammate',
    src: '/play-implementation-preview/avatar-mia.webp',
    color: '#8e63ff'
  },
  {
    name: 'Narrator',
    role: 'AI narrator',
    src: '/play-implementation-preview/avatar-narrator.webp',
    color: '#b7c0d0'
  }
];

const readinessPills = ['3 分钟', '语音角色扮演', 'AI 队友'];

function Pill({
  children,
  tone = 'light',
  className = ''
}: {
  children: ReactNode;
  tone?: 'light' | 'dark' | 'green' | 'yellow' | 'coral';
  className?: string;
}) {
  const toneClass = {
    light: 'bg-white text-[#5f6878] shadow-sm',
    dark: 'bg-[#111827] text-white',
    green: 'bg-[#e9fff1] text-[#18a655]',
    yellow: 'bg-[#fff4d9] text-[#8a5f16]',
    coral: 'bg-[#fff0ee] text-[#ff5e58]'
  }[tone];

  return (
    <span className={`inline-flex min-h-8 items-center whitespace-nowrap rounded-full px-3 text-[12px] font-black ${toneClass} ${className}`}>
      {children}
    </span>
  );
}

function MicMark({ className = '' }: { className?: string }) {
  return (
    <span className={`relative inline-grid place-items-center rounded-full bg-[#ff5e58] ${className}`}>
      <span className="absolute h-[52%] w-[28%] rounded-full bg-white" />
      <span className="absolute top-[56%] h-[24%] w-[42%] rounded-b-full border-b-[3px] border-l-[3px] border-r-[3px] border-white" />
      <span className="absolute bottom-[15%] h-[18%] w-[6%] rounded-full bg-white" />
    </span>
  );
}

function ReadyDot({ color }: { color: string }) {
  return (
    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white shadow-[0_8px_18px_rgba(15,23,42,0.10)]">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
    </span>
  );
}

function HeroStage() {
  return (
    <section className="mx-4 mt-4 overflow-hidden rounded-[28px] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.12)]">
      <div className="relative h-[235px]">
        <Image
          src="/play-implementation-preview/stage.webp"
          alt="Birthday cafe stage before the roleplay scene"
          fill
          sizes="(max-width: 550px) 100vw, 550px"
          priority
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/72 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Pill tone="green">Cast ready</Pill>
          <Pill tone="yellow">Ready to perform</Pill>
        </div>
        <div className="absolute bottom-4 left-4 rounded-[18px] bg-white/94 px-4 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.12)] backdrop-blur-sm">
          <p className="text-[11px] font-black text-[#ff5e58]">Opening scene</p>
          <p className="mt-1 text-[18px] font-black leading-none text-[#111827]">Cake Mystery</p>
        </div>
        <div className="absolute right-4 top-4 grid h-[54px] w-[54px] place-items-center rounded-full bg-white/95 shadow-[0_8px_18px_rgba(15,23,42,0.14)]">
          <MicMark className="h-10 w-10" />
        </div>
        <div className="absolute right-4 top-[94px] max-w-[136px] rounded-[16px] bg-white/95 px-3 py-2 shadow-[0_8px_18px_rgba(15,23,42,0.12)] backdrop-blur-sm">
          <p className="text-[11px] font-black text-[#ff5e58]">Line ready soon</p>
          <p className="mt-1 text-[11px] font-bold leading-tight text-[#263143]">
            See it after you start.
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-1">
        <p className="text-[12px] font-black text-[#ff5e58]">The scene you picked</p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-[30px] font-black leading-[1.04] text-[#111827]">
              消失的生日蛋糕
            </h2>
            <p className="mt-1 text-[17px] font-black leading-tight text-[#5f6878]">
              The Missing Birthday Cake
            </p>
          </div>
          <div className="shrink-0 rounded-[18px] bg-[#111827] px-3 py-2 text-center text-white">
            <p className="text-[20px] font-black leading-none">3</p>
            <p className="mt-1 text-[10px] font-black uppercase">min</p>
          </div>
        </div>

        <p className="mt-4 rounded-[20px] bg-[#fff4d9] px-4 py-3 text-[15px] font-bold leading-relaxed text-[#6b4d16]">
          生日派对马上开始，蛋糕却突然不见了。
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {readinessPills.map((pill) => (
            <Pill key={pill}>{pill}</Pill>
          ))}
        </div>
      </div>
    </section>
  );
}

function YourRoleCard() {
  return (
    <section className="mx-4 mt-4 rounded-[26px] border-2 border-[#ffb8ad] bg-white p-4 shadow-[0_14px_30px_rgba(255,94,88,0.12)]">
      <div className="flex items-center gap-4">
        <div className="relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-[28px] border-[4px] border-[#ff5e58] bg-white shadow-[0_12px_24px_rgba(255,94,88,0.18)]">
          <Image
            src="/play-implementation-preview/avatar-lily.webp"
            alt="Lily avatar"
            fill
            sizes="104px"
            className="object-cover"
          />
          <span className="absolute left-2 top-2 rounded-full bg-[#ff5e58] px-2 py-0.5 text-[10px] font-black uppercase text-white">
            You
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <Pill tone="coral">Your role</Pill>
          <h2 className="mt-2 text-[31px] font-black leading-none text-[#111827]">Lily</h2>
          <p className="mt-2 text-[13px] font-bold leading-relaxed text-[#5f6878]">
            你是 Lily，生日派对的主持人，也是第一个发现蛋糕不见的人。
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-[20px] bg-[#fff8e9] px-4 py-3">
        <p className="text-[13px] font-black text-[#8a5f16]">
          You are Lily — the birthday host who notices the cake is missing.
        </p>
      </div>
    </section>
  );
}

function AICastCard() {
  return (
    <section className="mx-4 mt-4 rounded-[24px] bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-black leading-tight text-[#111827]">AI 队友已准备好</h2>
          <p className="mt-1 text-[13px] font-bold text-[#7c8493]">AI teammates are ready.</p>
        </div>
        <Pill tone="dark">No waiting</Pill>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {aiCast.map((member) => (
          <div key={member.name} className="min-w-0 rounded-[18px] bg-[#f5f7fb] px-3 py-3 text-center">
            <div
              className="relative mx-auto h-[58px] w-[58px] overflow-hidden rounded-full border-[3px] bg-white shadow-[0_8px_16px_rgba(15,23,42,0.10)]"
              style={{ borderColor: member.color }}
            >
              <Image src={member.src} alt={`${member.name} avatar`} fill sizes="58px" className="object-cover" />
            </div>
            <p className="mt-2 truncate text-[13px] font-black leading-none text-[#111827]">{member.name}</p>
            <p className="mt-1 truncate text-[10px] font-bold text-[#7c8493]">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReassuranceCard() {
  return (
    <section className="mx-4 mt-4 rounded-[24px] border border-[#e9edf3] bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
      <div className="flex items-start gap-3">
        <ReadyDot color="#28c269" />
        <div className="min-w-0 flex-1">
          <h2 className="text-[18px] font-black leading-tight text-[#111827]">
            不用背台词，进入后直接照着说。
          </h2>
          <p className="mt-2 text-[14px] font-bold leading-relaxed text-[#5f6878]">
            No memorizing — your line will be ready.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function RoomPage() {
  return (
    <main className="min-h-screen bg-[#edf5fb] px-3 py-4 text-[#111827]">
      <div className="mx-auto w-full max-w-[550px] overflow-hidden bg-[#f8f9fb] pb-7 shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
        <header className="px-4 pt-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] font-black text-[#ff5e58]">English Roleplay Party</p>
            <Pill tone="dark">Green Room</Pill>
          </div>

          <section className="mt-4 rounded-[26px] bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-[36px] font-black leading-[1.02] text-[#111827]">演员休息室</h1>
                <p className="mt-1 text-[17px] font-black text-[#5f6878]">Green Room</p>
              </div>
              <div className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full bg-[#fff4ef] shadow-[0_12px_24px_rgba(255,94,88,0.16)]">
                <MicMark className="h-11 w-11" />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill tone="green">演员已到齐</Pill>
              <Pill tone="yellow">Cast ready</Pill>
            </div>
            <p className="mt-4 text-[16px] font-black leading-snug text-[#111827]">
              确认角色和队友，然后直接开演。
            </p>
          </section>
        </header>

        <HeroStage />
        <YourRoleCard />
        <AICastCard />
        <ReassuranceCard />

        <section className="mx-4 mt-5">
          <Link
            href="/play/cafe-chaos"
            className="flex h-[60px] w-full items-center justify-center gap-3 rounded-full bg-[#ff5e58] px-5 text-center text-[17px] font-black text-white shadow-[0_14px_26px_rgba(255,94,88,0.24)] transition active:scale-95"
          >
            <MicMark className="h-8 w-8 bg-white/20" />
            <span>
              准备好了，开始演出
              <span className="ml-2 text-white/82">Start the scene</span>
            </span>
          </Link>

          <Link
            href="/lobby"
            className="mx-auto mt-4 block w-fit rounded-full px-4 py-2 text-center text-[13px] font-black text-[#7c8493] transition active:scale-95"
          >
            返回故事大厅 Back to Story Lobby
          </Link>
        </section>
      </div>
    </main>
  );
}
