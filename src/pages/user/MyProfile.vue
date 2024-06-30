<template>
  <div class="mt-20 py-4">
    <user-profile :user="user"></user-profile>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'

import UserProfile from '../../components/user/UserProfile.vue'

import { useAuthStore } from '../../stores/auth'
import { useUsersStore } from '../../stores/users'

const authStore = useAuthStore()
const usersStore = useUsersStore()

const user = computed(() => usersStore.getUserById(authStore.userId))

onBeforeMount(() => {
  usersStore.getUsersList()
})
</script>
