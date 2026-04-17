<template>
  <nav class="shelf-section">
    <p class="shelf-heading">
      <FontAwesomeIcon :icon="faTag" class="shelf-icon" />
      标签
    </p>
    <div class="tag-cloud">
      <a
        v-for="tag in tags"
        :key="tag"
        :href="withBase(`/tags?tag=${encodeURIComponent(tag)}`)"
        class="cloud-tag"
      >#{{ tag }}</a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'

defineProps<{
  tags: string[]
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

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.cloud-tag {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  padding: 1px 8px;
  text-decoration: none;
  transition: color 0.15s, border-color 0.15s;
}

.cloud-tag:hover {
  color: var(--vp-c-brand-1);
  border-color: rgba(88, 166, 255, 0.4);
}
</style>
