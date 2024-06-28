<template>
  <div class="relative inline-block text-left" :class="{'opacity-0': !props.show && !isMenuOpen}">
    <button class="flex w-9 h-9 items-center justify-center rounded-full active:scale-95 hover:bg-gray-100" @click="toggleMenu">
      <svg-icon name="more-horiz" height="30" width="30"></svg-icon>
    </button>
    <transition name="more-dropdown-opt">
      <div
        class="absolute p-1 left-1/2 -translate-x-1/2 transform z-10 mt-2 w-70 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        v-if="isMenuOpen"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps(['show'])

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="postcss">
.more-dropdown-opt-enter-from,
.more-dropdown-opt-leave-to {
  @apply transform opacity-0 scale-95;
}

.more-dropdown-opt-enter-to,
.more-dropdown-opt-leave-from {
  @apply transform opacity-100 scale-100;
}

.more-dropdown-opt-enter-active {
  @apply transition ease-out duration-100;
}

.more-dropdown-opt-leave-active {
  @apply transition ease-in duration-75;
}
</style>
