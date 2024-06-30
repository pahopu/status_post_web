<template>
  <img
    @click="goToProfile"
    :src="props.avt"
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

const router = useRouter()

const goToProfile = () => {
  if (userId.value === props.id) {
    router.replace('/my-profile')
  } else {
    router.replace(`/profile/${props.id}`)
  }
}
</script>
