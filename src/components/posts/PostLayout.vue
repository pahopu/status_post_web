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
    <base-card :overflow="null" :padding="null">
      <div class="p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <user-avt :avt="props.userAvatar" :id="props.userId"></user-avt>
            <div class="ml-4">
              <h2 class="font-bold hover:underline cursor-pointer" @click="goToProfile">
                {{ props.userName }}
              </h2>
              <p class="text-gray-500 cursor-pointer" @click="seeDetail">
                {{ timeAgo(props.postTime) }}
              </p>
            </div>
          </div>
          <div
            v-if="!isDetail || (isDetail && iconName === 'delete')"
            @click="hiddenOrDelete"
            class="flex items-center justify-center rounded-full w-10 h-10 hover:bg-gray-200 active:opacity-55 cursor-pointer active:scale-95"
          >
            <svg-icon :name="iconName" width="30" height="30"></svg-icon>
          </div>
        </div>
        <div class="mt-4">
          <p class="whitespace-pre-wrap break-words">{{ props.postContent }}</p>
        </div>
      </div>
      <div>
        <img
          v-if="props.postImage"
          :src="props.postImage"
          :alt="`${props.userName} img`"
          class="w-full select-none pb-4"
        />
      </div>
      <div class="px-4 pb-4">
        <div class="flex items-center justify-between select-none">
          <p class="text-gray-500 text-left">{{ commentNumber }}</p>
          <button @click="seeDetail" class="hover:text-blue-600" v-if="!isDetail">
            View Detail
          </button>
        </div>
        <div class="mt-4 border-t border-gray-300" v-if="isDetail">
          <post-comment-input
            :userAvatar="getUser(userrId).avt"
            :userId="userrId"
            :postId="props.postId"
            @comment-post="addComment"
          ></post-comment-input>
          <div v-if="props.postComments.length">
            <post-comment
              v-for="comment in props.postComments"
              :key="comment.id"
              :commentId="comment.id"
              :userName="getUser(comment.userId).name"
              :userAvatar="getUser(comment.userId).avt"
              :commentContent="comment.content"
              :commentTime="timeAgo(comment.time)"
              :postUserId="props.userId"
              :currentUserId="userrId"
              :commentUserId="comment.userId"
              @update-comment="updateComment"
              @delete-comment="deleteComment"
              class="mt-5"
            ></post-comment>
          </div>
          <div v-else>
            <p class="text-center text-xl font-medium pt-4">No comments yet!</p>
          </div>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { usePostsStore } from '../../stores/posts'
import { useAuthStore } from '../../stores/auth'
import { useUsersStore } from '../../stores/users'

import PostComment from '../../components/posts/PostComment.vue'
import PostCommentInput from '../../components/posts/PostCommentInput.vue'

const authStore = useAuthStore()
const postsStore = usePostsStore()
const usersStore = useUsersStore()

const props = defineProps([
  'postId',
  'userId',
  'userName',
  'postTime',
  'userAvatar',
  'postContent',
  'postImage',
  'postComments',
  'isDetail'
])

const userrId = computed(() => authStore.userId)
const isMe = computed(() => props.userId === userrId.value)
const iconName = computed(() => (isMe.value ? 'delete' : 'close'))

const router = useRouter()

const isDelete = ref(false)
const toggleIsDelete = () => {
  isDelete.value = !isDelete.value
}
const deletePost = (id) => {
  if (isMe.value) {
    if (router.currentRoute.value.path === `/feed/${id}`) router.replace('/feed')
    postsStore.deletePost(id)
    toggleIsDelete()
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

const goToProfile = () => {
  if (isMe.value) router.replace('/my-profile')
  else router.push(`/profile/${props.userId}`)
}

const seeDetail = () => {
  router.push(`/feed/${props.postId}`)
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

const getUser = (userId) => {
  return usersStore.getUserById(userId)
}

const addComment = (comment) => {
  postsStore.addComment(props.postId, comment)
}

const updateComment = (newComment) => {
  postsStore.updateComment(props.postId, newComment)
}

const deleteComment = (commentId) => {
  postsStore.deleteComment(props.postId, commentId)
}

const commentNumber = computed(() => {
  const name = props.postComments.length > 1 ? 'comments' : 'comment'
  return `${props.postComments.length} ${name}`
})
</script>
