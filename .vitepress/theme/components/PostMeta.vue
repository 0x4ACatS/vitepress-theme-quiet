<template>
  <div v-if="hasMeta" class="post-meta-strip">
    <span v-if="category" class="meta-category">{{ category }}</span>
    <div v-if="tags.length" class="meta-tags">
      <span v-for="tag in tags" :key="tag" class="tag">#{{ tag }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const category = computed(() => {
  const raw = frontmatter.value?.category
  return typeof raw === 'string' && raw.trim() ? raw.trim() : ''
})

const tags = computed(() => {
  const raw = frontmatter.value?.tags
  return Array.isArray(raw) ? raw.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0) : []
})

const hasMeta = computed(() => Boolean(category.value) || tags.value.length > 0)
</script>

<style scoped>
.post-meta-strip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0 0 1.15rem;
}

.meta-category {
  font-size: 0.76rem;
  color: var(--vp-c-brand-2);
  border: 1px solid rgba(88, 166, 255, 0.24);
  background: rgba(88, 166, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: var(--vp-font-family-mono);
}

.meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  font-size: 0.72rem;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: var(--vp-font-family-mono);
}
</style>
