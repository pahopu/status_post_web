<template>
  <base-card mw="max-w-lg" padding="p-0">
    <!-- Cover Image -->
    <div class="h-48 overflow-hidden relative select-none">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${formData.cover})` }"
      ></div>
    </div>

    <div class="p-6">
      <!-- Avatar -->
      <div class="flex justify-center -mt-16 select-none">
        <img
          class="w-32 h-32 rounded-full border-4 border-gray-100 z-10"
          :src="formData.avt"
          alt="Avatar"
        />
      </div>

      <!-- User Information -->
      <div class="mt-4">
        <h3 class="text-2xl font-semibold text-gray-700">User Profile</h3>

        <label class="block text-left mt-2 text-lg"
          >Username<span class="text-red-500 select-none"> *</span></label
        >
        <input
          v-model="formData.name"
          class="mt-1 block w-full text-lg font-semibold placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
          placeholder="Enter your username"
          :disabled="notCurrentUser"
        />

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
          class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
          :disabled="notCurrentUser"
        >
          <option value="" disabled hidden>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label class="block text-left mt-2 text-lg"
          >Birthday<span class="text-red-500 select-none"> *</span></label
        >
        <input
          v-model="formData.birthday"
          type="date"
          class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
          placeholder="Select your birthday"
          :disabled="notCurrentUser"
        />

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

      <!-- Change Password -->
      <div class="mt-6" v-if="changePasswordVisible">
        <h3 class="text-2xl font-semibold text-gray-700">Change Password</h3>

        <label class="block text-left mt-2 text-lg">Old Password</label>
        <input
          v-model="formData.oldPassword"
          type="password"
          class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
          placeholder="Enter your old password"
        />

        <label class="block text-left mt-2 text-lg">New Password</label>
        <input
          v-model="formData.newPassword"
          type="password"
          class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
          placeholder="Enter a new password"
        />

        <label class="block text-left mt-2 text-lg">Confirm Password</label>
        <input
          v-model="formData.confirmPassword"
          type="password"
          class="mt-1 block w-full text-lg placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 text-black"
          placeholder="Confirm your new password"
        />
      </div>

      <!-- Change Password Button -->
      <div class="mt-4 flex justify-center" v-if="!notCurrentUser">
        <button
          @click="toggleChangePassword"
          class="text-blue-500 hover:underline focus:outline-none select-none"
        >
          {{ changePasswordVisible ? 'Hide Password Change' : 'Change Password' }}
        </button>
      </div>

      <!-- Buttons -->
      <div class="mt-6 flex justify-center space-x-4" v-if="!notCurrentUser">
        <button
          @click="cancelChanges"
          class="bg-gray-500 text-white w-24 py-2 rounded-md hover:bg-gray-600 select-none"
        >
          Cancel
        </button>
        <button
          @click="saveProfile"
          class="bg-blue-500 text-white w-24 py-2 rounded-md hover:bg-blue-600 select-none"
        >
          Save
        </button>
      </div>
    </div>
  </base-card>
</template>

<script setup>
import { computed, ref } from 'vue'

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

const formData = ref({ ...props.user })
const saveProfile = () => {
  usersStore.updateUser(props.user.id, formData.value)
}
const cancelChanges = () => {
  Object.assign(formData.value, props.user)
}

const userId = computed(() => authStore.userId)
const notCurrentUser = computed(() => props.user.id !== userId.value)

const changePasswordVisible = ref(false)
const toggleChangePassword = () => {
  changePasswordVisible.value = !changePasswordVisible.value
}
</script>
