<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure as="nav" class="bg-sky-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500" alt="Workflow" />
            <img class="hidden lg:block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500" alt="Workflow" />
            <span class="text-white text-2xl ml-2">CloudPAD</span>
          </div>
          <!-- Logo -->

          <!-- Nav -->
          <!--
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                :class="[item.current ? 'bg-sky-500 text-white' : 'text-gray-200 hover:bg-sky-500 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
            </div>
          </div>
          -->
          <!-- Nav -->
        </div>

        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          <!-- Toggle dark mode -->
          <button type="button"
            class="bg-sky-800 p-1 rounded-full text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span class="sr-only">Dark mode</span>
            <!-- Heroicon name: moon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <!-- Toggle dark mode -->

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Nav 1', href: '#', current: false },
]
</script>