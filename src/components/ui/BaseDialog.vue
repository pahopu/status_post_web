<template>
  <teleport to="body">
    <div
      v-if="show"
      @click="tryClose"
      class="fixed top-0 left-0 h-screen w-full bg-black bg-opacity-75 z-40"
    ></div>
    <transition name="dialog">
      <dialog
        open
        v-if="show"
        class="max-h-full fixed w-4/5 z-40 rounded-xl border-none shadow-sm p-0 m-0 overflow-hidden bg-white divide-y divide-gray-300"
        :style="{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }"
      >
        <header class="w-full p-4 flex justify-between items-center" :class="mode">
          <slot name="header">
            <h2 class="text-xl relative left-1/2 transform -translate-x-1/2 font-medium">
              {{ title }}
            </h2>
          </slot>
          <div
            @click="tryClose"
            class="flex items-center justify-center rounded-full w-10 h-10 bg-gray-200 hover:brightness-95 active:opacity-55 cursor-pointer active:scale-95"
          >
            <svg-icon name="close" width="30" height="30"></svg-icon>
          </div>
        </header>
        <div class="p-4">
          <slot></slot>
          <div class="pt-4 text-right">
            <slot name="button"></slot>
          </div>
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  title: String,
  mode: {
    type: String,
    default: null
  },
  fixed: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close'])
const tryClose = () => {
  if (props.fixed) {
    return
  }
  emits('close')
}
</script>

<style scoped>
.no-scroll {
  overflow: hidden;
}

.dialog-header {
  @apply bg-blue-600 text-white;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
