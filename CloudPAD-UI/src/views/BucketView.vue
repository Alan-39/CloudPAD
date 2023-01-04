<template>
  <div class="overflow-y-scroll p-10 h-full w-full">
    <div
      class="inline-flex items-center py-1 pl-1 pr-4 mb-6 bg-white hover:bg-gray-300 ease-in-out duration-300 rounded-2xl shadow-md text-slate-600">
      <svg xmlns="http://www.w3.org/2000/svg" width="35" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
        stroke="currentColor" class="mx-1 w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>

      <div class="text-xl font-bold font-medium pb-2">Upload</div>
    </div>

    <!-- Todo: multi file upload dialog  -->

    <div class="mb-20 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
      <MediaCard v-for="(object, index) in objectList" @click="selectBucket(index)" @dblclick="openBucket(index)"
        @contextmenu.prevent="openContextMenu($event, index)"
        :class="{ 'border-2 border-cyan-500' : selectedObject == index }" :name=object.name iconType="server">
      </MediaCard>
    </div>
  </div>
</template>
  
<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import { objectService } from '../services/object.service';

import MediaCard from '../components/MediaCard.vue';

const route = useRoute()

const selectedObject = ref();
const objectList = ref([]);

onMounted(() => {
  listObjects()
});

async function listObjects() {
  console.log('params: ', route.params)
  objectService.listObject(route.params.name).then((response) => {
    console.log('list obj: ', response);

  })


}

</script>
  