<template>
  <div>
    <NavBar />

    <div class="tags-page">
      <h1>标签</h1>

      <div class="tag-filter">
        <button
          v-for="{ tag, count } in allTags"
          :key="tag"
          :class="['filter-btn', { active: selected === tag }]"
          @click="selected = selected === tag ? null : tag"
        >
          #{{ tag }} <span>{{ count }}</span>
        </button>
      </div>

      <div class="article-list">
        <PostCard v-for="p in filtered" :key="p.url" :post="p" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { data as posts } from '../posts.data'
import NavBar from '../components/NavBar.vue'
import PostCard from './../components/PostCard.vue'

const allTags = computed(() => {
  const map = new Map<string, number>()
  for (const p of posts) {
    for (const t of p.frontmatter.tags ?? []) {
      map.set(t, (map.get(t) ?? 0) + 1)
    }
  }
  return [...map.entries()].map(([tag, count]) => ({ tag, count }))
})

const selected = ref<string | null>(null)

onMounted(() => {
  const fromQuery = new URLSearchParams(window.location.search).get('tag')
  if (!fromQuery) return
  const exists = allTags.value.some(({ tag }) => tag === fromQuery)
  selected.value = exists ? fromQuery : null
})

const filtered = computed(() => {
  if (!selected.value) return posts
  return posts.filter((p) => (p.frontmatter.tags ?? []).includes(selected.value as string))
})
</script>

<style scoped>
.tags-page {
  max-width: 720px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 2rem;
}

.filter-btn {
  font-size: 0.8rem;
  font-family: var(--vp-font-family-mono);
  background: var(--q-card-bg);
  border: 1px solid var(--q-card-border);
  color: var(--vp-c-text-2);
  border-radius: 4px;
  padding: 3px 10px;
  cursor: pointer;
  transition: all 0.18s;
}

.filter-btn span {
  color: var(--vp-c-text-3);
  margin-left: 4px;
}

.filter-btn.active,
.filter-btn:hover {
  border-color: rgba(88, 166, 255, 0.45);
  color: var(--vp-c-brand-1);
}

.article-list {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
</style>
