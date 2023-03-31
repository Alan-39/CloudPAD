import { defineStore } from 'pinia'
import { ref } from 'vue';

export const usePreferenceStore = defineStore('preference', () => {
  const userPreference = ref(JSON.parse(localStorage.getItem('user-setting')) ? JSON.parse(localStorage.getItem('user-setting')) : {});

  function setPreference(setting, value) {
    userPreference.value[setting] = value;
    console.log('setPreference: ', userPreference.value);
    localStorage.setItem('user-setting', JSON.stringify(userPreference.value));
  }

  return { userPreference, setPreference }
})
