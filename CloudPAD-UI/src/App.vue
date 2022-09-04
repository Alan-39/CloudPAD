<template>
  <div class="h-screen flex flex-row bg-gray-200">
    <div class=" flex-none">
      <SideMenu v-if="!useRoute().meta.hideNav"></SideMenu>
    </div>
    <div class="h-screen flex-1">
      <div class="h-screen flex flex-col">
        <div>
          <NavBar v-if="!useRoute().meta.hideNav"></NavBar>
        </div>
        <div class="h-screen flex justify-center items-center">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import { router } from './router';
import { useAuthStore } from "./stores/auth.store";

import NavBar from "./components/NavBar.vue";
import SideMenu from "./components/SideMenu.vue";

const authStore = useAuthStore();
if (authStore.user) {
  router.push('/')
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Oxygen");

html,
body {
  font-family: "Oxygen", sans-serif;
}
</style>
