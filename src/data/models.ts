export interface ModelEntry {
  name: string;
  company: string;
  latest: boolean;
  context: string;
  pricing: string;
  capabilities: string;
  parameters?: string;
  notes?: string;
}

export const models: ModelEntry[] = [
  // Anthropic
  { name: 'Claude 4 Opus', company: 'Anthropic', latest: true, context: '400K', pricing: '$15/$75 per 1M', capabilities: 'reasoning, coding, writing, analysis, vision', notes: 'Most capable Claude. Best for complex reasoning.' },
  { name: 'Claude Opus 4.7 (Thinking)', company: 'Anthropic', latest: true, context: '400K', pricing: '$15/$75 per 1M', capabilities: 'reasoning, coding, writing, analysis, vision, design', notes: 'Top-ranked on Design Arena. Thinking mode enabled.' },
  { name: 'Claude Opus 4.6', company: 'Anthropic', latest: false, context: '200K', pricing: '$15/$75 per 1M', capabilities: 'reasoning, coding, writing, analysis, vision', notes: 'Previous gen flagship. Still highly capable.' },
  { name: 'Claude Opus 4.6 (Thinking)', company: 'Anthropic', latest: false, context: '200K', pricing: '$15/$75 per 1M', capabilities: 'reasoning, coding, writing, analysis, vision, design', notes: 'Previous gen with thinking mode. Strong on design benchmarks.' },
  { name: 'Claude Opus 4.5', company: 'Anthropic', latest: false, context: '200K', pricing: '$15/$75 per 1M', capabilities: 'reasoning, coding, writing, analysis', notes: 'Earlier generation. Still available for certain use cases.' },
  { name: 'Claude Sonnet 4.6', company: 'Anthropic', latest: true, context: '200K', pricing: '$3/$15 per 1M', capabilities: 'coding, reasoning, writing, analysis, vision', notes: 'Best balance of speed & quality. Default pick.' },
  { name: 'Claude Haiku 4.5', company: 'Anthropic', latest: true, context: '200K', pricing: '$0.80/$4 per 1M', capabilities: 'classification, routing, summarization, vision', notes: 'Ultra-fast, cheapest Claude.' },

  // OpenAI
  { name: 'GPT-5.5', company: 'OpenAI', latest: true, context: '128K', pricing: '$2/$8 per 1M', capabilities: 'general, coding, writing, reasoning, vision', notes: 'Strong all-around. Good context.' },
  { name: 'GPT-5.5 Instant', company: 'OpenAI', latest: true, context: '128K', pricing: '$0.05/$0.15 per 1M', capabilities: 'routing, simple tasks, classification', notes: 'Embarrassingly cheap for basic work.' },
  { name: 'GPT-5.4', company: 'OpenAI', latest: false, context: '128K', pricing: '$1/$4 per 1M', capabilities: 'general, coding, reasoning', notes: 'Earlier GPT-5 variant. Superseded by 5.5.' },
  { name: 'GPT-4.1', company: 'OpenAI', latest: false, context: '128K', pricing: '$0.50/$1.50 per 1M', capabilities: 'general, coding', notes: 'Interim model between GPT-4 and GPT-5.' },
  { name: 'o3', company: 'OpenAI', latest: true, context: '128K', pricing: '$10-$60 per 1M output', capabilities: 'reasoning, math, science, coding', notes: 'Slow deliberative reasoning. Expensive.' },

  // Google
  { name: 'Gemini 3.1 Pro', company: 'Google', latest: true, context: '1M', pricing: '$2/$12 per 1M', capabilities: 'reasoning, research, vision, long-context, video', notes: 'Best context window. Excellent multimodal.' },
  { name: 'Gemini 3 Pro Preview', company: 'Google', latest: true, context: '1M', pricing: '$2/$12 per 1M', capabilities: 'reasoning, research, vision, long-context, design', notes: 'Preview model. Strong design capabilities on Design Arena.' },
  { name: 'Gemini 3 Mini', company: 'Google', latest: true, context: '128K', pricing: '$1/$6 per 1M', capabilities: 'reasoning, coding, vision, speed', notes: 'Smaller, faster Gemini variant.' },

  // DeepSeek
  { name: 'DeepSeek V4', company: 'DeepSeek', latest: true, context: '128K', pricing: '$0.55/$2.19 per 1M', capabilities: 'reasoning, coding, general', parameters: '236B', notes: 'Surprisingly capable. MIT license.' },
  { name: 'DeepSeek V4 Flash', company: 'DeepSeek', latest: true, context: '128K', pricing: '$0.14/$0.28 per 1M', capabilities: 'routing, classification, simple tasks', parameters: '~20B', notes: 'Absurdly affordable. Good enough.' },
  { name: 'DeepSeek V4 Pro', company: 'DeepSeek', latest: true, context: '128K', pricing: '$0.55/$2.19 per 1M', capabilities: 'reasoning, coding, design, general', parameters: '236B', notes: 'Premium DeepSeek variant. Strong on design benchmarks.' },
  { name: 'DeepSeek VL', company: 'DeepSeek', latest: true, context: '128K', pricing: '~$0.55/$2.19 per 1M', capabilities: 'vision, image understanding', notes: 'DeepSeek\'s dedicated vision model.' },
  { name: 'DeepSeek R1', company: 'DeepSeek', latest: true, context: '128K', pricing: '~$0.55/$2.19 per 1M', capabilities: 'reasoning, math, science', parameters: '236B', notes: 'Open-weight reasoning matching o1.' },

  // Meta
  { name: 'Llama 4', company: 'Meta', latest: true, context: 'varies', pricing: 'Free (self-host)', capabilities: 'general, coding, reasoning, vision', parameters: '405B (MoE)', notes: 'Open weights. MIT license. Run locally.' },
  { name: 'Llama 4 Scout', company: 'Meta', latest: true, context: '10M', pricing: 'Free (self-host)', capabilities: 'general, coding, long-context, vision', parameters: '109B (MoE)', notes: 'MoE variant. 10M context window, 109B total params.' },
  { name: 'Muse Spark', company: 'Meta', latest: true, context: 'varies', pricing: 'Free (self-host)', capabilities: 'reasoning, coding, design, multimodal', parameters: '~70B', notes: 'Meta\'s latest open-weight model. Replaces Llama. Strong on design.' },

  // xAI
  { name: 'Grok 3 Pro', company: 'xAI', latest: true, context: '128K', pricing: '$3/$15 per 1M', capabilities: 'reasoning, coding, real-time, vision', parameters: 'Unknown', notes: 'Premium tier of Grok 3. Real-time X/Twitter data.' },

  // Moonshot AI
  { name: 'Kimi K2.6', company: 'Moonshot AI', latest: true, context: '256K', pricing: '~$0.55/$2.19 per 1M', capabilities: 'reasoning, coding, long-context, vision, design', notes: 'Latest Kimi. Top-5 on Design Arena. Agent swarm capabilities.' },
  { name: 'Kimi K2.5 (Thinking)', company: 'Moonshot AI', latest: false, context: '256K', pricing: '~$0.55/$2.19 per 1M', capabilities: 'reasoning, coding, long-context, design', notes: 'Previous gen with thinking mode.' },

  // Zhipu AI
  { name: 'GLM 5.1', company: 'Zhipu AI', latest: true, context: '128K', pricing: '~$0.50/$2.00 per 1M', capabilities: 'reasoning, coding, multilingual, design', notes: 'Zhipu\'s flagship. Top-5 on Design Arena.' },
  { name: 'GLM 5 Turbo', company: 'Zhipu AI', latest: true, context: '128K', pricing: '~$0.30/$1.00 per 1M', capabilities: 'reasoning, coding, multilingual, speed', notes: 'Fast inference variant of GLM 5.' },
  { name: 'GLM 5', company: 'Zhipu AI', latest: true, context: '128K', pricing: '~$0.40/$1.50 per 1M', capabilities: 'reasoning, coding, multilingual', notes: 'Base GLM 5 model. Strong multilingual performance.' },
  { name: 'GLM 4.7', company: 'Zhipu AI', latest: false, context: '128K', pricing: '~$0.30/$1.00 per 1M', capabilities: 'reasoning, coding, multilingual', notes: 'Mid-cycle update between GLM 4 and GLM 5.' },
  { name: 'GLM 4', company: 'Zhipu AI', latest: false, context: '128K', pricing: '~$0.20/$0.80 per 1M', capabilities: 'reasoning, coding, multilingual', notes: 'Previous gen. Still solid for Chinese-language tasks.' },

  // Alibaba
  { name: 'Qwen 3.6', company: 'Alibaba', latest: true, context: '128K', pricing: '~$0.40/$1.50 per 1M', capabilities: 'reasoning, coding, multilingual, vision', notes: 'Alibaba\'s flagship. Strong across all benchmarks.' },

  // MiniMax
  { name: 'MiniMax M2.7', company: 'MiniMax', latest: true, context: '128K', pricing: '~$0.30/$1.00 per 1M', capabilities: 'reasoning, coding, long-context, vision', notes: 'Independent Chinese AI lab. Strong long-context performance.' },

  // Xiaomi
  { name: 'MiMo M2.7', company: 'Xiaomi', latest: true, context: '128K', pricing: '~$0.25/$0.80 per 1M', capabilities: 'reasoning, coding, vision', notes: 'Xiaomi\'s multimodal model. First major AI release.' },
];
