"use client";

import Image from "next/image";

export type PlayImplementationPlayer = {
  name: string;
  role?: string;
  badge?: string;
  src: string;
  active?: boolean;
  status?: "online" | "npc" | "offline";
  wave?: string;
};

export type PlayImplementationVoiceState = {
  title: string;
  note: string;
  color: string;
  dot: string;
  active?: boolean;
};

export type PlayImplementationReward = {
  imageSrc: string;
  eyebrow: string;
  title: string;
  badge: string;
  description: string;
  actionLabel: string;
};

export type PlayImplementationScreenProps = {
  title?: string;
  sceneLabel?: string;
  progressSegments?: number;
  activeProgressSegments?: number;
  players?: PlayImplementationPlayer[];
  stageSrc?: string;
  stageAlt?: string;
  directorTipTitle?: string;
  directorTipText?: string;
  lineLabel?: string;
  lineText?: string;
  roleHint?: string;
  instructionText?: string;
  micLabel?: string;
  isRecording?: boolean;
  listenLabel?: string;
  hintsLabel?: string;
  hintsCount?: number;
  voiceStates?: PlayImplementationVoiceState[];
  voiceStateMode?: "all" | "current";
  reward?: PlayImplementationReward;
  navItems?: { label: string; tone?: "default" | "danger"; hasNotification?: boolean }[];
  bottomNavTone?: "full" | "quiet";
  onBack?: () => void;
  onAudio?: () => void;
  onMenu?: () => void;
  onListenAgain?: () => void;
  onMicClick?: () => void;
  onHints?: () => void;
  onViewReward?: () => void;
};

const defaultPlayers: PlayImplementationPlayer[] = [
  {
    name: "Lily",
    role: "You",
    badge: "YOU",
    src: "/play-implementation-preview/avatar-lily.webp",
    active: true,
    status: "online",
    wave: "bg-[#3f8cff]",
  },
  {
    name: "Ethan",
    role: "",
    src: "/play-implementation-preview/avatar-ethan.webp",
    status: "online",
    wave: "bg-[#3f8cff]",
  },
  {
    name: "Mia",
    role: "",
    src: "/play-implementation-preview/avatar-mia.webp",
    status: "online",
    wave: "bg-[#7d5cff]",
  },
  {
    name: "Jason",
    role: "",
    src: "/play-implementation-preview/avatar-jason.webp",
    status: "online",
    wave: "bg-[#3f8cff]",
  },
  {
    name: "Narrator",
    role: "AI",
    badge: "NPC",
    src: "/play-implementation-preview/avatar-narrator.webp",
    status: "npc",
    wave: "bg-[#b7c0d0]",
  },
];

const defaultVoiceStates: PlayImplementationVoiceState[] = [
  {
    title: "Idle",
    note: "Tap to speak",
    color: "border-[#e0e5ee] bg-white text-[#7c8493]",
    dot: "bg-[#8b94a3]",
  },
  {
    title: "Recording",
    note: "0:03",
    color: "border-[#ff5e58] bg-white text-[#111827]",
    dot: "bg-[#ff5e58]",
    active: true,
  },
  {
    title: "Processing",
    note: "Transcribing...",
    color: "border-[#e0e5ee] bg-white text-[#111827]",
    dot: "bg-[#3f8cff]",
  },
  {
    title: "Too short",
    note: "Please speak a bit longer",
    color: "border-[#e0e5ee] bg-white text-[#111827]",
    dot: "bg-[#f08a24]",
  },
  {
    title: "Permission denied",
    note: "Mic access is blocked",
    color: "border-[#e0e5ee] bg-white text-[#111827]",
    dot: "bg-[#8e63ff]",
  },
  {
    title: "AI Stand-in Active",
    note: "AI continues the scene",
    color: "border-[#e0e5ee] bg-white text-[#111827]",
    dot: "bg-[#3f8cff]",
  },
];

const defaultReward: PlayImplementationReward = {
  imageSrc: "/play-implementation-preview/reward-thumb.webp",
  eyebrow: "Expression Card Earned!",
  title: "Surprised",
  badge: "New",
  description: "You expressed emotion naturally!",
  actionLabel: "View Card",
};

const defaultNavItems = [
  { label: "Scene Info" },
  { label: "Chat", hasNotification: true },
  { label: "Leave Room", tone: "danger" as const },
];

function WaveBars({ color = "bg-[#3f8cff]", compact = false }) {
  const bars = compact ? [4, 7, 11, 15, 10, 6] : [8, 14, 24, 34, 42, 32, 20, 12];

  return (
    <div className="flex items-end justify-center gap-[2px]">
      {bars.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={`${color} w-[3px] rounded-full`}
          style={{ height }}
        />
      ))}
    </div>
  );
}

function TopBar({
  title,
  sceneLabel,
  progressSegments,
  activeProgressSegments,
  onBack,
  onAudio,
  onMenu,
}: {
  title: string;
  sceneLabel: string;
  progressSegments: number;
  activeProgressSegments: number;
  onBack?: () => void;
  onAudio?: () => void;
  onMenu?: () => void;
}) {
  return (
    <header className="flex h-[52px] items-center gap-3 px-3">
      <button
        type="button"
        onClick={onBack}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-2xl font-black text-[#111827] shadow-[0_5px_14px_rgba(15,23,42,0.16)]"
      >
        &lt;
      </button>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[18px] font-black leading-none text-[#111827]">
          {title}
        </div>
          <div className="mt-1 flex items-center gap-2 min-[520px]:gap-3">
          <span className="text-[13px] font-semibold text-[#6c7482]">
            {sceneLabel}
          </span>
          <div className="flex gap-[5px]">
            {Array.from({ length: progressSegments }).map((_, item) => (
              <span
                key={item}
                className={`h-[5px] w-[24px] rounded-full min-[520px]:w-[38px] ${
                  item < activeProgressSegments ? "bg-[#ff4d5f]" : "bg-[#e0e5ee]"
                }`}
              />
            ))}
          </div>
          <span className="h-3 w-3 rounded-full bg-[#ffc53d]" />
        </div>
      </div>
      <button
        type="button"
        onClick={onAudio}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-[0_4px_12px_rgba(15,23,42,0.14)]"
      >
        <span className="h-5 w-5 rounded-[6px] border-l-[12px] border-y-[7px] border-l-[#111827] border-y-transparent" />
      </button>
      <button
        type="button"
        onClick={onMenu}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-[0_4px_12px_rgba(15,23,42,0.14)]"
      >
        <span className="text-xl font-black leading-none text-[#111827]">...</span>
      </button>
    </header>
  );
}

function PlayerStrip({ players }: { players: PlayImplementationPlayer[] }) {
  return (
    <section className="mx-3 flex h-[158px] items-center justify-start gap-4 overflow-x-auto rounded-[18px] bg-white px-4 shadow-[0_7px_24px_rgba(15,23,42,0.13)] [scrollbar-width:none] min-[520px]:justify-between min-[520px]:px-5 [&::-webkit-scrollbar]:hidden">
      {players.map((player) => (
        <div key={player.name} className="relative flex w-[78px] shrink-0 flex-col items-center min-[520px]:w-[80px]">
          {player.badge ? (
            <span
              className={`absolute -top-4 z-20 rounded-md px-2 py-0.5 text-[11px] font-black text-white ${
                player.active ? "bg-[#ff4d5f]" : "bg-[#7757ff]"
              }`}
            >
              {player.badge}
            </span>
          ) : null}
          {player.status === "online" ? (
            <span className="absolute right-2 top-1 z-20 h-3 w-3 rounded-full border-2 border-white bg-[#23c36b]" />
          ) : null}
          <div
            className={`grid h-[70px] w-[70px] place-items-center overflow-hidden rounded-full bg-white ${
              player.active
                ? "ring-[3px] ring-[#ff4d5f]"
                : "ring-[3px] ring-[#e0e5ee]"
            }`}
          >
            <Image
              src={player.src}
              alt={`${player.name} avatar`}
              width={75}
              height={75}
              className="h-full w-full object-cover"
            />
          </div>
          {player.active ? (
            <div className="mt-1 w-[72px] rounded-lg bg-[#ff4d5f] py-2 text-center text-white shadow-sm">
              <div className="text-[15px] font-black leading-none">Lily</div>
              <div className="mt-1 text-[12px] font-semibold leading-none">You</div>
            </div>
          ) : (
            <>
              <div className="mt-3 text-[13px] font-black leading-none text-[#111827]">
                {player.name}
              </div>
              <div className="mt-1 min-h-[13px] text-[12px] font-semibold leading-none text-[#6c7482]">
                {player.role}
              </div>
              <div className="mt-2">
                <WaveBars color={player.wave} compact />
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
}

function Stage({
  src,
  alt,
  directorTipTitle,
  directorTipText,
}: {
  src: string;
  alt: string;
  directorTipTitle?: string;
  directorTipText?: string;
}) {
  return (
    <section className="relative mt-0 h-[235px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={550}
        height={235}
        priority
        className="h-full w-full object-cover"
      />
      {directorTipText ? (
        <div className="absolute right-11 top-[88px] max-w-[116px] rounded-[14px] bg-white/92 px-3 py-2 shadow-[0_8px_20px_rgba(15,23,42,0.12)] backdrop-blur-sm">
          <div className="mb-1 inline-flex rounded-full bg-[#ffd65d] px-2 py-0.5 text-[10px] font-black text-[#6b4d16]">
            {directorTipTitle ?? "Director Tip"}
          </div>
          <p className="text-[11px] font-bold leading-tight text-[#263143]">
            {directorTipText}
          </p>
        </div>
      ) : null}
    </section>
  );
}

function LineCard({
  lineLabel,
  lineText,
  roleHint,
  instructionText,
}: {
  lineLabel: string;
  lineText: string;
  roleHint?: string;
  instructionText: string;
}) {
  return (
    <section className="relative -mt-px mx-3 h-[260px] rounded-[24px] bg-white px-7 pt-5 shadow-[0_8px_24px_rgba(15,23,42,0.14)] min-[520px]:h-[232px]">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-[#fff4d9] px-3 py-1 text-[14px] font-black text-[#1f2937]">
          {lineLabel}
        </span>
        <span className="h-[5px] w-14 rounded-full bg-[#ffd158]" />
      </div>
      <p className="mt-5 max-w-[430px] text-[28px] font-black leading-[1.12] tracking-normal text-[#111827] min-[520px]:text-[33px] min-[520px]:leading-[1.14]">
        {lineText}
      </p>
      {roleHint ? (
        <p className="relative z-10 mt-3 max-w-[300px] rounded-full bg-[#fff4d9] px-3 py-1.5 text-[12px] font-bold leading-tight text-[#8a4b2c] min-[520px]:max-w-[400px] min-[520px]:text-[13px]">
          {roleHint}
        </p>
      ) : null}
      {roleHint ? (
        <div className="relative z-10 mt-2 inline-block rounded-full bg-[#fff2d7] px-3 py-2 text-[12px] font-bold text-[#6b4d16]">
          {instructionText}
        </div>
      ) : (
        <>
          <div className="mt-4 h-px w-[300px] border-t border-dotted border-[#ffced1]" />
          <div className="absolute bottom-8 left-7 rounded-full bg-[#fff2d7] px-3 py-2 text-[12px] font-bold text-[#6b4d16]">
            {instructionText}
          </div>
        </>
      )}
      <div className="absolute bottom-6 right-0 flex h-[118px] w-[130px] items-center justify-center gap-2 opacity-50">
        {[12, 26, 44, 70, 96, 118].map((height, index) => (
          <span
            key={`${height}-${index}`}
            className="w-[10px] rounded-full bg-[#ffc9c9]"
            style={{ height }}
          />
        ))}
      </div>
    </section>
  );
}

function MicDock({
  micLabel,
  listenLabel,
  hintsLabel,
  hintsCount,
  isRecording,
  onListenAgain,
  onMicClick,
  onHints,
}: {
  micLabel: string;
  listenLabel: string;
  hintsLabel: string;
  hintsCount: number;
  isRecording: boolean;
  onListenAgain?: () => void;
  onMicClick?: () => void;
  onHints?: () => void;
}) {
  return (
    <section className="relative h-[155px]">
      <button
        type="button"
        onClick={onListenAgain}
        className="absolute left-[40px] top-[22px] flex flex-col items-center gap-3 min-[520px]:left-[68px]"
      >
        <span className="grid h-[62px] w-[62px] place-items-center rounded-full border border-[#e0e5ee] bg-white shadow-sm">
          <span className="h-7 w-7 rounded-full border-[4px] border-[#8b94a3]" />
        </span>
        <span className="text-[14px] font-semibold text-[#7c8493]">{listenLabel}</span>
      </button>
      <button
        type="button"
        onClick={onMicClick}
        className="absolute left-1/2 top-[-18px] flex -translate-x-1/2 flex-col items-center"
      >
        <span className="grid h-[132px] w-[132px] place-items-center rounded-full bg-[#fff2ef] ring-[8px] ring-[#fff7f5]">
          <span
            className={`relative grid h-[106px] w-[106px] place-items-center rounded-full shadow-[0_12px_28px_rgba(255,86,79,0.33)] ring-[4px] ring-white ${
              isRecording ? "bg-[#ff564f]" : "bg-[#ff706a]"
            }`}
          >
            <span className="absolute h-[56px] w-[34px] rounded-full border-[7px] border-white" />
            <span className="absolute top-[64px] h-7 w-[7px] rounded-full bg-white" />
            <span className="absolute top-[86px] h-[7px] w-14 rounded-full bg-white" />
          </span>
        </span>
        <span className="mt-1 text-[17px] font-semibold text-[#ff4d5f]">
          {micLabel}
        </span>
      </button>
      <button
        type="button"
        onClick={onHints}
        className="absolute right-[40px] top-[22px] flex flex-col items-center gap-3 min-[520px]:right-[79px]"
      >
        <span className="relative grid h-[62px] w-[62px] place-items-center rounded-full border border-[#e0e5ee] bg-white shadow-sm">
          <span className="h-8 w-8 rounded-full bg-[#ffd65d]" />
          {hintsCount > 0 ? (
            <span className="absolute -right-2 top-0 grid h-5 w-5 place-items-center rounded-full bg-[#7c5cff] text-[11px] font-black text-white">
              {hintsCount}
            </span>
          ) : null}
        </span>
        <span className="max-w-[86px] text-center text-[14px] font-semibold leading-tight text-[#7c8493]">{hintsLabel}</span>
      </button>
    </section>
  );
}

function VoiceStateCard({
  title,
  note,
  color,
  dot,
}: {
  title: string;
  note: string;
  color: string;
  dot: string;
}) {
  return (
    <div
      className={`flex h-[118px] flex-col items-center rounded-lg border px-2 pt-3 text-center shadow-[0_3px_10px_rgba(15,23,42,0.08)] ${color}`}
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f3f6fb]">
        <span className={`h-8 w-8 rounded-full ${dot}`} />
      </span>
      <div className="mt-3 text-[11px] font-black leading-tight">{title}</div>
      <div className="mt-1 text-[10px] font-semibold leading-tight text-[#6c7482]">
        {note}
      </div>
    </div>
  );
}

function VoiceStates({ voiceStates }: { voiceStates: PlayImplementationVoiceState[] }) {
  return (
    <section className="mx-3">
      <div className="mb-3 flex items-center justify-center gap-3 text-[14px] font-bold text-[#7c8493]">
        <span className="h-px w-5 bg-[#98a2b3]" />
        Voice States
        <span className="h-px w-5 bg-[#98a2b3]" />
      </div>
      <div className="grid grid-cols-6 gap-3">
        {voiceStates.map((state) => (
          <VoiceStateCard key={state.title} {...state} />
        ))}
      </div>
    </section>
  );
}

function CurrentVoiceState({ voiceStates }: { voiceStates: PlayImplementationVoiceState[] }) {
  const currentState = voiceStates.find((state) => state.active) ?? voiceStates[0];

  return (
    <section className="mx-3">
      <div className="mb-3 flex items-center justify-center gap-3 text-[14px] font-bold text-[#7c8493]">
        <span className="h-px w-5 bg-[#98a2b3]" />
        Voice Status
        <span className="h-px w-5 bg-[#98a2b3]" />
      </div>
      <div className={`flex h-[82px] items-center gap-4 rounded-[18px] border px-5 shadow-[0_5px_16px_rgba(15,23,42,0.09)] ${currentState.color}`}>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f3f6fb]">
          <span className={`h-8 w-8 rounded-full ${currentState.dot}`} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[16px] font-black leading-tight">{currentState.title}</div>
          <div className="mt-1 text-[13px] font-bold leading-tight text-[#5f6878]">
            {currentState.note}
          </div>
        </div>
      </div>
    </section>
  );
}

function RewardCard({
  reward,
  onViewReward,
}: {
  reward: PlayImplementationReward;
  onViewReward?: () => void;
}) {
  return (
    <section className="mx-3 mt-5 flex h-[113px] items-center rounded-[14px] border-2 border-[#28c269] bg-white px-3 shadow-sm">
      <div className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-lg min-[520px]:h-[92px] min-[520px]:w-[99px]">
        <Image
          src={reward.imageSrc}
          alt="Surprised expression card"
          width={99}
          height={92}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="ml-3 min-w-0 flex-1 overflow-hidden min-[520px]:ml-4">
        <div className="truncate text-[14px] font-black text-[#18a655] min-[520px]:text-[16px]">
          {reward.eyebrow}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="truncate text-[20px] font-black leading-none text-[#111827] min-[520px]:text-[22px]">
            {reward.title}
          </span>
          <span className="rounded-full bg-[#28c269] px-2 py-0.5 text-[11px] font-black text-white">
            {reward.badge}
          </span>
        </div>
        <div className="mt-2 truncate text-[12px] font-semibold text-[#3f4654]">
          {reward.description}
        </div>
      </div>
      <button
        type="button"
        onClick={onViewReward}
        className="ml-2 h-[52px] shrink-0 rounded-full bg-[#36c765] px-4 py-3 text-[14px] font-black text-white shadow-[0_8px_16px_rgba(54,199,101,0.22)] min-[520px]:px-5"
      >
        {reward.actionLabel}
      </button>
    </section>
  );
}

function BottomNav({
  navItems,
  tone,
}: {
  navItems: { label: string; tone?: "default" | "danger"; hasNotification?: boolean }[];
  tone: "full" | "quiet";
}) {
  return (
    <nav
      className={`absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-[#e9edf3] bg-white text-[13px] font-semibold text-[#111827] ${
        tone === "quiet" ? "h-[42px] bg-white/82 text-[12px] text-[#98a2b3]" : "h-[47px]"
      }`}
    >
      {navItems.map((item) => (
        <button
          key={item.label}
          type="button"
          className={`relative ${item.tone === "danger" && tone === "full" ? "text-[#ff4d5f]" : ""}`}
        >
          {item.label}
          {item.hasNotification ? (
            <span className="absolute -right-4 -top-2 h-2 w-2 rounded-full bg-[#ff4d5f]" />
          ) : null}
        </button>
      ))}
    </nav>
  );
}

export function PlayImplementationScreen({
  title = "The Missing Birthday Cake",
  sceneLabel = "Scene 2/6",
  progressSegments = 4,
  activeProgressSegments = 4,
  players = defaultPlayers,
  stageSrc = "/play-implementation-preview/stage.webp",
  stageAlt = "Birthday cafe stage with Lily character",
  directorTipTitle,
  directorTipText,
  lineLabel = "Your Line",
  lineText = "Wait, where did the cake go? I was watching it!",
  roleHint,
  instructionText = "It's your turn! Tap the mic and say the line above.",
  micLabel = "Tap to speak",
  isRecording = true,
  listenLabel = "Listen Again",
  hintsLabel = "Hints",
  hintsCount = 2,
  voiceStates = defaultVoiceStates,
  voiceStateMode = "all",
  reward = defaultReward,
  navItems = defaultNavItems,
  bottomNavTone = "full",
  onBack,
  onAudio,
  onMenu,
  onListenAgain,
  onMicClick,
  onHints,
  onViewReward,
}: PlayImplementationScreenProps) {
  return (
    <main className="flex min-h-screen justify-center bg-[#f2f5f9]">
      <h1 className="sr-only">
        English Roleplay Party Play implementation preview. Prototype only - not
        production UI.
      </h1>
      <div className="relative min-h-[1176px] w-full max-w-[550px] overflow-hidden bg-[#f8f9fb] text-[#111827] shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        <TopBar
          title={title}
          sceneLabel={sceneLabel}
          progressSegments={progressSegments}
          activeProgressSegments={activeProgressSegments}
          onBack={onBack}
          onAudio={onAudio}
          onMenu={onMenu}
        />
        <PlayerStrip players={players} />
        <Stage
          src={stageSrc}
          alt={stageAlt}
          directorTipTitle={directorTipTitle}
          directorTipText={directorTipText}
        />
        <LineCard
          lineLabel={lineLabel}
          lineText={lineText}
          roleHint={roleHint}
          instructionText={instructionText}
        />
        <MicDock
          micLabel={micLabel}
          listenLabel={listenLabel}
          hintsLabel={hintsLabel}
          hintsCount={hintsCount}
          isRecording={isRecording}
          onListenAgain={onListenAgain}
          onMicClick={onMicClick}
          onHints={onHints}
        />
        {voiceStateMode === "current" ? (
          <CurrentVoiceState voiceStates={voiceStates} />
        ) : (
          <VoiceStates voiceStates={voiceStates} />
        )}
        <RewardCard reward={reward} onViewReward={onViewReward} />
        <BottomNav navItems={navItems} tone={bottomNavTone} />
      </div>
    </main>
  );
}
