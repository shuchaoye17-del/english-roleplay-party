import Link from 'next/link';
import type { ReactNode } from 'react';

type BoxProps = { children: ReactNode; className?: string };

type ButtonProps = BoxProps & {
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function PhoneShell({ children, className = '' }: BoxProps) {
  return <main className={`mx-auto min-h-screen w-full max-w-md bg-[#fffaf5] px-4 py-5 ${className}`}>{children}</main>;
}

export function Card({ children, className = '' }: BoxProps) {
  return <section className={`rounded-3xl border border-slate-100 bg-white p-5 shadow-sm ${className}`}>{children}</section>;
}

export function Badge({ children, className = '' }: BoxProps) {
  return <span className={`inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ${className}`}>{children}</span>;
}

export function Button({ children, href, onClick, disabled = false, className = '' }: ButtonProps) {
  const styles = `inline-flex w-full items-center justify-center rounded-full bg-coral px-5 py-3 text-center text-sm font-extrabold text-white shadow-sm transition active:scale-95 ${disabled ? 'opacity-50' : ''} ${className}`;
  if (href) return <Link className={styles} href={href}>{children}</Link>;
  return <button type="button" disabled={disabled} onClick={onClick} className={styles}>{children}</button>;
}

export function AvatarBubble({ emoji, name, className = '' }: { emoji: string; name?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-2xl shadow-sm ring-2 ring-white">{emoji}</div>
      {name ? <span className="text-sm font-bold text-slate-800">{name}</span> : null}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 rounded-full bg-slate-100">
      <div className="h-3 rounded-full bg-fresh" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-3 left-1/2 z-20 grid w-[92%] max-w-sm -translate-x-1/2 grid-cols-4 rounded-full border border-slate-100 bg-white/95 p-2 text-center text-xs font-bold text-slate-500 shadow-lg backdrop-blur">
      <Link href="/lobby">大厅</Link>
      <Link href="/room/cafe-chaos">组队</Link>
      <Link href="/play/cafe-chaos">演绎</Link>
      <Link href="/cards">我的</Link>
    </nav>
  );
}
