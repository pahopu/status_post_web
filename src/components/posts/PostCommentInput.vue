<template>
  <div class="flex space-x-4 mt-5">
    <user-avt :avt="props.userAvatar" :id="props.userId"></user-avt>
    <div class="flex-1 relative">
      <textarea
        ref="textarea"
        v-model="content"
        class="w-full h-full p-4 rounded-2xl resize-none outline-none bg-gray-200 placeholder:text-gray-500"
        placeholder="Add a comment..."
      ></textarea>
      <button @click="post" class="absolute right-2 top-1/2 -translate-y-1/2 transform">
        <div
          class="flex items-center justify-center hover:bg-gray-100 cursor-pointer w-10 h-10 rounded-full"
        >
          <svg-icon name="send" height="24" width="24"></svg-icon>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { usePostsStore } from '../../stores/posts'

const postsStore = usePostsStore()

const props = defineProps({
  userId: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  }
})

const content = ref('')

const emits = defineEmits(['comment-post'])
const post = () => {
  if (!content.value) return
  const myComment = {
    id: postsStore.currCommentId(props.postId),
    userId: props.userId,
    content: content.value,
    time: new Date().toISOString()
  }
  content.value = ''
  console.log(myComment)
  emits('comment-post', myComment)
}
</script>
