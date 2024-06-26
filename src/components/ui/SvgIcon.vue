<template>
  <div>
    <img
      :src="iconPath"
      :alt="iconName"
      :style="{
        width: `${props.width}px`,
        height: `${props.height}px`
      }"
      class="select-none"
    />
  </div>
</template>

<script setup>
import { watchEffect, ref, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  width: {
    type: [String, Number],
    default: 24
  },
  height: {
    type: [String, Number],
    default: 24
  }
})

const iconName = computed(
  () =>
    props.name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + 'Icon'
)

const iconPath = ref('')
watchEffect(() => {
  import(`../../assets/icons/${iconName.value}.svg`)
    .then((module) => {
      iconPath.value = module.default
    })
    .catch(() => {
      iconPath.value = require(`../../assets/icons/default.svg`)
    })
})
</script>
