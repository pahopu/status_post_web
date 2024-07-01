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
    <div
      class="comment-item flex space-x-4 mb-4"
      @mouseover="showDropdown"
      @mouseleave="hideDropdown"
    >
      <user-avt :avt="props.userAvatar" :id="props.commentUserId"></user-avt>
      <div :class="{ 'flex-1': isEditing }">
        <div class="flex items-center justify-center space-x-2" v-if="!isEditing">
          <div class="bg-gray-200 p-4 rounded-2xl min-w-20 max-w-lg">
            <h4 class="font-semibold cursor-pointer w-fit" @click="goToProfile">
              {{ userName }}
            </h4>
            <p class="whitespace-pre-wrap break-words">{{ editText }}</p>
          </div>
          <more-dropdown :show="isDrop">
            <button
              v-if="isCurrentUser"
              @click="editComment"
              class="text-blue-500 block rounded-md w-full px-5 py-2 text-left text-sm mr-2 hover:bg-gray-100 select-none"
            >
              Edit
            </button>
            <button
              v-if="isCommentInMyPost || isCurrentUser"
              @click="toggleIsDelete"
              class="block w-full px-5 rounded-md py-2 text-left text-sm text-red-500 hover:bg-gray-100 select-none"
            >
              Delete
            </button>
          </more-dropdown>
        </div>
        <div class="relative" v-else>
          <textarea
            ref="textareaRef"
            v-model="editText"
            @keydown="handleKeydown"
            @input="autoResize"
            class="w-full h-full p-4 pr-12 rounded-2xl resize-none outline-none bg-gray-200 placeholder:text-gray-500"
            placeholder="Add a comment..."
          ></textarea>
          <button
            @click="saveComment"
            :disabled="!editText"
            class="absolute right-1 bottom-2 disabled:cursor-not-allowed cursor-pointer"
          >
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full"
              :class="{ 'hover:bg-gray-100': editText }"
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
import { ref, computed, onMounted, nextTick} from 'vue'
import { useRouter } from 'vue-router'

import MoreDropdown from '../ui/MoreDropdown.vue'

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
  postUserId: {
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

const isCurrentUser = computed(() => props.currentUserId === props.commentUserId)
const isCommentInMyPost = computed(() => props.postUserId === props.currentUserId)

const editComment = () => {
  isEditing.value = true
  autoResize()
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

const isDrop = ref(false)
const showDropdown = () => {
  isDrop.value = true
}
const hideDropdown = () => {
  isDrop.value = false
}

const textareaRef = ref(null)
const autoResize = async () => {
  await nextTick()
  const el = textareaRef.value
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

const handleKeydown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    saveComment()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    cancelEdit()
  }
}

onMounted(() => {
  nextTick(() => {
    autoResize()
  })
})
</script>

<style scoped>
.comment-item .bg-gray-100 {
  background-color: #f0f2f5;
}
</style>
