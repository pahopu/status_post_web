<template>
  <div>
    <base-dialog :show="isDelete" title="Delete Post" mode="dialog-header" @close="toggleIsDelete">
      <p class="pb-8 text-lg">Do you want to delete this post?</p>
      <template #button>
        <div class="flex justify-end gap-4">
          <button
            class="w-24 h-10 bg-gray-300 text-gray-700 rounded-full hover:brightness-105"
            @click="toggleIsDelete"
          >
            Cancel
          </button>
          <button
            @click="deletePost(props.postId)"
            class="w-24 h-10 bg-red-500 text-white rounded-full hover:brightness-105"
          >
            Delete
          </button>
        </div>
      </template>
    </base-dialog>
    <base-card>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <user-avt :avt="props.userAvatar" :id="props.userId"></user-avt>
          <div class="ml-4">
            <h2 class="font-bold hover:underline cursor-pointer" @click="goToProfile">
              {{ props.userName }}
            </h2>
            <p class="text-gray-500">{{ timeAgo(props.postTime) }}</p>
          </div>
        </div>
        <div
          @click="hiddenOrDelete"
          class="flex items-center justify-center rounded-full w-10 h-10 hover:bg-gray-200 active:opacity-55 cursor-pointer active:scale-95"
        >
          <svg-icon :name="iconName" width="30" height="30"></svg-icon>
        </div>
      </div>
      <div class="mt-4">
        <p>{{ props.postContent }}</p>
      </div>
      <!-- <div class="mt-4">
        <div v-for="comment in props.postComments" :key="comment.id" class="flex items-center">
          <img
            :src="comment.userAvt"
            :alt="comment.userName"
            class="w-8 h-8 rounded-full hover:brightness-105"
          />
          <div class="ml-2">
            <h3 class="font-bold">{{ comment.userName }}</h3>
            <p>{{ comment.content }}</p>
            <p class="text-gray-500">{{ timeAgo(comment.time) }}</p>
          </div>
        </div>
      </div> -->
      <div class="mt-4">
        <img
          v-if="props.postImage"
          :src="props.postImage"
          :alt="`${props.userName} img`"
          class="w-full select-none"
        />
      </div>
      <div class="flex items-center justify-between mt-4 select-none">
        <p class="text-gray-500">{{ props.postComments.length }} comments</p>
        <button @click="showComments" class="hover:text-blue-600">View Comments</button>
      </div>
    </base-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { usePostsStore } from '../../stores/posts'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const postsStore = usePostsStore()

const props = defineProps([
  'postId',
  'userId',
  'userName',
  'postTime',
  'userAvatar',
  'postContent',
  'postImage',
  'postComments'
])

const userrId = computed(() => authStore.userId)
const isMe = computed(() => props.userId === userrId.value)
const iconName = computed(() => (isMe.value ? 'delete' : 'close'))

const isDelete = ref(false)
const toggleIsDelete = () => {
  isDelete.value = !isDelete.value
}
const deletePost = (id) => {
  if (isMe.value) {
    postsStore.deletePost(id)
  }
}

const emits = defineEmits(['hidden'])
const hiddenOrDelete = () => {
  if (isMe.value) {
    toggleIsDelete()
  } else {
    emits('hidden', props.postId)
  }
}

const router = useRouter()
const goToProfile = () => {
  if (isMe.value) router.replace('/myprofile')
  else router.push(`/profile/${props.userId}`)
}

const timeAgo = (timeStamp) => {
  const current = new Date()
  const previous = new Date(timeStamp)

  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24

  const elapsed = current - previous

  if (Math.round(elapsed / 1000) === 0) {
    return 'Just now'
  } else if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago'
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago'
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago'
  } else if (elapsed < msPerDay * 3) {
    return Math.round(elapsed / msPerDay) + ' days ago'
  } else {
    const day = previous.getDate().toString().padStart(2, '0')
    const month = (previous.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
    const year = previous.getFullYear()
    const hours = previous.getHours().toString().padStart(2, '0')
    const minutes = previous.getMinutes().toString().padStart(2, '0')

    return `${day}/${month}/${year} at ${hours}:${minutes}`
  }
}
</script>
