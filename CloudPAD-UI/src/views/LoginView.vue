<template>
  <div
    class="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form class="space-y-6">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">CloudPAD</h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
        <input type="text" name="username" id="username"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="bruh6699" required>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
        <input type="password" name="password" id="password" placeholder="•••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required>
      </div>
      <div class="flex items-start">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value=""
              class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800">
          </div>
          <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>
      </div>
      <button
        class="w-full text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
    </form>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import { ENV_VARIABLES } from "../env";

const data = {
  username: "",
  password: "",
};

fetch(`${ENV_VARIABLES.BACKEND_URL}/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

</script>


<style scoped>
</style>
