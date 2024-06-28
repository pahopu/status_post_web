<template>
  <div class="flex space-x-4 mt-5">
    <user-avt :avt="props.userAvatar" :id="props.userId"></user-avt>
    <div class="flex-1 relative">
      <textarea
        ref="textareaRef"
        v-model="content"
        @input="autoResize"
        class="w-full h-full p-4 pr-12 rounded-2xl resize-none outline-none bg-gray-200 placeholder:text-gray-500"
        placeholder="Add a comment..."
      ></textarea>
      <button
        @click="post"
        :disabled="!content"
        class="absolute right-1 bottom-2 disabled:cursor-not-allowed cursor-pointer"
      >
        <div
          class="flex items-center justify-center w-10 h-10 rounded-full"
          :class="{ 'hover:bg-gray-100': content }"
        >
          <svg-icon name="send" height="24" width="24"></svg-icon>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
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
  autoResize()
  emits('comment-post', myComment)
}

const textareaRef = ref(null)
const autoResize = async () => {
  await nextTick()
  const el = textareaRef.value
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

onMounted(() => {
  nextTick(() => {
    autoResize()
  })
})
</script>
