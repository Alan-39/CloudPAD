<template>
	<div
		:class="[isExpanded ? 'flex flex-col h-full bg-secondary w-60 ease-in-out duration-300' : 'flex flex-col h-full bg-secondary w-20 ease-in-out duration-300']">
		<div @click="isExpanded = !isExpanded" class="text-gray-700 m-4  focus:outline-none focus:ring-2 focus:ring-gray-200">
			<div v-if="isExpanded"><svg xmlns="http://www.w3.org/2000/svg" width="40" fill="none" viewBox="0 0 24 24"
					stroke="currentColor" strokeWidth="2">
					<path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
				</svg>
			</div>
			<div v-else><svg xmlns="http://www.w3.org/2000/svg" width="40" fill="none" viewBox="0 0 24 24"
					stroke="currentColor" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
				</svg>
			</div>


		</div>

		<!-- Side Navigation -->
		<ul class>
			<li class="relative">
				<a v-for="item in sideNavigation" :key="item.name" :href="item.href" :class="[item.current ?
					'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-200 bg-secondary-dark text-ellipsis whitespace-nowrap rounded ' :
					'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700  hover:bg-secondary-dark text-ellipsis whitespace-nowrap rounded ease-in-out duration-300'
				]" data-mdb-ripple="true" data-mdb-ripple-color="dark">
					<template v-if="isExpanded">
						{{ item.name }}
					</template>
					<template v-else>
						<component :is="item.icon" :class="[item.current ? 'text-gray-200 w-8' : 'text-gray-700 w-8']"/>
					</template>
				</a>
			</li>
		</ul>
		<!-- Side Navigation -->
	</div>
</template>

<script setup>
import { ref } from "vue";
import { HomeIcon, CogIcon } from "@heroicons/vue/solid";

let isExpanded = ref(true);

const sideNavigation = [
	{ name: "Home", icon: HomeIcon, href: '/', current: true },

]
</script>