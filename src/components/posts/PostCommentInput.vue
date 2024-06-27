<template>
  <div class="flex items-center space-x-4 mt-5">
    <img
      class="w-10 h-10 rounded-full"
      :src="avt"
      alt="avatar"
    />
    <div class="flex-1">
      <textarea
        ref="textarea"
        v-model="content"
        @input="autoResize"
        class="w-full p-2 border rounded-xl"
        rows="1"
        placeholder="Add a comment..."
      ></textarea>
      <div class="flex items-center justify-between mt-2">
        <input
          type="file"
          @change="getImageUrl($event.target.files[0])"
          class="hidden"
          ref="fileInput"
        />
        <button
          @click="$refs.fileInput.click()"
          class="text-gray-500 hover:text-gray-700"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
        <button
          @click="post"
          class="px-4 py-2 text-white bg-blue-500 rounded-xl"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')
const autoResize = () => {
  const textarea = $refs.textarea
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}

const getImageUrl = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    content.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const post = () => {
  if (!content.value) return
  const myComment = {
    content: content.value,
    image: null
  }
  content.value = ''
  $emit('post', myComment)
}
</script>
