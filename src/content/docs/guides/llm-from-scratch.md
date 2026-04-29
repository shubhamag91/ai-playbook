---
title: Build an LLM from Scratch — Book Summary
description: Notes and summary from "Build a Large Language Model (From Scratch)" by Sebastian Raschka.
---

This guide summarizes key concepts from Sebastian Raschka's book "Build a Large Language Model (From Scratch)" — a practical, code-first journey through building a GPT-like LLM from the ground up.

> **Philosophy**: "I don't understand anything I can't build." — Richard Feynman

## Chapter 1: Understanding Large Language Models

### What is an LLM?

A Large Language Model is a deep neural network trained on vast amounts of text to predict the next word (or token) given previous words. This simple objective, when applied at scale, produces models with remarkable capabilities:

- **Emergent abilities**: Reasoning, translation, coding emerge from scale
- **In-context learning**: Can perform new tasks without explicit training
- **Generative**: Creates human-like text continuations

### Stages of Building an LLM

```
1. Planning & Design → Architecture choice, scale
2. Data Preparation → Collect, clean, tokenize
3. Pretraining → Train on next-token prediction
4. Fine-tuning → Adapt for specific tasks
5. Evaluation → Benchmark performance
6. Deployment → Serve efficiently
```

### Transformer Architecture Overview

```
Input Tokens → Embedding → Transformer Blocks × N → Output
                   ↓
            Positional Encoding
```

Each Transformer block:
- Multi-head self-attention (capture relationships between all tokens)
- Feed-forward network (process attention outputs)
- Residual connections + LayerNorm (stable training)

### GPT vs BERT

| Aspect | GPT | BERT |
|--------|-----|------|
| Architecture | Decoder-only | Encoder-only |
| Training | Next token prediction | Masked language modeling |
| Use case | Generation | Understanding/Classification |
| Examples | GPT-2, GPT-3, GPT-4 | BERT, RoBERTa |

---

## Chapter 2: Working with Text Data

### Tokenization Pipeline

```
Raw Text → Split into Words → Tokenize → Convert to IDs → Add Special Tokens
```

### Byte Pair Encoding (BPE)

BPE is the most common tokenization method:

1. Start with character-level vocabulary
2. Find most frequent adjacent pair
3. Merge into new token
4. Repeat until desired vocabulary size

```python
# Simplified BPE concept
vocab = {"a", "b", "c", ...}  # Start with characters
while len(vocab) < target_size:
    pair = find_most_frequent_consecutive_pair(text)
    vocab.add(pair)
    merge_rule[pair] = new_token_id
```

**Why BPE?**
- Handles out-of-vocabulary words (subword units)
- Efficient vocabulary (vs. character-level)
- Used by GPT-2, GPT-3, GPT-4

### Word Embeddings

Words mapped to dense vectors where similar words are close in embedding space:

```python
# Simple concept
word_embedding["king"] ≈ [0.2, -0.5, 0.8, ...]
word_embedding["queen"] ≈ [0.2, -0.4, 0.9, ...]  # Similar!
word_embedding["king"] - word_embedding["man"] + word_embedding["woman"] ≈ "queen"
```

### Position Embeddings

Since attention has no inherent sense of position, we add positional information:

- **Sinusoidal**: Fixed functions of position (sin/cos)
- **Learned**: Trainable position embeddings

### Sliding Window for Training

```python
# Create training pairs using sliding window
window_size = 512
for i in range(len(text) - window_size):
    input = text[i:i+window_size]
    target = text[i+1:i+window_size+1]
```

---

## Chapter 3: Coding Attention Mechanisms

### The Problem with RNNs

RNNs process sequentially — slow and struggle with long-range dependencies (vanishing gradients).

### Self-Attention

Each token attends to ALL other tokens, computing relevance scores:

```
For each token:
  1. Compute Query (what I'm looking for)
  2. Compute Key (what I offer)
  3. Compute Value (what I contain)
  
  Attention(Q, K, V) = softmax(Q × K^T / √d) × V
```

### Multi-Head Attention

Run multiple attention "heads" in parallel, each learning different relationships:

```python
# Simplified multi-head
num_heads = 8
for head in range(num_heads):
    Q_head = W_Q[head] @ Q
    K_head = W_K[head] @ K
    V_head = W_V[head] @ V
    head_output = Attention(Q_head, K_head, V_head)
output = concat(head_outputs) @ W_O
```

### Causal (Masked) Attention

In decoder-only models, each token can only attend to previous tokens:

```python
# Mask future positions
mask = torch.tril(torch.ones(seq_len, seq_len))
masked_scores = scores.masked_fill(mask == 0, -inf)
```

---

## Chapter 4: Implementing a GPT Model

### Architecture Components

```
GPT Model:
├── Token Embedding Layer
├── Positional Embedding Layer
├── Transformer Blocks × N
│   ├── Multi-Head Attention (causal)
│   ├── LayerNorm
│   ├── Feed-Forward Network (GELU)
│   └── LayerNorm
└── Final LayerNorm → Linear → Softmax
```

### Key Components Implementation

```python
class GPTModel(nn.Module):
    def __init__(self, config):
        self.tok_emb = nn.Embedding(config.vocab_size, config.d_emb)
        self.pos_emb = nn.Embedding(config.ctx_len, config.d_emb)
        self.blocks = nn.ModuleList([TransformerBlock(config) for _ in range(config.n_layers)])
        self.ln = nn.LayerNorm(config.d_emb)
        self.head = nn.Linear(config.d_emb, config.vocab_size, bias=False)
    
    def forward(self, x):
        x = self.tok_emb(x) + self.pos_emb(x)
        for block in self.blocks:
            x = block(x)
        x = self.ln(x)
        return self.head(x)
```

### GELU Activation

```python
def gelu(x):
    return 0.5 * x * (1 + torch.tanh(np.sqrt(2/np.pi) * (x + 0.044715 * x**3)))
```

Used in GPT, BERT — better than ReLU for language tasks.

### Generating Text

```python
def generate(model, idx, max_new_tokens, temperature=1.0, top_k=None):
    for _ in range(max_new_tokens):
        idx_cond = idx[:, -ctx_len:]  # Crop context
        logits = model(idx_cond)
        logits = logits[:, -1, :] / temperature  # Apply temperature
        
        if top_k:
            v, _ = torch.topk(logits, top_k)
            logits[logits < v[:, -1]] = -float('inf')
        
        probs = F.softmax(logits, dim=-1)
        idx_next = torch.multinomial(probs, num_samples=1)
        idx = torch.cat((idx, idx_next), dim=1)
    return idx
```

---

## Chapter 5: Pretraining

### Next-Token Prediction

```python
# Forward pass
logits = model(input_ids)
loss = F.cross_entropy(logits.view(-1, vocab_size), targets.view(-1))

# Backward pass
loss.backward()
optimizer.step()
```

### Loss Calculation

```
Cross-Entropy Loss = -log(probability of correct next token)
```

Lower loss = better model at predicting next token.

### Evaluation: Perplexity

```python
perplexity = exp(loss)
```

Perplexity measures how "surprised" the model is by the test data. Lower = better.

### Text Generation Strategies

| Strategy | Description | Trade-off |
|----------|-------------|-----------|
| **Greedy** | Always pick highest prob | Deterministic, may repeat |
| **Temperature** | Adjust probability distribution | Higher = creative, lower = focused |
| **Top-k** | Sample from top k tokens | Controls diversity |
| **Top-p (nucleus)** | Sample from smallest set with p probability | Adaptive diversity |

### Training Loop Essentials

```python
for epoch in range(num_epochs):
    for batch in train_loader:
        # Forward pass
        logits = model(batch_input)
        loss = F.cross_entropy(logits.view(-1, vocab_size), batch_target)
        
        # Backward pass
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
        
        # Logging
        if batch_num % 100 == 0:
            print(f"Epoch {epoch}, Loss: {loss.item()}")
```

---

## Chapter 6: Fine-tuning for Classification

### Adding a Classification Head

```python
class GPTForClassification(nn.Module):
    def __init__(self, config, num_classes):
        super().__init__()
        self.transformer = GPTModel(config)
        self.classifier = nn.Linear(config.d_emb, num_classes)
    
    def forward(self, x):
        x = self.transformer(x)
        # Use the last token's representation (or mean pooling)
        return self.classifier(x[:, -1, :])
```

### Fine-tuning Process

1. Load pretrained GPT weights
2. Replace output layer for classification
3. Train with lower learning rate (lr = 1e-5 typically)
4. Freeze earlier layers (optional for efficiency)

```python
# Example: fine-tune with lower LR
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-5, weight_decay=0.01)
```

### Evaluation Metrics

- **Accuracy**: % correct predictions
- **Precision/Recall/F1**: For imbalanced classes
- **AUROC**: Discrimination ability

---

## Chapter 7: Fine-tuning to Follow Instructions

### RLHF (Reinforcement Learning from Human Feedback)

Three stages:
1. **SFT (Supervised Fine-tuning)**: Fine-tune on human-written responses
2. **Reward Model**: Train model to predict human preference
3. **PPO**: Optimize model to maximize reward

### Instruction Fine-tuning

```python
# Format: [INST] instruction [/INST] response
formatted_text = f"[INST] {instruction} [/INST] {response}"
```

### DPO (Direct Preference Optimization)

Simpler than RLHF — directly optimize against preference data:

```python
# DPO loss (simplified)
loss = -log(sigmoid(win_loss - lose_loss))
```

---

## Appendix: LoRA (Low-Rank Adaptation)

Efficient fine-tuning by adding small trainable matrices:

```python
# Instead of training full weight matrix W
# Train: W + A × B
# where A is (r × n), B is (m × r), r << min(m,n)

class LoRALayer(nn.Module):
    def __init__(self, in_features, out_features, rank=8):
        super().__init__()
        self.A = nn.Parameter(torch.randn(in_features, rank))
        self.B = nn.Parameter(torch.randn(rank, out_features))
    
    def forward(self, x):
        return x @ (self.A @ self.B)
```

Benefits:
- Reduce fine-tuning compute by 90%+
- Smaller model storage
- Good performance retention

---

## Key Takeaways

1. **LLMs are simple at core**: Next-token prediction at scale produces emergent intelligence
2. **Attention is key**: Self-attention captures long-range dependencies efficiently
3. **Data preparation matters**: Tokenization, embeddings, position encodings are foundational
4. **Pretraining is expensive but one-time**: Fine-tuning is cheap and adaptable
5. **Code understanding**: Building from scratch reveals the "how" behind libraries

## See Also

- [LLM Interview Prep](/cheatsheets/llm-interview/)
- [ML Fundamentals Interview Prep](/cheatsheets/ml-fundamentals-interview/)
- [Prompt Engineering Cheatsheet](/cheatsheets/prompt-engineering/)
- [Transformer Architecture Diagram](/diagrams/rag-architecture/)

---

**Book Reference**: [Build a Large Language Model (From Scratch)](https://www.manning.com/books/build-a-large-language-model-from-scratch) by Sebastian Raschka, Manning Publications, 2024.