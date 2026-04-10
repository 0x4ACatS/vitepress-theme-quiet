<template>
  <div>
    <NavBar />

    <div class="categories-page">
      <h1>分类</h1>

      <div class="category-filter">
        <button
          v-for="{ category, count } in allCategories"
          :key="category"
          :class="['filter-btn', { active: selected === category }]"
          @click="selected = selected === category ? null : category"
        >
          {{ category }} <span>{{ count }}</span>
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
import PostCard from '../components/PostCard.vue'

const allCategories = computed(() => {
  const map = new Map<string, number>()
  for (const p of posts) {
    const category = p.frontmatter.category
    if (typeof category === 'string' && category.trim()) {
      map.set(category, (map.get(category) ?? 0) + 1)
    }
  }
  return [...map.entries()].map(([category, count]) => ({ category, count }))
})

const selected = ref<string | null>(null)

onMounted(() => {
  const fromQuery = new URLSearchParams(window.location.search).get('category')
  if (!fromQuery) return
  const exists = allCategories.value.some(({ category }) => category === fromQuery)
  selected.value = exists ? fromQuery : null
})

const filtered = computed(() => {
  if (!selected.value) return posts
  return posts.filter((p) => p.frontmatter.category === selected.value)
})
</script>

<style scoped>
.categories-page {
  max-width: 720px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.category-filter {
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
