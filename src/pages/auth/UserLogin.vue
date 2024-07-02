<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <base-dialog
      :show="!!findError"
      title="An error occured"
      mode="dialog-header"
      @close="handleError"
    >
      <p class="mt-4">{{ findError }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Login..." fixed mode="dialog-header">
      <div class="flex-col justify-center items-center mt-4">
        <loading-spinner></loading-spinner>
        <div class="mt-2 text-center">Login in progress</div>
      </div>
    </base-dialog>
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-md">
      <h2 class="text-2xl font-bold text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="text-center">
            <router-link to="/sign-up" class="text-blue-500 hover:underline select-none">
              Don't have an account? Sign up
            </router-link>
          </div>
          <div>
            <button
              type="submit"
              class="select-none w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const findError = ref('')
const isLoading = ref(false)

const login = async () => {
  isLoading.value = true
  try {
    await authStore.login(email.value, password.value)
    const redirectUrl = `/${route.query.redirectUrl || 'feed'}`
    router.replace(redirectUrl)
  } catch (error) {
    findError.value = error.message || 'Failed to authenticate. Check your login data.'
  }
  isLoading.value = false
  window.location.reload()
}

const handleError = () => {
  findError.value = ''
}
</script>
