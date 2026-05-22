#!/usr/bin/env python3
"""Generate AI Playbook presentation slides (pptx)."""
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
import os

ACCENT  = RGBColor(0x3B, 0x82, 0xF6)
WHITE   = RGBColor(0xFF, 0xFF, 0xFF)
DARK    = RGBColor(0x0F, 0x11, 0x17)
GRAY    = RGBColor(0x9B, 0xA3, 0xBF)
LGRAY   = RGBColor(0xE4, 0xE6, 0xF0)
DGRAY   = RGBColor(0x18, 0x1C, 0x27)

prs = Presentation()
prs.slide_width  = Inches(13.333)
prs.slide_height = Inches(7.5)

def dark_slide():
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = DARK
    return slide

def add_title(slide, text, font_size=40, color=WHITE, top=Inches(2.0), bold=False, align=PP_ALIGN.CENTER):
    txBox = slide.shapes.add_textbox(Inches(1.5), top, Inches(10.3), Inches(2.0))
    tf = txBox.text_frame; tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text; p.font.size = Pt(font_size); p.font.color.rgb = color
    p.font.bold = bold; p.alignment = align
    return txBox

def add_body(slide, lines, left=Inches(1.5), top=Inches(1.5), width=Inches(10.3), font_size=18, color=LGRAY, spacing=Pt(24)):
    txBox = slide.shapes.add_textbox(left, top, width, Inches(5.0))
    tf = txBox.text_frame; tf.word_wrap = True
    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = line; p.font.size = Pt(font_size); p.font.color.rgb = color
        p.space_after = spacing
        if line.startswith("  "): p.level = 1; p.font.size = Pt(font_size - 2)
    return txBox

def add_table(slide, headers, rows, left=Inches(1.5), top=Inches(1.8), width=Inches(10.3), row_height=Inches(0.55)):
    n_rows, n_cols = len(rows) + 1, len(headers)
    tbl = slide.shapes.add_table(n_rows, n_cols, left, top, width, row_height * n_rows).table
    tbl.columns[0].width = Inches(2.2)
    for i in range(1, n_cols): tbl.columns[i].width = Inches((10.3 - 2.2) / (n_cols - 1))
    for j, h in enumerate(headers):
        c = tbl.cell(0, j); c.text = h
        for p in c.text_frame.paragraphs: p.font.size = Pt(14); p.font.color.rgb = WHITE; p.font.bold = True
        c.fill.solid(); c.fill.fore_color.rgb = DGRAY
    for i, row in enumerate(rows):
        for j, val in enumerate(row):
            c = tbl.cell(i + 1, j); c.text = str(val)
            for p in c.text_frame.paragraphs: p.font.size = Pt(12.5); p.font.color.rgb = LGRAY
            if i % 2 == 0: c.fill.solid(); c.fill.fore_color.rgb = RGBColor(0x14, 0x17, 0x20)
    return tbl

def section_slide(title_text, subtitle_text=""):
    slide = dark_slide()
    slide.background.fill.solid(); slide.background.fill.fore_color.rgb = RGBColor(0x09, 0x0D, 0x15)
    bar = slide.shapes.add_shape(1, Inches(1.5), Inches(3.0), Inches(10.3), Pt(4))
    bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
    add_title(slide, title_text, 36, WHITE, Inches(3.3), True)
    if subtitle_text: add_title(slide, subtitle_text, 18, GRAY, Inches(4.3))
    return slide

def bullet_slide(title_text, bullets, top=Inches(1.8)):
    slide = dark_slide()
    add_title(slide, title_text, 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
    bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
    bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
    add_body(slide, ["\u2022 " + b for b in bullets], Inches(1.5), top, Inches(10.3), 16, LGRAY, Pt(18))
    return slide

def footer_text(slide, text):
    txBox = slide.shapes.add_textbox(Inches(1.0), Inches(7.0), Inches(11.3), Inches(0.4))
    p = txBox.text_frame.paragraphs[0]
    p.text = text; p.font.size = Pt(10); p.font.color.rgb = GRAY; p.alignment = PP_ALIGN.RIGHT

# ═══════════════ SLIDES ═══════════════

# TITLE
slide = dark_slide()
add_title(slide, "AI & LLMs", 52, ACCENT, Inches(1.8), True)
add_title(slide, "A Practical Introduction", 34, WHITE, Inches(3.2))
add_title(slide, "From the AI Playbook \u2014 May 2026", 18, GRAY, Inches(4.5))
footer_text(slide, "ai-playbook.pages.dev")

# PART 1: THE AI LANDSCAPE
section_slide("Part 1", "The AI Landscape")

# What is an LLM?
slide = dark_slide(); add_title(slide, "What Is an LLM?", 32, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    '"A Large Language Model is software that predicts the next word',
    'by learning patterns from billions of examples."',
    '', 'Think of autocomplete on your phone. When you type...',
    '"What is the weather in..." your phone predicts "New York".',
    '',
    'ChatGPT, Claude, and Gemini work the same way \u2014',
    'but MUCH better at predicting what comes next,',
    "because they've learned from billions of examples.",
    '', 'Not magic. Just pattern matching at scale.'
], font_size=18, spacing=Pt(16))

# Brief History
slide = dark_slide(); add_title(slide, "How We Got Here", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    '2017 \u2014 "Attention Is All You Need" paper introduces Transformers',
    '2018 \u2014 GPT-1 (117M params) & BERT released',
    '2020 \u2014 GPT-3 (175B params) \u2014 first model with emergent abilities',
    '2022 \u2014 ChatGPT launches (GPT-3.5 + RLHF) \u2014 AI goes mainstream',
    '2023 \u2014 GPT-4, Claude 2, Gemini \u2014 multimodal, better reasoning',
    '2024 \u2014 Claude 3.5, GPT-4o, Llama 3 \u2014 open models catch up',
    '2025 \u2014 Reasoning models (o1, o3), agentic AI, Design Arena',
    '2026 \u2014 GPT-5.5, Claude 4.7, DeepSeek V4 \u2014 prices drop 50%+',
], font_size=16, spacing=Pt(14))

# Current Landscape
slide = dark_slide(); add_title(slide, "The AI Landscape \u2014 May 2026", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    'Closed-source:     Claude Opus 4.7, GPT-5.5, Gemini 3.1 Pro',
    'Open-weight:        Llama 4 (Meta), DeepSeek V4, Qwen 3.6',
    'Reasoning:          OpenAI o3, DeepSeek R1 \u2014 chain-of-thought',
    'Agentic:            Cursor (IDE), Claude Code (CLI), CrewAI',
    '', 'Key trends:',
    '  \u2022 Prices dropping 50%+ per year \u2014 GPT-5.5 costs $2/1M tokens',
    '  \u2022 Open models matching closed models on benchmarks',
    '  \u2022 Context windows growing: 128K \u2192 400K \u2192 1M tokens',
    '  \u2022 Agentic AI moving from demos to production in 2026',
], font_size=16, spacing=Pt(16))

# Key Players
slide = dark_slide(); add_title(slide, "Key Players \u2014 At a Glance", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
add_table(slide, ["Company", "Flagship Model", "Context", "Strength", "Pricing"], [
    ["Anthropic", "Claude Opus 4.7", "400K", "Best reasoning & writing", "$15/$75 per 1M"],
    ["OpenAI", "GPT-5.5", "128K", "Best all-purpose, fastest", "$2/$8 per 1M"],
    ["Google", "Gemini 3.1 Pro", "1M", "Longest context, research", "$2/$12 per 1M"],
    ["DeepSeek", "DeepSeek V4", "256K", "10-50x cheaper, open", "$0.14/$0.28 per 1M"],
    ["xAI", "Grok 3 Pro", "256K", "Real-time X/Twitter data", "API pricing"],
    ["Meta", "Llama 4 Scout", "128K", "Open-weight, self-host", "Free (MIT)"],
])

# Can Do / Struggle / Can't
bullet_slide("What LLMs Can Do Well", [
    "Writing and editing \u2014 often better than most people",
    "Explaining complex concepts \u2014 clear, accessible, patient",
    "Coding assistance \u2014 saves 40-60% of development time",
    "Analysis of existing text \u2014 pattern finding, extraction",
    "Brainstorming and ideation \u2014 fast, creative, 24/7",
    "Translation between languages \u2014 including code \u2194 English",
    "Summarization \u2014 turn 50 pages into 5 bullet points",
])

bullet_slide("What LLMs Struggle With (Improving)", [
    "Math \u2014 reasoning models (o3, R1) are better, still imperfect",
    "Factual accuracy \u2014 hallucinations remain; RAG helps fix this",
    "Real-time information \u2014 not built-in (Perplexity/Gemini add it)",
    "Domain expertise \u2014 generic knowledge; fine-tuning helps",
    "Complex multi-step reasoning \u2014 improving with chain-of-thought",
    "Understanding context beyond 200K tokens (quality degrades)",
])

bullet_slide("What LLMs CANNOT Do (Yet)", [
    "Access the internet on their own (they're trained, not connected)",
    "Know anything after their training cutoff date",
    "Guarantee truthfulness \u2014 they generate plausible text, NOT facts",
    "Reason reliably under uncertainty without explicit guidance",
    "Replace domain experts \u2014 they're tools for experts",
    "Learn from a single conversation (no persistent memory)",
])

# Misconceptions
slide = dark_slide(); add_title(slide, "Common Misconceptions", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    '\u2715 "LLMs understand language" \u2014 They pattern-match.',
    '   Understanding is human projection.',
    '', '\u2715 "LLMs are general intelligences" \u2014 Narrow:',
    '   good at text, bad at reasoning under uncertainty.',
    '', '\u2715 "ChatGPT is always right" \u2014 No. Verify important facts.',
    '   They hallucinate plausibly.',
    '', '\u2715 "LLMs will replace humans" \u2014 Humans + LLMs > either alone.',
    '   They\'re tools that amplify human capability.',
    '', '\u2715 "More parameters = smarter" \u2014 Architecture and data quality',
    '   matter more than raw scale.',
], font_size=16, spacing=Pt(14))

# Why AI Matters
bullet_slide("Why AI Matters Now", [
    "Prices dropping 50%+ per year \u2014 $1 in 2023 = $0.10 today",
    "Frontier-quality models available for free (llama.meta.com)",
    "Context windows grew from 8K (2022) to 1M (2026)",
    "Agentic AI from demos to production \u2014 Cursor, Claude Code",
    "87% of developers use AI coding tools (Stack Overflow 2025)",
    "AI saves 40-60% of time on writing, coding, and analysis",
    "EVERY knowledge worker can benefit \u2014 not just engineers",
])

bullet_slide("Part 1 Recap \u2014 The AI Landscape", [
    "LLMs predict the next word, billions of times \u2014 pattern matching at scale",
    "5 key players: Anthropic, OpenAI, Google, DeepSeek, Meta",
    "Models getting cheaper, faster, more capable every 6 months",
    "LLMs great at writing, coding, analysis \u2014 weak at math and facts",
    "They're tools that amplify humans, not replace them",
])

# PART 2: HOW LLMS WORK
section_slide("Part 2", "How Do LLMs Work?")

slide = dark_slide(); add_title(slide, "Tokens \u2014 The Building Blocks", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    "Models process tokens \u2014 not letters, not words.",
    '', '"The quick brown fox jumps over the lazy dog"',
    '', '\u2192 Tokens: [The] [ quick] [ brown] [ fox] [ jumps]',
    '           [ over] [ the] [ lazy] [ dog]',
    '', 'A token \u2248 \u00BE of a word. Common words = 1 token.',
    'Longer/unusual words may use 2-3 tokens.',
    '', 'Pricing is per-token \u2014 you pay for what the model reads',
    'and writes. ~1,000 tokens \u2248 750 words \u2248 1.5 pages.',
], font_size=16, spacing=Pt(14))

slide = dark_slide(); add_title(slide, "Parameters \u2014 The Prediction Dials", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    'Think of parameters as millions of tiny "dials".',
    'Each dial gets tweaked during training.',
    '', 'More parameters = more nuances the model can learn.',
    'But more parameters \u2260 always better.',
    '', 'GPT-5.5: ~1.76 trillion parameters',
    'Claude Opus 4.7: architecture not publicly disclosed',
    'Llama 4 405B: 405 billion parameters (open-weight)',
    '', 'Open-weight = you can download and run it yourself.',
    'Closed-weight = you access via API only.',
], font_size=16, spacing=Pt(14))

slide = dark_slide(); add_title(slide, "Context Windows \u2014 How Much It Sees", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    'Context = everything the model "remembers" in one conversation.',
    '', 'Context window sizes (May 2026):',
    '  \u2022 Gemini 3.1 Pro: 1 MILLION tokens (War & Peace 2x over)',
    '  \u2022 Claude Opus 4.7: 400K tokens (~600 pages)',
    '  \u2022 DeepSeek V4: 256K tokens',
    '  \u2022 GPT-5.5: 128K tokens (~200 pages)',
    '', 'Larger context = process entire books, codebases, transcripts.',
    '', 'One catch: FULL conversation sent with each message.',
    '  (that\'s why long chats cost more and feel slower)',
], font_size=16, spacing=Pt(14))

slide = dark_slide(); add_title(slide, "Temperature \u2014 Creativity vs Consistency", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    'Temperature controls how "creative" or "random" outputs are.',
    '', 'Temp = 0.0 \u2192 Same question = same answer every time',
    '        Good for: math, code, factual answers',
    '', 'Temp = 0.3-0.7 \u2192 Balanced \u2014 the sweet spot',
    '        Good for: most tasks, documentation, analysis',
    '', 'Temp = 1.0+ \u2192 Creative, surprising, varied',
    '        Good for: brainstorming, creative writing',
    '', 'Low temp  = deterministic \u2192 same output each time',
    'High temp = stochastic \u2192 different output each time',
], font_size=16, spacing=Pt(14))

slide = dark_slide(); add_title(slide, "How Models Learn \u2014 Three Stages", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    'Stage 1: Pretraining',
    '  \u2022 Model reads TRILLIONS of words (internet, books, code)',
    '  \u2022 Learns language patterns, facts, reasoning \u2014 unsupervised',
    '  \u2022 The expensive part \u2014 costs millions in compute',
    '', 'Stage 2: Fine-tuning',
    '  \u2022 Train on specific examples to adapt to a task/domain',
    '  \u2022 Much cheaper \u2014 hundreds to thousands of dollars',
    '', 'Stage 3: RLHF (Reinforcement Learning from Human Feedback)',
    '  \u2022 Humans rate responses; model learns "good" vs "bad"',
    '  \u2022 This is why ChatGPT is polite \u2014 they TRAINED it to be!',
], font_size=16, spacing=Pt(14))

slide = dark_slide(); add_title(slide, "What Is RAG?", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    'RAG = Retrieval-Augmented Generation.',
    '', 'The problem: LLMs only know their training data.',
    "They can't access your documents or latest info.",
    '', 'RAG solves this:',
    '  1. User asks a question',
    '  2. System searches YOUR documents for relevant info',
    '  3. Search results + question \u2192 sent to the LLM',
    '  4. LLM answers with references to your documents',
    '', 'Think: "Hey LLM, read these 3 docs and answer."',
    '', 'Used for: customer support, internal docs Q&A,',
    'research assistants, legal/finance analysis.',
], font_size=16, spacing=Pt(14))

bullet_slide("Prompt Engineering \u2014 3 Simple Rules", [
    "1. Be specific \u2014 \"Summarize in 3 bullet points with action items\"",
    "   NOT \"Tell me about...\"",
    "", "2. Give examples (few-shot) \u2014 Show 2-3 input/output examples",
    "   before asking the real question",
    "", "3. Ask for structured output \u2014 \"Output as JSON\" or \"List as table\"",
    "", "Bonus tips:",
    '  \u2022 Tell the model what it IS ("You are a senior engineer...")',
    '  \u2022 Give constraints ("Keep it under 200 words")',
    '  \u2022 Ask it to think step-by-step for complex reasoning',
])

add_table(slide := dark_slide(), ["Method", "What It Is", "Time", "Cost", "Best For"], [
    ["Prompting", "Better instructions", "Instant", "Free", "Most tasks, writing, coding"],
    ["RAG", "Feed your docs to the model", "Hours-days", "Cheap", "Customer support, docs Q&A"],
    ["Fine-tuning", "Train model on your examples", "Days", "$100-$10K", "Specialized domains, tone"],
]); add_title(slide, "3 Ways to Adapt Models", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)

bullet_slide("Part 2 Recap \u2014 How LLMs Work", [
    "Tokens = building blocks; Parameters = prediction dials",
    "Context = the conversation memory (128K \u2013 1M tokens)",
    "Temperature = creativity dial (0 = deterministic, 1 = creative)",
    "Training: pretraining \u2192 fine-tuning \u2192 RLHF",
    "RAG feeds YOUR documents to the model for accurate answers",
    "Better prompts = better outputs (be specific, give examples)",
])

# PART 3: TOOLS & USAGE
section_slide("Part 3", "Tools & Practical Usage")

add_table(slide := dark_slide(), ["Tool", "Model", "Cost", "Best For"], [
    ["Claude.ai", "Claude Opus 4.7 / Sonnet", "$20/mo", "Writing, long docs, analysis"],
    ["ChatGPT", "GPT-5.5 / GPT-5.5 Instant", "$20/mo", "Web search, general, speed"],
    ["Gemini", "Gemini 3.1 Pro", "$20/mo", "1M context, research, long docs"],
    ["Perplexity", "Claude + GPT + search", "$20/mo", "Cited sources, research"],
    ["DeepSeek", "DeepSeek V4", "Free / $10/mo", "Cost-conscious, reasoning"],
    ["Grok", "Grok 3", "X Premium", "Real-time current events"],
], row_height=Inches(0.55)); add_title(slide, "Chat Interfaces \u2014 Comparison", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)

add_table(slide := dark_slide(), ["Tool", "Base Model", "IDE", "Cost", "Best For"], [
    ["Cursor", "Claude Sonnet + GPT", "VSCode fork", "$20-40/mo", "Large codebases, refactors"],
    ["Claude Code", "Claude Sonnet 4.6", "Terminal / CLI", "Pay-per-token", "Terminal-first, automation"],
    ["GitHub Copilot", "GPT-4o + Codex", "VSCode, JetBrains", "Free + $10-20/mo", "Widest IDE support"],
    ["Windsurf", "Codeium + partners", "Standalone", "$15-30/mo", "Agentic, fast iteration"],
    ["Aider", "Claude/GPT", "Terminal", "Free + API", "Git-native, structured refactors"],
], row_height=Inches(0.55)); add_title(slide, "Coding Tools \u2014 Comparison", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)

add_table(slide := dark_slide(), ["Tool", "Type", "Cost", "Best For"], [
    ["Midjourney", "Image generation", "$10-120/mo", "Photorealistic, artistic"],
    ["Runway", "Video editing", "$12+/mo", "Professional video workflows"],
    ["Suno", "Music generation", "Free / $10/mo", "Original music, scores"],
    ["ElevenLabs", "Voice synthesis", "Free / $11-99/mo", "Narration, voiceovers"],
    ["NotebookLM", "Document analysis", "Free", "Summarize PDFs, extracts"],
    ["DALL-E 3", "Image generation", "In ChatGPT", "Quick iterations, integrated"],
], row_height=Inches(0.55)); add_title(slide, "Content & Other Tools", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)

slide = dark_slide(); add_title(slide, "Should You Build or Buy?", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    'Buy (API) when:',
    '  \u2022 You need to launch in days, not months',
    '  \u2022 Usage volume < 50M tokens/month',
    '  \u2022 You want the latest frontier models',
    '', 'Build (Self-host) when:',
    '  \u2022 Data privacy is critical (healthcare, legal, finance)',
    '  \u2022 Usage volume > 50M tokens/month',
    '  \u2022 Need full control or want to fine-tune on proprietary data',
    '', 'Rule of thumb: API at low volume, self-host at high volume.',
    'At >50M tokens/month, self-hosting saves real money.',
], font_size=16, spacing=Pt(14))

add_table(slide := dark_slide(), ["Model", "Input / 1M tokens", "Output / 1M tokens", "Notes"], [
    ["Claude Opus 4.7", "$15", "$75", "Best quality, most expensive"],
    ["Claude Sonnet 4.6", "$3", "$15", "Great balance"],
    ["GPT-5.5", "$2", "$8", "Best all-purpose value"],
    ["Gemini 3.1 Pro", "$2", "$12", "Great context (1M)"],
    ["DeepSeek V4", "$0.14", "$0.28", "10-50x cheaper"],
    ["Llama 4 (self-host)", "$0*", "$0*", "Free, you pay for servers"],
], row_height=Inches(0.55)); add_title(slide, "API Pricing (May 2026 \u2014 Per 1M Tokens)", 26, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)

slide = dark_slide(); add_title(slide, "Tool Pairing Strategies", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    'Best Daily Combo:',
    '  \u2022 Chat: Claude.ai (writing) + ChatGPT (web search)',
    '  \u2022 Coding: Cursor (IDE) + Claude Code (complex tasks)',
    '  \u2022 Research: Gemini (1M context) + Perplexity (cited)',
    '', 'Budget Combo (~$40/mo):',
    '  \u2022 Free tiers: ChatGPT, Claude, Gemini, Copilot',
    '  \u2022 Add Cursor: $20/mo + one Pro plan: $20/mo',
    '', 'Premium Combo:',
    '  \u2022 Claude Pro + ChatGPT Pro + Cursor + Claude Code',
    '  \u2022 Midjourney + NotebookLM + Perplexity',
    '  \u2022 Total: ~$150-300/mo',
], font_size=16, spacing=Pt(14))

bullet_slide("What You Can Build With AI", [
    "RAG Chatbot \u2014 Q&A on your documentation, knowledge base",
    "Content pipeline \u2014 auto-generate blog posts, summaries",
    "Code review assistant \u2014 flag bugs, suggest improvements",
    "Data analysis \u2014 natural language queries on databases",
    "Customer support \u2014 answer common questions automatically",
    "Research assistant \u2014 summarize papers, extract key findings",
    "Meeting transcription + summarization",
    "All achievable with existing tools in 2026",
])

bullet_slide("Free Tier & Budget Options", [
    "FREE: ChatGPT (GPT-5.5 Instant), Claude free, Gemini, DeepSeek",
    "FREE: GitHub Copilot (2K/mo), NotebookLM, Ollama + open models",
    "FREE: LangChain, CrewAI, Chroma (all open-source)",
    '', "$20/mo: One Pro plan (Claude or ChatGPT or Gemini)",
    "$40/mo: Pro plan + Cursor (professional dev setup)",
    "$100/mo: All tools needed for serious work",
    '', "Remember: for most apps, model cost is",
    "NEGLIGIBLE compared to engineering time.",
])

bullet_slide("Part 3 Recap \u2014 Tools & Usage", [
    "Chat: Claude (writing), ChatGPT (general), Gemini (research)",
    "Coding: Cursor (IDE) + Claude Code (complex) + Copilot (free)",
    "Build vs Buy: API at low volume, self-host at high volume",
    "Pricing: DeepSeek 10-50x cheaper; Llama free to self-host",
    "Pair tools strategically \u2014 you don't need everything",
    "Start with free tiers, upgrade when you need more",
])

# PART 4: GETTING STARTED
section_slide("Part 4", "Getting Started & Takeaways")

slide = dark_slide(); add_title(slide, "Your First 30-Minute Experiment", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    "Step 1 \u23F1 3 min: Go to claude.ai or chatgpt.com \u2014 it's free",
    '', "Step 2 \u23F1 5 min: Ask: \"Explain quantum computing like I'm 12.\"",
    '            Then: "Now explain it to a software engineer."',
    '            Notice: same model, different behavior based on prompt.',
    '', "Step 3 \u23F1 10 min: Paste in an email and ask:",
    '            "Summarize in 3 bullet points. Suggest improvements."',
    '', "Step 4 \u23F1 10 min: Try coding: \"Write a Python script to rename",
    '            all files in a folder to lowercase."',
    '', "Step 5 \u23F1 2 min: Reflect. How much time would this have saved?",
    '            What else could you automate?',
], font_size=16, top=Inches(1.3), spacing=Pt(12))

bullet_slide("Where to Learn More", [
    "The AI Playbook \u2014 ai-playbook.pages.dev",
    "Free tools \u2014 claude.ai, chatgpt.com, gemini.google.com",
    "Papers \u2014 paperswithcode.com, arXiv (cs.CL)",
    "Communities \u2014 r/MachineLearning, r/LocalLLaMA, Hacker News",
    "Newsletters \u2014 The Batch (DeepLearning.AI), The Rundown AI",
    "Courses \u2014 fast.ai (Practical Deep Learning), DeepLearning.AI",
    "YouTube \u2014 3Blue1Brown (Neural Nets), Yannic Kilcher (papers)",
])

slide = dark_slide(); add_title(slide, "Best Practices for Using AI", 28, WHITE, Inches(0.6), True, PP_ALIGN.LEFT)
bar = slide.shapes.add_shape(1, Inches(1.5), Inches(1.3), Inches(3.0), Pt(2))
bar.fill.solid(); bar.fill.fore_color.rgb = ACCENT; bar.line.fill.background()
add_body(slide, [
    'DO:',
    '  \u2022 Verify important facts \u2014 LLMs hallucinate',
    '  \u2022 Be specific in prompts \u2014 vague = vague answers',
    '  \u2022 Use AI as a starting point, not the final answer',
    '  \u2022 Experiment with different models for different tasks',
    '  \u2022 Keep humans in the loop for critical decisions',
    '', "DON'T:",
    '  \u2022 Paste sensitive/private data into public AI services',
    '  \u2022 Trust AI-generated code without review',
    '  \u2022 Assume the model knows recent events (check cutoff)',
    '  \u2022 Over-automate \u2014 some things need human judgment',
    '  \u2022 Use AI for legal/medical advice without expert review',
], font_size=16, spacing=Pt(14))

bullet_slide("Where AI is Heading", [
    "Agentic AI \u2014 models that plan, use tools, execute tasks",
    "Smaller, faster, cheaper \u2014 edge AI on phones and laptops",
    "Multimodal everywhere \u2014 vision, audio, video natively integrated",
    "Reasoning \u2014 chain-of-thought becoming standard",
    "Open models closing the gap \u2014 Llama, DeepSeek, Qwen",
    "AI in every tool \u2014 email, docs, IDE, browser, terminal",
    "Key skill: knowing WHAT to ask, not HOW to code it",
])

bullet_slide("The Human + AI Advantage", [
    "AI excels at: speed, scale, pattern recognition, consistency",
    "Humans excel at: judgment, creativity, ethics, context, nuance",
    '', "Together they're better than either alone:",
    '  \u2022 AI drafts \u2192 human reviews and improves',
    '  \u2022 AI analyzes data \u2192 human makes decisions',
    '  \u2022 AI generates ideas \u2192 human curates the best ones',
    '  \u2022 AI writes code \u2192 human architects the system',
    '', "This is not about replacement. It's about amplification.",
    "Your job is not at risk from AI.",
    "Your job is at risk from someone who knows how to USE AI.",
])

# Summary
slide = dark_slide()
add_title(slide, "Key Takeaways", 36, WHITE, Inches(0.9), True, PP_ALIGN.CENTER)
add_body(slide, [
    "1. LLMs are pattern-matching at scale \u2014 not magic, just math.",
    '', "2. Five key players: Anthropic, OpenAI, Google, DeepSeek, Meta.",
    '', "3. Prices dropping 50%+ per year. Premium yesterday = free today.",
    '', "4. Better prompts = better outputs. Be specific. Give examples.",
    '', "5. Start with free tiers. Claude.ai and ChatGPT are free.",
    '', "6. AI amplifies humans. It doesn't replace them.",
    '', "7. The best time to learn AI was 2023. Second best time is NOW.",
], font_size=18, spacing=Pt(22))

# Q&A
slide = dark_slide()
add_title(slide, "Questions?", 52, ACCENT, Inches(2.5), True)
add_title(slide, "Ask me anything about AI, LLMs, or how to get started", 20, GRAY, Inches(4.0))
footer_text(slide, "ai-playbook.pages.dev")

# SAVE
output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ai-playbook-intro.pptx")
prs.save(output_path)
print(f"Saved {output_path}")
print(f"  {len(prs.slides)} slides generated")
