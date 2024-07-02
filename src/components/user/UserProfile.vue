<template>
  <base-card mw="max-w-lg" padding="p-0" class="relative">
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      v-if="isLoading"
    >
      <loading-spinner></loading-spinner>
    </div>
    <div :class="{ 'blur-sm': isLoading }">
      <!-- Cover Image -->
      <div class="h-48 overflow-hidden relative select-none border-b-2">
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${formData.cover})` }"
        ></div>
      </div>
      <div class="p-6">
        <!-- Avatar -->
        <div class="flex justify-center -mt-16 select-none relative">
          <img
            class="w-32 h-32 rounded-full border-4 border-gray-100 z-10"
            :src="formData.avt"
            alt="Avatar"
          />
          <!-- Add an input for changing avatar -->
          <label
            v-if="!notCurrentUser"
            class="absolute bottom-4 left-60 z-20 bg-gray-600 bg-opacity-50 text-white rounded-full p-1 cursor-pointer hover:bg-opacity-80"
          >
            <input type="file" accept="image/*" class="hidden" @change="handleAvatarChange" />
            <svg-icon name="edit"></svg-icon>
          </label>
        </div>
        <!-- User Information -->
        <div class="mt-4">
          <h3 class="text-2xl font-semibold text-gray-700">User Profile</h3>
          <label class="block text-left mt-2 text-lg"
            >Username<span class="text-red-500 select-none"> *</span></label
          >
          <input
            v-model="formData.name"
            :class="{ 'border-red-500': errors.name }"
            class="mt-1 block w-full text-lg font-semibold placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
            placeholder="Enter your username"
            :disabled="notCurrentUser"
          />
          <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
          <label class="block text-left mt-2 text-lg"
            >Email<span class="text-red-500 select-none"> *</span></label
          >
          <input
            v-model="formData.email"
            class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
            placeholder="Enter your email"
            disabled
          />
          <label class="block text-left mt-2 text-lg"
            >Gender<span class="text-red-500 select-none"> *</span></label
          >
          <select
            v-model="formData.gender"
            :class="{ 'border-red-500': errors.gender }"
            class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
            :disabled="notCurrentUser"
          >
            <option value="" disabled hidden>Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <span v-if="errors.gender" class="text-red-500 text-sm">{{ errors.gender }}</span>
          <label class="block text-left mt-2 text-lg"
            >Birthday<span class="text-red-500 select-none"> *</span></label
          >
          <input
            v-model="formData.birthday"
            :class="{ 'border-red-500': errors.birthday }"
            type="date"
            class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
            placeholder="Select your birthday"
            :disabled="notCurrentUser"
          />
          <span v-if="errors.birthday" class="text-red-500 text-sm">{{ errors.birthday }}</span>
          <label class="block text-left mt-2 text-lg">Birth Place</label>
          <input
            v-model="formData.birthPlace"
            class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
            placeholder="Enter your birth place"
            :disabled="notCurrentUser"
          />
          <label class="block text-left mt-2 text-lg">Current Place</label>
          <input
            v-model="formData.currentPlace"
            class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
            placeholder="Enter your current place"
            :disabled="notCurrentUser"
          />
        </div>
        <!-- Change Password Button -->
        <div class="mt-4 flex justify-center" v-if="!notCurrentUser">
          <router-link
            to="/change-password"
            class="text-blue-500 hover:underline focus:outline-none select-none"
          >
            Change Password
          </router-link>
        </div>
        <!-- Success Message -->
        <div
          v-if="isSuccess"
          class="mt-6 p-2 bg-green-100 border border-green-400 text-green-700 rounded-md"
        >
          Profile updated successfully!
        </div>
        <!-- Buttons -->
        <div class="mt-6 flex justify-center space-x-4" v-if="!notCurrentUser">
          <button
            @click="cancelChanges"
            :disabled="!isFormDataChanged"
            class="bg-gray-500 text-white w-24 py-2 rounded-md hover:bg-gray-600 select-none disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="saveProfile"
            :disabled="!isFormDataChanged"
            class="bg-blue-500 text-white w-24 py-2 rounded-md hover:bg-blue-600 select-none disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useUsersStore } from '../../stores/users'
import { useAuthStore } from '../../stores/auth'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const usersStore = useUsersStore()
const authStore = useAuthStore()

const isLoading = ref(false)
const isSuccess = ref(false)
const formData = reactive({ ...props.user })
const originalFormData = reactive({ ...props.user }) // Keep track of original data
const errors = reactive({
  name: '',
  gender: '',
  birthday: ''
})

const validateForm = () => {
  errors.name = formData.name ? '' : 'Username is required'
  errors.gender = formData.gender ? '' : 'Gender is required'
  errors.birthday = formData.birthday ? '' : 'Birthday is required'
  return !errors.name && !errors.gender && !errors.birthday
}

const saveProfile = async () => {
  if (validateForm()) {
    isLoading.value = true
    if (formData.avt !== originalFormData.avt) await usersStore.updateAvt(formData.id, formData.avt)
    await usersStore.updateUser(formData.id, formData)
    isLoading.value = false
    isSuccess.value = true
    Object.assign(originalFormData, formData) // Update original data after save
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }
}

const cancelChanges = () => {
  Object.assign(formData, originalFormData) // Reset form data to original
}

const isFormDataChanged = computed(() => {
  // Check if any property in formData is different from originalFormData
  return Object.keys(formData).some((key) => formData[key] !== originalFormData[key])
})

const userId = computed(() => authStore.userId)
const notCurrentUser = computed(() => props.user.id !== userId.value)

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.avt = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

onBeforeMount(() => {
  usersStore.getUsersList(true)
})
</script>
