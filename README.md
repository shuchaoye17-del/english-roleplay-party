# English Roleplay Party

一个语音优先、手机端、明亮派对风的英语角色扮演社交游戏。

用户创建自己的英语角色，进入剧情副本，用语音说英文台词推动故事。系统根据入戏程度、情绪匹配、发音清晰、英文自然、剧情推进和团队配合给出游戏化评分、称号和表达卡奖励。

## 产品不是

- 传统英语学习软件
- 背单词工具
- 语法题库
- 打字聊天工具
- 多邻国复制品
- AI 文案 SaaS

## 产品是

- 英语角色派对
- 回合制语音剧情副本
- 单人也能玩的英文小剧场
- 好友/小队可玩的轻社交游戏
- 用角色、剧情、情绪和奖励包装的英语口语练习

## MVP 玩法

### 单人剧场

- 用户说 5 句英文
- AI 扮演旁白和其他角色
- 每局 3–5 分钟

### 好友剧场

- 2 人参与
- 每人说 3 句英文
- 共 6 个玩家回合

### 三人小队剧场

- 3 人参与
- 每人说 3 句英文
- 共 9 个玩家回合

## 语音规则

- 语音是主玩法
- 打字只能作为备用
- 每句建议 8–12 秒
- 每句最长 15 秒
- 多人采用回合制语音，不做实时连麦

## 掉线与超时

多人副本不能因为某个玩家超时、掉线或退出而中断。

- 10 秒未开始：提示“轮到你登场啦”
- 20 秒未开始：展示救场台词
- 30 秒仍无操作：AI 助演接替
- 掉线 60 秒未返回：AI 助演接管角色
- 只剩 1 个真人玩家：转为单人续演模式

## 后续技术路线

第一阶段：前端 MVP

- Next.js App Router
- TypeScript
- Tailwind CSS
- pnpm
- mock data
- localStorage

后续阶段：

- OpenAI speech-to-text
- OpenAI structured scoring API
- Supabase
- Vercel
- 好友邀请
- 多人状态同步
- 衣柜商城

## 项目规则

请先阅读：

- `AGENTS.md`
- `.agents/skills/`
- `docs/product-spec.md`
- `docs/voice-gameplay-rules.md`
- `docs/scoring-rubric.md`
- `docs/scenario-template.md`
- `docs/ui-style-guide.md`
- `docs/unlock-roadmap.md`
