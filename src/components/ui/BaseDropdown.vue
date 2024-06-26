<template>
  <div class="relative inline-block text-left">
    <button
      type="button"
      class="flex bg-gray-400 rounded-full active:scale-95"
      id="user-menu-button"
      @click="toggleMenu"
    >
      <div class="bg-white rounded-full"></div>
      <img
        class="w-12 h-12 rounded-full active:opacity-80 hover:brightness-105"
        :src="user.avt"
        :alt="`${user.id} avatar`"
      />
    </button>
    <transition name="dropdown-opt">
      <div
        class="absolute right-0 z-10 mt-2 w-70 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        v-if="isMenuOpen"
      >
        <div class="px-4 py-3 select-text">
          <span class="block text-sm text-gray-900">{{ user.name }}</span>
          <span class="block text-sm text-gray-500 truncate">{{ user.email }}</span>
        </div>
        <div class="py-1">
          <dropdown-button link to="/myprofile" @click="toggleMenu">My profile</dropdown-button>
          <dropdown-button @click="logOut">Log out</dropdown-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import DropdownButton from '../../components/ui/DropdownButton.vue'

import { useAuthStore } from '../../stores/auth'
import { useUsersStore } from '../../stores/users'

const authStore = useAuthStore()
const usersStore = useUsersStore()

const userId = computed(() => authStore.userId)
const user = computed(() => usersStore.getUserById(userId.value))

const isMenuOpen = ref(false)
const router = useRouter()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logOut = () => {
  router.replace('/login')
  toggleMenu()
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="postcss">
.dropdown-opt-enter-from,
.dropdown-opt-leave-to {
  @apply transform opacity-0 scale-95;
}

.dropdown-opt-enter-to,
.dropdown-opt-leave-from {
  @apply transform opacity-100 scale-100;
}

.dropdown-opt-enter-active {
  @apply transition ease-out duration-100;
}

.dropdown-opt-leave-active {
  @apply transition ease-in duration-75;
}
</style>
