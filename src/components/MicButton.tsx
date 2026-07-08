'use client';

export function MicButton({ onClick, label = '按住说台词', state = 'waiting' }: { onClick?: () => void; label?: string; state?: string }) {
  const isRecording = state === 'recording';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full text-center font-extrabold text-white shadow-xl transition active:scale-95 ${
        isRecording ? 'animate-pulse bg-red-400' : 'bg-coral'
      }`}
    >
      <span className="text-3xl">🎙️</span>
      <span className="mt-1 px-3 text-xs">{label}</span>
    </button>
  );
}
