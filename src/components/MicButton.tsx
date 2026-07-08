'use client';

export function MicButton({
  onClick,
  label = '按住说台词',
  state = 'waiting'
}: {
  onClick?: () => void;
  label?: string;
  state?: string;
}) {
  const isRecording = state === 'recording';
  const isBusy = state === 'permission_request' || state === 'transcribing';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isBusy}
      className={`mx-auto flex h-32 w-32 flex-col items-center justify-center rounded-full text-center font-extrabold text-white shadow-xl transition active:scale-95 disabled:opacity-70 ${
        isRecording ? 'animate-pulse bg-red-400 ring-8 ring-red-100' : 'bg-coral ring-8 ring-coral/15'
      }`}
    >
      <span className="text-4xl">{isRecording ? '🔴' : '🎙️'}</span>
      <span className="mt-2 px-3 text-xs">{label}</span>
    </button>
  );
}
