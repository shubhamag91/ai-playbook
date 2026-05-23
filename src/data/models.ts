export interface ModelEntry {
  name: string;
  company: string;
  latest: boolean;
  context: string;
  pricing: string;
  capabilities: string;
  parameters?: string;
  notes?: string;
  // Model categorization
  flagship?: boolean;  // True for the single top model per company
  // Numeric pricing (per 1M tokens)
  inputPrice?: number;
  outputPrice?: number;
  // CostCalculator fields
  showInCalculator?: boolean;
  calcOrder?: number;
  calcClass?: string;
  calcFamily?: string;
  calcDisplayName?: string;
  calcRate?: string;
  calcBadge?: string;
  calcBadgeClass?: string;
  // ModelSelector fields
  showInSelector?: boolean;
  selectorId?: string;
  speed?: string;
  costTier?: string;
  useCases?: string[];
  bestFor?: string;
}

export const models: ModelEntry[] = [
  // Anthropic
  {
    name: 'Claude Opus 4.7', company: 'Anthropic', latest: true, context: '1M',
    pricing: '$5/$25 per 1M', capabilities: 'reasoning, coding, writing, analysis, vision',
    notes: 'Most capable Claude. Best for complex reasoning and agentic coding. Adaptive thinking.',
    flagship: true,
    inputPrice: 5, outputPrice: 25,
    showInCalculator: true, calcOrder: 3, calcClass: 'opus', calcFamily: 'Anthropic',
    calcDisplayName: 'Claude Opus', calcRate: '$5/$25 per 1M',
    showInSelector: true, selectorId: 'opus', speed: 'slow', costTier: 'premium',
    useCases: ['reasoning', 'writing', 'analysis', 'coding'], bestFor: 'Complex reasoning, long documents',
  },
  { name: 'Claude Opus 4.7 (Thinking)', company: 'Anthropic', latest: true, context: '1M', pricing: '$5/$25 per 1M', capabilities: 'reasoning, coding, writing, analysis, vision, design', notes: 'Top-ranked on Design Arena. Thinking mode enabled.', inputPrice: 5, outputPrice: 25 },
  { name: 'Claude Opus 4.6', company: 'Anthropic', latest: false, context: '1M', pricing: '$5/$25 per 1M', capabilities: 'reasoning, coding, writing, analysis, vision', notes: 'Previous gen flagship. Still highly capable.' },
  { name: 'Claude Opus 4.6 (Thinking)', company: 'Anthropic', latest: false, context: '1M', pricing: '$5/$25 per 1M', capabilities: 'reasoning, coding, writing, analysis, vision, design', notes: 'Previous gen with thinking mode. Strong on design benchmarks.' },
  { name: 'Claude Opus 4.5', company: 'Anthropic', latest: false, context: '200K', pricing: '$5/$25 per 1M', capabilities: 'reasoning, coding, writing, analysis', notes: 'Earlier generation. Still available for certain use cases.' },
  {
    name: 'Claude Sonnet 4.6', company: 'Anthropic', latest: true, context: '1M',
    pricing: '$3/$15 per 1M', capabilities: 'coding, reasoning, writing, analysis, vision',
    notes: 'Best balance of speed & quality. Default pick.',
    inputPrice: 3, outputPrice: 15,
    showInCalculator: true, calcOrder: 1, calcClass: 'sonnet', calcFamily: 'Anthropic',
    calcDisplayName: 'Claude Sonnet', calcRate: '$3/$15 per 1M', calcBadge: 'Default', calcBadgeClass: 'default',
    showInSelector: true, selectorId: 'sonnet', speed: 'fast', costTier: 'mid',
    useCases: ['writing', 'coding', 'analysis'], bestFor: 'Default choice for most tasks',
  },
  {
    name: 'Claude Haiku 4.5', company: 'Anthropic', latest: true, context: '200K',
    pricing: '$1/$5 per 1M', capabilities: 'classification, routing, summarization, vision',
    notes: 'Ultra-fast, cheapest Claude.',
    inputPrice: 1, outputPrice: 5,
    showInCalculator: true, calcOrder: 2, calcClass: 'haiku', calcFamily: 'Anthropic',
    calcDisplayName: 'Claude Haiku', calcRate: '$1/$5 per 1M',
    showInSelector: true, selectorId: 'haiku', speed: 'ultra-fast', costTier: 'budget',
    useCases: ['routing', 'classification', 'speed'], bestFor: 'Fast & cheap for simple tasks',
  },

  // OpenAI
  {
    name: 'GPT-5.5', company: 'OpenAI', latest: true, context: '1M',
    pricing: '$5/$30 per 1M', capabilities: 'general, coding, writing, reasoning, vision',
    notes: 'Flagship. Reasoning levels none→xhigh. Strong all-around.',
    flagship: true,
    inputPrice: 5, outputPrice: 30,
    showInCalculator: true, calcOrder: 5, calcClass: 'gpt', calcFamily: 'OpenAI',
    calcDisplayName: 'GPT-5.5', calcRate: '$5/$30 per 1M', calcBadge: 'Balanced', calcBadgeClass: 'balanced',
    showInSelector: true, selectorId: 'gpt55', speed: 'fast', costTier: 'premium',
    useCases: ['writing', 'coding', 'vision', 'reasoning'], bestFor: 'Flagship reasoning & coding',
  },
  {
    name: 'GPT-5.4', company: 'OpenAI', latest: true, context: '1M',
    pricing: '$2.50/$15 per 1M', capabilities: 'general, coding, writing, reasoning, vision',
    notes: 'Affordable professional tier. Near-flagship capability.',
    inputPrice: 2.50, outputPrice: 15,
    showInCalculator: true, calcOrder: 6, calcClass: 'gpt5', calcFamily: 'OpenAI',
    calcDisplayName: 'GPT-5.4', calcRate: '$2.50/$15 per 1M', calcBadge: 'Value', calcBadgeClass: 'balanced',
    showInSelector: true, selectorId: 'gpt54', speed: 'fast', costTier: 'mid',
    useCases: ['writing', 'coding', 'analysis'], bestFor: 'Best value for most production workloads',
  },
  {
    name: 'GPT-5.4 mini', company: 'OpenAI', latest: true, context: '400K',
    pricing: '$0.75/$4.50 per 1M', capabilities: 'general, coding, computer-use, subagents',
    notes: 'Strong mini for coding & agents. Fast.',
    inputPrice: 0.75, outputPrice: 4.50,
    showInCalculator: true, calcOrder: 4, calcClass: 'gpt5m', calcFamily: 'OpenAI',
    calcDisplayName: 'GPT-5.4 mini', calcRate: '$0.75/$4.50 per 1M', calcBadge: 'Fast', calcBadgeClass: 'fastest',
    showInSelector: true, selectorId: 'gpt54-mini', speed: 'ultra-fast', costTier: 'budget',
    useCases: ['speed', 'budget', 'routing', 'coding'], bestFor: 'Cost-efficient coding & agents',
  },
  { name: 'GPT-5.4 nano', company: 'OpenAI', latest: true, context: '400K', pricing: '~$0.15/~$0.60 per 1M', capabilities: 'general, classification, routing', notes: 'Fastest, cheapest. Ideal for high-throughput.', inputPrice: 0.15, outputPrice: 0.60 },
  { name: 'GPT-4.1', company: 'OpenAI', latest: false, context: '128K', pricing: '$0.50/$1.50 per 1M', capabilities: 'general, coding', notes: 'Previous gen. Superseded by GPT-5.4 mini.' },
  {
    name: 'o3', company: 'OpenAI', latest: true, context: '128K',
    pricing: '$8/$32 per 1M', capabilities: 'reasoning, math, science, coding',
    notes: 'Dedicated reasoning model. Spends tokens on hidden thinking.',
    showInSelector: true, selectorId: 'o3', speed: 'very-slow', costTier: 'premium',
    useCases: ['reasoning'], bestFor: 'Hardest problems (math, logic)',
  },
  { name: 'o1', company: 'OpenAI', latest: false, context: '128K', pricing: '$15/$60 per 1M', capabilities: 'reasoning, math, coding', notes: 'Earlier reasoning model. Superseded by o3.', inputPrice: 15, outputPrice: 60, showInSelector: true, selectorId: 'o1', speed: 'slow', costTier: 'premium', useCases: ['reasoning'], bestFor: 'Hard reasoning at lower cost than o3' },

  // Google
  {
    name: 'Gemini 3.5 Pro', company: 'Google', latest: true, context: '1M',
    pricing: '$2/$12 per 1M', capabilities: 'reasoning, research, vision, long-context, video',
    notes: 'Best context window. Excellent multimodal.',
    inputPrice: 2, outputPrice: 12,
    showInCalculator: true, calcOrder: 6, calcClass: 'gemini', calcFamily: 'Google',
    calcDisplayName: 'Gemini 3.5', calcRate: '$2/$12 per 1M', calcBadge: '1M ctx', calcBadgeClass: 'context',
    showInSelector: true, selectorId: 'gemini', speed: 'medium', costTier: 'mid',
    useCases: ['long-context', 'vision', 'research'], bestFor: 'Massive documents & vision',
  },
  {     name: 'Gemini 3.5 Ultra', company: 'Google', latest: true, context: '1M', pricing: '$4/$20 per 1M', capabilities: 'reasoning, research, vision, long-context, design, agentic', notes: 'Most capable Gemini. Advanced reasoning and agentic capabilities.', flagship: true },
  {
    name: 'Gemini 3.5 Flash', company: 'Google', latest: true, context: '1M',
    pricing: '$0.15/$0.60 per 1M', capabilities: 'reasoning, coding, vision, speed',
    notes: 'Fast, affordable Gemini. Free tier on AI Studio.',
    inputPrice: 0.15, outputPrice: 0.60,
    showInCalculator: true, calcOrder: 12, calcClass: 'gemini-mini', calcFamily: 'Google',
    calcDisplayName: 'Gemini 3.5 Flash', calcRate: '$0.15/$0.60 per 1M', calcBadge: 'Fast', calcBadgeClass: 'fastest',
  },

  // DeepSeek
  {
    name: 'DeepSeek V4 Flash', company: 'DeepSeek', latest: true, context: '1M',
    pricing: '$0.14/$0.28 per 1M', capabilities: 'routing, classification, general, reasoning',
    parameters: '~37B (MoE)', notes: 'Cost leader. MIT license. FREE on OpenCode.',
    inputPrice: 0.14, outputPrice: 0.28,
    showInCalculator: true, calcOrder: 7, calcClass: 'deepseek', calcFamily: 'DeepSeek',
    calcDisplayName: 'DeepSeek Flash', calcRate: '$0.14/$0.28 per 1M', calcBadge: 'Cheapest', calcBadgeClass: 'cheap',
    showInSelector: true, selectorId: 'deepseek-flash', speed: 'fast', costTier: 'budget',
    useCases: ['speed', 'budget', 'routing'], bestFor: 'Extreme budget, minimal quality loss',
  },
  {
    name: 'DeepSeek V4 Pro', company: 'DeepSeek', latest: true, context: '1M',
    pricing: '$0.435/$0.87 per 1M (promo)', capabilities: 'reasoning, coding, general, design',
    parameters: '671B (MoE)', notes: 'Premium tier. Thinking mode default. 75% promo until May 31.',
    flagship: true,
    inputPrice: 0.435, outputPrice: 0.87,
    showInCalculator: true, calcOrder: 8, calcClass: 'deepseek-pro', calcFamily: 'DeepSeek',
    calcDisplayName: 'DeepSeek V4 Pro', calcRate: '$0.435/$0.87 per 1M', calcBadge: 'Premium', calcBadgeClass: 'balanced',
    showInSelector: true, selectorId: 'deepseek-pro', speed: 'medium', costTier: 'budget',
    useCases: ['reasoning', 'budget', 'coding'], bestFor: 'Frontier quality at fraction of cost',
  },
  { name: 'DeepSeek R1', company: 'DeepSeek', latest: true, context: '1M', pricing: '$0.435/$0.87 per 1M (promo)', capabilities: 'reasoning, math, science, coding', parameters: '671B (MoE)', notes: 'Dedicated reasoning. Chain-of-thought specialist. Open-weight.' },
  { name: 'DeepSeek V4', company: 'DeepSeek', latest: false, context: '128K', pricing: '$0.55/$2.19 per 1M', capabilities: 'reasoning, coding, general', parameters: '236B', notes: 'Previous gen. Superseded by V4 Flash and Pro.' },

  // Meta
  {
    name: 'Llama 4', company: 'Meta', latest: true, context: 'varies',
    pricing: 'Free (self-host)', capabilities: 'general, coding, reasoning, vision',
    parameters: '405B (MoE)', notes: 'Open weights. MIT license. Run locally.',
    inputPrice: 0, outputPrice: 0,
    showInSelector: true, selectorId: 'llama', speed: 'varies', costTier: 'budget',
    useCases: ['open-source', 'privacy'], bestFor: 'Private, self-hosted',
  },
  {     name: 'Llama 4 Scout', company: 'Meta', latest: true, context: '10M', pricing: 'Free (self-host)', capabilities: 'general, coding, long-context, vision', parameters: '109B (MoE)', notes: 'MoE variant. 10M context window, 109B total params.', flagship: true },
  { name: 'Muse Spark', company: 'Meta', latest: true, context: 'varies', pricing: 'Free (self-host)', capabilities: 'reasoning, coding, design, multimodal', parameters: '~70B', notes: 'Meta\'s latest open-weight model. Replaces Llama. Strong on design.' },

  // xAI
  {
    name: 'Grok 3 Pro', company: 'xAI', latest: true, context: '128K',
    pricing: '$3/$15 per 1M', capabilities: 'reasoning, coding, real-time, vision',
    parameters: 'Unknown', notes: 'Premium tier of Grok 3. Real-time X/Twitter data.',
    inputPrice: 3, outputPrice: 15,
    showInCalculator: true, calcOrder: 10, calcClass: 'grok', calcFamily: 'xAI',
    calcDisplayName: 'Grok 3 Pro', calcRate: '$3/$15 per 1M', calcBadge: 'Real-time', calcBadgeClass: 'context',
  },

  // Moonshot AI
  {
    name: 'Kimi K2.6', company: 'Moonshot AI', latest: true, context: '256K',
    pricing: '~$0.55/$2.19 per 1M', capabilities: 'reasoning, coding, long-context, vision, design',
    notes: 'Latest Kimi. Top-5 on Design Arena. Agent swarm capabilities.',
    inputPrice: 0.55, outputPrice: 2.19,
    showInCalculator: true, calcOrder: 13, calcClass: 'kimi', calcFamily: 'Moonshot AI',
    calcDisplayName: 'Kimi K2.6', calcRate: '~$0.55/$2.19 per 1M', calcBadge: '256K ctx', calcBadgeClass: 'context',
  },
  { name: 'Kimi K2.5 (Thinking)', company: 'Moonshot AI', latest: false, context: '256K', pricing: '~$0.55/$2.19 per 1M', capabilities: 'reasoning, coding, long-context, design', notes: 'Previous gen with thinking mode.' },

  // Zhipu AI
  { name: 'GLM 5.1', company: 'Zhipu AI', latest: true, context: '128K', pricing: '~$0.50/$2.00 per 1M', capabilities: 'reasoning, coding, multilingual, design', notes: 'Zhipu\'s flagship. Top-5 on Design Arena.', inputPrice: 0.50, outputPrice: 2.00 },
  { name: 'GLM 5 Turbo', company: 'Zhipu AI', latest: true, context: '128K', pricing: '~$0.30/$1.00 per 1M', capabilities: 'reasoning, coding, multilingual, speed', notes: 'Fast inference variant of GLM 5.', inputPrice: 0.30, outputPrice: 1.00 },
  { name: 'GLM 5', company: 'Zhipu AI', latest: true, context: '128K', pricing: '~$0.40/$1.50 per 1M', capabilities: 'reasoning, coding, multilingual', notes: 'Base GLM 5 model. Strong multilingual performance.', inputPrice: 0.40, outputPrice: 1.50 },
  { name: 'GLM 4.7', company: 'Zhipu AI', latest: false, context: '128K', pricing: '~$0.30/$1.00 per 1M', capabilities: 'reasoning, coding, multilingual', notes: 'Mid-cycle update between GLM 4 and GLM 5.' },
  { name: 'GLM 4', company: 'Zhipu AI', latest: false, context: '128K', pricing: '~$0.20/$0.80 per 1M', capabilities: 'reasoning, coding, multilingual', notes: 'Previous gen. Still solid for Chinese-language tasks.' },

  // Alibaba
  {
    name: 'Qwen 3.6', company: 'Alibaba', latest: true, context: '128K',
    pricing: '~$0.40/$1.50 per 1M', capabilities: 'reasoning, coding, multilingual, vision',
    notes: 'Alibaba\'s flagship. Strong across all benchmarks.',
    inputPrice: 0.40, outputPrice: 1.50,
    showInCalculator: true, calcOrder: 11, calcClass: 'qwen', calcFamily: 'Alibaba',
    calcDisplayName: 'Qwen 3.6', calcRate: '~$0.40/$1.50 per 1M',
  },

  // MiniMax
  { name: 'MiniMax M2.7', company: 'MiniMax', latest: true, context: '128K', pricing: '~$0.30/$1.00 per 1M', capabilities: 'reasoning, coding, long-context, vision', notes: 'Independent Chinese AI lab. Strong long-context performance.', inputPrice: 0.30, outputPrice: 1.00 },

  // Xiaomi
  { name: 'MiMo M2.7', company: 'Xiaomi', latest: true, context: '128K', pricing: '~$0.25/$0.80 per 1M', capabilities: 'reasoning, coding, vision', notes: 'Xiaomi\'s multimodal model. First major AI release.', inputPrice: 0.25, outputPrice: 0.80 },
];
