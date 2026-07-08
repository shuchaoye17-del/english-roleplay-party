import { getScenario } from './scenarios';

export type PlayerState = 'ready' | 'waiting' | 'ai_stand_in' | 'disconnected' | 'left';

export type RoomPlayer = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  emotion: string;
  hiddenMission: string;
  state: PlayerState;
  isHost?: boolean;
};

const cafe = getScenario('cafe-chaos');

export const mockRoomPlayers: RoomPlayer[] = [
  {
    id: 'you',
    name: 'Mia',
    avatar: '🎤',
    role: cafe.roles[0]?.name ?? '顾客',
    emotion: cafe.roles[0]?.emotion ?? '礼貌',
    hiddenMission: cafe.roles[0]?.hiddenMission ?? '推动剧情',
    state: 'ready',
    isHost: true
  },
  {
    id: 'leo',
    name: 'Leo',
    avatar: '🎧',
    role: cafe.roles[1]?.name ?? '店员',
    emotion: cafe.roles[1]?.emotion ?? '专业',
    hiddenMission: cafe.roles[1]?.hiddenMission ?? '接住对话',
    state: 'waiting'
  },
  {
    id: 'ai-friend',
    name: '剧场助演',
    avatar: '✨',
    role: cafe.roles[2]?.name ?? '朋友',
    emotion: cafe.roles[2]?.emotion ?? '缓和气氛',
    hiddenMission: cafe.roles[2]?.hiddenMission ?? '救场',
    state: 'ai_stand_in'
  }
];
