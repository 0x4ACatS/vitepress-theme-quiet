<template>
  <a :href="withBase(post.url)" class="post-card">
    <div class="card-inner">
      <h2 class="card-title">{{ post.frontmatter.title }}</h2>
      <p v-if="post.frontmatter.description" class="card-desc">
        {{ post.frontmatter.description }}
      </p>
      <div class="card-meta">
        <time v-if="post.frontmatter.date" class="meta-date">
          {{ formatDate(post.frontmatter.date) }}
        </time>
        <span v-if="post.frontmatter.category" class="meta-category">
          {{ post.frontmatter.category }}
        </span>
        <div class="meta-tags">
          <span
            v-for="tag in (post.frontmatter.tags ?? [])"
            :key="tag"
            class="tag"
          >#{{ tag }}</span>
        </div>
        <div class="meta-moods">
          <span
            v-for="mood in (post.frontmatter.mood ?? [])"
            :key="mood"
            class="mood"
          >{{ mood }}</span>
        </div>
      </div>
      <span class="card-read">→ 阅读</span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

interface Post {
  url: string
  frontmatter: {
    title?: string
    description?: string
    date?: string
    category?: string
    tags?: string[]
    mood?: string[]
  }
}

defineProps<{ post: Post }>()

function formatDate(raw: string) {
  const d = new Date(raw)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.post-card {
  display: block;
  text-decoration: none;
  color: inherit;
}

.card-inner {
  background: var(--q-card-bg);
  border: 1px solid var(--q-card-border);
  border-radius: var(--q-card-radius);
  padding: 1.5rem 1.75rem;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  position: relative;
  overflow: hidden;
}

.card-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--q-card-radius);
  opacity: 0;
  transition: opacity 0.22s ease;
  background: radial-gradient(ellipse at top left, rgba(88,166,255,0.07) 0%, transparent 60%);
}

.post-card:hover .card-inner {
  transform: translateY(-3px);
  box-shadow: var(--q-card-glow);
  border-color: rgba(88, 166, 255, 0.35);
}

.post-card:hover .card-inner::before {
  opacity: 1;
}

.card-title {
  font-family: var(--vp-font-family-mono);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
  line-height: 1.4;
}

.card-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
  margin-bottom: 1rem;
}

.meta-date {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

.meta-category {
  font-size: 0.72rem;
  color: var(--vp-c-brand-2);
  border: 1px solid rgba(88, 166, 255, 0.25);
  background: rgba(88, 166, 255, 0.08);
  border-radius: 4px;
  padding: 1px 7px;
  font-family: var(--vp-font-family-mono);
}

.meta-tags,
.meta-moods {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  font-size: 0.72rem;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  padding: 1px 7px;
  font-family: var(--vp-font-family-mono);
}

.mood {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  background: rgba(110, 118, 129, 0.12);
  border-radius: 4px;
  padding: 1px 7px;
}

.card-read {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  opacity: 0.7;
  transition: opacity 0.2s;
}

.post-card:hover .card-read {
  opacity: 1;
}
</style>
