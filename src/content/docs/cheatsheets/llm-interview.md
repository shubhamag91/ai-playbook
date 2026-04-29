---
title: LLM Interview Prep
description: Large Language Model interview questions and answers — transformers, attention, RAG, fine-tuning, and production considerations.
---

## GPT Model Evolution (Basic)

| Question | Answer |
|----------|--------|
| **What is the difference between GPT-2 and GPT-3?** | GPT-3 has 175B parameters vs GPT-2's 1.5B. GPT-3 introduced in-context learning (can learn from prompt without fine-tuning). GPT-3 also has better pretraining data, longer context (2K vs 1K), and improved training techniques. |
| **What is the difference between GPT-3 and GPT-3.5?** | GPT-3.5 is GPT-3 fine-tuned with RLHF (InstructGPT). This made it follow instructions better, be more helpful, and safer. Also added ChatGPT interface. |
| **What is the difference between GPT-3.5 and GPT-4?** | GPT-4 is multimodal (accepts images), has larger context (32K/128K), is more capable at reasoning, and uses mixture of experts architecture (rumored). GPT-4 is more accurate and has better instruction following. |
| **What is GPT-4o vs GPT-4?** | GPT-4o ("omni") is faster and cheaper while matching GPT-4 capability. It natively processes text, audio, and vision. GPT-4o mini is the efficient version. |
| **What is the difference between GPT-4 and Claude 3?** | Claude 3 has stronger safety alignment, excellent long context (200K), and excels at complex reasoning. GPT-4 has larger ecosystem, more fine-tuned tools. Both are top-tier. |
| **What is the difference between GPT-4 and Gemini 1.5?** | Gemini has 1M token context (larger than GPT-4's 128K), excellent multimodal, native Google integration. GPT-4 has more mature API ecosystem. |
| **What is LLaMA vs GPT?** | LLaMA is Meta's open-weight model (can run locally). GPT is OpenAI's API (closed). LLaMA enables fine-tuning and self-hosting but requires more setup. |
| **What is Mistral vs LLaMA?** | Mistral is a French startup with competitive open models (Mistral 7B, Mixtral). Mixtral uses mixture of experts. Comparable to LLaMA, sometimes faster. |
| **What is DeepSeek?** | Chinese model with open weights (MIT license). DeepSeek R1 matches OpenAI o1 on reasoning, very affordable API. Strong open-source alternative. |
| **PM**: How do you compare LLM pricing? | Check per-1M-token costs for input/output. GPT-4o mini ~$0.15/$0.60, Claude Sonnet ~$3/$15, Gemini Flash ~$0.075/$0.30. Factor in token efficiency (some models need fewer tokens for same task). |

## LLM Basics (Fundamentals)

| Question | Answer |
|----------|--------|
| **What is a language model?** | A model that predicts the probability of sequences of text. Given previous words, it predicts what comes next. Trained on massive text data. |
| **What is a Large Language Model (LLM)?** | A language model with billions of parameters, trained on huge amounts of text. Exhibits emergent capabilities like reasoning, following instructions. |
| **What is the difference between a base model and a chat model?** | Base model: predicts next token (like advanced autocomplete). Chat model: fine-tuned to be helpful, follow instructions, respond in conversational format. |
| **What is a foundation model?** | A large model pretrained on massive data, that can be adapted to many tasks. GPT, BERT, LLaMA are foundation models. |
| **What is the difference between generative and discriminative models?** | Generative: models probability of entire sequence (what comes next). Discriminative: models probability of label given input (classification). LLMs are generative. |
| **What are tokens and how are they processed?** | Text is split into tokens (words, subwords, or characters). Each token maps to an integer ID. Model processes these as embeddings, predicts next token. |
| **What is temperature?** | Controls randomness in generation. Low (0.1-0.3) = focused, deterministic. High (0.7-1.0) = creative, varied. |
| **What is a system prompt?** | Instructions at the start of conversation that set model behavior. Applied to all subsequent turns. |
| **What is a context window?** | Maximum tokens model can see at once (input + output). Includes conversation history and retrieved documents. |
| **What is the difference between training and inference?** | Training: learning parameters from data (compute-intensive, one-time). Inference: using trained model to make predictions (what happens in production). |
| **What is zero-shot learning?** | Model performs task without any examples in prompt. Relies on pretraining knowledge. |
| **What is few-shot learning?** | Model learns from 2-5 examples in the prompt. Shows task format without fine-tuning. |
| **What is in-context learning?** | Model adapts to task during a single conversation using examples in the prompt. Weights stay same, prompt provides context. |
| **What is the difference between a parameter and a token?** | Parameter: learned weight in neural network (determines model capability). Token: unit of text the model processes. More parameters = more capable model. |
| **Scientist**: How does model size affect capabilities? | Larger models (more parameters) tend to have better emergent abilities, reasoning, and knowledge. But also more compute for training/inference. |

## Transformer Architecture

| Question | Answer |
|----------|--------|
| **What is the Transformer architecture?** | Introduced in "Attention Is All You Need" (2017). Uses self-attention to process sequences in parallel, replacing recurrence. Consists of encoder-decoder stack with multi-head attention, feed-forward networks, residual connections, and layer normalization. |
| **Why did Transformers replace RNNs?** | RNNs process sequentially (slow, hard to parallelize) and struggle with long-range dependencies due to vanishing gradients. Transformers process all tokens in parallel and use attention to directly model relationships between any two positions, regardless of distance. |
| **What are the key components of a Transformer?** | Multi-head attention, feed-forward networks, positional encodings, residual connections, layer normalization, and (for encoder-decoder) cross-attention. |
| **What is the difference between encoder-only, decoder-only, and encoder-decoder models?** | Encoder-only (BERT): Processes input, good for understanding tasks. Decoder-only (GPT): Generates output token-by-token, good for generation. Encoder-decoder (T5, BART): Both encode input and decode output, good for seq-to-seq tasks. |
| **What is positional encoding?** | A way to inject sequence order information since attention has no inherent notion of position. Options: sinusoidal (fixed), learned embeddings, or rotary position embeddings (RoPE). |
| **What is layer normalization and why is it important?** | Normalizes activations across features within each sample. Stabilizes training, enables higher learning rates, and helps with gradient flow. Unlike batch norm, works well with variable sequence lengths. |
| **Engineer**: How would you implement a transformer layer from scratch? | Need Q/K/V projections, multi-head attention computation (scaled dot-product), feed-forward network (two linear layers with activation), dropout, and layer norm around residual connections. |
| **Scientist**: How do Transformers capture different types of relationships? | Multi-head attention allows the model to attend to different representation subspaces simultaneously — one head might capture syntactic relationships, another semantic, another positional. |

## Self-Attention Mechanism

| Question | Answer |
|----------|--------|
| **What is self-attention?** | A mechanism where each position in a sequence attends to all positions in the same sequence. Computes attention weights based on learned representations (queries, keys, values). |
| **Explain Q, K, V in attention.** | Query: what the current token is looking for. Key: what each token offers. Value: what each token contains. Attention score = dot product of Query and Key, scaled by sqrt(d_k), softmaxed, then weighted sum of Values. |
| **Why is scaled dot-product attention used?** | Without scaling, dot products grow with dimension, pushing softmax into regions with extremely small gradients. Scaling by sqrt(d_k) maintains reasonable variance. |
| **What is multi-head attention?** | Runs multiple attention "heads" in parallel, each with separate Q/K/V projections. Concatenates outputs. Allows modeling different types of relationships simultaneously. |
| **What is causal (masked) attention?** | In decoder-only models, each token can only attend to previous tokens (not future). Implemented by masking out attention scores for future positions. |
| **What is cross-attention?** | In encoder-decoder models, decoder attends to encoder's output. Query comes from decoder, Key/Value from encoder. Allows generation to condition on input. |
| **Engineer**: How do you optimize attention for long contexts? | Options: sparse attention (only attend to subset), linear attention (approximations), sliding window, flash attention (IO-aware implementation). For inference: KV-cache management. |
| **Scientist**: How does attention change across layers?** | Early layers tend to capture local patterns (syntax, word-level). Deeper layers capture more global, semantic relationships. Some papers show last layers more task-specific. |

## Tokenization & Embeddings

| Question | Answer |
|----------|--------|
| **What is tokenization?** | Converting raw text into integer token IDs that the model can process. Critical preprocessing step. |
| **Compare BPE, WordPiece, and SentencePiece.** | BPE (Byte-Pair Encoding): Merges most frequent adjacent pairs. WordPiece: Similar but uses likelihood to pick merges. SentencePiece: Treats text as byte stream, handles unknown chars, no whitespace pre-processing. |
| **Why use subword tokenization?** | Balances vocabulary size vs. handling rare/unseen words. Character-level too verbose, word-level too many OOV issues. |
| **What is vocabulary size and why does it matter?** | Number of unique tokens in tokenizer. Larger = more parameters for embeddings, but better coverage. Too small = many tokens map to unknown. |
| **What are token embeddings?** | Learned vectors representing each token. Each token ID maps to a dense vector learned during pretraining. |
| **What is positional embedding?** | Adds position information to token embeddings. Can be sinusoidal (fixed functions), learned, or newer methods like RoPE (rotary). |
| **How does tokenization affect cost and latency?** | APIs charge per token. More efficient tokenization = fewer tokens = lower cost and faster inference. Also affects context window utilization. |
| **What is the tokenizer's role in multilingual models?** | Must handle different scripts, word boundaries, character sets. SentencePiece works well for this. Some models use byte-level encoding for full Unicode coverage. |
| **Engineer**: How do you debug tokenization issues? | Check tokenizer output, compare token counts across similar texts, look for unexpected special tokens, verify vocabulary includes your domain-specific terms. |

## Autoregressive Generation

| Question | Answer |
|----------|--------|
| **How does autoregressive generation work?** | Model generates one token at a time. Each new token is conditioned on all previous tokens. Process repeats until EOS token or max length. |
| **What is the difference between greedy and sampling decoding?** | Greedy: always pick highest probability token. Sampling: sample from probability distribution (adds randomness, more diverse). |
| **What is temperature in generation?** | Controls probability distribution shape. Low temp = peaked (deterministic). High temp = flattened (random). Temperature 0 = greedy. |
| **What is top-k and top-p (nucleus) sampling?** | Top-k: only consider k most likely tokens. Top-p: consider smallest set of tokens whose cumulative probability exceeds p. Top-p often better. |
| **What is beam search?** | Maintains multiple partial sequences (beams), expands each step, keeps top-n. More exploration than greedy, can find better sequences. |
| **What is the difference betweengreedy and beam search?** | Greedy: one path, fast but suboptimal. Beam: explores multiple paths, better but slower. Can combine with length/normalization penalties. |
| **Engineer**: How do you implement KV caching?** | Cache Key and Value matrices from previous tokens to avoid recomputing attention for the full context at each step. Essential for efficient long-context inference. |
| **PM**: How do you choose decoding strategy?** | Use greedy for deterministic tasks (code, facts). Use temperature/top-p for creative tasks (writing, brainstorming). Consider latency trade-offs. |

## Fine-Tuning & Training

| Question | Answer |
|----------|--------|
| **What is pretraining vs fine-tuning?** | Pretraining: training from scratch on massive unlabeled text (next token prediction). Fine-tuning: continuing training on task-specific labeled data. |
| **What is instruction fine-tuning?** | Fine-tuning on datasets of instruction-following examples (prompt + response). Turns base model into helpful assistant. |
| **What is LoRA (Low-Rank Adaptation)?** | Adds small trainable rank decomposition matrices to attention weights. Frozen pretrained weights + small adapters. Memory-efficient, works well. |
| **What is QLoRA?** | Quantized LoRA. Quantizes base model to 4-bit during training, further reducing memory. Enables fine-tuning large models on single GPU. |
| **What is PEFT (Parameter-Efficient Fine-Tuning)?** | Methods that fine-tune few parameters instead of full model. Includes LoRA, prefix tuning, adapter layers. |
| **What is model distillation?** | Training a smaller "student" model to mimic a larger "teacher" model. Teacher's logits or hidden states guide student training. |
| **Engineer**: How do you choose between full fine-tuning vs LoRA?** | Full fine-tuning: more capacity, but GPU-intensive. LoRA: less compute, but may not match full fine-tuning quality. Start with LoRA for efficiency, scale up if needed. |
| **Scientist**: How do you prevent catastrophic forgetting?** | Add relevant pretraining data to fine-tuning mix, use lower learning rate, consider merging (adding) adapter weights vs replacing. |

## RLHF & Alignment

| Question | Answer |
|----------|--------|
| **What is RLHF (Reinforcement Learning from Human Feedback)?** | Alignment technique using human feedback. Three stages: SFT (supervised fine-tuning), reward model training, PPO optimization. |
| **Why use RLHF?** | Pretraining optimizes next-token prediction (not "helpful"). RLHF adds a step to make model outputs more helpful, harmless, and aligned with human preferences. |
| **What are the stages of RLHF?** | 1) SFT: Fine-tune on demonstrations. 2) Reward Model: Train on human preference comparisons. 3) PPO: Optimize policy against reward model with KL penalty. |
| **What is DPO (Direct Preference Optimization)?** | Simpler than RLHF. Directly optimizes against preference data using a simple logistic loss. No separate reward model or PPO. Works surprisingly well. |
| **What is Constitutional AI?** | AI-generated principles that guide model behavior. Model critiques own outputs against principles, then revises. Reduces reliance on human labeling. |
| **What is RLAIF?** | Reinforcement Learning from AI Feedback. Uses AI (instead of humans) to generate preference labels. Scalable but may inherit model biases. |
| **Engineer**: How does RLHF compare to DPO in practice?** | DPO simpler to implement, less compute, often comparable results. RLHF more flexible, better for complex reward functions. |
| **PM**: Why does alignment matter for AI products?** | Aligned models produce safer, more helpful outputs. Reduces liability, improves user trust, necessary for consumer-facing products. |

## RAG (Retrieval-Augmented Generation)

| Question | Answer |
|----------|--------|
| **What is RAG and why use it?** | Combines retrieval of external documents with LLM generation. Solves: knowledge cutoff, hallucination, and allows domain-specific knowledge without retraining. |
| **What are the components of a RAG pipeline?** | 1) Data ingestion: load docs, chunk, embed, store in vector DB. 2) Retrieval: embed query, similarity search. 3) Generation: augment prompt with retrieved context, generate. |
| **What are common chunking strategies?** | Fixed size (simple but may break semantic units), semantic (split at natural boundaries), recursive (hierarchical), sliding window with overlap. |
| **What is the "lost in the middle" problem?** | In long contexts, models struggle to attend to information in the middle. Relevant context may be ignored. Mitigate: recent docs first, reranking, query decomposition. |
| **What are hybrid retrieval methods?** | Combines dense (semantic/vector) and sparse (keyword/BM25) retrieval. Dense catches semantic matches, sparse catches exact keyword matches. |
| **What is reranking in RAG?** | After initial retrieval, use a cross-encoder to re-score and reorder results for better relevance. Adds latency but improves quality. |
| **How do you choose embedding models?** | Consider: dimension (affects storage/quality), multilingual support, domain specialization, and latency. Popular: sentence-transformers, OpenAI embeddings. |
| **Engineer**: How do you handle documents that update frequently?** | Version control for embeddings, incremental indexing, or use document hash to detect changes. Consider near-real-time indexing pipeline. |
| **Engineer**: How do you scale RAG for large document collections?** | Use hierarchical retrieval (top-level + detail), chunk-level metadata filtering, or build index on top of search engine (Elasticsearch + vector). |
| **PM**: When would you choose RAG vs fine-tuning?** | RAG: recent info, large docs, cost-sensitive, need explainability. Fine-tuning: need specific style, task-specific patterns, offline use case. Often both together. |

## Hallucination & Evaluation

| Question | Answer |
|----------|--------|
| **What is hallucination in LLMs?** | Model generates factually incorrect or nonsensical content. Types: intrinsic (contradicts input) and extrinsic (unsupported by facts). |
| **How do you reduce hallucination?** | RAG with grounding documents, chain-of-thought prompting, self-consistency checks, retrieval post-processing, fine-tuning on factual data. |
| **What evaluation metrics exist for LLMs?** | Automated: perplexity, BLEU, ROUGE (weak for generation). LLM-as-judge: have another LLM rate outputs. Human evaluation remains gold standard. |
| **What is RAGAS?** | RAG-specific evaluation: measures retrieval relevance, answer faithfulness to context, and answer relevance to question. |
| **How do you evaluate factual accuracy?** | Use knowledge bases as ground truth, extract claims and verify against trusted sources, or use fine-tuned models as fact checkers. |
| **What are the challenges with LLM evaluation?** | No single "right" answer for many tasks, human evaluation is slow/expensive, metrics don't capture harmfulness or bias. |
| **Engineer**: How do you set up A/B testing for LLMs?** | Randomize users, track metrics (engagement, task success, error rate), monitor for regressions. Consider different models, prompts, or retrieval strategies. |
| **PM**: What metrics matter for AI products?** | Task completion rate, user satisfaction (CSAT/NPS), error rate by severity, latency, cost per query. Tie to business KPIs. |

## Context Window & Memory

| Question | Answer |
|----------|--------|
| **What is context window?** | Maximum number of tokens model can process in a single forward pass. Includes input + output. |
| **How do you handle longer contexts than the window?** | Sliding window (lose early context), recurrence (compress and pass), or hierarchical (summarize chunks, combine). |
| **What is the difference between in-context learning and fine-tuning?** | In-context: model learns from examples in the prompt (no weight changes). Fine-tuning: model learns from examples via weight updates. |
| **What are system prompts?** | High-priority instructions at start of conversation that apply to all turns. Used to set behavior, format, or constraints. |
| **Engineer**: How do you manage conversation history?** | Summarize old messages, use hierarchical approach (summary + recent), or simple truncation (keep last N messages). |

## Prompt Engineering

| Question | Answer |
|----------|--------|
| **What is prompt engineering?** | Crafting inputs to get desired outputs. Includes instruction design, example selection, format specification. |
| **What is chain-of-thought (CoT)?** | Prompting model to "think step by step" or show reasoning before answer. Improves complex reasoning tasks. |
| **What is few-shot prompting?** | Including 2-5 examples in the prompt to guide output format/style. Better than zero-shot for complex tasks. |
| **What is ReAct prompting?** | Interleaves reasoning (thought) with actions (tool use) and observations. Useful for agents. |
| **What are the best practices for prompting?** | Be specific and clear, use delimiters, specify output format, put instructions before examples, include "if unsure, say I don't know". |
| **Engineer**: How do you version prompts?** | Track in code (not just LLM provider UI), use prompt registry, A/B test variations, monitor performance by version. |
| **PM**: How do you write prompts for non-technical users?** | Test with target users, make instructions simple, provide templates, handle edge cases gracefully. |

## Agentic Patterns

| Question | Answer |
|----------|--------|
| **What is an LLM agent?** | System that uses LLM to plan, use tools, and take actions in a loop. Beyond single prompt-response. |
| **What is tool use in LLM agents?** | Model can call external functions (search, code execution, API calls) based on user request. Returns results back to model. |
| **What is the ReAct pattern?** | Alternates between Reasoning (thought) → Action (tool call) → Observation (result). Enables structured problem solving. |
| **What are common agent architectures?** | Single-agent (one model loops), multi-agent (multiple specialized agents collaborate), plan-then-execute (plan first, then act). |
| **Engineer**: How do you handle agent failures?** | Retry with backoff, fallback to different strategy, max iteration limits, human-in-the-loop for ambiguous cases. |
| **PM**: When are agents appropriate vs simple RAG?** | Agents: multi-step tasks, need external tools, complex reasoning. Simple RAG: single question-answer from documents. |

## Production & Cost

| Question | Answer |
|----------|--------|
| **How do you estimate LLM API costs?** | (Input tokens × input price + output tokens × output price) per 1M tokens. Check provider pricing pages. Costs vary widely by model. |
| **What is quantization?** | Reducing model precision (e.g., 16-bit → 4-bit) to reduce memory and speed up inference with minimal quality loss. |
| **What are common inference optimizations?** | Quantization, batching, KV caching, speculative decoding, model distillation, pruning. |
| **How do you handle rate limits?** | Implement backoff/retry, use multiple API keys, queue requests, consider rate limit increase requests. |
| **What is the difference between API and self-hosted?** | API: easy, pay-per-use, latest models, vendor lock-in. Self-hosted: control, no per-token cost at scale, requires ML ops expertise. |
| **Engineer**: How do you monitor LLM production systems?** | Track: latency, error rates, token usage, cost, quality metrics (drift detection), and specific failure modes (hallucination rate). |
| **PM**: How do you budget for LLM costs?** | Estimate tokens per user × expected users × price. Monitor actual usage, optimize prompts, consider caching for repeated queries. |

## Emerging Topics

| Question | Answer |
|----------|--------|
| **What are mixture of experts (MoE) models?** | Architecture with multiple specialized "experts" and a router that selects which experts to use for each token. More capacity with less compute. |
| **What are state space models (SSMs)?** | Alternative to transformers (like Mamba). Process tokens sequentially but with better long-range efficiency. Still evolving. |
| **What is function calling / tool use?** | Models can call predefined functions with structured arguments. Enables integration with external systems. |
| **What are the key differences between GPT-4, Claude, and Gemini?** | Different strengths: GPT-4 (general, ecosystem), Claude (safety, long context), Gemini (multimodal, native integration). |
| **PM**: How do you choose which LLM to use?** | Consider: task fit (reasoning vs generation), cost, context length, safety, API availability, and team expertise. |

## Diagrams

### Transformer

```
Input → Embedding → Attention → Feed Forward → Output
            ↓
      Positional Encoding
```

### Attention

```
Query × Key → Softmax → Attention Weights → Output
     ↓
  Scale by √dₖ
```

### RAG Pipeline

```
Ingestion: Docs → Chunk → Embed → Vector DB
Query:      Query → Embed → Search → Rerank → Prompt → LLM → Response
```

## Practice Questions

### Scenario-Based

| Question | Hint |
|----------|------|
| Your RAG system returns irrelevant documents 30% of the time. How would you diagnose and fix this? | Consider: chunking strategy, embedding model, retrieval algorithm, reranking |
| The LLM keeps hallucinating on factual questions. What techniques would you use to reduce this? | Think: RAG, retrieval quality, prompting techniques, fine-tuning |
| You need to serve 10K concurrent users with <200ms latency. How would you architect this? | Consider: model selection, caching, batching, scaling |
| How would you decide between fine-tuning an LLM vs using RAG for your use case? | Think: data freshness, cost, complexity, accuracy needs |
| Your model works well in English but poorly in Spanish. What's likely wrong and how do you fix it? | Consider: tokenizer coverage, training data, multilingual models |

### "Explain This Concept" Quick Questions

- Explain the attention mechanism to a non-technical person
- What is the difference between transformers and RNNs?
- Why does scaling model size lead to emergent capabilities?
- What is the "lost in the middle" problem in RAG?
- How does RLHF align models with human preferences?

### Advanced Reasoning Questions

| Question | What It Tests |
|----------|---------------|
| You ask an LLM a math problem. It gives the wrong answer. Why might this happen? | Understanding LLM limitations, tokenization issues with numbers |
| How would you reduce hallucinations in a medical Q&A system? | RAG, grounding, evaluation, safety |
| What happens inside the model when you increase temperature from 0 to 1? | Sampling mechanics, randomness |
| Why might a model fail on non-English languages? | Tokenization, training data, embedding space |
| How would you debug why the model is repeating itself? | Decoding strategies, attention patterns |

### Whiteboard Coding Questions

| Question | What to Code |
|----------|--------------|
| Implement scaled dot-product attention from scratch | Attention mechanism |
| Write a function to tokenize text using BPE | Tokenization logic |
| Implement a simple GPT forward pass | Transformer forward |
| Calculate perplexity from cross-entropy loss | Evaluation metric |
| Write a text generation function with temperature | Sampling |

### Production Troubleshooting Scenarios

| Scenario | Debug Approach |
|----------|---------------|
| LLM latency increased from 500ms to 3s | Check model loading, batch size, rate limits, embeddings |
| Model started generating toxic content | Check input sanitization, system prompt, data drift |
| Retrieval returning irrelevant documents | Check embedding quality, chunking, vector DB index |
| Token costs doubled this month | Analyze prompt lengths, caching, usage patterns |
| Model performance degraded on weekends | Check data distribution, user patterns, model updates |

## Quick Reference Cards

### LLM Decision Matrix

| Need | Recommended Approach |
|------|----------------------|
| Latest knowledge | RAG |
| Specific style/tone | Fine-tuning |
| Low cost | Smaller models, caching |
| Long context | Claude 3, Gemini 1.5 |
| Code generation | GPT-4, Claude |
| Safety-critical | Claude, RLHF/DPO |
| Self-hosting | LLaMA, Mistral, DeepSeek |

### Decoding Strategy Comparison

| Strategy | Use When | Temperature |
|----------|----------|-------------|
| **Greedy** | Code, factual Q&A | 0 |
| **Temperature 0.1-0.3** | Customer support | Low |
| **Temperature 0.7-1.0** | Creative writing | Medium |
| **Top-k** | Controlled creativity | N/A |
| **Top-p (nucleus)** | Balanced generation | N/A |
| **Beam search** | Translation, summarization | 0 |

### Token Cost Comparison (per 1M tokens)

| Model | Input | Output |
|-------|-------|--------|
| GPT-4o mini | $0.15 | $0.60 |
| GPT-4o | $2.50 | $10.00 |
| Claude Sonnet | $3.00 | $15.00 |
| Gemini Flash | $0.075 | $0.30 |
| Claude Haiku | $0.25 | $1.25 |

## External Resources

### Essential Papers

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) - Transformer original paper
- [BERT: Pre-training of Deep Bidirectional Transformers](https://arxiv.org/abs/1810.04805) - BERT paper
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) - GPT-3 paper
- [Training language models to follow instructions](https://arxiv.org/abs/2203.02155) - InstructGPT/RLHF

### Learning Resources

- [Karpathy's Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero/) - Build GPT from scratch
- [Jay Mody's CUDA Python](https://github.com/jaymody/cuda-python) - GPU programming for LLMs
- [Lil'Log](https://lilianweng.github.io/blog/) - Deep Learning blog

### Practice Platforms

- [LangChain Academy](https://academy.langchain.com/) - LLM development
- [Vercel AI SDK](https://vercel.com/ai) - Build AI apps
- [OpenAI Cookbook](https://cookbook.openai.com/) - Examples and guides

## See Also

- [ML Fundamentals Interview Prep](/cheatsheets/ml-fundamentals-interview/)
- [AI System Design Interview Prep](/cheatsheets/ai-system-design-interview/)
- [Behavioral Interview Prep](/cheatsheets/behavioral-interview/)
- [AI Product Interview Prep](/cheatsheets/ai-product-interview/)
- [Banking Analytics Interview Prep](/cheatsheets/banking-analytics-interview/)
- [Prompt Engineering Cheatsheet](/cheatsheets/prompt-engineering/)
- [RAG Architecture Diagram](/diagrams/rag-architecture/)