<template>
  <transition name="fade">
    <div
      v-if="props.show"
      class="fixed bottom-4 left-4 bg-green-100 text-green-700 border border-green-400 py-4 px-8 rounded shadow-md flex items-center justify-between space-x-4"
    >
      <slot></slot>
      <svg-icon
        class="absolute top-1 right-1"
        name="close"
        height="15"
        width="15"
        @click="tryClose"
      ></svg-icon>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close'])
const tryClose = () => {
  emits('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
