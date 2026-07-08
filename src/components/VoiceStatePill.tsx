const copy: Record<string, string> = {
  waiting_turn: '等待登场',
  preparing: '轮到你登场啦',
  recording: '正在录音',
  transcribing: '正在识别',
  feedback: 'AI 反馈中',
  timeout_warning: '轮到你登场啦！',
  rescue_line_shown: '救场台词已出现',
  ai_stand_in: '剧场助演接替'
};

export function VoiceStatePill({ state }: { state: string }) {
  return (
    <span className="inline-flex rounded-full bg-coral/10 px-3 py-1 text-xs font-black text-coral">
      {copy[state] ?? state}
    </span>
  );
}
