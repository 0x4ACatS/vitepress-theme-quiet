<template>
  <canvas ref="canvas" class="star-field" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let animFrame: number
let cleanup: (() => void) | null = null

onMounted(async () => {
  const el = canvas.value
  if (!el) return

  const THREE = await import('three')

  const renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100)
  camera.position.z = 2.5

  // Far layer — many small dim stars
  const farCount = 500
  const farPos = new Float32Array(farCount * 3)
  for (let i = 0; i < farCount; i++) {
    farPos[i * 3]     = (Math.random() - 0.5) * 8
    farPos[i * 3 + 1] = (Math.random() - 0.5) * 8
    farPos[i * 3 + 2] = (Math.random() - 0.5) * 4
  }
  const farGeo = new THREE.BufferGeometry()
  farGeo.setAttribute('position', new THREE.BufferAttribute(farPos, 3))
  const farMat = new THREE.PointsMaterial({
    color: 0xC8D8E8,
    size: 0.012,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const farPoints = new THREE.Points(farGeo, farMat)
  scene.add(farPoints)

  // Near layer — fewer larger brighter stars
  const nearCount = 180
  const nearPos = new Float32Array(nearCount * 3)
  for (let i = 0; i < nearCount; i++) {
    nearPos[i * 3]     = (Math.random() - 0.5) * 6
    nearPos[i * 3 + 1] = (Math.random() - 0.5) * 6
    nearPos[i * 3 + 2] = (Math.random() - 0.5) * 3
  }
  const nearGeo = new THREE.BufferGeometry()
  nearGeo.setAttribute('position', new THREE.BufferAttribute(nearPos, 3))
  const nearMat = new THREE.PointsMaterial({
    color: 0xE6EDF3,
    size: 0.028,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const nearPoints = new THREE.Points(nearGeo, nearMat)
  scene.add(nearPoints)

  const resize = () => {
    const w = el.offsetWidth
    const h = el.offsetHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()

  const resizeObs = new ResizeObserver(resize)
  resizeObs.observe(el)

  let t = 0
  const draw = () => {
    animFrame = requestAnimationFrame(draw)
    t += 0.00025

    farPoints.rotation.y  = t * 0.4
    farPoints.rotation.x  = t * 0.15
    nearPoints.rotation.y = t * 0.65
    nearPoints.rotation.x = t * 0.22

    farMat.opacity  = 0.38 + Math.sin(t * 2.1) * 0.12
    nearMat.opacity = 0.65 + Math.sin(t * 1.7 + 1) * 0.15

    renderer.render(scene, camera)
  }
  draw()

  cleanup = () => {
    cancelAnimationFrame(animFrame)
    resizeObs.disconnect()
    farGeo.dispose()
    farMat.dispose()
    nearGeo.dispose()
    nearMat.dispose()
    renderer.dispose()
  }
})

onUnmounted(() => cleanup?.())
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
