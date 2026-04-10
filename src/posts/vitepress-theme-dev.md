---
title: 用 VitePress 搭建自定义主题
description: 记录从零开始搭建这个博客主题的过程，包括踩的坑和一些设计决策。
date: 2026-04-08
tags: [VitePress, 技术, Vue]
category: 技术
mood: [专注, 偶尔抓狂]
---

# 用 VitePress 搭建自定义主题

VitePress 的主题系统比我想象的要灵活。核心是 `.vitepress/theme/index.ts`：

```ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostCard', PostCard)
  },
} satisfies Theme
```

`extends: DefaultTheme` 意味着你不用从零写 Markdown 渲染、代码高亮之类的东西，只需要叠加你想要的部分。

## 数据加载器

用 `createContentLoader` 扫描所有文章：

```ts
// posts.data.ts
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  excerpt: true,
})
```

然后在组件里：

```vue
<script setup>
import { data as posts } from '../posts.data'
</script>
```

非常干净。

::: tip 🧠 关于类型
VitePress 的类型定义有时候不完整，有几处我直接用了 `as any` 绕过去了。不是最优雅的解法，但够用。
:::

## 星空背景

Hero 区域的星星是用 Canvas 画的，每颗星有独立的呼吸动效（alpha 值随机振荡）。整体效果很轻，不会抢注意力。

---

下一步：给文章页加上"上一篇 / 下一篇"的导航增强。
