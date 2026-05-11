---
title: Builder Learning Path
description: 1-week hands-on guide for developers building AI applications
sidebar:
  order: 3
tags:
  - learning
  - builder
glossaryLinks:
  - api
  - rag
  - agent
  - token
  - embedding
  - vector database
lastUpdated: 2026-05-08
nextVerificationDue: 2026-08-06
---

A practical 1-week path for developers building AI applications. We assume you can code but might be new to LLM APIs.

**Time commitment:** ~10-15 hours spread across 1-2 weeks  
**Prerequisites:** Familiarity with your language of choice (Python, JavaScript, Go, etc.)

---

## Week 1: Day 1-2  -  Choose Your Stack

### Step 1: Pick Your API (30 min)

You have three choices:

**Claude Opus 4.7 (Anthropic)**
- Best for: Reasoning, writing, analysis
- Context window: 400K tokens (read entire books and codebases)
- Cost: $15/$75 per 1M input/output tokens
- When to use: Complex logic, long documents, nuanced writing

**GPT-5.5 (OpenAI)**
- Best for: Fast, all-around, balanced
- Context window: 128K tokens
- Cost: $2/$8 per 1M input/output tokens
- When to use: Speed, cost-efficiency, general tasks

**Gemini 3.1 Pro (Google)**
- Best for: Very long documents, research
- Context window: 1M tokens (entire books, codebases, papers)
- Cost: $2/$12 per 1M tokens (free tier available)
- When to use: Document processing, massive context tasks

**Recommendation for beginners:** Start with Claude Opus or GPT-5.5. Both have free tier + paid options. Claude's documentation and API are excellent.

### Step 2: Set Up Your Environment (30 min)

**Python:**
```bash
pip install anthropic

pip install openai
```

**JavaScript/Node:**
```bash
npm install @anthropic-ai/sdk
# or
npm install openai
```

**Get an API key:**
- Claude: console.anthropic.com (free credits, includes Opus 4.7)
- GPT-5.5: platform.openai.com (free credits)
- Gemini: aistudio.google.com (free tier)

### Step 3: Make Your First Call (1 hour)

**Python with Claude:**
```python
from anthropic import Anthropic

client = Anthropic()
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "What is the capital of France?"}
    ]
)
print(message.content[0].text)
```

**JavaScript with Claude:**
```javascript
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic();
const message = await client.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "What is the capital of France?" }
  ]
});
console.log(message.content[0].text);
```

**What's happening:**
1. You create a client with your API key (read from env)
2. You send a message (one turn of conversation)
3. You get back a response

This works. You've now built an AI assistant.

---

## Week 1: Day 3  -  Build Multi-Turn Conversations

Single messages are limited. Real apps need context. Build a chatbot that remembers previous messages.

**Key insight:** The API is stateless. *You* manage the conversation history.

```python
messages = []

def chat(user_input):
    messages.append({"role": "user", "content": user_input})
    
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=messages
    )
    
    assistant_message = response.content[0].text
    messages.append({"role": "assistant", "content": assistant_message})
    
    return assistant_message

# Usage:
print(chat("What's the capital of France?"))
print(chat("What's the population?"))  # Model remembers France context
print(chat("And its ranking by size?"))  # Can refer back
```

**Important:** Each API call includes the full history. So:
- First message: 1 message sent, 1 response received
- Second message: 3 messages sent (user 1, assistant 1, user 2), 1 response received
- Third message: 5 messages sent (all history + user 3), 1 response received

This is why long conversations get expensive. Solution: context windows or summaries (advanced).

---

## Week 1: Day 4  -  Add Retrieval (RAG Basics)

Now you need your model to know about *your* data. Add a vector database.

**Problem:** LLMs have a training cutoff. Claude Opus 4.7 was trained until April 2024. If you ask about events after that date, it won't know. Use RAG or web-search tools to cover current information.

**Solution:** Upload your data. Then:
1. User asks a question
2. Search your data for relevant snippets
3. Add those snippets to the prompt as context
4. Send to LLM

**Simplest RAG Setup:** For a complete working implementation (chunking, embedding, retrieval, reranking), see the [RAG System Template](/resources/templates/rag-system/). It covers the same pattern with production-ready code.

**What's happening:**
1. Your documents get converted to embeddings (numerical representations)
2. The user's question gets converted to an embedding
3. You find documents with similar embeddings
4. You include those as context in your LLM prompt

**Result:** Your LLM can now answer questions about your data, even if it wasn't in its training set.

**Production options:**
- Chroma: Local, simple, great for prototyping
- Pinecone: Cloud-hosted, scalable, free tier
- Weaviate: Open-source, production-ready

---

## Week 1: Day 5-6  -  Add Structured Output

Your app needs to extract data, not just chat. Make the model return JSON.

**Problem:** LLMs return text. You need structured data.

**Solution:** Use structured output (schema validation).

```python
from anthropic import Anthropic
import json

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "Extract the name and age from: John Smith is 28 years old."
    }],
    # Tell the model the format you want
    system="""You must respond with valid JSON in this format:
    {
        "name": "string",
        "age": "number"
    }
    """
)

text = response.content[0].text
data = json.loads(text)
print(data["name"])  # "John Smith"
print(data["age"])   # 28
```

**Better approach (TypeScript/Zod style schema):**

```python
from pydantic import BaseModel

class Person(BaseModel):
    name: str
    age: int

# Your system prompt tells the model: "Respond with valid JSON that matches this schema"
# Then you parse and validate
```

**Use cases:**
- Extracting entities from text
- Categorizing user input
- Generating structured reports
- Creating API payloads

---

## Week 1: Day 7  -  Production Patterns

Now you have a working app. Make it production-ready.

### Pattern 1: Error Handling

```python
from anthropic import RateLimitError, APIError

try:
    response = client.messages.create(...)
except RateLimitError:
    print("Rate limited. Retry in 60 seconds")
except APIError as e:
    print(f"API error: {e.status_code}")
```

### Pattern 2: Cost Tracking

Always log token usage:

```python
response = client.messages.create(...)
print(f"Input tokens: {response.usage.input_tokens}")
print(f"Output tokens: {response.usage.output_tokens}")
print(f"Cost: ${(response.usage.input_tokens * 3 + response.usage.output_tokens * 15) / 1_000_000:.4f}")
```

### Pattern 3: Caching for Cost Reduction

If you send the same context repeatedly (e.g., uploading a 100-page document), use prompt caching:

```python
# First request (full cost)
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": "You are an expert analyst."
        },
        {
            "type": "text",
            "text": "Here is the document:\n" + huge_document,
            "cache_control": {"type": "ephemeral"}  # Cache this!
        }
    ],
    messages=[{"role": "user", "content": "Summarize this."}]
)

# Second request (90% cheaper for the cached part)
response2 = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system=[
        {"type": "text", "text": "You are an expert analyst."},
        {
            "type": "text",
            "text": "Here is the document:\n" + huge_document,
            "cache_control": {"type": "ephemeral"}  # Reuse cache!
        }
    ],
    messages=[{"role": "user", "content": "Extract key metrics."}]
)
```

### Pattern 4: Async for Scalability

Don't wait for API responses in a loop:

```python
import asyncio

async def ask_question(question):
    response = await client.messages.create(...)
    return response.content[0].text

# Ask 100 questions concurrently
results = await asyncio.gather(*[ask_question(q) for q in questions])
```

---

## Going Deeper

**If you want more advanced patterns:**
- [RAG Architecture](/deep-dive/rag-architecture)  -  Vector databases, chunking strategies
- [Agents & Frameworks](/deep-dive/agents-frameworks)  -  CrewAI, LangChain, autonomous agents
- [Prompt Engineering](/deep-dive/prompt-engineering)  -  Optimization techniques

**Tools for your app:**
- [Tools & Platforms Guide](/decide/tools/guide)  -  Vector DBs, frameworks, monitoring
- [Model Specs](/reference/model-specs)  -  Which model for your use case

**Next steps:**
1. Build a small prototype (RAG chatbot on your docs)
2. Deploy it (Vercel, Railway, AWS Lambda)
3. Add monitoring (error tracking, cost analysis)
4. Scale it (optimize costs, add caching)
