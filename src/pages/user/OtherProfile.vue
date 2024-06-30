<template>
  <div class="mt-20 py-4">
    <user-profile :user="user"></user-profile>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'

import UserProfile from '../../components/user/UserProfile.vue'

import { useUsersStore } from '../../stores/users'

const props = defineProps(['id'])

const usersStore = useUsersStore()

const user = computed(() => usersStore.getUserById(props.id))

onBeforeMount(() => {
  usersStore.getUsersList()
})
</script>
