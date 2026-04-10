<template>
  <nav class="q-navbar">
    <div class="q-navbar-inner">
      <a :href="withBase('/')" class="q-navbar-brand">{{ siteData.title }}</a>

      <div class="q-navbar-links">
        <a
          v-for="link in navLinks"
          :key="link.path"
          :href="withBase(link.path)"
          :class="['q-navbar-link', { 'is-active': isActive(link.path) }]"
        >{{ link.text }}</a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="q-navbar-link q-navbar-gh"
          aria-label="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useData, useRoute, withBase } from 'vitepress'

const { site: siteData } = useData()
const route = useRoute()

const navLinks = [
  { text: '首页', path: '/' },
  { text: '文章', path: '/posts/' },
  { text: '分类', path: '/categories' },
  { text: '标签', path: '/tags' },
]

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path.replace(/\/$/, ''))
}
</script>

<style scoped>
.q-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 64px;
  background: var(--q-nav-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--vp-c-border);
}

.q-navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
}

.q-navbar-brand {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: color 0.15s;
  flex-shrink: 0;
}
.q-navbar-brand:hover { color: var(--vp-c-brand-1); }

.q-navbar-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.q-navbar-link {
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.15s;
  display: flex;
  align-items: center;
}
.q-navbar-link:hover,
.q-navbar-link.is-active { color: var(--vp-c-brand-1); }
.q-navbar-link.is-active { font-weight: 500; }

.q-navbar-gh { color: var(--vp-c-text-3); }
.q-navbar-gh:hover { color: var(--vp-c-text-1); }
</style>
