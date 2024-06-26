<template>
  <section>
    <div class="mb-4" v-if="openAddImage">
      <div class="relative">
        <label for="file-upload" class="cursor-pointer">
          <div class="absolute right-0 mt-3 mr-3">
            <div
              @click="clearImage"
              class="flex items-center justify-center rounded-full w-8 h-8 bg-white border border-gray-200 hover:bg-gray-100 active:opacity-90 cursor-pointer active:scale-95"
            >
              <svg-icon name="close" width="25" height="25"></svg-icon>
            </div>
          </div>
          <div
            v-if="!imageUrl"
            class="border-2 border-dashed border-gray-300 rounded-2xl hover:bg-gray-300 select-none"
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @drop.prevent="handleDrop"
          >
            <div class="text-center p-14">
              <div
                class="flex items-center justify-center bg-gray-200 rounded-full p-3 w-fit left-1/2 relative -translate-x-1/2"
              >
                <svg-icon name="add-photo"></svg-icon>
              </div>
              <p class="text-xl font-medium">Select an image</p>
              <p class="text-sm text-gray-600">or drag and drop</p>
            </div>
            <div
              v-if="isDraggingOver"
              class="absolute inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center rounded-2xl"
            >
              <p class="text-lg font-medium text-gray-700">Drop your image here</p>
            </div>
          </div>
          <div v-else class="border-2 border-dashed border-gray-300 rounded-2xl cursor-default">
            <img :src="imageUrl" alt="Selected Image" class="rounded-2xl w-full" />
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          class="hidden"
          @change="handleFileUpload"
          accept="image/*"
          :disabled="imageUrl"
        />
      </div>
    </div>
    <button
      class="mb-4 select-none hover:brightness-95 bg-gray-100 px-4 py-2 rounded w-full flex items-center justify-center gap-1"
      @click="toggleAddImage"
      v-if="!openAddImage"
    >
      <svg-icon name="photo" height="20" weight="20"></svg-icon>
      <span class="font-medium text-gray-600">Add Image</span>
    </button>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const imageUrl = ref(null)
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  readFile(file)
}
const readFile = (file) => {
  const reader = new FileReader()

  reader.onload = () => {
    imageUrl.value = reader.result
  }

  reader.readAsDataURL(file)
}
const handleDrop = (event) => {
  const file = event.dataTransfer.files[0]
  readFile(file)
}
const onDragOver = () => {
  isDraggingOver.value = true
}
const onDragLeave = () => {
  isDraggingOver.value = false
}
const clearImage = () => {
  imageUrl.value = null
  toggleAddImage()
}

const isDraggingOver = ref(false)

const openAddImage = ref(false)
const toggleAddImage = () => {
  openAddImage.value = !openAddImage.value
}

const emits = defineEmits(['image'])
watch(imageUrl, () => {
  emits('image', imageUrl.value)
})
</script>
