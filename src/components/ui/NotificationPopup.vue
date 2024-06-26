<template>
  <transition name="fade">
    <div v-if="visible" class="fixed bottom-4 right-4 z-50">
      <div class="bg-white rounded-lg shadow-md p-4">
        <div class="flex justify-between items-center">
          <p class="text-lg text-gray-800">{{ message }}</p>
          <button
            @click="closeNotification"
            class="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 1a9 9 0 110 18 9 9 0 010-18zm5.293 5.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 10-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 101.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, provide } from 'vue'

const visible = ref(false)
const message = ref('')

const showNotification = (msg) => {
  message.value = msg
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000) // Close notification after 3 seconds
}

const closeNotification = () => {
  visible.value = false
}

// Expose methods to parent component
provide('showNotification', showNotification)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
