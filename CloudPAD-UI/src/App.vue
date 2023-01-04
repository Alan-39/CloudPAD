<template>
  <!-- <div @contextmenu.prevent class="h-screen overflow-hidden flex flex-col bg-primary"> -->
  <div class="h-screen overflow-hidden flex flex-col bg-primary">

    <div>
      <NavBar v-if="!useRoute().meta.hideNav"></NavBar>
    </div>
    <div class="grow flex flex-row">
        <div>
          <SideMenu v-if="!useRoute().meta.hideNav"></SideMenu>
        </div>
        <div class="flex grow h-screen justify-center items-center">
          <RouterView></RouterView>
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
