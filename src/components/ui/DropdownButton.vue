<template>
  <button v-if="!props.link" :class="props.mode">
    <slot></slot>
  </button>
  <router-link v-else :to="props.to" :class="props.mode">
    <slot></slot>
  </router-link>
</template>

<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: null
  },
  link: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: '/'
  }
})
</script>

<style scoped lang="postcss">
a {
  @apply block px-4 py-2 text-sm text-gray-700;
}

button {
  @apply block w-full px-4 py-2 text-left text-sm text-gray-700;
}

a:active,
button:active,
a:hover,
button:hover {
  @apply bg-gray-100 text-gray-900;
}
</style>
