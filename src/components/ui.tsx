import Link from 'next/link';
import type { ReactNode } from 'react';

type BoxProps = { children: ReactNode; className?: string };

type ButtonProps = BoxProps & {
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function PhoneShell({ children, className = '' }: BoxProps) {
  return (
    <main className={`mx-auto min-h-screen w-full max-w-md overflow-hidden bg-[radial-gradient(circle_at_top_left,#ffe6f0,transparent_34%),radial-gradient(circle_at_top_right,#fff4a8,transparent_30%),linear-gradient(180deg,#fff7fb_0%,#f4fbff_52%,#fffaf5_100%)] px-4 py-5 ${className}`}>
      {children}
    </main>
  );
}

export function Card({ children, className = '' }: BoxProps) {
  return <section className={`rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur ${className}`}>{children}</section>;
}

export function Badge({ children, className = '' }: BoxProps) {
  return <span className={`inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700 shadow-sm ring-1 ring-black/5 ${className}`}>{children}</span>;
}

export function Sticker({ children, className = '' }: BoxProps) {
  return <span className={`inline-flex -rotate-2 items-center rounded-xl bg-sunshine px-3 py-1 text-xs font-black text-slate-900 shadow-[0_5px_0_rgba(15,23,42,0.12)] ring-1 ring-black/5 ${className}`}>{children}</span>;
}

export function Button({ children, href, onClick, disabled = false, className = '' }: ButtonProps) {
  const styles = `inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-coral to-partyPurple px-5 py-3 text-center text-sm font-black text-white shadow-[0_12px_24px_rgba(255,127,138,0.28)] transition active:scale-95 ${disabled ? 'opacity-50' : ''} ${className}`;
  if (href) return <Link className={styles} href={href}>{children}</Link>;
  return <button type="button" disabled={disabled} onClick={onClick} className={styles}>{children}</button>;
}

export function AvatarBubble({ emoji, name, className = '' }: { emoji: string; name?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-2xl shadow-md ring-4 ring-white/80">{emoji}</div>
      {name ? <span className="text-sm font-black text-slate-800">{name}</span> : null}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-white/70 shadow-inner ring-1 ring-black/5">
      <div className="h-3 rounded-full bg-gradient-to-r from-fresh via-sky to-partyPurple" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-3 left-1/2 z-20 grid w-[92%] max-w-sm -translate-x-1/2 grid-cols-4 rounded-full border border-white/70 bg-white/95 p-2 text-center text-xs font-black text-slate-500 shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur">
      <Link href="/lobby">大厅</Link>
      <Link href="/room/cafe-chaos">组队</Link>
      <Link href="/play/cafe-chaos">演绎</Link>
      <Link href="/cards">我的</Link>
    </nav>
  );
}
