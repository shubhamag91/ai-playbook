export interface TrendItem {
  title: string;
  description: string;
  link: string;
  date: string;
  category: string;
}

export const trendingTopics: TrendItem[] = [
  {
    title: 'Claude 4 Opus Released',
    description: '400K context, agent mode by default, $8/$24 per 1M tokens  -  Anthropic\'s new flagship.',
    link: '/research/whats-new#claude-4-opus-anthropic-may-2026',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'GPT-5.5 Instant',
    description: 'OpenAI\'s fastest model yet  -  <1s responses, $0.05/$0.20 per 1M tokens, ideal for real-time apps.',
    link: '/research/whats-new#gpt-55-openai-may-2026',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'DeepSeek V4 Flash',
    description: 'Cost leader at $0.14/$0.28 per 1M tokens. Matches Sonnet quality for most tasks.',
    link: '/research/whats-new#deepseek-v4-flash-deepseek-may-2026',
    date: 'May 2026',
    category: 'Pricing',
  },
  {
    title: 'Gemini 3.1 Pro',
    description: '1M context window, Deep Research mode, Google Workspace integration.',
    link: '/research/whats-new#gemini-31-pro-google-may-2026',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'Gemma 3 Released',
    description: 'Google\'s open-weight model available in 2B, 9B, and 27B sizes. MIT license.',
    link: '/research/model-releases#gemma-3-google-april-2026',
    date: 'Apr 2026',
    category: 'Open Source',
  },
  {
    title: 'Mistral Large 3',
    description: 'French AI lab\'s largest open-weight model yet. Bilingual (EN/FR), Mixtral MoE architecture.',
    link: '/research/model-releases#mistral-large-3',
    date: 'Apr 2026',
    category: 'Open Source',
  },
  {
    title: 'OpenAI o3 General Availability',
    description: 'OpenAI\'s reasoning model now available to all developers via API. 87.3% on GPQA.',
    link: '/research/whats-new#o3-openai-may-2026',
    date: 'May 2026',
    category: 'Model Release',
  },
  {
    title: 'Llama 4 405B Released',
    description: 'Meta\'s largest open model. MoE architecture, 405B total parameters, 16 experts.',
    link: '/research/model-releases#llama-4-meta-feb-2026',
    date: 'Feb 2026',
    category: 'Open Source',
  },
  {
    title: 'Gemini 2.5 Pro (Nvidia)',
    description: 'Nvidia\'s answer to Groq  -  runs full models on their own hardware. 2000+ tok/s on Llama 3 70B.',
    link: '/research/emerging-trends#inference',
    date: 'Mar 2026',
    category: 'Infrastructure',
  },
  {
    title: 'Kimi K2 Thinking',
    description: '1-trillion-parameter open-source reasoning model from Moonshot AI. 50.2% on Humanity\'s Last Exam.',
    link: '/decide/tools/guide#chinese-ai-ecosystem',
    date: 'Apr 2026',
    category: 'Open Source',
  },
];
