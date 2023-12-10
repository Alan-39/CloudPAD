<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-secondary">
    <div class="flex items-center justify-between h-14 px-8">
      <div>
      </div>

      <!-- Profile dropdown -->
      <Menu as="div" class="ml-3 relative">
        <MenuButton class="flex text-sm rounded-full hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </MenuButton>
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem v-slot="{ active }">
            <a href="#" @click="logout"
              :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import { useAuthStore } from '../stores/auth.store';

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Nav 1', href: '#', current: false },
]

function logout() {
  const authStore = useAuthStore();
  authStore.logout();
}
</script>