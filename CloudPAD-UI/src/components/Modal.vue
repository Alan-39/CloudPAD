<template>
  <div v-show="showModal" @click="showModal = false"
    class="absolute top-0 bottom-0 right-0 left-0 bg-slate-600 opacity-60 z-49"></div>

  <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-100"
    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
    <div v-show="showModal" class="absolute top-1/3">
      <div class="relative p-4 max-w-2xl">
        <!-- Modal content -->
        <div class="bg-white rounded-lg shadow">

          <!-- Modal header -->
          <div class="flex justify-between items-start p-4 rounded-t border-b">
            <h3 class="text-xl font-semibold text-slate-600">
              {{ title }}
            </h3>
            <button type="button" @click="showModal = false"
              class="text-slate-600 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <slot></slot>
          </div>

          <!-- Modal footer -->
          <div class="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-200">
            <button type="button" @click="$emit('true')"
              class="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :class="{
                'bg-warning-dark hover:bg-warning': actionColor == 'warning',
                'bg-info-dark hover:bg-info': actionColor == 'info',
                'bg-success-dark hover:bg-success': actionColor == 'success',
              }">{{ action }}</button>
            <button type="button" @click="showModal = false"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
    
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['true', 'false']);
defineExpose({
  open,
  close
});

const showModal = ref(false);
const title = ref('');
const action = ref('');
const actionColor = ref('');

function open(data) {
  title.value = data.title;
  action.value = data.action;
  actionColor.value = data.actionColor;
  showModal.value = true;
}

function close() {
  emit('false');
  showModal.value = false;
}
</script>