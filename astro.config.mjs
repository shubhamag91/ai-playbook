// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  // Change to your deployed URL when ready
  site: 'https://your-playbook.example.com',

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  integrations: [
    starlight({
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
      // KaTeX stylesheet + client-side Mermaid renderer
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
          },
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
          label: 'Start here',
          items: [
            { label: 'Welcome', slug: 'index' },
          ],
        },
        {
          label: 'Tools',
          link: '/tools/',
        },
        {
          label: 'Open Source',
          link: '/opensource/',
        },
        {
          label: 'Glossary',
          link: '/glossary/',
        },
        {
          label: 'History',
          link: '/history/',
        },
        {
          label: 'Confusions',
          link: '/confusions/',
        },
        {
          label: 'Follow',
          link: '/follow/',
        },
        {
          label: 'Workflows',
          link: '/workflows/',
        },
        {
          label: 'Principles',
          link: '/principles/',
        },
        {
          label: 'Cheatsheets',
          autogenerate: { directory: 'cheatsheets' },
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Diagrams',
          autogenerate: { directory: 'diagrams' },
        },
        {
          label: 'Mind Maps',
          autogenerate: { directory: 'mind-maps' },
        },
        {
          label: 'Slide Decks',
          autogenerate: { directory: 'slides' },
        },
        {
          label: 'Infographics',
          autogenerate: { directory: 'infographics' },
        },
      ],
    }),
  ],
});
