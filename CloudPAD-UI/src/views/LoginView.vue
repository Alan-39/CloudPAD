<template>
  <div class="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8">
    <Form @submit="login" :validation-schema="schema" v-slot="{ errors }" class="space-y-6">
      <h5 class="text-xl font-medium text-gray-900">CloudPAD</h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
        <Field id="username" name="username" type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="bruh6699" required />
        <span class="text-sm text-red-600">{{ errors.username }}</span>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <Field id="password" name="password" type="password" placeholder="•••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
          <label for="remember" class="ml-2 text-sm font-medium text-gray-900">Remember me</label>
        </div>
      </div>
      -->
      <button
        class="w-full text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ease-in-out duration-300">
        Login
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

const schema = yup.object({
  username: yup.string().required().min(6),
  password: yup.string().required().min(6),
});

useForm({
  validationSchema: schema,
});

function login(values) {
  const authStore = useAuthStore();

  authService.login(values).then(response => {
    errMsg.value = '';
    authStore.setSession(response.data.token)
    console.log(authStore.token);
  }).catch(err => {
    errMsg.value = err.response.data.message
  });
}
</script>


<style scoped>
</style>
