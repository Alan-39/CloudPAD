<template>
  <div v-show="showModal" @click="showModal = false"
    class="absolute top-0 bottom-0 right-0 left-0 bg-slate-600 opacity-60 z-49"></div>

  <div v-show="showModal" class="absolute z-20 h-1/2 w-1/2 z-50">
    <div class="relative p-4 max-w-2xl">
      <!-- Modal content -->
      <div class="bg-white rounded-lg shadow">

        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b">
          <h3 class="text-xl font-semibold text-slate-600">
            New Bucket
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
        <Form @submit="createBucket" :validation-schema="schema" v-slot="{ errors }" class="space-y-6">
          <div class="p-6 space-y-6">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-700 ">Bucket Name</label>
              <Field id="bucketName" name="bucketName" type="text"
                class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required />
              <span class="text-sm text-red-600">{{ errors.bucketName }}</span>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="flex justify-end items-center p-4 space-x-2 rounded-b border-t border-gray-200">
            <button type="submit"
              class="text-white bg-accent-dark hover:bg-accent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create</button>
            <button type="button" @click="showModal = false"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import { ref } from 'vue';
import { Form, Field, useForm } from 'vee-validate';
import * as yup from 'yup';
import { bucketService } from '../services/bucket.service';

defineExpose({
  open,
});
const emit = defineEmits(['close', 'newBucket'])
const showModal = ref(false);

const schema = yup.object({
  bucketName: yup.string().required("Bucket Name is required").min(6, "Bucket Name must be at least 6 characters"),
});

useForm({
  validationSchema: schema,
});

function open() {
  showModal.value = true;
}

function createBucket(values) {
  console.log('create bucket values = ', values);
  bucketService.makeBucket(values).then((response) => {
    console.log('make bucket res = ', response);
    emit('newBucket', { name: values.bucketName })
    showModal.value = false;
  }).catch(err => console.log('make bucket err = ', err.response.data.message));
}

</script>