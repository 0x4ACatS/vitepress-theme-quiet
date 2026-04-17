<template>
  <div class="home">

    <NavBar />

    <!-- Hero / Window -->
    <section class="hero">
      <StarField />
      <div class="hero-fade" aria-hidden="true" />
      <div class="hero-content">
        <p class="hero-eyebrow">{{ siteData.title }}</p>
        <h1 class="hero-title">在混乱中<br>保持安静</h1>
        <p class="hero-sub">{{ siteData.description }}</p>
        <a href="#posts" class="hero-btn">→ 进入阅读</a>
      </div>
    </section>

    <!-- Body: sidebar + posts -->
    <div class="body-wrap">

      <!-- Sidebar / Bookshelf -->
      <aside class="sidebar">
        <NowStatus :status="now.status" :reading="now.reading" :mood="now.mood" />
        <div class="sidebar-extra">
          <SidebarCategories :categories="categories" />
        </div>
        <div class="sidebar-extra">
          <SidebarTags :tags="allTags" />
        </div>
      </aside>

      <!-- Main: post list -->
      <main id="posts" class="main">
        <h2 class="section-title">最近文章</h2>
        <PostList :posts="recentPosts" />
        <div v-if="recentPosts.length < allPosts.length" class="more-wrap">
          <a :href="withBase('/posts/')" class="more-link">查看全部文章 →</a>
        </div>
      </main>

    </div>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase, useData } from 'vitepress'
import { data as posts } from '../posts.data'
import StarField   from '../components/StarField.vue'
import NowStatus   from '../components/Status.vue'
import PostList    from '../components/PostList.vue'
import SiteFooter  from '../components/Footer.vue'
import NavBar      from '../components/NavBar.vue'
import SidebarCategories from '../components/SidebarCategories.vue'
import SidebarTags from '../components/SidebarTags.vue'

const { site: siteData } = useData()

// "Now" status — edit freely
const now = {
  status:  '正在写博客',
  reading: '待填写',
  mood:    '平静',
}

const allPosts = computed(() =>
  [...posts].sort((a, b) => {
    const da = a.frontmatter.date ? +new Date(a.frontmatter.date) : 0
    const db = b.frontmatter.date ? +new Date(b.frontmatter.date) : 0
    return db - da
  })
)

const recentPosts = computed(() => allPosts.value.slice(0, 8))

const allTags = computed(() => {
  const set = new Set<string>()
  for (const p of allPosts.value) {
    for (const t of (p.frontmatter.tags ?? [])) set.add(t)
  }
  return [...set]
})

const categories = computed(() => {
  const map = new Map<string, number>()
  for (const p of allPosts.value) {
    const cat = p.frontmatter.category as string | undefined
    if (cat) map.set(cat, (map.get(cat) ?? 0) + 1)
  }
  return [...map.entries()].map(([name, count]) => ({ name, count }))
})
</script>

<style scoped>
.home {
  position: relative;
  isolation: isolate;
}

/* ── Hero ──────────────────────────────────────────────────────────── */
.hero {
  position: relative;
  z-index: 0;
  height: 56vh;
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 1.5rem;
  animation: fadeIn 0.9s ease both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-eyebrow {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin: 0 0 0.75rem;
}

.hero-title {
  font-family: var(--vp-font-family-mono);
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem;
  line-height: 1.25;
}

.hero-sub {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  max-width: 500px;
  margin: 0 auto 1.75rem;
  line-height: 1.7;
}

.hero-btn {
  display: inline-block;
  font-family: var(--vp-font-family-mono);
  font-size: 0.88rem;
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(88, 166, 255, 0.4);
  border-radius: 6px;
  padding: 0.5rem 1.25rem;
  text-decoration: none;
  backdrop-filter: blur(4px);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.hero-btn:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 14px rgba(88, 166, 255, 0.25);
}

/* gradient veil that dissolves the starfield into the posts section */
.hero-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45%;
  background: linear-gradient(to bottom, transparent 0%, #0F1117 100%);
  pointer-events: none;
  z-index: 1;
}

/* ── Body ──────────────────────────────────────────────────────────── */
.body-wrap {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
  background: var(--vp-c-bg);
}

/* ── Sidebar ───────────────────────────────────────────────────────── */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 5rem;
  z-index: 2;
  height: fit-content;
}

@media (max-width: 768px) {
  .body-wrap {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding-top: 1.5rem;
  }

  .sidebar {
    position: static;
    top: auto;
    z-index: 1;
    height: auto;
  }

  .sidebar-extra {
    display: none;
  }
}

.main {
  position: relative;
  z-index: 1;
  min-width: 0;
}

/* ── Main ──────────────────────────────────────────────────────────── */
.section-title {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--vp-c-text-3);
  margin: 0 0 1.25rem;
}

.more-wrap {
  text-align: center;
  margin-top: 1.75rem;
}

.more-link {
  font-size: 0.85rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
  text-decoration: none;
  opacity: 0.75;
  transition: opacity 0.2s;
}
.more-link:hover { opacity: 1; }
</style>
