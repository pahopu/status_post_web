<template>
  <base-dialog
    :show="isComplete"
    title="Change Password"
    mode="dialog-header"
    @close="isComplete = false"
  >
    <p class="mt-4">{{ message }}</p>
  </base-dialog>
  <base-dialog :show="isLoading" title="Change Password..." fixed mode="dialog-header">
    <div class="flex-col justify-center items-center mt-4">
      <loading-spinner></loading-spinner>
      <div class="mt-2 text-center">Changing Password</div>
    </div>
  </base-dialog>
  <base-card mw="max-w-lg" padding="p-6">
    <h3 class="text-2xl font-semibold text-gray-700">Change Password</h3>

    <label class="block text-left mt-2 text-lg">Old Password</label>
    <input
      v-model="formData.oldPassword"
      type="password"
      @input="errors.oldPassword = ''"
      :class="{ 'border-red-500': errors.oldPassword }"
      class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
      placeholder="Enter your old password"
    />
    <span v-if="errors.oldPassword" class="text-red-500 text-sm">{{ errors.oldPassword }}</span>

    <label class="block text-left mt-2 text-lg">New Password</label>
    <input
      v-model="formData.newPassword"
      type="password"
      @input="errors.newPassword = ''"
      :class="{ 'border-red-500': errors.newPassword }"
      class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
      placeholder="Enter a new password"
    />
    <span v-if="errors.newPassword" class="text-red-500 text-sm">{{ errors.newPassword }}</span>

    <label class="block text-left mt-2 text-lg">Confirm Password</label>
    <input
      v-model="formData.confirmPassword"
      type="password"
      @input="errors.confirmPassword = ''"
      :class="{ 'border-red-500': errors.confirmPassword }"
      class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
      placeholder="Confirm your new password"
    />
    <span v-if="errors.confirmPassword" class="text-red-500 text-sm">{{
      errors.confirmPassword
    }}</span>

    <div class="mt-6 flex justify-center space-x-4">
      <button
        @click="cancelChanges"
        class="bg-gray-500 text-white w-24 py-2 rounded-md hover:bg-gray-600 select-none"
      >
        Cancel
      </button>
      <button
        @click="changePassword"
        class="bg-blue-500 text-white w-24 py-2 rounded-md hover:bg-blue-600 select-none"
      >
        Save
      </button>
    </div>
  </base-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const isComplete = ref(false)
const message = ref('')

const validateForm = () => {
  errors.oldPassword = formData.oldPassword ? '' : 'Old password is required'
  errors.newPassword = formData.newPassword ? '' : 'New password is required'
  errors.confirmPassword = formData.confirmPassword ? '' : 'Confirm password is required'

  if (formData.newPassword && formData.newPassword.length < 6) {
    errors.newPassword = 'Password must be at least 6 characters long'
  }
  if (formData.oldPassword === formData.newPassword) {
    errors.newPassword = 'New password must be different from old password'
  }
  if (formData.newPassword && formData.confirmPassword) {
    errors.confirmPassword =
      formData.newPassword === formData.confirmPassword ? '' : 'Passwords do not match'
  }

  return !errors.oldPassword && !errors.newPassword && !errors.confirmPassword
}

const changePassword = async () => {
  if (!validateForm()) return

  isLoading.value = true

  const isSuccess = await authStore.changePassword(formData.oldPassword, formData.newPassword)
  if (isSuccess) {
    message.value = 'Your password has been changed successfully.'
    cancelChanges()
  } else {
    message.value = 'Failed to change password. Please try again.'
  }

  isLoading.value = false
  isComplete.value = true
}

const cancelChanges = () => {
  formData.oldPassword = ''
  formData.newPassword = ''
  formData.confirmPassword = ''
}
</script>
