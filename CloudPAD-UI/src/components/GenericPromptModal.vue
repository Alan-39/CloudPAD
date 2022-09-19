<template>
  <div v-show="showPromptModal" @click="showPromptModal = false"
    class="absolute top-0 bottom-0 right-0 left-0 bg-slate-600 opacity-60 z-49"></div>

  <div v-show="showPromptModal" class="absolute z-20 h-1/2 w-1/2 z-50">
    <div class="relative p-4 max-w-2xl">
      <!-- Modal content -->
      <div class="bg-white rounded-lg shadow">

        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b">
          <h3 class="text-xl font-semibold text-slate-600">
            {{ title }}
          </h3>
          <button type="button" @click="showPromptModal = false"
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
          <p class="font-medium text-slate-600">
            {{ message }}
          </p>
        </div>

        <!-- Modal footer -->
        <div class="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-200">
          <button type="button" @click="$emit('ok')"
            class="text-white bg-accent-dark hover:bg-accent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Ok</button>
          <button type="button" @click="showPromptModal = false"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['ok'])
defineExpose({
  open,
  close
});

const showPromptModal = ref(false);
const title = ref('');
const message = ref('');

function open(data) {
  title.value = data.title;
  message.value = data.message;
  showPromptModal.value = true;
}

function close() {
  showPromptModal.value = false;
}
</script>