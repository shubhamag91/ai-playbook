// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  // Change to your deployed URL when ready
        // Uncomment and set your actual URL when deploying:
        // site: 'https://ai-playbook.pages.dev',
      site: 'https://your-playbook.example.com',

  compressHTML: true,

  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('katex')) return 'katex';
              if (id.includes('mermaid')) return 'mermaid';
              return 'vendor';
            }
          },
        },
      },
    },
    ssr: {
      noExternal: ['katex'],
    },
  },

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  integrations: [
    starlight({
      components: {
        Footer: './src/components/FooterOverride.astro',
      },
      title: 'AI Playbook',
      description: 'A living playbook of AI & LLM knowledge — notes, cheatsheets, diagrams, and decks.',
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      social: {
        // Replace with your own
        github: 'https://github.com/your-handle/ai-playbook',
      },
      // KaTeX stylesheet + client-side Mermaid renderer + analytics
      head: [
        // Cloudflare Web Analytics (privacy-first, no cookie consent needed)
        // To enable: replace 'YOUR_TOKEN' with your Cloudflare Web Analytics token
        // Get one at: https://dash.cloudflare.com/ → Web Analytics → Add site
        // {
        //   tag: 'script',
        //   attrs: {
        //     defer: true,
        //     src: 'https://static.cloudflareinsights.com/beacon.min.js',
        //     'data-cf-beacon': '{"token": "YOUR_TOKEN"}',
        //   },
        // },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://cdn.jsdelivr.net',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'dns-prefetch',
            href: 'https://cdn.jsdelivr.net',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
          },
        },
        // Open Graph image for social sharing
        // Create a social card image at public/social-card.png (1200×630px)
        // {
        //   tag: 'meta',
        //   attrs: { property: 'og:image', content: 'https://your-playbook.example.com/social-card.png' },
        // },
        // {
        //   tag: 'meta',
        //   attrs: { name: 'twitter:image', content: 'https://your-playbook.example.com/social-card.png' },
        // },
        // {
        //   tag: 'meta',
        //   attrs: { name: 'twitter:site', content: '@yourhandle' },
        // },
        // Schema.org structured data (WebSite + Organization)
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'AI Playbook',
            description: 'A personal reference for navigating the modern AI ecosystem — tools, workflows, models, and principles.',
            url: 'https://your-playbook.example.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://your-playbook.example.com/?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
            const render = () => {
              const isDark = document.documentElement.dataset.theme === 'dark';
              mermaid.initialize({ startOnLoad: false, theme: isDark ? 'dark' : 'default', securityLevel: 'loose' });
              document.querySelectorAll('pre > code.language-mermaid').forEach((el, i) => {
                const pre = el.parentElement;
                if (!pre || pre.dataset.mermaidProcessed) return;
                const container = document.createElement('div');
                container.className = 'mermaid';
                container.textContent = el.textContent;
                pre.replaceWith(container);
              });
              mermaid.run({ querySelector: '.mermaid' }).catch(() => {});
            };
            document.addEventListener('DOMContentLoaded', render);
            // Re-render on Starlight theme toggle
            new MutationObserver(() => {
              document.querySelectorAll('.mermaid[data-processed]').forEach(el => {
                el.removeAttribute('data-processed');
                const src = el.getAttribute('data-src-mermaid');
                if (src) el.textContent = src;
              });
              render();
            }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
          `,
        },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Welcome', slug: 'index' },
            { label: 'Quick Start', slug: 'start/quick-start' },
          ],
        },
        {
          label: 'Learn',
          items: [
            { label: 'Beginner Path', slug: 'learn/beginner' },
            { label: 'Builder Path', slug: 'learn/builder' },
            { label: 'Researcher Path', slug: 'learn/researcher' },
            { label: 'Interview Prep', slug: 'learn/interview-prep' },
          ],
        },
        {
          label: 'Decide',
          items: [
            {
              label: 'Tools Guide',
              collapsed: false,
              items: [
                { label: 'Feature Matrix', slug: 'decide/tools/guide' },
                { label: 'Decision Tree', slug: 'decide/tools/decision-tree' },
              ],
            },
            { label: 'Tool Comparison', slug: 'decide/tools/comparison' },
            { label: 'Models Guide', slug: 'decide/models/guide' },
            { label: 'Frameworks Guide', slug: 'decide/frameworks/guide' },
            { label: 'Cost Calculator', slug: 'decide/cost-calculator' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Glossary', slug: 'reference/glossary' },
            { label: 'Cheatsheets', autogenerate: { directory: 'reference/cheatsheets' } },
            { label: 'Confusions', slug: 'reference/confusions' },
            { label: 'Principles', slug: 'reference/principles' },
            { label: 'Benchmarks', slug: 'reference/benchmarks' },
            { label: 'Model Specs', slug: 'reference/model-specs' },
            { label: 'Model Capability Matrix', slug: 'reference/model-capability-matrix' },
          ],
        },
        {
          label: 'Research',
          items: [
            { label: 'What\'s New', slug: 'research/whats-new' },
            { label: 'Model Releases', slug: 'research/model-releases' },
            { label: 'Open-Source Models', slug: 'research/models/guide' },
            { label: 'Trends', slug: 'research/emerging-trends' },
            { label: 'History', slug: 'research/history' },
            { label: 'Vocabulary', slug: 'research/vocabulary' },
          ],
        },
        {
          label: 'Deep Dives',
          items: [
            { label: 'How LLMs Work', slug: 'deep-dive/how-llms-work' },
            { label: 'RAG Architecture', slug: 'deep-dive/rag-architecture' },
            { label: 'Agents & Frameworks', slug: 'deep-dive/agents-frameworks' },
            { label: 'Training & Fine-tuning', slug: 'deep-dive/training-finetuning' },
            { label: 'Prompt Engineering', slug: 'deep-dive/prompt-engineering' },
            { label: 'Inference Optimization', slug: 'deep-dive/inference-optimization' },
            { label: 'Evaluation & Testing', slug: 'deep-dive/eval-and-testing' },
          ],
        },
        {
          label: 'Resources',
          items: [
            { label: 'Overview & Downloads', slug: 'resources' },
            { label: 'Papers', slug: 'resources/papers' },
            { label: 'Communities', slug: 'resources/communities' },
            { label: 'Tools & Frameworks', slug: 'resources/tools-frameworks' },
            { label: 'Case Studies', autogenerate: { directory: 'resources/case-studies' } },
            { label: 'Templates', autogenerate: { directory: 'resources/templates' } },
          ],
        },
        {
          label: 'Community',
          items: [
            { label: 'Contributing', slug: 'community/contributing' },
            { label: 'Report Outdated', slug: 'community/report' },
            { label: 'Help Wanted', slug: 'community/help-wanted' },
            { label: 'Content Audit', slug: 'community/audit' },
            { label: 'Analytics', slug: 'community/analytics' },
            { label: 'Contributors', slug: 'community/contributors' },
          ],
        },
      ],
    }),
  ],
});
