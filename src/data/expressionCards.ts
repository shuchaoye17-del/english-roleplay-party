export type ExpressionCard = {
  id: string;
  expression: string;
  meaning: string;
  type: string;
  scene: string;
  emotion: string;
  example: string;
  rarity: 'common' | 'rare' | 'epic';
};

export const expressionCards: ExpressionCard[] = [
  {
    id: 'no-worries',
    expression: 'No worries.',
    meaning: '没关系 / 不用担心',
    type: '缓和气氛卡',
    scene: '别人道歉时',
    emotion: '友好、放松、安慰',
    example: 'No worries. It happens.',
    rarity: 'common'
  },
  {
    id: 'could-you-check-it',
    expression: 'Could you check it?',
    meaning: '你能确认一下吗？',
    type: '礼貌确认卡',
    scene: '订单、信息、任务确认',
    emotion: '礼貌、冷静',
    example: 'Could you check it for me?',
    rarity: 'rare'
  },
  {
    id: 'not-what-i-ordered',
    expression: "I think this isn't what I ordered.",
    meaning: '我觉得这不是我点的。',
    type: '礼貌表达问题卡',
    scene: '咖啡店、餐厅、服务场景',
    emotion: '礼貌但有点不满',
    example: "Sorry, I think this isn't what I ordered.",
    rarity: 'epic'
  }
];
