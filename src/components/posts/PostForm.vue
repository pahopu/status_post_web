<template>
  <base-dialog>
    <div class="flex items-center mb-4 gap-2">
      <user-avt :avt="props.avt" :id="props.id"></user-avt>
      <span class="font-medium">{{ props.username }}</span>
    </div>
    <div :style="{ maxHeight: inputMaxHeight }" class="overflow-y-auto">
      <textarea
        v-model="content"
        class="w-full border-none mb-4 text-2xl resize-none outline-none select-none"
        placeholder="What's on your mind?"
        ref="textarea"
        @input="autoResize"
      ></textarea>
      <post-image @image="getImageUrl" :isPost="!!imageUrl"></post-image>
    </div>
    <button
      @click="post"
      class="select-none hover:brightness-110 bg-blue-600 font-medium text-white px-4 py-2 rounded w-full disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:brightness-100"
      :disabled="!content && !imageUrl"
    >
      Post
    </button>
  </base-dialog>
</template>

<script setup>
import { onMounted, nextTick, ref, computed } from 'vue'
import { usePostsStore } from '../../stores/posts';

import PostImage from './PostImage.vue'

const postsStore = usePostsStore()

const props = defineProps({
  username: String,
  avt: String,
  id: String
})

const content = ref('')
const clearContent = () => {
  content.value = ''
}

const imageUrl = ref(null)
const getImageUrl = (url) => {
  imageUrl.value = url
}
const clearImage = () => {
  imageUrl.value = null
}

const emits = defineEmits(['post'])
const post = () => {
  const img = imageUrl.value ? imageUrl.value : null
  const myPosts = {
    id: postsStore.currId,
    userId: props.id,
    content: content.value,
    img,
    time: new Date().toISOString(),
    hidden: false,
    comments: []
  }
  emits('post', myPosts)
  clearContent()
  clearImage()
}

const textarea = ref(null)
const autoResize = async () => {
  await nextTick()
  const el = textarea.value
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}
onMounted(() => {
  nextTick(() => {
    autoResize()
  })
})

const windowHeight = computed(() => window.innerHeight)
const inputMaxHeight = computed(() => `${windowHeight.value * 0.6}px`)
</script>
