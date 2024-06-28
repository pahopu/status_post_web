<template>
  <div
    class="border shadow-md my-2 mx-auto rounded-xl"
    :class="[props.mw, props.padding, props.overflow]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  mw: {
    type: String,
    default: 'max-w-2xl'
  },
  padding: {
    type: String,
    default: 'p-4'
  },
  overflow: {
    type: String,
    default: 'overflow-hidden'
  }
})
</script>
