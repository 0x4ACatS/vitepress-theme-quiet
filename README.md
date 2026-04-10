# 🌙 Quiet Blog 
> 在混乱的信息世界中，记录一些有秩序的思考。

---

## ✨ 项目简介

这是一个基于 **VitePress** 的自定义博客主题，强调：

* 🧠 理性结构
* 🌿 温和表达
* 🌌 克制的科技感

目标不是做一个“功能很多”的博客，而是：

> **一个让人愿意安静阅读的空间**

适用于：

* 技术记录
* 随笔 / 思考
* 杂内容博客（但有统一气质）

---

## 🎯 主题关键词

`Minimal` · `Calm` · `Readable` · `Soft Tech` · `Thoughtful`

---

## 🎨 设计理念

### 1. 克制的科技感

* 深色为主，低对比高舒适
* 微动效，而非炫技
* UI 不喧宾夺主

### 2. 内容优先

* 阅读体验 > 视觉复杂度
* 控制行宽、留白、节奏

### 3. 有温度的表达

* 支持“未完成的思考”
* 允许情绪存在

---

## 🎨 视觉规范

### 🌙 色彩系统

```css
:root {
  --vp-c-bg: #0F1117;
  --vp-c-text: #E6EDF3;

  --vp-c-brand: #58A6FF;
  --vp-c-brand-light: #79C0FF;

  --vp-c-border: #30363D;
  --vp-c-card: #161B22;
}
```

> 基于 VitePress 默认变量进行覆盖（推荐）

---

### ✍️ 字体建议
* 正文：Inter / 思源黑体
* 标题：JetBrains Mono（轻微科技感）
* 代码：JetBrains Mono

---

### 📏 排版原则
* 内容宽度：680px – 760px
* 行高：1.6+
* 使用留白而非分割线

---

## 🧩 页面结构
### 🏠 首页（自定义 Home Layout）
* Hero（简短介绍）
* Post List（卡片式）
* 分类 / 标签入口
* 随机文章入口（可选）

---

### 📄 文章页
基于 VitePress 默认 Markdown 渲染，增强：

* 标题区（Title + Meta）
* 内容排版优化
* 扩展内容块（Note / 思考）
* 底部导航（上一篇 / 下一篇）

---

## 🧠 主题扩展能力
### 1. 自定义 Markdown 容器

用于实现“思维批注”：
```md
::: note
🧠 这里是一个思考片段...
:::
```

或自定义容器：
```md
::: thinking
还没完全想明白，但先记录一下...
:::
```

### 2. 情绪标签（Frontmatter）
```
---
title: 一篇文章
tags: [技术, 随笔]
mood: [今天有点累, 想明白了一点点]
---
```
用于增强“个人表达维度”。

### 3. 状态（Now）
可通过全局数据或组件实现：
```
export const now = {
  status: "正在写博客",
  reading: "xxx",
  mood: "平静"
}
```

### 4. 随机文章
通过路由或数据生成：
- 随机跳转
- 或首页展示随机卡片

## 🧱 组件设计建议
### 核心组件
```
.vitepress/theme/
  components/
    PostCard.vue
    PostList.vue
    NoteBlock.vue
    Navbar.vue
    NowStatus.vue
Layout
.vitepress/theme/
  layouts/
    Home.vue
    Post.vue
    Default.vue
⚙️ VitePress 主题结构
.vitepress/
  config.mts

  theme/
    index.ts
    styles/
      theme.css

    components/
    layouts/
theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './styles/theme.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册组件
  }
}
```

## 🎞 动效建议
- hover：轻微发光（brand color）
- 页面切换：fade
- 禁止：
  - 大面积动画
  - 干扰阅读的效果

## 🌌 可扩展方向
- 🌗 深色 / 浅色模式
- 🔍 本地搜索（如 fuse.js）
- 🏷 标签过滤页
- 📡 RSS
- 💬 评论系统（Giscus / Utterances）

## 💭 一句话总结
> 这是一个“安静表达”的主题，而不是“展示技术”的主题。

📌 License
MIT / 自由修改 ✨
