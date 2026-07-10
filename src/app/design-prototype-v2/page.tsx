import type { ReactNode } from "react";

const oneLiner =
  "\u7528\u82f1\u8bed\u6f14\u6545\u4e8b\uff0c\u8fb9\u73a9\u8fb9\u7ec3\u53e3\u8bed\u3002";

const actors = [
  {
    name: "Lily",
    role: "You",
    tone: "Curious Friend",
    color: "from-[#ff7d72] via-[#ffc15e] to-[#ffef9d]",
    ring: "ring-[#ff6f61]",
    initials: "LI",
  },
  {
    name: "Ethan",
    role: "Detective",
    tone: "Calm Clue Finder",
    color: "from-[#62c8ff] via-[#9be0ff] to-[#f8fbff]",
    ring: "ring-[#55bde9]",
    initials: "ET",
  },
  {
    name: "Mia",
    role: "Host",
    tone: "Warm Leader",
    color: "from-[#b98cff] via-[#ff9ed8] to-[#fff0fa]",
    ring: "ring-[#a985ff]",
    initials: "MI",
  },
  {
    name: "Jason",
    role: "Comic",
    tone: "Fast Reactor",
    color: "from-[#ffd75f] via-[#8fe3ad] to-[#eafff1]",
    ring: "ring-[#7ccc8f]",
    initials: "JA",
  },
  {
    name: "Narrator",
    role: "AI",
    tone: "Scene Guide",
    color: "from-[#f3f5fb] via-[#dce6ff] to-[#ffffff]",
    ring: "ring-[#c4cce0]",
    initials: "AI",
  },
];

const storyCards = [
  {
    title: "The Missing Birthday Cake",
    subtitle: "Cafe mystery with party chaos",
    level: "A2-B1",
    players: "4 players",
    status: "Hot room",
    accent: "bg-[#ff6f61]",
    locked: false,
  },
  {
    title: "Airport Gate 17",
    subtitle: "Find the lost passport before boarding",
    level: "B1",
    players: "3 players",
    status: "New",
    accent: "bg-[#33b9ee]",
    locked: false,
  },
  {
    title: "Midnight Studio",
    subtitle: "A music-video rescue scene",
    level: "B1-B2",
    players: "5 players",
    status: "Coming soon",
    accent: "bg-[#9b7cff]",
    locked: true,
  },
];

const expressionCards = [
  {
    title: "Surprised New Friend",
    line: "Wait, where did the cake go?",
    rarity: "Rare",
    color: "from-[#ffe9a8] via-[#ffb1a8] to-[#ffffff]",
  },
  {
    title: "Smooth Apology",
    line: "Sorry, I did not mean to interrupt.",
    rarity: "Common",
    color: "from-[#dff6ff] via-[#bfeeff] to-[#ffffff]",
  },
  {
    title: "Tiny Victory",
    line: "We did it. That was actually fun.",
    rarity: "Epic",
    color: "from-[#dff8d9] via-[#f6ee90] to-[#ffffff]",
  },
];

const voiceStates = [
  { label: "Mic idle", detail: "Ready", color: "border-[#dde4ef] bg-white" },
  {
    label: "Recording",
    detail: "Live",
    color: "border-[#ff6f61] bg-[#fff1ef] text-[#c73d34]",
  },
  {
    label: "Processing",
    detail: "Transcribe",
    color: "border-[#ffd86d] bg-[#fff9dc] text-[#936a05]",
  },
  {
    label: "Too short",
    detail: "Try again",
    color: "border-[#ffd1cc] bg-[#fff7f5] text-[#c73d34]",
  },
  {
    label: "Permission",
    detail: "Denied",
    color: "border-[#e0e5ee] bg-[#f7f9fc] text-[#6d7480]",
  },
  {
    label: "AI stand-in",
    detail: "Active",
    color: "border-[#8bdba4] bg-[#edfff2] text-[#2f8d4e]",
  },
];

const scoreRows = [
  { label: "Role energy", value: 94, color: "bg-[#ff6f61]" },
  { label: "Pronunciation", value: 88, color: "bg-[#33b9ee]" },
  { label: "Natural English", value: 91, color: "bg-[#9b7cff]" },
  { label: "Team timing", value: 96, color: "bg-[#54c978]" },
];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function PrototypePageHeader() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-10 pt-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="mb-3 inline-flex rounded-full border border-[#ffd9d1] bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#ff6f61] shadow-sm">
          Product Design option 3
        </div>
        <h1 className="text-3xl font-black tracking-normal text-[#172033] md:text-5xl">
          English Roleplay Party
        </h1>
        <p className="mt-3 text-base font-semibold text-[#5f6878] md:text-lg">
          {oneLiner}
        </p>
      </div>
      <p className="rounded-full border border-[#dfe7f3] bg-white px-4 py-2 text-sm font-bold text-[#6a7383] shadow-sm">
        Prototype only &mdash; not production UI.
      </p>
    </section>
  );
}

function PhonePreview({
  title,
  children,
  featured = false,
}: {
  title: string;
  children: ReactNode;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex flex-col items-center gap-3",
        featured && "lg:col-span-2",
      )}
    >
      <div className="text-sm font-black uppercase tracking-[0.13em] text-[#6d7480]">
        {title}
      </div>
      <div className="relative h-[844px] w-[390px] overflow-hidden rounded-[38px] border-[10px] border-[#141b28] bg-[#fbfcff] shadow-[0_30px_80px_rgba(31,41,64,0.24)]">
        <div className="absolute left-1/2 top-0 z-20 h-6 w-36 -translate-x-1/2 rounded-b-3xl bg-[#141b28]" />
        {children}
      </div>
    </article>
  );
}

function AppScreen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden bg-[#f8fbff] px-4 pb-4 pt-8 text-[#172033]",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-20 top-12 h-52 w-52 rounded-full bg-[#fff0a6] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-72 h-48 w-48 rounded-full bg-[#bfeeff] opacity-70 blur-3xl" />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}

function TopBar({
  title,
  subtitle,
  rightLabel = "Menu",
}: {
  title: string;
  subtitle?: string;
  rightLabel?: string;
}) {
  return (
    <header className="flex shrink-0 items-center gap-3">
      <button className="grid h-10 w-10 place-items-center rounded-full border border-[#e5edf7] bg-white text-lg font-black text-[#253048] shadow-sm">
        &lt;
      </button>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-lg font-black tracking-normal text-[#172033]">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-xs font-bold text-[#7c8493]">{subtitle}</p>
        ) : null}
      </div>
      <button className="rounded-full border border-[#e5edf7] bg-white px-3 py-2 text-xs font-black text-[#5f6878] shadow-sm">
        {rightLabel}
      </button>
    </header>
  );
}

function AvatarPortrait({
  actor,
  size = "md",
  active = false,
}: {
  actor: (typeof actors)[number];
  size?: "sm" | "md" | "lg";
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-black text-[#172033] shadow-inner",
        actor.color,
        actor.ring,
        active && "ring-4",
        size === "sm" && "h-10 w-10 text-xs",
        size === "md" && "h-14 w-14 text-sm",
        size === "lg" && "h-20 w-20 text-xl",
      )}
    >
      {actor.initials}
    </div>
  );
}

function AvatarStrip() {
  return (
    <div className="mt-3 flex shrink-0 gap-2 overflow-hidden rounded-[24px] border border-[#e6edf8] bg-white p-1.5 shadow-[0_12px_30px_rgba(40,55,90,0.08)]">
      {actors.map((actor, index) => (
        <div
          key={actor.name}
          className={cn(
            "flex w-[66px] shrink-0 flex-col items-center rounded-[18px] px-1 py-1.5",
            index === 0 && "bg-[#fff1ef] ring-2 ring-[#ff6f61]",
          )}
        >
          <AvatarPortrait actor={actor} size="sm" active={index === 0} />
          <div className="mt-1 w-full truncate text-center text-[11px] font-black">
            {index === 0 ? "YOU" : actor.name}
          </div>
          <div className="text-[9px] font-bold text-[#8b93a0]">
            {actor.role}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-black",
        className,
      )}
    >
      {children}
    </span>
  );
}

function ProgressDots({ active = 2 }: { active?: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 6 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "h-2 rounded-full",
            index <= active ? "w-9 bg-[#ff6f61]" : "w-5 bg-[#dfe7f3]",
          )}
        />
      ))}
    </div>
  );
}

function StageScene() {
  return (
    <section className="relative mt-3 h-[174px] shrink-0 overflow-hidden rounded-[28px] border border-[#ffe1b8] bg-[#fff4cf] shadow-[0_18px_38px_rgba(255,143,90,0.17)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,#ffffff_0_9%,transparent_10%),radial-gradient(circle_at_82%_16%,#ffb1a8_0_8%,transparent_9%),radial-gradient(circle_at_70%_34%,#8bdfff_0_8%,transparent_9%),linear-gradient(180deg,#fff8da_0%,#ffe6c7_55%,#fff9ed_100%)]" />
      <div className="absolute left-5 top-10 h-20 w-14 rounded-full bg-[#ff7d72] opacity-75" />
      <div className="absolute right-8 top-8 h-24 w-16 rounded-full bg-[#7ed8ff] opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 h-20 rounded-t-[42px] bg-white/58 backdrop-blur-sm" />
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <div className="relative">
          <div className="absolute -left-9 top-10 h-10 w-10 rounded-full bg-[#ffc15e]" />
          <div className="absolute -right-9 top-9 h-10 w-10 rounded-full bg-[#73d58b]" />
          <AvatarPortrait actor={actors[0]} size="lg" active />
        </div>
        <div className="mt-1 rounded-2xl bg-white/90 px-3 py-1.5 text-center shadow-sm">
          <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#ff6f61]">
            Your Role
          </div>
          <div className="text-sm font-black">Lily, Curious Friend</div>
        </div>
      </div>
      <div className="absolute right-4 top-4 max-w-[132px] rounded-2xl bg-white px-3 py-2 text-[10px] font-bold leading-snug text-[#5f6878] shadow-sm">
        Speak clearly in a natural conversation tone.
      </div>
    </section>
  );
}

function Waveform({ active = false }: { active?: boolean }) {
  return (
    <div className="flex h-8 items-center justify-center gap-1.5">
      {Array.from({ length: 24 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "w-1 rounded-full",
            active ? "bg-[#ff6f61]" : "bg-[#e1e8f2]",
          )}
          style={{
            height: `${10 + ((index * 7) % 24)}px`,
            opacity: active ? 0.55 + ((index % 4) * 0.12) : 1,
          }}
        />
      ))}
    </div>
  );
}

function MicButton({ state = "idle" }: { state?: "idle" | "recording" }) {
  return (
    <button
      className={cn(
        "relative grid h-20 w-20 place-items-center rounded-full text-white shadow-[0_18px_40px_rgba(255,111,97,0.34)]",
        state === "recording"
          ? "bg-[#ff6f61] ring-8 ring-[#ffb6ae]/45"
          : "bg-[#ff7d72]",
      )}
    >
      <span className="absolute h-[38px] w-[24px] rounded-full border-[5px] border-white" />
      <span className="absolute top-[45px] h-5 w-[5px] rounded-full bg-white" />
      <span className="absolute top-[60px] h-[5px] w-9 rounded-full bg-white" />
      <span className="sr-only">Tap microphone to speak</span>
    </button>
  );
}

function PlayScreen() {
  return (
    <AppScreen>
      <TopBar
        title="The Missing Birthday Cake"
        subtitle="Scene 2 of 6"
        rightLabel="Audio"
      />
      <div className="mt-3 flex items-center justify-between">
        <ProgressDots />
        <StatusPill className="bg-[#fff4cf] text-[#8a6400]">Team x4</StatusPill>
      </div>
      <AvatarStrip />
      <StageScene />
      <section className="mt-3 shrink-0 rounded-[26px] border border-[#e5edf7] bg-white p-3 shadow-[0_18px_42px_rgba(31,41,64,0.10)]">
        <div className="mb-2 flex items-center justify-between">
          <StatusPill className="bg-[#fff1ef] text-[#ff6f61]">
            Your Line
          </StatusPill>
          <span className="text-[11px] font-black text-[#8b93a0]">
            Lily speaks now
          </span>
        </div>
        <p className="text-[21px] font-black leading-tight text-[#172033]">
          Wait, where did the cake go? I was watching it!
        </p>
        <p className="mt-1.5 text-xs font-bold text-[#6c7482]">
          Tap the mic and say the line above.
        </p>
        <Waveform active />
      </section>
      <section className="mt-2 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-3">
        <button className="rounded-[18px] border border-[#e5edf7] bg-white px-3 py-2.5 text-[11px] font-black text-[#627086] shadow-sm">
          Listen Again
        </button>
        <div className="flex flex-col items-center gap-1">
          <MicButton state="recording" />
          <span className="text-xs font-black text-[#ff6f61]">
            Recording...
          </span>
        </div>
        <button className="rounded-[18px] border border-[#e5edf7] bg-white px-3 py-2.5 text-[11px] font-black text-[#627086] shadow-sm">
          Hints
        </button>
      </section>
      <section className="mt-2 grid shrink-0 grid-cols-6 gap-1">
        {voiceStates.map((state) => (
          <div
            key={state.label}
            className={cn(
              "rounded-[14px] border px-1 py-1.5 text-center shadow-sm",
              state.color,
            )}
          >
            <div className="mx-auto mb-1 h-3 w-3 rounded-full border-[3px] border-current opacity-60" />
            <div className="truncate text-[8px] font-black">
              {state.label}
            </div>
            <div className="truncate text-[8px] font-bold opacity-70">
              {state.detail}
            </div>
          </div>
        ))}
      </section>
      <section className="mt-2 flex min-h-0 shrink-0 items-center gap-3 rounded-[22px] border-2 border-[#8bdba4] bg-[#f1fff5] p-2.5 shadow-[0_12px_24px_rgba(72,176,101,0.12)]">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-gradient-to-br from-[#ffe79b] to-[#ff8f87] text-sm font-black">
          LI
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-black uppercase tracking-[0.12em] text-[#2f8d4e]">
            Earned expression card
          </div>
          <div className="truncate text-sm font-black">
            Surprised New Friend
          </div>
        </div>
        <button className="rounded-full bg-[#54c978] px-3 py-2 text-[11px] font-black text-white">
          View
        </button>
      </section>
    </AppScreen>
  );
}

function OnboardingScreen() {
  return (
    <AppScreen className="bg-[#fffaf3]">
      <div className="flex h-full flex-col">
        <div className="mt-4 flex items-center justify-between">
          <StatusPill className="bg-white text-[#ff6f61]">Role party</StatusPill>
          <StatusPill className="bg-[#e9f8ff] text-[#178fbf]">
            Voice first
          </StatusPill>
        </div>
        <section className="mt-12">
          <h2 className="text-4xl font-black leading-[0.96] tracking-normal">
            English Roleplay Party
          </h2>
          <p className="mt-4 text-lg font-bold leading-snug text-[#596477]">
            {oneLiner}
          </p>
        </section>
        <section className="relative mt-8 h-[270px] overflow-hidden rounded-[34px] border border-[#ffe1b8] bg-[#fff0c9] p-5 shadow-[0_22px_50px_rgba(255,143,90,0.17)]">
          <div className="absolute right-5 top-5 rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#ff6f61] shadow-sm">
            Create your role
          </div>
          <div className="absolute left-8 top-20">
            <AvatarPortrait actor={actors[0]} size="lg" active />
          </div>
          <div className="absolute right-8 top-28">
            <AvatarPortrait actor={actors[2]} size="lg" />
          </div>
          <div className="absolute bottom-7 left-6 right-6 rounded-[26px] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.12em] text-[#8b93a0]">
                  Start as
                </div>
                <div className="text-xl font-black">Lily</div>
              </div>
              <StatusPill className="bg-[#fff1ef] text-[#ff6f61]">
                Curious Friend
              </StatusPill>
            </div>
          </div>
        </section>
        <section className="mt-5 grid grid-cols-3 gap-2">
          {["Natural", "Bright", "Team"].map((label) => (
            <div
              key={label}
              className="rounded-[22px] border border-[#e5edf7] bg-white p-3 text-center shadow-sm"
            >
              <div className="text-xl font-black text-[#ff6f61]">0{label.length}</div>
              <div className="text-[11px] font-black text-[#6c7482]">
                {label}
              </div>
            </div>
          ))}
        </section>
        <div className="mt-auto">
          <button className="h-14 w-full rounded-[24px] bg-[#ff6f61] text-base font-black text-white shadow-[0_18px_34px_rgba(255,111,97,0.30)]">
            Enter story hall
          </button>
          <p className="mt-3 text-center text-xs font-bold text-[#7c8493]">
            Prototype only &mdash; not production UI.
          </p>
        </div>
      </div>
    </AppScreen>
  );
}

function LobbyScreen() {
  return (
    <AppScreen>
      <TopBar title="Story Hall" subtitle="Pick a voice drama room" />
      <section className="mt-5 rounded-[30px] bg-[#172033] p-5 text-white shadow-[0_20px_44px_rgba(23,32,51,0.24)]">
        <div className="text-xs font-black uppercase tracking-[0.14em] text-[#ffdf75]">
          Tonight&apos;s party queue
        </div>
        <h2 className="mt-2 text-3xl font-black leading-none">
          Warm-up in 5 minutes
        </h2>
        <p className="mt-3 text-sm font-semibold text-white/76">
          Join a short scene, speak one line at a time, unlock expression cards.
        </p>
        <div className="mt-4 flex gap-2">
          <StatusPill className="bg-white text-[#172033]">A2-B1</StatusPill>
          <StatusPill className="bg-[#54c978] text-white">
            Mic check ready
          </StatusPill>
        </div>
      </section>
      <section className="mt-5 flex items-center justify-between">
        <h3 className="text-xl font-black">Story copies</h3>
        <StatusPill className="bg-[#fff1ef] text-[#ff6f61]">3 open</StatusPill>
      </section>
      <section className="mt-3 flex flex-col gap-3">
        {storyCards.map((story) => (
          <div
            key={story.title}
            className={cn(
              "relative overflow-hidden rounded-[28px] border bg-white p-4 shadow-[0_16px_34px_rgba(31,41,64,0.09)]",
              story.locked ? "border-[#e6edf8] opacity-72" : "border-[#e5edf7]",
            )}
          >
            <div className={cn("absolute left-0 top-0 h-full w-2", story.accent)} />
            <div className="ml-2 flex items-start gap-3">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[22px] bg-[#f7f9fc]">
                {story.locked ? (
                  <div className="h-7 w-7 rounded-lg border-4 border-[#aeb7c6]" />
                ) : (
                  <AvatarPortrait actor={actors[story.title.length % 3]} size="md" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="truncate text-base font-black">
                    {story.title}
                  </h4>
                  <StatusPill
                    className={cn(
                      story.locked
                        ? "bg-[#f1f4f9] text-[#7c8493]"
                        : "bg-[#fff4cf] text-[#8a6400]",
                    )}
                  >
                    {story.status}
                  </StatusPill>
                </div>
                <p className="mt-1 text-xs font-bold leading-snug text-[#687386]">
                  {story.subtitle}
                </p>
                <div className="mt-3 flex gap-2 text-[11px] font-black text-[#778292]">
                  <span>{story.level}</span>
                  <span>{story.players}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <BottomTab active="Lobby" />
    </AppScreen>
  );
}

function RoomScreen() {
  return (
    <AppScreen>
      <TopBar title="Team Ready" subtitle="Birthday cake mystery" />
      <section className="mt-5 rounded-[32px] border border-[#ffe1b8] bg-[#fff4cf] p-5 shadow-[0_18px_38px_rgba(255,143,90,0.15)]">
        <div className="flex items-center justify-between">
          <div>
            <StatusPill className="bg-white text-[#ff6f61]">
              Room #2048
            </StatusPill>
            <h2 className="mt-3 text-3xl font-black leading-none">
              Ready for Scene 1
            </h2>
          </div>
          <div className="grid h-20 w-20 place-items-center rounded-[26px] bg-white text-center shadow-sm">
            <div>
              <div className="text-2xl font-black text-[#54c978]">4/4</div>
              <div className="text-[10px] font-black text-[#7c8493]">players</div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm font-bold text-[#6b6070]">
          A quick mic check, then the AI narrator opens the scene.
        </p>
      </section>
      <section className="mt-5 flex flex-col gap-3">
        {actors.slice(0, 4).map((actor, index) => (
          <div
            key={actor.name}
            className="flex items-center gap-3 rounded-[24px] border border-[#e5edf7] bg-white p-3 shadow-sm"
          >
            <AvatarPortrait actor={actor} size="md" active={index === 0} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-black">{actor.name}</h3>
                {index === 0 ? (
                  <StatusPill className="bg-[#fff1ef] text-[#ff6f61]">
                    You
                  </StatusPill>
                ) : null}
              </div>
              <p className="truncate text-xs font-bold text-[#7c8493]">
                {actor.tone}
              </p>
            </div>
            <StatusPill className="bg-[#edfff2] text-[#2f8d4e]">Ready</StatusPill>
          </div>
        ))}
      </section>
      <section className="mt-5 rounded-[26px] border border-[#e5edf7] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.12em] text-[#8b93a0]">
              AI narrator
            </div>
            <div className="text-lg font-black">Stand-in is available</div>
          </div>
          <StatusPill className="bg-[#edfff2] text-[#2f8d4e]">Active</StatusPill>
        </div>
      </section>
      <div className="mt-auto">
        <button className="h-14 w-full rounded-[24px] bg-[#172033] text-base font-black text-white shadow-[0_18px_34px_rgba(23,32,51,0.24)]">
          Start voice acting
        </button>
      </div>
    </AppScreen>
  );
}

function ResultScreen() {
  return (
    <AppScreen className="bg-[#fffaf3]">
      <TopBar title="Rating Card" subtitle="Scene complete" rightLabel="Share" />
      <section className="mt-6 rounded-[34px] border border-[#ffe1b8] bg-white p-5 text-center shadow-[0_22px_50px_rgba(255,143,90,0.16)]">
        <div
          className="mx-auto grid h-40 w-40 place-items-center rounded-full"
          style={{
            background:
              "conic-gradient(#ff6f61 0deg 334deg, #edf2f8 334deg 360deg)",
          }}
        >
          <div className="grid h-28 w-28 place-items-center rounded-full bg-white shadow-inner">
            <div>
              <div className="text-4xl font-black">93</div>
              <div className="text-xs font-black uppercase tracking-[0.12em] text-[#ff6f61]">
                Party score
              </div>
            </div>
          </div>
        </div>
        <h2 className="mt-5 text-2xl font-black">Scene-stealer energy</h2>
        <p className="mt-2 text-sm font-bold text-[#6b7280]">
          Clear emotion, strong timing, and a natural reaction line.
        </p>
      </section>
      <section className="mt-4 flex flex-col gap-3">
        {scoreRows.map((row) => (
          <div key={row.label} className="rounded-[22px] bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-xs font-black">
              <span>{row.label}</span>
              <span className="text-[#6c7482]">{row.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#edf2f8]">
              <div
                className={cn("h-full rounded-full", row.color)}
                style={{ width: `${row.value}%` }}
              />
            </div>
          </div>
        ))}
      </section>
      <section className="mt-4 flex items-center gap-3 rounded-[28px] border-2 border-[#8bdba4] bg-[#f1fff5] p-4">
        <div className="grid h-16 w-16 place-items-center rounded-[22px] bg-gradient-to-br from-[#ffe79b] to-[#ff8f87] font-black">
          LI
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-black uppercase tracking-[0.12em] text-[#2f8d4e]">
            New reward
          </div>
          <div className="truncate text-lg font-black">
            Surprised New Friend
          </div>
        </div>
      </section>
    </AppScreen>
  );
}

function CardsScreen() {
  return (
    <AppScreen>
      <TopBar title="Expression Cards" subtitle="Collectible speaking moves" />
      <section className="mt-5 rounded-[30px] bg-[#172033] p-5 text-white shadow-[0_20px_44px_rgba(23,32,51,0.24)]">
        <div className="text-xs font-black uppercase tracking-[0.14em] text-[#8bdfff]">
          Closet level 03
        </div>
        <h2 className="mt-2 text-3xl font-black leading-none">
          18 cards unlocked
        </h2>
        <p className="mt-3 text-sm font-semibold text-white/74">
          Equip cards before a scene to sound more natural under pressure.
        </p>
      </section>
      <section className="mt-5 grid grid-cols-2 gap-3">
        {expressionCards.map((card, index) => (
          <div
            key={card.title}
            className={cn(
              "min-h-[190px] rounded-[28px] border bg-gradient-to-br p-3 shadow-[0_16px_34px_rgba(31,41,64,0.10)]",
              card.color,
              index === 0 ? "border-[#54c978]" : "border-white",
            )}
          >
            <div className="flex items-center justify-between">
              <StatusPill
                className={cn(
                  index === 0
                    ? "bg-[#edfff2] text-[#2f8d4e]"
                    : "bg-white/80 text-[#6c7482]",
                )}
              >
                {card.rarity}
              </StatusPill>
              <div className="h-8 w-8 rounded-full bg-white/72" />
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-black leading-tight">{card.title}</h3>
              <p className="mt-2 text-xs font-bold leading-snug text-[#596477]">
                {card.line}
              </p>
            </div>
            {index === 0 ? (
              <StatusPill className="mt-4 bg-[#54c978] text-white">
                Equipped
              </StatusPill>
            ) : null}
          </div>
        ))}
        <div className="min-h-[190px] rounded-[28px] border border-dashed border-[#cfd8e6] bg-white/60 p-3 text-center shadow-sm">
          <div className="mx-auto mt-8 h-14 w-14 rounded-[18px] border-4 border-[#cfd8e6]" />
          <h3 className="mt-4 text-lg font-black text-[#6c7482]">
            Future card
          </h3>
          <p className="mt-2 text-xs font-bold text-[#8b93a0]">
            Unlock by completing the next scenario.
          </p>
        </div>
      </section>
      <BottomTab active="Cards" />
    </AppScreen>
  );
}

function ShareScreen() {
  return (
    <AppScreen className="bg-[#f8fbff]">
      <TopBar title="Share Handoff" subtitle="Send your roleplay moment" />
      <section className="mt-8 rounded-[36px] border border-[#e5edf7] bg-white p-5 text-center shadow-[0_24px_56px_rgba(31,41,64,0.14)]">
        <div className="mx-auto flex w-fit -space-x-3">
          {actors.slice(0, 4).map((actor, index) => (
            <div key={actor.name} className="rounded-full bg-white p-1">
              <AvatarPortrait actor={actor} size="md" active={index === 0} />
            </div>
          ))}
        </div>
        <h2 className="mt-6 text-3xl font-black leading-none">
          Birthday Cake Mystery
        </h2>
        <p className="mt-3 text-sm font-bold text-[#687386]">
          Lily scored 93 with a clear, surprised line delivery.
        </p>
        <div className="mt-6 rounded-[28px] bg-[#fff4cf] p-4">
          <div className="text-xs font-black uppercase tracking-[0.12em] text-[#ff6f61]">
            Share line
          </div>
          <p className="mt-2 text-xl font-black leading-tight">
            &ldquo;Wait, where did the cake go?&rdquo;
          </p>
        </div>
      </section>
      <section className="mt-5 grid grid-cols-2 gap-3">
        <button className="h-14 rounded-[22px] bg-[#ff6f61] text-sm font-black text-white shadow-[0_18px_34px_rgba(255,111,97,0.28)]">
          Share card
        </button>
        <button className="h-14 rounded-[22px] border border-[#e5edf7] bg-white text-sm font-black text-[#172033] shadow-sm">
          Save image
        </button>
      </section>
      <section className="mt-5 rounded-[28px] border border-[#e5edf7] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.12em] text-[#8b93a0]">
              Invite next
            </div>
            <div className="text-lg font-black">Airport Gate 17</div>
          </div>
          <StatusPill className="bg-[#e9f8ff] text-[#178fbf]">B1</StatusPill>
        </div>
      </section>
    </AppScreen>
  );
}

function BottomTab({ active }: { active: string }) {
  const items = ["Lobby", "Play", "Cards"];

  return (
    <nav className="mt-auto flex shrink-0 items-center justify-between rounded-[24px] border border-[#e5edf7] bg-white p-2 shadow-[0_14px_30px_rgba(31,41,64,0.10)]">
      {items.map((item) => (
        <button
          key={item}
          className={cn(
            "flex-1 rounded-[18px] px-3 py-2 text-xs font-black",
            active === item
              ? "bg-[#172033] text-white"
              : "text-[#7c8493]",
          )}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}

export default function DesignPrototypeV2Page() {
  return (
    <main className="min-h-screen bg-[#eef6ff] text-[#172033]">
      <PrototypePageHeader />
      <section className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-10 px-5 pb-16 lg:grid-cols-2 xl:grid-cols-3">
        <PhonePreview title="01 / Onboarding">
          <OnboardingScreen />
        </PhonePreview>
        <PhonePreview title="02 / Lobby">
          <LobbyScreen />
        </PhonePreview>
        <PhonePreview title="03 / Room">
          <RoomScreen />
        </PhonePreview>
        <PhonePreview title="04 / Play Voice Acting" featured>
          <PlayScreen />
        </PhonePreview>
        <PhonePreview title="05 / Result">
          <ResultScreen />
        </PhonePreview>
        <PhonePreview title="06 / Expression Cards">
          <CardsScreen />
        </PhonePreview>
        <PhonePreview title="07 / Share Handoff">
          <ShareScreen />
        </PhonePreview>
      </section>
    </main>
  );
}
