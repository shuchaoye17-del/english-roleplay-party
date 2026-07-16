import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type CastMember = {
  name: string;
  role: string;
  src: string;
  color: string;
};

type LockedScene = {
  title: string;
  englishTitle: string;
  note: string;
  status: string;
  accent: string;
};

const castMembers: CastMember[] = [
  {
    name: 'Lily',
    role: 'Your role',
    src: '/play-implementation-preview/avatar-lily.webp',
    color: '#ff5e58'
  },
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
  }
];

const sceneFacts = ['3 分钟', '语音角色扮演', 'AI 队友'];

const lockedScenes: LockedScene[] = [
  {
    title: '机场登机口 17',
    englishTitle: 'Airport Gate 17',
    note: '登机广播响起，你需要帮队友补上一句关键解释。',
    status: 'Soon',
    accent: '#3f8cff'
  },
  {
    title: '午夜舞台',
    englishTitle: 'Midnight Stage',
    note: '双人小剧场正在排练中，后续开放。',
    status: 'Locked',
    accent: '#8e63ff'
  }
];

function Pill({
  children,
  tone = 'light',
  className = ''
}: {
  children: ReactNode;
  tone?: 'light' | 'dark' | 'yellow' | 'green';
  className?: string;
}) {
  const toneClass = {
    light: 'bg-white text-[#5f6878] shadow-sm',
    dark: 'bg-[#111827] text-white',
    yellow: 'bg-[#fff4d9] text-[#8a5f16]',
    green: 'bg-[#e9fff1] text-[#18a655]'
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

function CastStack() {
  return (
    <div className="flex items-center">
      {castMembers.map((member, index) => (
        <div
          key={member.name}
          className={index === 0 ? '' : '-ml-3'}
          style={{ zIndex: castMembers.length - index }}
        >
          <div
            className="relative h-[58px] w-[58px] overflow-hidden rounded-full border-[4px] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.14)]"
            style={{ borderColor: member.color }}
          >
            <Image src={member.src} alt={member.name} fill sizes="58px" className="object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CastList() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {castMembers.map((member) => (
        <div key={member.name} className="min-w-0 rounded-[18px] bg-[#f5f7fb] px-3 py-3 text-center">
          <div
            className="mx-auto mb-2 h-2 w-8 rounded-full"
            style={{ backgroundColor: member.color }}
          />
          <p className="truncate text-[13px] font-black leading-none text-[#111827]">{member.name}</p>
          <p className="mt-1 truncate text-[10px] font-bold text-[#7c8493]">{member.role}</p>
        </div>
      ))}
    </div>
  );
}

function FeaturedScene() {
  return (
    <section className="mx-4 mt-4 overflow-hidden rounded-[28px] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.12)]">
      <div className="relative h-[260px]">
        <Image
          src="/play-implementation-preview/stage.webp"
          alt="Birthday cafe roleplay scene"
          fill
          sizes="(max-width: 550px) 100vw, 550px"
          priority
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/70 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Pill tone="green">Ready now</Pill>
          <Pill tone="yellow">Party scene</Pill>
        </div>
        <div className="absolute right-4 top-4 grid h-[52px] w-[52px] place-items-center rounded-full bg-white/95 shadow-[0_8px_18px_rgba(15,23,42,0.14)]">
          <MicMark className="h-9 w-9" />
        </div>
        <div className="absolute right-4 top-[98px] max-w-[134px] rounded-[16px] bg-white/95 px-3 py-2 shadow-[0_8px_18px_rgba(15,23,42,0.12)] backdrop-blur-sm">
          <p className="text-[11px] font-black text-[#ff5e58]">First line ready</p>
          <p className="mt-1 text-[11px] font-bold leading-tight text-[#263143]">
            Say one English line.
          </p>
        </div>
        <div className="absolute bottom-4 left-4">
          <CastStack />
        </div>
      </div>

      <div className="px-5 pb-5 pt-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[12px] font-black text-[#ff5e58]">Tonight&apos;s playable story</p>
            <h2 className="mt-1 text-[30px] font-black leading-[1.04] text-[#111827]">
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
          {sceneFacts.map((fact) => (
            <Pill key={fact}>{fact}</Pill>
          ))}
        </div>

        <div className="mt-4 rounded-[22px] border border-[#e9edf3] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[14px] font-black text-[#111827]">Stage pass ready</p>
              <p className="mt-1 text-[12px] font-bold text-[#7c8493]">
                拿到角色后，说出第一句英文台词。
              </p>
            </div>
            <Pill tone="dark">Voice first</Pill>
          </div>
          <CastList />
        </div>

        <Link
          href="/play/cafe-chaos"
          className="mt-5 flex h-[60px] w-full items-center justify-center gap-3 rounded-full bg-[#ff5e58] px-5 text-center text-[17px] font-black text-white shadow-[0_14px_26px_rgba(255,94,88,0.24)] transition active:scale-95"
        >
          <MicMark className="h-8 w-8 bg-white/20" />
          <span>
            开始演出
            <span className="ml-2 text-white/82">Start the scene</span>
          </span>
        </Link>
        <p className="mt-3 text-center text-[12px] font-bold text-[#7c8493]">
          进入后先看到英文台词，再点麦克风开演。
        </p>
      </div>
    </section>
  );
}

function LockedSceneCard({ scene }: { scene: LockedScene }) {
  return (
    <article className="rounded-[22px] border border-[#e9edf3] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.07)]">
      <div className="flex items-start gap-3">
        <div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] text-white"
          style={{ backgroundColor: scene.accent }}
        >
          <span className="h-5 w-4 rounded-b-[4px] border-[3px] border-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-[17px] font-black leading-tight text-[#111827]">
                {scene.title}
              </h3>
              <p className="mt-1 truncate text-[13px] font-black text-[#6c7482]">
                {scene.englishTitle}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[#f1f4f8] px-3 py-1 text-[11px] font-black text-[#7c8493]">
              {scene.status}
            </span>
          </div>
          <p className="mt-3 text-[13px] font-bold leading-relaxed text-[#6c7482]">{scene.note}</p>
        </div>
      </div>
    </article>
  );
}

export default function LobbyPage() {
  return (
    <main className="min-h-screen bg-[#edf5fb] px-3 py-4 text-[#111827]">
      <div className="mx-auto w-full max-w-[550px] overflow-hidden bg-[#f8f9fb] pb-7 shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
        <header className="px-4 pt-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] font-black text-[#ff5e58]">English Roleplay Party</p>
            <Pill tone="dark">Story Lobby</Pill>
          </div>

          <div className="mt-4 rounded-[26px] bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-[36px] font-black leading-[1.02] text-[#111827]">故事大厅</h1>
                <p className="mt-1 text-[17px] font-black text-[#5f6878]">Story Lobby</p>
              </div>
              <div className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full bg-[#fff4ef] shadow-[0_12px_24px_rgba(255,94,88,0.16)]">
                <MicMark className="h-11 w-11" />
              </div>
            </div>
            <p className="mt-4 text-[17px] font-black leading-snug text-[#111827]">
              选一场故事，拿到角色，开口说一句。
            </p>
            <p className="mt-2 text-[14px] font-bold leading-relaxed text-[#6c7482]">
              Pick a story, meet your character, and say one line.
            </p>
          </div>
        </header>

        <FeaturedScene />

        <section className="mx-4 mt-5">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[21px] font-black leading-tight text-[#111827]">Coming up</h2>
              <p className="mt-1 text-[13px] font-bold text-[#7c8493]">
                Future stories stay quiet until they are ready.
              </p>
            </div>
            <Pill>2 scenes</Pill>
          </div>

          <div className="grid gap-3">
            {lockedScenes.map((scene) => (
              <LockedSceneCard key={scene.title} scene={scene} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
