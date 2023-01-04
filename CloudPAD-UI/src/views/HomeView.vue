<template>
  <div class="overflow-y-scroll p-10 h-full w-full">
    <div @click="newBucketModal.open()"
      class="inline-flex items-center cursor-pointer py-1 pl-1 pr-4 mb-6 bg-white hover:bg-gray-300 ease-in-out duration-300 rounded-2xl shadow-md text-slate-600">
      <svg xmlns="http://www.w3.org/2000/svg" width="35" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
        stroke="currentColor" class="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <div class="text-xl font-bold font-medium pb-2">New bucket</div>
    </div>

    <div class="mb-20 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
      <MediaCard v-for="(bucket, index) in bucketList" @click="selectBucket(index)" @dblclick="openBucket()"
        @contextmenu.prevent="openContextMenu($event, index)"
        :class="{ 'border-2 border-cyan-500': selectedIndex == index }" :name=bucket.name iconType="server">
      </MediaCard>
    </div>
  </div>

  <NewBucketModal ref="newBucketModal" @close="showModal = false" @newBucket="(b) => bucketList.push(b)">
  </NewBucketModal>

  <GenericPromptModal ref="promptModal" @ok="deleteBucket()">
  </GenericPromptModal>

  <ContextMenu ref="contextMenu">
    <ul>
      <li @click="openBucket()"
        class="inline-flex block px-4 py-2 border-b border-gray-200 w-full font-medium hover:bg-red-500 hover:text-gray-100 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
        <span class="m-1">Open Bucket</span>
      </li>
      <li @click="openDeletePrompt()"
        class="inline-flex block px-4 py-2 border-b border-gray-200 w-full text-red-500 font-medium hover:bg-red-500 hover:text-gray-100 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
          stroke="currentColor" class="stroke-1" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        <span class="m-1">Delete Bucket</span>
      </li>
    </ul>
  </ContextMenu>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { bucketService } from '../services/bucket.service';
import { useRouter } from 'vue-router'

import MediaCard from '../components/MediaCard.vue';
import NewBucketModal from '../components/NewBucketModal.vue';
import ContextMenu from '../components/ContextMenu.vue';
import GenericPromptModal from '../components/GenericPromptModal.vue';

const selectedIndex = ref();
const bucketList = ref([]);

const newBucketModal = ref(null);
const contextMenu = ref(null)
const promptModal = ref(null);

const router = useRouter()

onMounted(() => {
  listBuckets()
  contextMenu.value
});

function selectBucket(idx) {
  selectedIndex.value = idx;
}

function listBuckets() {
  bucketService.listBuckets().then((response) => {
    bucketList.value = response.data
  }).catch((err) => console.log('List bucket error: ', err));
}

function openBucket() {
  router.push(`/bucket/${bucketList.value[selectedIndex.value].name}`)
}

function openDeletePrompt() {
  contextMenu.value.close();
  const promptMessage = {
    title: 'Delete bucket',
    message: 'This action cannot be reverse. Are you sure?',
  }
  promptModal.value.open(promptMessage);
}

function deleteBucket() {
  bucketService.removeBucket(bucketList.value[selectedIndex.value].name)
    .then((response) => {
      bucketList.value.splice(selectedIndex.value, 1);
    }).catch((err) => console.log('remove bucket error: ', err));
  promptModal.value.close();
}


function openContextMenu(e, idx) {
  selectedIndex.value = idx;
  contextMenu.value.open(e);
}
</script>
