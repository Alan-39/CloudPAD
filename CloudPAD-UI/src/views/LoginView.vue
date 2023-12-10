<template>
  <div class="p-4 w-full max-w-sm bg-secondary rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8">
    <Form @submit="login" :validation-schema="schema" v-slot="{ errors }" class="space-y-6">
      <h5 class="text-xl font-medium text-gray-700">CloudPAD</h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-700 ">Username</label>
        <Field id="username" name="username" type="text"
          class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="bruh6699" required />
        <span class="text-sm text-red-600">{{ errors.username }}</span>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <Field id="password" name="password" type="password" placeholder="•••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required />
        <span class="text-sm text-red-600">{{ errors.password }}</span>
      </div>

      <!--
      <div class="flex items-start">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value=""
              class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300">
          </div>
          <label for="remember" class="ml-2 text-sm font-medium text-gray-700">Remember me</label>
        </div>
      </div>
      -->
      <button
        class="w-full flex justify-center text-white hover:text-gray-700 bg-info-dark hover:bg-info focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center ease-in-out duration-300">
        <svg v-if="isLoading" class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <span v-if="!isLoading">Login</span>
      </button>
      <span v-if="errMsg !== ''" class="my-4 text-sm text-center text-red-600">{{ errMsg }}</span>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '../services/auth.service';
import { Form, Field, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '../stores/auth.store';

const errMsg = ref('');
const isLoading = ref(false);

const schema = yup.object({
  username: yup.string().required().min(6),
  password: yup.string().required().min(6),
});

useForm({
  validationSchema: schema,
});

async function login(values) {
  isLoading.value = true;
  const authStore = useAuthStore();

  try {
    errMsg.value = '';
    const res = await authService.login(values);
    res.status == 201 ? authStore.setSession(res.data.token) : errMsg.value = res.data.message;
  } catch (err) {
    console.log(err)
    errMsg.value = err.res.message
  } finally {
    isLoading.value = false;
  }
}
</script>


<style scoped></style>
