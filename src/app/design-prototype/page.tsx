import type { CSSProperties, ReactNode } from 'react';

const screens = [
  'Onboarding',
  'Lobby',
  'Room',
  'Play',
  'Result',
  'Cards',
  'Share'
];

const cssVars = {
  '--party-coral': '#ff6b8a',
  '--party-coral-dark': '#d83f64',
  '--party-yellow': '#ffd45a',
  '--party-blue': '#48b8ff',
  '--party-purple': '#8067e8',
  '--party-green': '#31c98b',
  '--party-ink': '#172033',
  '--party-muted': '#718096',
  '--party-cream': '#fff8ec',
  '--party-paper': '#ffffff',
  '--party-line': '#e9edf4',
  '--party-shadow': '0 22px 55px rgba(23, 32, 51, 0.12)'
} as CSSProperties;

type Tone = 'coral' | 'yellow' | 'blue' | 'purple' | 'green' | 'slate';

const toneClasses: Record<Tone, string> = {
  coral: 'bg-[var(--party-coral)] text-white',
  yellow: 'bg-[var(--party-yellow)] text-[var(--party-ink)]',
  blue: 'bg-[var(--party-blue)] text-white',
  purple: 'bg-[var(--party-purple)] text-white',
  green: 'bg-[var(--party-green)] text-white',
  slate: 'bg-[#eef2f7] text-[var(--party-ink)]'
};

const stateItems = [
  {
    title: 'Mic idle',
    detail: 'Ready to act',
    tone: 'blue' as Tone,
    bars: [14, 20, 12, 18]
  },
  {
    title: 'Recording',
    detail: '00:12 captured',
    tone: 'coral' as Tone,
    bars: [28, 42, 36, 48]
  },
  {
    title: 'Processing',
    detail: 'Transcribing line',
    tone: 'purple' as Tone,
    bars: [18, 34, 26, 40]
  },
  {
    title: 'Permission denied',
    detail: 'Use AI stand-in',
    tone: 'yellow' as Tone,
    bars: [10, 10, 10, 10]
  },
  {
    title: 'Short recording',
    detail: 'Try one full sentence',
    tone: 'slate' as Tone,
    bars: [8, 12, 8, 10]
  },
  {
    title: 'AI stand-in active',
    detail: 'Story keeps moving',
    tone: 'green' as Tone,
    bars: [20, 26, 30, 22]
  }
];

const scenarioCards = [
  {
    title: 'Cafe Blackout',
    status: 'Open now',
    level: 'A2',
    line: 'Find the missing birthday cake before the lights return.',
    color: 'bg-[var(--party-coral)]'
  },
  {
    title: 'Airport Switch',
    status: '2 seats',
    level: 'B1',
    line: 'Convince your team to sprint to the new gate.',
    color: 'bg-[var(--party-blue)]'
  },
  {
    title: 'Neon Harbor',
    status: 'Locked',
    level: 'B2',
    line: 'Future scenario unlocks after three voice wins.',
    color: 'bg-slate-300'
  }
];

const expressionCards = [
  {
    title: 'Buy Time',
    phrase: 'Give me one second.',
    label: 'Starter',
    tone: 'blue' as Tone
  },
  {
    title: 'Turn The Scene',
    phrase: 'I have something to confess.',
    label: 'Rare',
    tone: 'purple' as Tone
  },
  {
    title: 'Team Rescue',
    phrase: 'We can still turn this around.',
    label: 'Party',
    tone: 'green' as Tone
  }
];

function Shell({ children }: { children: ReactNode }) {
  return (
    <main
      className="min-h-screen bg-[var(--party-cream)] px-4 py-8 text-[var(--party-ink)]"
      style={cssVars}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-[var(--party-line)] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--party-coral-dark)] shadow-sm">
              Prototype only &mdash; not production UI.
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              English Roleplay Party
            </h1>
            <p className="mt-3 max-w-2xl text-lg font-bold leading-8 text-[var(--party-muted)]">
              {'\u7528\u82f1\u8bed\u6f14\u6545\u4e8b\uff0c\u8fb9\u73a9\u8fb9\u7ec3\u53e3\u8bed\u3002'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {screens.map((screen) => (
              <span
                className="rounded-full bg-white px-3 py-2 text-xs font-black text-slate-600 shadow-sm ring-1 ring-[var(--party-line)]"
                key={screen}
              >
                {screen}
              </span>
            ))}
          </div>
        </header>
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">{children}</div>
      </div>
    </main>
  );
}

function PhoneFrame({
  title,
  eyebrow,
  children,
  featured = false
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
  featured?: boolean;
}) {
  return (
    <section className={featured ? 'xl:col-span-2' : ''}>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--party-muted)]">
            {eyebrow}
          </p>
          <h2 className="text-xl font-black text-[var(--party-ink)]">{title}</h2>
        </div>
        {featured ? <Pill tone="coral">Most important</Pill> : null}
      </div>
      <div
        className={`mx-auto overflow-hidden rounded-[34px] border border-white bg-white shadow-[var(--party-shadow)] ${
          featured ? 'max-w-[430px]' : 'max-w-[390px]'
        }`}
      >
        <div className="flex h-8 items-center justify-center bg-white">
          <div className="h-1.5 w-20 rounded-full bg-slate-200" />
        </div>
        <div className="min-h-[720px] bg-[#fbfcff]">{children}</div>
      </div>
    </section>
  );
}

function TopBar({ label, right }: { label: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--party-coral-dark)]">
          Roleplay Party
        </p>
        <p className="text-sm font-black text-[var(--party-ink)]">{label}</p>
      </div>
      {right ?? <Avatar initials="MI" tone="coral" />}
    </div>
  );
}

function Card({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[22px] border border-[var(--party-line)] bg-white p-4 shadow-[0_12px_28px_rgba(23,32,51,0.07)] ${className}`}
    >
      {children}
    </div>
  );
}

function Pill({ children, tone = 'slate' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-black ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

function Avatar({
  initials,
  tone = 'blue',
  large = false
}: {
  initials: string;
  tone?: Tone;
  large?: boolean;
}) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full border-[3px] border-white font-black shadow-md ${
        toneClasses[tone]
      } ${large ? 'h-16 w-16 text-lg' : 'h-11 w-11 text-sm'}`}
    >
      {initials}
    </div>
  );
}

function PrimaryButton({ children, tone = 'coral' }: { children: ReactNode; tone?: Tone }) {
  return (
    <button
      className={`flex h-13 w-full items-center justify-center rounded-full px-5 text-sm font-black shadow-[0_12px_22px_rgba(216,63,100,0.22)] active:scale-[0.98] ${toneClasses[tone]}`}
      type="button"
    >
      {children}
    </button>
  );
}

function WaveBars({ bars, tone = 'coral' }: { bars: number[]; tone?: Tone }) {
  return (
    <div className="flex h-12 items-center justify-center gap-1.5">
      {bars.map((height, index) => (
        <span
          className={`${toneClasses[tone].split(' ')[0]} w-1.5 rounded-full`}
          key={`${height}-${index}`}
          style={{ height }}
        />
      ))}
    </div>
  );
}

function ScoreDial({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="grid h-28 w-28 place-items-center rounded-full"
        style={{
          background: `conic-gradient(var(--party-green) ${
            value * 3.6
          }deg, #edf2f7 0deg)`
        }}
      >
        <div className="grid h-20 w-20 place-items-center rounded-full bg-white">
          <span className="text-3xl font-black text-[var(--party-ink)]">{value}</span>
        </div>
      </div>
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--party-muted)]">
        {label}
      </p>
    </div>
  );
}

function OnboardingScreen() {
  return (
    <div className="flex min-h-[720px] flex-col px-5 pb-5">
      <TopBar label="Create your role" right={<Pill tone="yellow">Voice first</Pill>} />
      <div className="relative overflow-hidden rounded-[28px] border border-white bg-[#fff3f6] p-5 shadow-[0_20px_45px_rgba(255,107,138,0.18)]">
        <div className="absolute right-5 top-5 h-16 w-16 rounded-full bg-[var(--party-yellow)]" />
        <div className="absolute right-16 top-14 h-8 w-8 rounded-full bg-[var(--party-blue)]" />
        <Pill tone="coral">3-minute story party</Pill>
        <h3 className="mt-5 text-4xl font-black leading-tight text-[var(--party-ink)]">
          {'\u7528\u82f1\u8bed\u6f14\u6545\u4e8b\uff0c\u8fb9\u73a9\u8fb9\u7ec3\u53e3\u8bed\u3002'}
        </h3>
        <p className="mt-4 text-sm font-bold leading-6 text-slate-600">
          Pick a character, enter a scene, speak the line, and let the story react.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        {[
          ['MI', 'Mira', 'Cafe detective', 'coral' as Tone],
          ['LE', 'Leo', 'Gate runner', 'blue' as Tone],
          ['NI', 'Nina', 'Festival host', 'yellow' as Tone]
        ].map(([initials, name, role, tone]) => (
          <Card className="flex items-center gap-3 p-3" key={name}>
            <Avatar initials={initials} tone={tone as Tone} />
            <div className="min-w-0 flex-1">
              <p className="font-black text-[var(--party-ink)]">{name}</p>
              <p className="text-xs font-bold text-[var(--party-muted)]">{role}</p>
            </div>
            <Pill tone={name === 'Mira' ? 'green' : 'slate'}>
              {name === 'Mira' ? 'Selected' : 'Pick'}
            </Pill>
          </Card>
        ))}
      </div>

      <div className="mt-auto">
        <PrimaryButton>Enter Story Hall</PrimaryButton>
      </div>
    </div>
  );
}

function LobbyScreen() {
  return (
    <div className="px-5 pb-5">
      <TopBar label="Story hall" right={<Pill tone="green">4 rooms live</Pill>} />
      <div className="mb-5 flex gap-2 overflow-hidden">
        {['Daily scenes', 'Party scenes', 'Team plays'].map((label, index) => (
          <Pill key={label} tone={index === 0 ? 'coral' : 'slate'}>
            {label}
          </Pill>
        ))}
      </div>
      <div className="grid gap-4">
        {scenarioCards.map((scenario) => (
          <Card
            className={scenario.status === 'Locked' ? 'relative overflow-hidden opacity-75' : ''}
            key={scenario.title}
          >
            <div className="flex gap-3">
              <div className={`h-16 w-16 shrink-0 rounded-[20px] ${scenario.color}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-black text-[var(--party-ink)]">
                      {scenario.title}
                    </h3>
                    <p className="mt-1 text-sm font-bold leading-5 text-slate-500">
                      {scenario.line}
                    </p>
                  </div>
                  <Pill tone={scenario.status === 'Locked' ? 'slate' : 'yellow'}>
                    {scenario.level}
                  </Pill>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Pill tone={scenario.status === 'Locked' ? 'slate' : 'green'}>
                    {scenario.status}
                  </Pill>
                  <span className="text-xs font-black text-[var(--party-muted)]">
                    Voice scene
                  </span>
                </div>
              </div>
            </div>
            {scenario.status === 'Locked' ? (
              <div className="mt-4 rounded-[18px] bg-slate-100 px-4 py-3 text-xs font-black text-slate-500">
                Locked future scenario: unlock after collecting 6 expression cards.
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}

function RoomScreen() {
  return (
    <div className="px-5 pb-5">
      <TopBar label="Team ready" right={<Pill tone="blue">2/4 ready</Pill>} />
      <Card className="bg-[#eef8ff]">
        <Pill tone="blue">Cafe Blackout</Pill>
        <h3 className="mt-4 text-2xl font-black leading-8 text-[var(--party-ink)]">
          Someone took the cake. Stay in character and ask for clues.
        </h3>
      </Card>
      <div className="mt-5 grid gap-3">
        {[
          ['MI', 'Mira', 'Cafe detective', 'Ready', 'coral' as Tone],
          ['LE', 'Leo', 'Birthday guest', 'Warming up', 'blue' as Tone],
          ['AI', 'Narrator', 'Other roles', 'Active', 'purple' as Tone],
          ['+', 'Open slot', 'Invite player', 'Waiting', 'slate' as Tone]
        ].map(([initials, name, role, status, tone]) => (
          <Card className="flex items-center gap-3 p-3" key={name}>
            <Avatar initials={initials} tone={tone as Tone} />
            <div className="min-w-0 flex-1">
              <p className="font-black text-[var(--party-ink)]">{name}</p>
              <p className="text-xs font-bold text-[var(--party-muted)]">{role}</p>
            </div>
            <Pill tone={status === 'Ready' || status === 'Active' ? 'green' : 'yellow'}>
              {status}
            </Pill>
          </Card>
        ))}
      </div>
      <Card className="mt-5 bg-[#fff8df]">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9a6b00]">
          Team prompt
        </p>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
          Speak clearly, respond to teammates, and keep the story moving.
        </p>
      </Card>
      <div className="mt-5">
        <PrimaryButton>Start Voice Scene</PrimaryButton>
      </div>
    </div>
  );
}

function MicCore() {
  return (
    <div className="relative mx-auto grid h-36 w-36 place-items-center">
      <div className="absolute inset-0 rounded-full bg-[var(--party-coral)]/15" />
      <div className="absolute inset-4 rounded-full bg-[var(--party-coral)]/20" />
      <button
        className="relative grid h-24 w-24 place-items-center rounded-full bg-[var(--party-coral)] text-white shadow-[0_18px_34px_rgba(216,63,100,0.32)]"
        type="button"
      >
        <span className="grid h-12 w-8 place-items-center rounded-full border-[5px] border-white">
          <span className="mt-8 h-4 w-8 rounded-b-full border-b-[5px] border-l-[5px] border-r-[5px] border-white" />
        </span>
      </button>
    </div>
  );
}

function PlayScreen() {
  return (
    <div className="px-5 pb-5">
      <TopBar label="Voice acting" right={<Pill tone="coral">Turn 2/5</Pill>} />

      <Card className="border-[var(--party-coral)] bg-[#fff5f7]">
        <div className="flex items-center justify-between">
          <Pill tone="coral">Say this line</Pill>
          <span className="text-xs font-black text-[var(--party-muted)]">Tap mic below</span>
        </div>
        <p className="mt-5 text-[30px] font-black leading-[1.12] tracking-tight text-[var(--party-ink)]">
          &ldquo;Wait, where did the cake go? I was watching it!&rdquo;
        </p>
        <p className="mt-4 rounded-[18px] bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-600">
          Role cue: sound surprised, then invite your teammate to check the counter.
        </p>
      </Card>

      <div className="mt-5 rounded-[28px] border border-[var(--party-line)] bg-white px-5 py-6 text-center shadow-[0_14px_32px_rgba(23,32,51,0.08)]">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--party-coral-dark)]">
          Main action
        </p>
        <MicCore />
        <p className="mt-1 text-lg font-black text-[var(--party-ink)]">Tap and speak the line</p>
        <p className="mt-1 text-xs font-bold text-[var(--party-muted)]">
          The microphone is idle. One tap starts recording.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {stateItems.map((item) => (
          <Card className="p-3" key={item.title}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-black text-[var(--party-ink)]">{item.title}</p>
                <p className="mt-0.5 text-[11px] font-bold text-[var(--party-muted)]">
                  {item.detail}
                </p>
              </div>
              <span className={`h-3 w-3 rounded-full ${toneClasses[item.tone].split(' ')[0]}`} />
            </div>
            <WaveBars bars={item.bars} tone={item.tone} />
          </Card>
        ))}
      </div>

      <Card className="mt-5 bg-[#eefcf6]">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-[16px] bg-[var(--party-green)] text-sm font-black text-white">
            NEW
          </div>
          <div>
            <p className="text-sm font-black text-[var(--party-ink)]">
              Earned expression card
            </p>
            <p className="text-lg font-black text-[var(--party-green)]">
              &ldquo;What do you think?&rdquo;
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ResultScreen() {
  const metrics = [
    ['Acting', 88, 'bg-[var(--party-coral)]'],
    ['Clarity', 82, 'bg-[var(--party-blue)]'],
    ['Teamwork', 91, 'bg-[var(--party-green)]']
  ] as const;

  return (
    <div className="px-5 pb-5">
      <TopBar label="Rating card" right={<Pill tone="green">Shareable</Pill>} />
      <Card className="grid place-items-center bg-[#f2fff9] py-7">
        <ScoreDial label="Scene score" value={89} />
        <h3 className="mt-4 text-2xl font-black text-[var(--party-ink)]">Scene Saver</h3>
        <p className="mt-2 max-w-[260px] text-center text-sm font-bold leading-6 text-slate-600">
          You kept the story moving and matched the surprise tone.
        </p>
      </Card>
      <div className="mt-5 grid gap-3">
        {metrics.map(([label, value, color]) => (
          <Card className="p-4" key={label}>
            <div className="flex items-center justify-between">
              <p className="font-black text-[var(--party-ink)]">{label}</p>
              <p className="font-black text-[var(--party-ink)]">{value}</p>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-5 bg-[#fff8df]">
        <Pill tone="yellow">Reward</Pill>
        <p className="mt-3 text-xl font-black text-[var(--party-ink)]">Cake Clue +24</p>
        <p className="mt-1 text-sm font-bold text-slate-600">
          Collectible, visual, and ready to share.
        </p>
      </Card>
    </div>
  );
}

function CardsScreen() {
  return (
    <div className="px-5 pb-5">
      <TopBar label="Expression cards" right={<Pill tone="purple">12 owned</Pill>} />
      <div className="grid gap-4">
        {expressionCards.map((card) => (
          <Card className="relative overflow-hidden" key={card.title}>
            <div className={`absolute right-4 top-4 h-16 w-16 rounded-full opacity-20 ${toneClasses[card.tone].split(' ')[0]}`} />
            <div className="relative">
              <Pill tone={card.tone}>{card.label}</Pill>
              <h3 className="mt-4 text-lg font-black text-[var(--party-ink)]">{card.title}</h3>
              <p className="mt-3 rounded-[18px] bg-[#f7f9fc] px-4 py-4 text-2xl font-black leading-8 text-[var(--party-ink)]">
                {card.phrase}
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--party-muted)]">
                Tap during a scene to sound natural
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ShareScreen() {
  return (
    <div className="flex min-h-[720px] flex-col px-5 pb-5">
      <TopBar label="Share handoff" right={<Pill tone="yellow">Review build</Pill>} />
      <Card className="bg-[#f6f2ff]">
        <Pill tone="purple">Invite owner</Pill>
        <h3 className="mt-4 text-3xl font-black leading-tight text-[var(--party-ink)]">
          Review the voice-first prototype in browser.
        </h3>
        <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
          This route is intentionally separate, so the production app can stay stable while the visual direction is reviewed.
        </p>
      </Card>
      <div className="mt-5 grid gap-3">
        {[
          'Check whether the Play screen tells users what to say.',
          'Confirm the mic states feel clear and trustworthy.',
          'Decide whether cards and rewards feel collectible enough.'
        ].map((item, index) => (
          <Card className="flex gap-3 p-4" key={item}>
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--party-ink)] text-xs font-black text-white">
              {index + 1}
            </div>
            <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
          </Card>
        ))}
      </div>
      <div className="mt-auto space-y-3">
        <PrimaryButton>Copy review link</PrimaryButton>
        <button
          className="flex h-12 w-full items-center justify-center rounded-full border border-[var(--party-line)] bg-white text-sm font-black text-[var(--party-ink)]"
          type="button"
        >
          Back to prototype screens
        </button>
      </div>
    </div>
  );
}

export default function DesignPrototypePage() {
  return (
    <Shell>
      <PhoneFrame eyebrow="01" title="Onboarding / landing">
        <OnboardingScreen />
      </PhoneFrame>
      <PhoneFrame eyebrow="02" title="Lobby / story hall">
        <LobbyScreen />
      </PhoneFrame>
      <PhoneFrame eyebrow="03" title="Room / team ready">
        <RoomScreen />
      </PhoneFrame>
      <PhoneFrame featured eyebrow="04" title="Play / voice acting">
        <PlayScreen />
      </PhoneFrame>
      <PhoneFrame eyebrow="05" title="Result / rating card">
        <ResultScreen />
      </PhoneFrame>
      <PhoneFrame eyebrow="06" title="Expression cards">
        <CardsScreen />
      </PhoneFrame>
      <PhoneFrame eyebrow="07" title="Share handoff page">
        <ShareScreen />
      </PhoneFrame>
    </Shell>
  );
}
