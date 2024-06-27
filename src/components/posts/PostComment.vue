<template>
  <div class="comment-item flex items-start space-x-4 mb-4">
    <user-avt :avt="props.userAvatar" :id="props.commentUserId"></user-avt>
    <div class="flex-1">
      <div class="bg-gray-200 p-3 rounded-2xl">
        <div class="flex justify-between items-center">
          <h4 class="font-semibold">{{ userName }}</h4>
          <div v-if="isCurrentUser">
            <button @click="editComment" class="text-blue-500 mr-2">Edit</button>
            <button @click="deleteComment" class="text-red-500">Delete</button>
          </div>
        </div>
        <p v-if="!isEditing">{{ editText }}</p>
        <textarea
          v-if="isEditing"
          v-model="editText"
          class="w-full border rounded-md p-2"
        ></textarea>
        <div v-if="isEditing" class="text-right mt-2">
          <button @click="saveComment" class="bg-blue-500 text-white px-4 py-2 rounded-md">
            Save
          </button>
          <button @click="cancelEdit" class="bg-gray-500 text-white px-4 py-2 rounded-md ml-2">
            Cancel
          </button>
        </div>
      </div>
      <div class="text-sm text-gray-500 mt-1 pl-3">{{ commentTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  commentId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String,
    required: true
  },
  commentContent: {
    type: String,
    required: true
  },
  commentTime: {
    type: String,
    required: true
  },
  currentUserId: {
    type: String,
    required: true
  },
  commentUserId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['delete-comment'])

const isEditing = ref(false)
const editText = ref(props.commentContent)

const isCurrentUser = props.currentUserId === props.commentUserId

const editComment = () => {
  isEditing.value = true
}

const saveComment = () => {
  emit('update-comment', { id: props.commentId, content: editText.value })
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
  editText.value = props.commentContent
}

const deleteComment = () => {
  emit('delete-comment', props.commentId)
}
</script>

<style scoped>
.comment-item .bg-gray-100 {
  background-color: #f0f2f5;
}
</style>
