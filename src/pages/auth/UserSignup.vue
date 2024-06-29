<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <base-dialog :show="isLoading" title="Sign up" fixed mode="dialog-header">
      <div class="flex-col justify-center items-center mt-4">
        <loading-spinner></loading-spinner>
        <div class="mt-2 text-center">Signup in progress</div>
      </div>
    </base-dialog>
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-md">
      <h2 class="text-2xl font-bold text-center">Sign Up</h2>
      <form @submit.prevent="signin">
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              v-model="username"
              required
              class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              required
              class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              required
              class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
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
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')

const router = useRouter()

const signin = () => {
  // Example sign-in logic, replace with actual registration logic
  if (username.value && email.value && password.value) {
    // You can add more detailed checks here
    router.push('/feed') // Navigate to a welcome or dashboard page after successful sign-in
  } else {
    alert('Please fill in all fields')
  }
}
</script>
