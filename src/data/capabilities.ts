export type ModelId = string;

export interface CapabilityScore {
  model: ModelId;
  task: string;
  score: number; // 1-5
  benchmarkRef?: string;
  detail?: string;
}

export const taskCategories = [
  { id: 'coding', label: 'Coding', description: 'Generate and refactor code' },
  { id: 'math', label: 'Math', description: 'Mathematical reasoning' },
  { id: 'reasoning', label: 'Reasoning', description: 'Complex multi-step reasoning' },
  { id: 'writing', label: 'Writing', description: 'Prose, analysis, long-form' },
  { id: 'vision', label: 'Vision', description: 'Image understanding' },
  { id: 'long-context', label: 'Long Context', description: 'Processing large documents' },
  { id: 'agentic', label: 'Agentic', description: 'Tool use, multi-step tasks' },
  { id: 'speed', label: 'Speed', description: 'Response latency' },
  { id: 'cost', label: 'Cost Efficiency', description: 'Value per dollar' },
];

export const models = [
  { id: 'claude-opus', label: 'Claude 4 Opus', family: 'Claude', short: 'Opus' },
  { id: 'claude-sonnet', label: 'Claude Sonnet 4.6', family: 'Claude', short: 'Sonnet' },
  { id: 'gpt-5.5', label: 'GPT-5.5', family: 'GPT', short: 'GPT-5.5' },
  { id: 'gpt-instant', label: 'GPT-5.5 Instant', family: 'GPT', short: 'Instant' },
  { id: 'gemini-pro', label: 'Gemini 3.1 Pro', family: 'Gemini', short: 'Gemini' },
  { id: 'deepseek-v4', label: 'DeepSeek V4', family: 'DeepSeek', short: 'DS V4' },
  { id: 'deepseek-vl', label: 'DeepSeek VL', family: 'DeepSeek', short: 'DS VL' },
  { id: 'o3', label: 'o3', family: 'OpenAI', short: 'o3' },
  { id: 'llama-4', label: 'Llama 4 405B', family: 'Llama', short: 'Llama 4' },
];

export const capabilityData: CapabilityScore[] = [
  // Coding
  { model: 'claude-opus', task: 'coding', score: 5, benchmarkRef: 'HumanEval 96.2%', detail: 'Best-in-class code generation' },
  { model: 'claude-sonnet', task: 'coding', score: 4, benchmarkRef: 'HumanEval 93.7%', detail: 'Strong daily driver' },
  { model: 'gpt-5.5', task: 'coding', score: 5, benchmarkRef: 'HumanEval 95.1%', detail: 'Excellent for most tasks' },
  { model: 'gpt-instant', task: 'coding', score: 4, benchmarkRef: 'HumanEval 92.8%', detail: 'Fast, good quality' },
  { model: 'gemini-pro', task: 'coding', score: 4, benchmarkRef: 'HumanEval 94.0%', detail: 'Strong, especially with long context' },
  { model: 'deepseek-v4', task: 'coding', score: 4, benchmarkRef: 'HumanEval 91.5%', detail: 'Surprisingly capable for price' },
  { model: 'o3', task: 'coding', score: 5, benchmarkRef: 'SWE-bench 71.7%', detail: 'Top-tier for complex coding' },
  { model: 'llama-4', task: 'coding', score: 3, benchmarkRef: 'HumanEval 90.2%', detail: 'Good open-source option' },

  // Math
  { model: 'claude-opus', task: 'math', score: 5, benchmarkRef: 'MATH 96.8%', detail: 'Excellent mathematical reasoning' },
  { model: 'claude-sonnet', task: 'math', score: 4, benchmarkRef: 'MATH 94.2%', detail: 'Strong, suitable for most needs' },
  { model: 'gpt-5.5', task: 'math', score: 5, benchmarkRef: 'MATH 95.5%', detail: 'Very strong math capability' },
  { model: 'gpt-instant', task: 'math', score: 4, benchmarkRef: 'MATH 92.1%', detail: 'Fast, good for basic math' },
  { model: 'gemini-pro', task: 'math', score: 5, benchmarkRef: 'MATH 96.0%', detail: 'Excellent math performance' },
  { model: 'deepseek-v4', task: 'math', score: 4, benchmarkRef: 'MATH 93.8%', detail: 'Strong for the price' },
  { model: 'o3', task: 'math', score: 5, benchmarkRef: 'MATH 97.9%', detail: 'Best-in-class math' },
  { model: 'llama-4', task: 'math', score: 3, benchmarkRef: 'MATH 89.6%', detail: 'Decent open-source option' },

  // Reasoning
  { model: 'claude-opus', task: 'reasoning', score: 5, benchmarkRef: 'GPQA 84.6%', detail: 'Deep, nuanced reasoning' },
  { model: 'claude-sonnet', task: 'reasoning', score: 4, benchmarkRef: 'GPQA 79.8%', detail: 'Strong reasoning for most tasks' },
  { model: 'gpt-5.5', task: 'reasoning', score: 4, benchmarkRef: 'GPQA 82.1%', detail: 'Capable multi-step reasoning' },
  { model: 'gpt-instant', task: 'reasoning', score: 3, benchmarkRef: 'GPQA 78.0%', detail: 'Good, but trades depth for speed' },
  { model: 'gemini-pro', task: 'reasoning', score: 4, benchmarkRef: 'GPQA 81.5%', detail: 'Solid reasoning, improved with 3.1' },
  { model: 'deepseek-v4', task: 'reasoning', score: 4, benchmarkRef: 'GPQA 76.4%', detail: 'Remarkably capable for cost' },
  { model: 'o3', task: 'reasoning', score: 5, benchmarkRef: 'GPQA 87.3%', detail: 'State-of-the-art reasoning' },
  { model: 'llama-4', task: 'reasoning', score: 3, benchmarkRef: 'GPQA 73.1%', detail: 'Competitive open-source' },

  // Writing
  { model: 'claude-opus', task: 'writing', score: 5, benchmarkRef: null, detail: 'Best prose, nuance, and voice' },
  { model: 'claude-sonnet', task: 'writing', score: 5, benchmarkRef: null, detail: 'Excellent writing for daily use' },
  { model: 'gpt-5.5', task: 'writing', score: 4, benchmarkRef: null, detail: 'Very good, slightly less nuanced' },
  { model: 'gpt-instant', task: 'writing', score: 3, benchmarkRef: null, detail: 'Adequate, optimized for speed' },
  { model: 'gemini-pro', task: 'writing', score: 4, benchmarkRef: null, detail: 'Strong, especially analytical writing' },
  { model: 'deepseek-v4', task: 'writing', score: 3, benchmarkRef: null, detail: 'Decent, lags behind top models' },
  { model: 'o3', task: 'writing', score: 3, benchmarkRef: null, detail: 'Reasoning-focused, not writing-optimized' },
  { model: 'llama-4', task: 'writing', score: 3, benchmarkRef: null, detail: 'Solid for open-source' },

  // Vision
  { model: 'claude-opus', task: 'vision', score: 4, benchmarkRef: null, detail: 'Good image understanding' },
  { model: 'claude-sonnet', task: 'vision', score: 4, benchmarkRef: null, detail: 'Strong vision capability' },
  { model: 'gpt-5.5', task: 'vision', score: 4, benchmarkRef: null, detail: 'Multimodal, strong image analysis' },
  { model: 'gpt-instant', task: 'vision', score: 3, benchmarkRef: null, detail: 'Basic vision support' },
  { model: 'gemini-pro', task: 'vision', score: 5, benchmarkRef: null, detail: 'Best-in-class multimodal' },
  { model: 'deepseek-v4', task: 'vision', score: 0, benchmarkRef: null, detail: 'Text-only model. Use DeepSeek VL for vision.' },
  { model: 'deepseek-vl', task: 'coding', score: 4, benchmarkRef: 'HumanEval 90%+', detail: 'Strong coder with vision understanding' },
  { model: 'deepseek-vl', task: 'math', score: 4, benchmarkRef: null, detail: 'Good math, similar to DeepSeek V4' },
  { model: 'deepseek-vl', task: 'reasoning', score: 4, benchmarkRef: null, detail: 'Solid reasoning with visual context' },
  { model: 'deepseek-vl', task: 'writing', score: 3, benchmarkRef: null, detail: 'Decent, vision-enhanced writing' },
  { model: 'deepseek-vl', task: 'vision', score: 4, benchmarkRef: null, detail: 'DeepSeek\'s dedicated vision model. Strong image understanding.' },
  { model: 'deepseek-vl', task: 'long-context', score: 3, benchmarkRef: '128K context', detail: 'Same context window as V4' },
  { model: 'deepseek-vl', task: 'agentic', score: 3, benchmarkRef: null, detail: 'Basic function calling with vision' },
  { model: 'deepseek-vl', task: 'speed', score: 3, benchmarkRef: null, detail: 'Slower than V4 due to vision processing' },
  { model: 'deepseek-vl', task: 'cost', score: 4, benchmarkRef: null, detail: 'Competitive pricing for vision tasks' },
  { model: 'o3', task: 'vision', score: 3, benchmarkRef: null, detail: 'Text-only reasoning model' },
  { model: 'llama-4', task: 'vision', score: 3, benchmarkRef: null, detail: 'Basic multimodal support' },

  // Long Context
  { model: 'claude-opus', task: 'long-context', score: 5, benchmarkRef: '400K context', detail: 'Excellent long-doc processing' },
  { model: 'claude-sonnet', task: 'long-context', score: 4, benchmarkRef: '200K context', detail: 'Very capable with long docs' },
  { model: 'gpt-5.5', task: 'long-context', score: 4, benchmarkRef: '128K context', detail: 'Solid long context' },
  { model: 'gpt-instant', task: 'long-context', score: 3, benchmarkRef: '128K context', detail: 'Same window, faster processing' },
  { model: 'gemini-pro', task: 'long-context', score: 5, benchmarkRef: '1M context', detail: 'Industry-leading context window' },
  { model: 'deepseek-v4', task: 'long-context', score: 3, benchmarkRef: '128K context', detail: 'Standard context window' },
  { model: 'o3', task: 'long-context', score: 3, benchmarkRef: '128K context', detail: 'Focuses on depth, not span' },
  { model: 'llama-4', task: 'long-context', score: 3, benchmarkRef: '128K context', detail: 'Standard for open-source' },

  // Agentic
  { model: 'claude-opus', task: 'agentic', score: 5, benchmarkRef: null, detail: 'Excellent tool use and reasoning' },
  { model: 'claude-sonnet', task: 'agentic', score: 5, benchmarkRef: 'SWE-bench 49%', detail: 'Best-in-class agentic coding' },
  { model: 'gpt-5.5', task: 'agentic', score: 4, benchmarkRef: null, detail: 'Strong function calling' },
  { model: 'gpt-instant', task: 'agentic', score: 3, benchmarkRef: null, detail: 'Fast but less reliable' },
  { model: 'gemini-pro', task: 'agentic', score: 4, benchmarkRef: null, detail: 'Good tool use, improving' },
  { model: 'deepseek-v4', task: 'agentic', score: 3, benchmarkRef: null, detail: 'Basic function calling' },
  { model: 'o3', task: 'agentic', score: 4, benchmarkRef: null, detail: 'Reasoning-first agentic' },
  { model: 'llama-4', task: 'agentic', score: 3, benchmarkRef: null, detail: 'Improving with each release' },

  // Speed
  { model: 'claude-opus', task: 'speed', score: 2, benchmarkRef: null, detail: 'Slowest, but most thoughtful' },
  { model: 'claude-sonnet', task: 'speed', score: 3, benchmarkRef: null, detail: 'Moderate speed' },
  { model: 'gpt-5.5', task: 'speed', score: 4, benchmarkRef: null, detail: 'Fast for frontier quality' },
  { model: 'gpt-instant', task: 'speed', score: 5, benchmarkRef: null, detail: 'Fastest in class, <1s responses' },
  { model: 'gemini-pro', task: 'speed', score: 4, benchmarkRef: null, detail: 'Consistently fast' },
  { model: 'deepseek-v4', task: 'speed', score: 4, benchmarkRef: null, detail: 'Good speed for the price' },
  { model: 'o3', task: 'speed', score: 1, benchmarkRef: null, detail: 'Slow deliberative reasoning' },
  { model: 'llama-4', task: 'speed', score: 3, benchmarkRef: null, detail: 'Varies by deployment' },

  // Cost Efficiency
  { model: 'claude-opus', task: 'cost', score: 2, benchmarkRef: '$15/$75 per 1M', detail: 'Most expensive per token' },
  { model: 'claude-sonnet', task: 'cost', score: 3, benchmarkRef: '$3/$15 per 1M', detail: 'Reasonable for quality' },
  { model: 'gpt-5.5', task: 'cost', score: 3, benchmarkRef: '$2/$8 per 1M', detail: 'Competitive pricing' },
  { model: 'gpt-instant', task: 'cost', score: 4, benchmarkRef: '$0.05/$0.20 per 1M', detail: 'Very cheap, fast' },
  { model: 'gemini-pro', task: 'cost', score: 4, benchmarkRef: '$2/$12 per 1M', detail: 'Good value for long context' },
  { model: 'deepseek-v4', task: 'cost', score: 5, benchmarkRef: '$0.55/$2.19 per 1M', detail: '10-50x cheaper than peers' },
  { model: 'o3', task: 'cost', score: 1, benchmarkRef: '$10-60 per 1M output', detail: 'Most expensive reasoning' },
  { model: 'llama-4', task: 'cost', score: 5, benchmarkRef: 'Free (self-host)', detail: 'Open-source, no API costs' },
];
