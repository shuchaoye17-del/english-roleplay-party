export type Avatar = {
  id: string;
  name: string;
  emoji: string;
  style: string;
  color: string;
};

export const avatars: Avatar[] = [
  { id: 'mia', name: 'Mia', emoji: '🎤', style: '活力派', color: 'bg-coral' },
  { id: 'leo', name: 'Leo', emoji: '🎧', style: '冷静派', color: 'bg-sky' },
  { id: 'luna', name: 'Luna', emoji: '✨', style: '社交派', color: 'bg-partyPurple' },
  { id: 'max', name: 'Max', emoji: '😎', style: '搞笑派', color: 'bg-sunshine' },
  { id: 'nina', name: 'Nina', emoji: '🌸', style: '温柔派', color: 'bg-pink-300' },
  { id: 'jay', name: 'Jay', emoji: '🚀', style: '冒险派', color: 'bg-fresh' }
];

export const personalityTags = ['慢热', '外向', '幽默', '冷静', '温柔', '直接', '爱冒险', '容易紧张'];
export const englishModes = ['轻松玩玩', '想练口语', '想挑战表达'];
