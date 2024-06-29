<template>
  <img
    @click="goToProfile"
    :src="avtUrl"
    :alt="props.id"
    class="w-12 h-12 rounded-full border hover:brightness-105 cursor-pointer select-none"
  />
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

const userId = computed(() => authStore.userId)

const props = defineProps(['avt', 'id'])

const avtUrl = computed(() => {
  return (
    props.avt ||
    'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1'
  )
})

const router = useRouter()

const goToProfile = () => {
  if (userId.value === props.id) {
    router.replace('/my-profile')
  } else {
    router.replace(`/profile/${props.id}`)
  }
}
</script>
