import { defineConfig, createContentLoader } from 'vitepress'

export default defineConfig({
  title: 'Quiet Blog',
  description: '在混乱的信息世界中，记录一些有秩序的思考。',
  lang: 'zh-CN',
  cleanUrls: true,
  srcDir: 'src',

  head: [
    // Force dark class before first paint to prevent any flash of light mode
    ['script', {}, `document.documentElement.classList.add('dark')`],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    ],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '分类', link: '/categories' },
      { text: '标签', link: '/tags' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
    ],
    outline: {
      label: '目录',
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  },

  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '注意',
      dangerLabel: '警告',
      infoLabel: '信息',
      detailsLabel: '详情',
    },
  },

  async buildEnd(siteConfig) {},
})
