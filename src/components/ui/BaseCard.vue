<template>
  <div
    class="border shadow-md my-2 mx-auto rounded-xl overflow-hidden"
    :class="[props.mw, props.padding]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  mw: {
    type: String,
    default: 'max-w-2xl'
  },
  padding: {
    type: String,
    default: 'p-4'
  }
})
</script>
