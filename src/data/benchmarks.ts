export const benchmarkData = [
  // === Coding ===
  { model: 'Claude 4 Opus', family: 'Claude', category: 'coding', benchmark: 'HumanEval', score: 96.2, date: '2026-03' },
  { model: 'Claude Sonnet 4.6', family: 'Claude', category: 'coding', benchmark: 'HumanEval', score: 93.7, date: '2026-05' },
  { model: 'GPT-5.5', family: 'GPT', category: 'coding', benchmark: 'HumanEval', score: 95.1, date: '2026-04' },
  { model: 'GPT-5.5 Instant', family: 'GPT', category: 'coding', benchmark: 'HumanEval', score: 92.8, date: '2026-05' },
  { model: 'Gemini 3.1 Pro', family: 'Gemini', category: 'coding', benchmark: 'HumanEval', score: 94.0, date: '2026-04' },
  { model: 'DeepSeek V4', family: 'DeepSeek', category: 'coding', benchmark: 'HumanEval', score: 91.5, date: '2026-05' },
  { model: 'Llama 4 405B', family: 'Llama', category: 'coding', benchmark: 'HumanEval', score: 90.2, date: '2026-03' },
  { model: 'Mistral Large 3', family: 'Mistral', category: 'coding', benchmark: 'HumanEval', score: 87.4, date: '2026-04' },

  // === Math ===
  { model: 'Claude 4 Opus', family: 'Claude', category: 'math', benchmark: 'MATH', score: 96.8, date: '2026-03' },
  { model: 'Claude Sonnet 4.6', family: 'Claude', category: 'math', benchmark: 'MATH', score: 94.2, date: '2026-05' },
  { model: 'GPT-5.5', family: 'GPT', category: 'math', benchmark: 'MATH', score: 95.5, date: '2026-04' },
  { model: 'GPT-5.5 Instant', family: 'GPT', category: 'math', benchmark: 'MATH', score: 92.1, date: '2026-05' },
  { model: 'Gemini 3.1 Pro', family: 'Gemini', category: 'math', benchmark: 'MATH', score: 96.0, date: '2026-04' },
  { model: 'DeepSeek V4', family: 'DeepSeek', category: 'math', benchmark: 'MATH', score: 93.8, date: '2026-05' },
  { model: 'o3', family: 'OpenAI', category: 'math', benchmark: 'MATH', score: 97.9, date: '2026-02' },
  { model: 'Llama 4 405B', family: 'Llama', category: 'math', benchmark: 'MATH', score: 89.6, date: '2026-03' },

  // === Knowledge ===
  { model: 'Claude 4 Opus', family: 'Claude', category: 'knowledge', benchmark: 'MMLU', score: 92.4, date: '2026-03' },
  { model: 'Claude Sonnet 4.6', family: 'Claude', category: 'knowledge', benchmark: 'MMLU', score: 90.1, date: '2026-05' },
  { model: 'GPT-5.5', family: 'GPT', category: 'knowledge', benchmark: 'MMLU', score: 91.8, date: '2026-04' },
  { model: 'GPT-5.5 Instant', family: 'GPT', category: 'knowledge', benchmark: 'MMLU', score: 89.3, date: '2026-05' },
  { model: 'Gemini 3.1 Pro', family: 'Gemini', category: 'knowledge', benchmark: 'MMLU', score: 91.5, date: '2026-04' },
  { model: 'DeepSeek V4', family: 'DeepSeek', category: 'knowledge', benchmark: 'MMLU', score: 89.8, date: '2026-05' },
  { model: 'Llama 4 405B', family: 'Llama', category: 'knowledge', benchmark: 'MMLU', score: 88.2, date: '2026-03' },

  // === Grad-Level Reasoning ===
  { model: 'Claude 4 Opus', family: 'Claude', category: 'reasoning', benchmark: 'GPQA', score: 84.6, date: '2026-03' },
  { model: 'Claude Sonnet 4.6', family: 'Claude', category: 'reasoning', benchmark: 'GPQA', score: 79.8, date: '2026-05' },
  { model: 'GPT-5.5', family: 'GPT', category: 'reasoning', benchmark: 'GPQA', score: 82.1, date: '2026-04' },
  { model: 'Gemini 3.1 Pro', family: 'Gemini', category: 'reasoning', benchmark: 'GPQA', score: 81.5, date: '2026-04' },
  { model: 'DeepSeek V4', family: 'DeepSeek', category: 'reasoning', benchmark: 'GPQA', score: 76.4, date: '2026-05' },
  { model: 'o3', family: 'OpenAI', category: 'reasoning', benchmark: 'GPQA', score: 87.3, date: '2026-02' },
  { model: 'Llama 4 405B', family: 'Llama', category: 'reasoning', benchmark: 'GPQA', score: 73.1, date: '2026-03' },
];

export const benchmarkMeta = {
  HumanEval: { label: 'HumanEval', category: 'coding', description: 'Code generation pass rate' },
  MATH: { label: 'MATH', category: 'math', description: 'Math problem solving (high school)' },
  MMLU: { label: 'MMLU', category: 'knowledge', description: 'Multitask language understanding' },
  GPQA: { label: 'GPQA', category: 'reasoning', description: 'Graduate-level QA' },
};

export const categories = [
  { id: 'all', label: 'All Benchmarks' },
  { id: 'coding', label: 'Coding' },
  { id: 'math', label: 'Math' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'reasoning', label: 'Reasoning' },
];

export const families = ['All', 'Claude', 'GPT', 'Gemini', 'DeepSeek', 'Llama', 'Mistral', 'OpenAI'];
