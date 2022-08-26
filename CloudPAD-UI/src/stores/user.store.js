import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: null,
    hasAccess: [],
  }),
  actions: {

  }
})
