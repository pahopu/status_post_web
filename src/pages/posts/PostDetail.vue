<template>
  <div class="mt-20 py-4">
    <post-layout
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
import { computed } from 'vue'

import { usePostsStore } from '../../stores/posts'
import { useUsersStore } from '../../stores/users'
import { useAuthStore } from '../../stores/auth'

import PostLayout from '../../components/posts/PostLayout.vue'

const props = defineProps(['id'])

const postsStore = usePostsStore()
const usersStore = useUsersStore()
const authStore = useAuthStore()

const post = computed(() => postsStore.getPost(props.id))
const currentUser = computed(() => usersStore.getUserById(authStore.userId))

const getUser = (userId) => {
  return usersStore.getUserById(userId)
}

const togglePost = (postId) => {
  postsStore.togglePost(postId)
}
</script>
