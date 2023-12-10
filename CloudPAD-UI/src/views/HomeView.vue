<template>
  <div class="overflow-y-scroll p-10 h-full w-full">
    <div class="flex flex-row justify-between">
      <div @click="openNewModal()"
        class="inline-flex items-center cursor-pointer py-1 pl-1 pr-4 mb-6 bg-white hover:bg-gray-300 ease-in-out duration-300 rounded-2xl shadow-md text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
          stroke="currentColor" class="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <div class="text-xl font-bold font-medium pb-2">New bucket</div>
      </div>
    </div>

    <Breadcrumb></Breadcrumb>

    <!-- Grid view -->
    <div class="mb-20 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
      <Card v-for="(bucket, index) in bucketList" @click="selectBucket(index)" @dblclick="openBucket()"
        @contextmenu.prevent="openContextMenu($event, index)"
        :class="{ 'bg-gray-500 text-slate-300': selectedIndex == index }" :name=bucket.name iconType="server">
      </Card>
    </div>
    <!-- Grid view -->

    <!-- List view -->
    <!-- List view -->
  </div>

  <Modal ref="newModal" @true="newBucket" @false="">
    <form class="space-y-6" @submit.prevent="newBucket">
      <div class="space-y-6">
        <div>
          <label for="bucketName" class="block mb-2 text-sm font-medium text-gray-700 ">Bucket Name</label>
          <input id="bucketName" v-model="bucketForm.bucketName" name="bucketName" type="text"
            class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required />
          <span class="text-sm text-red-600">{{ errors }}</span>
        </div>
      </div>
    </form>
  </Modal>

  <Modal ref="deleteModal" @true="deleteBucket()">
    <p class="font-medium text-slate-600">This action cannot be reversed. Are you sure?</p>
  </Modal>

  <ContextMenu ref="contextMenu">
    <ul>
      <li @click="openBucket()"
        class="inline-flex block px-4 py-2 border-b border-gray-200 w-full font-medium hover:bg-slate-500 hover:text-slate-100 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
          stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
        <span class="m-1">Open Bucket</span>
      </li>
      <li @click="openDeleteModal()"
        class="inline-flex block px-4 py-2 border-b border-gray-200 w-full text-red-500 font-medium hover:bg-red-500 hover:text-slate-100 cursor-pointer">
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
import { useRouter } from 'vue-router';
import * as yup from 'yup';

import { bucketService } from '../services/bucket.service';

import Card from '../components/Card.vue';
import ContextMenu from '../components/ContextMenu.vue';
import Modal from '../components/Modal.vue';
import Breadcrumb from '../components/Breadcrumb.vue';

const selectedIndex = ref();
const bucketList = ref([]);
const bucketForm = ref({ bucketName: '' });
const errors = ref('');

const newModal = ref(null);
const contextMenu = ref(null)
const deleteModal = ref(null);

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

function deleteBucket() {
  bucketService.removeBucket(bucketList.value[selectedIndex.value].name)
    .then(() => {
      bucketList.value.splice(selectedIndex.value, 1);
    }).catch((err) => console.log('remove bucket error: ', err));
  deleteModal.value.close();
}

async function newBucket() {
  const bucketSchema = yup.object({
    bucketName: yup.string().required("Bucket Name is required").min(6, "Bucket Name must be at least 6 characters"),
  });

  try {
    await bucketSchema.validate(bucketForm.value);
    await bucketService.makeBucket(bucketForm.value);
    listBuckets();
    newModal.value.close();
  } catch (err) {
    console.log(err);
    errors.value = err.errors.join('\n');
  }

}

function openDeleteModal() {
  contextMenu.value.close();
  deleteModal.value.open({
    title: "Delete Bucket",
    action: "Delete",
    actionColor: "warning",
  });
}

function openNewModal() {
  contextMenu.value.close();
  newModal.value.open({
    title: "New Bucket",
    action: "Create",
    actionColor: "info",
  });
}

function openContextMenu(e, idx) {
  selectedIndex.value = idx;
  contextMenu.value.open(e);
}
</script>
