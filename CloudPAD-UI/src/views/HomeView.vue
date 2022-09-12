<template>
  <div class="p-10 h-full w-full overflow-y-scroll">
    <div @click="showModal = true"
      class="inline-flex items-center py-1 pl-1 pr-4 mb-6 bg-white hover:bg-gray-300 ease-in-out duration-300 rounded-2xl shadow-md text-slate-600">
      <svg xmlns="http://www.w3.org/2000/svg" width="35" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
        stroke="currentColor" class="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <div class="text-xl font-bold font-medium pb-2">New bucket</div>
    </div>

    <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
      <div v-for="(bucket, index) in bucketList">
        <MediaCard @click="selectBucket(index)" @dblclick="openBucket(index)"
          :class="{ 'border-2 border-cyan-500' : selectedBucket == index }" :name=bucket.name iconType="server">
        </MediaCard>
      </div>
    </div>
  </div>
  <NewBucketModal :showModal="showModal" @close="showModal = false"></NewBucketModal>

</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import MediaCard from '../components/MediaCard.vue';
import NewBucketModal from '../components/NewBucketModal.vue';
import { minioService } from '../services/minio.service';

const selectedBucket = ref();
const showModal = ref(false);
const bucketList = ref();

onMounted(() => {
  listBuckets()
});

function selectBucket(index) {
  selectedBucket.value = index;
}

async function listBuckets() {
  minioService.listBuckets().then((response) => {
    bucketList.value = response.data
  }).catch((err) => console.log('List bucket error: ', err));
}

function openBucket(index) {
  console.log('opened item @ ', index);
}

</script>
  