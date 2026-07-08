export type ScenarioRole = {
  name: string;
  emotion: string;
  hiddenMission: string;
};

export type Scenario = {
  id: string;
  title: string;
  location: string;
  mode: 'solo' | 'duo' | 'trio';
  players: string;
  duration: string;
  difficulty: string;
  moodTags: string[];
  reward: string;
  conflict: string;
  teamGoal: string;
  roles: ScenarioRole[];
  color: string;
};

export const scenarios: Scenario[] = [
  {
    id: 'cafe-chaos',
    title: '咖啡店混乱日',
    location: '明亮街角咖啡店',
    mode: 'solo',
    players: '1 人',
    duration: '3–5 分钟',
    difficulty: '新手',
    moodTags: ['礼貌', '小尴尬', '救场'],
    reward: '礼貌表达问题卡',
    conflict: '你点了冰拿铁，但店员端来热美式，后面还有人在排队。',
    teamGoal: '在不尴尬的情况下礼貌解决问题。',
    roles: [
      { name: '顾客', emotion: '有点不满，但保持礼貌', hiddenMission: '让店员重新确认订单' },
      { name: '店员', emotion: '紧张但专业', hiddenMission: '道歉并提供解决方案' },
      { name: '朋友', emotion: '轻松幽默', hiddenMission: '缓和气氛' }
    ],
    color: 'from-orange-200 to-pink-200'
  },
  {
    id: 'party-intro',
    title: '派对初次见面',
    location: '夏日屋顶派对',
    mode: 'duo',
    players: '2 人',
    duration: '3–5 分钟',
    difficulty: '轻松',
    moodTags: ['社交', '破冰', '轻松'],
    reward: '自然自我介绍卡',
    conflict: '你在派对上遇到陌生人，需要自然开启对话。',
    teamGoal: '完成一次不尴尬的英文破冰。',
    roles: [
      { name: '新朋友', emotion: '好奇但有点紧张', hiddenMission: '问出对方兴趣' },
      { name: '派对主人', emotion: '热情', hiddenMission: '让两个人聊起来' }
    ],
    color: 'from-yellow-200 to-sky-200'
  },
  {
    id: 'campus-club',
    title: '校园社团招新',
    location: '校园活动广场',
    mode: 'trio',
    players: '3 人',
    duration: '5–7 分钟',
    difficulty: '普通',
    moodTags: ['校园', '面试', '自信'],
    reward: '表达兴趣卡',
    conflict: '你想加入社团，但学长学姐会问你为什么适合。',
    teamGoal: '让社团成员愿意邀请你加入。',
    roles: [
      { name: '申请者', emotion: '紧张但期待', hiddenMission: '表达自己的兴趣' },
      { name: '社团负责人', emotion: '友好但认真', hiddenMission: '确认对方动机' },
      { name: '社团成员', emotion: '活泼', hiddenMission: '让气氛轻松' }
    ],
    color: 'from-green-200 to-sky-200'
  },
  {
    id: 'friend-cancel',
    title: '朋友临时爽约',
    location: '聊天窗口和地铁站',
    mode: 'duo',
    players: '2 人',
    duration: '3–5 分钟',
    difficulty: '普通',
    moodTags: ['失望', '道歉', '修复关系'],
    reward: '温和表达不满卡',
    conflict: '朋友临时取消计划，你有点失望但不想吵架。',
    teamGoal: '表达感受并重新约时间。',
    roles: [
      { name: '被爽约的人', emotion: '失望但克制', hiddenMission: '表达不开心但不攻击对方' },
      { name: '爽约的人', emotion: '抱歉又着急', hiddenMission: '道歉并提出补偿' }
    ],
    color: 'from-purple-200 to-pink-200'
  },
  {
    id: 'mystery-room',
    title: '神秘线索房间',
    location: '彩色侦探房间',
    mode: 'trio',
    players: '3 人',
    duration: '5–7 分钟',
    difficulty: '挑战',
    moodTags: ['悬疑', '合作', '推理'],
    reward: '提出猜测卡',
    conflict: '你们发现一张奇怪纸条，需要讨论线索。',
    teamGoal: '在 9 轮内找出最可能的线索方向。',
    roles: [
      { name: '观察者', emotion: '冷静', hiddenMission: '描述一个细节' },
      { name: '怀疑者', emotion: '谨慎', hiddenMission: '提出不同意见' },
      { name: '行动派', emotion: '兴奋', hiddenMission: '推动团队做决定' }
    ],
    color: 'from-violet-200 to-yellow-200'
  },
  {
    id: 'wrong-delivery',
    title: '外卖送错了',
    location: '公寓门口',
    mode: 'solo',
    players: '1 人',
    duration: '3–5 分钟',
    difficulty: '新手',
    moodTags: ['日常', '沟通', '解决问题'],
    reward: '说明问题卡',
    conflict: '你收到的外卖不是自己的订单。',
    teamGoal: '联系骑手并说明问题。',
    roles: [
      { name: '顾客', emotion: '困惑但礼貌', hiddenMission: '说明订单送错了' },
      { name: '骑手', emotion: '着急', hiddenMission: '确认地址和订单号' }
    ],
    color: 'from-lime-200 to-orange-200'
  }
];

export const getScenario = (id: string) => scenarios.find((scenario) => scenario.id === id) ?? scenarios[0];
