<template>
  <div class="mt-20">
    <div v-if="isLoading" class="pt-4">
      <base-card>
        <loading-spinner></loading-spinner>
      </base-card>
    </div>
    <div v-else-if="visiblePosts.length">
      <post-layout
        v-for="post in visiblePosts"
        :key="post.id"
        :postId="post.id"
        :userId="post.userId"
        :userName="getUser(post.userId).name"
        :postTime="post.time"
        :userAvatar="getUser(post.userId).avt"
        :postContent="post.content"
        :postImage="post.img"
        :postComments="post.comments"
        class="first:pt-4 pt-2 last:pb-4"
        @hidden="togglePost"
      ></post-layout>
    </div>
    <div class="pt-4" v-else>
      <base-card>
        <p class="text-center text-xl font-medium p-4">Your news feed is empty!</p>
      </base-card>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { usePostsStore } from '../../stores/posts'
import { useUsersStore } from '../../stores/users'

import PostLayout from '../../components/posts/PostLayout.vue'

const postsStore = usePostsStore()
const usersStore = useUsersStore()

const isLoading = ref(false)

const getUser = (userId) => {
  return usersStore.getUserById(userId)
}

const togglePost = (postId) => {
  postsStore.togglePost(postId)
}

const visiblePosts = computed(() => postsStore.notHiddenPosts)

const loadingPosts = async () => {
  isLoading.value = true
  await postsStore.getPostsList()
  isLoading.value = false
}

onMounted(() => {
  loadingPosts()
})
</script>
