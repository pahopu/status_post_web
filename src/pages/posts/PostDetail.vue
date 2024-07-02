<template>
  <div class="mt-20 py-4">
    <base-card v-if="isLoading">
      <loading-spinner></loading-spinner>
    </base-card>
    <post-layout
      v-else
      :postId="post.id"
      :userId="post.userId"
      :userName="getUser(post.userId).name"
      :postTime="post.time"
      :userAvatar="getUser(post.userId).avt"
      :postContent="post.content"
      :postImage="post.img"
      :postComments="post.comments"
      :isDetail="true"
      @hidden="togglePost"
    ></post-layout>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, onBeforeMount } from 'vue'

import { usePostsStore } from '../../stores/posts'
import { useUsersStore } from '../../stores/users'

import PostLayout from '../../components/posts/PostLayout.vue'

const props = defineProps(['id'])

const postsStore = usePostsStore()
const usersStore = useUsersStore()

const isLoading = ref(false)

const post = computed(() => postsStore.getPost(props.id))

const getUser = (userId) => {
  return usersStore.getUserById(userId)
}
const togglePost = (postId) => {
  postsStore.togglePost(postId)
}
const loadingUsers = async () => {
  isLoading.value = true
  await usersStore.getUsersList(true)
  isLoading.value = false
}

const loadingPosts = async () => {
  isLoading.value = true
  await postsStore.getPostsList()
  isLoading.value = false
}

onBeforeMount(() => {
  loadingUsers()
})

onMounted(() => {
  loadingPosts()
})
</script>
