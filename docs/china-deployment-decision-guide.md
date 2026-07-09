# Mainland China deployment decision guide

This guide records the practical deployment choices for v0.1 after discovering that the current overseas preview link may not open reliably for mainland China testers.

Current preview links:

- Main app: `https://english-roleplay-party.vercel.app/onboarding`
- Share handoff page: `https://english-roleplay-party.vercel.app/share`

## Decision summary

Recommended order:

1. Keep the Vercel preview for non-mainland testers and product demos.
2. For mainland China testers, prepare a domestic web deployment path before inviting a larger test group.
3. Treat WeChat Mini Program as the later distribution path, not the immediate engineering task.

The immediate next action is to choose a domestic cloud provider and domain strategy. Do not rewrite the product as a Mini Program before the web demo has been tested with real users.

## Option A: keep the current overseas preview

Use this for:

- overseas testers
- internal demo
- product screenshots
- screen recording
- investor / advisor preview when the link works

Pros:

- already working
- no migration needed
- Vercel auto-deploys from `main`
- fast iteration

Cons:

- not reliable enough for mainland tester rollout
- cannot be the only public testing URL for China
- mobile browser and microphone behavior may differ from domestic hosting

Decision:

- Keep it as the global preview.
- Do not use it as the main China testing URL.

## Option B: domestic-accessible web deployment

Use this for the next China test round.

What needs to be chosen:

- domain name
- cloud provider
- hosting mode for the current Next.js app
- environment variables
- HTTPS certificate
- route for the speech / scoring API
- mobile microphone test matrix

Candidate providers to evaluate:

- Tencent Cloud
- Alibaba Cloud
- Huawei Cloud
- Volcano Engine

The current app is a Next.js app. A domestic web deployment path should support:

- Node.js runtime
- `pnpm install --no-frozen-lockfile`
- `pnpm build`
- `pnpm start` or provider equivalent
- environment variables
- HTTPS
- server route support for `/api/transcribe` and scoring endpoints

Important environment variables:

```bash
OPENAI_API_KEY=
OPENAI_TRANSCRIBE_MODEL=gpt-4o-mini-transcribe
OPENAI_SCORING_MODEL=gpt-4o-mini
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Notes:

- The app can still run without OpenAI and Supabase env vars because v0.1 has mock / fallback behavior.
- For real transcription and scoring, configure `OPENAI_API_KEY` in the deployment provider, not in GitHub.
- Do not commit secrets.

## Option C: WeChat Mini Program route

Use this later if China distribution becomes the priority.

Why it is attractive:

- easier to share inside WeChat
- lower friction than asking users to open a browser link
- voice-first product may fit social sharing

Why it should not be first:

- the current Next.js UI cannot be copied into a Mini Program without adaptation
- the recording permission flow needs separate testing
- review, filing, backend domain, and product category requirements must be handled
- it would slow down learning if started before the v0.1 loop is validated

Decision:

- Keep Mini Program planning open.
- Do not start a Mini Program rewrite until at least one China-accessible web test round is completed.

## Required mobile smoke test matrix

For the domestic web URL, test:

| Device / browser | Must verify |
| --- | --- |
| iPhone Safari | page loads, mic permission, recording stop, result page |
| iPhone WeChat browser | page loads, mic permission behavior, fallback copy |
| Android Chrome | page loads, recording blob size appears, result page |
| Android WeChat browser | page loads, mic permission behavior, fallback copy |
| Desktop Chrome | baseline recording and scoring flow |

Core routes:

- `/share`
- `/onboarding`
- `/lobby`
- `/room/cafe-chaos`
- `/play/cafe-chaos`
- `/result/cafe-chaos`
- `/cards`

## What can be tested before formal launch

Before a formal public launch, use a small closed test group.

Test only:

- whether users understand the concept in 10 seconds
- whether they are willing to tap the microphone
- whether visible English lines reduce fear
- whether recording works or falls back clearly
- whether the result page feels rewarding
- whether they would share it with a friend

Do not test yet:

- paid conversion
- large-scale retention
- multiplayer matching
- classroom / school sales
- Mini Program growth loops

## Recommended next action

Pick one provider and create a domestic web deployment checklist.

Suggested default:

1. Buy or choose a domain.
2. Choose Tencent Cloud or Alibaba Cloud for the first domestic web test.
3. Confirm the provider can run a Next.js Node.js app.
4. Configure deployment with mock fallback first.
5. Open the `/share` page on mobile browsers.
6. Invite 5 mainland testers before scaling to 10+.

## Open questions

- Which domain should be used?
- Is the launch主体 personal or company?
- Which cloud provider account is available now?
- Will the first China test use mock transcription or real OpenAI transcription?
- Should speech recognition later use a domestic provider for latency and availability?

## Do not do yet

- Do not rewrite as Mini Program immediately.
- Do not add login before first China web test.
- Do not add payment.
- Do not add complex scenario authoring.
- Do not commit any API keys.
