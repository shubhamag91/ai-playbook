export interface ModelEntry {
  name: string;
  company: string;
  latest: boolean;
  context: string;
  pricing: string;
  capabilities: string;
  notes?: string;
}

export const models: ModelEntry[] = [
  // Anthropic
  { name: 'Claude 4 Opus', company: 'Anthropic', latest: true, context: '400K', pricing: '$15/$75 per 1M', capabilities: 'reasoning, coding, writing, analysis, vision', notes: 'Most capable Claude. Best for complex reasoning.' },
  { name: 'Claude Sonnet 4.6', company: 'Anthropic', latest: true, context: '200K', pricing: '$3/$15 per 1M', capabilities: 'coding, reasoning, writing, analysis, vision', notes: 'Best balance of speed & quality. Default pick.' },
  { name: 'Claude Haiku 4.5', company: 'Anthropic', latest: true, context: '200K', pricing: '$0.80/$4 per 1M', capabilities: 'classification, routing, summarization, vision', notes: 'Ultra-fast, cheapest Claude.' },

  // OpenAI
  { name: 'GPT-5.5', company: 'OpenAI', latest: true, context: '128K', pricing: '$2/$8 per 1M', capabilities: 'general, coding, writing, reasoning, vision', notes: 'Strong all-around. Good context.' },
  { name: 'GPT-5.5 Instant', company: 'OpenAI', latest: true, context: '128K', pricing: '$0.05/$0.15 per 1M', capabilities: 'routing, simple tasks, classification', notes: 'Embarrassingly cheap for basic work.' },
  { name: 'o3', company: 'OpenAI', latest: true, context: '128K', pricing: '$10-$60 per 1M output', capabilities: 'reasoning, math, science, coding', notes: 'Slow deliberative reasoning. Expensive.' },

  // Google
  { name: 'Gemini 3.1 Pro', company: 'Google', latest: true, context: '1M', pricing: '$2/$12 per 1M', capabilities: 'reasoning, research, vision, long-context, video', notes: 'Best context window. Excellent multimodal.' },

  // DeepSeek
  { name: 'DeepSeek V4', company: 'DeepSeek', latest: true, context: '128K', pricing: '$0.55/$2.19 per 1M', capabilities: 'reasoning, coding, general', notes: 'Surprisingly capable. MIT license.' },
  { name: 'DeepSeek V4 Flash', company: 'DeepSeek', latest: true, context: '128K', pricing: '$0.14/$0.28 per 1M', capabilities: 'routing, classification, simple tasks', notes: 'Absurdly affordable. Good enough.' },
  { name: 'DeepSeek VL', company: 'DeepSeek', latest: true, context: '128K', pricing: '~$0.55/$2.19 per 1M', capabilities: 'vision, image understanding', notes: 'DeepSeek\'s dedicated vision model.' },
  { name: 'DeepSeek R1', company: 'DeepSeek', latest: true, context: '128K', pricing: '~$0.55/$2.19 per 1M', capabilities: 'reasoning, math, science', notes: 'Open-weight reasoning matching o1.' },

  // Meta
  { name: 'Llama 4', company: 'Meta', latest: true, context: 'varies', pricing: 'Free (self-host)', capabilities: 'general, coding, reasoning, vision', notes: 'Open weights. MIT license. Run locally.' },
];
