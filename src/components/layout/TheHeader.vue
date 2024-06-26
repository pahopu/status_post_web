<template>
  <header
    class="w-full h-20 bg-white flex justify-center items-center fixed top-0 start-0 z-40 border-b border-gray-200 select-none"
  >
    <nav class="w-11/12 m-auto flex justify-between items-center">
      <h1 class="flex justify-center items-center" @click="loadingPosts">
        <router-link to="/">
          <svg-icon name="logo" width="150" height="60"></svg-icon>
        </router-link>
      </h1>
      <div v-if="!isLoading">
        <div class="flex justify-center items-center" v-if="isAuthenticated">
          <ul class="nav">
            <li @click="loadingPosts">
              <router-link to="/feed">News Feed</router-link>
            </li>
            <li @click="loadingPosts">
              <router-link to="/my-posts">My Posts</router-link>
            </li>
          </ul>
          <base-dropdown></base-dropdown>
        </div>
        <ul v-else>
          <li>
            <router-link to="/sign-up">Sign up</router-link>
          </li>
          <li>
            <router-link to="/log-in" class="login">Log in</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useUsersStore } from '../../stores/users'

const authStore = useAuthStore()
const usersStore = useUsersStore()

const isLoading = ref(false)

const userId = computed(() => authStore.userId)
const isAuth = computed(() => authStore.isAuthenticated)
const isInUsersList = computed(() => getUserById(userId.value))
const isAuthenticated = computed(() => isInUsersList.value && isAuth.value)

const getUserById = (userId) => usersStore.getUserById(userId)
const loadingUsers = async () => {
  isLoading.value = true
  await usersStore.getUsersList()
  isLoading.value = false
}

onMounted(() => {
  loadingUsers()
})
</script>

<style scoped lang="postcss">
header a {
  @apply border-b border-solid border-transparent px-6 font-medium py-3 transition;
}

h1 a {
  @apply p-0;
}

a:active,
a:hover,
a.router-link-active {
  @apply text-blue-600 transition;
}

h1 a:active,
h1 a:hover,
h1 a.router-link-active {
  @apply border-transparent;
}

ul {
  @apply flex justify-center items-center;
}

.nav {
  @apply absolute left-1/2 -translate-x-1/2;
}

li {
  @apply mx-2;
}
</style>
