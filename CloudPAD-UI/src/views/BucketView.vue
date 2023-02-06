<template>
  <div class="overflow-y-scroll p-10 h-full w-full">
    <div class="flex flex-row justify-between">
      <div @click="selectFile()"
        class="inline-flex items-center py-1 pl-1 pr-4 mb-6 bg-white hover:bg-gray-300 ease-in-out duration-300 rounded-2xl shadow-md text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
          stroke="currentColor" class="mx-1 w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <input type="file" ref="fileUpload" @change="uploadFile($event)" hidden multiple />
        <div class="text-xl font-bold font-medium pb-2">Upload</div>
      </div>

      <!-- Todo: Toggling between grid and list view  -->
      <ViewToggle></ViewToggle>
    </div>

    <!-- Object view -->
    <div>
      <div v-if="objectList" class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-slate-600">
          <tbody>
            <tr 
              v-for="(item, index) in objectList"
              @click="selectItem(index)"
              @contextmenu.prevent="openContextMenu($event, index)"
              class="bg-white rounded cursor-pointer hover:bg-gray-300 ease-in-out duration-300"
              :class="{ 'bg-gray-500 text-slate-300': selectedIndex == index }"
            >
              <td v-for="value in item" class="px-6 py-4">
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1 v-else>I'm feeling empty here...</h1>
    </div>
    <!-- Object view -->

    <!-- Todo: multi file upload dialog  -->

    <ContextMenu ref="contextMenu">
      <ul>
        <li @click="downloadObject()"
          class="inline-flex block px-4 py-2 border-b border-gray-200 w-full font-medium hover:bg-slate-500 hover:text-slate-100 cursor-pointer">
          <span class="m-1">Download</span>
        </li>
        <li @click="deleteObject()"
          class="inline-flex block px-4 py-2 border-b border-gray-200 w-full font-medium text-red-500 hover:bg-red-500 hover:text-slate-100 cursor-pointer">
          <span class="m-1">Delete</span>
        </li>
      </ul>
    </ContextMenu>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';

import { objectService } from '../services/object.service';

import ContextMenu from '../components/ContextMenu.vue';
import ViewToggle from '../components/ViewToggle.vue';


const route = useRoute()

const selectedIndex = ref();
const contextMenu = ref(null)
const objectList = ref([]);
const fileUpload = ref(null);

onMounted(() => {
  listObjects(),
    contextMenu.value
});

function selectFile() {
  fileUpload.value.click();
}

function selectItem(idx) {
  selectedIndex.value = idx;
}

function openContextMenu(e, idx) {
  selectedIndex.value = idx;
  contextMenu.value.open(e);
}

function downloadObject() {
  objectService.downloadObject(objectList.value[selectedIndex.value].name, route.params.name)
    .then(url => {
      window.open(url.data);
    }).catch((err) => console.log('download object err: ', err));
}

function deleteObject() {
  objectService.deleteObject(objectList.value[selectedIndex.value].name, route.params.name)
    .then(() => {
      objectList.value.splice(selectedIndex.value, 1);
      contextMenu.value.close();
    }).catch((err) => console.log('delete object err: ', err));
}

async function uploadFile(e) {
  if (!e.target.files) return;
  console.log(e.target.files);
  let requests = [];

  for (let i = 0; i < e.target.files.length; i++) {
    const formdata = new FormData();
    formdata.append('bucketName', route.params.name);
    formdata.append('file', e.target.files[i]);
    requests.push(objectService.uploadObject(formdata));
    Promise.allSettled(requests)
      .then((results) => results.forEach((result) => { 
        console.log('result: ', result.value.data);
        objectList.value.push(result.value.data);
    }));
  }
}

async function listObjects() {
  objectService.listObject(route.params.name).then((response) => {
    objectList.value = response.data
  })


}

</script>
