<template>
  <transition name="scroll-top-btn">
    <button
      v-show="isVisible"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 p-1 bg-blue-500 text-white rounded-full shadow-xl hover:bg-blue-600 transition duration-300"
    >
      <svg-icon name="up-arrow" height="50" width="50"></svg-icon>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const toggleVisibility = () => {
  isVisible.value = window.scrollY > 200
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', toggleVisibility)
})
</script>

<style scoped>
.scroll-top-btn-enter-from,
.scroll-top-btn-leave-to {
  /* opacity: 0; */
  transform: translateY(100px);
}

.scroll-top-btn-enter-active {
  transition: all 0.45s ease-out;
}

.scroll-top-btn-leave-active {
  transition: all 0.45s ease-in;
}

.scroll-top-btn-enter-to,
.scroll-top-btn-leave-from {
  /* opacity: 1; */
  transform: translateY(0);
}
</style>
