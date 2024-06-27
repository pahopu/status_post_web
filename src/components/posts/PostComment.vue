<template>
  <div>
    <base-dialog
      :show="isDelete"
      title="Delete Comment"
      mode="dialog-header"
      @close="toggleIsDelete"
    >
      <p class="pb-8 text-lg">Do you want to delete this comment?</p>
      <template #button>
        <div class="flex justify-end gap-4">
          <button
            class="w-24 h-10 bg-gray-300 text-gray-700 rounded-full hover:brightness-105"
            @click="toggleIsDelete"
          >
            Cancel
          </button>
          <button
            @click="deleteComment"
            class="w-24 h-10 bg-red-500 text-white rounded-full hover:brightness-105"
          >
            Delete
          </button>
        </div>
      </template>
    </base-dialog>
    <div class="comment-item flex space-x-4 mb-4">
      <user-avt :avt="props.userAvatar" :id="props.commentUserId"></user-avt>
      <div class="flex-1">
        <div class="bg-gray-200 p-4 rounded-2xl" v-if="!isEditing">
          <div>
            <div class="flex justify-between items-center">
              <h4 class="font-semibold cursor-pointer" @click="goToProfile">
                {{ userName }}
              </h4>
              <div>
                <button
                  v-if="isCurrentUser"
                  @click="editComment"
                  class="text-blue-500 mr-2 hover:underline select-none"
                >
                  Edit
                </button>
                <button @click="toggleIsDelete" class="text-red-500 hover:underline select-none">
                  Delete
                </button>
              </div>
            </div>
            <p>{{ editText }}</p>
          </div>
        </div>
        <div class="relative" v-else>
          <textarea
            ref="textarea"
            v-model="editText"
            class="w-full h-full p-4 rounded-2xl resize-none outline-none bg-gray-200 placeholder:text-gray-500"
            placeholder="Add a comment..."
          ></textarea>
          <button @click="saveComment" class="absolute right-2 top-1/2 -translate-y-1/2 transform">
            <div
              class="flex items-center justify-center hover:bg-gray-100 cursor-pointer w-10 h-10 rounded-full"
            >
              <svg-icon name="send" height="24" width="24"></svg-icon>
            </div>
          </button>
        </div>
        <div v-if="!isEditing" class="text-sm text-gray-500 mt-1 pl-3">
          {{ commentTime }}
        </div>
        <button
          v-else
          class="text-sm text-blue-600 hover:underline mt-1 pl-3 select-none"
          @click="cancelEdit"
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

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

const emits = defineEmits(['delete-comment', 'update-comment'])

const isEditing = ref(false)
const editText = ref(props.commentContent)

const isCurrentUser = props.currentUserId === props.commentUserId

const editComment = () => {
  isEditing.value = true
}

const saveComment = () => {
  emits('update-comment', {
    id: props.commentId,
    content: editText.value
  })
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
  editText.value = props.commentContent
}

const deleteComment = () => {
  emits('delete-comment', props.commentId)
}

const isMe = computed(() => props.commentUserId === props.currentUserId)
const router = useRouter()
const goToProfile = () => {
  if (isMe.value) router.replace('/my-profile')
  else router.push(`/profile/${props.commentUserId}`)
}

const isDelete = ref(false)
const toggleIsDelete = () => {
  isDelete.value = !isDelete.value
}
</script>

<style scoped>
.comment-item .bg-gray-100 {
  background-color: #f0f2f5;
}
</style>
