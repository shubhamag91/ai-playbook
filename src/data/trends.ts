// Update this file monthly. Rotate out entries older than 3 months; keep ≤14 items.
// After editing, run `npm run build` so the search index picks up the new descriptions.
export interface TrendItem {
  title: string;
  description: string;
  link: string;
  date: string;
  category: string;
}

export const trendingTopics: TrendItem[] = [
  {
    title: 'Claude Opus 4.7',
    description: "1M context, adaptive thinking, agentic coding at $5/$25 per 1M tokens — 67% cheaper than Opus 4.1.",
    link: '/research/whats-new#claude-opus-4.7-thinking-anthropic-may-2026',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'GPT-5.5',
    description: "OpenAI's flagship with configurable reasoning (none→xhigh), 1M context, $5/$30 per 1M tokens.",
    link: '/research/whats-new#gpt-5.5-openai-may-2026',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'DeepSeek V4 Flash & Pro',
    description: 'V4 Flash: cost leader at $0.14/$0.28. V4 Pro: $0.44/$0.87 (75% promo). Both 1M context. FREE on OpenCode.',
    link: '/research/whats-new#deepseek-v4-flash-v4-pro-deepseek-april-may-2026',
    date: 'May 2026',
    category: 'Pricing',
  },
  {
    title: 'Gemini 3.5',
    description: "Google DeepMind's frontier intelligence series. Gemini Omni adds native multimodal — video, image, audio, text.",
    link: '/research/whats-new#gemini-31-pro-google-may-2026',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'OpenAI o3 General Availability',
    description: "OpenAI's reasoning model now available to all developers via API. 87.3% on GPQA.",
    link: '/research/whats-new#openai-o3-general-availability',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'Google Antigravity 2.0',
    description: "DeepMind's agentic development platform for building Gemini-powered agents. Full Cloud & Workspace integration.",
    link: '/deepmind/antigravity/',
    date: 'May 2026',
    category: 'Developer Tools',
  },
  {
    title: 'Kimi K2.6 Released',
    description: "Moonshot AI's latest flagship. 256K context, 100-agent swarm, top-5 on Design Arena.",
    link: '/research/china-ecosystem/',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'GLM 5 Series (Zhipu AI)',
    description: "Zhipu AI's GLM 5, 5.1, and 5 Turbo models rank among top design models on Design Arena.",
    link: '/research/china-ecosystem/',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'Meta Muse Spark',
    description: "Meta's latest open-weight model replacing Llama. Strong design capabilities on Design Arena.",
    link: '/research/models/guide',
    date: 'May 2026',
    category: 'Open Source',
  },
  {
    title: 'Grok 3 Pro (xAI)',
    description: 'Premium Grok tier. Real-time X/Twitter data access. Strong on Design Arena at 1315 Elo.',
    link: '/research/whats-new#grok-3-pro-xai-may-2026',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'MiniMax M2.7',
    description: 'Independent Chinese AI lab. Strong coding, long-context, and design capabilities.',
    link: '/research/whats-new#minimax-m2.7-minimax-may-2026',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'Gemma 4 Released',
    description: "DeepMind's most intelligent open models — 2B to 31B sizes. MIT-compatible license. Maximizes intelligence-per-parameter.",
    link: '/deepmind/gemma/',
    date: 'May 2026',
    category: 'Open Source',
  },
  {
    title: 'Mistral Large 3',
    description: "French AI lab's largest open-weight model yet. Bilingual (EN/FR), Mixtral MoE architecture.",
    link: '/research/whats-new',
    date: 'Apr 2026',
    category: 'Open Source',
  },
  {
    title: 'Llama 4 Scout',
    description: "Meta's latest open model. 128K context, MIT license. Compact and efficient for self-hosting.",
    link: '/research/whats-new#llama-4-scout-meta-may-2026',
    date: 'May 2026',
    category: 'Open Source',
  },
];
