<template>
  <div class="post-list">
    <PostCard v-for="post in posts" :key="post.url" :post="post" />
    <p v-if="!posts.length" class="empty">暂无文章。</p>
  </div>
</template>

<script setup lang="ts">
import PostCard from './PostCard.vue'

defineProps<{
  posts: Array<{
    url: string
    frontmatter: {
      title?: string
      description?: string
      date?: string
      category?: string
      tags?: string[]
      mood?: string[]
    }
  }>
}>()
</script>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.empty {
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  text-align: center;
  padding: 2rem 0;
}
</style>
