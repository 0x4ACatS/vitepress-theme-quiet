<template>
  <div class="status-card">
    <div class="status-header">
      <span class="status-dot" />
      <span class="status-label">Status</span>
    </div>
    <ul class="status-list">
      <li v-if="status">
        <FontAwesomeIcon :icon="faKeyboard" class="status-icon" />
        <span>{{ status }}</span>
      </li>
      <li v-if="reading">
        <FontAwesomeIcon :icon="faBook" class="status-icon" />
        <span>{{ reading }}</span>
      </li>
      <li v-if="mood">
        <FontAwesomeIcon :icon="faMoon" class="status-icon" />
        <span>{{ mood }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faKeyboard, faBook, faMoon } from '@fortawesome/free-solid-svg-icons'

withDefaults(
  defineProps<{ status?: string; reading?: string; mood?: string }>(),
  { status: '正在写博客', reading: '待填写', mood: '平静' }
)
</script>

<style scoped>
.status-card {
  background: var(--q-card-bg);
  border: 1px solid var(--q-card-border);
  border-radius: var(--q-card-radius);
  padding: 1rem 1.25rem;
}

.status-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #3FB950;
  border-radius: 50%;
  box-shadow: 0 0 6px #3FB950;
  animation: pulse 2.4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.status-label {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.status-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.status-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.status-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.125em;
}

.now-icon { font-size: 0.9rem; flex-shrink: 0; }
</style>
