import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const auth = reactive({
    userId: 'u1'
  })

  const userId = computed(() => auth.userId)

  return {
    auth,
    userId
  }
})
