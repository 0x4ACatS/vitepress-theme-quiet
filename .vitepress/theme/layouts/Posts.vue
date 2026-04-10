<template>
  <div>
    <NavBar />

    <div class="posts-page">
      <PostList :posts="sorted" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../posts.data'
import NavBar from '../components/NavBar.vue'
import PostList from '../components/PostList.vue'

const sorted = computed(() =>
  [...posts].sort((a, b) => {
    const da = a.frontmatter.date ? +new Date(a.frontmatter.date) : 0
    const db = b.frontmatter.date ? +new Date(b.frontmatter.date) : 0
    return db - da
  })
)
</script>

<style scoped>
.posts-page {
  max-width: 760px;
  margin: 2rem auto;
  padding: 0 1.5rem 4rem;
}
</style>
