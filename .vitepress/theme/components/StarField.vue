<template>
  <canvas ref="canvas" class="star-field" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let animFrame: number

interface Star {
  x: number
  y: number
  r: number
  alpha: number
  speed: number
  dir: 1 | -1
}

onMounted(() => {
  const el = canvas.value
  if (!el) return

  const ctx = el.getContext('2d')!
  let w = 0, h = 0
  const stars: Star[] = []

  const resize = () => {
    w = el.width  = el.offsetWidth
    h = el.height = el.offsetHeight
  }

  const seed = () => {
    stars.length = 0
    const count = Math.floor((w * h) / 6000)
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.003 + 0.001,
        dir: Math.random() > 0.5 ? 1 : -1,
      })
    }
  }

  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    for (const s of stars) {
      s.alpha += s.speed * s.dir
      if (s.alpha >= 0.75 || s.alpha <= 0.05) s.dir *= -1
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(230, 237, 243, ${s.alpha})`
      ctx.fill()
    }
    animFrame = requestAnimationFrame(draw)
  }

  resize()
  seed()
  draw()

  window.addEventListener('resize', () => { resize(); seed() })
})

onUnmounted(() => cancelAnimationFrame(animFrame))
</script>

<style scoped>
.star-field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
