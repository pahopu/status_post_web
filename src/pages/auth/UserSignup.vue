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
    <base-dialog :show="isLoading" title="Sign up..." fixed mode="dialog-header">
      <div class="flex-col justify-center items-center mt-4">
        <loading-spinner></loading-spinner>
        <div class="mt-2 text-center">Signup in progress</div>
      </div>
    </base-dialog>
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-md">
      <h2 class="text-2xl font-bold text-center">Sign Up</h2>
      <form @submit.prevent="signup" novalidate>
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              v-model="username"
              @input="toggleUsernameValid"
              class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <p v-if="!usernameValid" class="mt-1 text-sm text-red-600">
              Username must contain at least one letter.
            </p>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              @input="toggleEmailValid"
              class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <p v-if="!emailValid" class="mt-1 text-sm text-red-600">Invalid email address.</p>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              @input="togglePasswordValid"
              class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <p v-if="!passwordValid" class="mt-1 text-sm text-red-600">
              Password must be at least 6 characters long.
            </p>
          </div>
          <div class="text-center">
            <router-link to="/log-in" class="text-blue-500 hover:underline select-none">
              Already have an account? Log in
            </router-link>
          </div>
          <div>
            <button
              type="submit"
              class="w-full select-none px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const findError = ref('')

const router = useRouter()
const route = useRoute()

const usernameValid = ref(true)
const emailValid = ref(true)
const passwordValid = ref(true)

const validateUsername = () => {
  usernameValid.value = /[A-Za-z]/.test(username.value)
}

const validateEmail = () => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/
  emailValid.value = re.test(String(email.value).toLowerCase())
}

const validatePassword = () => {
  passwordValid.value = password.value.length >= 6
}

const toggleUsernameValid = () => {
  usernameValid.value = true
}

const toggleEmailValid = () => {
  emailValid.value = true
}

const togglePasswordValid = () => {
  passwordValid.value = true
}

const signup = async () => {
  validateUsername()
  validateEmail()
  validatePassword()

  if (usernameValid.value && emailValid.value && passwordValid.value) {
    isLoading.value = true
    try {
      await authStore.signup(email.value, password.value, username.value)
      const redirectUrl = `/${route.query.redirectUrl || 'feed'}`
      router.replace(redirectUrl)
    } catch (error) {
      findError.value = error.message || 'Failed to authenticate. Check your signup data.'
    }
    isLoading.value = false
  }
}

const handleError = () => {
  findError.value = ''
}
</script>
