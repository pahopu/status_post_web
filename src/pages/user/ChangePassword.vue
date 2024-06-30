<template>
  <div class="mt-20 pt-4">
    <change-password></change-password>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import ChangePassword from '../../components/user/ChangePassword.vue'

import { useUsersStore } from '../../stores/users'

usersStore = useUsersStore()

onBeforeMount(() => {
  usersStore.getUsersList()
})
</script>
