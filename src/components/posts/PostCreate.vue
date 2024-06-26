<template>
  <div>
    <post-form
      :show="showPostDialog"
      @close="togglePostDialog"
      @post="sendPost"
      title="Create Post"
      :username="props.name"
      :avt="props.avt"
      :id="props.id"
    ></post-form>
    <base-card>
      <div class="flex items-center justify-between gap-4">
        <user-avt :avt="props.avt" :id="props.id"></user-avt>
        <button
          @click="togglePostDialog"
          class="w-11/12 h-12 px-5 bg-gray-200 hover:bg-gray-300 text-gray-600 text-left rounded-3xl select-none outline-none"
        >
          What's on your mind?
        </button>
      </div>
    </base-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import PostForm from './PostForm.vue'

const props = defineProps(['name', 'avt', 'id'])
const showPostDialog = ref(false)

const togglePostDialog = () => {
  showPostDialog.value = !showPostDialog.value
}

const emits = defineEmits(['save-data'])

const sendPost = (myPost) => {
  emits('save-data', myPost)
  togglePostDialog()
}
</script>
