<template>
  <div class="mt-20">
    <post-create
      :name="user.name"
      :avt="user.avt"
      :id="user.id"
      class="pt-4"
      @save-data="saveData"
    ></post-create>
    <div>
      <div v-if="isLoading" class="pt-2">
        <base-card>
          <loading-spinner></loading-spinner>
        </base-card>
      </div>
      <div v-else-if="myPosts.length">
        <post-layout
          v-for="post in myPosts"
          :key="post.id"
          :postId="post.id"
          :userId="post.userId"
          :userName="user.name"
          :postTime="post.time"
          :userAvatar="user.avt"
          :postContent="post.content"
          :postImage="post.img"
          :postComments="post.comments"
          class="pt-2 last:pb-4"
        ></post-layout>
      </div>
      <div v-else class="pt-2">
        <base-card>
          <p class="text-center text-xl font-medium p-4">You have no posts!</p>
        </base-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import { usePostsStore } from '../../stores/posts'
import { useAuthStore } from '../../stores/auth'
import { useUsersStore } from '../../stores/users'

import PostCreate from '../../components/posts/PostCreate.vue'
import PostLayout from '../../components/posts/PostLayout.vue'

const postsStore = usePostsStore()
const authStore = useAuthStore()
const usersStore = useUsersStore()

const userId = computed(() => authStore.userId)
const user = computed(() => usersStore.getUserById(userId.value))
const myPosts = computed(() => postsStore.getPostsByUserId(userId.value))

const isLoading = ref(false)

const saveData = async (myPost) => {
  await postsStore.addPost(myPost)
}
const loadingPosts = async () => {
  isLoading.value = true
  await postsStore.getPostsList()
  isLoading.value = false
}

onMounted(() => {
  loadingPosts()
})
</script>
