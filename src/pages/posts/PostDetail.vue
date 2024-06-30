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
import { computed, onBeforeMount } from 'vue'

import { usePostsStore } from '../../stores/posts'
import { useUsersStore } from '../../stores/users'

import PostLayout from '../../components/posts/PostLayout.vue'

const props = defineProps(['id'])

const postsStore = usePostsStore()
const usersStore = useUsersStore()

const post = computed(() => postsStore.getPost(props.id))

const getUser = (userId) => {
  return usersStore.getUserById(userId)
}

const togglePost = (postId) => {
  postsStore.togglePost(postId)
}

onBeforeMount(() => {
  usersStore.getUsersList()
  postsStore.getPostsList()
})
</script>
