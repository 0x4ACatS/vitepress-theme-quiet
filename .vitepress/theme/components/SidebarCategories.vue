<template>
  <nav class="shelf-section">
    <p class="shelf-heading">
      <FontAwesomeIcon :icon="faBookmark" class="shelf-icon" />
      分类
    </p>
    <ul class="shelf-list">
      <li v-for="cat in categories" :key="cat.name">
        <a :href="withBase(`/categories?category=${encodeURIComponent(cat.name)}`)" class="shelf-link">
          {{ cat.name }}
          <span class="shelf-count">{{ cat.count }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

defineProps<{
  categories: Array<{
    name: string
    count: number
  }>
}>()
</script>

<style scoped>
.shelf-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--vp-c-text-3);
  margin: 0 0 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.shelf-icon {
  font-size: 0.85rem;
  width: 1em;
  height: 1em;
}

.shelf-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.shelf-link {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  transition: background 0.15s, color 0.15s;
}

.shelf-link:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-brand-1);
}

.shelf-count {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}
</style>
